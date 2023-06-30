<script lang="ts">
  import { gameState } from '../../store'
  import AssetTile from './AssetTile.svelte'
  import { mkAssetId } from './store'

  const { createAsset, openAssetEditor, closeAssetEditor } = gameState

  $: ({ assets } = $gameState)
</script>

{#each Object.entries(assets) as [assetId, asset]}
  <AssetTile {asset} onClick={() => openAssetEditor(asset).catch(console.error)} />
{/each}
<button
  on:click={() => {
    console.log(`creating`)
    createAsset()
      .then((asset) => {
        console.log(`opening ${asset}`)
        openAssetEditor(asset).catch(console.error)
      })
      .catch(console.error)
  }}>New</button
>
<button on:click={closeAssetEditor}>close</button>
