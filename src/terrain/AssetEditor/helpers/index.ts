import { RgbHex } from '../../../helpers'
import { generateEvenlySpacedColors } from './generateEvenlySpacedColors'

export const RGB_TRANSPARENT = '#00000000' as RgbHex
export const RGB_BLACK = '#000000' as RgbHex
export const RGB_GREEN = '#00FF00' as RgbHex
export const RGB_WHITE = '#FFFFFF' as RgbHex

export const COLOR_SEEDS = generateEvenlySpacedColors(32) as RgbHex[]

export function generateColorSpectrum(rgbHex: string): string[] {
  const lightenFactor = 0.06
  const darkenFactor = 0.06
  const colors: string[] = []

  // Convert hex value to RGB
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return { r, g, b }
  }

  // Convert RGB to hex value
  const rgbToHex = (rgb: { r: number; g: number; b: number }) => {
    const { r, g, b } = rgb
    const componentToHex = (c: number) => {
      const hex = c.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
  }

  const rgb = hexToRgb(rgbHex)
  let currentColor = rgb

  // Generate progressively lightened colors
  {
    const tmp: string[] = []
    do {
      currentColor = {
        r: Math.min(Math.round(currentColor.r + (255 - currentColor.r) * lightenFactor), 255),
        g: Math.min(Math.round(currentColor.g + (255 - currentColor.g) * lightenFactor), 255),
        b: Math.min(Math.round(currentColor.b + (255 - currentColor.b) * lightenFactor), 255)
      }
      const hex = rgbToHex(currentColor)
      if (tmp[tmp.length - 1] === hex) break // Seen this color
      tmp.push(hex)
    } while (true)
    colors.push(...tmp.reverse())
  }

  currentColor = rgb

  // Generate progressively darkened colors
  {
    const tmp: string[] = []
    do {
      currentColor = {
        r: Math.max(Math.round(currentColor.r * (1 - darkenFactor)), 0),
        g: Math.max(Math.round(currentColor.g * (1 - darkenFactor)), 0),
        b: Math.max(Math.round(currentColor.b * (1 - darkenFactor)), 0)
      }
      const hex = rgbToHex(currentColor)
      if (tmp[tmp.length - 1] === hex) break // Seen this color
      tmp.push(hex)
    } while (true)
    colors.push(...tmp)
  }

  return colors
}

export function generateComplementaryColors(startColor: string): RgbHex[] {
  // Convert startColor to RGB values
  const startRgb = hexToRgb(startColor)

  // Calculate the complementary color
  const complementaryRgb = calculateComplementaryColor(startRgb)

  // Generate a set of 16 colors including the start and complementary colors
  const colors: string[] = []
  colors.push(startColor)

  for (let i = 1; i < 16; i++) {
    const ratio = i / 16
    const interpolatedRgb = interpolateColors(startRgb, complementaryRgb, ratio)
    const interpolatedHex = rgbToHex(interpolatedRgb)
    colors.push(interpolatedHex)
  }

  return colors as RgbHex[]
}

// Helper function to convert hex color to RGB values
export function hexToRgb(hex: string): number[] {
  const trimmedHex = hex.replace(/^#/, '')
  const bigint = parseInt(trimmedHex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return [r, g, b]
}

// Helper function to convert RGB values to hex color
export function rgbToHex(rgb: number[]): string {
  const [r, g, b] = rgb
  const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')
  return `#${hex}`
}

// Helper function to calculate complementary color
export function calculateComplementaryColor(rgb: number[]): number[] {
  const [r, g, b] = rgb
  const complementaryR = 255 - r
  const complementaryG = 255 - g
  const complementaryB = 255 - b
  return [complementaryR, complementaryG, complementaryB]
}

// Helper function to interpolate colors
export function interpolateColors(color1: number[], color2: number[], ratio: number): number[] {
  const [r1, g1, b1] = color1
  const [r2, g2, b2] = color2

  const interpolatedR = Math.round(r1 + (r2 - r1) * ratio)
  const interpolatedG = Math.round(g1 + (g2 - g1) * ratio)
  const interpolatedB = Math.round(b1 + (b2 - b1) * ratio)

  return [interpolatedR, interpolatedG, interpolatedB]
}

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
