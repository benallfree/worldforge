<script lang="ts">
  import { onMount, afterUpdate, onDestroy } from 'svelte';

  let videoSource: string | null = null;
  let videoElement: HTMLVideoElement | null = null;
  let canvasElement: HTMLCanvasElement | null = null;
  let canvasContext: CanvasRenderingContext2D | null = null;

  function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files[0];

    // Check if the selected file is a video
    if (file && file.type.startsWith('video/')) {
      videoSource = URL.createObjectURL(file);
    }
  }

  onMount(() => {
    videoElement = document.getElementById('video') as HTMLVideoElement;
    canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    canvasContext = canvasElement.getContext('2d');

    window.addEventListener('resize', handleResize);
  });

  afterUpdate(() => {
    if (videoElement && canvasContext) {
      canvasContext.drawImage(
        videoElement,
        0,
        0,
        canvasElement!.width,
        canvasElement!.height
      );
    }
  });

  onDestroy(() => {
    if (videoSource) {
      URL.revokeObjectURL(videoSource);
    }

    window.removeEventListener('resize', handleResize);
  });

  function handleResize() {
    if (canvasElement) {
      canvasElement.width = Math.min(window.innerWidth, 300);
    }
  }
</script>

<style lang="sass">
  .video-container {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 300px;
    width: 100%;
    margin: 0 auto;

    video {
      max-width: 100%;
    }
  }

  #canvas {
    display: block;
    max-width: 300px;
    width: 100%;
    margin: 16px auto;
  }
</style>

<div>
  <input type="file" on:change={handleFileSelect} accept="video/*">
  {#if videoSource}
    <div class="video-container">
      <video id="video" controls src={videoSource}></video>
    </div>
    <canvas id="canvas"></canvas>
  {/if}
</div>
