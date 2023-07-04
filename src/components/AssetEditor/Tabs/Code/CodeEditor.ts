import { gameStore } from '../../../../store/gameStore'
import { assert } from '../../../../util/assert'
import { bind, div, p, state, textarea } from '../../../../van'
import CodeEditorClasses from './CodeEditor.module.scss'

function checkEvalSyntax(code: string) {
  try {
    eval(`(${code})`)
    return '' // No syntax errors
  } catch (error) {
    return `${error}` // Syntax error occurred
  }
}

export type CodeEditorProps = {}
export const DefaultCodeEditorProps: CodeEditorProps = {}
export const CodeEditor = (props?: Partial<CodeEditorProps>, ...rest: ChildNode[]) => {
  const {} = { ...DefaultCodeEditorProps, ...props }

  const { assetEditor } = gameStore
  const { currentAsset } = assetEditor

  const asset = currentAsset.val
  assert(asset)
  const { code } = asset

  const hasSyntaxError = state(checkEvalSyntax(code))

  return div(
    { class: CodeEditorClasses['CodeEditor'] },
    p(`Write your custom code here.`),
    bind(hasSyntaxError, (hasSyntaxError) =>
      hasSyntaxError ? p({ class: 'danger' }, `Syntax error`) : div()
    ),
    textarea(
      {
        oninput: function (this: HTMLTextAreaElement) {
          currentAsset.val = { ...asset, code: this.value }
          hasSyntaxError.val = checkEvalSyntax(this.value)
        }
      },
      code
    )
  )
}
