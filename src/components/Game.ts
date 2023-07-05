import { div } from '../van'
import { AssetBar } from './AssetBar/AssetBar'
import { TerrainMap } from './TerrainMap'

export const Game = () => {
  return div(AssetBar(), TerrainMap())
}
