import { nanoid } from 'nanoid'
import { Opaque, PartialDeep } from 'type-fest'
import { State } from '../van'
import { Sprite } from './Sprite'

export type StatefulAsset = State<AssetState>
export type AssetId = Opaque<string, 'asset-id'>
export type Asset = {
  id: AssetId
  sprite: string[]
}
export const toAssetId = (id: string) => id as AssetId
export const newAssetId = () => nanoid() as AssetId

export type AssetState = {
  id: AssetId
  name: string
  sprite: Sprite
}

export type AssetStateCollection = {
  [id: AssetId]: AssetState
}

export type AssetState_AtRest = Pick<AssetState, 'id' | 'name' | 'sprite'>
export type Asset_AtRest_Untrusted = PartialDeep<AssetState_AtRest>

export const EMPTY_SPRITE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' as Sprite

export const createNewAssetState = () => {
  const asset: AssetState = {
    id: newAssetId(),
    name: 'New Asset',
    sprite: EMPTY_SPRITE
  }
  return asset
}

export const inMemoryToAtRestAsset = (asset: AssetState): AssetState_AtRest => {
  const { sprite, id, name } = asset
  return { sprite, id, name }
}

export const atRestToInMemoryAsset = async (untrustedAsset: Asset_AtRest_Untrusted) => {
  const trustedAsset: AssetState_AtRest = {
    id: newAssetId(),
    sprite: EMPTY_SPRITE,
    name: `Unknown asset`,
    ...untrustedAsset
  }
  const { id, sprite, name } = trustedAsset
  const memory: AssetState = {
    id,
    name,
    sprite
  }
  return memory
}

export const cloneAsset = (toClone: AssetState) => {
  const cloned = { ...toClone, id: newAssetId(), name: `Copy of ${toClone.name}` }
  return cloned
}