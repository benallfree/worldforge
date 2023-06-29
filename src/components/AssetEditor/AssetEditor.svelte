<script lang="ts">
  import { gameState } from '../../store'
  import AssetSelector from './AssetSelector.svelte'
  import Canvas from './Canvas.svelte'

  $: ({ assetEditor } = $gameState)
  $: ({ asset } = $assetEditor)
</script>

<div class="editor">
  {#if asset}
    {asset.name}
    <Canvas />
  {:else}
    <AssetSelector />
  {/if}
</div>

<style lang="scss">
  .editor {
    margin: 20px;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid gray;
  }
</style>
