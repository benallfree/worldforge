import { nanoid } from 'nanoid'
import { writable } from 'svelte/store'
import { Opaque } from 'type-fest'
import { clone, RgbHex } from '../../helpers'
import {
  convertRGBArrayToImageData,
  generateComplementaryColors,
  RGB_GREEN,
  RGB_TRANSPARENT
} from './helpers'

export const SPRITE_SIZE = 16
export enum EditorTools {
  Draw,
  Erase,
  Pick
}
export const TOOL_NAMES: { [_ in EditorTools]: string } = {
  [EditorTools.Draw]: 'Draw',
  [EditorTools.Erase]: 'Erase',
  [EditorTools.Pick]: 'Pick'
}

export type AssetId = Opaque<string, 'asset-id'>
export type Asset = {
  id: AssetId
  sprite: string[]
}

export const mkTool = (s: string) => parseInt(s) as EditorTools

const DEFAULT_PALETTE_SEED = RGB_GREEN
const DEFAULT_PALETTE = generateComplementaryColors(DEFAULT_PALETTE_SEED)
export type Canvas = Opaque<string[][], 'canvas'>
const DEFAULT_CANVAS = Array.from({ length: SPRITE_SIZE }, () =>
  Array<string>(SPRITE_SIZE).fill(RGB_TRANSPARENT)
) as Canvas
export type Sprite = Opaque<typeof DEFAULT_SPRITE, 'sprite'>
const DEFAULT_SPRITE = convertRGBArrayToImageData(DEFAULT_CANVAS)

export type AssetState = typeof DEFAULT_ASSET_STATE
const DEFAULT_ASSET_STATE = {
  id: nanoid() as AssetId,
  name: 'New Asset',
  canvas: DEFAULT_CANVAS,
  palette: DEFAULT_PALETTE,
  paletteSeed: DEFAULT_PALETTE_SEED,
  selectedColor: RGB_GREEN,
  currentTool: EditorTools.Draw,
  sprite: DEFAULT_SPRITE
}

export const createAsset = () => {
  return { ...DEFAULT_ASSET_STATE, id: nanoid() } as AssetState
}

export const createAssetEditorStore = (initialState: AssetState) => {
  const _store = writable(clone(initialState))
  const { set, update, subscribe } = _store

  return {
    subscribe,
    reset: () => set(DEFAULT_ASSET_STATE),
    setPaletteSeed: (paletteSeed: RgbHex) => {
      return update((state) => ({
        ...DEFAULT_ASSET_STATE,
        ...state,
        paletteSeed,
        palette: generateComplementaryColors(paletteSeed)
      }))
    },
    setSelectedColor: (selectedColor: RgbHex) =>
      update((state) => ({ ...DEFAULT_ASSET_STATE, ...state, selectedColor })),
    setPixel: (x: number, y: number) => {
      update((state) => {
        const { canvas, currentTool, selectedColor } = state || DEFAULT_ASSET_STATE
        if (currentTool === EditorTools.Draw) {
          canvas[x][y] = selectedColor
        } else {
          canvas[x][y] = RGB_TRANSPARENT
        }
        return {
          ...DEFAULT_ASSET_STATE,
          ...state,
          canvas,
          sprite: convertRGBArrayToImageData(canvas)
        }
      })
    },
    setTool: (currentTool: EditorTools) =>
      update((state) => ({ ...DEFAULT_ASSET_STATE, ...state, currentTool }))
  }
}
export type AssetEditorApi = ReturnType<typeof createAssetEditorStore>
