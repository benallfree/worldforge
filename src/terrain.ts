import { map as _map } from '@s-libs/micro-dash'
import { writable } from 'svelte/store'
import { JsonObject, Opaque } from 'type-fest'
import { generateTopology } from './topology'

export type CountPicker = typeof DEFAULT_FEATURE_COUNT_PICKER
export const DEFAULT_FEATURE_COUNT_PICKER = (r: number, c: number) => {
  const area = r * c
  const quadRoot = Math.pow(area, 0.25)
  const n = Math.max(1, Math.min(Math.ceil(quadRoot), Math.floor(quadRoot) + 1))
  return n
}

export const mkJsonObject = (o: object) => JSON.parse(JSON.stringify(o)) as JsonObject
export const mkHeight = (height: number) => {
  if (height < MIN_HEIGHT || height > MAX_HEIGHT) throw new Error(`Invalid height ${height}`)
  return height as Height
}
export const mkXOffset = (xOffset: number) => {
  return xOffset as XOffset
}
export const mkYOffset = (yOffset: number) => {
  return yOffset as YOffset
}
export const mkX = (x: number) => {
  if (x < 0 || x > MAX_GRID_SIZE) throw new Error(`Row size ${x} out of range`)
  return x as XCoordinate
}
export const mkY = (y: number) => {
  if (y < 0 || y > MAX_GRID_SIZE) throw new Error(`Row size ${y} out of range`)
  return y as YCoordinate
}
const MAX_GRID_SIZE = 100
export const mkGridSize = (sz: number) => {
  if (sz < 0 || sz > MAX_GRID_SIZE) throw new Error(`Grid size ${sz} out of range`)
  return sz as GridSize
}
export const xyToPointArray = (x: XCoordinate | string, y: YCoordinate | string): PointArray =>
  [mkX(parseInt(x.toString())), mkY(parseInt(y.toString()))] as PointArray

export const xyToPoint = (x: XCoordinate | string, y: YCoordinate | string): Point =>
  ({ x: mkX(parseInt(x.toString())), y: mkY(parseInt(y.toString())) } as Point)

export const MAX_HEIGHT = 999 as Height
export const MIN_HEIGHT = 0 as Height

export enum TerrainType {
  Rock = 'R',
  Spring = 'S',
  Water = 'W',
  Land = 'L'
}
export const xyToSlug = (x: XCoordinate | number, y: YCoordinate | number) =>
  `${x}:${y}` as PointSlug

export const pointArrayToSlug = (p: PointArray): PointSlug => xyToSlug(p[0], p[1])
export const pointToSlug = ({ x, y }: Point): PointSlug => xyToSlug(x, y)

export const slugToPoint = (slug: PointSlug): Point => {
  const [x, y] = slug.split(/:/)
  if (typeof x === 'undefined' || typeof y === 'undefined') {
    throw new Error(`${slug} is not a valid coordinate`)
  }

  return xyToPoint(x, y)
}

export type GridSize = Opaque<number, 'gridsize'>
export type Ordinal = Opaque<number, 'ordinal'>
export type PointSlug = Opaque<string, 'coordinate'>
export type XCoordinate = Opaque<number, 'x-coordinate'>
export type XOffset = Opaque<number, 'row-offset'>
export type YCoordinate = Opaque<number, 'y-coordinate'>
export type YOffset = Opaque<number, 'column-offset'>
export type Height = Opaque<number, 'height'>
export type RgbHex = Opaque<string, 'rgb-hex'>
export type TerrainCell = {
  slug: PointSlug
  pointArr: PointArray
  point: Point
  x: XCoordinate
  y: YCoordinate
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

export type PointArray = Opaque<[XCoordinate, YCoordinate], 'point-array'>
export type Point = Opaque<{ x: XCoordinate; y: YCoordinate }, 'point'>

export type TerrainConfig = { size: GridSize; nPeaks: GridSize }

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

  const createTerrainCell = (p: Point, data?: TerrainCell_Create) => {
    const { x, y } = p
    const newCell: TerrainCell = {
      type: TerrainType.Land,
      height: mkHeight(MIN_HEIGHT),
      ...data,
      slug: pointToSlug(p),
      pointArr: xyToPointArray(x, y),
      point: p,
      x,
      y,
      topographicalHeat: () => terrain.topographicalHeat(newCell.height)
    }
    return newCell
  }

  const setCell = (p: Point, data?: TerrainCell_Create) => {
    const cell = createTerrainCell(p, data)
    terrain.cells[cell.slug] = cell
    return cell
  }

  const getCellBySlug = (slug: PointSlug): TerrainCell => {
    return terrain.cells[slug] || setCell(slugToPoint(slug))
  }

  const mapCells = <O>(iteratee: (cell: TerrainCell, slug: PointSlug) => O) =>
    _map<Terrain['cells'], O>(terrain.cells, (v, k) => iteratee(v, k as PointSlug))

  const api = {
    set: setCell,
    get: getCellBySlug,
    map: mapCells,
    size: () => size,
    minHeight: (h?: Height | number, force = false) => {
      if (typeof h === 'undefined') return terrain.minHeight
      if (force) return (terrain.minHeight = mkHeight(h))
      return (terrain.minHeight = mkHeight(Math.min(h, terrain.minHeight)))
    },
    maxHeight: (h?: Height | number, force = false) => {
      if (typeof h === 'undefined') return terrain.maxHeight
      if (force) return (terrain.maxHeight = mkHeight(h))
      return (terrain.maxHeight = mkHeight(Math.max(h, terrain.maxHeight)))
    }
  }

  const { topographicalHeat } = generateTopology(api, nPeaks)
  terrain.topographicalHeat = topographicalHeat

  // Usage example
  //   const centerHeight = 9
  //   const decayFactor = 0.5
  //   const gridHeightArray = generateHeightArray(centerHeight, size, decayFactor)
  console.log(mkJsonObject({ terrain }))

  return api
}
export type TerrainApi = ReturnType<typeof createTerrain>

export const terrain = writable(createTerrain({ size: mkGridSize(20), nPeaks: mkGridSize(7) }))
