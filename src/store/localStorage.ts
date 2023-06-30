import { Opaque } from 'type-fest'
import { WorldId, WorldState_AtRest } from '.'

type StorageKey = Opaque<string, 'storage-key'>
type RootKey = Opaque<string, 'root-key'>
const ROOT_KEY = '__worldcraft__' as RootKey

enum StorageKeys {
  Worlds = 'worlds',
  Splash = 'splash',
  CurrentWorldId = 'currentWorldId'
}

type Root = {
  [StorageKeys.Splash]: boolean
  [StorageKeys.Worlds]: WorldCollection
  [StorageKeys.CurrentWorldId]?: WorldId
}

type WorldCollection = {
  [worldId: WorldId]: WorldState_AtRest
}

export const safeParse = (json: string | null): string | number | object | null => {
  if (!json) return null
  try {
    const parsed = JSON.parse(json)
    return parsed as object
  } catch {}
  return null
}

const old = localStorage.getItem(ROOT_KEY)
if (old) {
  localStorage.setItem(`${ROOT_KEY}_${+new Date()}`, old)
}

const _getRoot = (): Root => {
  const root = safeParse(localStorage.getItem(ROOT_KEY))
  return {
    [StorageKeys.Splash]: false,
    [StorageKeys.Worlds]: {},
    ...((typeof root === 'object' ? root : {}) as Partial<Root>)
  }
}
const _setRoot = (data: object | boolean | string | number) =>
  localStorage.setItem(ROOT_KEY, JSON.stringify(data))

const getKeyOrDefault = <K extends StorageKeys>(name: K, def: Root[K]): Root[K] => {
  const root = _getRoot()
  if (typeof root[name] === 'undefined') return def
  return root[name]
}

const setKey = <K extends StorageKeys>(name: K, data: Root[K]): void => {
  const current = _getRoot()
  current[name] = data
  _setRoot(current)
}

export const getCurrentWorldId = () => getKeyOrDefault(StorageKeys.CurrentWorldId, undefined)

export const loadWorld = (id: WorldId) => getKeyOrDefault(StorageKeys.Worlds, {})[id]
export const saveWorld = (data: WorldState_AtRest) => {
  const worlds = getKeyOrDefault(StorageKeys.Worlds, {})
  worlds[data.id] = data
  setKey(StorageKeys.Worlds, data)
}

export const loadSplash = () => getKeyOrDefault(StorageKeys.Splash, false)
export const saveSplash = (data: Root[StorageKeys.Splash]) => setKey(StorageKeys.Splash, data)
