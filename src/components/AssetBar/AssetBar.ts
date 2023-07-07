import { gameStore } from '@/store'
import { bind, button, div } from '@/van'
import { assert } from '../../util/assert'
import { mkClass } from '../../util/mkClass'
import { mkOnClick } from '../../util/mkOnClick'
import { AssetBarItem } from './AssetBarItem'

export const AssetBar = () => {
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
      assert(asset.val)
      return bind(asset, (asset) => {
        const { id } = asset
        return AssetBarItem({
          asset,
          active: activeAssetId === id,
          onClick: () => {
            console.log(`click`, { activeAssetId, id })
            if (activeAssetId === id) {
              setActiveAssetId(undefined)
            } else {
              closeModal()
              setActiveAssetId(id)
            }
          }
        })
      })
    })
    return div(
      { ...mkClass(`AssetBar`) },
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
