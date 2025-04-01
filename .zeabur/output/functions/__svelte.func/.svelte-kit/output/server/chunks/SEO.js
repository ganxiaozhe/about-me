import { c as create_ssr_component, h as subscribe, a as add_attribute, e as escape } from "./ssr.js";
import { p as page } from "./stores.js";
const SEO = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { title } = $$props;
  let { description = "" } = $$props;
  let { canonicalLink = "" } = $$props;
  if ($page.url.pathname !== "/") {
    title += ` - 小蔗的小窝`;
  }
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0) $$bindings.description(description);
  if ($$props.canonicalLink === void 0 && $$bindings.canonicalLink && canonicalLink !== void 0) $$bindings.canonicalLink(canonicalLink);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-wlk6fc_START -->${$$result.title = `<title>${escape(title)}</title>`, ""}${description ? `<meta name="description"${add_attribute("content", description, 0)}>` : ``}<link rel="canonical"${add_attribute("href", canonicalLink || `${$page.url.origin}${$page.url.pathname}`, 0)}><!-- HEAD_svelte-wlk6fc_END -->`, ""}`;
});
export {
  SEO as S
};
