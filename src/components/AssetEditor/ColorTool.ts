import { gameStore } from '../../store/gameStore'
import { RgbHex } from '../../types/RgbHex'
import { input } from '../../van'
import classes from './ToolButton.module.scss'

type ColorToolProps = {}
export const ColorTool = (props?: ColorToolProps) => {
  const { assetEditor } = gameStore
  const { setSelectedColor, selectedColor } = assetEditor

  function onColorChange(this: HTMLInputElement) {
    // console.log(this)
    setSelectedColor(this.value as RgbHex)
  }

  selectedColor.onnew(console.log)
  return input({
    class: classes.ToolButton,
    type: 'color',
    style: `border-radius: 8px;`,
    value: selectedColor,
    onchange: onColorChange
  })
}
