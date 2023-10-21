<script lang='ts'>
	import Badge from "../components/Badge.svelte";

  const ProjectList:ProjectList[] = [
    {
      title: 'PA GPT - 推文自动化生成工具',
      keywords: ['AIGC', '外包', '客户端', '营销推广', '爬虫', '自动化', 'Python', 'Node.js', 'Svelte'],
      created_at: '2023-10-07',
      finished_at: '2023-10-20',
      contents: [
        {key: '背景', value: '传统业务流程中，需要大量人工检索商品、分析卖点、撰写推文，每条推文人力成本为 5～20 元不等。'},
        {key: '目标', value: '抹平人力成本，将传统流程自动化。'},
        {key: '行动', value: '借助提示工程或 fine-tuning 技术完成普通或复杂推文撰写任务，<br/>通过程序化构建上下文，依靠关键词检索各大平台商品，指定标题后即可生成长推文。'},
        {key: '结果', value: '使用该工具生成的推文质量比人工撰写更加稳定，内容重复率从 39% 将为 7%；成本降低 1724%～6896%，每条仅需 0.3 元，同时每人效率提升 2000% 以上。'}
      ]
    },
    {
      title: '工业物联网模块化上位机',
      keywords: ['大前端', '客户端', '物联网', 'Node.js', 'Svelte'],
      created_at: '2023-06-20',
      updated_at: '2023-08-01',
      contents: [
        {key: '背景', value: '在现目前上位机普遍对性能要求不高的情况下，同时存在界面简陋、可视化效果差、开发效率低等问题。'},
        {key: '目标', value: '利用大前端技术改善显示界面、UI 及交互，实现跨平台。控件模块化设计，可根据业务场景快速定制界面。'},
        {key: '行动', value: 'SvelteKit + Electron 技术开发跨平台应用，Node.js 实现串口、MQTT 通信，Web Components 模块化。'},
        {key: '结果', value: '较传统开发效率提升 400%，受多家电子产品研发企业认可。已配套工业级产品发售，客户满意度 96%。'}
      ]
    },
    {
      title: 'MetaUIT - 元优联：全国科技爱好者共同的社区',
      icon: '/icons/metauit.jpg',
      keywords: ['SaaS', 'API', '平台', '支付', 'Node.js', 'Svelte', 'PHP', 'Webman', 'Redis', 'MySQL', 'TimescaleDB', 'JWT'],
      created_at: '2023-04-12',
      updated_at: '2023-08-04',
      contents: [
        {key: '背景', value: '元优联是全国科技爱好者共同的社区，致力为科研人员及创作者提供高效且全面的基础服务生态。'},
        {key: '目标', value: '打造学术型专家平台，致力于软件、硬件、互联网、新材料、人工智能等方面的 QA 及帮助。'},
        {key: '行动', value: '开发账户系统、统一登录、开放平台、支付系统等，基于 OAuth 2 接入第三方应用数 100+。'},
      ],
      owned_by: {
        company: '广西迈特优科技发展有限公司',
        role: '首席技术官',
        created_at: '2021-05'
      }
    },
    {
      title: '大型语言模型聚合 API 服务',
      keywords: ['AIGC', 'SaaS', 'API', 'Serverless', 'Node.js', 'Svelte', 'WebSocket'],
      created_at: '2023-02-13',
      updated_at: '2023-09-17',
      contents: [
        {key: '背景', value: '自 ChatGPT 爆火后的几个月里，在境内提供稳定的服务一直存在问题。'},
        {key: '目标', value: '提供稳定的代理服务，附加角色预设、图表绘制、RAG 知识召回等功能。'},
        {key: '行动', value: 'GPT-3.5 没开放 API 之前，从反向代理服务器绕过 Cloudflare，依靠 session 与 OpenAI 后端服务对话。<br/>OpenAI API 开放后，通过境外服务器节点直接调用。基于提示工程实现角色预设，Mermaid 语法实现图表绘制。然而随着用户激增，境外节点群无法支撑大量并发。经过技术选型后我开始重构代码，将中台服务迁移至 Cloudflare 边缘网络，聚合 12 余种 LLMs，并基于自有 SaaS 提供 API。'},
      ]
    },
    {
      title: 'GPEG 九型人格测试系统',
      keywords: ['心理测试', '产品', 'JS', 'PHP', 'Redis', 'MySQL'],
      created_at: '2022-04-05',
      finished_at: '2022-04-19',
      contents: [
        {key: '背景', value: 'MBTI 的爆火让我更加相信在人类历史发展长河中，我们已渐渐开始从物质文明转为精神文明建设。'},
        {key: '目标', value: '利用九型人格理论开发在线测试及分析评估系统，帮助用户了解内在自我，促进心理成长和自我发展。'},
        {key: '结果', value: '2023 年中旬近 30 天内测试人数超 2.8 万人，交易额达 1.7 万元。在 413 位用户反馈中，评分高达 98%。'},
      ]
    },
    {
      title: 'NONOERP: 电商 ERP 辅助软件',
      icon: '/icons/nonoerp.jpg',
      keywords: ['电商', '外包', '爬虫', '自动化', 'Node.js', 'NW.js'],
      created_at: '2022-01-18',
      finished_at: '2022-02-13',
      contents: [
        {key: '背景', value: '传统代发流程中，商家在 A 平台寻找低价货源，在 B 平台以高价挂售。<br/>但对于复杂的商品信息，每个商品平均耗时长达半小时，费时费力。'},
        {key: '目标', value: '多平台多商铺商品信息采集，一键批量上货，实时库存维护。'},
        {key: '结果', value: '甲方团队通过该软件，将先前每件商品 30 分钟的工作时长缩减至 2 分钟。<br/>次月商户号累计销售额达 43 万，相较使用前提升了 1075%。'},
      ]
    },
    {
      title: '广西农民工创业联盟',
      icon: '/icons/nmgcy.jpg',
      keywords: ['平台', '外包', '小程序', 'JS', 'Java', 'SpringBoot', 'Redis', 'MySQL', 'JWT'],
      created_at: '2021-07-11',
      finished_at: '2021-09-01',
      contents: [
        {key: '目标', value: '邀约农民工申报创业项目，指导专家入驻平台提供技术支持、素质培训等能力提升帮扶，提高创业成功率。'},
        {key: '行动', value: '独立负责系统程序开发，基于 gQuery 框架开发网站，Java SpringBoot 后端以及原生小程序。<br/>基于 WebSocket 自主实现 IM 实时聊天模块，站内外智能通知确保消息被及时查阅。'},
      ],
      owned_by: {
        company: '广西迈特优科技发展有限公司',
        role: '首席技术官',
        created_at: '2021-05'
      }
    },
    {
      title: 'Chiau | ChiauFarm - 多功能可视化挖矿程序',
      icon: '/icons/chiau.jpg',
      keywords: ['Crypto', '客户端', 'Node.js', 'NW.js', 'Redis'],
      created_at: '2021-05-13',
      finished_at: '2021-06-08',
      contents: [
        {key: '结果', value: '作为首个公开的多功能可视化自动耕种挖矿客户端，已实现多账户隔离、无服务器、代耕系统、操作自动化，并逆向实现稳定可靠的进度条算法，发布后一周内下载量达 3000 余次。'},
      ]
    },
    {
      class: 'opacity-80',
      title: '更多项目请私信咨询',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-puzzle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1"></path>
</svg>`,
      keywords: ['🤐'],
      finished_at: '2023-10',
      contents: [
        {key: '说明', value:'有较多项目因待完善或保密需要未做公布，劳烦私信咨询。'}
      ]
    }
  ];
</script>



{#each ProjectList as item(item.title)}
<section class='item group {item.class||''}'>
  {#if item.owned_by}
  <div class="bg-green-600/10 px-profile py-2 mb-3
  flex gap-4">
    <div class='w-12 shrink-0 flex justify-center'>
      <svg xmlns="http://www.w3.org/2000/svg" class="relative w-6 h-6 
      group-hover:animate-bounce group-hover:top-1" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M17 13v-6l-5 4l-5 -4v6l5 4z"></path>
      </svg>
    </div>
    <span>该项目系于 <b>{item.owned_by.company}</b> 担任 <b>{item.owned_by.role}</b> 时的独立开发成果</span>
  </div>
  {/if}
  <div class='px-profile flex items-start gap-4'>
    <div class="avatar placeholder rounded-sm overflow-hidden shrink-0" class:online={!item.finished_at}>
      <div class="bg-neutral-focus text-neutral-content w-12 h-12">
        {#if item.icon}
          {#if item.icon.startsWith('<')}
          {@html item.icon}
          {:else}
          <img src={item.icon} alt='项目图标' />
          {/if}
        {:else}
        <span class="text-xl">{item.title[0]}</span>
        {/if}
      </div>
    </div>
    <div class='flex flex-col justify-center'>
      <h3 class='font-semibold'>{item.title}</h3>
      <div class='flex flex-col sm:flex-row mt-1 gap-2'>
        <Badge icon='关键词' size='sm' rightClass='bg-green-700'>
          {item.keywords.join(', ')}
        </Badge>
        {#if item.created_at}
        <Badge icon='起' size='sm'>{item.created_at}</Badge>
        {/if}
        {#if item.updated_at}
        <Badge icon='最近' size='sm'>{item.updated_at}</Badge>
        {/if}
        {#if item.finished_at}
        <Badge icon='止' size='sm'>{item.finished_at}</Badge>
        {/if}
      </div>
    </div>
  </div>
  <ul class='px-profile py-3 leading-relaxed'>
    {#each item.contents as content(content.key)}
    <li class='flex'>
      <div class='font-semibold w-16 shrink-0'>{content.key}：</div>
      <div>{@html content.value}</div>
    </li>
    {/each}
  </ul>
</section>
{/each}