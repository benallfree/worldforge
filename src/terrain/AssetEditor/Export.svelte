<script lang="ts">
  import { convertRGBArrayToImageData } from './helpers'
  import { assetEditorState } from './assets'

  let imgData: string
  $: ({ canvas } = $assetEditorState)
  $: {
    imgData = convertRGBArrayToImageData(canvas)
  }
  console.log({ canvas, $assetEditorState })
</script>

<div>
  <h1>Export</h1>
  <textarea />
</div>

<style lang="scss">
  $pixelSize: 25px;
</style>
