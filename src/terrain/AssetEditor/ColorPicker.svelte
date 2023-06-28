<script lang="ts">
  import { gameState } from '../../state'
  import ColorBlock from './ColorBlock.svelte'
  import { COLOR_SEEDS } from './helpers'

  $: ({ assetEditor } = $gameState)
  $: ({ asset, selectedColor, paletteSeed, palette } = $assetEditor)
  $: ({ setPaletteSeed, setSelectedColor } = assetEditor)
  $: ({} = asset!)
</script>

<div class="picker">
  <div>
    <h2>Predefined Palettes</h2>
    <div>
      {#each COLOR_SEEDS as color}
        <ColorBlock
          selected={palette.some((paletteColor) => color === paletteColor)}
          {color}
          onClick={() => setPaletteSeed(color)}
        />
      {/each}
    </div>
    or custom palette:
    <input type="text" value={paletteSeed} on:change={(e) => setPaletteSeed(e.target.value)} />
    <div class="color-set">
      {#each palette as color}<ColorBlock
          selected={selectedColor === color}
          {color}
          onClick={() => setSelectedColor(color)}
        />{/each}
    </div>
  </div>
</div>

<style lang="scss">
  $pixelSize: 27px;

  .picker {
    border: 1px solid gray;
    border-radius: 5px;
    padding: 10px;
  }
  .color-set {
    width: ($pixelSize * 4);
    line-height: 0;
  }
</style>
