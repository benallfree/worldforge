<script lang="ts">
  import { onMount, afterUpdate } from 'svelte'
  import { writable } from 'svelte/store'
  import { range, reduce } from '@s-libs/micro-dash'

  let videoSource: string | null = null
  let thumbnails = writable<string[]>([])

  const handleFileChange = (event: Event) => {
    const fileInput = event.target as HTMLInputElement
    const file = fileInput.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        videoSource = e.target?.result as string
        setTimeout(() => {
          const video = document.getElementById('video') as HTMLVideoElement
          video.addEventListener('seeked', () => {})
          video.addEventListener('loadeddata', () => {
            video.play().then(() => {
              console.log('playing')
              const interval = video.duration / Math.floor(window.innerWidth / 50)
              console.log({ interval })
              const times = range(video.duration / interval).map((v, i) => i * interval)
              reduce(
                times,
                (c, t) => {
                  return c.then(
                    () =>
                      new Promise<void>((resolve) => {
                        console.log(`seeking to ${t}`)
                        const _update = () => {
                          console.log(`seeked to ${t}`)
                          const canvas = document.createElement('canvas')
                          console.log({ video })
                          const w = 50
                          const ar = video.offsetWidth / video.offsetHeight
                          const h = w / ar
                          console.log({ w, ar, h })
                          canvas.width = w
                          canvas.height = h
                          const context = canvas.getContext('2d')
                          context?.drawImage(video, 0, 0, canvas.width, canvas.height)
                          const dataUrl = canvas.toDataURL()
                          console.log(`data url`, dataUrl)
                          thumbnails.update((thumbs) => [...thumbs, dataUrl])
                          video.removeEventListener('seeked', _update)
                          resolve()
                        }
                        video.addEventListener('seeked', _update)
                        video.currentTime = t
                      })
                  )
                },
                Promise.resolve()
              ).catch(console.error)
            })
          })
        }, 0)
      }
      reader.readAsDataURL(file)
    }
  }

  onMount(() => {})
</script>

<div id="container">
  {#if !videoSource}
    <input type="file" accept="video/*" on:change={handleFileChange} />
  {:else}
    <video id="video" src={videoSource} controls muted />
    <div class="thumbnails">
      {#each $thumbnails as thumbnail}
        <img class="thumbnail" src={thumbnail} alt="Thumbnail" />
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  #container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  }

  #video {
    max-width: 300px;
    width: 100%;
    height: auto;
  }

  .thumbnails {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-top: 10px;
  }

  .thumbnail {
    width: 50px;
    object-fit: cover;
  }
</style>
