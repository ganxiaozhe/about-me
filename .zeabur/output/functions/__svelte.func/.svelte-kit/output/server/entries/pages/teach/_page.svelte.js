import { c as create_ssr_component, v as validate_component, m as missing_component } from "../../../chunks/ssr.js";
import { S as SEO } from "../../../chunks/SEO.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${validate_component(SEO, "Seo").$$render($$result, { title: "付费辅导服务" }, {}, {})} <article class="container mx-auto pt-40 pb-28 prose dark:prose-invert lg:prose-lg xl:prose-xl">${validate_component(data.content || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</article>`;
});
export {
  Page as default
};
