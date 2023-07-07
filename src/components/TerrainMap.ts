import { gameStore } from '@/store'
import { mkXOffset, mkYOffset } from '@/types'
import { div } from '@/van'
import { TILE_SIZE } from '../constants/tile'
import { CLEARFIX, NOSELECT, mkClass } from '../util/mkClass'
import { px } from '../util/px'
import { range } from '../util/range'
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
