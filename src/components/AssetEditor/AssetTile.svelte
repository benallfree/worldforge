<script lang="ts">
  import { TILE_SIZE } from '../../util/constants'
  import { px } from '../../util/px'
  import type { AssetState } from './store'

  export let onMouseMove = (e: MouseEvent) => {}
  export let onMouseDown = (e: MouseEvent) => {}
  export let border = 0
  export let size = TILE_SIZE
  export let asset: AssetState
  export let onClick = () => {}

  $: ({ sprite } = asset)
</script>

<div
  class="tile"
  on:click={onClick}
  on:mousedown={onMouseDown}
  on:mousemove={onMouseMove}
  style:--size={px(size)}
  style:background-image={`url(${sprite})`}
  style:--border={px(border)}
/>

<style lang="scss">
  .tile {
    width: var(--size);
    height: var(--size);
    display: inline-block;
    image-rendering: pixelated;
    background-repeat: no-repeat;
    background-size: cover;
    border: var(--border) solid gray;
    cursor: pointer;
  }
</style>
