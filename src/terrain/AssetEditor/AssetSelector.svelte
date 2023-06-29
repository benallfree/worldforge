<script lang="ts">
  import { gameState } from '../../state'
  import AssetTile from './AssetTile.svelte'
  import { mkAssetId } from './state'

  const { createAsset, openAssetEditor, closeAssetEditor } = gameState

  $: ({ assets } = $gameState)
</script>

{#each Object.entries(assets) as [assetId, asset]}
  <AssetTile {asset} onClick={() => openAssetEditor(mkAssetId(assetId)).catch(console.error)} />
{/each}
<button
  on:click={() => {
    console.log(`creating`)
    createAsset()
      .then((assetId) => {
        console.log(`opening ${assetId}`)
        openAssetEditor(assetId).catch(console.error)
      })
      .catch(console.error)
  }}>New</button
>
<button on:click={closeAssetEditor}>close</button>
