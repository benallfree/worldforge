<script lang="ts">
  import { forEach, map, range } from '@s-libs/micro-dash'
  import type { ArrayIteratee } from '@s-libs/micro-dash/lib/interfaces'
  import {
    TerrainType,
    chooseRandomPoints,
    coordToRc,
    createTerrain,
    generateDecay,
    mkGridSize,
    rcToCoord,
    terrain
  } from './terrain'
  import TerrainCell from './TerrainCell.svelte'

  export let size = mkGridSize($terrain.size())
</script>

<h1>Points</h1>
{#each range(size) as r}
  <div class="row">
    {#each range(size) as c}
      <TerrainCell cell={$terrain.get(rcToCoord(r, c))} />
    {/each}
  </div>
{/each}

<style lang="scss">
  .row {
    white-space: nowrap;
  }
</style>
