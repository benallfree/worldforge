import { gameStore } from '@/store'
import { XOffset, YOffset, xyToSlug } from '@/types'
import { bind, div, img, state } from '@/van'
import { CONTAINER, INTERACTIVE, LAYER, PULSING, TILE, mkClass } from '../util/mkClass'
import { mkOnMouseDown, mkOnMouseMove } from '../util/mkOnClick'

type TerrainCellProps = {
  x: XOffset
  y: YOffset
}
export const TerrainCell = (props: TerrainCellProps) => {
  const { activeAssetId, addAssetToTerrainCell, openModal, closeModal, cells, assets } = gameStore
  const isActive = state(false)
  const { x, y } = props
  const slug = xyToSlug(x, y)

  const onMouse = (event: PointerEvent | MouseEvent) => {
    const isButtonPressed = event.type === 'mousedown' || event.buttons
    if (!isButtonPressed) return
    if (activeAssetId.val) {
      addAssetToTerrainCell(x, y, activeAssetId.val)
    } else {
      activeAssetId.val = undefined
      closeModal()
        .then(() => {
          openModal({
            title: () => `Asset Editor ${x}x${y}`,
            event,
            onClosed: () => {
              isActive.val = false
            },
            body: () => div(`asset editor`)
          }).catch(console.error)
          isActive.val = true
        })
        .catch(console.error)
    }
  }

  return div(
    {
      ...mkClass('TerrainCell', TILE, INTERACTIVE, CONTAINER),
      ...mkOnMouseDown(onMouse),
      ...mkOnMouseMove(onMouse)
    },
    div({ ...mkClass(LAYER, `border-hint`) }),

    bind(cells[slug], (cell) => {
      if (!cell) return div()
      return div(
        { ...mkClass(LAYER, 'content-container') },
        ...cell.assets.map((state) => {
          const asset = assets[state.assetId]
          return bind(asset, (asset) => {
            return img({ src: asset.sprite, ...mkClass(LAYER) })
          })
        })
      )
    }),
    bind(isActive, (isActive) => (isActive ? div({ ...mkClass(`active`, LAYER, PULSING) }) : div()))
  )
}
