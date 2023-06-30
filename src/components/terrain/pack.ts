import { compress, decompress } from '../../util/compress'
const WF_PACK_HEADER = `WFDLC*`

export const pack = (payload: string) =>
  compress(payload).then((packed) => `${WF_PACK_HEADER}${packed}`)

export const unpack = async (payload: string) => {
  const [, blob] = payload.match(/WFDLC\*([a-zA-Z0-9%]+)/) || []
  if (!blob) return

  return decompress(blob)
}
