import { writable } from 'svelte/store'
import { mkGridSize } from './helpers'
import Splash from './screens/Splash/Splash.svelte'
import TerrainMap from './terrain/TerrainMap.svelte'
import { createTerrain } from './terrain/createTerrain'

export enum ScreenNames {
  Splash,
  Home
}
export const Screens: { [_ in ScreenNames] } = {
  [ScreenNames.Splash]: Splash,
  [ScreenNames.Home]: TerrainMap
}

export const DEFAULT_GAME_STATE = {
  screen: ScreenNames.Splash,
  terrain: createTerrain({ size: mkGridSize(20) })
}
export type GameState = typeof DEFAULT_GAME_STATE
export type GameStateApi = ReturnType<typeof createGameState>

export const createGameState = () => {
  const _state = writable(DEFAULT_GAME_STATE)
  const { subscribe, set, update } = _state

  return {
    navigate: (screen: ScreenNames) =>
      update((state) => {
        console.log(`Navigating to ${screen}`)
        return { ...state, screen }
      }),
    subscribe
  }
}

export const gameState = createGameState()
