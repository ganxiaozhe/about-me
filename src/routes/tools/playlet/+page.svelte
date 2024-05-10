<script lang='ts'>

	import Seo from "$lib/modules/SEO.svelte";

  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
	import toast from "svelte-french-toast";
	import { onMount } from "svelte";
	import Loading from "./(components)/Loading.svelte";
	import ListView from "./(components)/ListView.svelte";


  let searchStarted:boolean = false;
  let searchResult:undefined|Playlet.ApiResult;
  let dailyResult:undefined|Playlet.ApiResult;

  onMount(async()=>{
    dailyResult = await query();
  });


  let name:string = '';
  async function sumbit(e:SubmitEvent){
    e.preventDefault();

    if(!name.trim()){
      toast.error('请先输入剧名');
      return;
    }
    searchStarted = true;
    searchResult = undefined;

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
    {#if !searchStarted}
    <div class='text-sm text-muted-foreground
    flex items-center gap-3 mt-1.5 pl-3'>
      <a href='/' class='hover:opacity-80'>主页</a>
      <a href='/resume' class='hover:opacity-80'>简历</a>
      <a href='https://gxzv.com' class='hover:opacity-80'>博客</a>
    </div>
    {/if}
  </div>
</div>


<div class='container max-w-xl mx-auto pb-12'>

  {#if !searchStarted}
  <ListView result={dailyResult} title='🆕 最近添加' />
  {/if}

  <ListView result={searchResult} />

</div>