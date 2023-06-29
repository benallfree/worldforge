import { nanoid } from 'nanoid'
import { writable } from 'svelte/store'
import { Opaque } from 'type-fest'
import { RgbHex } from '../../helpers'
import { flatten } from '../../util/flatten'
import { uniq } from '../../util/uniq'
import {
  RGB_GREEN,
  RGB_TRANSPARENT,
  convertRGBArrayToImageData,
  generateColorSpectrum
} from './helpers'

export const SPRITE_SIZE = 16
export enum EditorTools {
  Draw,
  Erase
}
export const TOOL_NAMES: { [_ in EditorTools]: string } = {
  [EditorTools.Draw]: '✏️',
  [EditorTools.Erase]: '🧹'
}

export type AssetId = Opaque<string, 'asset-id'>
export type Asset = {
  id: AssetId
  sprite: string[]
}

export const mkTool = (s: string) => parseInt(s) as EditorTools

export const createCustomPaletteFromCanvas = (canvas: Canvas): Palette => {
  const flattened = flatten(canvas) as Palette
  const customPalette = uniq(flattened).filter((c) => c !== RGB_TRANSPARENT)
  return customPalette
}

export type Canvas = Opaque<string[][], 'canvas'>
const DEFAULT_CANVAS = Array.from({ length: SPRITE_SIZE }, () =>
  Array<string>(SPRITE_SIZE).fill(RGB_TRANSPARENT)
) as Canvas
export type Sprite = Opaque<typeof DEFAULT_SPRITE, 'sprite'>
const DEFAULT_SPRITE = convertRGBArrayToImageData(DEFAULT_CANVAS)
const DEFAULT_CUSTOM_PALETTE = createCustomPaletteFromCanvas(DEFAULT_CANVAS)

export type AssetState = typeof DEFAULT_ASSET_STATE
const DEFAULT_ASSET_STATE = {
  id: nanoid() as AssetId,
  name: 'New Asset',
  canvas: DEFAULT_CANVAS,
  sprite: DEFAULT_SPRITE,
  customPalette: DEFAULT_CUSTOM_PALETTE
}

export const createAsset = () => {
  return { ...DEFAULT_ASSET_STATE, id: nanoid() } as AssetState
}

export type AssetState_AtRest = Pick<AssetState, 'id' | 'name' | 'canvas'>
export const atRestAsset = (asset: AssetState): AssetState_AtRest => {
  const { canvas, id, name } = asset
  return { canvas, id, name }
}

export const inMemoryAsset = (atRestAsset: AssetState_AtRest) => {
  const { id, canvas, name } = atRestAsset
  const memory: AssetState = {
    id,
    canvas,
    name,
    sprite: convertRGBArrayToImageData(atRestAsset.canvas),
    customPalette: createCustomPaletteFromCanvas(canvas)
  }
  return memory
}

export type Palette = RgbHex[]

export type AssetEditorState = {
  isColorPickerShowing: boolean
  currentTool: EditorTools
  selectedColor: RgbHex
  asset?: AssetState
}

export const createAssetEditorStore = () => {
  const _store = writable<AssetEditorState>({
    isColorPickerShowing: false,
    selectedColor: RGB_GREEN,
    currentTool: EditorTools.Draw
  })
  const { set, update, subscribe } = _store

  const updateAsset = (cb: (state: AssetEditorState, asset: AssetState) => AssetState) =>
    update((state) => {
      const { asset } = state
      if (!asset) throw new Error(`Asset required`)
      return {
        ...state,
        asset: cb(state, asset)
      }
    })
  const api = {
    subscribe,
    setAsset: (asset: AssetState) => update((state) => ({ ...state, asset })),
    clearAsset: () =>
      update((state) => {
        console.log('clearing asset')
        delete state.asset
        return { ...state }
      }),
    showColorPicker: () => update((state) => ({ ...state, isColorPickerShowing: true })),
    hideColorPicker: () => update((state) => ({ ...state, isColorPickerShowing: false })),

    setSelectedColor: (selectedColor: RgbHex) => {
      update((state) => ({
        ...state,
        isColorPickerShowing: false,
        selectedColor,
        palette: generateColorSpectrum(selectedColor)
      }))
    },
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
          sprite: convertRGBArrayToImageData(canvas),
          customPalette: createCustomPaletteFromCanvas(canvas)
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
  return api
}
export type AssetEditorApi = ReturnType<typeof createAssetEditorStore>
