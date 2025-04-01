import { s as setContext, j as getContext, c as create_ssr_component, k as compute_rest_props, d as spread, a as add_attribute, f as escape_object, l as escape_attribute_value, h as subscribe, n as noop$1, e as escape, p as null_to_empty, i as each, v as validate_component } from "./ssr.js";
import { b as buttonVariants } from "./index4.js";
import { q as isFunction, b as isHTMLElement, o as omit, f as effect, i as isBrowser, m as makeElement, s as styleToString, w as withGet, e as executeCallbacks, a as addMeltEventListener, k as kbd, c as createElHelpers, u as useEscapeKeydown, n as noop, p as portalAttr } from "./create.js";
import { w as writable, d as derived } from "./index2.js";
import { s as sleep, t as tick, g as generateIds, b as useModal, c as createFocusTrap, a as getPortalDestination, u as usePortal, r as removeScroll, f as fade, d as badgeVariants } from "./index3.js";
import { t as toWritableStores, o as overridable, c as createBitAttrs, r as removeUndefined, g as getOptionUpdater, a as createDispatcher } from "./updater.js";
import "clsx";
import { I as Input } from "./input.js";
import { i as is_void, c as cn, f as flyAndScale } from "./utils.js";
import { B as Button } from "./button.js";
async function handleFocus(args) {
  const { prop, defaultEl } = args;
  await Promise.all([sleep(1), tick]);
  if (prop === void 0) {
    defaultEl?.focus();
    return;
  }
  const returned = isFunction(prop) ? prop(defaultEl) : prop;
  if (typeof returned === "string") {
    const el = document.querySelector(returned);
    if (!isHTMLElement(el))
      return;
    el.focus();
  } else if (isHTMLElement(returned)) {
    returned.focus();
  }
}
const defaults$1 = {
  src: "",
  delayMs: 0,
  onLoadingStatusChange: void 0
};
const createAvatar = (props) => {
  const withDefaults = { ...defaults$1, ...props };
  const options = toWritableStores(omit(withDefaults, "loadingStatus", "onLoadingStatusChange"));
  const { src, delayMs } = options;
  const loadingStatusWritable = withDefaults.loadingStatus ?? writable("loading");
  const loadingStatus = overridable(loadingStatusWritable, withDefaults?.onLoadingStatusChange);
  effect([src, delayMs], ([$src, $delayMs]) => {
    if (isBrowser) {
      const image2 = new Image();
      image2.src = $src;
      image2.onload = () => {
        if (delayMs !== void 0) {
          const timerId = window.setTimeout(() => {
            loadingStatus.set("loaded");
          }, $delayMs);
          return () => window.clearTimeout(timerId);
        } else {
          loadingStatus.set("loaded");
        }
      };
      image2.onerror = () => {
        loadingStatus.set("error");
      };
    }
  });
  const image = makeElement("avatar-image", {
    stores: [src, loadingStatus],
    returned: ([$src, $loadingStatus]) => {
      const imageStyles = styleToString({
        display: $loadingStatus === "loaded" ? "block" : "none"
      });
      return {
        src: $src,
        style: imageStyles
      };
    }
  });
  const fallback = makeElement("avatar-fallback", {
    stores: [loadingStatus],
    returned: ([$loadingStatus]) => {
      return {
        style: $loadingStatus === "loaded" ? styleToString({
          display: "none"
        }) : void 0,
        hidden: $loadingStatus === "loaded" ? true : void 0
      };
    }
  });
  return {
    elements: {
      image,
      fallback
    },
    states: {
      loadingStatus
    },
    options
  };
};
const { name } = createElHelpers("dialog");
const defaults = {
  preventScroll: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  role: "dialog",
  defaultOpen: false,
  portal: void 0,
  forceVisible: false,
  openFocus: void 0,
  closeFocus: void 0,
  onOutsideClick: void 0
};
const dialogIdParts = ["content", "title", "description"];
function createDialog(props) {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "ids"));
  const { preventScroll, closeOnEscape, closeOnOutsideClick, role, portal, forceVisible, openFocus, closeFocus, onOutsideClick } = options;
  const activeTrigger = withGet.writable(null);
  const ids = toWritableStores({
    ...generateIds(dialogIdParts),
    ...withDefaults.ids
  });
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const open = overridable(openWritable, withDefaults?.onOpenChange);
  const isVisible = derived([open, forceVisible], ([$open, $forceVisible]) => {
    return $open || $forceVisible;
  });
  let unsubScroll = noop;
  function handleOpen(e) {
    const el = e.currentTarget;
    const triggerEl = e.currentTarget;
    if (!isHTMLElement(el) || !isHTMLElement(triggerEl))
      return;
    open.set(true);
    activeTrigger.set(triggerEl);
  }
  function handleClose() {
    open.set(false);
    handleFocus({
      prop: closeFocus.get(),
      defaultEl: activeTrigger.get()
    });
  }
  const trigger = makeElement(name("trigger"), {
    stores: [open],
    returned: ([$open]) => {
      return {
        "aria-haspopup": "dialog",
        "aria-expanded": $open,
        type: "button"
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        handleOpen(e);
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        handleOpen(e);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const overlay = makeElement(name("overlay"), {
    stores: [isVisible, open],
    returned: ([$isVisible, $open]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        tabindex: -1,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        "aria-hidden": true,
        "data-state": $open ? "open" : "closed"
      };
    },
    action: (node) => {
      let unsubEscapeKeydown = noop;
      if (closeOnEscape.get()) {
        const escapeKeydown = useEscapeKeydown(node, {
          handler: () => {
            handleClose();
          }
        });
        if (escapeKeydown && escapeKeydown.destroy) {
          unsubEscapeKeydown = escapeKeydown.destroy;
        }
      }
      return {
        destroy() {
          unsubEscapeKeydown();
        }
      };
    }
  });
  const content = makeElement(name("content"), {
    stores: [isVisible, ids.content, ids.description, ids.title, open],
    returned: ([$isVisible, $contentId, $descriptionId, $titleId, $open]) => {
      return {
        id: $contentId,
        role: role.get(),
        "aria-describedby": $descriptionId,
        "aria-labelledby": $titleId,
        "aria-modal": $isVisible ? "true" : void 0,
        "data-state": $open ? "open" : "closed",
        tabindex: -1,
        hidden: $isVisible ? void 0 : true,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        })
      };
    },
    action: (node) => {
      let activate = noop;
      let deactivate = noop;
      const destroy = executeCallbacks(effect([open, closeOnOutsideClick, closeOnEscape], ([$open, $closeOnOutsideClick, $closeOnEscape]) => {
        if (!$open)
          return;
        const focusTrap = createFocusTrap({
          immediate: false,
          escapeDeactivates: $closeOnEscape,
          clickOutsideDeactivates: $closeOnOutsideClick,
          allowOutsideClick: true,
          returnFocusOnDeactivate: false,
          fallbackFocus: node
        });
        activate = focusTrap.activate;
        deactivate = focusTrap.deactivate;
        const ac = focusTrap.useFocusTrap(node);
        if (ac && ac.destroy) {
          return ac.destroy;
        } else {
          return focusTrap.deactivate;
        }
      }), effect([closeOnOutsideClick, open], ([$closeOnOutsideClick, $open]) => {
        return useModal(node, {
          open: $open,
          closeOnInteractOutside: $closeOnOutsideClick,
          onClose() {
            handleClose();
          },
          shouldCloseOnInteractOutside(e) {
            onOutsideClick.get()?.(e);
            if (e.defaultPrevented)
              return false;
            return true;
          }
        }).destroy;
      }), effect([closeOnEscape], ([$closeOnEscape]) => {
        if (!$closeOnEscape)
          return noop;
        return useEscapeKeydown(node, { handler: handleClose }).destroy;
      }), effect([isVisible], ([$isVisible]) => {
        tick().then(() => {
          if (!$isVisible) {
            deactivate();
          } else {
            activate();
          }
        });
      }));
      return {
        destroy: () => {
          unsubScroll();
          destroy();
        }
      };
    }
  });
  const portalled = makeElement(name("portalled"), {
    stores: portal,
    returned: ($portal) => ({
      "data-portal": portalAttr($portal)
    }),
    action: (node) => {
      const unsubPortal = effect([portal], ([$portal]) => {
        if ($portal === null)
          return noop;
        const portalDestination = getPortalDestination(node, $portal);
        if (portalDestination === null)
          return noop;
        return usePortal(node, portalDestination).destroy;
      });
      return {
        destroy() {
          unsubPortal();
        }
      };
    }
  });
  const title = makeElement(name("title"), {
    stores: [ids.title],
    returned: ([$titleId]) => ({
      id: $titleId
    })
  });
  const description = makeElement(name("description"), {
    stores: [ids.description],
    returned: ([$descriptionId]) => ({
      id: $descriptionId
    })
  });
  const close = makeElement(name("close"), {
    returned: () => ({
      type: "button"
    }),
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        handleClose();
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.SPACE && e.key !== kbd.ENTER)
          return;
        e.preventDefault();
        handleClose();
      }));
      return {
        destroy: unsub
      };
    }
  });
  effect([open, preventScroll], ([$open, $preventScroll]) => {
    if (!isBrowser)
      return;
    if ($preventScroll && $open)
      unsubScroll = removeScroll();
    if ($open) {
      const contentEl = document.getElementById(ids.content.get());
      handleFocus({ prop: openFocus.get(), defaultEl: contentEl });
    }
    return () => {
      if (!forceVisible.get()) {
        unsubScroll();
      }
    };
  });
  return {
    ids,
    elements: {
      content,
      trigger,
      title,
      description,
      overlay,
      close,
      portalled
    },
    states: {
      open
    },
    options
  };
}
function getAvatarData() {
  const NAME = "avatar";
  const PARTS = ["root", "image", "fallback"];
  return {
    NAME,
    PARTS
  };
}
function setCtx$1(props) {
  const { NAME, PARTS } = getAvatarData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const avatar = { ...createAvatar(removeUndefined(props)), getAttrs };
  setContext(NAME, avatar);
  return {
    ...avatar,
    updateOption: getOptionUpdater(avatar.options)
  };
}
function getImage(src = "") {
  const { NAME } = getAvatarData();
  const avatar = getContext(NAME);
  if (!src) {
    avatar.options.src.set("");
  } else {
    avatar.options.src.set(src);
  }
  return avatar;
}
function getCtx$1() {
  const { NAME } = getAvatarData();
  return getContext(NAME);
}
const Avatar$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["delayMs", "loadingStatus", "onLoadingStatusChange", "asChild", "el"]);
  let { delayMs = void 0 } = $$props;
  let { loadingStatus = void 0 } = $$props;
  let { onLoadingStatusChange = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { states: { loadingStatus: localLoadingStatus }, updateOption, getAttrs } = setCtx$1({
    src: "",
    delayMs,
    onLoadingStatusChange: ({ next }) => {
      loadingStatus = next;
      onLoadingStatusChange?.(next);
      return next;
    }
  });
  const attrs = getAttrs("root");
  if ($$props.delayMs === void 0 && $$bindings.delayMs && delayMs !== void 0) $$bindings.delayMs(delayMs);
  if ($$props.loadingStatus === void 0 && $$bindings.loadingStatus && loadingStatus !== void 0) $$bindings.loadingStatus(loadingStatus);
  if ($$props.onLoadingStatusChange === void 0 && $$bindings.onLoadingStatusChange && onLoadingStatusChange !== void 0) $$bindings.onLoadingStatusChange(onLoadingStatusChange);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  loadingStatus !== void 0 && localLoadingStatus.set(loadingStatus);
  {
    updateOption("delayMs", delayMs);
  }
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<div${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ attrs }) : ``}</div>`}`;
});
const Avatar_image$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let image;
  let builder;
  let $$restProps = compute_rest_props($$props, ["src", "alt", "asChild", "el"]);
  let $image, $$unsubscribe_image = noop$1, $$subscribe_image = () => ($$unsubscribe_image(), $$unsubscribe_image = subscribe(image, ($$value) => $image = $$value), image);
  let { src = void 0 } = $$props;
  let { alt = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const attrs = { "data-bits-avatar-image": "" };
  if ($$props.src === void 0 && $$bindings.src && src !== void 0) $$bindings.src(src);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0) $$bindings.alt(alt);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  $$subscribe_image(image = getImage(src).elements.image);
  builder = $image;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_image();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<img${spread(
    [
      escape_object(builder),
      { alt: escape_attribute_value(alt) },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("this", el, 0)}>`}`;
});
const Avatar_fallback$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $fallback, $$unsubscribe_fallback;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { fallback }, getAttrs } = getCtx$1();
  $$unsubscribe_fallback = subscribe(fallback, (value) => $fallback = value);
  const attrs = getAttrs("fallback");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $fallback;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_fallback();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<span${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</span>`}`;
});
function getDialogData() {
  const NAME = "dialog";
  const PARTS = [
    "close",
    "content",
    "description",
    "overlay",
    "portal",
    "title",
    "trigger"
  ];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getDialogData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const dialog = {
    ...createDialog({ ...removeUndefined(props), role: "dialog", forceVisible: true }),
    getAttrs
  };
  setContext(NAME, dialog);
  return {
    ...dialog,
    updateOption: getOptionUpdater(dialog.options)
  };
}
function getCtx() {
  const { NAME } = getDialogData();
  return getContext(NAME);
}
const Dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $idValues, $$unsubscribe_idValues;
  let { preventScroll = void 0 } = $$props;
  let { closeOnEscape = void 0 } = $$props;
  let { closeOnOutsideClick = void 0 } = $$props;
  let { portal = void 0 } = $$props;
  let { open = void 0 } = $$props;
  let { onOpenChange = void 0 } = $$props;
  let { openFocus = void 0 } = $$props;
  let { closeFocus = void 0 } = $$props;
  let { onOutsideClick = void 0 } = $$props;
  const { states: { open: localOpen }, updateOption, ids } = setCtx({
    closeOnEscape,
    preventScroll,
    closeOnOutsideClick,
    portal,
    forceVisible: true,
    defaultOpen: open,
    openFocus,
    closeFocus,
    onOutsideClick,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    }
  });
  const idValues = derived([ids.content, ids.description, ids.title], ([$contentId, $descriptionId, $titleId]) => ({
    content: $contentId,
    description: $descriptionId,
    title: $titleId
  }));
  $$unsubscribe_idValues = subscribe(idValues, (value) => $idValues = value);
  if ($$props.preventScroll === void 0 && $$bindings.preventScroll && preventScroll !== void 0) $$bindings.preventScroll(preventScroll);
  if ($$props.closeOnEscape === void 0 && $$bindings.closeOnEscape && closeOnEscape !== void 0) $$bindings.closeOnEscape(closeOnEscape);
  if ($$props.closeOnOutsideClick === void 0 && $$bindings.closeOnOutsideClick && closeOnOutsideClick !== void 0) $$bindings.closeOnOutsideClick(closeOnOutsideClick);
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0) $$bindings.portal(portal);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.onOpenChange === void 0 && $$bindings.onOpenChange && onOpenChange !== void 0) $$bindings.onOpenChange(onOpenChange);
  if ($$props.openFocus === void 0 && $$bindings.openFocus && openFocus !== void 0) $$bindings.openFocus(openFocus);
  if ($$props.closeFocus === void 0 && $$bindings.closeFocus && closeFocus !== void 0) $$bindings.closeFocus(closeFocus);
  if ($$props.onOutsideClick === void 0 && $$bindings.onOutsideClick && onOutsideClick !== void 0) $$bindings.onOutsideClick(onOutsideClick);
  open !== void 0 && localOpen.set(open);
  {
    updateOption("preventScroll", preventScroll);
  }
  {
    updateOption("closeOnEscape", closeOnEscape);
  }
  {
    updateOption("closeOnOutsideClick", closeOnOutsideClick);
  }
  {
    updateOption("portal", portal);
  }
  {
    updateOption("openFocus", openFocus);
  }
  {
    updateOption("closeFocus", closeFocus);
  }
  {
    updateOption("onOutsideClick", onOutsideClick);
  }
  $$unsubscribe_idValues();
  return `${slots.default ? slots.default({ ids: $idValues }) : ``}`;
});
const Dialog_title$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["level", "asChild", "id", "el"]);
  let $title, $$unsubscribe_title;
  let { level = "h2" } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { title }, ids, getAttrs } = getCtx();
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  const attrs = getAttrs("title");
  if ($$props.level === void 0 && $$bindings.level && level !== void 0) $$bindings.level(level);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.title.set(id);
    }
  }
  builder = $title;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_title();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `${((tag) => {
    return tag ? `<${level}${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({ builder }) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(level)}`}`;
});
const Dialog_close = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $close, $$unsubscribe_close;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { close }, getAttrs } = getCtx();
  $$unsubscribe_close = subscribe(close, (value) => $close = value);
  createDispatcher();
  const attrs = getAttrs("close");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $close;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_close();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const Dialog_portal$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $portalled, $$unsubscribe_portalled;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { portalled }, getAttrs } = getCtx();
  $$unsubscribe_portalled = subscribe(portalled, (value) => $portalled = value);
  const attrs = getAttrs("portal");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $portalled;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_portalled();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Dialog_content$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "id",
    "el"
  ]);
  let $content, $$unsubscribe_content;
  let $open, $$unsubscribe_open;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { content }, states: { open }, ids, getAttrs } = getCtx();
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  const attrs = getAttrs("content");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0) $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0) $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0) $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0) $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.content.set(id);
    }
  }
  builder = $content;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_content();
  $$unsubscribe_open();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${$open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Dialog_overlay$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "el"
  ]);
  let $overlay, $$unsubscribe_overlay;
  let $open, $$unsubscribe_open;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { overlay }, states: { open }, getAttrs } = getCtx();
  $$unsubscribe_overlay = subscribe(overlay, (value) => $overlay = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  const attrs = getAttrs("overlay");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0) $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0) $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0) $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0) $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $overlay;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_overlay();
  $$unsubscribe_open();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : `${inTransition && outTransition && $open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : `${inTransition && $open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : `${outTransition && $open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : `${$open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : ``}`}`}`}`}`}`;
});
const Dialog_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $trigger, $$unsubscribe_trigger;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { trigger }, getAttrs } = getCtx();
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  createDispatcher();
  const attrs = getAttrs("trigger");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $trigger;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_trigger();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const css$1 = {
  code: ".badge-item.svelte-iyr9ai.svelte-iyr9ai{position:relative;display:inline-flex;align-items:stretch;flex-wrap:wrap;border-radius:2px;overflow:hidden}.badge-icon.svelte-iyr9ai.svelte-iyr9ai{width:14px;height:14px}.badge-item.svelte-iyr9ai>div.svelte-iyr9ai{display:inline-flex;align-items:center;justify-content:center;font-size:11px;padding:1px 5px}.badge-item.sm.svelte-iyr9ai>div.svelte-iyr9ai{font-size:10px;padding:0px 5px}",
  map: `{"version":3,"file":"Badge.svelte","sources":["Badge.svelte"],"sourcesContent":["<script lang='ts'>export let type = \\"\\";\\nexport let icon = \\"\\";\\nexport let iconClass = \\"\\";\\nexport let rightClass = \\"bg-neutral\\";\\nexport let size = \\"md\\";\\n<\/script>\\n\\n\\n<div class='badge-item bg-muted/50 {size}'>\\n  {#if type || icon}\\n  <div class='bg-muted'>\\n    {#if type==='gender'}\\n    <svg xmlns=\\"http://www.w3.org/2000/svg\\" class=\\"badge-icon {iconClass}\\" viewBox=\\"0 0 24 24\\" stroke-width=\\"2\\" stroke=\\"currentColor\\" fill=\\"none\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n      <path stroke=\\"none\\" d=\\"M0 0h24v24H0z\\" fill=\\"none\\"></path>\\n      <path d=\\"M10 14m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0\\"></path>\\n      <path d=\\"M19 5l-5.4 5.4\\"></path>\\n      <path d=\\"M19 5h-5\\"></path>\\n      <path d=\\"M19 5v5\\"></path>\\n    </svg>\\n    {/if}\\n    {#if type==='mail'}\\n    <svg xmlns=\\"http://www.w3.org/2000/svg\\" class=\\"badge-icon {iconClass}\\" viewBox=\\"0 0 24 24\\" stroke-width=\\"2\\" stroke=\\"currentColor\\" fill=\\"none\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n      <path stroke=\\"none\\" d=\\"M0 0h24v24H0z\\" fill=\\"none\\"></path>\\n      <path d=\\"M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z\\"></path>\\n      <path d=\\"M3 7l9 6l9 -6\\"></path>\\n    </svg>\\n    {/if}\\n    {#if type==='phone'}\\n    <svg xmlns=\\"http://www.w3.org/2000/svg\\" class=\\"badge-icon {iconClass}\\" viewBox=\\"0 0 24 24\\" stroke-width=\\"2\\" stroke=\\"currentColor\\" fill=\\"none\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n      <path stroke=\\"none\\" d=\\"M0 0h24v24H0z\\" fill=\\"none\\"></path>\\n      <path d=\\"M6 3h8.5l4.5 4.5v12.5a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1v-16a1 1 0 0 1 1 -1z\\"></path>\\n      <path d=\\"M9 11h3v6\\"></path>\\n      <path d=\\"M15 17v.01\\"></path>\\n      <path d=\\"M15 14v.01\\"></path>\\n      <path d=\\"M15 11v.01\\"></path>\\n      <path d=\\"M9 14v.01\\"></path>\\n      <path d=\\"M9 17v.01\\"></path>\\n    </svg>\\n    {/if}\\n    {#if type==='website'}\\n    <svg xmlns=\\"http://www.w3.org/2000/svg\\" class=\\"badge-icon {iconClass}\\" viewBox=\\"0 0 24 24\\" stroke-width=\\"2\\" stroke=\\"currentColor\\" fill=\\"none\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n      <path stroke=\\"none\\" d=\\"M0 0h24v24H0z\\" fill=\\"none\\"></path>\\n      <path d=\\"M19.5 7a9 9 0 0 0 -7.5 -4a8.991 8.991 0 0 0 -7.484 4\\"></path>\\n      <path d=\\"M11.5 3a16.989 16.989 0 0 0 -1.826 4\\"></path>\\n      <path d=\\"M12.5 3a16.989 16.989 0 0 1 1.828 4\\"></path>\\n      <path d=\\"M19.5 17a9 9 0 0 1 -7.5 4a8.991 8.991 0 0 1 -7.484 -4\\"></path>\\n      <path d=\\"M11.5 21a16.989 16.989 0 0 1 -1.826 -4\\"></path>\\n      <path d=\\"M12.5 21a16.989 16.989 0 0 0 1.828 -4\\"></path>\\n      <path d=\\"M2 10l1 4l1.5 -4l1.5 4l1 -4\\"></path>\\n      <path d=\\"M17 10l1 4l1.5 -4l1.5 4l1 -4\\"></path>\\n      <path d=\\"M9.5 10l1 4l1.5 -4l1.5 4l1 -4\\"></path>\\n    </svg>\\n    {/if}\\n    {#if type==='link'}\\n    <svg xmlns=\\"http://www.w3.org/2000/svg\\" class=\\"badge-icon {iconClass}\\" viewBox=\\"0 0 24 24\\" stroke-width=\\"2\\" stroke=\\"currentColor\\" fill=\\"none\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">\\n      <path stroke=\\"none\\" d=\\"M0 0h24v24H0z\\" fill=\\"none\\"></path>\\n      <path d=\\"M9 15l6 -6\\"></path>\\n      <path d=\\"M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464\\"></path>\\n      <path d=\\"M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463\\"></path>\\n    </svg>\\n    {/if}\\n\\n    {#if type===''}\\n      <span class={iconClass}>{icon}</span>\\n    {/if}\\n  </div>\\n  {/if}\\n\\n  <div class='text-white min-w-[30px] {rightClass}'>\\n    <slot />\\n  </div>\\n</div>\\n\\n\\n<style>\\n  .badge-item {\\n    position: relative;display: inline-flex;\\n    align-items: stretch;\\n    flex-wrap: wrap;\\n    border-radius: 2px;overflow: hidden;\\n  }\\n  .badge-icon {\\n    width: 14px;height: 14px;\\n  }\\n  .badge-item > div {\\n    display: inline-flex;\\n    align-items: center;justify-content: center;\\n    font-size: 11px;padding: 1px 5px;\\n  }\\n  .badge-item.sm > div {\\n    font-size: 10px;padding: 0px 5px;\\n  }\\n</style>"],"names":[],"mappings":"AA2EE,uCAAY,CACV,QAAQ,CAAE,QAAQ,CAAC,OAAO,CAAE,WAAW,CACvC,WAAW,CAAE,OAAO,CACpB,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,GAAG,CAAC,QAAQ,CAAE,MAC/B,CACA,uCAAY,CACV,KAAK,CAAE,IAAI,CAAC,MAAM,CAAE,IACtB,CACA,yBAAW,CAAG,iBAAI,CAChB,OAAO,CAAE,WAAW,CACpB,WAAW,CAAE,MAAM,CAAC,eAAe,CAAE,MAAM,CAC3C,SAAS,CAAE,IAAI,CAAC,OAAO,CAAE,GAAG,CAAC,GAC/B,CACA,WAAW,iBAAG,CAAG,iBAAI,CACnB,SAAS,CAAE,IAAI,CAAC,OAAO,CAAE,GAAG,CAAC,GAC/B"}`
};
const Badge$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type = "" } = $$props;
  let { icon = "" } = $$props;
  let { iconClass = "" } = $$props;
  let { rightClass = "bg-neutral" } = $$props;
  let { size = "md" } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.iconClass === void 0 && $$bindings.iconClass && iconClass !== void 0) $$bindings.iconClass(iconClass);
  if ($$props.rightClass === void 0 && $$bindings.rightClass && rightClass !== void 0) $$bindings.rightClass(rightClass);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  $$result.css.add(css$1);
  return `<div class="${"badge-item bg-muted/50 " + escape(size, true) + " svelte-iyr9ai"}">${type || icon ? `<div class="bg-muted svelte-iyr9ai">${type === "gender" ? `<svg xmlns="http://www.w3.org/2000/svg" class="${"badge-icon " + escape(iconClass, true) + " svelte-iyr9ai"}" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10 14m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0"></path><path d="M19 5l-5.4 5.4"></path><path d="M19 5h-5"></path><path d="M19 5v5"></path></svg>` : ``} ${type === "mail" ? `<svg xmlns="http://www.w3.org/2000/svg" class="${"badge-icon " + escape(iconClass, true) + " svelte-iyr9ai"}" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path><path d="M3 7l9 6l9 -6"></path></svg>` : ``} ${type === "phone" ? `<svg xmlns="http://www.w3.org/2000/svg" class="${"badge-icon " + escape(iconClass, true) + " svelte-iyr9ai"}" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6 3h8.5l4.5 4.5v12.5a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1v-16a1 1 0 0 1 1 -1z"></path><path d="M9 11h3v6"></path><path d="M15 17v.01"></path><path d="M15 14v.01"></path><path d="M15 11v.01"></path><path d="M9 14v.01"></path><path d="M9 17v.01"></path></svg>` : ``} ${type === "website" ? `<svg xmlns="http://www.w3.org/2000/svg" class="${"badge-icon " + escape(iconClass, true) + " svelte-iyr9ai"}" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M19.5 7a9 9 0 0 0 -7.5 -4a8.991 8.991 0 0 0 -7.484 4"></path><path d="M11.5 3a16.989 16.989 0 0 0 -1.826 4"></path><path d="M12.5 3a16.989 16.989 0 0 1 1.828 4"></path><path d="M19.5 17a9 9 0 0 1 -7.5 4a8.991 8.991 0 0 1 -7.484 -4"></path><path d="M11.5 21a16.989 16.989 0 0 1 -1.826 -4"></path><path d="M12.5 21a16.989 16.989 0 0 0 1.828 -4"></path><path d="M2 10l1 4l1.5 -4l1.5 4l1 -4"></path><path d="M17 10l1 4l1.5 -4l1.5 4l1 -4"></path><path d="M9.5 10l1 4l1.5 -4l1.5 4l1 -4"></path></svg>` : ``} ${type === "link" ? `<svg xmlns="http://www.w3.org/2000/svg" class="${"badge-icon " + escape(iconClass, true) + " svelte-iyr9ai"}" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 15l6 -6"></path><path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464"></path><path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"></path></svg>` : ``} ${type === "" ? `<span class="${escape(null_to_empty(iconClass), true) + " svelte-iyr9ai"}">${escape(icon)}</span>` : ``}</div>` : ``} <div class="${"text-white min-w-[30px] " + escape(rightClass, true) + " svelte-iyr9ai"}">${slots.default ? slots.default({}) : ``}</div> </div>`;
});
const EmploymentListData = [
  {
    id: "gxz-studio",
    name: "荣昌区甘小蔗网络技术工作室",
    location: "重庆, 中国",
    role: "CEO / CTO",
    created_at: "2020-03-16",
    finished_at: "2022-03-03",
    supports: [
      { type: "image", value: "license.jpg", imageSize: { width: 1835, height: 1280 } }
    ]
  },
  {
    id: "unknown",
    name: "***",
    location: "",
    role: "保密需要该经历不可见",
    created_at: "2020-05",
    finished_at: "2021-05"
  },
  {
    id: "metau",
    name: "广西迈特优科技发展有限公司",
    location: "远程工作",
    role: "CTO",
    created_at: "2021-05",
    finished_at: "2021-10"
  },
  {
    id: "metauit",
    name: "广州启探科技有限公司",
    location: "远程工作",
    role: "CTO",
    created_at: "2021-11",
    supports: [
      { type: "image", value: "contract-cto.jpg", imageSize: { width: 1090, height: 1541 } }
    ]
  },
  {
    id: "fumukeji",
    name: "重庆浮木科技有限公司",
    location: "重庆, 中国",
    role: "CEO / CTO",
    created_at: "2021-12-14",
    supports: [
      { type: "image", value: "license.jpg", imageSize: { width: 1879, height: 1280 } }
    ]
  }
];
const ProjectListData = [
  {
    id: "svelte-chat-dev",
    title: "边缘苗圃 - Edge Nursery",
    url: "https://edgenursery.com/",
    keywords: ["智慧农业", "物联网", "Serverless", "Node.js", "Svelte", "AI"],
    created_at: "2024-04-23",
    contents: [
      { key: "背景", value: "现有智慧农业系统面临两大主要挑战：集中式云平台架构难以应对海量设备数据，导致性能问题和高成本；系统模块高度耦合、界面兼容性差，加上农民技术水平有限，影响决策效率和生产计划执行。" },
      { key: "目标", value: "基于 Serverless 实现 AIoT 平台，通过边缘计算和 AI 技术，实现设备数据的高效处理和实时分析，降低成本并提高决策效率。" },
      { key: "行动", value: "Cloudflare Pub/Sub、Cloudflare Workers&Pages、Cloudflare R2、Timescale Cloud、Anthropic Claude 3" },
      { key: "结果", value: "系统通过边缘计算解决了海量数据承载局限性、成本高昂、可扩展性低等痛点；通过数字模型可智能调度设备，保证植株处于最佳环境，并自动处理已知风险。同时，借助强大的 LLMs 模型，可自动处理未知风险，并助力人员管理。" }
    ]
  },
  {
    id: "svelte-chat-dev",
    title: "Svelte Chat Dev",
    url: "https://chatdev.gxzv.com/apps/chat?code=resumeg0Z2",
    keywords: ["Serverless", "自研框架", "Node.js", "Svelte", "AI"],
    created_at: "2023-06-09",
    contents: [
      { key: "背景", value: "这是一个正在开发中的项目。" },
      { key: "目标", value: "用于人工智能应用开发的 TypeScript 框架，致力于构建 AI-powered 超级生产力工具。" },
      { key: "行动", value: "采用模块化设计，分为 Chat layer、Agents layer、Tools layer、Plugins layer、Data layer、Docs layer 以及应用层。<br/>当前基于流式语音合成技术，初步实现了实时对话功能。" }
    ]
  },
  {
    id: "enneatao",
    priority: 1,
    title: "EnneaTao - 人格九道",
    icon: "/icons/enneatao.png",
    url: "https://enneatao.com/",
    keywords: ["独立项目", "心理健康", "Serverless", "Webman", "Node.js", "Svelte", "Redis", "MySQL"],
    created_at: "2023-06-01",
    contents: [
      { key: "背景", value: "一直以来，传统心理健康服务资源不充足、分布不均衡。同时，Z 时代在焦虑不断下追求共鸣与身份认同。" },
      { key: "目标", value: "基于消费者当今的底层诉求，即个体去丧，提供超越性的解决方案，帮助人们更好地了解自己。" },
      { key: "行动", value: "基于 Enneagram 理论学说打造数字化产品，帮助人们实现自我探索与身份认同的精神需求。<br/>通过表达性书写等心理治疗技术以及 AI 大模型引导，帮助用户成长、进步与追求希望地自我超越。" }
    ]
  },
  {
    id: "pagpt",
    title: "PA GPT - 推文自动化生成工具",
    keywords: ["AIGC", "外包", "客户端", "营销推广", "爬虫", "自动化", "Python", "Node.js", "Svelte"],
    created_at: "2023-10-07",
    finished_at: "2023-10-20",
    contents: [
      { key: "背景", value: "传统业务流程中，需要大量人工检索商品、分析卖点、撰写推文，每条推文人力成本为 5～20 元不等。" },
      { key: "目标", value: "抹平人力成本，将传统流程自动化。" },
      { key: "行动", value: "借助提示工程或 fine-tuning 技术完成普通或复杂推文撰写任务，<br/>通过程序化构建上下文，依靠关键词检索各大平台商品，指定标题后即可生成长推文。" },
      { key: "结果", value: "使用该工具生成的推文质量比人工撰写更加稳定，内容重复率从 39% 降至 7%；成本降低 1,724%～6,896%，每条仅需 0.3 元，保守估计每人效率提升 2,000% 以上。" }
    ],
    supports: [
      { type: "image", value: "contract.jpg", imageSize: { width: 1200, height: 1554 } },
      { type: "image", value: "contract-evidence-a.jpg", imageSize: { width: 1200, height: 1698 } },
      { type: "image", value: "contract-evidence-b.jpg", imageSize: { width: 1200, height: 1698 } }
    ]
  },
  {
    id: "iot-modular-pc",
    title: "工业物联网模块化上位机",
    keywords: ["工控", "大前端", "客户端", "物联网", "Node.js", "Svelte", "Flutter"],
    created_at: "2023-06-20",
    updated_at: "2023-08-01",
    contents: [
      { key: "背景", value: "在现目前上位机普遍对性能要求不高的情况下，同时存在界面简陋、可视化效果差、开发效率低等问题。" },
      { key: "目标", value: "利用大前端技术改善显示界面、UI 及交互，实现跨平台。控件模块化设计，可根据业务场景快速定制界面。" },
      { key: "行动", value: "SvelteKit + Electron 技术开发跨平台应用，Node.js 实现串口、MQTT 通信，Web Components 模块化。" },
      { key: "结果", value: "较传统开发效率提升 400%，受多家电子产品研发企业认可。已配套工业级产品发售，客户满意度 96%。" }
    ],
    supports: [
      { type: "image", value: "contract.jpg", imageSize: { width: 1200, height: 1553 } },
      { type: "image", value: "client-1.jpg", imageSize: { width: 1200, height: 1800 } }
    ]
  },
  {
    id: "metauit",
    title: "MetaUIT - 元优联：全国科技爱好者共同的社区",
    icon: "/icons/metauit.jpg",
    url: "https://metauit.com/",
    keywords: ["SaaS", "API", "平台", "社区", "支付", "物联网", "Node.js", "Svelte", "PHP", "Webman", "Redis", "MySQL"],
    created_at: "2023-04-12",
    updated_at: "2023-08-04",
    contents: [
      { key: "背景", value: "元优联是全国科技爱好者共同的社区，致力为科研人员及创作者提供高效且全面的基础服务生态。" },
      { key: "目标", value: "打造学术型专家平台，致力于软件、硬件、互联网、新材料、人工智能等方面的 QA 及帮助。" },
      { key: "行动", value: "开发账户系统、统一登录、开放平台、支付系统等，基于 OAuth 2 接入第三方应用数 100+。" }
    ],
    owned_by: {
      company: "广州启探科技有限公司",
      role: "首席技术官",
      created_at: "2021-11"
    },
    supports: [
      { type: "image", value: "metauit.com.jpg", imageSize: { width: 1200, height: 1608 } }
    ]
  },
  {
    id: "taobor",
    title: "Taobor - 淘宝商品信息采集",
    url: "https://chromewebstore.google.com/detail/taobor-%E6%B7%98%E5%AE%9D%E5%95%86%E5%93%81%E4%BF%A1%E6%81%AF%E6%8A%93%E5%8F%96/kgkndlpgecddjehgpcfjjnefbmcfamol",
    keywords: ["Chrome 插件", "爬虫", "Node.js", "Svelte"],
    created_at: "2023-03-21",
    contents: [
      { key: "介绍", value: "基于 SvelteKit 开发的 Chrome 浏览器拓展程序，可以采集淘宝商品的详情信息。" }
    ]
  },
  {
    id: "llms-api",
    title: "大型语言模型聚合 API 服务",
    url: "https://metor-api.metauit.com",
    keywords: ["AIGC", "SaaS", "API", "Serverless", "Node.js", "Svelte"],
    created_at: "2023-02-13",
    updated_at: "2023-09-17",
    contents: [
      { key: "背景", value: "自 ChatGPT 爆火后的几个月里，如何在境内提供稳定的服务一直存在问题。" },
      { key: "目标", value: "提供稳定的代理服务，附加角色预设、图表绘制、RAG 知识召回等功能。" },
      { key: "行动", value: "GPT-3.5 没开放 API 之前，从反向代理服务器绕过 Cloudflare，依靠 session 与 OpenAI 后端服务对话。<br/>OpenAI API 开放后，通过境外服务器节点直接调用。基于提示工程实现角色预设，Mermaid 语法实现图表绘制。然而随着用户激增，境外节点群无法支撑大量并发。经过技术选型后我开始重构代码，将中台服务迁移至 Cloudflare 边缘网络，聚合 12 余种 LLMs，并基于自有 SaaS 提供 API。" }
    ],
    owned_by: {
      company: "广州启探科技有限公司",
      role: "首席技术官",
      created_at: "2021-11"
    },
    supports: [
      { type: "image", value: "/projects/metauit/metauit.com.jpg", imageSize: { width: 1200, height: 1608 } },
      { type: "image", value: "web-1.jpg", imageSize: { width: 1360, height: 2002 } },
      { type: "image", value: "metor-ability.jpg", imageSize: { width: 1200, height: 1800 } }
    ]
  },
  {
    id: "gpeg",
    title: "GPEG 九型人格测试系统",
    url: "https://gxzv.com/know-yourself/enneagram/",
    keywords: ["心理测试", "产品", "支付", "JS", "PHP", "Redis", "MySQL"],
    created_at: "2022-04-05",
    //finished_at: '2022-04-19',
    updated_at: "2022-09-16",
    contents: [
      { key: "背景", value: "MBTI 的爆火让我更加相信在人类历史发展长河中，我们已渐渐开始从物质文明转为精神文明建设。" },
      { key: "目标", value: "利用九型人格理论开发在线测试及分析评估系统，帮助用户了解内在自我，促进心理成长和自我发展。" },
      { key: "结果", value: "2023 年中旬近 30 天内测试人数超 2.8 万人，消费额达 1.7 万元。在 413 位用户反馈中，评分高达 98%。" }
    ],
    supports: [
      { type: "image", value: "gxzv.com.jpg", imageSize: { width: 1184, height: 1794 } },
      { type: "image", value: "web-1.jpg", imageSize: { width: 1200, height: 1800 } }
    ]
  },
  {
    id: "5axismfg",
    title: "深圳市星凯科技有限公司官网",
    icon: "/icons/5axismfg.jpg",
    url: "https://5axismfg.cn/",
    keywords: ["企业官网", "外包", "重工制造", "CMS", "H5", "JS", "PHP", "Redis", "MySQL"],
    created_at: "2022-03-23",
    finished_at: "2022-04-20",
    contents: [
      { key: "背景", value: "其公司官网面临到期，且界面与功能老旧，现需开发新网站并私有部署。" },
      { key: "行动", value: "该项目前后端均使用自研框架 gQuery 进行开发，成功将开发时间从 45 天缩短至 29 天。<br/>由于旧站点到期，内容无法正常迁移，我通过 Node.js 快速实现爬虫程序，将数据完美迁移至新站点。" }
    ],
    supports: [
      { type: "image", value: "contract.jpg", imageSize: { width: 1200, height: 1553 } },
      { type: "image", value: "web-1.jpg", imageSize: { width: 1200, height: 2173 } },
      { type: "image", value: "web-3.jpg", imageSize: { width: 1200, height: 2173 } }
    ]
  },
  {
    id: "nonoerp",
    title: "NONOERP: 电商 ERP 辅助软件",
    icon: "/icons/nonoerp.jpg",
    url: "https://nonoerp.com/",
    keywords: ["电商", "外包", "大前端", "爬虫", "自动化", "Node.js", "NW.js"],
    created_at: "2022-01-18",
    finished_at: "2022-02-13",
    contents: [
      { key: "背景", value: "传统代发流程中，商家在 A 平台寻找低价货源，在 B 平台以高价挂售。<br/>但对于复杂的商品信息，每个商品平均耗时长达半小时，费时费力。" },
      { key: "目标", value: "多平台多商铺商品信息采集，一键批量上货，实时库存维护。" },
      { key: "结果", value: "甲方团队通过该软件，将先前每件商品 30 分钟的工作时长缩减至 2 分钟。<br/>次月商户号累计销售额达 43 万，相较使用前提升了 1,075%。" }
    ],
    supports: [
      { type: "image", value: "nonoerp.com.jpg", imageSize: { width: 1184, height: 1794 } },
      { type: "image", value: "web-n-client.jpg", imageSize: { width: 1200, height: 1800 } }
    ]
  },
  {
    id: "express-tracking",
    title: "快递单号智能录入系统",
    url: "https://lilei.gquery.cn/",
    keywords: ["电商", "外包", "自动化", "H5", "JS", "PHP", "Redis", "MySQL"],
    created_at: "2021-12-20",
    finished_at: "2022-01-03",
    updated_at: "2022-08-23",
    contents: [
      { key: "目标", value: "通过在线平台聚合全国各地分销商提交的单号信息，并与系统信息进行匹配。" },
      { key: "行动", value: "平台完全基于 gQuery 与 gQueryPHP 进行开发，开发效率提升的同时稳健性也得到增强。" },
      { key: "结果", value: "自 2022 年 8 月到 2023 年 10 月以来，该平台运行稳定，SLA 服务可用性 100%。<br/>数据上，系统处理 Excel 表格单号 266,462 条，总计金额 445,708,248 元。" }
    ],
    supports: [
      { type: "image", value: "contract.jpg", imageSize: { width: 1200, height: 1553 } },
      { type: "image", value: "contract-evidence-a.jpg", imageSize: { width: 1200, height: 1698 } },
      { type: "image", value: "contract-evidence-b.jpg", imageSize: { width: 1200, height: 1698 } }
    ]
  },
  {
    id: "nmgcy",
    title: "广西农民工创业联盟",
    icon: "/icons/nmgcy.jpg",
    url: "https://nmg.gxrcpx.com/",
    keywords: ["平台", "外包", "小程序", "CMS", "JS", "Java", "SpringBoot", "Redis", "MySQL"],
    created_at: "2021-07-11",
    finished_at: "2021-09-30",
    contents: [
      { key: "目标", value: "邀约农民工申报创业项目，指导专家入驻平台提供技术支持、素质培训等能力提升帮扶，提高创业成功率。" },
      { key: "行动", value: "独立负责系统程序开发，基于 gQuery 框架开发网站，Java SpringBoot 后端以及原生小程序。<br/>基于 WebSocket 自主实现 IM 实时聊天模块，站内外智能通知确保消息被及时查阅。" }
    ],
    owned_by: {
      company: "广西迈特优科技发展有限公司",
      role: "首席技术官",
      created_at: "2021-05"
    },
    supports: [
      { type: "image", value: "web-1.jpg", imageSize: { width: 1200, height: 1800 } },
      { type: "image", value: "doc-1.jpg", imageSize: { width: 1200, height: 1800 } },
      { type: "image", value: "visual-effect.jpg", imageSize: { width: 1200, height: 1800 } }
    ]
  },
  {
    id: "astrokitty",
    title: "Astrokitties: BSC-BNB 反射币",
    icon: "/icons/astrokitty.jpg",
    keywords: ["Crypto", "Web3", "区块链", "Node.js", "Redis"],
    created_at: "2021-07-03",
    finished_at: "2021-09-10",
    contents: [
      { key: "角色", value: "任 Astrokitties (AK Token) 大中华区管理员，负责布道及官网开发。" },
      { key: "背景", value: "AK Token 是币安智能链 (BSC) 上自动 BNB 收益合约的首批先行者，在购买代币并持有后，每 30 分钟钱包中就会自动收到 BNB 奖励，无需任何操作。" }
    ]
  },
  {
    id: "chiau",
    title: "Chia | ChiauFarm - 多功能可视化挖矿程序",
    icon: "/icons/chiau.jpg",
    url: "https://chiau.net/farm/",
    keywords: ["Crypto", "大前端", "自动化", "客户端", "Node.js", "NW.js", "Redis"],
    created_at: "2021-05-13",
    finished_at: "2021-06-08",
    contents: [
      { key: "结果", value: "作为 Chia Token 首个公开的多功能可视化自动耕种挖矿客户端，实现了多账户隔离、无服务器、代耕系统、操作自动化，并逆向实现稳定可靠的进度算法，发布后一周内下载量达 3,000 余次，效率提升39%。" }
    ],
    supports: [
      { type: "image", value: "client-1.jpg", imageSize: { width: 1200, height: 1800 } },
      { type: "image", value: "client-2.jpg", imageSize: { width: 1200, height: 1800 } }
    ]
  },
  {
    id: "panzhihua",
    title: "英雄攀枝花 阳光康养地",
    icon: "/icons/panzhihua.jpg",
    url: "https://panzhihua.live/",
    keywords: ["文创", "比赛", "H5", "JS"],
    created_at: "2020-11-25",
    finished_at: "2020-12-21",
    contents: [
      { key: "背景", value: "由中共攀枝花市人民政府主办，文创设计大赛项目。" },
      { key: "行动", value: "创建文旅专题网站，使用自研 gQuery 框架开发，H5 自适应。" }
    ],
    supports: [
      { type: "image", value: "panzhihua.live.jpg", imageSize: { width: 1184, height: 1794 } },
      { type: "image", value: "web-1.jpg", imageSize: { width: 1200, height: 1800 } },
      { type: "image", value: "web-2.jpg", imageSize: { width: 1200, height: 1800 } }
    ]
  },
  {
    id: "ajufood",
    title: "阿具食品有限公司官网",
    icon: "/icons/ajufood.jpg",
    url: "https://www.ajufood.cn/",
    keywords: ["企业官网", "食品", "快消品", "H5", "JS", "PHP", "Redis", "MySQL"],
    created_at: "2020-10-24",
    updated_at: "2022-05-31",
    supports: [
      { type: "image", value: "ajufood.cn.jpg", imageSize: { width: 1184, height: 1670 } },
      { type: "image", value: "v1-1.jpg", imageSize: { width: 1200, height: 1936 } },
      { type: "image", value: "v1-2.jpg", imageSize: { width: 1200, height: 1936 } },
      { type: "image", value: "1.jpg", imageSize: { width: 1200, height: 1814 } },
      { type: "image", value: "2.jpg", imageSize: { width: 1200, height: 1814 } },
      { type: "image", value: "3.jpg", imageSize: { width: 1200, height: 1814 } }
    ]
  },
  {
    id: "gquery",
    title: "gQuery 框架",
    icon: "/icons/gquery.jpg",
    url: "https://gquery.cn/",
    keywords: ["自研框架", "开源", "JS", "PHP"],
    created_at: "2020-09-02",
    finished_at: "2022-07-14",
    contents: [
      { key: "背景", value: "希望能高效构建强大美观的系统项目，封装通用函数库和 UI 组件加速前端开发。" },
      { key: "目标", value: "前端函数库参考 jQuery 开发，与 CSS 框架一同基于 MIT 开源。后端框架基于 PSR 参考 ThinkPHP 开发。" },
      { key: "成果", value: "在中小型项目中，gQuery 提升了 49% 的开发效率，并于 Gitee 成为推荐项目。<br/>基于 gQuery 开发了数十余种复杂组件，包括 MD 编辑器、浏览器菜单、滚动视差、灯箱等。" }
    ],
    supports: [
      { type: "image", value: "gquery.cn.jpg", imageSize: { width: 1184, height: 1670 } },
      { type: "image", value: "gquery.net.jpg", imageSize: { width: 1184, height: 1794 } },
      { type: "image", value: "software-copyright.jpg", imageSize: { width: 1200, height: 1654 } }
    ]
  },
  {
    id: "mcadmin",
    title: "MCAdmin：国内垂直社区",
    url: "https://mcadmin.cn/",
    keywords: ["社区", "项目管理", "在线工具", "CMS", "H5", "JS", "PHP", "Redis", "MySQL"],
    created_at: "2020-07-05",
    finished_at: "2020-12-01",
    contents: [
      { key: "背景", value: "Minecraft 沙盒游戏国内社区。注册用户可发起提问 (类似 StackOverflow)，发布技术论刊、游戏项目等。" },
      { key: "行动", value: `独立完成服务器部署，MySQL 环境搭建及调优，状态监控搭建（如服务器负载及 PV、UV 等），容灾方案，后端主 PHP，前端使用 jQuery 及自研框架。
      <br/>基于用户停留时长预测，通过 AJAX 更精准地完成数据采集，并在该环节省去 60% 网络 IO。
      <br/>通过信息隐藏、分布式、CDN 聚合等方法低成本实现 DDOS 防护及应用安全。` }
    ],
    supports: [
      { type: "image", value: "mcadmin.cn.jpg", imageSize: { width: 1184, height: 1670 } },
      { type: "image", value: "web-1.jpg", imageSize: { width: 1200, height: 1800 } },
      { type: "image", value: "web-2.jpg", imageSize: { width: 1200, height: 1800 } }
    ]
  },
  {
    id: "metamo",
    title: "元魔幻界: Minecraft 群组 & 服务平台",
    icon: "/icons/metamo.jpg",
    url: "https://mc.metamo.cn/",
    keywords: ["游戏运营商", "社区", "在线工具", "支付", "CMS", "H5", "JS", "PHP", "Redis", "MySQL"],
    created_at: "2020-03-10",
    updated_at: "2022-10-24",
    contents: [
      { key: "背景", value: "Minecraft 群祖服运营商，提供多人游戏、在线社区、工具、原创内容产出等服务。" },
      { key: "行动", value: `负责网站与游戏服务器的开发，功能规划及业务方向。
      <br/>在中后期开发中将前端函数库由 jQuery 更换为 gQuery，缩减代码量达 37%，有效提高开发效率。
      <br/>网站前端使用 gQuery 框架，后端使用 gQueryPHP 框架，自主实现前后端工程化。
      <br/>利用社工、安全运维、渗透测试等知识，隐藏有效信息，在控制层防止穷举爆破、恶意文件上传，通过 SQLMap 工具查缺、PHP PDO 有效防止 SQL 注入，并及时处理 XSS 漏洞。` },
      { key: "成果", value: "累计注册用户人数达 34,000+，在国内早期玩家群体中拥有较高影响力。<br/>在线工具总计使用量已达 1,000W+，用户体验颇受好评。" }
    ],
    supports: [
      { type: "image", value: "web-1.jpg", imageSize: { width: 1200, height: 1800 } },
      { type: "image", value: "web-2.jpg", imageSize: { width: 1200, height: 1800 } }
    ]
  },
  {
    id: "thepieshed",
    title: "ThePieShed 在线订餐系统",
    keywords: ["实体餐饮", "外包", "食品", "H5", "JS", "PHP", "MySQL"],
    created_at: "2019-08-28",
    finished_at: "🤐",
    contents: [
      { key: "背景", value: "海外商家需要一个简单的自动化订餐网站，客户可通过 PC、iPad、手机端进行点餐。点餐后将账单发送至客户邮箱，付款后再由餐厅制作，客户按照约定时间取餐。" }
    ],
    supports: [
      { type: "image", value: "web.jpg", imageSize: { width: 1200, height: 1800 } }
    ]
  },
  {
    id: "greeper",
    title: "Greeper: 亚马逊智能爬虫",
    keywords: ["工具", "外包", "爬虫", "Node.js"],
    created_at: "🤐",
    finished_at: "🤐",
    contents: [
      { key: "目标", value: "针对亚马逊商家后台的爬虫程序，可自动抓取后台检索中所有关联商品，并聚合输出至 Excel。" },
      { key: "行动", value: "程序通过 Node.js 开发，依靠 Nightmare 模拟用户操作以规避严格的反爬策略。" }
    ]
  }
].sort((a, b) => (b?.priority || 0) - (a?.priority || 0));
const css = {
  code: ".marquee.svelte-3zsapg.svelte-3zsapg{position:relative;display:flex;gap:var(--gap);overflow:hidden;-webkit-user-select:none;-moz-user-select:none;user-select:none}.marquee__content.svelte-3zsapg.svelte-3zsapg{display:flex;gap:var(--gap);min-width:100%;flex-shrink:0;justify-content:space-around;animation:svelte-3zsapg-scroll 10s linear infinite;animation-duration:var(--duration)}@keyframes svelte-3zsapg-scroll{from{transform:translateX(0)}to{transform:translateX(calc(-100% - var(--gap)))}}@media(prefers-reduced-motion: reduce){.marquee__content.svelte-3zsapg.svelte-3zsapg{animation-play-state:paused !important}}.reverse.svelte-3zsapg .marquee__content.svelte-3zsapg{animation-direction:reverse}.hover-pause.svelte-3zsapg:hover .marquee__content.svelte-3zsapg{animation-play-state:paused}.fit-content.svelte-3zsapg.svelte-3zsapg{max-width:-moz-fit-content;max-width:fit-content}.pos-absolute.svelte-3zsapg .marquee__content.svelte-3zsapg:last-child{position:absolute;top:0;left:0;animation-name:svelte-3zsapg-scroll-abs}@keyframes svelte-3zsapg-scroll-abs{from{transform:translateX(calc(100% + var(--gap)))}to{transform:translateX(0)}}",
  map: `{"version":3,"file":"Marquee.svelte","sources":["Marquee.svelte"],"sourcesContent":["<script lang=\\"ts\\">let className = \\"\\";\\nexport { className as class };\\nexport let hoverPause = false;\\nexport let fitContent = false;\\nexport let reverse = false;\\nexport let absolute = false;\\nexport let duration = 10;\\nexport let gap = \\"1rem\\";\\nexport let repeat = 1;\\nconst repeatList = new Array(repeat);\\n<\/script>\\n\\n<div\\n\\tclass=\\"marquee {className}\\"\\n\\tclass:hover-pause={hoverPause}\\n\\tclass:fit-content={fitContent}\\n\\tclass:reverse\\n\\tclass:pos-absolute={absolute}\\n\\tstyle=\\"--duration: {duration}s; --gap: {gap};\\"\\n>\\n\\t<div class=\\"marquee__content\\">\\n    {#each repeatList as r}\\n\\t\\t<slot />\\n    {/each}\\n\\t</div>\\n\\t<div class=\\"marquee__content\\" aria-hidden=\\"true\\">\\n\\t\\t{#each repeatList as r}\\n\\t\\t<slot />\\n    {/each}\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t/* Marquee styles */\\n\\t.marquee {\\n\\t\\tposition: relative;\\n\\t\\tdisplay: flex;\\n\\t\\tgap: var(--gap);\\n\\t\\toverflow: hidden;\\n\\t\\t-webkit-user-select: none;\\n\\t\\t   -moz-user-select: none;\\n\\t\\t        user-select: none;\\n\\t}\\n\\n\\t.marquee__content {\\n\\t\\tdisplay: flex;\\n\\t\\tgap: var(--gap);\\n\\t\\tmin-width: 100%;\\n\\t\\tflex-shrink: 0;\\n\\t\\tjustify-content: space-around;\\n\\t\\tanimation: scroll 10s linear infinite;\\n\\t\\tanimation-duration: var(--duration);\\n\\t}\\n\\n\\t@keyframes scroll {\\n\\t\\tfrom {\\n\\t\\t\\ttransform: translateX(0);\\n\\t\\t}\\n\\t\\tto {\\n\\t\\t\\ttransform: translateX(calc(-100% - var(--gap)));\\n\\t\\t}\\n\\t}\\n\\n\\t/* Pause animation when reduced-motion is set */\\n\\t@media (prefers-reduced-motion: reduce) {\\n\\t\\t.marquee__content {\\n\\t\\t\\tanimation-play-state: paused !important;\\n\\t\\t}\\n\\t}\\n\\n\\t/* Reverse animation */\\n\\t.reverse .marquee__content {\\n\\t\\tanimation-direction: reverse;\\n\\t}\\n\\n\\t/* Pause on hover */\\n\\t.hover-pause:hover .marquee__content {\\n\\t\\tanimation-play-state: paused;\\n\\t}\\n\\n\\t/* Attempt to size parent based on content. Keep in mind that the parent width is equal to both content containers that stretch to fill the parent. */\\n\\t.fit-content {\\n\\t\\tmax-width: -moz-fit-content;\\n\\t\\tmax-width: fit-content;\\n\\t}\\n\\n\\t/* A fit-content sizing fix: Absolute position the duplicate container. This will set the size of the parent wrapper to a single child container. Shout out to Olavi's article that had this solution 👏 @link: https://olavihaapala.fi/2021/02/23/modern-marquee.html  */\\n\\t.pos-absolute .marquee__content:last-child {\\n\\t\\tposition: absolute;\\n\\t\\ttop: 0;\\n\\t\\tleft: 0;\\n\\t\\tanimation-name: scroll-abs;\\n\\t}\\n\\t@keyframes scroll-abs {\\n\\t\\tfrom {\\n\\t\\t\\ttransform: translateX(calc(100% + var(--gap)));\\n\\t\\t}\\n\\t\\tto {\\n\\t\\t\\ttransform: translateX(0);\\n\\t\\t}\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAkCC,oCAAS,CACR,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IAAI,KAAK,CAAC,CACf,QAAQ,CAAE,MAAM,CAChB,mBAAmB,CAAE,IAAI,CACtB,gBAAgB,CAAE,IAAI,CACjB,WAAW,CAAE,IACtB,CAEA,6CAAkB,CACjB,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IAAI,KAAK,CAAC,CACf,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,CAAC,CACd,eAAe,CAAE,YAAY,CAC7B,SAAS,CAAE,oBAAM,CAAC,GAAG,CAAC,MAAM,CAAC,QAAQ,CACrC,kBAAkB,CAAE,IAAI,UAAU,CACnC,CAEA,WAAW,oBAAO,CACjB,IAAK,CACJ,SAAS,CAAE,WAAW,CAAC,CACxB,CACA,EAAG,CACF,SAAS,CAAE,WAAW,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,KAAK,CAAC,CAAC,CAC/C,CACD,CAGA,MAAO,yBAAyB,MAAM,CAAE,CACvC,6CAAkB,CACjB,oBAAoB,CAAE,MAAM,CAAC,UAC9B,CACD,CAGA,sBAAQ,CAAC,+BAAkB,CAC1B,mBAAmB,CAAE,OACtB,CAGA,0BAAY,MAAM,CAAC,+BAAkB,CACpC,oBAAoB,CAAE,MACvB,CAGA,wCAAa,CACZ,SAAS,CAAE,gBAAgB,CAC3B,SAAS,CAAE,WACZ,CAGA,2BAAa,CAAC,+BAAiB,WAAY,CAC1C,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,cAAc,CAAE,wBACjB,CACA,WAAW,wBAAW,CACrB,IAAK,CACJ,SAAS,CAAE,WAAW,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,KAAK,CAAC,CAAC,CAC9C,CACA,EAAG,CACF,SAAS,CAAE,WAAW,CAAC,CACxB,CACD"}`
};
const Marquee = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: className = "" } = $$props;
  let { hoverPause = false } = $$props;
  let { fitContent = false } = $$props;
  let { reverse = false } = $$props;
  let { absolute = false } = $$props;
  let { duration = 10 } = $$props;
  let { gap = "1rem" } = $$props;
  let { repeat = 1 } = $$props;
  const repeatList = new Array(repeat);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.hoverPause === void 0 && $$bindings.hoverPause && hoverPause !== void 0) $$bindings.hoverPause(hoverPause);
  if ($$props.fitContent === void 0 && $$bindings.fitContent && fitContent !== void 0) $$bindings.fitContent(fitContent);
  if ($$props.reverse === void 0 && $$bindings.reverse && reverse !== void 0) $$bindings.reverse(reverse);
  if ($$props.absolute === void 0 && $$bindings.absolute && absolute !== void 0) $$bindings.absolute(absolute);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
  if ($$props.gap === void 0 && $$bindings.gap && gap !== void 0) $$bindings.gap(gap);
  if ($$props.repeat === void 0 && $$bindings.repeat && repeat !== void 0) $$bindings.repeat(repeat);
  $$result.css.add(css);
  return `<div class="${[
    "marquee " + escape(className, true) + " svelte-3zsapg",
    (hoverPause ? "hover-pause" : "") + " " + (fitContent ? "fit-content" : "") + " " + (reverse ? "reverse" : "") + " " + (absolute ? "pos-absolute" : "")
  ].join(" ").trim()}" style="${"--duration: " + escape(duration, true) + "s; --gap: " + escape(gap, true) + ";"}"><div class="marquee__content svelte-3zsapg">${each(repeatList, (r) => {
    return `${slots.default ? slots.default({}) : ``}`;
  })}</div> <div class="marquee__content svelte-3zsapg" aria-hidden="true">${each(repeatList, (r) => {
    return `${slots.default ? slots.default({}) : ``}`;
  })}</div> </div>`;
});
const Dialog_title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Dialog_title$1, "DialogPrimitive.Title").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("text-lg font-semibold leading-none tracking-tight", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Dialog_portal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `${validate_component(Dialog_portal$1, "DialogPrimitive.Portal").$$render($$result, Object.assign({}, $$restProps), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Dialog_footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Dialog_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("flex flex-col space-y-1.5 text-center sm:text-left", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Dialog_overlay = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { transition = fade } = $$props;
  let { transitionConfig = { duration: 150 } } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(Dialog_overlay$1, "DialogPrimitive.Overlay").$$render(
    $$result,
    Object.assign(
      {},
      { transition },
      { transitionConfig },
      {
        class: cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm ", className)
      },
      $$restProps
    ),
    {},
    {}
  )}`;
});
const Cross2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "ariaLabel", "withEvents"]);
  const ctx = getContext("iconCtx") ?? {};
  let { size = ctx.size || "24" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { color = ctx.color || "currentColor" } = $$props;
  let { ariaLabel = "cross 2," } = $$props;
  let { withEvents = false } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0) $$bindings.role(role);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
  if ($$props.withEvents === void 0 && $$bindings.withEvents && withEvents !== void 0) $$bindings.withEvents(withEvents);
  return `${withEvents ? `<svg${spread(
    [
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object($$restProps),
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { viewBox: "0 0 15 15" },
      { fill: escape_attribute_value(color) },
      { xmlns: "http://www.w3.org/2000/svg" }
    ],
    {}
  )}><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path></svg>` : `<svg${spread(
    [
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object($$restProps),
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { viewBox: "0 0 15 15" },
      { fill: escape_attribute_value(color) },
      { xmlns: "http://www.w3.org/2000/svg" }
    ],
    {}
  )}><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path></svg>`} `;
});
const Dialog_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { transition = flyAndScale } = $$props;
  let { transitionConfig = { duration: 200 } } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(Dialog_portal, "Dialog.Portal").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Dialog_overlay, "Dialog.Overlay").$$render($$result, {}, {}, {})} ${validate_component(Dialog_content$1, "DialogPrimitive.Content").$$render(
        $$result,
        Object.assign(
          {},
          { transition },
          { transitionConfig },
          {
            class: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full", className)
          },
          $$restProps
        ),
        {},
        {
          default: () => {
            return `${slots.default ? slots.default({}) : ``} ${validate_component(Dialog_close, "DialogPrimitive.Close").$$render(
              $$result,
              {
                class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Cross2, "Cross2").$$render($$result, { class: "h-4 w-4" }, {}, {})} <span class="sr-only" data-svelte-h="svelte-1pewzs3">Close</span>`;
                }
              }
            )}`;
          }
        }
      )}`;
    }
  })}`;
});
const Root = Dialog;
const Trigger = Dialog_trigger;
const Badge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "href", "variant"]);
  let { class: className = void 0 } = $$props;
  let { href = void 0 } = $$props;
  let { variant = "default" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  return `${((tag) => {
    return tag ? `<${href ? "a" : "span"}${spread(
      [
        { href: escape_attribute_value(href) },
        {
          class: escape_attribute_value(cn(badgeVariants({ variant, className })))
        },
        escape_object($$restProps)
      ],
      {}
    )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "span")}`;
});
const Avatar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "delayMs"]);
  let { class: className = void 0 } = $$props;
  let { delayMs = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.delayMs === void 0 && $$bindings.delayMs && delayMs !== void 0) $$bindings.delayMs(delayMs);
  return `${validate_component(Avatar$1, "AvatarPrimitive.Root").$$render(
    $$result,
    Object.assign(
      {},
      { delayMs },
      {
        class: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Avatar_image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "src", "alt"]);
  let { class: className = void 0 } = $$props;
  let { src = void 0 } = $$props;
  let { alt = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.src === void 0 && $$bindings.src && src !== void 0) $$bindings.src(src);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0) $$bindings.alt(alt);
  return `${validate_component(Avatar_image$1, "AvatarPrimitive.Image").$$render(
    $$result,
    Object.assign(
      {},
      { src },
      { alt },
      {
        class: cn("aspect-square h-full w-full", className)
      },
      $$restProps
    ),
    {},
    {}
  )}`;
});
const Avatar_fallback = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Avatar_fallback$1, "AvatarPrimitive.Fallback").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const ProjectListView = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { ProjectList } = $$props;
  let Keywords = [];
  function listChanged() {
    const kwList = [];
    ProjectList.map((proj) => {
      proj.keywords.map((key) => {
        kwList.includes(key) || kwList.push(key);
      });
      if (proj.url) {
        const url = new URL(proj.url);
        proj.url_host = url.hostname;
      }
    });
    Keywords = kwList;
  }
  const PI = {
    filters: [],
    filterSearch: ""
  };
  let dialogOpen = false;
  if ($$props.ProjectList === void 0 && $$bindings.ProjectList && ProjectList !== void 0) $$bindings.ProjectList(ProjectList);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    ProjectList && listChanged();
    $$rendered = `${``} <div class="p-profile flex items-center justify-between">${slots.title ? slots.title({}) : ``} <div class="flex"><div class="tooltip tooltip-left" data-tip="筛选">${validate_component(Root, "Dialog.Root").$$render(
      $$result,
      { open: dialogOpen },
      {
        open: ($$value) => {
          dialogOpen = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Trigger, "Dialog.Trigger").$$render(
            $$result,
            {
              class: buttonVariants({ variant: "outline", size: "icon" })
            },
            {},
            {
              default: () => {
                return `${PI.filters.length < 1 ? `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z"></path></svg>` : `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M11.18 20.274l-2.18 .726v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v3"></path><path d="M15 19l2 2l4 -4"></path></svg>`}`;
              }
            }
          )} ${validate_component(Dialog_content, "Dialog.Content").$$render($$result, { class: "sm:max-w-[430px]" }, {}, {
            default: () => {
              return `${validate_component(Dialog_header, "Dialog.Header").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Dialog_title, "Dialog.Title").$$render($$result, {}, {}, {
                    default: () => {
                      return `项目筛选`;
                    }
                  })} `;
                }
              })} <div class="grid gap-4 py-4">${validate_component(Input, "Input").$$render(
                $$result,
                {
                  id: "keyword",
                  placeholder: "检索关键词",
                  value: PI.filterSearch
                },
                {
                  value: ($$value) => {
                    PI.filterSearch = $$value;
                    $$settled = false;
                  }
                },
                {}
              )} <div class="flex flex-wrap gap-2">${each(Keywords.filter((key) => key.toLowerCase().indexOf(PI.filterSearch.toLowerCase()) > -1), (key) => {
                return `<a${add_attribute("href", null, 0)}>${validate_component(Badge, "BadgeUI").$$render(
                  $$result,
                  {
                    variant: PI.filters.includes(key) ? "default" : "outline",
                    class: "cursor-pointer"
                  },
                  {},
                  {
                    default: () => {
                      return `${escape(key.trim())} `;
                    }
                  }
                )}</a>`;
              })}</div></div> ${validate_component(Dialog_footer, "Dialog.Footer").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Button, "Button").$$render($$result, { type: "submit" }, {}, {
                    default: () => {
                      return `保存并返回`;
                    }
                  })}`;
                }
              })}`;
            }
          })}`;
        }
      }
    )}</div></div></div> <div class="flex flex-col gap-5">${each(
      ProjectList.filter((proj) => PI.filters.length > 0 ? PI.filters.some((k) => proj.keywords.includes(k)) : true),
      (item) => {
        return `<section class="${"item group pb-3 " + escape(item.dom_class || "", true)}">${item.owned_by ? `<div class="bg-green-600/10 px-profile py-2 mb-3 flex gap-4 text-sm sm:text-base"><div class="w-12 shrink-0 flex justify-center" data-svelte-h="svelte-1cuxbfx"><svg xmlns="http://www.w3.org/2000/svg" class="relative w-6 h-6 group-hover:animate-bounce group-hover:top-1" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M17 13v-6l-5 4l-5 -4v6l5 4z"></path></svg></div> <span>该项目系于 <b>${escape(item.owned_by.company)}</b> 担任 <b>${escape(item.owned_by.role)}</b> 时的独立开发成果</span> </div>` : ``} <div class="px-profile flex items-start gap-4">${validate_component(Avatar, "Avatar.Root").$$render(
          $$result,
          {
            class: cn("rounded-sm shrink-0 size-12", item.finished_at ? "online" : "")
          },
          {},
          {
            default: () => {
              return `${item.icon ? `${validate_component(Avatar_image, "Avatar.Image").$$render($$result, { src: item.icon, alt: "@shadcn" }, {}, {})}` : ``} ${validate_component(Avatar_fallback, "Avatar.Fallback").$$render($$result, { class: "rounded-none" }, {}, {
                default: () => {
                  return `${escape(item.title[0])}`;
                }
              })} `;
            }
          }
        )} <div class="flex flex-col justify-center"><div class="flex items-center gap-2 mt-1">${item.priority ? `${validate_component(Badge$1, "Badge").$$render($$result, { rightClass: "!bg-white !text-black" }, {}, {
          default: () => {
            return `置顶`;
          }
        })}` : ``} <h3 class="font-semibold leading-none">${escape(item.title)}</h3></div> <div class="flex flex-wrap mt-2 gap-2">${validate_component(Badge$1, "Badge").$$render(
          $$result,
          {
            icon: "关键词",
            size: "sm",
            rightClass: "bg-green-700"
          },
          {},
          {
            default: () => {
              return `${escape(item.keywords.join(", "))} `;
            }
          }
        )} ${item.url ? `<a${add_attribute("href", item.url, 0)} target="_blank" class="flex">${validate_component(Badge$1, "Badge").$$render(
          $$result,
          {
            type: "link",
            size: "sm",
            rightClass: "bg-green-700"
          },
          {},
          {
            default: () => {
              return `${escape(item.url_host)} `;
            }
          }
        )} </a>` : ``} ${item.created_at ? `${validate_component(Badge$1, "Badge").$$render($$result, { icon: "起", size: "sm" }, {}, {
          default: () => {
            return `${escape(item.created_at)}`;
          }
        })}` : ``} ${item.finished_at ? `${validate_component(Badge$1, "Badge").$$render($$result, { icon: "止", size: "sm" }, {}, {
          default: () => {
            return `${escape(item.finished_at)}`;
          }
        })}` : ``} ${item.updated_at ? `${validate_component(Badge$1, "Badge").$$render($$result, { icon: "最近", size: "sm" }, {}, {
          default: () => {
            return `${escape(item.updated_at)}`;
          }
        })}` : ``}</div> </div></div> ${item.contents ? `<ol class="px-profile pt-3 leading-relaxed text-sm xs:text-base">${each(item.contents, (content) => {
          return `<li class="flex"><div class="font-semibold w-16 shrink-0 break-all pr-1">${escape(content.key)}：</div> <div><!-- HTML_TAG_START -->${content.value}<!-- HTML_TAG_END --></div> </li>`;
        })} </ol>` : ``} ${item.supports ? `<ul class="px-profile mt-6 hidden sm:grid grid-cols-3 gap-2 items-stretch">${each(item.supports, (sup, i) => {
          return `<img${add_attribute(
            "src",
            sup.value.startsWith("/") ? sup.value : `/projects/${item.id}/${sup.value}`,
            0
          )} alt="${"佐证材料 #" + escape(i, true)}" class="object-cover"${add_attribute("data-lightbox", true, 0)}${add_attribute("data-width", sup.imageSize?.width, 0)}${add_attribute("data-height", sup.imageSize?.height, 0)}>`;
        })}</ul> ${validate_component(Marquee, "Marquee").$$render(
          $$result,
          {
            class: "sm:!hidden mt-6",
            repeat: item.supports.length > 1 ? 1 : 2,
            duration: item.supports.length > 2 ? 3 * item.supports.length : 9
          },
          {},
          {
            default: () => {
              return `${each(item.supports, (sup, i) => {
                return `<img${add_attribute(
                  "src",
                  sup.value.startsWith("/") ? sup.value : `/projects/${item.id}/${sup.value}`,
                  0
                )} alt="${"佐证材料 #" + escape(i, true)}" style="width:60vw"${add_attribute("data-lightbox", true, 0)}${add_attribute("data-width", sup.imageSize?.width, 0)}${add_attribute("data-height", sup.imageSize?.height, 0)}>`;
              })} `;
            }
          }
        )}` : ``} </section>`;
      }
    )}</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Badge as B,
  EmploymentListData as E,
  Marquee as M,
  ProjectListData as P,
  Badge$1 as a,
  ProjectListView as b,
  handleFocus as h
};
