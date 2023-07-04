import { TILE_SIZE } from '../constants/tile'
import { gameStore } from '../store/gameStore'
import { mkXOffset, mkYOffset } from '../types/helpers'
import { px } from '../util/px'
import { range } from '../util/range'
import { div } from '../van'
import { ShareTool } from './ShareTool'
import { TerrainCell } from './TerrainCell'
import classes from './TerrainMap.module.scss'

export const TerrainMap = () => {
  const { size } = gameStore

  return div(
    { class: classes.TerrainMap },
    div(
      { class: classes.grid, style: `width: ${px(TILE_SIZE * size)}` },
      ...range(size).map((i, x) =>
        range(size).map((i, y) => TerrainCell({ x: mkXOffset(x), y: mkYOffset(y) }))
      )
    ),
    ShareTool()
  )
}
