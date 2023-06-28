import { Opaque } from 'type-fest'
import {
  GridSize,
  Height,
  MIN_HEIGHT,
  Point,
  PointArray,
  RgbHex,
  TerrainCell,
  TerrainType,
  XCoordinate,
  XOffset,
  YCoordinate,
  YOffset,
  clone,
  mkHeight,
  mkX,
  mkXOffset,
  mkY,
  mkYOffset,
  xyToPoint,
  xyToPointArray,
  xyToSlug
} from '../helpers'
import { TerrainApi } from './createTerrain'

export const mkRgbHex = (s: string) => s as RgbHex

export type RawHeight = Opaque<number, 'raw-height'>

const mkRawHeight = (height: number) => {
  return height as RawHeight
}

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

function shiftGrid(grid: RawHeight[][], x: XOffset, y: YOffset): RawHeight[][] {
  const rows = grid.length
  const cols = grid[0].length

  const shiftedGrid: RawHeight[][] = []

  for (let i = 0; i < rows; i++) {
    const newRow: RawHeight[] = []
    for (let j = 0; j < cols; j++) {
      const newRowIdx = i - x
      const newColIdx = j - y

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

const cropGrid = (grid: RawHeight[][], rows: XCoordinate, cols: YCoordinate) => {
  const cropped: RawHeight[][] = []

  for (let i = 0; i < rows; i++) {
    cropped.push(grid[i].slice(0, cols))
  }

  return cropped
}

function createGradientFactory(color1: RgbHex, color2: RgbHex, min: Height, max: Height) {
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

function chooseRandomPoints(x: XCoordinate, y: YCoordinate, nPeaks: number): PointArray[] {
  const points: PointArray[] = []
  while (points.length < nPeaks) {
    const randomRow = mkX(Math.floor(Math.random() * x))
    const randomCol = mkY(Math.floor(Math.random() * y))
    const point = xyToPointArray(randomRow, randomCol)

    if (!points.some(([row, col]) => row === randomRow && col === randomCol)) {
      points.push(point)
    }
  }

  console.log({ nPeaks, points })

  return points
}

export const generateTopology = (terrain: TerrainApi, nPeaks: GridSize) => {
  const size = terrain.size()
  console.log(`Generating topology for grid size ${size}`)

  const { set, get, map, maxHeight, minHeight } = terrain

  const generateDecay = (peakCell: TerrainCell) => {
    console.log(`Generating decay for`, clone(peakCell))
    // console.log({ id, data, size })
    const decaySize = (size * 4) as GridSize
    const decay = generateHeightArray(peakCell.height, decaySize, 0.7)
    const { x, y } = peakCell
    const shifted = shiftGrid(decay, mkXOffset(-size * 2 + x), mkYOffset(-size * 2 + y))
    const cropped = cropGrid(shifted, mkX(size), mkY(size))
    // console.log({ decay, shifted, cropped })
    return cropped
  }

  // Generate mountain peaks
  const peakCells = chooseRandomPoints(mkX(size), mkY(size), nPeaks).map(([x, y]) =>
    set(xyToPoint(x, y), {
      type: TerrainType.Rock,
      height: mkHeight(9)
    })
  )

  console.log(`peaks`, { peakCells })

  function* floodFill(startCell: TerrainCell): Generator<number> {
    type RawPoint = { x: number; y: number }

    const directions: RawPoint[] = [
      { x: -1, y: 0 }, // left
      { x: 1, y: 0 }, // right
      { x: 0, y: -1 }, // up
      { x: 0, y: 1 } // down
    ]

    const queue: Point[] = []
    let radius = 1

    // Helper function to check if a point is valid and not visited
    const isValidPoint = (point: RawPoint) => {
      const { x, y } = point
      return x >= 0 && x < size && y >= 0 && y < size && get(xyToSlug(x, y)).height === 0
    }

    // Enqueue initial point
    queue.push(startCell.point)

    // Make the decay map
    const decay = generateDecay(startCell)

    while (queue.length > 0) {
      const queueLength = queue.length

      for (let i = 0; i < queueLength; i++) {
        const { x, y } = queue.shift()!

        // Check all directions
        for (const dir of directions) {
          const newX = Math.max(0, Math.min(size, x + dir.x))
          const newY = Math.max(0, Math.min(size, y + dir.y))
          const newPoint: RawPoint = { x: newX, y: newY }

          if (isValidPoint(newPoint)) {
            // Calc the height of this cell
            const dHeight = decay[newX][newY]
            const dCoord = xyToSlug(newX, newY)
            const cell = get(dCoord)
            if (cell.height > dHeight) continue
            if (cell.height === 0) {
              cell.height = mkHeight(dHeight)
              continue
            }
            cell.height = Number(((cell.height + dHeight) / 2).toFixed(2)) as Height
            queue.push(newPoint as Point)
          }
        }
      }

      yield radius
      radius++
    }
  }

  type FillGenerator = ReturnType<typeof floodFill>
  const peakGenerators: FillGenerator[] = peakCells.map((pc) => floodFill(pc))

  while (peakGenerators.length > 0) {
    const gen = peakGenerators.shift()
    if (!gen) break
    const { done } = gen.next()
    if (!done) peakGenerators.push(gen)
  }

  // Calc min/max heights
  map((cell, id): void => {
    minHeight(cell.height)
    maxHeight(cell.height)
  })
  console.log(`before normalizing`, { terrain: clone(terrain) })

  map((cell, id): void => {
    // console.log({ cell: mkJsonObject(cell), minHeight })
    cell.height = mkHeight(Number((cell.height - minHeight()).toFixed(2)))
  })
  maxHeight(maxHeight() - minHeight(), true)
  minHeight(0, true)

  const topographicalHeat = createGradientFactory(
    mkRgbHex('#0000FF'),
    mkRgbHex('#FF0000'),
    minHeight(),
    maxHeight()
  )

  console.log(`after normalizing`, { terrain: clone(terrain) })

  return {
    topographicalHeat
  }
}
