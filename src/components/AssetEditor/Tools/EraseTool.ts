import { ToggleToolButton } from './ToggleToolButton'
import { EditorTools } from './tool'

type EraseToolProps = {}
export const EraseTool = (props?: EraseToolProps) => ToggleToolButton({ tool: EditorTools.Erase })
