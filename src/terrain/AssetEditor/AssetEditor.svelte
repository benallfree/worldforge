<script lang="ts">
  import { onMount } from 'svelte'
  import Canvas from './Canvas.svelte'
  import ColorPicker from './ColorPicker.svelte'
  import Preview from './Preview.svelte'
  import Tools from './Tools.svelte'
  import AssetSelector from './AssetSelector.svelte'
  import { gameState } from '../../state'

  $: ({ editingAsset } = $gameState)
</script>

<div class="editor">
  {#if editingAsset}
    <ColorPicker asset={editingAsset} />
    <Canvas asset={editingAsset} />
    <Preview asset={editingAsset} />
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
