import { gameStore } from '@/store'
import { bind, button, div } from '@/van'
import { assert } from '../../../../util/assert'
import { mkClass } from '../../../../util/mkClass'
import { mkOnClick } from '../../../../util/mkOnClick'

export type BedrockEditorProps = {}
export const DefaultBedrockEditorProps: BedrockEditorProps = {}
export const BedrockEditor = (props?: Partial<BedrockEditorProps>) => {
  const {} = { ...DefaultBedrockEditorProps, ...props }

  const { assetEditor } = gameStore
  const { currentAsset } = assetEditor

  return bind(currentAsset, (asset) => {
    assert(asset)
    const { isBedrock } = asset
    return div(
      { ...mkClass(`BedrockEditor`) },
      button(
        {
          ...mkClass(isBedrock ? `selected` : ``),
          ...mkOnClick(() => {
            currentAsset.val = { ...asset, isBedrock: !isBedrock }
          })
        },
        `Bedrock`
      )
    )
  })
}
