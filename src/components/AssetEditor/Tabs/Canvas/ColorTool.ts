import { gameStore } from '@/store'
import { RgbHex } from '@/types'
import { bind, input } from '@/van'

type ColorToolProps = {}
export const ColorTool = (props: ColorToolProps) => {
  const { assetEditor } = gameStore
  const { setSelectedColor, selectedColor } = assetEditor

  function onColorChange(this: HTMLInputElement) {
    setSelectedColor(this.value as RgbHex)
  }

  return bind(selectedColor, (selectedColor) =>
    input({
      type: 'color',
      style: `border-radius: 8px;`,
      value: selectedColor,
      onchange: onColorChange
    })
  )
}
