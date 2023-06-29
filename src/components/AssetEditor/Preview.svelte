<script lang="ts">
  import TilePreview from './TilePreview.svelte'
  import { type AssetState } from './store'

  export let asset: AssetState
</script>

<TilePreview backgroundColor="white" {asset} />
<TilePreview backgroundColor="black" {asset} />
