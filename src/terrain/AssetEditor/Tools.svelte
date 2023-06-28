<script lang="ts">
  import { gameState } from '../../state'
  import ColorPicker from './ColorPicker.svelte'
  import ToolButton from './ToolButton.svelte'
  import { TOOL_NAMES, mkTool } from './state'

  $: ({ saveAsset, closeAssetEditor } = gameState)
  $: ({ assetEditor } = $gameState)
  $: ({ asset, isColorPickerShowing, selectedColor } = $assetEditor)
  $: ({ setTool, showColorPicker, clearAsset } = assetEditor)
  $: ({} = asset!)

  const onSave = () => {
    saveAsset(asset!)
    clearAsset()
  }
</script>

<div>
  {#each Object.entries(TOOL_NAMES) as [tool]}
    <ToolButton tool={mkTool(tool)} onClick={() => setTool(mkTool(tool))} />
  {/each}
  <button style={`background-color: ${selectedColor}`} on:click={showColorPicker}>🎨</button>
  {#if isColorPickerShowing}
    <ColorPicker />
  {/if}
  <button on:click={onSave}>save</button>
  <button on:click={closeAssetEditor}>cancel</button>
</div>

<style lang="scss">
</style>
