<script lang="ts">
  import { gameState } from '../../store'
  import ColorBlock from './ColorBlock.svelte'
  import AssetTile from './AssetTile.svelte'
  import Tools from './Tools.svelte'
  import Preview from './Preview.svelte'
  import { SPRITE_SIZE, type AssetEditorState } from './store'
  import type { SetRequired } from 'type-fest'

  $: ({ assetEditor } = $gameState)
  $: ({ asset, selectedColor } = $assetEditor as SetRequired<AssetEditorState, 'asset'>)
  $: ({ setPixel, setSelectedColor } = assetEditor)
  $: ({ canvas, palette, sprite } = asset)

  const CANVAS_SIZE = 300
  const STEP = CANVAS_SIZE / SPRITE_SIZE
  const onMouse = (e: MouseEvent) => {
    if (!e.buttons) return
    const x = Math.floor(e.offsetX / STEP)
    const y = Math.floor(e.offsetY / STEP)
    setPixel(x, y)
  }
</script>

<div>
  <Tools />
  <div class="row">
    <div class="column">
      <AssetTile
        {asset}
        border={1}
        size={CANVAS_SIZE}
        onMouseMove={onMouse}
        onMouseDown={onMouse}
      />
      <div class="custom-palette">
        {#each palette as color}
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
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .custom-palette {
    margin-top: 15px;
  }
</style>
