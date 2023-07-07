import { AssetState } from '@/types'
import { bind, img } from '@/van'
import { TILE, mkClass } from '../util/mkClass'
import { PointerEventHandler, mkOnClick } from '../util/mkOnClick'

type Sprite = { asset: AssetState; onclick?: PointerEventHandler }
export const Sprite = (props: Sprite) => {
  const { asset, onclick }: Sprite = { onclick: () => {}, ...props }
  return bind(asset, (asset) => {
    const { id, sprite } = asset
    return img({ ...mkClass(`Sprite`, TILE), src: sprite, ...mkOnClick(onclick) })
  })
}
