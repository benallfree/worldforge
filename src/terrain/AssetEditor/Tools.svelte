<script lang="ts">
  import ToolButton from './ToolButton.svelte'
  import { EditorTools, TOOL_NAMES, assetEditorState, mkTool } from './state'

  const { setTool } = assetEditorState
</script>

<div>
  {#each Object.entries(TOOL_NAMES) as [tool]}
    <ToolButton tool={mkTool(tool)} onClick={() => setTool(mkTool(tool))} />
  {/each}
</div>

<style lang="scss">
</style>
