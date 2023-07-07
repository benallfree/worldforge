import { gameStore } from '@/store'
import { ToolButtonProps_In } from '../../Toolbar/ToolButton'

type CloneToolProps = {}
export const CloneTool = (props?: CloneToolProps): ToolButtonProps_In => ({
  title: () => '👯‍♀️',
  onClick: () => {
    const { assetEditor } = gameStore
    const { cloneAsset } = assetEditor
    cloneAsset()
  },
  selected: false
})
