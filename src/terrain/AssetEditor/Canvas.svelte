<script lang="ts">
  import ColorBlock from './ColorBlock.svelte'
  import Tools from './Tools.svelte'
  import { type AssetEditorApi } from './state'

  export let asset: AssetEditorApi
  const { setPixel } = asset

  const onMouseMove = (e: MouseEvent, r: number, c: number) => {
    if (!e.buttons) return
    setPixel(r, c)
  }
  $: ({ canvas, selectedColor } = $asset)
</script>

<div>
  <h1>Canvas</h1>
  <Tools {asset} />
  <ColorBlock color={selectedColor} />
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
</div>

<style lang="scss">
  $pixelSize: 25px;

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
