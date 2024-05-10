<script lang='ts'>
	import { EmploymentListData } from "$lib/data/EmploymentList";
	import { ProjectListData } from "$lib/data/ProjectList";
	import EmploymentListView from "$lib/modules/EmploymentListView.svelte";
	import ProjectListView from "$lib/modules/ProjectListView.svelte";
	import Seo from "$lib/modules/SEO.svelte";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";
  export let data:PageData;

  const PI = {
    mode: data.mode,
    shareTip: '分享',
    shareTimer: setTimeout(()=>{}),
  };

  let EmploymentList:EmploymentItem[] = EmploymentListData.map(item=>{
    return {...item, contents: undefined};
  });
  let ProjectList:ProjectItem[] = ProjectListData.map(item=>{
    return {...item, contents: undefined};
  });


  // 分享简历链接
  function share(){
    const resumeURL = window.location.origin+'/resume';
    const text = `这家伙的简历还挺有意思，分享给你：🔗 ${resumeURL}\n\n而且竟然有公开相关佐证？真不怕信息泄露？🔗 ${resumeURL}/support`;
    navigator.clipboard.writeText(text).then(()=>{
			PI.shareTip = '内容已复制至剪贴板';
		}, function(err){
      PI.shareTip = `复制失败 - ${err.toString()}`;
		});

    clearTimeout(PI.shareTimer);
    PI.shareTimer = setTimeout(()=>{PI.shareTip = '复制';}, 1500);
  }
</script>

<Seo title='佐证材料 | 我的简历' />

<!-- {#if PI.mode==='web'}
<ul class="menu menu-horizontal flex-nowrap 
bg-card rounded-lg shadow border 
fixed z-10 bottom-4 sm:bottom-[unset] sm:top-6 left-1/2 -translate-x-1/2">
  <li>
    <a href='/' class="tooltip sm:tooltip-bottom" data-tip="主页">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
      </svg>
    </a>
  </li>
  <li>
    <a on:click={()=>{
      PI.mode = 'pdf';
    }} href={null} class="tooltip sm:tooltip-bottom" data-tip="PDF 模式">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
        <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4"></path>
        <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6"></path>
        <path d="M17 18h2"></path>
        <path d="M20 15h-3v6"></path>
        <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z"></path>
      </svg>
    </a>
  </li>
  <li>
    <a href='/resume' class="tooltip sm:tooltip-bottom" data-tip="查看简历">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
        <path d="M9 17h6"></path>
        <path d="M9 13h6"></path>
      </svg>
    </a>
  </li>
  <li>
    <a on:click={share} href={null} class="tooltip sm:tooltip-bottom" data-tip={PI.shareTip}>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
        <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
        <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
        <path d="M8.7 10.7l6.6 -3.4"></path>
        <path d="M8.7 13.3l6.6 3.4"></path>
      </svg>
    </a>
  </li>
</ul>
{/if} -->


<div class='profile-{PI.mode} grid-pattern min-h-screen pb-12 sm:py-24' class:!py-0={PI.mode==='pdf'}>
  <div class='max-w-[920px] relative mx-auto bg-card shadow-lg' class:max-w-none={PI.mode==='pdf'}>
    <div class='absolute top-0 right-0'>
      {#if PI.mode==='pdf'}
      <button on:click={()=>{
        PI.mode = 'web';
      }} class='tooltip tooltip-left inline-flex btn btn-square' data-tip='WEB 模式'>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
          <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4"></path>
          <path d="M2 21v-6"></path>
          <path d="M5 15v6"></path>
          <path d="M2 18h3"></path>
          <path d="M20 15v6h2"></path>
          <path d="M13 21v-6l2 3l2 -3v6"></path>
          <path d="M7.5 15h3"></path>
          <path d="M9 15v6"></path>
        </svg>
      </button>
      {/if}
    </div>

    <section class='p-profile'>
      <h5 class='text-sm'>JU Chengren</h5>
      <h1 class='text-3xl font-bold'>佐证材料</h1>
    </section>

    <section class='bg-base-200/70 leading-relaxed'>
      <div class='p-profile flex items-center justify-between'>
        <h2 class='text-2xl font-semibold'><svg xmlns="http://www.w3.org/2000/svg" class="icon text-green-400" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M3 21h18"></path>
          <path d="M19 21v-4"></path>
          <path d="M19 17a2 2 0 0 0 2 -2v-2a2 2 0 1 0 -4 0v2a2 2 0 0 0 2 2z"></path>
          <path d="M14 21v-14a3 3 0 0 0 -3 -3h-4a3 3 0 0 0 -3 3v14"></path>
          <path d="M9 17v4"></path>
          <path d="M8 13h2"></path>
          <path d="M8 9h2"></path>
       </svg>工作经历</h2>
      </div>

      <div class='flex flex-col gap-5'>
        <EmploymentListView {EmploymentList} />
      </div>
    </section>


    <section class='bg-base-200/70 pt-4'>
      <ProjectListView bind:ProjectList>
        <h2 slot='title' class='text-2xl font-semibold'><svg xmlns="http://www.w3.org/2000/svg" class="icon text-green-400" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M5 21h14"></path>
          <path d="M6 18h2"></path>
          <path d="M7 18v3"></path>
          <path d="M9 11l3 3l6 -6l-3 -3z"></path>
          <path d="M10.5 12.5l-1.5 1.5"></path>
          <path d="M17 3l3 3"></path>
          <path d="M12 21a6 6 0 0 0 3.715 -10.712"></path>
      </svg>个人项目</h2>
      </ProjectListView>
    </section>

    <div class='bg-base-200/70 py-6' class:lg:py-8={PI.mode==='pdf'}></div>
  </div>
</div>