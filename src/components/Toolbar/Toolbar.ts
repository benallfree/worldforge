import { CLEARFIX, mkClass } from '../../util/mkClass'
import { bind, div, state } from '../../van'
import { ToolButton, ToolButtonProps_In } from './ToolButton'

type ToolProps_In = Partial<ToolsProps>
type ToolsProps = {
  activeItemIdx: number
  floating: boolean
  tools: ToolButtonProps_In[]
  onToolItemClicked: (idx: number) => void
}
export const Toolbar = (props: ToolProps_In) => {
  const { floating, tools, onToolItemClicked, activeItemIdx }: ToolsProps = {
    activeItemIdx: 0,
    floating: false,
    tools: [],
    onToolItemClicked: (i) => {
      activeTabIdx.val = i
    },
    ...props
  }

  const activeTabIdx = state(activeItemIdx)

  return bind(activeTabIdx, (_activeTabIndex) => {
    return div(
      { ...mkClass(`Toolbar`, CLEARFIX) },
      div(
        { ...mkClass(floating ? `floating` : '') },
        ...tools.map((itemProps, i) =>
          ToolButton({
            selected: _activeTabIndex === i,
            onClick: () => onToolItemClicked(i),
            ...itemProps
          })
        )
      )
    )
  })
}