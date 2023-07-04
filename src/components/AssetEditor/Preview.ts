import { gameStore } from '../../store/gameStore'
import { range } from '../../util/range'
import { div, img } from '../../van'
import classes from './Preview.module.scss'

type PreviewProps = { background: 'black' | 'white' }
export const Preview = (props: PreviewProps) => {
  const { background } = props
  const { assetEditor } = gameStore
  const { dataUrl } = assetEditor
  return div(
    { class: classes.Preview, style: `background-color: ${background}` },
    ...range(9).map(() =>
      div(
        { class: classes['preview-cell'] },
        div({ class: classes['border-overlay'] }),
        img({ src: dataUrl })
      )
    )
  )
}
