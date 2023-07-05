import { gameStore } from '../../../store/gameStore'
import { ToolButtonProps_In } from '../../Toolbar/ToolButton'

type CancelToolProps = {}
export const CancelTool = (props?: CancelToolProps): ToolButtonProps_In => {
  const { closeAssetEditor } = gameStore
  return { title: () => '😾', onClick: closeAssetEditor, selected: false }
}
