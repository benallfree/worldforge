<script lang="ts">
  import { gameState } from '../../state'
  import type { AssetState } from './state'

  export let asset: AssetState
  export let onClick = () => {}

  $: ({ sprite } = asset)
</script>

<div class="tile" on:click={onClick}>
  <img src={sprite} />
</div>

<style lang="scss">
  $pixelSize: 25px;

  .tile {
    display: inline-block;
    img {
      border: 1px solid white;
      width: $pixelSize * 2;
      height: $pixelSize * 2;
    }
  }
</style>
