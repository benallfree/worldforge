import { gameStore } from '../../../store/gameStore'
import { assert } from '../../../util/assert'
import { ToolButtonProps_In } from '../../ToolBar/ToolButton'

type SaveToolProps = {}
export const SaveTool = (): ToolButtonProps_In => {
  const { saveAsset, assetEditor } = gameStore
  const { currentAsset } = assetEditor
  return {
    title: () => '💾',
    onClick: () => {
      console.log(`saving`)
      const asset = currentAsset.val
      assert(asset)
      saveAsset(asset)
    },
    selected: false
  }
}
