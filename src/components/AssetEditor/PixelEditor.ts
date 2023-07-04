import { SPRITE_SIZE } from '../../constants/sprite'
import { gameStore } from '../../store/gameStore'
import { mkOnMouseDown, mkOnMouseMove } from '../../util/mkOnClick'
import { noRightClick } from '../../util/noRightClick'
import { div } from '../../van'
import classes from './PixelEditor.module.scss'

type PixelEditorProps = {}
export const PixelEditor = (props: PixelEditorProps) => {
  const { assetEditor } = gameStore
  const { rgbHexPixels, setPixel } = assetEditor

  const onMouse = (e: PointerEvent | MouseEvent, i: number) => {
    // console.log({ e, mouseEvent: e instanceof MouseEvent })
    if (!(e instanceof PointerEvent) && !e.buttons) return
    const y = Math.floor(i / SPRITE_SIZE)
    const x = i % SPRITE_SIZE
    // console.log({ x, y })
    setPixel(x, y)
  }

  const elem = div(
    { class: classes.PixelEditor },
    ...rgbHexPixels.map((rgb, i) =>
      div({
        class: classes.pixel,
        style: { deps: [rgb], f: (rgb) => `background-color: ${rgb}` },
        ...mkOnMouseMove((e) => onMouse(e, i)),
        ...mkOnMouseDown((e) => onMouse(e, i))
      })
    )
  )

  return noRightClick(elem)
}
