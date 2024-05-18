<script lang='ts'>
	import Seo from "$lib/modules/SEO.svelte";
  import { fade, fly } from "svelte/transition";

  import IconPhotoUp from "@tabler/icons-svelte/IconPhotoUp.svelte";
  import IconFileUpload from "@tabler/icons-svelte/IconFileUpload.svelte";
  import IconX from "@tabler/icons-svelte/IconX.svelte";

  import domtoimage from 'dom-to-image';
  import { toPng } from 'html-to-image';
	import toast from "svelte-french-toast";
  import { UAParser } from "ua-parser-js";

  import {Button} from "$lib/components/ui/button";
	import { Textarea } from "$lib/components/ui/textarea";
  import { Input } from "$lib/components/ui/input";

  const recorder = {
    imgSrc: '', imgAlt: 'iRecord', imgHandling: false,
    domWidth: 0, domHeight: 0,
    width: 416, height: 512, sizeLock: false,
    w1:0, h1:0,
    bt:0, bl:0, br:0, bb:0
  };
  $: if(recorder.domWidth && !recorder.sizeLock){
    recorder.width = recorder.domWidth;
  }
  $: if(recorder.domHeight && !recorder.sizeLock){
    recorder.height = recorder.domHeight;
  }



  let files:FileList;
  $: if(files){
    for (const file of files) {fileHandler(file);}
  }

  let dragEnter = false, uploadFiles:FileList;
  $: if(uploadFiles){
    for (const file of uploadFiles) {fileHandler(file);}

    let input = document.querySelector('#uploadFiles') as any;
    input.value = '';
  }

  function dropHandler(ev:any) {
    console.log("File(s) dropped");
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          fileHandler(file);
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        fileHandler(file);
      });
    }
  }

  function fileHandler(file:File){
    console.log(`… file.name = ${file.name}`);
    recorder.imgHandling = true;

    if(file.type.startsWith('image')){
      recorder.imgSrc = '';
      
      let fr = new FileReader();
      fr.onload = ()=>{
        const src = fr.result!.toString();
        let image = new Image();
        image.src = src;
        image.onload = ()=>{
          recorder.width = image.width+48*2;
          recorder.height = image.height+48+80;

          recorder.imgSrc = src;
          recorder.imgHandling = false;
        };
      };
      fr.readAsDataURL(file);
    } else {
      toast.error(`暂不支持处理非图像文件`);
    }
  }



  let imageGenerating = false, posterSrc:string = '';
  async function downloadImage(){
    imageGenerating = true;
    posterSrc = '';

    const parser = new UAParser(navigator.userAgent);
		const engine = parser.getEngine();
    // 生成两次，防止图片丢失
    if(engine.name==='WebKit'){
      await convertImage();
      await convertImage();
    }

    posterSrc = await convertImage();
    imageGenerating = false;
  }

  async function convertImage():Promise<string> {
    let elem = document.querySelector('#poster') as HTMLElement;
    
    // const scale = 3;
    // return await domtoimage.toPng(elem, {
    //   width: elem.clientWidth * scale,
    //   height: elem.clientHeight * scale,
    //   style: {
    //     transform: 'scale('+scale+')',
    //     transformOrigin: 'top left'
    //   }
    // });
    return await toPng(elem);
  }
</script>


<Seo title='📷 记录' />


