import { Opaque } from 'type-fest'
import { RgbValue } from './state'

export type RgbaValue = Opaque<string, 'rgba-value'>
export const RGB_TRANSPARENT = '#00000000' as RgbaValue
export const RGB_BLACK = '#000000' as RgbValue
export const RGB_GREEN = '#00FF00' as RgbValue
export const RGB_WHITE = '#FFFFFF' as RgbValue

export const COLOR_SEEDS = [
  '#000000',
  '#191970',
  '#008000',
  '#2f4f4f',
  '#0000cd',
  '#800000',
  '#8b008b',
  '#808000',
  '#ffa500',
  '#8b4513',
  '#ff00ff',
  '#ffd700',
  '#00ff00',
  '#00ffff',
  '#ff0000',
  '#ffffff'
] as RgbValue[]

export function generateComplementaryColors(startColor: string): RgbValue[] {
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

  return colors as RgbValue[]
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
