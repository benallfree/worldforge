<script lang="ts">
  import type { HTMLSelectAttributes } from 'svelte/elements'
  import { gameState } from '../../state'
  import type { AssetEditorApi } from './state'

  const { createAsset, editAsset } = gameState

  let selectElement: HTMLSelectElement
  const valueChanged = () => {
    const { value } = selectElement
    if (value === `new`) {
      const assetId = createAsset()
      editAsset(assetId)
    }
    console.log(selectElement.value)
  }
  $: ({ assets } = $gameState)
</script>

<select bind:this={selectElement} on:change={valueChanged}>
  <option value="">Select asset</option>
  {#each Object.entries(assets) as [assetId, asset]}
    <option value={assetId}>{asset.name}</option>
  {/each}
  <option disabled>------------</option>
  <option value="new">Create New Asset</option>
</select>
