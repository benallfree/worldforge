export const TILE = 'tile'
export const LAYER = 'layer'
export const INTERACTIVE = 'interactive'
export const CONTAINER = 'container'
export const CLEARFIX = `clearfix`
export const NOSELECT = `no-select`

export const mkClass = (...args: string[]) => ({ class: args.join(' ') })
