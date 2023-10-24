<script lang='ts'>
	import { browser, dev } from "$app/environment";
	import Badge from "$lib/components/Badge.svelte";
	import AbilityListView from "$lib/modules/AbilityListView.svelte";
	import EmploymentListView from "$lib/modules/EmploymentListView.svelte";
	import ProjectListView from "$lib/modules/ProjectListView.svelte";
	import Seo from "$lib/modules/SEO.svelte";
	import SkillListView from "$lib/modules/SkillListView.svelte";

	import type { PageData } from "./$types";
	export let data:PageData;

  const Profile:Profile = {
    fullname: '具诚人',
    fullname_en: 'JU Chengren',
    nickname: '甘小蔗',
    nickname_en: 'Sugarcane',
    gender: '男',
    birthdate: '2002-02-14',
    email: 'hi@gxzv.com',
    phone: dev ? '18883000080' : '×Ï<ßM4ÓÍ',
    website: 'https://gxzv.com',
    intros: [
      '一名全栈工程师 & 独立开发者，有六年的从 0 到 1 的互联网项目开发运营经验。',
      '致力于多样化，包容开放行为，拥抱伤害和困顿。'
    ],
  };

  const PI = {
    mode: data.mode,
    shareTip: '分享',
    shareTimer: 0,
  };


  // 分享简历链接
  function share(){
    const text = `这家伙的简历还挺有意思，分享给你：🔗 ${window.location.origin+window.location.pathname}`;
    navigator.clipboard.writeText(text).then(()=>{
			PI.shareTip = '内容已复制至剪贴板';
		}, function(err){
      PI.shareTip = `复制失败 - ${err.toString()}`;
		});

    clearTimeout(PI.shareTimer);
    PI.shareTimer = setTimeout(()=>{PI.shareTip = '复制';}, 1500);
  }
</script>

<Seo title='我的简历' />

{#if PI.mode==='web'}
<ul class="menu menu-horizontal bg-base-100 rounded-lg shadow 
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
{/if}


<div id='resumeStage' class='profile-{PI.mode} grid-pattern min-h-screen pb-12 sm:py-24' class:!py-0={PI.mode==='pdf'}>
  <div class='max-w-[920px] relative mx-auto bg-base-100 shadow-lg' class:max-w-none={PI.mode==='pdf'}>
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
      <h1 class='text-3xl font-bold'>{Profile.fullname_en}</h1>
      <div class='flex flex-wrap items-center gap-y-2 gap-3 mt-1'>
        <Badge type='gender'>
          {new Date().getFullYear() - new Date(Profile.birthdate).getFullYear()} 岁
        </Badge>
        {#if Profile.website}
        <div class='tooltip tooltip-bottom' data-tip='个人网站'>
          <Badge type='website' iconClass='text-green-500' rightClass='bg-green-700'>
            <a href={Profile.website}>{Profile.website.replace(/^https?:\/\//, '')}</a>
          </Badge>
        </div>
        {/if}
        <div class='tooltip tooltip-bottom' data-tip='电子邮箱'>
          <Badge type='mail' iconClass='text-green-500' rightClass='bg-green-700'><a href='mailto:{Profile.email}'>{Profile.email}</a></Badge>
        </div>
        {#if Profile.phone}
        <div class='tooltip tooltip-bottom' data-tip='手机号码'>
          <Badge type='phone' iconClass='text-green-500' rightClass='bg-green-700'><a href={isNaN(Number(Profile.phone)) ? null : `sms:${Profile.phone}`}>+86 {Profile.phone}</a></Badge>
        </div>
        {/if}
      </div>

      <div class='leading-relaxed mt-4 text-sm xs:text-base'>
        {#each Profile.intros as intro}
        <p class='inline sm:block'>{@html intro}</p>
        {/each}
      </div>
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
        <EmploymentListView />
      </div>
    </section>


    <section class='bg-base-200/70 pt-4'>
      <ProjectListView>
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


    <section class='bg-base-200/70 pt-4'>
      <div class='p-profile flex items-center justify-between'>
        <h2 class='text-2xl font-semibold'><svg xmlns="http://www.w3.org/2000/svg" class="icon text-green-400" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
          <path d="M10 16.5l2 -3l2 3m-2 -3v-2l3 -1m-6 0l3 1"></path>
          <circle cx="12" cy="7.5" r=".5" fill="currentColor"></circle>
       </svg>个人能力</h2>
      </div>

      <AbilityListView />
    </section>



    <section class='bg-base-200/70 pt-4'>
      <div class='p-profile flex items-center justify-between'>
        <h2 class='text-2xl font-semibold'><svg xmlns="http://www.w3.org/2000/svg" class="icon text-green-400" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4"></path>
          <path d="M14.5 5.5l4 4"></path>
          <path d="M12 8l-5 -5l-4 4l5 5"></path>
          <path d="M7 8l-1.5 1.5"></path>
          <path d="M16 12l5 5l-4 4l-5 -5"></path>
          <path d="M16 17l-1.5 1.5"></path>
        </svg>个人技能</h2>
      </div>

      <div class='flex flex-col gap-5'>
        <SkillListView />
      </div>

      <div class='py-6'></div>
    </section>

    <section>
      <div class='px-profile py-6 text-sm sm:text-base'>
        <p class='opacity-80'>🌱 World is powered by solitude</p>
        <p class='opacity-80'>🍀 相信内向者的力量</p>
      </div>
    </section>
  </div>
</div>