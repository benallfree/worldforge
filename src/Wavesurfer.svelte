<script lang="ts">
  import { onMount } from 'svelte'

  import { WaveSurfer } from 'wavesurfer.js'
  import { RegionsPlugin } from 'wavesurfer.js/dist/plugins/regions.js'
  // Regions plugin

  let ws: WaveSurfer
  let loop = false

  let wsRoot: HTMLDivElement
  let zoomBar: HTMLInputElement

  onMount(() => {
    console.log(`hi`)
    // Create an instance of WaveSurfer
    ws = WaveSurfer.create({
      container: wsRoot,
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgb(100, 0, 100)',
      url: 'https://wavesurfer-js.org/wavesurfer-code/examples/audio/audio.wav'
    })

    // Initialize the Regions plugin
    const wsRegions = ws.registerPlugin(RegionsPlugin.create())

    // Give regions a random color when they are created
    const random = (min, max) => Math.random() * (max - min) + min
    const randomColor = () => `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`

    // Create some regions at specific time ranges
    ws.on('decode', () => {
      // Regions
      wsRegions.addRegion({
        start: 4,
        end: 7,
        content: 'First region',
        color: randomColor()
      })
      wsRegions.addRegion({
        start: 9,
        end: 10,
        content: 'Middle region',
        color: randomColor()
      })
      wsRegions.addRegion({
        start: 12,
        end: 17,
        content: 'Last region',
        color: randomColor()
      })

      // Markers (zero-length regions)
      wsRegions.addRegion({
        start: 19,
        content: 'Marker',
        color: randomColor()
      })
      wsRegions.addRegion({
        start: 20,
        content: 'Second marker',
        color: randomColor()
      })
    })

    wsRegions.enableDragSelection({
      color: 'rgba(255, 0, 0, 0.1)'
    })

    wsRegions.on('region-updated', (region) => {
      console.log('Updated region', region)
    })

    // Loop a region on click
    let loop = true
    let activeRegion = null

    wsRegions.on('region-clicked', (region, e) => {
      e.stopPropagation() // prevent triggering a click on the waveform
      activeRegion = region
      region.play()
      region.setOptions({ color: randomColor() })
    })

    // Track the time
    ws.on('timeupdate', (currentTime) => {
      // When the end of the region is reached
      if (activeRegion && ws.isPlaying() && currentTime >= activeRegion.end) {
        if (loop) {
          // If looping, jump to the start of the region
          ws.setTime(activeRegion.start)
        } else {
          // Otherwise, exit the region
          activeRegion = null
        }
      }
    })

    ws.on('interaction', () => (activeRegion = null))

    ws.once('decode', () => {
      zoomBar.oninput = (e) => {
        const minPxPerSec = Number(zoomBar.value)
        ws.zoom(minPxPerSec)
        console.log(minPxPerSec)
      }
    })
  })

  $: console.log(zoomBar?.value)
</script>

<div>
  <label>
    <input type="checkbox" bind:checked={loop} />
    Loop regions on click
  </label>

  <label>
    Zoom: <input type="range" min="10" max="1000" value="10" bind:this={zoomBar} />
  </label>
</div>
<div class="surfContainer">
  <div bind:this={wsRoot} />
</div>

<style lang="scss">
  .surfContainer {
    text-align: left;
    width: 100%;
    height: 50px;
  }
</style>
