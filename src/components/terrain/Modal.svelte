<script lang="ts">
  export let title = `Attention`
  export let onClose = () => {}
</script>

<div class="sharemodal">
  <h1>{title}</h1>
  <div class="close" on:click={onClose}>❌</div>
  <slot />
</div>

<style lang="scss">
  .sharemodal {
    width: 400px;
    padding: 20px;
    background-color: black;
    border: 1px solid gray;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .close {
      position: absolute;
      cursor: pointer; //foo
      top: 5px;
      right: 5px;
    }
  }
</style>
