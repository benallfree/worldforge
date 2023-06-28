<script lang="ts">
  import { EditorTools, TOOL_NAMES, assetEditorState } from './state'

  export let tool: EditorTools
  export let onClick: () => void

  $: ({ currentTool } = $assetEditorState)
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
