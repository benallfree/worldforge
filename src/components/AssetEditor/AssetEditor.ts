import { div } from '../../van'
import { Canvas } from './Canvas'

type AssetEditorProps = {}
export const AssetEditor = (props: AssetEditorProps) => {
  return div({ class: `AssetEditor` }, Canvas())
}
