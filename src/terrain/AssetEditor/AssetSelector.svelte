<script lang="ts">
  import { gameState } from '../../state'
  import AssetTile from './AssetTile.svelte'
  import type { AssetId } from './state'

  const { createAsset, openAssetEditor, closeAssetEditor } = gameState

  $: ({ assets } = $gameState)
</script>

{#each Object.entries(assets) as [assetId, asset]}
  <AssetTile {asset} onClick={() => openAssetEditor(assetId)} />
{/each}
<button
  on:click={() => {
    const assetId = createAsset()
    openAssetEditor(assetId)
  }}>New</button
>
<button on:click={closeAssetEditor}>close</button>
