import { nanoid } from 'nanoid'
import { Opaque } from 'type-fest'
import { assert } from '../util/assert'
import { mkOnClick } from '../util/mkOnClick'
import { nextTick } from '../util/nextTick'
import { ChildDom, State, bind, div, h1, state } from '../van'
import classes from './Modal.module.scss'

type ModalId = Opaque<ReturnType<typeof nanoid>, 'modal-id'>
export const newModalId = () => nanoid() as ModalId
export const mkModalId = (s: string) => s as ModalId
type ModalBodyRenderFunc = () => ChildDom
type OpenProps = {
  title: ModalBodyRenderFunc
  body: ModalBodyRenderFunc
  event?: ClientXY
  onClose?: () => void
  id?: ModalId
}
type ModalElement = Opaque<() => ReturnType<typeof bind>, 'modal-render-func'>
type ModalOpener = (props: OpenProps) => Promise<void>
type ModalCloser = () => Promise<void>
type ClientXY = { pageX: number; pageY: number }

function positionDivAroundMouse(div: HTMLDivElement, event: ClientXY) {
  // console.log({ div, event })
  // Get the current mouse position
  const mouseX = event.pageX
  const mouseY = event.pageY

  // Get the dimensions of the div
  const divWidth = div.offsetWidth
  const divHeight = div.offsetHeight

  // Get the dimensions of the window
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  // Calculate the maximum allowed positions for the div
  const maxLeft = windowWidth - divWidth
  const maxTop = windowHeight - divHeight

  // Calculate the desired position of the div
  let left = mouseX
  let top = mouseY

  // Adjust the position if the div overflows the window
  if (left > maxLeft) {
    left = maxLeft
  }

  if (top > maxTop) {
    top = maxTop
  }

  // Set the position of the div
  div.style.left = left + 'px'
  div.style.top = top + 'px'
  div.style.transform = 'none'
}

type OpenState = State<boolean>
type ModalResult = [ModalElement, ModalOpener, ModalCloser, OpenState]

export const Modal = (): ModalResult => {
  const id = newModalId()
  const isOpen = state(false)
  const openProps = state<OpenProps>({
    title: () => `New Modal`,
    body: () => div(`Empty modal body`)
  })

  isOpen.onnew((isOpen) => {
    setTimeout(() => {
      // console.log({ isOpen })
      const { event } = openProps.val
      if (!isOpen || !event) return
      const root = document.getElementById(id) as HTMLDivElement | undefined
      // console.log({ root, id })
      assert(root)
      positionDivAroundMouse(root, event)
    }, 0)
  })

  const open: ModalOpener = async (props) => {
    await close()
    openProps.val = { ...props }
    isOpen.val = true
    await nextTick()
  }

  const close: ModalCloser = async () => {
    isOpen.val = false
    await nextTick()
    openProps.val.onClose?.()
    await nextTick()
  }

  const element = (() => {
    return bind(isOpen, openProps, (isOpen, openProps) => {
      if (!isOpen) return div()
      const { title, event, body } = openProps
      return div(
        {
          class: event ? '' : classes['modal-overlay'],
          ...mkOnClick(() => close(), { targetOnly: true })
        },
        div(
          { id, class: classes.Modal },
          h1(title()),
          div(
            {
              class: classes.close,
              ...mkOnClick(close)
            },
            `❌`
          ),
          body()
        )
      )
    })
  }) as ModalElement

  return [element, open, close, isOpen]
}
