import { pack } from './pack'

export const mkShareUrl = (serialized: string) =>
  pack(serialized).then((packed) => `https://worldforgegame.web.app?pm=${packed}`)
