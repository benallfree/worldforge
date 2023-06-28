<script lang="ts">
  import { gameState } from '../../state'
  import ColorBlock from './ColorBlock.svelte'
  import Preview from './AssetTile.svelte'
  import Tools from './Tools.svelte'

  $: ({ assetEditor } = $gameState)
  $: ({ asset, selectedColor, customPalette } = $assetEditor)
  $: ({ setPixel, setSelectedColor } = assetEditor)
  $: ({ canvas } = asset!)

  const onMouseMove = (e: MouseEvent, r: number, c: number) => {
    if (!e.buttons) return
    setPixel(r, c)
  }
</script>

<div>
  <Tools />
  <div class="row">
    <div class="column">
      <div class="canvas">
        {#each canvas as row, r}
          {#each row as pixelColor, c}
            <div
              class="pixel"
              style={`background-color: ${pixelColor}`}
              on:mouseenter={(e) => onMouseMove(e, r, c)}
              on:mousedown={(e) => setPixel(r, c)}
            />
          {/each}
        {/each}
      </div>
      <div class="custom-palette">
        {#each customPalette as color}
          <ColorBlock {color} onClick={() => setSelectedColor(color)} />
        {/each}
      </div>
    </div>
    <div class="column">
      <Preview {asset} />
    </div>
  </div>
</div>

<style lang="scss">
  $pixelSize: 25px;

  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;

    .column {
    }
  }
  .custom-palette {
    margin-top: 15px;
  }
  .canvas {
    width: (($pixelSize + 2) * 16);
    line-height: 0;
  }
  .pixel {
    &:hover {
      cursor: pointer;
    }
    margin: 0px;
    width: ($pixelSize);
    height: ($pixelSize);
    display: inline-block;
  }
  .pixel {
    border: 1px solid gray;
  }
</style>
