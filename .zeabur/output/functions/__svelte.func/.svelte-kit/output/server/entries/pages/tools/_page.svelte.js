import { c as create_ssr_component, k as compute_rest_props, d as spread, l as escape_attribute_value, f as escape_object, v as validate_component, i as each, a as add_attribute, e as escape } from "../../../chunks/ssr.js";
import { C as Card } from "../../../chunks/card.js";
import "clsx";
import { c as cn, i as is_void } from "../../../chunks/utils.js";
import { S as SEO } from "../../../chunks/SEO.js";
import "moment";
const Card_description = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<p${spread(
    [
      {
        class: escape_attribute_value(cn("text-sm text-muted-foreground", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</p>`;
});
const Card_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("flex flex-col space-y-1.5 p-6", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "tag"]);
  let { class: className = void 0 } = $$props;
  let { tag = "h3" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
  return `${((tag$1) => {
    return tag$1 ? `<${tag}${spread(
      [
        {
          class: escape_attribute_value(cn("font-semibold leading-none tracking-tight", className))
        },
        escape_object($$restProps)
      ],
      {}
    )}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const Tools = [
    {
      title: "Playlet - 短剧来了",
      description: "几乎包含市面上所有短剧资源，可免费检索观看",
      url: "/tools/playlet",
      created_at: "2024-05-10T21:57:51+08:00"
    },
    {
      title: "iRecord - 记录",
      description: "一个将图像转换为拍立得相纸的小工具",
      url: "/tools/irecord",
      created_at: "2024-02-18T18:40:00+08:00"
    }
  ];
  return `${validate_component(SEO, "Seo").$$render($$result, { title: "在线工具" }, {}, {})} <div class="container py-12 mx-auto max-w-4xl"><div class="flex items-center justify-between" data-svelte-h="svelte-1ysmwee"><h1 class="text-2xl font-semibold"><span class="mr-1">🔧</span> 在线工具</h1> <a class="text-muted-foreground hover:opacity-80" href="/">返回主页</a></div> <div class="grid sm:grid-cols-2 pt-12 gap-6">${each(Tools, (item) => {
    return `<a${add_attribute("href", item.url, 0)}>${validate_component(Card, "Card.Root").$$render(
      $$result,
      {
        class: "hover:shadow-sm hover:opacity-80"
      },
      {},
      {
        default: () => {
          return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
                default: () => {
                  return `${escape(item.title)}`;
                }
              })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
                default: () => {
                  return `${escape(item.description)}`;
                }
              })} `;
            }
          })} `;
        }
      }
    )}</a>`;
  })}</div></div>`;
});
export {
  Page as default
};
