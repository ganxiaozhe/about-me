<script lang='ts'>
	import Button from "$lib/components/ui/button/button.svelte";
	import Loading from "./Loading.svelte";

  export let result:undefined|Playlet.ApiResult;
  export let title = '';
</script>


{#if result && result}
  <div class='flex flex-col gap-4'>
    <h2 class='text-muted-foreground font-semibold'>
      {#if title}
      {title}
      {:else}
      🔍 {result.count} 条相关结果
      {/if}
    </h2>

    {#if result.data.length<1}
    <div class='text-center space-y-2'>
      <div class='text-4xl'>:(</div>
      <div class='text-muted-foreground text-sm'>没有找到相关内容，尝试换个关键词 ？</div>
    </div>
    {/if}
    
    {#each result.data as item}
    <div class='flex items-center gap-4'>
      <div class='grow'>
        <h3 class='text-lg font-semibold line-clamp-2'>{item.name}</h3>
        <p class='text-sm text-muted-foreground'>资源添加于 {item.addtime}</p>
      </div>
      <div class='shrink-0'>
        <Button href={item.url} target='_blank'>网盘</Button>
      </div>
    </div>
    {/each}
  </div>
{/if}
{#if !result}
<Loading />
{/if}