<script lang="ts">
  import { gameState } from '../../store'
  import { TILE_SIZE } from '../../util/constants'
  import { mkGridSize, xyToSlug } from '../../util/helpers'
  import { px } from '../../util/px'
  import { range } from '../../util/range'
  import ShareTool from './ShareTool.svelte'
  import TerrainCell from './TerrainCell.svelte'

  export let size = mkGridSize($gameState.terrain.size())
</script>

<ShareTool />
<div class="world" style={`width: ${px((TILE_SIZE + 2) * size)}`}>
  {#each range(size) as r}{#each range(size) as c}<TerrainCell
        cell={$gameState.terrain.get(xyToSlug(r, c))}
      />{/each}{/each}
</div>

<style lang="scss">
  .row {
    width: 100%;
  }
</style>
