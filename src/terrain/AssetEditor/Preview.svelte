<script lang="ts">
  import type { AssetEditorApi } from './state'

  export let asset: AssetEditorApi
  $: ({ sprite } = $asset)
</script>

<div>
  <h1>Preview</h1>
  <div class="preview">
    <img src={sprite} />
  </div>
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
