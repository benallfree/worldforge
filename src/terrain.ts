import { map as _map, forEach } from '@s-libs/micro-dash'
import { writable } from 'svelte/store'
import { JsonObject, Opaque } from 'type-fest'

export type CountPicker = typeof DEFAULT_FEATURE_COUNT_PICKER
export const DEFAULT_FEATURE_COUNT_PICKER = (r: number, c: number) => {
  const area = r * c
  const quadRoot = Math.pow(area, 0.25)
  const n = Math.max(1, Math.min(Math.ceil(quadRoot), Math.floor(quadRoot) + 1))
  return n
}

export function chooseRandomPoints(r: Row, c: Column, nPeaks: number): OrderedPair[] {
  const points: OrderedPair[] = []
  while (points.length < nPeaks) {
    const randomRow = mkRow(Math.floor(Math.random() * r))
    const randomCol = mkCol(Math.floor(Math.random() * c))
    const point = mkOrdinalPair(randomRow, randomCol)

    if (!points.some(([row, col]) => row === randomRow && col === randomCol)) {
      points.push(point)
    }
  }

  console.log({ nPeaks, points })

  return points
}

export const mkJsonObject = (o: object) => JSON.parse(JSON.stringify(o)) as JsonObject
export const mkHeight = (height: number) => {
  if (height < MIN_HEIGHT || height > MAX_HEIGHT) throw new Error(`Invalid height ${height}`)
  return height as Height
}
export const mkRawHeight = (height: number) => {
  return height as RawHeight
}
export const mkRowOffset = (r: number) => {
  return r as RowOffset
}
export const mkColOffset = (r: number) => {
  return r as ColumnOffset
}
export const mkRow = (r: number) => {
  if (r < 0 || r > MAX_GRID_SIZE) throw new Error(`Row size ${r} out of range`)
  return r as Row
}
export const mkCol = (c: number) => {
  if (c < 0 || c > MAX_GRID_SIZE) throw new Error(`Row size ${c} out of range`)
  return c as Column
}
const MAX_GRID_SIZE = 100
export const mkGridSize = (sz: number) => {
  if (sz < 0 || sz > MAX_GRID_SIZE) throw new Error(`Grid size ${sz} out of range`)
  return sz as GridSize
}
export const mkOrdinalPair = (row: Row | string, col: Column | string): OrderedPair =>
  [mkRow(parseInt(row.toString())), mkCol(parseInt(col.toString()))] as OrderedPair

export const MAX_HEIGHT = 999 as Height
export const MIN_HEIGHT = 0 as Height

export enum TerrainType {
  Rock = 'R',
  Spring = 'S',
  Water = 'W',
  Land = 'L'
}
export const rcToCoord = (r: Row | number, c: Column | number) => `${r}:${c}` as Coordiante
export const coordToRc = (id: Coordiante): OrderedPair => {
  const [r, c] = id.split(/:/)
  if (typeof r === 'undefined' || typeof c === 'undefined') {
    throw new Error(`${id} is not a valid coordinate`)
  }

  return mkOrdinalPair(r, c)
}
export const mkRgbHex = (s: string) => s as RgbHex

export type GridSize = Opaque<number, 'gridsize'>
export type Ordinal = Opaque<number, 'ordinal'>
export type Coordiante = Opaque<string, 'coordinate'>
export type Row = Opaque<number, 'row'>
export type RowOffset = Opaque<number, 'row-offset'>
export type Column = Opaque<number, 'column'>
export type ColumnOffset = Opaque<number, 'column-offset'>
export type Height = Opaque<number, 'height'>
export type RawHeight = Opaque<number, 'raw-height'>
export type RgbHex = Opaque<string, 'rgb-hex'>
export type TerrainCell = {
  r: Row
  c: Column
  type: TerrainType
  height: Height
  topographicalHeat: () => RgbHex
}
export type TerrainCell_Create = Partial<Omit<TerrainCell, 'r' | 'c'>>

export type PeakCell = TerrainCell & {
  type: TerrainType.Rock
}
export type SpringCell = TerrainCell & { type: TerrainType.Spring }
export type Terrain = {
  topographicalHeat: (h: Height) => RgbHex
  minHeight: Height
  maxHeight: Height
  size: GridSize
  cells: {
    [coord: string]: TerrainCell
  }
}

