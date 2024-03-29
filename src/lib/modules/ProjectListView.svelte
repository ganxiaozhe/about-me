<script lang='ts'>
	import { fly } from "svelte/transition";
	import Badge from "$lib/components/Badge.svelte";
	import Marquee from "$lib/components/Marquee.svelte";
  export let ProjectList:ProjectItem[];

  let Keywords:string[] = [];
  $: ProjectList && listChanged();
  function listChanged(){
    const kwList:string[] = [];
    ProjectList.map(proj=>{
      proj.keywords.map(key=>{
        kwList.includes(key) || kwList.push(key);
      });

      if(proj.url){
        const url = new URL(proj.url);
        proj.url_host = url.hostname;
      }
    });
    Keywords = kwList;
  }


  const PI:{
    filters: string[],
    filterOpened: boolean,
    filterSearch: string,
  } = {
    filters: [],
    filterOpened: false,
    filterSearch: ''
  };
</script>



{#if PI.filterOpened}
<div transition:fly={{y:20}} class="fixed inset-0 
bg-black bg-opacity-80 transition-opacity
flex items-center justify-center z-20">
  <div class="bg-base-100 rounded-box shadow overflow-hidden">
    <div class="bg-base-200 flex items-center h-16 px-6">
      <h2 class="text-lg font-semibold">项目筛选</h2>
    </div>
    <div class="w-[520px] max-h-[430px] overflow-auto container bg-base-100">
      <div class='flex flex-wrap gap-2 select-none'>
        <input type='text' placeholder='搜索关键词' bind:value={PI.filterSearch}
        class='input input-sm mb-2 input-bordered w-full' />
        {#each Keywords.filter(key => key.toLowerCase().indexOf(PI.filterSearch.toLowerCase())>-1) as key}
        <a href={null} class="badge cursor-pointer" 
        class:badge-outline={!PI.filters.includes(key)}
        class:badge-success={PI.filters.includes(key)}
        on:click={()=>{
          if(PI.filters.includes(key)){
            PI.filters = PI.filters.filter(k=>k!==key);
          } else {
            PI.filters = [...PI.filters, key];
          }
        }}>{key.trim()}</a>
        {/each}
      </div>
    </div>
    <div class="flex items-center justify-end gap-4 h-16 px-6 bg-base-200">
      <button class="btn btn-primary btn-sm h-10 px-8" on:click={()=>{
        PI.filterOpened = false;
      }}>
				确认
			</button>
    </div>
  </div>
</div>
{/if}


<div class='p-profile flex items-center justify-between'>
  <slot name='title' />
  <div class='flex'>
    <div class='tooltip tooltip-left' data-tip='筛选'>
      <button class='btn btn-square' on:click={()=>{
        PI.filterOpened = true;
      }}>
        {#if PI.filters.length<1}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z"></path>
        </svg>
        {:else}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M11.18 20.274l-2.18 .726v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v3"></path>
          <path d="M15 19l2 2l4 -4"></path>
        </svg>
        {/if}
      </button>
    </div>
  </div>
</div>

<div class='flex flex-col gap-5'>
{#each ProjectList.filter(proj => PI.filters.length>0 ? PI.filters.some(k=>proj.keywords.includes(k)) : true ) as item(item.title)}
<section class='item group pb-3 {item.dom_class||''}'>
  {#if item.owned_by}
  <div class="bg-green-600/10 px-profile py-2 mb-3
  flex gap-4 text-sm sm:text-base">
    <div class='w-12 shrink-0 flex justify-center'>
      <svg xmlns="http://www.w3.org/2000/svg" class="relative w-6 h-6 
      group-hover:animate-bounce group-hover:top-1" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M17 13v-6l-5 4l-5 -4v6l5 4z"></path>
      </svg>
    </div>
    <span>该项目系于 <b>{item.owned_by.company}</b> 担任 <b>{item.owned_by.role}</b> 时的独立开发成果</span>
  </div>
  {/if}
  <div class='px-profile flex items-start gap-4'>
    <div class="avatar placeholder rounded-sm overflow-hidden shrink-0" class:online={!item.finished_at}>
      <div class="bg-neutral text-neutral-content w-12 h-12">
        {#if item.icon}
          {#if item.icon.startsWith('<')}
          {@html item.icon}
          {:else}
          <img src={item.icon} alt='项目图标' />
          {/if}
        {:else}
        <span class="text-xl">{item.title[0]}</span>
        {/if}
      </div>
    </div>
    <div class='flex flex-col justify-center'>
      <h3 class='font-semibold leading-none mt-1'>{item.title}</h3>
      <div class='flex flex-wrap mt-2 gap-2'>
        <Badge icon='关键词' size='sm' rightClass='bg-green-700'>
          {item.keywords.join(', ')}
        </Badge>
        {#if item.url}
        <a href={item.url} target='_blank' class='flex'>
          <Badge type='link' size='sm' rightClass='bg-green-700'>
            {item.url_host}
          </Badge>
        </a>
        {/if}
        {#if item.created_at}
        <Badge icon='起' size='sm'>{item.created_at}</Badge>
        {/if}
        {#if item.finished_at}
        <Badge icon='止' size='sm'>{item.finished_at}</Badge>
        {/if}
        {#if item.updated_at}
        <Badge icon='最近' size='sm'>{item.updated_at}</Badge>
        {/if}
      </div>
    </div>
  </div>
  {#if item.contents}
  <ol class='px-profile pt-3 leading-relaxed text-sm xs:text-base'>
    {#each item.contents as content(content.key)}
    <li class='flex'>
      <div class='font-semibold w-16 shrink-0'>{content.key}：</div>
      <div>{@html content.value}</div>
    </li>
    {/each}
  </ol>
  {/if}
  {#if item.supports}
  <ul class='px-profile mt-6 hidden sm:grid grid-cols-3 gap-2 items-stretch'>
    {#each item.supports as sup, i}
    <img src={sup.value.startsWith('/') ? sup.value : `/projects/${item.id}/${sup.value}`} alt='佐证材料 #{i}' 
    class='object-cover' 
    data-lightbox={true} data-width={sup.imageSize?.width} data-height={sup.imageSize?.height} />
    {/each}
  </ul>
  <Marquee class='sm:!hidden mt-6' 
  repeat={item.supports.length>1 ? 1 : 2} 
  duration={item.supports.length>2 ? 3*item.supports.length : 9}>
    {#each item.supports as sup, i}
    <img src={sup.value.startsWith('/') ? sup.value : `/projects/${item.id}/${sup.value}`} alt='佐证材料 #{i}' 
    style='width:60vw' 
    data-lightbox={true} data-width={sup.imageSize?.width} data-height={sup.imageSize?.height} />
    {/each}
  </Marquee>
  {/if}
</section>
{/each}
</div>