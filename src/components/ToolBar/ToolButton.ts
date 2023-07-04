import { SetRequired } from 'type-fest'
import { PointerEventHandler, mkOnClick } from '../../util/mkOnClick'
import { ChildDom, Props, button } from '../../van'
import classes from './ToolButton.module.scss'

export type ToolButtonProps_In = SetRequired<Partial<ToolButtonProps>, 'title'>

export type ToolButtonProps = {
  title: () => ChildDom
  selected: boolean
  unstyled: boolean
  onClick: PointerEventHandler
  extraProps?: Props
}
export const ToolButton = (props: ToolButtonProps_In) => {
  const { title, selected, onClick, extraProps, unstyled }: ToolButtonProps = {
    unstyled: false,
    selected: false,
    onClick: () => {},
    ...props
  }
  const classNames: string[] = [classes.ToolButton]
  if (selected) classNames.push(classes.selected)
  if (unstyled) classNames.push(classes.unstyled)
  const buttonProps = {
    ...extraProps,
    class: classNames.join(' ')
  }
  return button(
    {
      ...buttonProps,
      ...mkOnClick(onClick)
    },
    title()
  )
}
