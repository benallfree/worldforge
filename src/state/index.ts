import { Writable, writable } from 'svelte/store'
import { mkGridSize } from '../helpers'
import Splash from '../screens/Splash/Splash.svelte'
import {
  AssetEditorApi,
  AssetId,
  AssetState,
  createAsset,
  createAssetEditorStore
} from '../terrain/AssetEditor/state'
import TerrainMap from '../terrain/TerrainMap.svelte'
import { TerrainApi, createTerrain } from '../terrain/createTerrain'

export enum ScreenNames {
  Splash,
  Home
}
export const Screens: { [_ in ScreenNames]: () => any } = {
  [ScreenNames.Splash]: () => Splash,
  [ScreenNames.Home]: () => TerrainMap
}

export type GameState = {
  assets: { [assetId: AssetId]: AssetState }
  editingAsset?: AssetEditorApi
  screen: ScreenNames
  terrain: TerrainApi
}

export const DEFAULT_GAME_STATE: GameState = {
  assets: {},
  screen: ScreenNames.Splash,
  terrain: createTerrain({ size: mkGridSize(20) })
}
export type GameStateApi = ReturnType<typeof createGameState>
export type GameStore = Writable<GameState>
export const createGameState = () => {
  const _state = writable(DEFAULT_GAME_STATE)
  const { subscribe, set, update } = _state

  return {
    createAsset: () => {
      const newAsset = createAsset()
      update((state) => ({ ...state, assets: { ...state.assets, [newAsset.id]: newAsset } }))
      return newAsset.id
    },
    editAsset: (id: AssetId) => {
      update((state) => ({ ...state, editingAsset: createAssetEditorStore(state.assets[id]) }))
    },
    navigate: (screen: ScreenNames) =>
      update((state) => {
        console.log(`Navigating to ${screen}`)
        return { ...state, screen }
      }),
    subscribe
  }
}

export const gameState = createGameState()
