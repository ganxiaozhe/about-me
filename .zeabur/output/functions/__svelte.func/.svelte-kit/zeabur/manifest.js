export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","employments/fumukeji/license.jpg","employments/gxz-studio/license.jpg","employments/metauit/contract-cto.jpg","favicon.png","icons/5axismfg.jpg","icons/ajufood.jpg","icons/astrokitty.jpg","icons/chiau.jpg","icons/enneatao.png","icons/gquery.jpg","icons/metamo.jpg","icons/metauit.jpg","icons/nmgcy.jpg","icons/nonoerp.jpg","icons/panzhihua.jpg","images/face_covered.jpg","projects/.DS_Store","projects/5axismfg/contract.jpg","projects/5axismfg/web-1.jpg","projects/5axismfg/web-2.jpg","projects/5axismfg/web-3.jpg","projects/ajufood/1.jpg","projects/ajufood/2.jpg","projects/ajufood/3.jpg","projects/ajufood/ajufood.cn.jpg","projects/ajufood/v1-1.jpg","projects/ajufood/v1-2.jpg","projects/chiau/client-1.jpg","projects/chiau/client-2.jpg","projects/express-tracking/contract-evidence-a.jpg","projects/express-tracking/contract-evidence-b.jpg","projects/express-tracking/contract.jpg","projects/gpeg/gxzv.com.jpg","projects/gpeg/web-1.jpg","projects/gquery/gquery.cn.jpg","projects/gquery/gquery.net.jpg","projects/gquery/software-copyright.jpg","projects/iot-modular-pc/client-1.jpg","projects/iot-modular-pc/contract.jpg","projects/llms-api/metor-ability.jpg","projects/llms-api/web-1.jpg","projects/mcadmin/mcadmin.cn.jpg","projects/mcadmin/web-1.jpg","projects/mcadmin/web-2.jpg","projects/metamo/web-1.jpg","projects/metamo/web-2.jpg","projects/metauit/metauit.com.jpg","projects/nmgcy/doc-1.jpg","projects/nmgcy/visual-effect.jpg","projects/nmgcy/web-1.jpg","projects/nonoerp/nonoerp.com.jpg","projects/nonoerp/web-n-client.jpg","projects/pagpt/contract-evidence-a.jpg","projects/pagpt/contract-evidence-b.jpg","projects/pagpt/contract.jpg","projects/panzhihua/panzhihua.live.jpg","projects/panzhihua/web-1.jpg","projects/panzhihua/web-2.jpg","projects/thepieshed/web.jpg"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.g4mCzLEf.js",app:"_app/immutable/entry/app.CPoG39L3.js",imports:["_app/immutable/entry/start.g4mCzLEf.js","_app/immutable/chunks/B0Udx0qm.js","_app/immutable/chunks/C7vqo0_1.js","_app/immutable/chunks/CA5i_CBx.js","_app/immutable/entry/app.CPoG39L3.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/C7vqo0_1.js","_app/immutable/chunks/CE-11OL3.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js')),
			__memo(() => import('../output/server/nodes/8.js')),
			__memo(() => import('../output/server/nodes/9.js')),
			__memo(() => import('../output/server/nodes/10.js')),
			__memo(() => import('../output/server/nodes/11.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/playlet",
				pattern: /^\/api\/playlet\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/playlet/_server.ts.js'))
			},
			{
				id: "/a/2024-TPUP",
				pattern: /^\/a\/2024-TPUP\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/resume",
				pattern: /^\/resume\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/resume/support",
				pattern: /^\/resume\/support\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/teach",
				pattern: /^\/teach\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/tools",
				pattern: /^\/tools\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/tools/irecord",
				pattern: /^\/tools\/irecord\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/tools/lucky_money",
				pattern: /^\/tools\/lucky_money\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/tools/playlet",
				pattern: /^\/tools\/playlet\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/tools/tell_the_truth",
				pattern: /^\/tools\/tell_the_truth\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
