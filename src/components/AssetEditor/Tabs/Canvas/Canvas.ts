import { gameStore } from '@/store'
import { bind, div } from '@/van'
import { mkClass } from '../../../../util/mkClass'
import { Toolbar } from '../../../Toolbar/Toolbar'
import { Preview } from '../../Preview'
import { EditorTools } from '../../Tools/tool'
import { ColorTool } from './ColorTool'
import { CustomPalette } from './CustomPalette'
import { PixelEditor } from './PixelEditor'

/*
// TitleEditor.module.scss
.TitleEditor {

}
*/
export const Canvas = () => {
  const { assetEditor } = gameStore
  const { currentTool } = assetEditor

  return bind(currentTool, (_currentTool) =>
    div(
      { ...mkClass('Canvas') },
      Toolbar({
        tools: [
          {
            title: () => `✏️`,
            onClick: () => {
              currentTool.val = EditorTools.Draw
            },
            selected: _currentTool === EditorTools.Draw
          },
          {
            title: () => `🧹`,
            onClick: () => {
              currentTool.val = EditorTools.Erase
            },
            selected: _currentTool === EditorTools.Erase
          },
          {
            title: () => ColorTool({}),
            onClick: () => {},
            unstyled: true,
            selected: false
          }
        ]
      }),
      div(
        { ...mkClass('grid-container') },
        div(PixelEditor({}), CustomPalette({})),
        div(Preview({ background: 'black' }), Preview({ background: 'white' }))
      )
    )
  )
}
