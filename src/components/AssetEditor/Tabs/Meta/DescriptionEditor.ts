import { gameStore } from '../../../../store/gameStore'
import { assert } from '../../../../util/assert'
import { mkClass } from '../../../../util/mkClass'
import { bind, div, textarea } from '../../../../van'

export type DescriptionEditorProps = {}
export const DefaultDescriptionEditorProps: DescriptionEditorProps = {}
export const DescriptionEditor = (
  props?: Partial<DescriptionEditorProps>,
  ...rest: ChildNode[]
) => {
  const {} = { ...DefaultDescriptionEditorProps, ...props }

  const { assetEditor } = gameStore
  const { currentAsset } = assetEditor
  const asset = currentAsset.val

  return div(
    { ...mkClass(`DescriptionEditor`) },
    bind(asset, (_asset) => {
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
