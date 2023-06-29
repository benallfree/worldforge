<script lang="ts">
  import buildInfo from '../buildInfo.json'
  import { Screens, gameState } from './store'

  $: ({ loaded } = $gameState)
</script>

{#if loaded}
  <svelte:component this={Screens[$gameState.screen]()} />
{:else}
  Loading...
{/if}
<div>WorldForge build {buildInfo.build}</div>
