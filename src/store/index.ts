import { nanoid } from 'nanoid'
import { Writable, writable } from 'svelte/store'
import { Opaque } from 'type-fest'
import AssetEditor from '../components/AssetEditor/AssetEditor.svelte'
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
import Splash from '../components/Splash.svelte'
import TerrainMap from '../components/terrain/TerrainMap.svelte'
import { TerrainApi, createTerrain } from '../components/terrain/createTerrain'
import { mkGridSize } from '../util/helpers'
import {
  loadCurrentWorldId,
  loadSplash,
  loadWorld,
  saveCurrentWorldId,
  saveSplash,
  saveWorld
} from './localStorage'

export enum ScreenNames {
  Splash,
  Home,
  Editor
}
export const Screens: { [_ in ScreenNames]: () => any } = {
  [ScreenNames.Splash]: () => Splash,
  [ScreenNames.Home]: () => TerrainMap,
  [ScreenNames.Editor]: () => AssetEditor
}

export type WorldId = Opaque<string, 'world-id'>
export const newWorldId = () => nanoid() as WorldId

export type WorldState = {
  loaded: boolean
  id: WorldId
  name: WorldName
  assets: AssetStateCollection
  assetEditor: AssetEditorApi
  screen: ScreenNames
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
  screen: loadSplash() ? ScreenNames.Home : ScreenNames.Splash,
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
      api.navigate(ScreenNames.Home)
    },
    saveAsset: (asset: AssetState) =>
      update((state) => ({ ...state, assets: { ...state.assets, [asset.id]: asset } })),
    navigate: (screen: ScreenNames) =>
      update((state) => {
        saveSplash(true)
        return { ...state, screen }
      }),
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
