<script lang='ts'>
  const AbilityList:{type:string, content:string}[] = [
    {type:'serverless', content:"熟悉 Serverless 架构，能熟练使用 Cloudflare Workers 进行应用开发，以及 Zeabur 部署服务。"},
    {type:'dev', content:"理解面向对象基本原理，能熟练使用 Node.js、PHP 进行系统及架构开发设计，可以使用 Java、Python 进行系统开发，了解 Rust、C / CPP。"},
    {type:'web-devices', content:"熟练使用 WEB 大前端相关技术，能够从头创建自适应界面，能通过 JavaScript 进行工程化开发设计，能借助 Electron、NW.js、uni-app 及 Flutter 进行跨平台系统应用开发工作。"},
    {type:'api', content:"对应用程序接口 API / SDK 有深入理解，能快速完成 API 设计、开发、测试及部署这一整套流程。"},
    {type:'cache', content:"熟悉 LNMP 架构原理，熟悉数据库常见的操作及查询优化，精通常见的缓存技术如 Redis / Memcached。"},
    {type:'wallet', content:"熟悉支付平台整体架构及充值、提现、退款、打款、对账、结算和代发代付等基本业务流程。"},
    {type:'daq', content: "熟练使用 Node.js、Python 进行数据采集，包括 Nightmare、Puppeteer 等浏览器自动化框架。"},
    {type:'sec', content: "熟悉 Javascript 逆向，对渗透测试、社工技术有一定了解，能借助各类情报平台、工具进行信息挖掘。"},
    {type:'me', content: "拥抱新技术，接受新观点，终生学习者。"}
  ];
</script>


<ul class='px-profile space-y-2 text-sm xs:text-base'>
  {#each AbilityList as ability}
  <li class='flex gap-2 items-start leading-[24px]'>
    <div class='shrink-0 w-7 opacity-80'>
      {#if ability.type==='serverless'}
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-world"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M3.6 9h16.8" /><path d="M3.6 15h16.8" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></svg>
      {/if}
      {#if ability.type==='dev'}
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-code" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M7 8l-4 4l4 4"></path>
        <path d="M17 8l4 4l-4 4"></path>
        <path d="M14 4l-4 16"></path>
      </svg>
      {/if}
      {#if ability.type==='sec'}
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shield-half" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"></path>
        <path d="M12 3v18"></path>
      </svg>
      {/if}
      {#if ability.type==='daq'}
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-database-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3" />
        <path d="M4 6v6c0 1.657 3.582 3 8 3m8 -3.5v-5.5" />
        <path d="M4 12v6c0 1.657 3.582 3 8 3" />
        <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M20.2 20.2l1.8 1.8" />
      </svg>
      {/if}
      {#if ability.type==='wallet'}
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wallet" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12"></path>
        <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4"></path>
      </svg>
      {/if}
      {#if ability.type==='web-devices'}
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-devices-code" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M13 15.5v-6.5a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v4m0 6a1 1 0 0 1 -1 1"></path>
        <path d="M18 8v-3a1 1 0 0 0 -1 -1h-13a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h7"></path>
        <path d="M20 21l2 -2l-2 -2"></path>
        <path d="M17 17l-2 2l2 2"></path>
        <path d="M16 9h2"></path>
      </svg>
      {/if}
      {#if ability.type==='api'}
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-api" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M4 13h5"></path>
        <path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"></path>
        <path d="M20 8v8"></path>
        <path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"></path>
      </svg>
      {/if}
      {#if ability.type==='cache'}
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-analyze" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M20 11a8.1 8.1 0 0 0 -6.986 -6.918a8.095 8.095 0 0 0 -8.019 3.918"></path>
        <path d="M4 13a8.1 8.1 0 0 0 15 3"></path>
        <path d="M19 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
        <path d="M5 8m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
      </svg>
      {/if}
      {#if ability.type==='me'}
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-seeding" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 10a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3"></path>
        <path d="M12 14a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3"></path>
        <path d="M12 20l0 -10"></path>
      </svg>
      {/if}
    </div>
    <p>{ability.content}</p>
  </li>
  {/each}
</ul>