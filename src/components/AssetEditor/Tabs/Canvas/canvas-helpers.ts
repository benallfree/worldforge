import { Opaque, SetReturnType } from 'type-fest'
import { SPRITE_SIZE } from '../../../../constants/sprite'
import {
  RgbHex,
  RgbaHex,
  base10RgbToCssRgb,
  base10RgbaToHex,
  parseRgbHex,
  pixelDataToParsedRgba
} from '../../../../types/RgbHex'
import { Sprite } from '../../../../types/Sprite'

export const scaleDataURL = async <T extends string>(dataURL: T, scale: number): Promise<T> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width * scale
      canvas.height = img.height * scale
      const _c = ctx(canvas)
      _c.imageSmoothingEnabled = false
      _c.drawImage(img, 0, 0, canvas.width, canvas.height)
      const scaledDataURL = canvas.toDataURL()
      resolve(scaledDataURL as T)
    }
    img.onerror = () => {
      reject(new Error('Failed to load image.'))
    }
    img.src = dataURL
  })
}

export const mkTilingProof = async <T extends string>(dataURL: T, N: number): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      reject('Canvas context is not supported')
      return
    }

    const img = new Image()
    img.onload = () => {
      const scaledWidth = img.width * N
      const scaledHeight = img.height * N
      console.log({ scaledWidth })

      canvas.width = scaledWidth * 3
      canvas.height = scaledHeight * 2

      // Draw background #1
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, scaledWidth, scaledHeight * 2)

      // Draw background #2
      ctx.fillStyle = 'black'
      ctx.fillRect(scaledWidth, 0, scaledWidth * 2, scaledHeight * 2)

      // Draw background #3
      ctx.fillStyle = 'gray'
      ctx.fillRect(scaledWidth * 2, 0, scaledWidth * 3, scaledHeight * 2)

      // Draw background #3 (checkered)
      const checkerSize = Math.ceil(scaledWidth / 8)
      const checkerWidth = Math.ceil(scaledWidth / checkerSize)
      const checkerHeight = Math.ceil((scaledHeight * 2) / checkerSize)
      ctx.fillStyle = 'darkgray'
      for (let y = 0; y < checkerHeight; y++) {
        for (let x = 0; x < checkerWidth; x++) {
          if ((x + y) % 2 === 0) {
            ctx.fillRect(
              scaledWidth * 2 + x * checkerSize,
              y * checkerSize,
              checkerSize,
              checkerSize
            )
          }
        }
      }

      // Draw the first row of images
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, scaledWidth, scaledHeight)
      ctx.drawImage(img, 0, 0, img.width, img.height, scaledWidth, 0, scaledWidth, scaledHeight)
      ctx.drawImage(img, 0, 0, img.width, img.height, scaledWidth * 2, 0, scaledWidth, scaledHeight)

      // Draw the 9-up tiled images
      const tileSize = Math.ceil(scaledWidth / 3)
      const tileAcrossCount = Math.ceil(scaledWidth / tileSize)
      const tileDownCount = Math.ceil(scaledHeight / tileSize)
      for (let y = 0; y < tileDownCount * 3; y++) {
        for (let x = 0; x < tileAcrossCount * 3; x++) {
          ctx.drawImage(
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
      resolve(resultDataURL as T)
    }

    img.onerror = (error) => {
      reject(`Error loading image: ${error}`)
    }

    img.src = dataURL
  })
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
