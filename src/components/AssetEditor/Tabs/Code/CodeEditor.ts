import { gameStore } from '../../../../store/gameStore'
import { assert } from '../../../../util/assert'
import { checkRenderFn } from '../../../../util/renderFn'
import { bind, div, p, state, textarea } from '../../../../van'
import CodeEditorClasses from './CodeEditor.module.scss'

export type CodeEditorProps = {}
export const DefaultCodeEditorProps: CodeEditorProps = {}
export const CodeEditor = (props?: Partial<CodeEditorProps>) => {
  const {} = { ...DefaultCodeEditorProps, ...props }

  const { assetEditor } = gameStore
  const { currentAsset } = assetEditor

  const asset = currentAsset.val
  assert(asset)
  const { code } = asset

  const hasSyntaxError = state(checkRenderFn(code))

  return div(
    { class: CodeEditorClasses['CodeEditor'] },
    p(`Write your custom code here.`),
    bind(hasSyntaxError, (hasSyntaxError) =>
      hasSyntaxError ? p({ class: 'danger' }, `Syntax error: ${hasSyntaxError}`) : div()
    ),
    textarea(
      {
        oninput: function (this: HTMLTextAreaElement) {
          currentAsset.val = { ...asset, code: this.value }
          hasSyntaxError.val = checkRenderFn(this.value)
        }
      },
      code
    )
  )
}
