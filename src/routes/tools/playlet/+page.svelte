<script lang='ts'>

	import Seo from "$lib/modules/SEO.svelte";

  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Skeleton } from "$lib/components/ui/skeleton";
	import toast from "svelte-french-toast";


  let searchStarted:boolean = false;
  let searchResult:undefined|{
    code:number; count:number; data:Playlet.ApiModel[]
  };
  let searchList:Playlet.ApiModel[]|undefined = [];

  let name:string = '';
  async function sumbit(){
    if(!name.trim()){
      toast.error('请先输入剧名');
      return;
    }
    searchStarted = true;
    searchList = undefined;

    const json = await query(name);
    searchResult = json;
    //searchList = json.data;
  }

  /**
   * 查询每日更新或指定剧
   * @param name
   */
  async function query(name?:string): Promise<any>{
    let url = new URL(window.location.origin+`/api/playlet/`);
    name && url.searchParams.append('name', name);

    const resp = await fetch(url);
    return await resp.json();
  }
</script>


<Seo title='短剧来了' />


<div class='container h-52 
flex items-center justify-center'>
  <div class='text-center w-full max-w-sm'>
    <h1 class='text-2xl font-semibold mb-4'>短剧来了我说</h1>
    <form class="flex w-full items-center space-x-2"
    on:submit={sumbit}>
      <Input type="name" bind:value={name} placeholder="剧名" />
      <Button type="submit">搜索</Button>
    </form>
  </div>
</div>


<div class='container max-w-xl mx-auto pb-12'>
{#if searchResult && searchStarted}
  <div class='flex flex-col gap-4'>
    <h2 class='text-muted-foreground font-semibold'>{searchResult.count} 条相关结果</h2>

    {#if searchResult.data.length<1}
    <div class='text-center space-y-2'>
      <div class='text-4xl'>:(</div>
      <div class='text-muted-foreground text-sm'>没有找到相关内容，尝试换个关键词 ？</div>
    </div>
    {/if}
    
    {#each searchResult.data as item}
    <div>
      <h3 class='text-lg font-semibold'>{item.name}</h3>
      <p class='text-muted-foreground'>资源添加于 {item.addtime}</p>
    </div>
    {/each}
  </div>
{/if}
{#if !searchResult && searchStarted}
  <div class='flex flex-col gap-4'>
    <div class='space-y-2'>
      <Skeleton class='h-5' />
      <Skeleton class='h-5 w-1/3 mt-4' />
    </div>
    <div class='space-y-2'>
      <Skeleton class='h-5' />
      <Skeleton class='h-5 w-1/3 mt-4' />
    </div>
  </div>
{/if}
</div>