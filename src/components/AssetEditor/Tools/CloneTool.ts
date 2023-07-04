import { gameStore } from '../../../store/gameStore'
import { ToolButtonProps_In } from '../../ToolBar/ToolButton'

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
