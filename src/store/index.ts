import { nanoid } from 'nanoid'
import { Writable, writable } from 'svelte/store'
import { Opaque } from 'type-fest'
import {
  AssetEditorApi,
  AssetId,
  AssetState,
  AssetStateCollection,
  AssetState_AtRest,
  atRestAsset,
  createAssetEditorStore,
  createNewAssetState,
  inMemoryAsset
} from '../components/AssetEditor/store'
import { TerrainApi, createTerrain } from '../components/terrain/createTerrain'
import { mkGridSize } from '../util/helpers'
import { loadCurrentWorldId, loadWorld, saveCurrentWorldId, saveWorld } from './localStorage'

export type WorldId = Opaque<string, 'world-id'>
export const newWorldId = () => nanoid() as WorldId

export type WorldState = {
  loaded: boolean
  id: WorldId
  name: WorldName
  assets: AssetStateCollection
  assetEditor: AssetEditorApi
  terrain: TerrainApi
}

export type WorldState_AtRest = {
  id: WorldId
  name: WorldName
  assets: { [assetId: AssetId]: AssetState_AtRest }
}

export type WorldName = Opaque<string, 'world-name'>

const hydrateState = async (): Promise<WorldState> => {
  const currentWorldId = loadCurrentWorldId()
  if (!currentWorldId) {
    saveCurrentWorldId(DEFAULT_WORLD_STATE.id)
    saveWorld(DEFAULT_WORLD_STATE)
    return DEFAULT_WORLD_STATE
  }
  const savedState = loadWorld(currentWorldId)
  if (!savedState) return DEFAULT_WORLD_STATE
  const inMemoryState: WorldState = {
    ...DEFAULT_WORLD_STATE,
    ...savedState,
    assets: await Object.values(savedState.assets).reduce(async (carry, atRestAsset) => {
      return carry.then((assets) => {
        return inMemoryAsset(atRestAsset).then((asset) => {
          assets[asset.id] = asset
          return assets
        })
      })
    }, Promise.resolve({} as AssetStateCollection))
  }
  return inMemoryState
}

export const mkWorldName = (s: string) => s as WorldName
export const DEFAULT_WORLD_STATE: WorldState = {
  loaded: false,
  id: newWorldId(),
  name: mkWorldName('New World'),
  assets: {},
  assetEditor: createAssetEditorStore(),
  terrain: createTerrain({ size: mkGridSize(20) })
}

export type GameStateApi = ReturnType<typeof createGameState>
export type GameStore = Writable<WorldState>
export const createGameState = () => {
  const _state = writable(DEFAULT_WORLD_STATE)
  const { subscribe, set, update } = _state

  hydrateState().then((initialState) => {
    _state.set({ ...initialState, loaded: true })
  })

  subscribe((state) => {
    const { assets, loaded, id, name } = state
    if (!loaded) return
    const save: WorldState_AtRest = {
      id,
      name,
      assets: Object.values(assets).reduce((c, v, k) => {
        c[v.id] = atRestAsset(v)
        return c
      }, {})
    }
    saveWorld(save)
    shareStore.set(JSON.stringify(save))
  })

  const api = {
    createAsset: async () => {
      const newAsset = await createNewAssetState()
      return newAsset
    },
    openAssetEditor: async (asset: AssetState) => {
      update((state) => {
        inMemoryAsset(atRestAsset(asset))
          .then((clonedAsset) => {
            update((state) => {
              state.assetEditor.setAsset(clonedAsset)
              return state
            })
          })
          .catch(console.error)
        return state
      })
    },
    closeAssetEditor: () => {
      update((state) => {
        state.assetEditor.clearAsset()
        return state
      })
    },
    saveAsset: (asset: AssetState) =>
      update((state) => ({ ...state, assets: { ...state.assets, [asset.id]: asset } })),

    subscribe
  }
  return api
}

export const shareStore = (() => {
  const store = writable('')

  const { subscribe, update, set } = store

  return { subscribe, set: (s: string) => set(s) }
})()

export const gameState = createGameState()