<div class='relative w-full min-h-screen overflow-hidden 
flex flex-col items-center justify-center py-8'
aria-hidden on:dragover={e=>{e.preventDefault();}}
on:dragenter={e=>{dragEnter = true;}}>
  <div id='poster' class='flex flex-col items-center justify-center mb-8 
  relative w-[26rem]'
  class:min-h-[32rem]={!recorder.sizeLock}
  class:bg-white={recorder.imgSrc}
  style='padding-top: {recorder.bt}px;padding-bottom: {recorder.bb}px;
  padding-left: {recorder.bl}px;padding-right: {recorder.br}px;
  max-width: calc(100vw - 24px);'>
    <div class='absolute top-0 left-0 w-full h-[8%] bg-white'
    bind:clientHeight={recorder.bt}></div>
    <div class='absolute top-0 left-0 w-[7.5%] h-full bg-white'
    bind:clientWidth={recorder.bl}></div>
    <div class='absolute top-0 right-0 w-[7.5%] h-full bg-white'
    bind:clientWidth={recorder.br}></div>
    <div class='absolute bottom-0 left-0
    bg-white h-[14%] w-full
    flex items-center justify-center
    text-black/90 font-semibold
    whitespace-pre text-center'
    class:pb-1={recorder.imgAlt.indexOf('\n')<0}
    bind:clientHeight={recorder.bb}>
      {recorder.imgAlt}
    </div>

    {#if recorder.imgSrc}
    <img class='w-full h-full object-cover' 
    src={recorder.imgSrc} alt='图像' />
    {:else}
      {#if recorder.imgHandling}
      <span class="loading loading-dots loading-lg"></span>
      <p class='mt-3 opacity-90'>处理中</p>
      {:else}
      <IconPhotoUp size={52} />
      <p class='mt-3 opacity-90'>点击上传或拖拽图片至此处</p>
      {/if}
    {/if}
    <label class='absolute w-full h-full z-[1]' 
    for='uploadFiles'></label>
    <input bind:files={uploadFiles} id='uploadFiles' type="file" class='hidden' />
  </div>

  {#if recorder.imgSrc}
  <div class='flex px-8 pt-0 pb-4 w-[30rem] max-w-full'>
    <Button class='w-full' size='lg' 
    disabled={imageGenerating}
    on:click={downloadImage}>
      {#if imageGenerating}
      处理中
      {:else}
      下载图片
      {/if}
    </Button>
    <!-- <button class='btn btn-primary w-full' 
    on:click={downloadImage} disabled={imageGenerating}>
      {#if imageGenerating}
      处理中
      {:else}
      下载图片
      {/if}
    </button> -->
  </div>
  {/if}

  <div class='flex flex-col 
  gap-3 w-[30rem] px-8 max-w-full'>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="flex flex-col gap-1 w-full">
      <div class="label">
        <span class="label-text text-muted-foreground">图片描述</span>
      </div>
      <Textarea class='min-h-[3rem] h-[4rem]' 
      bind:value={recorder.imgAlt} maxlength={512} />
    </label>

    <div class='flex gap-4'>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="flex-col gap-1 w-full grow">
        <div class="label">
          <span class="label-text text-muted-foreground">宽</span>
        </div>
        <div class="input input-bordered flex items-center gap-2"
        class:opacity-70={!recorder.sizeLock}>
          <Input type='number' class='grow w-full' 
          bind:value={recorder.width} disabled={!recorder.sizeLock} />
          <span class='opacity-70'>px</span>
        </div>
      </label>

      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="flex-col gap-1 w-full grow">
        <div class="label">
          <span class="label-text text-muted-foreground">长</span>
        </div>
        <div class="input input-bordered flex items-center gap-2"
        class:opacity-70={!recorder.sizeLock}>
          <Input type='number' class='grow w-full' 
          bind:value={recorder.height} disabled={!recorder.sizeLock} />
          <span class='opacity-70'>px</span>
        </div>
      </label>

      <!-- <label class="form-control shrink-0">
        <div class="label pl-0">
          <span class="label-text">锁定</span> 
        </div>
        <input type="checkbox" bind:checked={recorder.sizeLock} class="checkbox size-12" />
      </label> -->
    </div>
  </div>


  {#if dragEnter}
  <div aria-hidden transition:fade 
  class='absolute z-10 top-0 bottom-0 left-0 right-0 
  bg-base-100/80 flex items-center justify-center' 
  on:drop={e=>{
    dragEnter = false;
    dropHandler(e);
  }} on:dragover={e=>{e.preventDefault();}} 
  on:dragleave={e=>{dragEnter = false;}}>
    <div class='flex flex-col items-center text-2xl font-semibold pointer-events-none'>
      <IconFileUpload size={48} class='mb-2' />
      松开上传
    </div>
  </div>
  {/if}
</div>


{#if posterSrc}
<div transition:fly={{y:20, duration:400}} class='fixed top-0 left-0 w-full h-full z-10 
bg-black/90 p-8 text-white'>
  <div class='absolute top-0 right-0'>
    <Button variant='ghost' size='icon'
    class='rounded-none'
    on:click={()=>{
      posterSrc = '';
    }}><IconX /></Button>
  </div>

  <div class='flex flex-col
  text-center text-sm opacity-70 pb-6'>
    <p class='font-medium'>长按图片保存</p>
  </div>
  <div class='flex justify-center'><img src={posterSrc} alt='分享图片'></div>
</div>
{/if}