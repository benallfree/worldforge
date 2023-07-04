import { bind, div, state } from '../../van'
import classes from './ToolBar.module.scss'
import { ToolButton, ToolButtonProps_In } from './ToolButton'

type ToolProps_In = Partial<ToolsProps>
type ToolsProps = {
  activeItemIdx: number
  floating: boolean
  tools: ToolButtonProps_In[]
  onToolItemClicked: (idx: number) => void
}
export const ToolBar = (props: ToolProps_In) => {
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
      { class: classes.ToolBar },
      div(
        { class: floating ? classes.floating : '' },
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
