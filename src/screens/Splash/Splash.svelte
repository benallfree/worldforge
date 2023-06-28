<script lang="ts">
  import { ScreenNames, gameState } from '../../state'

  const { navigate } = gameState
</script>

<div>WorldForge</div>
<button on:click={() => navigate(ScreenNames.Home)}>Enter</button>
