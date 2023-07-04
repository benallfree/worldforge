import { gameStore } from '../../../store/gameStore'
import { assert } from '../../../util/assert'
import { ToolButton } from './ToolButton'

type SaveToolProps = {}
export const SaveTool = (props?: SaveToolProps) => {
  const { saveAsset, assetEditor } = gameStore
  const { currentAsset } = assetEditor
  return ToolButton({
    name: '💾',
    onClick: () => {
      const asset = currentAsset.val
      assert(asset)
      return saveAsset(asset)
    }
  })
}
