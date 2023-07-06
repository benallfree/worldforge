import { WF_QS } from '../constants/share'
import { gameStore } from '../store/gameStore'
import { atRestToInMemoryAsset, isAssetAtRest } from '../types/Asset'
import { assert } from '../util/assert'
import { getQueryStringVariable } from '../util/getQueryStringVariable'
import { DANGER, mkClass } from '../util/mkClass'
import { mkOnClick } from '../util/mkOnClick'
import { unpack } from '../util/pack'
import { button, div, h1, h2, p } from '../van'
import { Sprite } from './Sprite'

export type ImportToolProps = {
  onFinished: () => void
}

export const DefaultImportToolProps: ImportToolProps = { onFinished: () => assert(false) }
export const ImportTool = (props?: Partial<ImportToolProps>) => {
  const { onFinished } = { ...DefaultImportToolProps, ...props }

  const { openModal, saveAsset, assets, assetIds } = gameStore

  const finalize = () => {
    setTimeout(onFinished)
  }
  const sharePayload = getQueryStringVariable(WF_QS)
  if (!sharePayload) {
    finalize()
  } else {
    ;(async () => {
      try {
        const unpacked = await unpack(sharePayload)
        if (!unpacked) {
          throw new Error(`Import payload could not be unpacked.`)
        }
        const importObj = JSON.parse(unpacked)
        console.log({ importObj })
        if (!isAssetAtRest(importObj)) {
          throw new Error(`Import object not recognized.`)
        }
        const asset = await atRestToInMemoryAsset(importObj)
        const willOverwrite = !!assets[asset.id]
        openModal({
          title: () => `Import Asset`,
          body: () => {
            return div(
              willOverwrite ? h2(`Import and overwrite?`) : div(),
              Sprite({ asset }),
              div(
                button(
                  {
                    ...mkClass(willOverwrite ? DANGER : ''),
                    ...mkOnClick(() => {
                      saveAsset(asset)
                      finalize()
                    })
                  },
                  `Import`
                )
              )
            )
          }
        })
        finalize()
      } catch (e) {
        openModal({
          title: () => 'Import error',
          body: () => p(`${e}`),
          onClose: finalize
        })
      }
    })()
  }
  return h1(`Importing...`)
}
