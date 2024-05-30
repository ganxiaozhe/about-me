<script lang='ts'>
  import { Badge } from "$lib/components/ui/badge/";

  const SkillList:SkillItem[] = [
    {name:'编程', items:[
      {key:'精通', value:'HTML/CSS, JavaScript, Node.js, PHP'},
      {key:'熟练', value:'MySQL, PostgreSQL, Java, Python, Dart, Redis, Memcached, Nginx, Linux, Git'},
      {key:'了解', value:'Rust, Kotlin, C'},
    ]},
    {name:'框架', items:[
      {key:'精通', value:'jQuery, Svelte, TypeScript, Tailwind, Webman'},
      {key:'熟练', value:'Serverless, Electron, NW.js, Flutter, Vue.js, Vite.js, SpringBoot, Docker'},
      {key:'了解', value:'React, ReactNative'},
    ]},
    {name:'Art', items:[
      {key:'熟练', value:'Photoshop, Illustrator, Premiere Pro, UI / RP'}
    ]},
    {name:'社工', items:[
      {key:'熟练', value:'社会工程学, OSINT, 渗透测试, SQLMap, Burp Suite, Nmap'}
    ]}
  ];
</script>


{#each SkillList as item}
<section class='flex items-start px-profile'>
  <div class='font-semibold w-16 shrink-0 break-all pr-1'>{item.name}</div>
  <ul class='flex flex-col gap-2'>
    {#each item.items as skill}
    <li class='flex flex-wrap items-center gap-2'>
      <Badge class='bg-green-600 hover:bg-green-700 
      text-white rounded-sm'>{skill.key}</Badge>
      {#each skill.value.split(',') as skillItem}
      <Badge class='rounded-sm' variant='outline'>{skillItem.trim()}</Badge>
      {/each}
    </li>
    {/each}
  </ul>
</section>
{/each}