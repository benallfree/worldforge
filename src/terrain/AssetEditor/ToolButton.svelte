<script lang="ts">
  import { gameState } from '../../state'
  import { EditorTools, TOOL_NAMES } from './state'

  $: ({ assetEditor } = $gameState)
  $: ({ asset, currentTool } = $assetEditor)
  $: ({ setTool, showColorPicker } = assetEditor)
  $: ({} = asset!)
  export let tool: EditorTools
  export let onClick: () => void
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
