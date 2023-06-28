export function generateEvenlySpacedColors(N: number): string[] {
  const colors: string[] = []
  const increment = 360 / N

  for (let i = 0; i < N; i++) {
    const hue = i * increment
    const rgb = hslToRgb(hue, 100, 50)
    const hex = rgbToHex(rgb[0], rgb[1], rgb[2])
    colors.push(hex)
  }

  return colors
}
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360
  s /= 100
  l /= 100

  let r, g, b

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const hueToRgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = Math.round(hueToRgb(p, q, h + 1 / 3) * 255)
    g = Math.round(hueToRgb(p, q, h) * 255)
    b = Math.round(hueToRgb(p, q, h - 1 / 3) * 255)
  }

  return [r, g, b]
}
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}
function componentToHex(c: number): string {
  const hex = c.toString(16)
  return hex.length === 1 ? `0${hex}` : hex
}
