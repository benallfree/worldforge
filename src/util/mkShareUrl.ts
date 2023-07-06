import { WF_QS } from '../constants/share'
import { pack } from './pack'

export const mkShareUrl = (serialized: string) =>
  pack(serialized).then((packed) => `${document.location.origin}?${WF_QS}=${packed}`)
