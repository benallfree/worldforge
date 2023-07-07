import { gameStore } from '@/store'
import { TILE_SIZE } from '../constants/tile'
import { mkXOffset, mkYOffset } from '../types/helpers'
import { CLEARFIX, NOSELECT, mkClass } from '../util/mkClass'
import { px } from '../util/px'
import { range } from '../util/range'
import { div } from '../van'
import { ShareTool } from './ShareTool'
import { TerrainCell } from './TerrainCell'

export const TerrainMap = () => {
  const { size } = gameStore

  return div(
    { ...mkClass(`TerrainMap`, CLEARFIX) },
    div(
      { ...mkClass(`grid`, NOSELECT, CLEARFIX), style: `width: ${px(TILE_SIZE * size)}` },
      ...range(size).map((i, x) =>
        range(size).map((i, y) => TerrainCell({ x: mkXOffset(x), y: mkYOffset(y) }))
      )
    ),
    ShareTool()
  )
}
