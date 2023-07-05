import { gameStore } from '../../store/gameStore'
import { CLEARFIX, LAYER, TILE, mkClass } from '../../util/mkClass'
import { range } from '../../util/range'
import { div, img } from '../../van'

type PreviewProps = { background: 'black' | 'white' }
export const Preview = (props: PreviewProps) => {
  const { background } = props
  const { assetEditor } = gameStore
  const { dataUrl } = assetEditor
  return div(
    { ...mkClass(`Preview`, CLEARFIX), style: `background-color: ${background}` },
    ...range(9).map(() =>
      div(
        { ...mkClass('preview-cell', TILE) },
        div({ ...mkClass(`border-overlay`, TILE, LAYER) }),
        img({ ...mkClass(TILE, LAYER), src: dataUrl })
      )
    )
  )
}
