import { gameStore } from '../store/gameStore'
import { mkOnClick } from '../util/mkOnClick'
import { pack } from '../util/pack'
import { bind, br, button, div, state } from '../van'
import { Copyable } from './Copyable'
import classes from './ShareTool.module.scss'

export const ShareTool = () => {
  const { worldId: worldId, name, serializeWorld } = gameStore

  const shareText = state('')

  pack(serializeWorld())
    .then((packed) => {
      const url = `https://worldforgegame.web.app?pm=${packed}`
      const _n = name.val
      const _id = worldId.val
      shareText.val = `Hey, check out my WorldForge map!\n\nMap name: ${_n}\nWorld ID: ${_id}\n\n${url}\n\nNote: If the link doesn't work, just copy this whole message into the WorldForge share tool and click Import.`
    })
    .catch(console.error)

  const { openModal } = gameStore
  const open = () => {
    return openModal({
      title: () => `Share a World`,
      body: () =>
        bind(shareText, (_shareText) =>
          Copyable({
            content: _shareText,
            success: `DLC copied to clipboard! Share on messaging apps!`,
            instructions: `Copy your DLC below and share it over text, Discord, WhatsApp, Twitter, or anywhere else you want!`
          })
        )
    })
  }

  return button({ class: classes.share, ...mkOnClick(open) }, div(`⤴️`, br(), `share`))
}
