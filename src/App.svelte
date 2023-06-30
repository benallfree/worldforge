<script lang="ts">
  import buildInfo from '../buildInfo.json'
  import Splash from './components/Splash.svelte'
  import TerrainMap from './components/terrain/TerrainMap.svelte'
  import { gameState } from './store'

  $: ({ loaded } = $gameState)
</script>

{#if loaded}
  <TerrainMap />
{:else}
  <Splash />
{/if}
<div><a href="https://github.com/benallfree/worldforge">WorldForge</a> build {buildInfo.build}</div>
