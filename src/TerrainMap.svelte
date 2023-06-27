<script lang="ts">
  import { range } from '@s-libs/micro-dash'
  import TerrainCell from './TerrainCell.svelte'
  import { mkGridSize, terrain, xyToSlug } from './terrain'

  export let size = mkGridSize($terrain.size())
</script>

<h1>Points</h1>
{#each range(size) as r}
  <div class="row">
    {#each range(size) as c}
      <TerrainCell cell={$terrain.get(xyToSlug(r, c))} />
    {/each}
  </div>
{/each}

<style lang="scss">
  .row {
    white-space: nowrap;
  }
</style>
