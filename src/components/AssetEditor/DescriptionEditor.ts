import { gameStore } from '../../store/gameStore'
import { assert } from '../../util/assert'
import { mkOnClick } from '../../util/mkOnClick'
import { bind, button, div, state, textarea } from '../../van'
import DescriptionEditorClasses from './DescriptionEditor.module.scss'

export type DescriptionEditorProps = {}
export const DefaultDescriptionEditorProps: DescriptionEditorProps = {}
export const DescriptionEditor = (
  props?: Partial<DescriptionEditorProps>,
  ...rest: ChildNode[]
) => {
  const {} = { ...DefaultDescriptionEditorProps, ...props }

  const isEditing = state(false)
  const { assetEditor } = gameStore
  const { currentAsset } = assetEditor
  const asset = currentAsset.val

  return div(
    { class: DescriptionEditorClasses['DescriptionEditor'] },
    bind(asset, isEditing, (_asset, _isEditing) => {
      assert(_asset)
      const { description } = _asset
      if (_isEditing) {
        return textarea(
          {
            onchange: function (this: HTMLTextAreaElement) {
              currentAsset.val = { ..._asset, description: this.value }
            }
          },
          description
        )
      }
      return div(
        description,
        button(
          {
            ...mkOnClick(() => {
              isEditing.val = !isEditing.val
            })
          },
          `edit`
        )
      )
    })
  )
}
