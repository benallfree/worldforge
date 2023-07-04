import { gameStore } from '../store/gameStore'
import { mkOnClick } from '../util/mkOnClick'
import { pack } from '../util/pack'
import { br, button, div, p, textarea } from '../van'
import classes from './ShareTool.module.scss'

export const ShareTool = () => {
  const { worldId: worldId, name, serializeWorld } = gameStore
  const shareTextArea = textarea()
  pack(serializeWorld())
    .then((packed) => {
      const url = `https://worldforgegame.web.app?pm=${packed}`
      const _n = name.val
      const _id = worldId.val
      shareTextArea.value = `Hey, check out my WorldForge map!\n\nMap name: ${_n}\nWorld ID: ${_id}\n\n${url}\n\nNote: If the link doesn't work, just copy this whole message into the WorldForge share tool and click Import.`
    })
    .catch(console.error)

  const onClipboardCopy = () => {
    shareTextArea.select()
    document.execCommand('copy')
    alert(`DLC copied to clipboard! Share on messaging apps!`)
  }

  const { openModal, closeModal } = gameStore
  const open = () => {
    console.log(`opening modal share`)
    return openModal({
      title: () => `Share a World`,
      body: () =>
        div(
          { class: classes.Modal },
          p(
            `Copy your DLC below and share it over text, Discord, WhatsApp, Twitter, or anywhere else you want!`
          ),
          shareTextArea,
          div(button({ ...mkOnClick(onClipboardCopy) }, `📋`))
        )
    })
  }

  return button({ class: classes.share, ...mkOnClick(open) }, div(`⤴️`, br(), `share`))
}
