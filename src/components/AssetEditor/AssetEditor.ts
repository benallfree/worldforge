import { mkClass } from '../../util/mkClass'
import { div } from '../../van'
import { TabManager } from '../TabManager/TabManager'
import { Toolbar } from '../Toolbar/Toolbar'
import { Canvas } from './Tabs/Canvas/Canvas'
import { CodeEditor } from './Tabs/Code/CodeEditor'
import { Meta } from './Tabs/Meta/Meta'
import { ShareTool } from './Tabs/Share/ShareTool'
import { CancelTool } from './Tools/CancelTool'
import { CloneTool } from './Tools/CloneTool'
import { DeleteTool } from './Tools/DeleteTool'
import { SaveTool } from './Tools/SaveTool'

type AssetEditorProps = {}
export const AssetEditor = (props: AssetEditorProps) => {
  return div(
    { ...mkClass(`AssetEditor`) },
    Toolbar({
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
