import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { S as SEO } from "../../../../chunks/SEO.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SEO, "Seo").$$render($$result, { title: "页面跳转中" }, {}, {})} <div class="container relative mx-auto min-h-screen flex flex-col items-center justify-center py-24 text-center dark:text-white" data-svelte-h="svelte-1ko8n37"><h5 class="text-app font-light tracking-widest max-sm:text-xs md:text-lg">Please wait, the page is rebounding...</h5> <h1 class="mb-8 mt-2 text-3xl font-medium !leading-normal sm:text-4xl md:text-5xl lg:text-6xl">请稍后，页面跳转中</h1> </div>`;
});
export {
  Page as default
};
