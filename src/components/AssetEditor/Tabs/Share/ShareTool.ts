import { gameStore } from '../../../../store/gameStore'
import { AssetState_AtRest, EMPTY_SPRITE, inMemoryToAtRestAsset } from '../../../../types/Asset'
import { assert } from '../../../../util/assert'
import { a, bind, div, h1, img, p, state } from '../../../../van'
import { Copyable } from '../../../Copyable'
import { TabManager } from '../../../TabManager/TabManager'
import { scaleImageWithDataURL } from '../Canvas/canvas-helpers'
import ShareToolClasses from './ShareTool.module.scss'

const mkIssueTemplate = (asset: AssetState_AtRest) => {
  const { name, description, sprite } = asset
  return `
Hello, I'd like to share my asset named ${name}.

Description: ${description}

[[IMAGE]]

And the complete export:

\`\`\`json
${JSON.stringify(asset, null, 2)}
\`\`\`

`
}

export type ShareToolProps = {}
export const DefaultShareToolProps: ShareToolProps = {}
export const ShareTool = (props?: Partial<ShareToolProps>) => {
  const {} = { ...DefaultShareToolProps, ...props }

  const scaledDataUrl = state(EMPTY_SPRITE)

  const { assetEditor } = gameStore
  const { currentAsset } = assetEditor

  const asset = currentAsset.val

  assert(asset)

  const { sprite } = asset

  scaleImageWithDataURL(sprite, 10)
    .then((scaled) => {
      scaledDataUrl.val = scaled
    })
    .catch(console.error)

  return bind(asset, scaledDataUrl, (asset, sprite) => {
    return div(
      { class: ShareToolClasses['ShareTool'] },
      TabManager({
        tabs: {
          ['Link']: () =>
            div(p(`The easiest way to share your work is by sharing a link with your friends.`)),
          ['github']: () =>
            div(
              p(`The best way to share your assets is through the official github repo.`),
              h1(`Step 1 - Open a new github issue`),
              p(
                a(
                  {
                    href: `https://github.com/benallfree/awesome-worldforge/issues/new`,
                    class: 'button',
                    target: '_blank'
                  },
                  `go to github`
                )
              ),
              h1(`Step 2: Copy and paste this for the title`),
              Copyable({ content: `[Asset Submission] ${asset.name}` }),
              h1(`Step 3: Copy and paste this into the issue body`),
              Copyable({ content: mkIssueTemplate(inMemoryToAtRestAsset(asset)) }),
              h1(
                `Step 4: Copy and paste this into the issue body where the [[IMAGE]] placeholder is.`
              ),
              img({ src: sprite })
            )
        }
      })
    )
  })
}
