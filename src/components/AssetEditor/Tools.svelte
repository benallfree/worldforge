<script lang="ts">
  import type { RgbHex } from '../../util/helpers'
  import { gameState } from '../../store'
  import ToolButton from './ToolButton.svelte'
  import { TOOL_NAMES, mkTool } from './store'

  $: ({ saveAsset, openAssetEditor, createAsset } = gameState)
  $: ({ assetEditor } = $gameState)
  $: ({ asset, isColorPickerShowing, selectedColor } = $assetEditor)
  $: ({ setTool, setSelectedColor, clearAsset } = assetEditor)
  $: ({} = asset!)

  const onSave = () => {
    saveAsset(asset!)
    clearAsset()
  }
  const onClone = () => {
    createAsset()
      .then((assetId) => {
        saveAsset({ ...asset!, name: `Clone of ${asset!.name}`, id: assetId })
        openAssetEditor(assetId).catch(console.error)
      })
      .catch(console.error)
  }

  let colorPicker: HTMLInputElement
  const onColorChange = (e) => {
    setSelectedColor(colorPicker.value as RgbHex)
  }
</script>

<div>
  {#each Object.entries(TOOL_NAMES) as [tool]}
    <ToolButton tool={mkTool(tool)} onClick={() => setTool(mkTool(tool))} />
  {/each}
  <input type="color" value={selectedColor} bind:this={colorPicker} on:change={onColorChange} />
  <button on:click={onSave}>save</button>
  <button on:click={clearAsset}>cancel</button>
  <button on:click={onClone}>clone</button>
</div>

<style lang="scss">
</style>
