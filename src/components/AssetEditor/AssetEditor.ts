import { div } from '../../van'
import { TabManager } from '../TabManager/TabManager'
import { ToolBar } from '../ToolBar/ToolBar'
import { Canvas } from './Tabs/Canvas/Canvas'
import { CodeEditor } from './Tabs/Code/CodeEditor'
import { Meta } from './Tabs/Meta/Meta'
import { CancelTool } from './Tools/CancelTool'
import { CloneTool } from './Tools/CloneTool'
import { DeleteTool } from './Tools/DeleteTool'
import { SaveTool } from './Tools/SaveTool'

import { ShareTool } from './Tabs/Share/ShareTool'
type AssetEditorProps = {}
export const AssetEditor = (props: AssetEditorProps) => {
  return div(
    { class: `AssetEditor` },
    ToolBar({
      floating: true,
      tools: [SaveTool(), CancelTool({}), CloneTool({}), DeleteTool({})]
    }),
    TabManager({
      tabs: {
        [`Canvas`]: () => Canvas(),
        [`Meta`]: () => Meta(),
        [`Code`]: () => CodeEditor(),
        [`Share`]: () => ShareTool()
      }
    })
  )
}
