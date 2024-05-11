<script lang='ts'>
	import Seo from "$lib/modules/SEO.svelte";

  import * as Tabs from "$lib/components/ui/tabs/index.js";

  import IconExternalLink from "@tabler/icons-svelte/IconExternalLink.svelte";
	import { goto } from "$app/navigation";
</script>

<Seo title='小蔗的小窝' />



<div class='min-h-[100vh] min-h-[100svh] 
relative overflow-hidden dark:bg-black'>
  <div class='container mx-auto relative z-[1]'>
    <article class='py-32 sm:py-40 prose lg:prose-lg text-shadow text-inherit'>
      <h1 class='text-4xl font-semibold dark:text-white'>你好</h1>
      <p>我的名字叫「 具诚人 」，在互联网上更为熟知的是「 甘小蔗 」。中国人，居住在「 山城 」重庆。我是一个独来独往的人，大部分时间会避免与社会产生联系。对知识「 贪得无厌 」，想知道世界万物如何运作。软件是我表达自己的媒介。</p>

      <div class='not-prose flex mt-8'>
        <Tabs.Root value="home" 
        class='min-w-[360px] max-sm:w-full'>
          <Tabs.List class="grid w-full grid-cols-4">
            <Tabs.Trigger value="home">主页</Tabs.Trigger>
            <Tabs.Trigger value="resume" on:click={()=>{
              goto('/resume');
            }}>简历</Tabs.Trigger>
            <Tabs.Trigger value="tools" on:click={()=>{
              goto('/tools');
            }}>工具</Tabs.Trigger>
            <Tabs.Trigger value="blog" on:click={()=>{
              window.location.href = 'https://gxzv.com/'
            }} class='flex gap-1'>
              博客
              <IconExternalLink stroke={1.5} size={18} />
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      </div>
    </article>
  </div>

  <div class='absolute z-0
  -bottom-20 -right-8 sm:right-0'>
    <img class='w-[80vw] sm:w-[40vw]' src='/images/face_covered.jpg' alt='人像背景'>
  </div>
</div>