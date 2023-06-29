<script lang="ts">
  import { mkGridSize, xyToSlug } from '../helpers'
  import { ScreenNames, gameState } from '../state'
  import { range } from '../util/range'
  import ShareTool from './ShareTool.svelte'
  import TerrainCell from './TerrainCell.svelte'

  const { navigate } = gameState
  export let size = mkGridSize($gameState.terrain.size())
</script>

<button on:click={() => navigate(ScreenNames.Editor)}>Edit Assets</button>
<ShareTool />
{#each range(size) as r}
  <div class="row">
    {#each range(size) as c}
      <TerrainCell cell={$gameState.terrain.get(xyToSlug(r, c))} />
    {/each}
  </div>
{/each}

<style lang="scss">
  .row {
    white-space: nowrap;
  }
</style>
