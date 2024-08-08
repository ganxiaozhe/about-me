<script lang='ts'>
	import { browser } from "$app/environment";
	import Seo from "$lib/modules/SEO.svelte";
	import { onMount } from "svelte";

  onMount(()=>{
    if(browser){
      window.location.href = 'https://about.gxzv.com/resume';
    }
  });
</script>

<Seo title='页面跳转中' />



<div class="container relative mx-auto min-h-screen flex
flex-col items-center justify-center py-24 text-center dark:text-white">
	<h5 class="text-app font-light tracking-widest max-sm:text-xs md:text-lg">Please wait, the page is rebounding...</h5>
	<h1 class="mb-8 mt-2 text-3xl font-medium
  !leading-normal sm:text-4xl md:text-5xl lg:text-6xl">
		请稍后，页面跳转中
	</h1>
	<!-- <img class="h-16 w-16" src="/images/noto/emoji_u1f331.png" alt="puzzle" />
	<p class="text-shadow -mt-5 text-sm !leading-relaxed md:text-xl">
		为了优化体验，我们正在迁移前后端服务，<br/>网站暂时无法访问，预计将在下午 3:30 恢复。
	</p> -->
</div>