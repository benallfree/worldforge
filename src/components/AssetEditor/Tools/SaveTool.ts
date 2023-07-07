import { gameStore } from '@/store'
import { assert } from '@/util'
import { ToolButtonProps_In } from '../../Toolbar/ToolButton'

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
