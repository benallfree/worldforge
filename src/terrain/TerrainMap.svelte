<script lang="ts">
  import { range } from '@s-libs/micro-dash'
  import TerrainCell from './TerrainCell.svelte'
  import { mkGridSize, terrain, xyToSlug } from './'
  import AssetEditor from './AssetEditor/AssetEditor.svelte'

  export let size = mkGridSize($terrain.size())
  let newAsset = false
  const onNewAsset = () => (newAsset = !newAsset)
</script>

<h1>Points</h1>
<button on:click={onNewAsset}>New Asset</button>
{#if newAsset}
  <AssetEditor />
{/if}
<button>Tree</button> <button>Rock</button> <button>Water</button> <button>Commit</button>
<div>
  <div>
    Copy and paste this to <a
      href="https://discord.com/channels/998741996715900938/998741996715900941/1123455318731526144"
      >Ben's Discord Thread</a
    >
  </div>
  <textarea
    >@charlie submitted a pull request
    http://pleasentvalleugame.io?state=Wwp7ICJ4IjogNSwgInkiOiAxMCwgYWN0aW9uOiB7ICJ0eXBlIjogInJvY2siIH0gfSwKeyAieCI6IDYsICJ5IjogMTAsIGFjdGlvbjogeyAidHlwZSI6ICJyb2NrIiB9IH0KXQ==</textarea
  >
</div>
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
