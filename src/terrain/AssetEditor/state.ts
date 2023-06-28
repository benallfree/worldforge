import { writable } from 'svelte/store'
import { Opaque } from 'type-fest'
import {
  RGB_GREEN,
  RGB_TRANSPARENT,
  convertRGBArrayToImageData,
  generateComplementaryColors
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
export type RgbValue = Opaque<string, 'rgb-value'>

export type AssetId = Opaque<string, 'asset-id'>
export type Asset = {
  id: AssetId
  sprite: string[]
}

export const mkTool = (s: string) => parseInt(s) as EditorTools

const DEFAULT_PALETTE_SEED = RGB_GREEN
const DEFAULT_PALETTE = generateComplementaryColors(DEFAULT_PALETTE_SEED)
export type Canvas = Opaque<typeof DEFAULT_CANVAS, 'canvas'>
const DEFAULT_CANVAS = Array.from({ length: SPRITE_SIZE }, () =>
  Array<string>(SPRITE_SIZE).fill(RGB_TRANSPARENT)
)
export type Sprite = Opaque<typeof DEFAULT_SPRITE, 'sprite'>
const DEFAULT_SPRITE = convertRGBArrayToImageData(DEFAULT_CANVAS)

export type AssetEditorState = typeof DEFAULT_ASSET_STATE
const DEFAULT_ASSET_STATE = {
  canvas: DEFAULT_CANVAS,
  palette: DEFAULT_PALETTE,
  paletteSeed: DEFAULT_PALETTE_SEED,
  selectedColor: RGB_GREEN,
  currentTool: EditorTools.Draw,
  sprite: DEFAULT_SPRITE
}
export const createAssetEditorState = () => {
  const _store = writable<AssetEditorState>(DEFAULT_ASSET_STATE)
  const { subscribe, set, update } = _store

  return {
    subscribe,
    reset: () => set(DEFAULT_ASSET_STATE),
    setPaletteSeed: (paletteSeed: RgbValue) => {
      return update((state) => ({
        ...state,
        paletteSeed,
        palette: generateComplementaryColors(paletteSeed)
      }))
    },
    setSelectedColor: (selectedColor: RgbValue) => update((state) => ({ ...state, selectedColor })),
    setPixel: (x: number, y: number) => {
      update((state) => {
        const { canvas, currentTool, selectedColor } = state
        if (currentTool === EditorTools.Draw) {
          canvas[x][y] = selectedColor
        } else {
          canvas[x][y] = RGB_TRANSPARENT
        }
        return { ...state, canvas, sprite: convertRGBArrayToImageData(canvas) }
      })
    },
    setTool: (currentTool: EditorTools) => update((state) => ({ ...state, currentTool }))
  }
}

export const assetEditorState = createAssetEditorState()
