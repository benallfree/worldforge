import { writable } from 'svelte/store'
import { createTerrain } from './createTerrain'
import { mkGridSize } from './helpers'

export const terrain = writable(createTerrain({ size: mkGridSize(20), nPeaks: mkGridSize(7) }))

export * from './helpers'
