import { gameStore } from '../../../store/gameStore'
import { ToolButton } from '../../ToolBar/ToolButton'

type ShareToolProps = {}
export const ShareTool = (props?: ShareToolProps) =>
  ToolButton({
    title: () => '⬆️',
    onClick: () => {
      const { assetEditor } = gameStore
      const { cloneAsset } = assetEditor
    }
  })
