import { map as _map } from '@s-libs/micro-dash'
import {
  GridSize,
  Height,
  MIN_HEIGHT,
  Point,
  PointSlug,
  Terrain,
  TerrainCell,
  TerrainCell_Create,
  TerrainType,
  mkGridSize,
  mkHeight,
  mkJsonObject,
  pointToSlug,
  slugToPoint,
  xyToPointArray
} from '../helpers'
import { RGB_TRANSPARENT } from './AssetEditor/helpers'

export type TerrainConfig = { size: GridSize; nPeaks: GridSize }

export const DEFAULT_GRID_SIZE = mkGridSize(20)
export const DEFAULT_PEAK_COUNT = mkGridSize(0)

export const createTerrain = (config?: Partial<TerrainConfig>) => {
  const _cnf: TerrainConfig = {
    size: DEFAULT_GRID_SIZE,
    nPeaks: DEFAULT_PEAK_COUNT,
    ...config
  }
  const { size, nPeaks } = _cnf
  console.log({ size, nPeaks })
  const terrain: Terrain = {
    topographicalHeat: () => RGB_TRANSPARENT,
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

  // const { topographicalHeat } = generateTopology(api, nPeaks)
  // terrain.topographicalHeat = topographicalHeat

  // Usage example
  //   const centerHeight = 9
  //   const decayFactor = 0.5
  //   const gridHeightArray = generateHeightArray(centerHeight, size, decayFactor)
  console.log(mkJsonObject({ terrain }))

  return api
}
export type TerrainApi = ReturnType<typeof createTerrain>
