import { nanoid } from 'nanoid'
import { Opaque } from 'type-fest'
import { AssetEditor } from '../components/AssetEditor/AssetEditor'
import { createAssetEditorStore } from '../components/AssetEditor/store'
import { Modal } from '../components/Modal'
import { DEFAULT_GRID_SIZE } from '../constants/tile'
import {
  AssetId,
  AssetState,
  AssetStateCollection,
  AssetState_AtRest,
  atRestToInMemoryAsset,
  createNewAssetState,
  inMemoryToAtRestAsset,
  toAssetId
} from '../types/Asset'
import {
  CellCollection_AtRest,
  CellState,
  CellState_AtRest,
  atRestToInMemoryCell,
  toCellId
} from '../types/Cell'
import { GridSize, PointSlug, xyToSlug } from '../types/helpers'
import { assert } from '../util/assert'
import { keys } from '../util/keys'
import { range } from '../util/range'
import { uniq, uniqBy } from '../util/uniq'
import { State, state } from '../van'
import { loadCurrentWorldId, loadWorld, saveCurrentWorldId, saveWorld } from './localStorage'

export type WorldId = Opaque<string, 'world-id'>
export const newWorldId = () => nanoid() as WorldId

export type WorldState = {
  size: GridSize
  id: WorldId
  name: WorldName
  cells: StatefulCellCollection
  assets: AssetStateCollection
}

export type AssetCollection_AtRest = { [assetId: AssetId]: AssetState_AtRest }

const mkPointSlug = (s: string) => s as PointSlug

export type WorldState_AtRest = {
  id: WorldId
  name: WorldName
  assets: AssetCollection_AtRest
  cells: CellCollection_AtRest
}

type StatefulCellCollection = { [id: PointSlug]: State<CellState> }

type StatefulAssetCollection = { [id: AssetId]: State<AssetState> }

export type WorldName = Opaque<string, 'world-name'>

const loadCurrentWorld = () => {
  const currentWorldId = loadCurrentWorldId()
  if (!currentWorldId) return
  const savedState = loadWorld(currentWorldId)
  return savedState
}

export const mkWorldName = (s: string) => s as WorldName
export const DEFAULT_WORLD_STATE: WorldState = {
  id: newWorldId(),
  size: DEFAULT_GRID_SIZE,
  name: mkWorldName('New World'),
  assets: {},
  cells: {}
}

const atRestCell = (cellIn: CellState): CellState_AtRest => {
  return {
    assets: cellIn.assets.map((assetIn) => assetIn)
  }
}

