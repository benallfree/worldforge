<script lang="ts">
  import { gameState } from '../../state'
  import ColorPicker from './ColorPicker.svelte'
  import ToolButton from './ToolButton.svelte'
  import { TOOL_NAMES, mkTool } from './state'

  $: ({ saveAsset, openAssetEditor, createAsset } = gameState)
  $: ({ assetEditor } = $gameState)
  $: ({ asset, isColorPickerShowing, selectedColor } = $assetEditor)
  $: ({ setTool, showColorPicker, clearAsset } = assetEditor)
  $: ({} = asset!)

  const onSave = () => {
    saveAsset(asset!)
    clearAsset()
  }
  const onClone = () => {
    const assetId = createAsset()
    saveAsset({ ...asset!, name: `Clone of ${asset!.name}`, id: assetId })
    openAssetEditor(assetId)
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
  <button on:click={clearAsset}>cancel</button>
  <button on:click={onClone}>clone</button>
</div>

<style lang="scss">
</style>
