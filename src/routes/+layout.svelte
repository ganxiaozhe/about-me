<script lang='ts'>
  import { browser, dev } from '$app/environment';
	import Analytics from '$lib/modules/Analytics.svelte';
	import { onDestroy, onMount } from 'svelte';
  import { ModeWatcher, setMode } from "mode-watcher";
  setMode('dark');
  import '../app.css';

  import { Toaster } from 'svelte-french-toast';
  import PhotoSwipe from 'photoswipe';
  import 'photoswipe/style.css';

  onMount(()=>{
    if(!browser){return;}
    document.addEventListener('click', handleClick, true);
  });
  onDestroy(()=>{
    if(!browser){return;}
    document.removeEventListener('click', handleClick, true);
  });

  function handleClick(event:any){
    const $tg = event.target;
    const lightbox = $tg.getAttribute('data-lightbox');

    if(lightbox==='true' && $tg.nodeName.toLowerCase() === 'img'){
      const src = $tg.getAttribute('src'),
      width = Number($tg.getAttribute('data-width'))||1200,
      height = Number($tg.getAttribute('data-height'))||1800,
      alt = $tg.getAttribute('alt')||'image';

      const pswp = new PhotoSwipe({
        dataSource: [
          {src, width, height, alt}
        ],
      });
      pswp.init();
    }
  }
</script>

{#if !dev}
<Analytics />
{/if}

<Toaster />
<ModeWatcher />
<slot />