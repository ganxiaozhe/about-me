<script lang='ts'>
  const SkillList:SkillItem[] = [
    {name:'编程', items:[
      {key:'精通', value:'HTML/CSS, JavaScript, Node.js, PHP'},
      {key:'熟练', value:'MySQL, Java, Python, Dart, Redis, Memcached, Nginx, Linux, Git, Docker'},
      {key:'了解', value:'Rust, Kotlin, C'},
    ]},
    {name:'框架', items:[
      {key:'精通', value:'jQuery, Svelte, Tailwind, Webman'},
      {key:'熟练', value:'Electron, NW.js, Flutter, Vue.js, Vite.js, NativeScript, SpringBoot'},
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
  <div class='font-semibold w-16 shrink-0'>{item.name}</div>
  <ul class='flex flex-col gap-2'>
    {#each item.items as skill}
    <li class='flex flex-wrap items-center gap-2'>
      <div class="badge badge-success">{skill.key}</div>
      {#each skill.value.split(',') as skillItem}
      <div class="badge badge-outline">{skillItem.trim()}</div>
      {/each}
    </li>
    {/each}
  </ul>
</section>
{/each}