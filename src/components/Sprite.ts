import { AssetState } from '../types/Asset'
import { PointerEventHandler, mkOnClick } from '../util/mkOnClick'
import { State, bind, img } from '../van'
import classes from './Sprite.module.scss'

type Sprite = { asset: State<AssetState>; onclick?: PointerEventHandler }
export const Sprite = (props: Sprite) => {
  const { asset, onclick }: Sprite = { onclick: () => {}, ...props }
  return bind(asset, (asset) => {
    const { id, sprite } = asset
    return img({ class: classes.sprite, src: sprite, ...mkOnClick(onclick) })
  })
}
