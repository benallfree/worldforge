import { gameStore } from '@/store'
import { bind, div, p, state, textarea } from '@/van'
import { mkClass } from '../../../../util/mkClass'
import { checkRenderFn } from '../../../../util/renderFn'

export type CodeEditorProps = {}
export const DefaultCodeEditorProps: CodeEditorProps = {}
export const CodeEditor = (props?: Partial<CodeEditorProps>) => {
  const {} = { ...DefaultCodeEditorProps, ...props }

  const { assetEditor } = gameStore
  const { currentAsset } = assetEditor

  return bind(currentAsset, (asset) => {
    const { code } = asset

    const hasSyntaxError = state(checkRenderFn(code))

    return div(
      { ...mkClass(`CodeEditor`) },
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
  })
}
