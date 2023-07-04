import { assert } from '../../util/assert'
import { ChildDom, bind, div, state } from '../../van'
import { ToolBar } from '../ToolBar/ToolBar'
import classes from './TabManager.module.scss'

export type TabManagerProps = { tabs: { [_: string]: () => ChildDom } }

export const DefaultTabManagerProps: TabManagerProps = { tabs: {} }
export const TabManager = (props?: Partial<TabManagerProps>) => {
  const { tabs } = { ...DefaultTabManagerProps, ...props }

  const entries = Object.entries(tabs)
  assert(entries.length > 0)
  const activeTabIdx = state(0)

  return bind(activeTabIdx, (_activeTablIdx) => {
    return div(
      { class: classes.TabManager },
      ToolBar({
        tools: entries.map(([title], i) => ({
          title: () => title,
          selected: _activeTablIdx === i
        })),
        onToolItemClicked: (idx) => {
          activeTabIdx.val = idx
        }
      }),
      entries[_activeTablIdx][1]()
    )
  })
}
