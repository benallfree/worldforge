<script lang="ts">
  import type { RgbHex } from '../../helpers'
  import { RGB_TRANSPARENT, RGB_WHITE } from './helpers'

  export let selected = false
  export let color: RgbHex
  export let onClick: () => void = () => {}
  console.log({ selected })
</script>

<div
  class="color"
  style={`background-color: ${color}; border: 1px solid ${selected ? RGB_WHITE : color}`}
  on:click={onClick}
>
  <div class="symbol">
    {color === RGB_TRANSPARENT ? '❌' : ''}
  </div>
</div>

<style lang="scss">
  $pixelSize: 25px;

  .color {
    .symbol {
      text-align: center;
      top: -7px;
      position: relative;
    }
    &:hover {
      cursor: pointer;
    }

    margin: 0px;
    width: ($pixelSize);
    height: ($pixelSize);
    display: inline-block;
  }
</style>
