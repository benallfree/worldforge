import { SPRITE_SIZE } from '../../../../constants/sprite'
import { gameStore } from '../../../../store/gameStore'
import { INTERACTIVE, mkClass } from '../../../../util/mkClass'
import { mkOnMouseDown, mkOnMouseMove } from '../../../../util/mkOnClick'
import { noRightClick } from '../../../../util/noRightClick'
import { div } from '../../../../van'

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
    { ...mkClass(`PixelEditor`) },
    ...rgbHexPixels.map((rgb, i) =>
      div({
        ...mkClass(`pixel`, INTERACTIVE),
        style: { deps: [rgb], f: (rgb) => `background-color: ${rgb}` },
        ...mkOnMouseMove((e) => onMouse(e, i)),
        ...mkOnMouseDown((e) => onMouse(e, i))
      })
    )
  )

  return noRightClick(elem)
}
