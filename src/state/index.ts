import { nanoid } from 'nanoid'
import { Writable, writable } from 'svelte/store'
import { mkGridSize } from '../helpers'
import Splash from '../screens/Splash/Splash.svelte'
import AssetEditor from '../terrain/AssetEditor/AssetEditor.svelte'
import {
  AssetEditorApi,
  AssetId,
  AssetState,
  AssetState_AtRest,
  atRestAsset,
  createAssetEditorStore,
  createNewAssetState,
  inMemoryAsset
} from '../terrain/AssetEditor/state'
import TerrainMap from '../terrain/TerrainMap.svelte'
import { TerrainApi, createTerrain } from '../terrain/createTerrain'

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

export type GameState = {
  id: string
  name: string
  assets: { [assetId: AssetId]: AssetState }
  assetEditor: AssetEditorApi
  screen: ScreenNames
  terrain: TerrainApi
}

export type GameState_AtRest = {
  assets: { [assetId: AssetId]: AssetState_AtRest }
}

const hydrateState = () => {
  const savedState = (() => {
    try {
      const json = localStorage.getItem('game')
      if (!json) return
      return JSON.parse(json) as GameState_AtRest
    } catch {}
  })()
  const hydrated = DEFAULT_GAME_STATE
  if (savedState) {
    Object.values(savedState.assets).forEach((atRestAsset) => {
      hydrated.assets[atRestAsset.id] = inMemoryAsset(atRestAsset)
    })
  }

  return hydrated
}
export const DEFAULT_GAME_STATE: GameState = {
  id: nanoid(),
  name: 'New Game',
  assets: {},
  screen: localStorage.getItem('splash') ? ScreenNames.Home : ScreenNames.Splash,
  assetEditor: createAssetEditorStore(),
  terrain: createTerrain({ size: mkGridSize(20) })
}
export type GameStateApi = ReturnType<typeof createGameState>
export type GameStore = Writable<GameState>
export const createGameState = () => {
  const initialState = hydrateState()
  const _state = writable(initialState)
  const { subscribe, set, update } = _state

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
    createAsset: () => {
      const newAsset = createNewAssetState()
      update((state) => ({ ...state, assets: { ...state.assets, [newAsset.id]: newAsset } }))
      return newAsset.id
    },
    openAssetEditor: (id: AssetId) => {
      update((state) => {
        const asset = state.assets[id]!
        const clonedAsset = inMemoryAsset(atRestAsset(asset))
        state.assetEditor.setAsset(clonedAsset)
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
