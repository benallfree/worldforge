import { gameStore } from '../../../../store/gameStore'
import { assert } from '../../../../util/assert'
import { mkOnClick } from '../../../../util/mkOnClick'
import { bind, div } from '../../../../van'
import classes from './CustomPalette.module.scss'

type CustomPaletteProps = {}
export const CustomPalette = (props: CustomPaletteProps) => {
  const {} = props

  const { assetEditor } = gameStore
  const { currentAsset, palette, setSelectedColor } = assetEditor

  return bind(currentAsset, palette, (currentAsset, palette) => {
    assert(currentAsset)
    return div(
      { class: classes.CustomPalette },
      ...(palette.map((hex) =>
        div({
          class: classes.color,
          style: `background-color: ${hex}`,
          ...mkOnClick(() => {
            setSelectedColor(hex)
          })
        })
      ) || [])
    )
  })
}
