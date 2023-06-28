<script lang="ts">
  import ToolButton from './ToolButton.svelte'
  import type { AssetEditorApi } from './state'
  import { TOOL_NAMES, mkTool } from './state'

  export let asset: AssetEditorApi
  const { setTool } = asset
</script>

<div>
  {#each Object.entries(TOOL_NAMES) as [tool]}
    <ToolButton {asset} tool={mkTool(tool)} onClick={() => setTool(mkTool(tool))} />
  {/each}
</div>

<style lang="scss">
</style>
