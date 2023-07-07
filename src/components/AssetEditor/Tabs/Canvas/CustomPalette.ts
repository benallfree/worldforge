import { gameStore } from '@/store'
import { CLEARFIX, assert, mkClass, mkOnClick } from '@/util'
import { bind, div } from '@/van'

type CustomPaletteProps = {}
export const CustomPalette = (props: CustomPaletteProps) => {
  const {} = props

  const { assetEditor } = gameStore
  const { currentAsset, palette, setSelectedColor } = assetEditor

  return bind(currentAsset, palette, (currentAsset, palette) => {
    assert(currentAsset)
    return div(
      { ...mkClass(`CustomPalette`, CLEARFIX) },
      ...(palette.map((hex) =>
        div({
          ...mkClass(`color`),
          style: `background-color: ${hex}`,
          ...mkOnClick(() => {
            setSelectedColor(hex)
          })
        })
      ) || [])
    )
  })
}
