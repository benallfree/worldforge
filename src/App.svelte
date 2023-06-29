<script lang="ts">
  import { Screens, gameState } from './state'
  import buildInfo from '../buildInfo.json'
</script>

<svelte:component this={Screens[$gameState.screen]()} />
WorldForge build {buildInfo.build}
