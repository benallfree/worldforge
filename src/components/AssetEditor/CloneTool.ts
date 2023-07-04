import { gameStore } from '../../store/gameStore'
import { ToolButton } from './ToolButton'

type CloneToolProps = {}
export const CloneTool = (props?: CloneToolProps) =>
  ToolButton({
    name: '👯‍♀️',
    onClick: () => {
      const { assetEditor } = gameStore
      const { cloneAsset } = assetEditor
      cloneAsset()
    }
  })
