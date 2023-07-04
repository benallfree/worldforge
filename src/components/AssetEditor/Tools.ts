import { div } from '../../van'
import { CancelTool } from './CancelTool'
import { CloneTool } from './CloneTool'
import { ColorTool } from './ColorTool'
import { DeleteTool } from './DeleteTool'
import { DrawTool } from './DrawTool'
import { EraseTool } from './EraseTool'
import { SaveTool } from './SaveTool'
import classes from './Tools.module.scss'

type ToolsProps = {}
export const Tools = (props: ToolsProps) => {
  return div(
    { class: classes.Tools },
    DrawTool(),
    EraseTool(),
    ColorTool(),
    SaveTool({}),
    CancelTool({}),
    CloneTool({}),
    DeleteTool({})
  )
}
