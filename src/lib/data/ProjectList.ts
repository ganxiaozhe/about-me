export const ProjectListData:ProjectItem[] = [
  {
    id: 'svelte-chat-dev',
    title: '边缘苗圃 - Edge Nursery',
    url: 'https://edgenursery.com/',
    keywords: ['智慧农业', '物联网', 'Serverless', 'Node.js', 'Svelte', 'AI'],
    created_at: '2024-04-23',
    contents: [
      {key: '背景', value: '现有智慧农业系统面临两大主要挑战：集中式云平台架构难以应对海量设备数据，导致性能问题和高成本；系统模块高度耦合、界面兼容性差，加上农民技术水平有限，影响决策效率和生产计划执行。'},
      {key: '目标', value: '基于 Serverless 实现 AIoT 平台，通过边缘计算和 AI 技术，实现设备数据的高效处理和实时分析，降低成本并提高决策效率。'},
      {key: '行动', value: 'Cloudflare Pub/Sub、Cloudflare Workers&Pages、Cloudflare R2、Timescale Cloud、Anthropic Claude 3'},
      {key: '结果', value: '系统通过边缘计算解决了海量数据承载局限性、成本高昂、可扩展性低等痛点；通过数字模型可智能调度设备，保证植株处于最佳环境，并自动处理已知风险。同时，借助强大的 LLMs 模型，可自动处理未知风险，并助力人员管理。'}
    ]
  },
  {
    id: 'svelte-chat-dev',
    title: 'Svelte Chat Dev',
    url: 'https://chatdev.gxzv.com/apps/chat?code=resumeg0Z2',
    keywords: ['Serverless', '自研框架', 'Node.js', 'Svelte', 'AI'],
    created_at: '2023-06-09',
    contents: [
      {key: '背景', value: '这是一个正在开发中的项目。'},
      {key: '目标', value: '用于人工智能应用开发的 TypeScript 框架，致力于构建 AI-powered 超级生产力工具。'},
      {key: '行动', value: '采用模块化设计，分为 Chat layer、Agents layer、Tools layer、Plugins layer、Data layer、Docs layer 以及应用层。<br/>当前基于流式语音合成技术，初步实现了实时对话功能。'},
    ]
  },
  {
    id: 'enneatao', priority: 1,
    title: 'EnneaTao - 人格九道',
    icon: '/icons/enneatao.png',
    url: 'https://enneatao.com/',
    keywords: ['独立项目', '心理健康', 'Serverless', 'Webman', 'Node.js', 'Svelte', 'Redis', 'MySQL'],
    created_at: '2023-06-01',
    contents: [
      {key: '背景', value: '一直以来，传统心理健康服务资源不充足、分布不均衡。同时，Z 时代在焦虑不断下追求共鸣与身份认同。'},
      {key: '目标', value: '基于消费者当今的底层诉求，即个体去丧，提供超越性的解决方案，帮助人们更好地了解自己。'},
      {key: '行动', value: '基于 Enneagram 理论学说打造数字化产品，帮助人们实现自我探索与身份认同的精神需求。<br/>通过表达性书写等心理治疗技术以及 AI 大模型引导，帮助用户成长、进步与追求希望地自我超越。'},
    ]
  },
  {
    id: 'pagpt',
    title: 'PA GPT - 推文自动化生成工具',
    keywords: ['AIGC', '外包', '客户端', '营销推广', '爬虫', '自动化', 'Python', 'Node.js', 'Svelte'],
    created_at: '2023-10-07',
    finished_at: '2023-10-20',
    contents: [
      {key: '背景', value: '传统业务流程中，需要大量人工检索商品、分析卖点、撰写推文，每条推文人力成本为 5～20 元不等。'},
      {key: '目标', value: '抹平人力成本，将传统流程自动化。'},
      {key: '行动', value: '借助提示工程或 fine-tuning 技术完成普通或复杂推文撰写任务，<br/>通过程序化构建上下文，依靠关键词检索各大平台商品，指定标题后即可生成长推文。'},
      {key: '结果', value: '使用该工具生成的推文质量比人工撰写更加稳定，内容重复率从 39% 降至 7%；成本降低 1,724%～6,896%，每条仅需 0.3 元，保守估计每人效率提升 2,000% 以上。'}
    ],
    supports: [
      {type:'image', value:'contract.jpg', imageSize:{width:1200, height:1554}},
      {type:'image', value:'contract-evidence-a.jpg', imageSize:{width:1200, height:1698}},
      {type:'image', value:'contract-evidence-b.jpg', imageSize:{width:1200, height:1698}}
    ]
  },
  {
    id: 'iot-modular-pc',
    title: '工业物联网模块化上位机',
    keywords: ['工控', '大前端', '客户端', '物联网', 'Node.js', 'Svelte', 'Flutter'],
    created_at: '2023-06-20',
    updated_at: '2023-08-01',
    contents: [
      {key: '背景', value: '在现目前上位机普遍对性能要求不高的情况下，同时存在界面简陋、可视化效果差、开发效率低等问题。'},
      {key: '目标', value: '利用大前端技术改善显示界面、UI 及交互，实现跨平台。控件模块化设计，可根据业务场景快速定制界面。'},
      {key: '行动', value: 'SvelteKit + Electron 技术开发跨平台应用，Node.js 实现串口、MQTT 通信，Web Components 模块化。'},
      {key: '结果', value: '较传统开发效率提升 400%，受多家电子产品研发企业认可。已配套工业级产品发售，客户满意度 96%。'}
    ],
    supports: [
      {type:'image', value:'contract.jpg', imageSize:{width:1200, height:1553}},
      {type:'image', value:'client-1.jpg', imageSize:{width:1200, height:1800}},
    ]
  },
  {
    id: 'metauit',
    title: 'MetaUIT - 元优联：全国科技爱好者共同的社区',
    icon: '/icons/metauit.jpg',
    url: 'https://metauit.com/',
    keywords: ['SaaS', 'API', '平台', '社区', '支付', '物联网', 'Node.js', 'Svelte', 'PHP', 'Webman', 'Redis', 'MySQL'],
    created_at: '2023-04-12',
    updated_at: '2023-08-04',
    contents: [
      {key: '背景', value: '元优联是全国科技爱好者共同的社区，致力为科研人员及创作者提供高效且全面的基础服务生态。'},
      {key: '目标', value: '打造学术型专家平台，致力于软件、硬件、互联网、新材料、人工智能等方面的 QA 及帮助。'},
      {key: '行动', value: '开发账户系统、统一登录、开放平台、支付系统等，基于 OAuth 2 接入第三方应用数 100+。'},
    ],
    owned_by: {
      company: '广州启探科技有限公司',
      role: '首席技术官',
      created_at: '2021-11'
    },
    supports: [
      {type:'image', value:'metauit.com.jpg', imageSize:{width:1200, height:1608}},
    ]
  },
  {
    id: 'taobor',
    title: 'Taobor - 淘宝商品信息采集',
    url: 'https://chromewebstore.google.com/detail/taobor-%E6%B7%98%E5%AE%9D%E5%95%86%E5%93%81%E4%BF%A1%E6%81%AF%E6%8A%93%E5%8F%96/kgkndlpgecddjehgpcfjjnefbmcfamol',
    keywords: ['Chrome 插件', '爬虫', 'Node.js', 'Svelte'],
    created_at: '2023-03-21',
    contents: [
      {key: '介绍', value: '基于 SvelteKit 开发的 Chrome 浏览器拓展程序，可以采集淘宝商品的详情信息。'},
    ],
  },
  {
    id: 'llms-api',
    title: '大型语言模型聚合 API 服务',
    url: 'https://metor-api.metauit.com',
    keywords: ['AIGC', 'SaaS', 'API', 'Serverless', 'Node.js', 'Svelte'],
    created_at: '2023-02-13',
    updated_at: '2023-09-17',
    contents: [
      {key: '背景', value: '自 ChatGPT 爆火后的几个月里，如何在境内提供稳定的服务一直存在问题。'},
      {key: '目标', value: '提供稳定的代理服务，附加角色预设、图表绘制、RAG 知识召回等功能。'},
      {key: '行动', value: 'GPT-3.5 没开放 API 之前，从反向代理服务器绕过 Cloudflare，依靠 session 与 OpenAI 后端服务对话。<br/>OpenAI API 开放后，通过境外服务器节点直接调用。基于提示工程实现角色预设，Mermaid 语法实现图表绘制。然而随着用户激增，境外节点群无法支撑大量并发。经过技术选型后我开始重构代码，将中台服务迁移至 Cloudflare 边缘网络，聚合 12 余种 LLMs，并基于自有 SaaS 提供 API。'},
    ],
    owned_by: {
      company: '广州启探科技有限公司',
      role: '首席技术官',
      created_at: '2021-11'
    },
    supports: [
      {type:'image', value:'/projects/metauit/metauit.com.jpg', imageSize:{width:1200, height:1608}},
      {type:'image', value:'web-1.jpg', imageSize:{width:1360, height:2002}},
      {type:'image', value:'metor-ability.jpg', imageSize:{width:1200, height:1800}},
    ]
  },
  {
    id: 'gpeg',
    title: 'GPEG 九型人格测试系统',
    url: 'https://gxzv.com/know-yourself/enneagram/',
    keywords: ['心理测试', '产品', '支付', 'JS', 'PHP', 'Redis', 'MySQL'],
    created_at: '2022-04-05',
    //finished_at: '2022-04-19',
    updated_at: '2022-09-16',
    contents: [
      {key: '背景', value: 'MBTI 的爆火让我更加相信在人类历史发展长河中，我们已渐渐开始从物质文明转为精神文明建设。'},
      {key: '目标', value: '利用九型人格理论开发在线测试及分析评估系统，帮助用户了解内在自我，促进心理成长和自我发展。'},
      {key: '结果', value: '2023 年中旬近 30 天内测试人数超 2.8 万人，消费额达 1.7 万元。在 413 位用户反馈中，评分高达 98%。'},
    ],
    supports: [
      {type:'image', value:'gxzv.com.jpg', imageSize:{width:1184, height:1794}},
      {type:'image', value:'web-1.jpg', imageSize:{width:1200, height:1800}},
    ]
  },
  {
    id: '5axismfg',
    title: '深圳市星凯科技有限公司官网',
    icon: '/icons/5axismfg.jpg',
    url: 'https://5axismfg.cn/',
    keywords: ['企业官网', '外包', '重工制造', 'CMS', 'H5', 'JS', 'PHP', 'Redis', 'MySQL'],
    created_at: '2022-03-23',
    finished_at: '2022-04-20',
    contents: [
      {key: '背景', value: '其公司官网面临到期，且界面与功能老旧，现需开发新网站并私有部署。'},
      {key: '行动', value: '该项目前后端均使用自研框架 gQuery 进行开发，成功将开发时间从 45 天缩短至 29 天。<br/>由于旧站点到期，内容无法正常迁移，我通过 Node.js 快速实现爬虫程序，将数据完美迁移至新站点。'}
    ],
    supports: [
      {type:'image', value:'contract.jpg', imageSize:{width:1200, height:1553}},
      {type:'image', value:'web-1.jpg', imageSize:{width:1200, height:2173}},
      {type:'image', value:'web-3.jpg', imageSize:{width:1200, height:2173}}
    ]
  },
  {
    id: 'nonoerp',
    title: 'NONOERP: 电商 ERP 辅助软件',
    icon: '/icons/nonoerp.jpg',
    url: 'https://nonoerp.com/',
    keywords: ['电商', '外包', '大前端', '爬虫', '自动化', 'Node.js', 'NW.js'],
    created_at: '2022-01-18',
    finished_at: '2022-02-13',
    contents: [
      {key: '背景', value: '传统代发流程中，商家在 A 平台寻找低价货源，在 B 平台以高价挂售。<br/>但对于复杂的商品信息，每个商品平均耗时长达半小时，费时费力。'},
      {key: '目标', value: '多平台多商铺商品信息采集，一键批量上货，实时库存维护。'},
      {key: '结果', value: '甲方团队通过该软件，将先前每件商品 30 分钟的工作时长缩减至 2 分钟。<br/>次月商户号累计销售额达 43 万，相较使用前提升了 1,075%。'},
    ],
    supports: [
      {type:'image', value:'nonoerp.com.jpg', imageSize:{width:1184, height:1794}},
      {type:'image', value:'web-n-client.jpg', imageSize:{width:1200, height:1800}},
    ]
  },
  {
    id: 'express-tracking',
    title: '快递单号智能录入系统',
    url: 'https://lilei.gquery.cn/',
    keywords: ['电商', '外包', '自动化', 'H5', 'JS', 'PHP', 'Redis', 'MySQL'],
    created_at: '2021-12-20',
    finished_at: '2022-01-03',
    updated_at: '2022-08-23',
    contents: [
      {key: '目标', value: '通过在线平台聚合全国各地分销商提交的单号信息，并与系统信息进行匹配。'},
      {key: '行动', value: '平台完全基于 gQuery 与 gQueryPHP 进行开发，开发效率提升的同时稳健性也得到增强。'},
      {key: '结果', value: '自 2022 年 8 月到 2023 年 10 月以来，该平台运行稳定，SLA 服务可用性 100%。<br/>数据上，系统处理 Excel 表格单号 266,462 条，总计金额 445,708,248 元。'},
    ],
    supports: [
      {type:'image', value:'contract.jpg', imageSize:{width:1200, height:1553}},
      {type:'image', value:'contract-evidence-a.jpg', imageSize:{width:1200, height:1698}},
      {type:'image', value:'contract-evidence-b.jpg', imageSize:{width:1200, height:1698}}
    ]
  },
  {
    id: 'nmgcy',
    title: '广西农民工创业联盟',
    icon: '/icons/nmgcy.jpg',
    url: 'https://nmg.gxrcpx.com/',
    keywords: ['平台', '外包', '小程序', 'CMS', 'JS', 'Java', 'SpringBoot', 'Redis', 'MySQL'],
    created_at: '2021-07-11',
    finished_at: '2021-09-30',
    contents: [
      {key: '目标', value: '邀约农民工申报创业项目，指导专家入驻平台提供技术支持、素质培训等能力提升帮扶，提高创业成功率。'},
      {key: '行动', value: '独立负责系统程序开发，基于 gQuery 框架开发网站，Java SpringBoot 后端以及原生小程序。<br/>基于 WebSocket 自主实现 IM 实时聊天模块，站内外智能通知确保消息被及时查阅。'},
    ],
    owned_by: {
      company: '广西迈特优科技发展有限公司',
      role: '首席技术官',
      created_at: '2021-05'
    },
    supports: [
      {type:'image', value:'web-1.jpg', imageSize:{width:1200, height:1800}},
      {type:'image', value:'doc-1.jpg', imageSize:{width:1200, height:1800}},
      {type:'image', value:'visual-effect.jpg', imageSize:{width:1200, height:1800}},
    ]
  },
  {
    id: 'astrokitty',
    title: 'Astrokitties: BSC-BNB 反射币',
    icon: '/icons/astrokitty.jpg',
    keywords: ['Crypto', 'Web3', '区块链', 'Node.js', 'Redis'],
    created_at: '2021-07-03',
    finished_at: '2021-09-10',
    contents: [
      {key: '角色', value: '任 Astrokitties (AK Token) 大中华区管理员，负责布道及官网开发。'},
      {key: '背景', value: 'AK Token 是币安智能链 (BSC) 上自动 BNB 收益合约的首批先行者，在购买代币并持有后，每 30 分钟钱包中就会自动收到 BNB 奖励，无需任何操作。'},
    ]
  },
  {
    id: 'chiau',
    title: 'Chia | ChiauFarm - 多功能可视化挖矿程序',
    icon: '/icons/chiau.jpg',
    url: 'https://chiau.net/farm/',
    keywords: ['Crypto', '大前端', '自动化', '客户端', 'Node.js', 'NW.js', 'Redis'],
    created_at: '2021-05-13',
    finished_at: '2021-06-08',
    contents: [
      {key: '结果', value: '作为 Chia Token 首个公开的多功能可视化自动耕种挖矿客户端，实现了多账户隔离、无服务器、代耕系统、操作自动化，并逆向实现稳定可靠的进度算法，发布后一周内下载量达 3,000 余次，效率提升39%。'},
    ],
    supports: [
      {type:'image', value:'client-1.jpg', imageSize:{width:1200, height:1800}},
      {type:'image', value:'client-2.jpg', imageSize:{width:1200, height:1800}},
    ]
  },
  {
    id: 'panzhihua',
    title: '英雄攀枝花 阳光康养地',
    icon: '/icons/panzhihua.jpg',
    url: 'https://panzhihua.live/',
    keywords: ['文创', '比赛', 'H5', 'JS'],
    created_at: '2020-11-25',
    finished_at: '2020-12-21',
    contents: [
      {key: '背景', value: '由中共攀枝花市人民政府主办，文创设计大赛项目。'},
      {key: '行动', value: '创建文旅专题网站，使用自研 gQuery 框架开发，H5 自适应。'}
    ],
    supports: [
      {type:'image', value:'panzhihua.live.jpg', imageSize:{width:1184, height:1794}},
      {type:'image', value:'web-1.jpg', imageSize:{width:1200, height:1800}},
      {type:'image', value:'web-2.jpg', imageSize:{width:1200, height:1800}},
    ]
  },
  {
    id: 'ajufood',
    title: '阿具食品有限公司官网',
    icon: '/icons/ajufood.jpg',
    url: 'https://www.ajufood.cn/',
    keywords: ['企业官网', '食品', '快消品', 'H5', 'JS', 'PHP', 'Redis', 'MySQL'],
    created_at: '2020-10-24',
    updated_at: '2022-05-31',
    supports: [
      {type:'image', value:'ajufood.cn.jpg', imageSize:{width:1184, height:1670}},
      {type:'image', value:'v1-1.jpg', imageSize:{width:1200, height:1936}},
      {type:'image', value:'v1-2.jpg', imageSize:{width:1200, height:1936}},
      {type:'image', value:'1.jpg', imageSize:{width:1200, height:1814}},
      {type:'image', value:'2.jpg', imageSize:{width:1200, height:1814}},
      {type:'image', value:'3.jpg', imageSize:{width:1200, height:1814}},
    ]
  },
  {
    id: 'gquery',
    title: 'gQuery 框架',
    icon: '/icons/gquery.jpg',
    url: 'https://gquery.cn/',
    keywords: ['自研框架', '开源', 'JS', 'PHP'],
    created_at: '2020-09-02',
    finished_at: '2022-07-14',
    contents: [
      {key: '背景', value: '希望能高效构建强大美观的系统项目，封装通用函数库和 UI 组件加速前端开发。'},
      {key: '目标', value: '前端函数库参考 jQuery 开发，与 CSS 框架一同基于 MIT 开源。后端框架基于 PSR 参考 ThinkPHP 开发。'},
      {key: '成果', value: '在中小型项目中，gQuery 提升了 49% 的开发效率，并于 Gitee 成为推荐项目。<br/>基于 gQuery 开发了数十余种复杂组件，包括 MD 编辑器、浏览器菜单、滚动视差、灯箱等。'}
    ],
    supports: [
      {type:'image', value:'gquery.cn.jpg', imageSize:{width:1184, height:1670}},
      {type:'image', value:'gquery.net.jpg', imageSize:{width:1184, height:1794}},
      {type:'image', value:'software-copyright.jpg', imageSize:{width:1200, height:1654}},
    ]
  },
  {
    id: 'mcadmin',
    title: 'MCAdmin：国内垂直社区',
    url: 'https://mcadmin.cn/',
    keywords: ['社区', '项目管理', '在线工具', 'CMS', 'H5', 'JS', 'PHP', 'Redis', 'MySQL'],
    created_at: '2020-07-05',
    finished_at: '2020-12-01',
    contents: [
      {key: '背景', value: 'Minecraft 沙盒游戏国内社区。注册用户可发起提问 (类似 StackOverflow)，发布技术论刊、游戏项目等。'},
      {key: '行动', value: `独立完成服务器部署，MySQL 环境搭建及调优，状态监控搭建（如服务器负载及 PV、UV 等），容灾方案，后端主 PHP，前端使用 jQuery 及自研框架。
      <br/>基于用户停留时长预测，通过 AJAX 更精准地完成数据采集，并在该环节省去 60% 网络 IO。
      <br/>通过信息隐藏、分布式、CDN 聚合等方法低成本实现 DDOS 防护及应用安全。`},
    ],
    supports: [
      {type:'image', value:'mcadmin.cn.jpg', imageSize:{width:1184, height:1670}},
      {type:'image', value:'web-1.jpg', imageSize:{width:1200, height:1800}},
      {type:'image', value:'web-2.jpg', imageSize:{width:1200, height:1800}},
    ]
  },
  {
    id: 'metamo',
    title: '元魔幻界: Minecraft 群组 & 服务平台',
    icon: '/icons/metamo.jpg',
    url: 'https://mc.metamo.cn/',
    keywords: ['游戏运营商', '社区', '在线工具', '支付', 'CMS', 'H5', 'JS', 'PHP', 'Redis', 'MySQL'],
    created_at: '2020-03-10',
    updated_at: '2022-10-24',
    contents: [
      {key: '背景', value: 'Minecraft 群祖服运营商，提供多人游戏、在线社区、工具、原创内容产出等服务。'},
      {key: '行动', value: `负责网站与游戏服务器的开发，功能规划及业务方向。
      <br/>在中后期开发中将前端函数库由 jQuery 更换为 gQuery，缩减代码量达 37%，有效提高开发效率。
      <br/>网站前端使用 gQuery 框架，后端使用 gQueryPHP 框架，自主实现前后端工程化。
      <br/>利用社工、安全运维、渗透测试等知识，隐藏有效信息，在控制层防止穷举爆破、恶意文件上传，通过 SQLMap 工具查缺、PHP PDO 有效防止 SQL 注入，并及时处理 XSS 漏洞。`},
      {key: '成果', value: '累计注册用户人数达 34,000+，在国内早期玩家群体中拥有较高影响力。<br/>在线工具总计使用量已达 1,000W+，用户体验颇受好评。'}
    ],
    supports: [
      {type:'image', value:'web-1.jpg', imageSize:{width:1200, height:1800}},
      {type:'image', value:'web-2.jpg', imageSize:{width:1200, height:1800}},
    ]
  },
  {
    id: 'thepieshed',
    title: 'ThePieShed 在线订餐系统',
    keywords: ['实体餐饮', '外包', '食品', 'H5', 'JS', 'PHP', 'MySQL'],
    created_at: '2019-08-28',
    finished_at: '🤐',
    contents: [
      {key: '背景', value: '海外商家需要一个简单的自动化订餐网站，客户可通过 PC、iPad、手机端进行点餐。点餐后将账单发送至客户邮箱，付款后再由餐厅制作，客户按照约定时间取餐。'},
    ],
    supports: [
      {type:'image', value:'web.jpg', imageSize:{width:1200, height:1800}},
    ]
  },
  {
    id: 'greeper',
    title: 'Greeper: 亚马逊智能爬虫',
    keywords: ['工具', '外包', '爬虫', 'Node.js'],
    created_at: '🤐',
    finished_at: '🤐',
    contents: [
      {key: '目标', value: '针对亚马逊商家后台的爬虫程序，可自动抓取后台检索中所有关联商品，并聚合输出至 Excel。'},
      {key: '行动', value: '程序通过 Node.js 开发，依靠 Nightmare 模拟用户操作以规避严格的反爬策略。'}
    ]
  }
].sort((a,b)=>(b?.priority||0) - (a?.priority||0)) as ProjectItem[];