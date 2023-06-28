<script lang="ts">
  import ColorBlock from './ColorBlock.svelte'
  import { COLOR_SEEDS } from './helpers'
  import type { AssetEditorApi } from './state'

  export let asset: AssetEditorApi
  const { setPaletteSeed, setSelectedColor } = asset

  $: ({ palette, paletteSeed } = $asset)
</script>

<div>
  <h1>Color</h1>
  <div>
    <h2>Predefined Palettes</h2>
    <div>
      {#each COLOR_SEEDS as color}
        <ColorBlock
          selected={$asset.selectedColor === color}
          {color}
          onClick={() => setPaletteSeed(color)}
        />
      {/each}
    </div>
    or custom palette:
    <input type="text" bind:value={paletteSeed} />
    <div class="color-set">
      {#each palette as color}<ColorBlock
          selected={$asset.selectedColor === color}
          {color}
          onClick={() => setSelectedColor(color)}
        />{/each}
    </div>
  </div>
</div>

<style lang="scss">
  $pixelSize: 27px;

  .color-set {
    width: ($pixelSize * 4);
    line-height: 0;
  }
</style>
