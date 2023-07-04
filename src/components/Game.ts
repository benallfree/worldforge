import { div } from '../van'
import { TerrainMap } from './TerrainMap'
import { Toolbar } from './Toolbar'

export const Game = () => {
  return div(Toolbar(), TerrainMap())
}
