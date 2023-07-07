import { gameStore } from '@/store'
import { assert } from '../../../util/assert'
import { ToolButtonProps_In } from '../../Toolbar/ToolButton'

type DeleteToolProps = {}
const DefaultDeleteToolProps: DeleteToolProps = {}
export const DeleteTool = (props?: Partial<DeleteToolProps>): ToolButtonProps_In => {
  const {} = { ...DefaultDeleteToolProps, ...props }

  const { closeModal, deleteAsset, assetEditor } = gameStore
  const { currentAsset } = assetEditor

  const asset = currentAsset.val

  assert(asset)
  const { id } = asset

  return {
    extraProps: { class: `danger` },
    title: () => `💀`,
    onClick: () => {
      assert(id)
      closeModal().then(() => {
        deleteAsset(id)
      })
    },
    selected: false
  }
}