export type OrderedPair = Opaque<[Row, Column], 'ordinal-pair'>

function generateHeightArray(
  centerHeight: Height,
  gridSize: GridSize,
  decayFactor: number
): RawHeight[][] {
  const centerX = Math.floor(gridSize / 2)
  const centerY = Math.floor(gridSize / 2)

  // Calculate the heights for each cell in the grid
  const heightArray: RawHeight[][] = []
  for (let i = 0; i < gridSize; i++) {
    heightArray.push([])
    for (let j = 0; j < gridSize; j++) {
      const dx = i - centerX
      const dy = j - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const height = Math.max(0, Number((centerHeight - distance * decayFactor).toFixed(2)))
      heightArray[i][j] = mkRawHeight(Number(height.toFixed(2)))
    }
  }

  return heightArray
}

export function centerAndCropArray(
  arr: Height[][],
  center: { r: Row; c: Column },
  size: number
): number[][] {
  const centeredArray: Height[][] = []

  const startRow = Math.max(0, center.r - Math.floor(size / 2))
  const startCol = Math.max(0, center.c - Math.floor(size / 2))
  const endRow = Math.min(arr.length - 1, startRow + size - 1)
  const endCol = Math.min(arr[0].length - 1, startCol + size - 1)

  for (let i = startRow; i <= endRow; i++) {
    const rowSubset: Height[] = []
    for (let j = startCol; j <= endCol; j++) {
      rowSubset.push(arr[i][j])
    }
    centeredArray.push(rowSubset)
  }
  console.log({ arr, center, size, startRow, startCol, endRow, endCol, centeredArray })

  return centeredArray
}

export function shiftGrid(grid: RawHeight[][], r: RowOffset, c: ColumnOffset): RawHeight[][] {
  const rows = grid.length
  const cols = grid[0].length

  const shiftedGrid: RawHeight[][] = []

  for (let i = 0; i < rows; i++) {
    const newRow: RawHeight[] = []
    for (let j = 0; j < cols; j++) {
      const newRowIdx = i - r
      const newColIdx = j - c

      if (newRowIdx >= 0 && newRowIdx < rows && newColIdx >= 0 && newColIdx < cols) {
        newRow.push(grid[newRowIdx][newColIdx])
      } else {
        newRow.push(mkRawHeight(MIN_HEIGHT))
      }
    }
    shiftedGrid.push(newRow)
  }

  return shiftedGrid
}

export const cropGrid = (grid: RawHeight[][], rows: Row, cols: Column) => {
  const cropped: RawHeight[][] = []

  for (let i = 0; i < rows; i++) {
    cropped.push(grid[i].slice(0, cols))
  }

  return cropped
}

export const generateDecay = (id: Coordiante, data: TerrainCell, size: GridSize) => {
  // console.log({ id, data, size })
  const decaySize = (size * 4) as GridSize
  const decay = generateHeightArray(data.height, decaySize, 0.7)
  const [r, c] = coordToRc(id)
  const shifted = shiftGrid(decay, mkRowOffset(-size * 2 + r), mkColOffset(-size * 2 + c))
  const cropped = cropGrid(shifted, mkRow(size), mkCol(size))
  // console.log({ decay, shifted, cropped })
  return cropped
}

