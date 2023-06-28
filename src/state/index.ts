import { forEach, reduce } from '@s-libs/micro-dash'
import { Writable, writable } from 'svelte/store'
import { clone, mkGridSize } from '../helpers'
import Splash from '../screens/Splash/Splash.svelte'
import AssetEditor from '../terrain/AssetEditor/AssetEditor.svelte'
import {
  AssetEditorApi,
  AssetId,
  AssetState,
  AssetState_AtRest,
  atRestAsset,
  createAsset,
  createAssetEditorStore,
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
  assets: { [assetId: AssetId]: AssetState }
  assetEditor: AssetEditorApi
  screen: ScreenNames
  terrain: TerrainApi
}

export type GameState_AtRest = {
  assets: { [assetId: AssetId]: AssetState_AtRest }
}

const saveState = (state: GameState): GameState_AtRest => {
  const saved: GameState_AtRest = {
    assets: reduce(
      state.assets,
      (c, v, k) => {
        c[k] = atRestAsset(v)
        return c
      },
      {} as AssetState_AtRest
    )
  }
  return saved
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
    forEach(savedState.assets, (atRestAsset) => {
      hydrated.assets[atRestAsset.id] = inMemoryAsset(atRestAsset)
    })
  }

  return hydrated
}
export const DEFAULT_GAME_STATE: GameState = {
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
      assets
    }
    localStorage.setItem('game', JSON.stringify(save))
  })
  const _update = (cb: (state: GameState) => GameState) => {
    const newState = update(cb)
  }
  const api = {
    createAsset: () => {
      const newAsset = createAsset()
      update((state) => ({ ...state, assets: { ...state.assets, [newAsset.id]: newAsset } }))
      return newAsset.id
    },
    openAssetEditor: (id: AssetId) => {
      update((state) => {
        state.assetEditor.setAsset(clone(state.assets[id]))
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

export const gameState = createGameState()
