import { div } from '../van'
import { Toolbar } from './AssetBar/AssetBar'
import { TerrainMap } from './TerrainMap'

export const Game = () => {
  return div(Toolbar(), TerrainMap())
}
