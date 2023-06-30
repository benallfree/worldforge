<script lang="ts">
  import { onMount } from 'svelte'
  import { gameState, shareStore } from '../../store'
  import { pack, unpack } from './pack'
  import Modal from './Modal.svelte'

  export let onClose = () => {}
  export let shareMessage = (url: string) => url
  let shareTextArea: HTMLTextAreaElement
  let packedUrl = ''
  $: payload = $shareStore

  const onClipboardCopy = () => {
    shareTextArea.select()

    // Copy the selected text to the clipboard
    document.execCommand('copy')

    // Display a success message
    alert(`DLC copied to clipboard! Share on messaging apps!`)
  }
  onMount(() => {
    pack(payload)
      .then((packed) => {
        packedUrl = `https://worldforgegame.web.app?pm=${packed}`
      })
      .catch(console.error)
  })

  const onImport = () => {
    unpack(shareTextArea.value)
      .then((payload) => {
        console.log({ payload })
      })
      .catch(console.error)
  }
</script>

<Modal title={`WorldForge Share Tool`} {onClose}>
  <textarea bind:this={shareTextArea}>{shareMessage(packedUrl)}</textarea>
  <div>
    <button on:click={onClipboardCopy}>📋</button>
    <div>
      <div class="danger">
        DANGER - import will wipe out your current world. Save the above message first.
      </div>
      <button class="danger" on:click={onImport}>import</button>
    </div>
  </div>
</Modal>

<style lang="scss">
  textarea {
    width: 100%;
    height: 300px;
  }
  .danger {
    margin: 20px;
    padding: 10px;
    background-color: red;
  }
</style>
