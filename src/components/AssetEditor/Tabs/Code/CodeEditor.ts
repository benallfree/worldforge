import { gameStore } from '../../../../store/gameStore'
import { assert } from '../../../../util/assert'
import { bind, div, p, textarea } from '../../../../van'
import CodeEditorClasses from './CodeEditor.module.scss'

export type CodeEditorProps = {}
export const DefaultCodeEditorProps: CodeEditorProps = {}
export const CodeEditor = (props?: Partial<CodeEditorProps>, ...rest: ChildNode[]) => {
  const {} = { ...DefaultCodeEditorProps, ...props }

  const { assetEditor } = gameStore
  const { currentAsset } = assetEditor
  const asset = currentAsset.val
  assert(asset)

  return bind(asset, (_asset) => {
    return div(
      { class: CodeEditorClasses['CodeEditor'] },
      p(`Write your custom code here.`),
      textarea(
        {
          onchange: function (this: HTMLTextAreaElement) {
            currentAsset.val = { ...asset, code: this.value }
          }
        },
        _asset.code
      ),
      ...rest
    )
  })
}
