import { c as create_ssr_component, k as compute_rest_props, d as spread, l as escape_attribute_value, f as escape_object, v as validate_component, e as escape, i as each } from "../../../../chunks/ssr.js";
import { S as SEO } from "../../../../chunks/SEO.js";
import "../../../../chunks/index4.js";
import { I as Input } from "../../../../chunks/input.js";
import "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "clsx";
import { B as Button } from "../../../../chunks/button.js";
import { c as cn } from "../../../../chunks/utils.js";
const Skeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("animate-pulse rounded-md bg-primary/10", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}></div>`;
});
const Loading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col gap-4"><div class="space-y-2">${validate_component(Skeleton, "Skeleton").$$render($$result, { class: "h-5" }, {}, {})} ${validate_component(Skeleton, "Skeleton").$$render($$result, { class: "h-5 w-1/3 mt-4" }, {}, {})}</div> <div class="space-y-2">${validate_component(Skeleton, "Skeleton").$$render($$result, { class: "h-5" }, {}, {})} ${validate_component(Skeleton, "Skeleton").$$render($$result, { class: "h-5 w-1/3 mt-4" }, {}, {})}</div></div>`;
});
const ListView = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { result } = $$props;
  let { title = "" } = $$props;
  if ($$props.result === void 0 && $$bindings.result && result !== void 0) $$bindings.result(result);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  return `${result && result ? `<div class="flex flex-col gap-4"><h2 class="text-muted-foreground font-semibold">${title ? `${escape(title)}` : `🔍 ${escape(result.count)} 条相关结果`}</h2> ${result.data.length < 1 ? `<div class="text-center space-y-2" data-svelte-h="svelte-1ims39u"><div class="text-4xl">:(</div> <div class="text-muted-foreground text-sm">没有找到相关内容，尝试换个关键词 ？</div></div>` : ``} ${each(result.data, (item) => {
    return `<div class="flex items-center gap-4"><div class="grow"><h3 class="text-lg font-semibold line-clamp-2">${escape(item.name)}</h3> <p class="text-sm text-muted-foreground">资源添加于 ${escape(item.addtime)}</p></div> <div class="shrink-0">${validate_component(Button, "Button").$$render($$result, { href: item.url, target: "_blank" }, {}, {
      default: () => {
        return `网盘`;
      }
    })}</div> </div>`;
  })}</div>` : ``} ${!result ? `${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let dailyResult;
  let name = "";
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(SEO, "Seo").$$render($$result, { title: "短剧来了" }, {}, {})} <div class="container h-52 flex items-center justify-center"><div class="text-center w-full max-w-sm"><h1 class="text-2xl font-semibold mb-4" data-svelte-h="svelte-1k7oasw">短剧来了我说</h1> <form class="flex w-full items-center space-x-2">${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "name",
        placeholder: "剧名",
        value: name
      },
      {
        value: ($$value) => {
          name = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(Button, "Button").$$render($$result, { type: "submit" }, {}, {
      default: () => {
        return `搜索`;
      }
    })}</form> ${`<div class="text-sm text-muted-foreground flex items-center justify-between gap-3 mt-1.5 pl-3" data-svelte-h="svelte-39hf1r"><div class="flex items-center gap-3"><a href="/" class="hover:opacity-80">主页</a> <a href="/resume" class="hover:opacity-80">简历</a> <a href="https://gxzv.com" class="hover:opacity-80">博客</a></div> <div class="flex items-center gap-3"><a href="https://ys.110t.cn/" target="_blank" class="hover:opacity-80">数据来源</a></div></div>`}</div></div> <div class="container max-w-xl mx-auto pb-12">${`${validate_component(ListView, "ListView").$$render($$result, { result: dailyResult, title: "🆕 最近添加" }, {}, {})}`} ${``}</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
