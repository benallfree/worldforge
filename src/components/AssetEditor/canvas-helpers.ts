import { Opaque, SetReturnType } from 'type-fest'
import { SPRITE_SIZE } from '../../constants/sprite'
import {
  RgbHex,
  RgbaHex,
  base10RgbToCssRgb,
  base10RgbaToHex,
  parseRgbHex,
  pixelDataToParsedRgba
} from '../../types/RgbHex'
import { Sprite } from '../../types/Sprite'

export type Canvas = Opaque<
  Omit<HTMLCanvasElement, 'toDataURL'> & {
    toDataURL: SetReturnType<HTMLCanvasElement['toDataURL'], Sprite>
  },
  'canvas'
>
const ctx = (canvas: Canvas) => {
  const context = canvas.getContext('2d')
  if (!context) throw new Error(`ctx required`)
  return context
}
export const initializeCanvas = (canvas: Canvas) => {
  canvas.width = SPRITE_SIZE
  canvas.height = SPRITE_SIZE
  ctx(canvas).clearRect(0, 0, SPRITE_SIZE - 1, SPRITE_SIZE - 1)
}
export const createCanvas = () => {
  const canvas = document.createElement('canvas') as Canvas
  initializeCanvas(canvas)
  return canvas
}
export const blitSpriteToCanvas = async (canvas: Canvas, sprite: Sprite) => {
  await new Promise<void>((resolve) => {
    const imageObj = new Image()
    imageObj.onload = function () {
      ctx(canvas).drawImage(imageObj, 0, 0)
      resolve()
    }
    imageObj.src = sprite
  })
}
export const clearPixel = (x: number, y: number, canvas: Canvas) => {
  const context = ctx(canvas)
  context.clearRect(x, y, 1, 1)
}
export function drawPixel(x: number, y: number, color: RgbHex | RgbaHex, canvas: Canvas): void {
  // Convert the RGB hex value to individual RGB components
  const context = ctx(canvas)
  context.clearRect(x, y, 1, 1)
  const { red, green, blue } = parseRgbHex(color)
  const rgb = base10RgbToCssRgb(red, green, blue)
  context.fillStyle = rgb
  context.fillRect(x, y, 1, 1)
}
export function getCanvasPixelData(canvas: Canvas) {
  const context = ctx(canvas)
  const { width, height } = canvas
  const imageData = context.getImageData(0, 0, width, height).data
  const pixels: string[] = []

  for (let i = 0; i < imageData.length; i += 4) {
    const { red, green, blue, alpha } = pixelDataToParsedRgba(imageData, i)
    const hex = base10RgbaToHex(red, green, blue, alpha)
    pixels.push(hex)
  }

  return pixels as RgbaHex[]
}
