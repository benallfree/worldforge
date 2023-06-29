<script lang="ts">
  import { mkGridSize, xyToSlug } from '../../util/helpers'
  import { ScreenNames, gameState } from '../../store'
  import { TILE_SIZE } from '../../util/constants'
  import { px } from '../../util/px'
  import { range } from '../../util/range'
  import ShareTool from './ShareTool.svelte'
  import TerrainCell from './TerrainCell.svelte'

  const { navigate } = gameState
  export let size = mkGridSize($gameState.terrain.size())
</script>

<button on:click={() => navigate(ScreenNames.Editor)}>Edit Assets</button>
<ShareTool />
<div class="world" style={`width: ${px((TILE_SIZE + 2) * size)}`}>
  {#each range(size) as r}
    <div class="row">
      {#each range(size) as c}
        <TerrainCell cell={$gameState.terrain.get(xyToSlug(r, c))} />
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  .row {
    width: 100%;
  }
</style>
