<script lang="ts">
  import { ScreenNames, gameState } from '../../state'

  const { navigate } = gameState
</script>

<div>Hello world</div>
<button on:click={() => navigate(ScreenNames.Home)}>Enter</button>
