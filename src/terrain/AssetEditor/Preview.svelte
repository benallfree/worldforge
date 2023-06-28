<script lang="ts">
  import { gameState } from '../../state'

  $: ({ assetEditor } = $gameState)
  $: ({ asset } = $assetEditor)
  $: ({ setTool, showColorPicker } = assetEditor)
  $: ({ sprite } = asset!)
</script>

<div class="preview">
  <img src={sprite} />
</div>

<style lang="scss">
  $pixelSize: 25px;

  .preview {
    img {
      border: 1px solid white;
      width: $pixelSize * 2;
      height: $pixelSize * 2;
    }
  }
</style>
