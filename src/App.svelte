<script lang="ts">
  import buildInfo from '../buildInfo.json'
  import TerrainMap from './components/terrain/TerrainMap.svelte'
  import { gameState } from './store'

  $: ({ loaded } = $gameState)
</script>

{#if loaded}
  <TerrainMap />
{:else}
  <h1>WorldForge</h1>
{/if}
<div><a href="https://github.com/benallfree/worldforge">WorldForge</a> build {buildInfo.build}</div>
