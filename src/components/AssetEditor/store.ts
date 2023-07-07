import { RGB_GREEN, RGB_TRANSPARENT, SPRITE_SIZE } from '@/constants'
import {
  AssetState,
  EMPTY_SPRITE,
  RgbHex,
  RgbaHex,
  Sprite,
  cloneAsset,
  createNewAssetState,
  rgbToRgba,
  rgbaToRgb
} from '@/types'
import { assert, uniq } from '@/util'
import { State, state } from '@/van'
import {
  Canvas,
  blitSpriteToCanvas,
  clearPixel,
  createCanvas,
  drawPixel,
  getCanvasPixelData,
  initializeCanvas
} from './Tabs/Canvas/canvas-helpers'
import { EditorTools } from './Tools/tool'

export type Palette = RgbHex[]

function createPaletteFromCanvas(canvas: Canvas): Palette {
  const nonTransparent = uniq(getCanvasPixelData(canvas))
    .filter((c) => c !== RGB_TRANSPARENT)
    .map(rgbaToRgb)
  return nonTransparent
}

export const createAssetEditorStore = () => {
  const currentTool = state(EditorTools.Draw)
  const selectedColor = state(RGB_GREEN)
  const currentAsset = state<AssetState>(createNewAssetState())
  const canvas = createCanvas()
  const palette = state<Palette>([])
  const dataUrl = state<Sprite>(canvas.toDataURL())
  const rgbHexPixels: State<RgbaHex>[] = getCanvasPixelData(canvas).map((rgb) => state(rgb))
  console.log({ rgbHexPixels })

  const api = {
    setAsset: async (asset: AssetState) => {
      currentAsset.val = asset
      const { sprite } = asset
      initializeCanvas(canvas)
      palette.val = []
      rgbHexPixels.forEach((px) => (px.val = RGB_TRANSPARENT))
      dataUrl.val = EMPTY_SPRITE
      await blitSpriteToCanvas(canvas, sprite)
      palette.val = createPaletteFromCanvas(canvas)
      getCanvasPixelData(canvas).forEach((rgb, i) => (rgbHexPixels[i]!.val = rgb))
      dataUrl.val = canvas.toDataURL()
    },
    cloneAsset: () => {
      const asset = currentAsset.val
      assert(asset)
      const cloned = cloneAsset(asset)
      api.setAsset(cloned)
    },
    clearAsset: () => {
      api.setAsset(createNewAssetState())
    },
    setSelectedColor: (c: RgbHex) => {
      selectedColor.val = c
      currentTool.val = EditorTools.Draw
    },
    setPixel: (x: number, y: number) => {
      const asset = currentAsset.val
      assert(asset)
      if (currentTool.val === EditorTools.Erase) {
        clearPixel(x, y, canvas)
        rgbHexPixels[y * SPRITE_SIZE + x]!.val = RGB_TRANSPARENT
      } else {
        drawPixel(x, y, selectedColor.val, canvas)
        rgbHexPixels[y * SPRITE_SIZE + x]!.val = rgbToRgba(selectedColor.val, 255)
      }
      palette.val = createPaletteFromCanvas(canvas)
      dataUrl.val = canvas.toDataURL()
      currentAsset.val = { ...asset, sprite: dataUrl.val }
    },
    setTool: (_c: EditorTools) => {
      currentTool.val = _c
    },
    currentTool,
    selectedColor,
    currentAsset,
    rgbHexPixels,
    palette,
    canvas,
    dataUrl
  }
  return api
}
export type AssetEditorApi = ReturnType<typeof createAssetEditorStore>
