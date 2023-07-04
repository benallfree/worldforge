import { div } from '../../van'
import classes from './Canvas.module.scss'
import { CustomPalette } from './CustomPalette'
import { PixelEditor } from './PixelEditor'
import { Preview } from './Preview'
import { Tools } from './Tools'

export const Canvas = () => {
  return div(
    { class: 'Canvas' },
    Tools({}),
    div(
      { class: classes['grid-container'] },
      div(PixelEditor({}), CustomPalette({})),
      div(Preview({ background: 'black' }), Preview({ background: 'white' }))
    )
  )
}
