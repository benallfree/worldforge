import { SetRequired } from 'type-fest'
import { PointerEventHandler, mkOnClick } from '../../../util/mkOnClick'
import { Props, button } from '../../../van'
import classes from './ToolButton.module.scss'

type ToolButtonProps = {
  name: ChildNode | string
  selected: boolean
  onClick: PointerEventHandler
  extraProps?: Props
}
export const ToolButton = (props: SetRequired<Partial<ToolButtonProps>, 'name'>) => {
  const { name, selected, onClick, extraProps } = { selected: false, onClick: () => {}, ...props }
  const buttonProps = {
    ...extraProps,
    class: `${classes.ToolButton} ${selected ? classes.selected : ''} ${extraProps?.class}`
  }
  return button(
    {
      ...buttonProps,
      ...mkOnClick(onClick)
    },
    name
  )
}
