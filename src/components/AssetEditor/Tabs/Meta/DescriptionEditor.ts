import { gameStore } from '@/store'
import { bind, div, textarea } from '@/van'
import { assert } from '../../../../util/assert'
import { mkClass } from '../../../../util/mkClass'

export type DescriptionEditorProps = {}
export const DefaultDescriptionEditorProps: DescriptionEditorProps = {}
export const DescriptionEditor = (props?: Partial<DescriptionEditorProps>) => {
  const {} = { ...DefaultDescriptionEditorProps, ...props }

  const { assetEditor } = gameStore
  const { currentAsset } = assetEditor

  return div(
    { ...mkClass(`DescriptionEditor`) },
    bind(currentAsset, (_asset) => {
      assert(_asset)
      const { description } = _asset
      return textarea(
        {
          onchange: function (this: HTMLTextAreaElement) {
            currentAsset.val = { ..._asset, description: this.value }
          }
        },
        description
      )
    })
  )
}
