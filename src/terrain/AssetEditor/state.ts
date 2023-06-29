import { nanoid } from 'nanoid'
import { writable } from 'svelte/store'
import { Opaque, PartialDeep, SetReturnType } from 'type-fest'
import { RgbHex } from '../../helpers'
import { uniq } from '../../util/uniq'

export const RGB_TRANSPARENT = '#00000000' as RgbHex
export const RGB_BLACK = '#000000' as RgbHex
export const RGB_GREEN = '#00FF00' as RgbHex
export const RGB_WHITE = '#FFFFFF' as RgbHex

export const SPRITE_SIZE = 16
export const TILE_SIZE = 50
export enum EditorTools {
  Draw,
  Erase
}
export const TOOL_NAMES: { [_ in EditorTools]: string } = {
  [EditorTools.Draw]: '✏️',
  [EditorTools.Erase]: '🧹'
}

export const px = (s: number) => `${s}px`

export type AssetId = Opaque<string, 'asset-id'>
export type Asset = {
  id: AssetId
  sprite: string[]
}

export const mkTool = (s: string) => parseInt(s) as EditorTools

export function toHex(value: number): string {
  const hex = value.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}

export function createPaletteFromCanvas(canvas: Canvas): Palette {
  const imageData = ctx(canvas).getImageData(0, 0, canvas.width, canvas.height)
  const pixelData = imageData.data
  const flattened: Palette = []

  for (let i = 0; i < pixelData.length; i += 4) {
    const red = pixelData[i]!
    const green = pixelData[i + 1]!
    const blue = pixelData[i + 2]!
    const rgbHex = `#${toHex(red)}${toHex(green)}${toHex(blue)}` as RgbHex
    flattened.push(rgbHex)
  }

  const nonTransparent = uniq(flattened).filter((c) => c !== RGB_TRANSPARENT)
  return nonTransparent
}

export type Canvas = Opaque<
  Omit<HTMLCanvasElement, 'toDataURL'> & {
    toDataURL: SetReturnType<HTMLCanvasElement['toDataURL'], Sprite>
  },
  'canvas'
>

export type Sprite = Opaque<string, 'sprite'>

export type AssetState = {
  id: AssetId
  name: string
  canvas: Canvas
  sprite: Sprite
  palette: Palette
}

export const createNewAssetState = async (): Promise<AssetState> => {
  const canvas = await createCanvas()
  return {
    id: newAssetId(),
    name: 'New Asset',
    canvas,
    sprite: canvas.toDataURL(),
    palette: createPaletteFromCanvas(canvas)
  }
}

export const mkAssetId = (id: string) => id as AssetId
export const newAssetId = () => nanoid() as AssetId

export type AssetState_AtRest = Pick<AssetState, 'id' | 'name' | 'sprite'>
export type Asset_AtRest_Untrusted = PartialDeep<AssetState_AtRest>
export const atRestAsset = (asset: AssetState): AssetState_AtRest => {
  const { sprite, id, name } = asset
  return { sprite, id, name }
}

const createCanvas = async (sprite?: Sprite) => {
  const canvas = document.createElement('canvas') as Canvas
  canvas.width = SPRITE_SIZE
  canvas.height = SPRITE_SIZE

  if (sprite) {
    {
      await new Promise<void>((resolve) => {
        const imageObj = new Image()
        imageObj.onload = function () {
          ctx(canvas).drawImage(imageObj, 0, 0)
          resolve()
        }
        imageObj.src = sprite
      })
    }
  }
  return canvas
}

const EMPTY_SPRITE = 'data:null' as Sprite

export const inMemoryAsset = async (untrustedAsset: Asset_AtRest_Untrusted) => {
  const trustedAsset: AssetState_AtRest = {
    id: newAssetId(),
    sprite: EMPTY_SPRITE,
    name: `Unknown asset`,
    ...untrustedAsset
  }
  const { id, sprite, name } = trustedAsset
  const canvas = await createCanvas(sprite)
  const memory: AssetState = {
    id,
    name,
    canvas,
    sprite,
    palette: createPaletteFromCanvas(canvas)
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

const ctx = (canvas: Canvas) => {
  const context = canvas.getContext('2d')
  if (!context) throw new Error(`ctx required`)
  return context
}

function drawPixel(x: number, y: number, color: RgbHex, canvas: Canvas): void {
  // Convert the RGB hex value to individual RGB components
  const red = parseInt(color.slice(1, 3), 16)
  const green = parseInt(color.slice(3, 5), 16)
  const blue = parseInt(color.slice(5, 7), 16)
  const context = ctx(canvas)
  context.fillStyle = `rgb(${red}, ${green}, ${blue})`
  context.fillRect(x, y, 1, 1)
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
        selectedColor
      }))
    },
    setPixel: (x: number, y: number) => {
      console.log({ x, y })
      updateAsset((state, asset) => {
        const { currentTool, selectedColor } = state
        const { canvas } = asset
        drawPixel(x, y, currentTool === EditorTools.Draw ? selectedColor : RGB_TRANSPARENT, canvas)
        return {
          ...asset,
          sprite: canvas.toDataURL(),
          palette: createPaletteFromCanvas(canvas)
        }
      })
    },
    setTool: (currentTool: EditorTools) => update((state) => ({ ...state, currentTool }))
  }
  return api
}
export type AssetEditorApi = ReturnType<typeof createAssetEditorStore>
