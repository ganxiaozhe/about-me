import { c as create_ssr_component, k as compute_rest_props, d as spread, i as each, f as escape_object, l as escape_attribute_value } from "./ssr.js";
import { i as is_void } from "./utils.js";
const defaultAttributes = {
  outline: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  },
  filled: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none"
  }
};
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["type", "name", "color", "size", "stroke", "iconNode"]);
  let { type } = $$props;
  let { name } = $$props;
  let { color = "currentColor" } = $$props;
  let { size = 24 } = $$props;
  let { stroke = 2 } = $$props;
  let { iconNode } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.stroke === void 0 && $$bindings.stroke && stroke !== void 0) $$bindings.stroke(stroke);
  if ($$props.iconNode === void 0 && $$bindings.iconNode && iconNode !== void 0) $$bindings.iconNode(iconNode);
  return `<svg${spread(
    [
      escape_object(defaultAttributes[type]),
      escape_object($$restProps),
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      {
        class: escape_attribute_value(`tabler-icon tabler-icon-${name} ${$$props.class ?? ""}`)
      },
      escape_object(type === "filled" ? { fill: color } : { "stroke-width": stroke, stroke: color })
    ],
    {}
  )}>${each(iconNode, ([tag, attrs]) => {
    return `${((tag$1) => {
      return tag$1 ? `<${tag}${spread([escape_object(attrs)], {})}>${is_void(tag$1) ? "" : ``}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
    })(tag)}`;
  })}${slots.default ? slots.default({}) : ``}</svg>`;
});
export {
  Icon as I
};
