import { c as create_ssr_component, i as each, e as escape, a as add_attribute, v as validate_component } from "../../../../chunks/ssr.js";
import { E as EmploymentListData, P as ProjectListData, b as ProjectListView } from "../../../../chunks/ProjectListView.js";
import { S as SEO } from "../../../../chunks/SEO.js";
const EmploymentListView = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { EmploymentList } = $$props;
  if ($$props.EmploymentList === void 0 && $$bindings.EmploymentList && EmploymentList !== void 0) $$bindings.EmploymentList(EmploymentList);
  return `${each(EmploymentList, (item) => {
    return `<div class="px-profile"><div class="flex items-center justify-between"><h2 class="font-semibold sm:text-lg">${escape(item.name)}</h2> <p>${escape(item.location)}</p></div> <div class="flex items-center justify-between text-sm">${item.role ? `<i>${escape(item.role)}</i>` : ``} ${item.created_at || item.finished_at ? `<i>${escape(item.created_at)} / ${escape(item.finished_at || "至今")}</i>` : ``}</div> ${item.contents ? `<ul class="list-disc space-y-2 pl-4 mt-2 text-sm opacity-90">${each(item.contents, (content) => {
      return `<li>${escape(content)}</li>`;
    })} </ul>` : ``} ${item.supports ? `<ul class="mt-3 grid grid-cols-1 items-stretch">${each(item.supports, (sup, i) => {
      return `<img src="${"/employments/" + escape(item.id, true) + "/" + escape(sup.value, true)}" alt="${"佐证材料 #" + escape(i, true)}"${add_attribute("data-lightbox", true, 0)}${add_attribute("data-width", sup.imageSize?.width, 0)}${add_attribute("data-height", sup.imageSize?.height, 0)}>`;
    })} </ul>` : ``} </div>`;
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const PI = {
    mode: data.mode,
    shareTimer: setTimeout(() => {
    })
  };
  let EmploymentList = EmploymentListData.map((item) => {
    return { ...item, contents: void 0 };
  });
  let ProjectList = ProjectListData.map((item) => {
    return { ...item, contents: void 0 };
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(SEO, "Seo").$$render($$result, { title: "佐证材料 | 我的简历" }, {}, {})}  <div class="${[
      "profile-" + escape(PI.mode, true) + " grid-pattern min-h-screen pb-12 sm:py-24",
      PI.mode === "pdf" ? "!py-0" : ""
    ].join(" ").trim()}"><div class="${[
      "max-w-[920px] relative mx-auto bg-card shadow-lg",
      PI.mode === "pdf" ? "max-w-none" : ""
    ].join(" ").trim()}"><div class="absolute top-0 right-0">${PI.mode === "pdf" ? `<button class="tooltip tooltip-left inline-flex btn btn-square" data-tip="WEB 模式" data-svelte-h="svelte-rulyrs"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4"></path><path d="M2 21v-6"></path><path d="M5 15v6"></path><path d="M2 18h3"></path><path d="M20 15v6h2"></path><path d="M13 21v-6l2 3l2 -3v6"></path><path d="M7.5 15h3"></path><path d="M9 15v6"></path></svg></button>` : ``}</div> <section class="p-profile" data-svelte-h="svelte-19v7952"><h5 class="text-sm">JU Chengren</h5> <h1 class="text-3xl font-bold">佐证材料</h1></section> <section class="bg-base-200/70 leading-relaxed"><div class="p-profile flex items-center justify-between" data-svelte-h="svelte-onwoum"><h2 class="text-2xl font-semibold"><svg xmlns="http://www.w3.org/2000/svg" class="icon text-green-400" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 21h18"></path><path d="M19 21v-4"></path><path d="M19 17a2 2 0 0 0 2 -2v-2a2 2 0 1 0 -4 0v2a2 2 0 0 0 2 2z"></path><path d="M14 21v-14a3 3 0 0 0 -3 -3h-4a3 3 0 0 0 -3 3v14"></path><path d="M9 17v4"></path><path d="M8 13h2"></path><path d="M8 9h2"></path></svg>工作经历</h2></div> <div class="flex flex-col gap-5">${validate_component(EmploymentListView, "EmploymentListView").$$render($$result, { EmploymentList }, {}, {})}</div></section> <section class="bg-base-200/70 pt-4">${validate_component(ProjectListView, "ProjectListView").$$render(
      $$result,
      { ProjectList },
      {
        ProjectList: ($$value) => {
          ProjectList = $$value;
          $$settled = false;
        }
      },
      {
        title: () => {
          return `<h2 slot="title" class="text-2xl font-semibold" data-svelte-h="svelte-xhcx51"><svg xmlns="http://www.w3.org/2000/svg" class="icon text-green-400" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 21h14"></path><path d="M6 18h2"></path><path d="M7 18v3"></path><path d="M9 11l3 3l6 -6l-3 -3z"></path><path d="M10.5 12.5l-1.5 1.5"></path><path d="M17 3l3 3"></path><path d="M12 21a6 6 0 0 0 3.715 -10.712"></path></svg>个人项目</h2>`;
        }
      }
    )}</section> <div class="${["bg-base-200/70 py-6", PI.mode === "pdf" ? "lg:py-8" : ""].join(" ").trim()}"></div></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
