<script lang="ts">
  import { gameState } from '../../state'
  import ColorPicker from './ColorPicker.svelte'
  import ToolButton from './ToolButton.svelte'
  import { TOOL_NAMES, mkTool } from './state'

  $: ({ assetEditor } = $gameState)
  $: ({ asset, isColorPickerShowing, selectedColor } = $assetEditor)
  $: ({ setTool, showColorPicker } = assetEditor)
  $: ({} = asset!)
</script>

<div>
  {#each Object.entries(TOOL_NAMES) as [tool]}
    <ToolButton tool={mkTool(tool)} onClick={() => setTool(mkTool(tool))} />
  {/each}
  <button style={`background-color: ${selectedColor}`} on:click={showColorPicker}>🎨</button>
  {#if isColorPickerShowing}
    <ColorPicker />
  {/if}
</div>

<style lang="scss">
</style>
