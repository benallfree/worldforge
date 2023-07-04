import { gameStore } from '../../store/gameStore'
import { ToolButton } from './ToolButton'

type CancelToolProps = {}
export const CancelTool = (props?: CancelToolProps) => {
  const { closeAssetEditor } = gameStore
  return ToolButton({ name: '😾', onClick: closeAssetEditor })
}
