import { SetRequired } from 'type-fest'
import { mkOnClick } from '../util/mkOnClick'
import { button, div, p, textarea } from '../van'

export type CopyableProps_In = SetRequired<Partial<CopyableProps>, 'content'>
export type CopyableProps = {
  content: string
  success: string
  instructions: string
}

export const Copyable = (props: CopyableProps_In) => {
  const { content, success, instructions }: CopyableProps = {
    success: `Copied to clipboard!`,
    instructions: `Copy (CTRL+C / CMD+C) or use the copy button below.`,
    ...props
  }

  const shareTextArea = textarea({ readonly: true }, content)

  const onClipboardCopy = () => {
    shareTextArea.select()
    document.execCommand('copy')
    alert(success)
  }

  return div(p(instructions), shareTextArea, div(button({ ...mkOnClick(onClipboardCopy) }, `📋`)))
}
