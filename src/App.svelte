<script lang="ts">
  import { Screens, gameState } from './state'
</script>

<svelte:component this={Screens[$gameState.screen]()} />
