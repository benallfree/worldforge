import { gameStore } from '../../../../store/gameStore'
import { assert } from '../../../../util/assert'
import { bind, input } from '../../../../van'

export type TitleEditorProps = {}
export const DefaultTitleEditorProps: TitleEditorProps = {}
export const TitleEditor = (props?: Partial<TitleEditorProps>, ...rest: ChildNode[]) => {
  const {} = { ...DefaultTitleEditorProps, ...props }

  const { assetEditor } = gameStore
  const { currentAsset } = assetEditor

  return bind(currentAsset, (asset) => {
    assert(asset)
    const { name } = asset
    return input({
      type: 'text',
      value: name,
      onchange: function (this: HTMLInputElement) {
        const asset = currentAsset.val
        assert(asset)
        currentAsset.val = { ...asset, name: this.value }
      }
    })
  })
}
