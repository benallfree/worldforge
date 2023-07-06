import { gameStore } from '../../../../store/gameStore'
import { assert } from '../../../../util/assert'
import { mkClass } from '../../../../util/mkClass'
import { mkOnClick } from '../../../../util/mkOnClick'
import { bind, button, div } from '../../../../van'

export type BedrockEditorProps = {}
export const DefaultBedrockEditorProps: BedrockEditorProps = {}
export const BedrockEditor = (props?: Partial<BedrockEditorProps>, ...rest: ChildNode[]) => {
  const {} = { ...DefaultBedrockEditorProps, ...props }

  const { assetEditor } = gameStore
  const { currentAsset } = assetEditor

  return bind(currentAsset, (asset) => {
    console.log({ asset })
    assert(asset)
    const { name } = asset
    return div(
      { ...mkClass(`BedrockEditor`) },
      button(
        {
          ...mkClass(asset.isBedrock ? `selected` : ``),
          ...mkOnClick(() => {
            const asset = currentAsset.val
            assert(asset)
            currentAsset.val = { ...asset, isBedrock: !asset.isBedrock }
          })
        },
        `Bedrock`
      )
    )
  })
}
