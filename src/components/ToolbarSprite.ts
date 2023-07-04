import { gameStore } from '../store/gameStore'
import { StatefulAsset } from '../types/Asset'
import { PointerEventHandler, mkOnClick } from '../util/mkOnClick'
import { button, div } from '../van'
import { Sprite } from './Sprite'
import classes from './ToolbarSprite.module.scss'

type ToolbarSpriteProps = {
  asset: StatefulAsset
  active: boolean
  onClick: PointerEventHandler
}
export const ToolbarSprite = (props: ToolbarSpriteProps) => {
  const { asset, active, onClick } = props
  const { openAssetEditor } = gameStore

  return div(
    { class: `${classes.ToolbarSprite} ${active ? classes.active : ''}` },
    div({ class: classes.title }, asset.val.name),
    Sprite({ asset, ...mkOnClick(onClick) }),
    div(
      { class: classes.controls },
      button(
        {
          ...mkOnClick(() => {
            openAssetEditor(asset.val).catch(console.error)
          })
        },
        `edit`
      )
    )
  )
}
