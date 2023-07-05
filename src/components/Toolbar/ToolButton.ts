import { SetRequired } from 'type-fest'
import { INTERACTIVE, mkClass } from '../../util/mkClass'
import { PointerEventHandler, mkOnClick } from '../../util/mkOnClick'
import { ChildDom, Props, button } from '../../van'

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
  const buttonProps = {
    ...extraProps,
    ...mkClass(`ToolButton`, INTERACTIVE, selected ? `selected` : '', unstyled ? `unstyled` : '')
  }
  return button(
    {
      ...buttonProps,
      ...mkOnClick(onClick)
    },
    title()
  )
}
