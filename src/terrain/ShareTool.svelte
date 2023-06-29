<script lang="ts">
  import { onMount } from 'svelte'
  import { gameState, shareStore } from '../state'
  import { compress, decompress } from './compress'

  const WF_PACK_HEADER = `WFDLC*`

  $: ({ id, name } = $gameState)

  let isOpen = false
  let shareTextArea: HTMLTextAreaElement
  let shareMessage = ''
  $: payload = $shareStore

  const onClipboardCopy = () => {
    shareTextArea.select()

    // Copy the selected text to the clipboard
    document.execCommand('copy')

    // Display a success message
    alert(`DLC copied to clipboard! Share on messaging apps!`)
  }
  onMount(() => {
    compress(payload)
      .then((packed) => {
        // Set the input value to the text to be copied
        shareMessage = `Hey, check out my WorldForge map!\n\nMap name: ${name}\nMap ID: ${id}\n\nhttps://worldforge.pockethost.io?pm=${WF_PACK_HEADER}${packed}\n\nNote: If the link doesn't work, just copy this whole message into the WorldForge share tool and click Import.`
      })
      .catch(console.error)
  })
  const onOpen = () => {
    isOpen = true
  }

  const onImport = () => {
    const [, blob] = shareTextArea.value.match(/WFDLC\*([a-zA-Z0-9%]+)/) || []
    decompress(blob)
      .then((payload) => {
        console.log({ payload })
      })
      .catch(console.error)
    console.log({ blob })
  }
</script>

<button on:click={onOpen}>⤴️</button>
{#if isOpen}
  <div>
    <h1>WorldForge Share Tool</h1>
    <textarea bind:this={shareTextArea}>{shareMessage}</textarea>
    <div>
      <button on:click={onClipboardCopy}>copy</button>
      <button on:click={() => (isOpen = false)}>close</button>
      <div>
        <div class="danger">
          DANGER - import will wipe out your current game. Save the above message first.
        </div>
        <button class="danger" on:click={onImport}>import</button>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  textarea {
    width: 300px;
    height: 300px;
  }
  .danger {
    margin: 20px;
    padding: 10px;
    background-color: red;
  }
</style>
