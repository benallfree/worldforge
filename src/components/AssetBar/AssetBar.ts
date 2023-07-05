import { gameStore } from '../../store/gameStore'
import { assert } from '../../util/assert'
import { mkOnClick } from '../../util/mkOnClick'
import { bind, button, div } from '../../van'
import classes from './AssetBar.module.scss'
import { ToolbarSprite } from './ToolbarSprite'

export const Toolbar = () => {
  const {
    activeAssetId,
    assetIds,
    assets,
    createAsset,
    openAssetEditor,
    setActiveAssetId,
    closeModal
  } = gameStore
  return bind(assetIds, activeAssetId, (assetIds, activeAssetId) => {
    const tiles = assetIds.map((id) => {
      const asset = assets[id]
      assert(asset)
      return ToolbarSprite({
        asset,
        active: activeAssetId === asset.val.id,
        onClick: () => {
          if (activeAssetId === asset.val.id) {
            setActiveAssetId(undefined)
          } else {
            closeModal()
            setActiveAssetId(asset.val.id)
          }
        }
      })
    })
    return div(
      { class: classes.AssetBar },
      ...tiles,
      button(
        {
          ...mkOnClick(() => {
            createAsset().then(openAssetEditor).catch(console.error)
          })
        },
        `+`
      )
    )
  })
}
