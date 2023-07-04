import { gameStore } from '../../../store/gameStore'
import { assert } from '../../../util/assert'
import { ToolButton } from './ToolButton'

type DeleteToolProps = {}
const DefaultDeleteToolProps: DeleteToolProps = {}
export const DeleteTool = (props?: Partial<DeleteToolProps>, ...rest: ChildNode[]) => {
  const {} = { ...DefaultDeleteToolProps, ...props }

  const { closeModal, deleteAsset, assetEditor } = gameStore
  const { currentAsset } = assetEditor

  const asset = currentAsset.val

  assert(asset)
  const { id } = asset

  return ToolButton({
    extraProps: { class: `danger` },
    name: `💀`,
    onClick: () => {
      assert(id)
      closeModal().then(() => {
        deleteAsset(id)
      })
    }
  })
}
