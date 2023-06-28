import { flatten, uniq } from '@s-libs/micro-dash'
import { nanoid } from 'nanoid'
import { writable } from 'svelte/store'
import { Opaque } from 'type-fest'
import { RgbHex } from '../../helpers'
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
  [EditorTools.Draw]: '✏️',
  [EditorTools.Erase]: '🧹',
  [EditorTools.Pick]: '🧪'
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
  sprite: DEFAULT_SPRITE
}

export const createAsset = () => {
  return { ...DEFAULT_ASSET_STATE, id: nanoid() } as AssetState
}

export type AssetEditorState = {
  isColorPickerShowing: boolean
  currentTool: EditorTools
  selectedColor: RgbHex
  palette: RgbHex[]
  customPalette: RgbHex[]
  paletteSeed: RgbHex
  asset?: AssetState
}

export const createAssetEditorStore = () => {
  const _store = writable<AssetEditorState>({
    isColorPickerShowing: false,
    selectedColor: RGB_GREEN,
    palette: DEFAULT_PALETTE,
    paletteSeed: DEFAULT_PALETTE_SEED,
    customPalette: [],
    currentTool: EditorTools.Draw
  })
  const { set, update, subscribe } = _store

  const updateAsset = (cb: (state: AssetEditorState, asset: AssetState) => AssetState) =>
    update((state) => {
      const { asset } = state
      if (!asset) throw new Error(`Asset required`)
      return { ...state, asset: cb(state, asset) }
    })
  return {
    subscribe,
    setAsset: (asset: AssetState) => update((state) => ({ ...state, asset })),
    showColorPicker: () => update((state) => ({ ...state, isColorPickerShowing: true })),
    hideColorPicker: () => update((state) => ({ ...state, isColorPickerShowing: false })),
    setPaletteSeed: (paletteSeed: RgbHex) =>
      update((state) => ({
        ...state,
        paletteSeed,
        palette: generateComplementaryColors(paletteSeed)
      })),
    setSelectedColor: (selectedColor: RgbHex) =>
      update((state) => ({ ...state, isColorPickerShowing: false, selectedColor })),
    setPixel: (x: number, y: number) => {
      updateAsset((state, asset) => {
        const { currentTool, selectedColor } = state
        const { canvas } = asset
        if (currentTool === EditorTools.Draw) {
          canvas[x][y] = selectedColor
        } else {
          canvas[x][y] = RGB_TRANSPARENT
        }
        return {
          ...asset,
          canvas,
          sprite: convertRGBArrayToImageData(canvas)
        }
      })
      update((state) => {
        const flattened = flatten(state.asset!.canvas) as RgbHex[]
        const customPalette = uniq(flattened).filter((c) => c !== RGB_TRANSPARENT)
        return { ...state, customPalette }
      })
    },
    setTool: (currentTool: EditorTools) => update((state) => ({ ...state, currentTool }))
  }
}
export type AssetEditorApi = ReturnType<typeof createAssetEditorStore>
