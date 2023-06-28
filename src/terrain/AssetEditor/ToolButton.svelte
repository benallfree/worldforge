<script lang="ts">
  import type { AssetEditorApi } from './state'
  import { EditorTools, TOOL_NAMES } from './state'

  export let asset: AssetEditorApi
  export let tool: EditorTools
  export let onClick: () => void

  $: ({ currentTool } = $asset)
</script>

<button class={currentTool === tool ? 'selected' : ''} on:click={onClick}>{TOOL_NAMES[tool]}</button
>

<style lang="scss">
  button {
    margin: 5px;
    &.selected {
      background-color: gray;
    }
  }
</style>
