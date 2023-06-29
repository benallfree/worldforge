import { RgbHex } from '../../../helpers'

export const RGB_TRANSPARENT = '#00000000' as RgbHex
export const RGB_BLACK = '#000000' as RgbHex
export const RGB_GREEN = '#00FF00' as RgbHex
export const RGB_WHITE = '#FFFFFF' as RgbHex

export function convertRGBArrayToImageData(rgbArray: string[][]): string {
  const width = rgbArray[0].length
  const height = rgbArray.length
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Canvas context is not supported.')
  }

  const imageData = context.createImageData(width, height)
  let dataIndex = 0

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const hexValue = rgbArray[y][x]
      const red = parseInt(hexValue.substring(1, 3), 16)
      const green = parseInt(hexValue.substring(3, 5), 16)
      const blue = parseInt(hexValue.substring(5, 7), 16)

      imageData.data[dataIndex++] = red
      imageData.data[dataIndex++] = green
      imageData.data[dataIndex++] = blue
      imageData.data[dataIndex++] = 255 // Alpha value (fully opaque)
    }
  }

  context.putImageData(imageData, 0, 0)
  const dataURL = canvas.toDataURL('image/png')

  return dataURL
}

export function convertImageDataToRGBArray(dataURL: string): Promise<string[][]> {
  const canvas = document.createElement('canvas')
  const image = new Image()

  return new Promise<string[][]>((resolve, reject) => {
    image.onload = () => {
      canvas.width = image.width
      canvas.height = image.height
      const context = canvas.getContext('2d')

      if (!context) {
        reject(new Error('Canvas context is not supported.'))
        return
      }

      context.drawImage(image, 0, 0)
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      const rgbArray: string[][] = []

      let pixelIndex = 0
      for (let y = 0; y < canvas.height; y++) {
        const row: string[] = []

        for (let x = 0; x < canvas.width; x++) {
          const red = imageData.data[pixelIndex++]
          const green = imageData.data[pixelIndex++]
          const blue = imageData.data[pixelIndex++]
          pixelIndex++ // Skip alpha value

          const hexValue = `#${toHex(red)}${toHex(green)}${toHex(blue)}`
          row.push(hexValue)
        }

        rgbArray.push(row)
      }

      resolve(rgbArray)
    }

    image.onerror = () => {
      reject(new Error('Failed to load the image.'))
    }

    image.src = dataURL
  })
}

function toHex(value: number): string {
  const hex = value.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}
