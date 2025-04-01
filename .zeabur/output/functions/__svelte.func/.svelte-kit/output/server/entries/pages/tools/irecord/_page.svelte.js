import { c as create_ssr_component, v as validate_component, k as compute_rest_props, d as spread, e as escape, l as escape_attribute_value, f as escape_object } from "../../../../chunks/ssr.js";
import { S as SEO } from "../../../../chunks/SEO.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "dom-to-image";
import "html-to-image";
import "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "ua-parser-js";
import "../../../../chunks/index4.js";
import { c as cn } from "../../../../chunks/utils.js";
import { I as Input } from "../../../../chunks/input.js";
const Photo_up = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M15 8h.01" }],
    [
      "path",
      {
        "d": "M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5"
      }
    ],
    [
      "path",
      {
        "d": "M3 16l5 -5c.928 -.893 2.072 -.893 3 0l3.5 3.5"
      }
    ],
    [
      "path",
      {
        "d": "M14 14l1 -1c.679 -.653 1.473 -.829 2.214 -.526"
      }
    ],
    ["path", { "d": "M19 22v-6" }],
    ["path", { "d": "M22 19l-3 -3l-3 3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { type: "outline" }, { name: "photo-up" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Textarea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value", "readonly"]);
  let { class: className = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { readonly = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0) $$bindings.readonly(readonly);
  return `<textarea${spread(
    [
      {
        class: escape_attribute_value(cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className))
      },
      { readonly: readonly || null },
      escape_object($$restProps)
    ],
    {}
  )}>${escape(value || "")}</textarea>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const recorder = {
    imgAlt: "iRecord",
    width: 416,
    height: 512,
    bt: 0,
    bl: 0,
    br: 0,
    bb: 0
  };
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(SEO, "Seo").$$render($$result, { title: "📷 记录" }, {}, {})} <div class="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center py-8" aria-hidden><div id="poster" class="${[
      "flex flex-col items-center justify-center mb-8 relative w-[26rem]",
      "min-h-[32rem] "
    ].join(" ").trim()}" style="${"padding-top: " + escape(recorder.bt, true) + "px;padding-bottom: " + escape(recorder.bb, true) + "px; padding-left: " + escape(recorder.bl, true) + "px;padding-right: " + escape(recorder.br, true) + "px; max-width: calc(100vw - 24px);"}"><div class="absolute top-0 left-0 w-full h-[8%] max-h-[50px] bg-white"></div> <div class="absolute top-0 left-0 w-[7.5%] h-full bg-white"></div> <div class="absolute top-0 right-0 w-[7.5%] h-full bg-white"></div> <div class="${[
      "absolute bottom-0 left-0 bg-white h-[14%] max-h-[88px] w-full flex items-center justify-center text-black/90 font-semibold whitespace-pre text-center",
      recorder.imgAlt.indexOf("\n") < 0 ? "pb-1" : ""
    ].join(" ").trim()}">${escape(recorder.imgAlt)}</div> ${`${`${validate_component(Photo_up, "IconPhotoUp").$$render($$result, { size: 52 }, {}, {})} <p class="mt-3 opacity-90" data-svelte-h="svelte-17yzw5a">点击上传或拖拽图片至此处</p>`}`} <label class="absolute w-full h-full z-[1]" for="uploadFiles"></label> <input id="uploadFiles" type="file" class="hidden"></div> ${``} <div class="flex flex-col gap-3 w-[30rem] px-8 max-w-full"> <label class="flex flex-col gap-1 w-full"><div class="label" data-svelte-h="svelte-8p0246"><span class="label-text text-muted-foreground">图片描述</span></div> ${validate_component(Textarea, "Textarea").$$render(
      $$result,
      {
        class: "min-h-[3rem] h-[4rem]",
        maxlength: 512,
        value: recorder.imgAlt
      },
      {
        value: ($$value) => {
          recorder.imgAlt = $$value;
          $$settled = false;
        }
      },
      {}
    )}</label> <div class="flex gap-4"> <label class="flex-col gap-1 w-full grow"><div class="label" data-svelte-h="svelte-1ldb7sx"><span class="label-text text-muted-foreground">宽</span></div> <div class="${[
      "input input-bordered flex items-center gap-2",
      "opacity-70"
    ].join(" ").trim()}">${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "number",
        class: "grow w-full",
        disabled: true,
        value: recorder.width
      },
      {
        value: ($$value) => {
          recorder.width = $$value;
          $$settled = false;
        }
      },
      {}
    )} <span class="opacity-70" data-svelte-h="svelte-14nm9em">px</span></div></label>  <label class="flex-col gap-1 w-full grow"><div class="label" data-svelte-h="svelte-1f5fvqf"><span class="label-text text-muted-foreground">长</span></div> <div class="${[
      "input input-bordered flex items-center gap-2",
      "opacity-70"
    ].join(" ").trim()}">${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "number",
        class: "grow w-full",
        disabled: true,
        value: recorder.height
      },
      {
        value: ($$value) => {
          recorder.height = $$value;
          $$settled = false;
        }
      },
      {}
    )} <span class="opacity-70" data-svelte-h="svelte-14nm9em">px</span></div></label> </div></div> ${``}</div> ${``}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
