<script lang="ts">
  import type { TerrainCell } from './'

  export let cell: TerrainCell | undefined
  const { x: r, y: c, height, type } = cell || {}
  // console.log({ cell })
</script>

{#if cell}
  <div class="cell" style={`background-color: ${cell.topographicalHeat()}`}>
    <div>{r},{c}</div>
    <div class={type}>{type}</div>
    <div>{height}</div>
  </div>
{/if}

<style lang="scss">
  .cell {
    width: 50px;
    height: 50px;
    border: 1px solid red;
    display: inline-block;
    font-size: 10px;
    .R {
      width: 15px;
      height: 15px;
      background-color: gray;
    }
    .L {
      width: 15px;
      height: 15px;
    }
  }
</style>
