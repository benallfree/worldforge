import { gameStore } from '../store/gameStore'
import { XOffset, YOffset } from '../types/XY'
import { xyToSlug } from '../types/helpers'
import { mkOnMouseDown, mkOnMouseMove } from '../util/mkOnClick'
import { bind, div, img, state } from '../van'
import classes from './TerrainCell.module.scss'

export const mkClass = (...args: string[]) => ({ class: args.join(' ') })

type TerrainCellProps = {
  x: XOffset
  y: YOffset
}
export const TerrainCell = (props: TerrainCellProps) => {
  const { activeAssetId, addAssetToTerrainCell, openModal, cells, assets } = gameStore
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
      openModal({
        title: () => `Asset Editor ${x}x${y}`,
        event,
        onClose: () => {
          isActive.val = false
        },
        body: () => div(`asset editor`)
      })
      isActive.val = true
    }
  }

  return div(
    {
      ...mkClass(classes.Root, classes.tile, classes.interactive, classes.container),
      ...mkOnMouseDown(onMouse),
      ...mkOnMouseMove(onMouse)
    },
    div({ ...mkClass(classes.layer, classes['border-hint']) }),

    bind(cells[slug], (cell) => {
      if (!cell) return div()
      return div(
        { ...mkClass(classes.layer, classes['content-container']) },
        ...cell.assets.map((state) => {
          const asset = assets[state.assetId]
          return bind(asset, (asset) => {
            return img({ src: asset.sprite, ...mkClass(classes.layer) })
          })
        })
      )
    }),
    bind(isActive, (isActive) => {
      if (!isActive) return div()
      return div({ ...mkClass(classes.active, classes.layer) })
    })
  )
}
