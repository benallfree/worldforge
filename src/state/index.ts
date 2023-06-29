import { nanoid } from 'nanoid'
import { Writable, writable } from 'svelte/store'
import { Opaque } from 'type-fest'
import AssetEditor from '../components/AssetEditor/AssetEditor.svelte'
import {
  AssetEditorApi,
  AssetId,
  AssetState,
  AssetState_AtRest,
  atRestAsset,
  createAssetEditorStore,
  createNewAssetState,
  inMemoryAsset
} from '../components/AssetEditor/store'
import TerrainMap from '../components/terrain/TerrainMap.svelte'
import { TerrainApi, createTerrain } from '../components/terrain/createTerrain'
import Splash from '../screens/Splash/Splash.svelte'
import { mkGridSize } from '../util/helpers'

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

export type GameState = {
  loaded: boolean
  id: WorldId
  name: string
  assets: { [assetId: AssetId]: AssetState }
  assetEditor: AssetEditorApi
  screen: ScreenNames
  terrain: TerrainApi
}

export type GameState_AtRest = {
  assets: { [assetId: AssetId]: AssetState_AtRest }
}

const hydrateState = async () => {
  const savedState = (() => {
    try {
      const json = localStorage.getItem('game')
      if (!json) return
      return JSON.parse(json) as GameState_AtRest
    } catch {}
  })()
  const hydrated = DEFAULT_GAME_STATE
  if (savedState) {
    await Promise.all(
      Object.values(savedState.assets).map(async (atRestAsset) => {
        hydrated.assets[atRestAsset.id] = await inMemoryAsset(atRestAsset)
      })
    )
  }

  return hydrated
}

export const DEFAULT_GAME_STATE: GameState = {
  loaded: false,
  id: newWorldId(),
  name: 'New Game',
  assets: {},
  screen: localStorage.getItem('splash') ? ScreenNames.Home : ScreenNames.Splash,
  assetEditor: createAssetEditorStore(),
  terrain: createTerrain({ size: mkGridSize(20) })
}

export type GameStateApi = ReturnType<typeof createGameState>
export type GameStore = Writable<GameState>
export const createGameState = () => {
  const _state = writable(DEFAULT_GAME_STATE)
  const { subscribe, set, update } = _state

  hydrateState().then((initialState) => {
    _state.set({ ...initialState, loaded: true })
  })

  subscribe((state) => {
    const { assets } = state
    const save: GameState_AtRest = {
      assets: Object.values(assets).reduce((c, v, k) => {
        c[k] = atRestAsset(v)
        return c
      }, {})
    }
    const json = JSON.stringify(save)
    localStorage.setItem('game', JSON.stringify(save))
    shareStore.set(json)
  })

  const api = {
    createAsset: async () => {
      const newAsset = await createNewAssetState()
      update((state) => ({ ...state, assets: { ...state.assets, [newAsset.id]: newAsset } }))
      return newAsset.id
    },
    openAssetEditor: async (id: AssetId) => {
      update((state) => {
        const asset = state.assets[id]!
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
        localStorage.setItem('splash', '1')
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
