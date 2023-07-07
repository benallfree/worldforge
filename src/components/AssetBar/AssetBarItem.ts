import { gameStore } from '@/store'
import { AssetState } from '@/types'
import { button, div } from '@/van'
import { CONTAINER, LAYER, PULSING, mkClass } from '../../util/mkClass'
import { PointerEventHandler, mkOnClick } from '../../util/mkOnClick'
import { Sprite } from '../Sprite'

type ToolbarSpriteProps = {
  asset: AssetState
  active: boolean
  onClick: PointerEventHandler
}
export const AssetBarItem = (props: ToolbarSpriteProps) => {
  const { asset, active, onClick } = props
  const { openAssetEditor } = gameStore

  const { name } = asset

  return div(
    { ...mkClass(`AssetBarItem`, CONTAINER) },
    active ? div({ ...mkClass(`active`, LAYER, PULSING) }) : div(),
    div(
      { ...mkClass(CONTAINER) },
      div({ ...mkClass(`title`) }, name),
      Sprite({ asset, ...mkOnClick(onClick) }),
      div(
        { ...mkClass(`controls`) },
        button(
          {
            ...mkOnClick(() => {
              openAssetEditor(asset).catch(console.error)
            })
          },
          `edit`
        )
      )
    )
  )
}
