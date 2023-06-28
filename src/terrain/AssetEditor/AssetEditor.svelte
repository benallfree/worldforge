<script lang="ts">
  import { onMount } from 'svelte'
  import Canvas from './Canvas.svelte'
  import ColorPicker from './ColorPicker.svelte'
  import Preview from './Preview.svelte'
  import Tools from './Tools.svelte'
  import { assetEditorState } from './state'

  onMount(() => {
    assetEditorState.reset()
  })
</script>

<div class="editor">
  <ColorPicker />
  <Canvas />
  <Preview />
</div>

<style lang="scss">
  .editor {
    margin: 20px;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid gray;
  }
</style>
