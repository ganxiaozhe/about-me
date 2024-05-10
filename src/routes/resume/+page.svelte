<script lang='ts'>
	import { browser, dev } from "$app/environment";
	import Badge from "$lib/components/Badge.svelte";
	import { EmploymentListData } from "$lib/data/EmploymentList";
	import { ProjectListData } from "$lib/data/ProjectList";
	import AbilityListView from "$lib/modules/AbilityListView.svelte";
	import EmploymentListView from "$lib/modules/EmploymentListView.svelte";
	import ProjectListView from "$lib/modules/ProjectListView.svelte";
	import Seo from "$lib/modules/SEO.svelte";
	import SkillListView from "$lib/modules/SkillListView.svelte";

  import IconFileTypePdf from '@tabler/icons-svelte/IconFileTypePdf.svelte';
  import IconHome from '@tabler/icons-svelte/IconHome.svelte';
  import IconReceipt from '@tabler/icons-svelte/IconReceipt.svelte';
  import IconShare from '@tabler/icons-svelte/IconShare.svelte';
  import IconFileTypeHtml from '@tabler/icons-svelte/IconFileTypeHtml.svelte';
  import IconBuildingEstate from '@tabler/icons-svelte/IconBuildingEstate.svelte';
  import IconStereoGlasses from '@tabler/icons-svelte/IconStereoGlasses.svelte';
  import IconMicroscope from '@tabler/icons-svelte/IconMicroscope.svelte';
  import IconAccessible from '@tabler/icons-svelte/IconAccessible.svelte';
  import IconTools from '@tabler/icons-svelte/IconTools.svelte';

	import type { PageData } from "./$types";
	import Marquee from "$lib/components/Marquee.svelte";
	import type { ComponentType } from "svelte";
	import {Button} from "$lib/components/ui/button";
	import toast from "svelte-french-toast";
	export let data:PageData;

  const PI = {
    mode: data.mode,
    shareTip: '分享',
    shareTimer: setTimeout(()=>{}),
    employmentShow: false
  };

  const Profile:Profile = {
    fullname: '具诚人',
    fullname_en: 'JU Chengren',
    nickname: '甘小蔗',
    nickname_en: 'Sugarcane',
    gender: '男',
    birthdate: '2002-02-14',
    email: 'hi@gxzv.com',
    phone: data.phone || (dev ? '188****0080' : ''),
    website: 'https://gxzv.com',
    intros: [
      '一名全栈工程师 & 独立开发者，有六年的从 0 到 1 的互联网项目开发及运营经验。',
      '有简化复杂事物的天赋，致力于多样化，包容开放行为，拥抱伤害和困顿。'
    ],
  };

  const Menus:{
    icon: ComponentType;
    title: string;
    tip: string;

    href?: string;
    action?: string;
    smHidden?: boolean;
  }[] = [
    {icon: IconHome, title:'主页', tip:'主页', href:'/', smHidden:true},
    {icon: IconFileTypePdf, title:'PDF', tip:'PDF 模式', action:'pdf'},
    {icon: IconReceipt, title:'佐证', tip:'查看佐证', href:'/resume/support'},
    {icon: IconShare, title:'分享', tip:'分享', action:'share'},
  ];

  const Navs:{
    icon: ComponentType;
    title: string;
    id: string
  }[] = [
    {id: 'employments', icon: IconBuildingEstate, title: '工作经历'},
    {id: 'projects', icon: IconMicroscope, title: '个人项目'},
    {id: 'accessibles', icon: IconAccessible, title: '个人能力'},
    {id: 'tools', icon: IconTools, title: '个人技能'},
  ];


  let EmploymentList:EmploymentItem[] = EmploymentListData.map(item=>{
    return {...item, supports: undefined};
  });
  let ProjectList:ProjectItem[] = [...ProjectListData.map(item=>{
    return {...item, supports: undefined};
  }), {
    id: 'more',
    dom_class: 'opacity-80',
    title: '更多项目请私信咨询',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-puzzle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
 <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
 <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1"></path>
</svg>`,
    keywords: ['🤐'],
    finished_at: '2023-10',
    contents: [
      {key: '说明', value:'有较多项目因待完善或保密需要未做公布，劳烦私信咨询。'}
    ]
  }];


  // 分享简历链接
  function share(){
    const text = `这家伙的简历还挺有意思，分享给你：🔗 ${window.location.origin+window.location.pathname}`;
    navigator.clipboard.writeText(text).then(()=>{
			PI.shareTip = '内容已复制至剪贴板';
      toast(PI.shareTip);
		}, function(err){
      PI.shareTip = `复制失败 - ${err.toString()}`;
      toast.error(PI.shareTip);
		});

    clearTimeout(PI.shareTimer);
    PI.shareTimer = setTimeout(()=>{PI.shareTip = '分享';}, 1500);
  }
</script>

<Seo title='我的简历' />

{#if PI.mode==='web'}
<div class='max-w-[920px] w-full py-0 sm:px-profile
flex justify-between bg-card h-12 
fixed z-20 bottom-0 sm:bottom-[unset] sm:top-6 
left-1/2 -translate-x-1/2'>
  <div class="flex items-center shrink-0 max-sm:pt-1
  shadow border gap-4 px-4">
    {#each Menus as item}
    <a href={item.href||null} on:click={()=>{
      if(item.action==='pdf'){PI.mode = 'pdf';}
      if(item.action==='share'){share();}
    }} class="tooltip sm:tooltip-bottom cursor-pointer 
    flex items-center max-sm:flex-col gap-1
    hover:opacity-85" 
    data-tip={item.action==='share' ? PI.shareTip : item.tip}
    class:max-sm:hidden={item.smHidden}>
      <svelte:component this={item.icon} class='w-5 h-5' />
      <span class='text-sm max-sm:text-xs'>{item.title}</span>
    </a>
    {/each}
  </div>

  <Marquee class="bg-base-100 dark:bg-base-100 
  flex items-center flex-grow max-sm:pt-1 
  shadow border border-l-0" 
  repeat={2} duration={20} gap='0px'>
    {#each Navs as item}
    <a href='#{item.id}' class="btn btn-ghost font-normal
    flex max-sm:flex-col items-center 
    gap-1 mx-2 hover:opacity-85">
      <svelte:component this={item.icon} class='w-5 h-5' />
      <span class='text-sm max-sm:text-xs'>{item.title}</span>
    </a>
    {/each}
  </Marquee>
</div>
{/if}


<div class='profile-{PI.mode} grid-pattern min-h-screen pb-12 sm:py-24' class:!py-0={PI.mode==='pdf'}>
  <div class='max-w-[920px] relative mx-auto 
  bg-card shadow-lg' class:max-w-none={PI.mode==='pdf'}>
    <div class='absolute top-0 right-0'>
      {#if PI.mode==='pdf'}
      <button on:click={()=>{
        PI.mode = 'web';
      }} class='tooltip tooltip-left inline-flex btn btn-square' data-tip='WEB 模式'>
        <IconFileTypeHtml />
      </button>
      {/if}
    </div>
    <section class='p-profile'>
      <h1 class='text-3xl font-bold'>{Profile.fullname_en}</h1>
      <div class='flex flex-wrap items-center gap-y-2 gap-3 mt-1'>
        <Badge type='gender'>
          {Math.floor((Date.now() - new Date(Profile.birthdate).getTime())/(1000*60*60*24*365))} 岁
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

      <div class='leading-relaxed mt-4 text-sm xs:text-base
      flex flex-col gap-0.5'>
        {#each Profile.intros as intro}
        <p class='inline sm:block'>{@html intro}</p>
        {/each}
      </div>
    </section>

    <section id='employments' class='bg-card-foreground/5 leading-relaxed'>
      <div class='p-profile flex items-center justify-between'>
        <h2 class='text-2xl font-semibold'>
          <IconBuildingEstate class='text-green-400' />
          工作经历
        </h2>
      </div>

      <div class='flex flex-col gap-5'>
        {#if PI.mode!=='pdf' && !PI.employmentShow}
        <div class='p-profile !py-0'>
          <Button class='w-full gap-2' variant='outline' size='lg'
          on:click={()=>{
            PI.employmentShow = !PI.employmentShow;
          }}>
            <IconStereoGlasses />
            查看
          </Button>
        </div>
        {:else}
        <EmploymentListView {EmploymentList} />
        {/if}
      </div>
    </section>


    <section id='projects' class='bg-card-foreground/5 pt-4'>
      <ProjectListView bind:ProjectList>
        <h2 slot='title' class='text-2xl font-semibold'>
          <IconMicroscope class='text-green-400' />
          个人项目
        </h2>
      </ProjectListView>
    </section>


    <section id='accessibles' class='bg-card-foreground/5 pt-4'>
      <div class='p-profile flex items-center justify-between'>
        <h2 class='text-2xl font-semibold'>
          <IconAccessible class='text-green-400' />
          个人能力
        </h2>
      </div>

      <AbilityListView />
    </section>



    <section id='tools' class='bg-card-foreground/5 pt-4'>
      <div class='p-profile flex items-center justify-between'>
        <h2 class='text-2xl font-semibold'>
          <IconTools class='text-green-400' />
          个人技能
        </h2>
      </div>

      <div class='flex flex-col gap-5'>
        <SkillListView />
      </div>

    </section>

    <div class='bg-card-foreground/5 py-6' class:lg:py-8={PI.mode==='pdf'}></div>

    <section>
      <div class='px-profile py-6 text-sm sm:text-base' class:lg:py-8={PI.mode==='pdf'}>
        <p class='opacity-80'>🌱 World is powered by solitude</p>
        <p class='opacity-80'>🍀 相信内向者的力量</p>
      </div>
    </section>
  </div>
</div>