export function createGradientFactory(color1: RgbHex, color2: RgbHex, min: Height, max: Height) {
  const hexToRgb = (hex: RgbHex) => {
    const bigint = parseInt(hex.slice(1), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return [r, g, b]
  }

  const interpolate = (val: number, minVal: number, maxVal: number) => {
    return minVal + (maxVal - minVal) * val
  }

  const color1Rgb = hexToRgb(color1)
  const color2Rgb = hexToRgb(color2)

  return function (value: Height): RgbHex {
    const ratio = (value - min) / (max - min)

    const r = Math.round(interpolate(ratio, color1Rgb[0], color2Rgb[0]))
    const g = Math.round(interpolate(ratio, color1Rgb[1], color2Rgb[1]))
    const b = Math.round(interpolate(ratio, color1Rgb[2], color2Rgb[2]))

    // const rgb = (r << 16) | (g << 8) | b
    // const hex = (rgb | 0x1000000).toString(16).slice(1)

    // const hex = `${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`

    const rgb = (r << 16) | (g << 8) | b

    const hex = rgb < 0 ? `000000` : rgb.toString(16).padStart(6, '0')

    return `#${hex}` as RgbHex
  }
}

export type TerrainConfig = { size: GridSize; nPeaks: number }

export const createTerrain = (config: TerrainConfig) => {
  const { size, nPeaks } = config
  console.log({ size, nPeaks })
  const terrain: Terrain = {
    topographicalHeat: () => {
      throw new Error(`Abstract`)
    },
    minHeight: Number.POSITIVE_INFINITY as Height,
    maxHeight: Number.NEGATIVE_INFINITY as Height,
    size,
    cells: {}
  }

  const c2rcGuard = (id: Coordiante): OrderedPair => {
    const [r, c] = coordToRc(id)
    if (r > size - 1 || c > size - 1) throw new Error(`${r},${c} out of range of grid size ${size}`)
    return mkOrdinalPair(r, c)
  }

  const setCell = (id: Coordiante, data?: TerrainCell_Create) => {
    const [r, c] = c2rcGuard(id)
    const newCell: TerrainCell = {
      type: TerrainType.Land,
      height: mkHeight(MIN_HEIGHT),
      ...data,
      r,
      c,
      topographicalHeat: () => terrain.topographicalHeat(newCell.height)
    }
    return (terrain.cells[id] = newCell)
  }

  const getCell = (id: Coordiante): TerrainCell => {
    const [r, c] = c2rcGuard(id)
    return terrain.cells[id] || setCell(id)
  }

  const mapCells = <O>(iteratee: (cell: TerrainCell, coord: Coordiante) => O) =>
    _map<Terrain['cells'], O>(terrain.cells, (v, k) => iteratee(v, k as Coordiante))

  // Generate mountain peaks
  chooseRandomPoints(mkRow(size), mkCol(size), nPeaks).forEach(([r, c]) => {
    setCell(rcToCoord(r, c), { type: TerrainType.Rock, height: mkHeight(9) })
  })

  console.log(`just peaks`, { terrain: mkJsonObject(terrain) })

  // Calc heights
  mapCells((terrainCell, id): void => {
    const decay = generateDecay(id, terrainCell, size)
    console.log({ cell: mkJsonObject(terrainCell), decay: mkJsonObject(decay) })
    forEach(decay, (row, dr: Row) => {
      forEach(row, (dHeight, dc: Column) => {
        const dCoord = rcToCoord(dr, dc)
        const cell = getCell(dCoord)
        if (cell.height > dHeight) return
        if (cell.height === 0) {
          cell.height = mkHeight(dHeight)
          return
        }
        cell.height = Number(((cell.height + dHeight) / 2).toFixed(2)) as Height
        // console.log({ dr, dc, dCoord, cell: mkJsonObject(cell), minHeight })
      })
    })
  })

  // Calc min/max heights
  mapCells((cell, id): void => {
    terrain.minHeight = Math.min(cell.height, terrain.minHeight) as Height
    terrain.maxHeight = Math.max(cell.height, terrain.maxHeight) as Height
  })
  console.log(`before normalizing`, { terrain: mkJsonObject(terrain) })

  mapCells((cell, id): void => {
    // console.log({ cell: mkJsonObject(cell), minHeight })
    cell.height = mkHeight(Number((cell.height - terrain.minHeight).toFixed(2)))
  })
  terrain.maxHeight = mkHeight(terrain.maxHeight - terrain.minHeight)
  terrain.minHeight = mkHeight(0)

  terrain.topographicalHeat = createGradientFactory(
    mkRgbHex('#0000FF'),
    mkRgbHex('#FF0000'),
    terrain.minHeight,
    terrain.maxHeight
  )

  console.log(`after normalizing`, { terrain: mkJsonObject(terrain) })

  // Usage example
  //   const centerHeight = 9
  //   const decayFactor = 0.5
  //   const gridHeightArray = generateHeightArray(centerHeight, size, decayFactor)
  console.log(mkJsonObject({ terrain }))

  return {
    set: setCell,
    get: getCell,
    map: mapCells,
    size: () => size
  }
}

export const terrain = writable(createTerrain({ size: mkGridSize(20), nPeaks: 7 }))
