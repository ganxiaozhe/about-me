<script lang="ts">
  import * as Card from "$lib/components/ui/card";
	import Seo from "$lib/modules/SEO.svelte";
	import moment from "moment";


  const Tools = [
    {
      title: 'Playlet - 短剧来了',
      description: '几乎包含市面上所有短剧资源，可免费检索观看',
      url: '/tools/playlet',
      created_at: '2024-05-10T21:57:51+08:00'
    },
    {
      title: 'iRecord - 记录',
      description: '一个将图像转换为拍立得相纸的小工具',
      url: '/tools/irecord',
      created_at: '2024-02-18T18:40:00+08:00'
    },
  ];
</script>

<Seo title='在线工具' />


<div class='container py-12 mx-auto max-w-4xl'>
  <div class='flex items-center justify-between'>
    <h1 class='text-2xl font-semibold'><span class='mr-1'>🔧</span> 在线工具</h1>
    <a class='text-muted-foreground hover:opacity-80' href='/'>返回主页</a>
  </div>

  <div class='grid sm:grid-cols-2 pt-12 gap-6'>
    {#each Tools as item}
    <a href={item.url}><Card.Root class='hover:shadow-sm hover:opacity-80'>
      <Card.Header>
        <Card.Title>{item.title}</Card.Title>
        <Card.Description>{item.description}</Card.Description>
      </Card.Header>
    </Card.Root></a>
    {/each}
  </div>
</div>