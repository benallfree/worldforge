import { AssetState } from '@/types'
import { TILE, mkClass } from '../util/mkClass'
import { PointerEventHandler, mkOnClick } from '../util/mkOnClick'
import { bind, img } from '../van'

type Sprite = { asset: AssetState; onclick?: PointerEventHandler }
export const Sprite = (props: Sprite) => {
  const { asset, onclick }: Sprite = { onclick: () => {}, ...props }
  return bind(asset, (asset) => {
    const { id, sprite } = asset
    return img({ ...mkClass(`Sprite`, TILE), src: sprite, ...mkOnClick(onclick) })
  })
}
