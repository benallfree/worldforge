import { gameStore } from '../../../store/gameStore'
import { bind } from '../../../van'
import { ToolButton } from './ToolButton'
import { EditorTools, TOOL_NAMES } from './tool'

type ToggleToolButtonProps = { tool: EditorTools }
export const ToggleToolButton = (props: ToggleToolButtonProps) => {
  const { tool } = props
  const { assetEditor } = gameStore
  const { currentTool } = assetEditor
  return bind(currentTool, (_ct) => {
    return ToolButton({
      name: TOOL_NAMES[tool],
      selected: _ct === tool,
      onClick: () => {
        console.log({ tool })
        currentTool.val = tool
      }
    })
  })
}
