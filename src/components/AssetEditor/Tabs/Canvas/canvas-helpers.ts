import { SPRITE_SIZE } from '@/constants'
import {
  AssetState,
  RgbHex,
  RgbaHex,
  Sprite,
  base10RgbToCssRgb,
  base10RgbaToHex,
  parseRgbHex,
  pixelDataToParsedRgba
} from '@/types'
import { Opaque, SetReturnType } from 'type-fest'

export const scaleDataURL = (img: HTMLImageElement, scale: number) => {
  const canvas = document.createElement('canvas')
  canvas.width = img.width * scale
  canvas.height = img.height * scale
  const _c = ctx(canvas)
  _c.imageSmoothingEnabled = false
  _c.drawImage(img, 0, 0, canvas.width, canvas.height)
  const scaledDataURL = canvas.toDataURL()
  return scaledDataURL
}

export const mkTilingProof = <T extends HTMLImageElement>(img: T, N: number): string => {
  const canvas = document.createElement('canvas')
  const _ctx = ctx(canvas)

  const scaledWidth = img.width * N
  const scaledHeight = img.height * N
  console.log({ scaledWidth })

  canvas.width = scaledWidth * 3
  canvas.height = scaledHeight * 2

  // Draw background #1
  _ctx.fillStyle = 'white'
  _ctx.fillRect(0, 0, scaledWidth, scaledHeight * 2)

  // Draw background #2
  _ctx.fillStyle = 'black'
  _ctx.fillRect(scaledWidth, 0, scaledWidth * 2, scaledHeight * 2)

  // Draw background #3
  _ctx.fillStyle = 'gray'
  _ctx.fillRect(scaledWidth * 2, 0, scaledWidth * 3, scaledHeight * 2)

  // Draw background #3 (checkered)
  const checkerSize = Math.ceil(scaledWidth / 8)
  const checkerWidth = Math.ceil(scaledWidth / checkerSize)
  const checkerHeight = Math.ceil((scaledHeight * 2) / checkerSize)
  _ctx.fillStyle = 'darkgray'
  for (let y = 0; y < checkerHeight; y++) {
    for (let x = 0; x < checkerWidth; x++) {
      if ((x + y) % 2 === 0) {
        _ctx.fillRect(scaledWidth * 2 + x * checkerSize, y * checkerSize, checkerSize, checkerSize)
      }
    }
  }

  // Draw the first row of images
  _ctx.imageSmoothingEnabled = false
  _ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, scaledWidth, scaledHeight)
  _ctx.drawImage(img, 0, 0, img.width, img.height, scaledWidth, 0, scaledWidth, scaledHeight)
  _ctx.drawImage(img, 0, 0, img.width, img.height, scaledWidth * 2, 0, scaledWidth, scaledHeight)

  // Draw the 9-up tiled images
  const tileSize = Math.ceil(scaledWidth / 3)
  const tileAcrossCount = Math.ceil(scaledWidth / tileSize)
  const tileDownCount = Math.ceil(scaledHeight / tileSize)
  for (let y = 0; y < tileDownCount * 3; y++) {
    for (let x = 0; x < tileAcrossCount * 3; x++) {
      _ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        x * tileSize,
        scaledHeight + y * tileSize,
        tileSize,
        tileSize
      )
    }
  }

  const resultDataURL = canvas.toDataURL()
  return resultDataURL
}

export type Canvas = Opaque<
  Omit<HTMLCanvasElement, 'toDataURL'> & {
    toDataURL: SetReturnType<HTMLCanvasElement['toDataURL'], Sprite>
  },
  'canvas'
>
export const ctx = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d')
  if (!context) throw new Error(`ctx required`)
  return context
}

export function cropCanvas(
  sourceCanvas: Canvas,
  x: number,
  y: number,
  width: number,
  height: number
): Canvas {
  const dstCanvas = document.createElement('canvas') as Canvas

  dstCanvas.width = width
  dstCanvas.height = height
  ctx(dstCanvas).drawImage(sourceCanvas, x, y, width, height, 0, 0, width, height)

  return dstCanvas
}

export function blitCanvas(
  sourceCanvas: HTMLCanvasElement,
  destinationCanvas: HTMLCanvasElement,
  x: number,
  y: number
): void {
  ctx(destinationCanvas).clearRect(x, y, sourceCanvas.width, sourceCanvas.height)
  ctx(destinationCanvas).drawImage(sourceCanvas, x, y)
}

export const initializeCanvasForAsset = (canvas: Canvas, asset: AssetState) => {
  const { spriteData } = asset
  const w = spriteData.highestFrameCount * SPRITE_SIZE
  const h = spriteData.animations.length * SPRITE_SIZE
  canvas.width = w
  canvas.height = h
  ctx(canvas).clearRect(0, 0, canvas.width - 1, canvas.width - 1)
}

export const createCanvas = () => {
  const canvas = document.createElement('canvas') as Canvas
  return canvas
}

export const dataUrlToimage = async (dataUrl: string) => {
  return new Promise<HTMLImageElement>((resolve) => {
    const imageObj = new Image()
    imageObj.onload = function () {
      resolve(imageObj)
    }
    imageObj.src = dataUrl
  })
}

export const blitImageToCanvas = (canvas: Canvas, img: HTMLImageElement) => {
  ctx(canvas).drawImage(img, 0, 0)
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

export function getCanvasPixelData(canvas: Canvas, x = 0, y = 0, w?: number, h?: number) {
  const context = ctx(canvas)
  const _w = w || canvas.width
  const _h = h || canvas.height
  const imageData = context.getImageData(x, y, _w, _h).data
  const pixels: string[] = []

  for (let i = 0; i < imageData.length; i += 4) {
    const { red, green, blue, alpha } = pixelDataToParsedRgba(imageData, i)
    const hex = base10RgbaToHex(red, green, blue, alpha)
    pixels.push(hex)
  }

  return pixels as RgbaHex[]
}