export type GameStateApi = ReturnType<typeof createGameStore>
export const createGameStore = () => {
  const loaded = state(false)
  const imported = state(false)
  const worldId = state(newWorldId())
  const size = DEFAULT_GRID_SIZE
  const name = state(mkWorldName('New World'))
  const assets: StatefulAssetCollection = {}
  const assetIds = state<AssetId[]>([])
  const cells: StatefulCellCollection = {}
  const assetEditor = createAssetEditorStore()

  range(size).forEach((x) => {
    range(size).forEach((y) => {
      const slug = xyToSlug(x, y)
      cells[slug] = state<CellState>({
        assets: []
      })
    })
  })

  const save = () => {
    // backupWorld(worldId.val)
    saveWorld(worldAtRest())
    saveCurrentWorldId(worldId.val)
  }

  {
    const world = loadCurrentWorld()
    if (world) {
      worldId.val = world.id
      name.val = world.name
      Promise.all([
        Object.entries(world.assets)
          .reduce(async (c, [id, asset]) => {
            try {
              const assets = await c
              try {
                const inMemoryAsset = await atRestToInMemoryAsset(asset)
                const statefulAsset = state(inMemoryAsset)
                assert(assets)
                assets[toAssetId(id)] = statefulAsset
                return assets
              } catch (data) {
                return console.error(data)
              }
            } catch (data) {
              return console.error(data)
            }
          }, Promise.resolve<StatefulAssetCollection | void>(assets))
          .then((collection) => {
            assert(collection)
            assetIds.val = keys(collection) as AssetId[]
          })
          .catch(console.error),

        Object.entries(world.cells)
          .reduce(async (c, [slug, atRestCell]) => {
            try {
              const cells = await c
              try {
                const inMemoryCell = await atRestToInMemoryCell(atRestCell)
                const statefulCell = state(inMemoryCell)
                assert(cells)
                cells[toCellId(slug)] = statefulCell
                return cells
              } catch (data) {
                return console.error(data)
              }
            } catch (data) {
              console.error(data)
            }
          }, Promise.resolve<StatefulCellCollection | void>(cells))

          .catch(console.error)
      ]).then(() => {
        console.log(`world loaded`, { assetIds, assets, cells })
        loaded.val = true
      })
    } else {
      loaded.val = true
    }
  }

  const worldAtRest = (): WorldState_AtRest => {
    return {
      id: worldId.val,
      name: name.val,
      assets: Object.values(assets).reduce((c, v, k) => {
        const atRest = inMemoryToAtRestAsset(v.val)
        c[atRest.id] = atRest
        return c
      }, {} as AssetCollection_AtRest),
      cells: Object.entries(cells).reduce((c, [slug, v]) => {
        const atRest = atRestCell(v.val)
        c[mkPointSlug(slug)] = atRest
        return c
      }, {} as CellCollection_AtRest)
    }
  }
  const serializeWorld = () => JSON.stringify(worldAtRest())

  const [modal, openModal, closeModal, isModalOpen] = Modal()

  const activeAssetId = state<AssetId | undefined>(undefined)
  const setActiveAssetId = (s: AssetId | undefined) => (activeAssetId.val = s)

  const addAssetToTerrainCell = (x: number, y: number, activeAssetId: AssetId) => {
    const slug = xyToSlug(x, y)
    if (!cells[slug]) cells[slug] = state<CellState>({ assets: [] })
    const cellData = cells[slug]!.val
    const { assets } = cellData
    cells[slug]!.val = {
      ...cellData,
      assets: uniqBy([...assets, { assetId: activeAssetId }], (asset) => asset.assetId)
    }
    save()
  }

  const api = {
    createAsset: async () => {
      const newAsset = createNewAssetState()
      return newAsset
    },
    deleteAsset: async (assetId: AssetId) => {
      delete assets[assetId]
      Object.entries(cells).map(([pos, cell]) => {
        cell.val = { ...cell, assets: cell.val.assets.filter((asset) => asset.assetId !== assetId) }
      })
      assetIds.val = keys(assets) as AssetId[]
      save()
    },
    openAssetEditor: async (asset: AssetState) => {
      const clonedAsset = await atRestToInMemoryAsset(inMemoryToAtRestAsset(asset)) // Clone
      await assetEditor.setAsset(clonedAsset)
      const { currentAsset } = assetEditor
      openModal({
        title: () => `Asset Editor`,
        body: () => AssetEditor({})
      })
    },
    closeAssetEditor: () => {
      closeModal().then(() => {
        assetEditor.clearAsset()
      })
    },
    saveAsset: (asset: AssetState) => {
      if (!assets[asset.id]) assets[asset.id] = state(asset)
      assets[asset.id]!.val = asset
      assetIds.val = uniq([...assetIds.val, asset.id])
      save()
      api.closeAssetEditor()
    },
    worldId,
    loaded,
    size,
    name,
    assets,
    assetIds,
    serializeWorld,
    worldAtRest,
    openModal,
    closeModal,
    modal,
    isModalOpen,
    activeAssetId,
    setActiveAssetId,
    addAssetToTerrainCell,
    cells,
    assetEditor,
    imported
  }
  return api
}

export const gameStore = createGameStore()
