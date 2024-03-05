<script lang='ts'>
	import Seo from "$lib/modules/SEO.svelte";

  import {
    IconExternalLink
  } from "@tabler/icons-svelte";
</script>

<Seo title='小蔗的小窝' />



<div class='min-h-[100vh] min-h-[100svh] relative overflow-hidden'>
  <div class='container mx-auto relative z-[1]'>
    <div class='py-32 sm:py-40 prose lg:prose-lg text-shadow text-inherit'>
      <h1 class='text-4xl font-semibold'>你好</h1>
      <p>我的名字叫「 具诚人 」，在互联网上更为熟知的是「 甘小蔗 」。中国人，居住在「 山城 」重庆。我是一个独来独往的人，大部分时间会避免与社会产生联系。对知识「 贪得无厌 」，想知道世界万物如何运作。软件是我表达自己的媒介。</p>

      <div class='not-prose flex'>
        <div role="tablist" class="tabs tabs-boxed max-sm:w-full">
          <a href={null} role="tab" class="tab tab-active">主页</a>
          <a href='/resume' role="tab" class="tab">简历</a>
          <a href='https://gxzv.com/' role="tab" class="tab gap-1">
            博客
            <IconExternalLink stroke={1.5} size={18} />
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class='absolute z-0
  -bottom-20 -right-8 sm:right-0'>
    <img class='w-[80vw] sm:w-[40vw]' src='/images/face_covered.jpg' alt='人像背景'>
  </div>
</div>