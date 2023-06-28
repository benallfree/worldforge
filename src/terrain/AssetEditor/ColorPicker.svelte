<script lang="ts">
  import ColorBlock from './ColorBlock.svelte'
  import { COLOR_SEEDS } from './helpers'
  import { assetEditorState } from './state'

  const { setPaletteSeed, setSelectedColor } = assetEditorState

  console.log({ $assetEditorState })
  $: ({ palette } = $assetEditorState)
</script>

<div>
  <h1>Color</h1>
  <div>
    <h2>Predefined Palettes</h2>
    <div>
      {#each COLOR_SEEDS as color}
        <ColorBlock {color} onClick={() => setPaletteSeed(color)} />
      {/each}
    </div>
    or custom palette:
    <input type="text" bind:value={$assetEditorState.paletteSeed} />
    <div class="color-set">
      {#each palette as color}<ColorBlock {color} onClick={() => setSelectedColor(color)} />{/each}
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
