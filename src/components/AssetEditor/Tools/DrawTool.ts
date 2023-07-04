import { ToggleToolButton } from './ToggleToolButton'
import { EditorTools } from './tool'

type DrawToolProps = {}
export const DrawTool = (props?: DrawToolProps) => ToggleToolButton({ tool: EditorTools.Draw })
