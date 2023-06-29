<script lang="ts">
  import type { RgbHex } from '../../util/helpers'
  import { RGB_WHITE } from './store'

  export let selected = false
  export let color: RgbHex
  export let onClick: () => void = () => {}
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
