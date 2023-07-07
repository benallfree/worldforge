import { gameStore } from '@/store'
import { bind, div } from '@/van'
import { hasDlc } from '../util/qs'
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
      return ImportTool({
        onFinished: () => {
          console.log(`done`)
          imported.val = true
          if (hasDlc()) {
            setTimeout(() => {
              location.href = location.origin
            })
          }
        }
      })
    })
  )
}
