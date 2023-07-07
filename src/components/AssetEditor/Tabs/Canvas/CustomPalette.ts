import { gameStore } from '@/store'
import { bind, div } from '@/van'
import { assert } from '../../../../util/assert'
import { CLEARFIX, mkClass } from '../../../../util/mkClass'
import { mkOnClick } from '../../../../util/mkOnClick'

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
