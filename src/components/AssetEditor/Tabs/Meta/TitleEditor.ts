import { gameStore } from '@/store'
import { mkClass } from '../../../../util/mkClass'
import { bind, div, input } from '../../../../van'

export type TitleEditorProps = {}
export const DefaultTitleEditorProps: TitleEditorProps = {}
export const TitleEditor = (props?: Partial<TitleEditorProps>, ...rest: ChildNode[]) => {
  const {} = { ...DefaultTitleEditorProps, ...props }

  const { assetEditor } = gameStore
  const { currentAsset } = assetEditor

  return bind(currentAsset, (asset) => {
    const { name } = asset
    return div(
      { ...mkClass(`TitleEditor`) },
      input({
        type: 'text',
        value: name,
        onchange: function (this: HTMLInputElement) {
          const asset = currentAsset.val
          currentAsset.val = { ...asset, name: this.value }
        }
      })
    )
  })
}
