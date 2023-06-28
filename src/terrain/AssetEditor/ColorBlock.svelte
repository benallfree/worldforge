<script lang="ts">
  import type { NonEmptyTuple } from 'type-fest/source/internal'
  import { RGB_WHITE } from './helpers'
  import { assetEditorState, type RgbValue } from './state'

  export let color: RgbValue
  export let onClick: () => void = () => {}
  let selected: boolean
  $: selected = $assetEditorState.selectedColor === color
  console.log({ selected })
</script>

<div
  class="color"
  style={`background-color: ${color}; border: 1px solid ${selected ? RGB_WHITE : color}`}
  on:click={onClick}
/>

<style lang="scss">
  $pixelSize: 25px;

  .color {
    &:hover {
      cursor: pointer;
    }

    margin: 0px;
    width: ($pixelSize);
    height: ($pixelSize);
    display: inline-block;
  }
</style>
