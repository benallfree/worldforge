<script lang="ts">
  import { gameState } from '../../store'
  import ShareModal from './ShareModal.svelte'

  $: ({ id, name } = $gameState)

  let isOpen = false

  const onOpen = () => {
    isOpen = true
  }
</script>

<button class="share" on:click={onOpen}>⤴️<br />share</button>
{#if isOpen}
  <ShareModal
    shareMessage={(url) =>
      `Hey, check out my WorldForge map!\n\nMap name: ${name}\nWorld ID: ${id}\n\n${url}\n\nNote: If the link doesn't work, just copy this whole message into the WorldForge share tool and click Import.`}
    onClose={() => (isOpen = false)}
  />
{/if}

<style lang="scss">
  .share {
    background-color: rgb(245, 114, 20);
    position: fixed;
    bottom: 10px;
    right: 10px;
    height: 40px;
  }
</style>
