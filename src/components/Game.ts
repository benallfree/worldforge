import { gameStore } from '../store/gameStore'
import { bind, div } from '../van'
import { AssetBar } from './AssetBar/AssetBar'
import { ImportTool } from './ImportTool'
import { TerrainMap } from './TerrainMap'

export const Game = () => {
  const { imported } = gameStore

  return div(
    bind(imported, (_imported) => {
      if (_imported) {
        return div(AssetBar(), TerrainMap())
      }
      return ImportTool({ onFinished: () => (imported.val = true) })
    })
  )
}
