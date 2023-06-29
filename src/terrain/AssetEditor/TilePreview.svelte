<script lang="ts">
  import { range } from '../../util/range'
  import AssetTile from './AssetTile.svelte'
  import { TILE_SIZE, px, type AssetState } from './state'

  export let backgroundColor = 'black'
  export let size = TILE_SIZE
  export let asset: AssetState
</script>

<div class="tile-container" style:--backgroundColor={backgroundColor} style:--tileSize={px(size)}>
  {#each range(9) as r}
    <div class="tile">
      <AssetTile {asset} />
    </div>
  {/each}
</div>

<style lang="scss">
  .tile-container {
    background-color: var(--backgroundColor);
    line-height: 0px;
    width: calc(var(--tileSize) * 3);
    .tile {
      display: inline-block;
    }
  }
</style>
