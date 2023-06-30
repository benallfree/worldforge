<script lang="ts">
  import type { TerrainCell } from '../../util/helpers'
  import AssetEditor from '../AssetEditor/AssetEditor.svelte'

  export let cell: TerrainCell
  const { x: r, y: c, height, type } = cell || {}

  let modalOpen = false
  const onClick = () => {
    modalOpen = true
  }
</script>

{#if modalOpen}
  <AssetEditor />
{/if}
<div class="cell" on:click={onClick}>
  <div>{r},{c}</div>
  <div class={type}>{type}</div>
  <div>{height}</div>
</div>

<style lang="scss">
  .cell {
    width: 50px;
    height: 50px;
    border: 1px solid red;
    float: left;
    font-size: 10px;
    cursor: pointer;
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
