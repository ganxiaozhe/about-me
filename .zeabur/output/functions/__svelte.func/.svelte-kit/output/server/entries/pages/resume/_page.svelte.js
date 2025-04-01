import { s as setContext, j as getContext, c as create_ssr_component, k as compute_rest_props, h as subscribe, d as spread, a as add_attribute, f as escape_object, i as each, e as escape, v as validate_component, l as escape_attribute_value, m as missing_component } from "../../../chunks/ssr.js";
import { h as handleFocus, B as Badge, E as EmploymentListData, P as ProjectListData, M as Marquee, a as Badge$1, b as ProjectListView } from "../../../chunks/ProjectListView.js";
import { S as SEO } from "../../../chunks/SEO.js";
import { g as generateIds, s as sleep, t as tick, a as getPortalDestination, u as usePortal, r as removeScroll } from "../../../chunks/index3.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { w as withGet, m as makeElement, f as effect, e as executeCallbacks, a as addMeltEventListener, b as isHTMLElement, F as FIRST_LAST_KEYS, k as kbd, p as portalAttr, s as styleToString, c as createElHelpers, S as SELECTION_KEYS, u as useEscapeKeydown, n as noop, h as isElementDisabled, j as safeOnMount, d as disabledAttr, o as omit, i as isBrowser, l as addEventListener } from "../../../chunks/create.js";
import { w as writable, d as derived } from "../../../chunks/index2.js";
import { t as toWritableStores, o as overridable, c as createBitAttrs, r as removeUndefined, g as getOptionUpdater, a as createDispatcher } from "../../../chunks/updater.js";
import { c as createTypeaheadSearch, d as derivedVisible, h as handleRovingFocus, g as getNextFocusable, a as getPreviousFocusable, r as removeHighlight, b as addHighlight, u as usePopper, e as getPositioningUpdater, f as generateId } from "../../../chunks/helpers.js";
import "clsx";
import "../../../chunks/index4.js";
import "../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "ua-parser-js";
import { B as Button } from "../../../chunks/button.js";
import { c as cn, f as flyAndScale } from "../../../chunks/utils.js";
const SUB_OPEN_KEYS = {
  ltr: [...SELECTION_KEYS, kbd.ARROW_RIGHT]
};
const SUB_CLOSE_KEYS = {
  ltr: [kbd.ARROW_LEFT]
};
const menuIdParts = ["menu", "trigger"];
const defaults$2 = {
  arrowSize: 8,
  positioning: {
    placement: "bottom"
  },
  preventScroll: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  portal: void 0,
  loop: false,
  dir: "ltr",
  defaultOpen: false,
  typeahead: true,
  closeOnItemClick: true,
  onOutsideClick: void 0
};
function createMenuBuilder(opts) {
  const { name, selector } = createElHelpers(opts.selector);
  const { preventScroll, arrowSize, positioning, closeOnEscape, closeOnOutsideClick, portal, forceVisible, typeahead, loop, closeFocus, disableFocusFirstItem, closeOnItemClick, onOutsideClick } = opts.rootOptions;
  const rootOpen = opts.rootOpen;
  const rootActiveTrigger = opts.rootActiveTrigger;
  const nextFocusable = opts.nextFocusable;
  const prevFocusable = opts.prevFocusable;
  const isUsingKeyboard = withGet.writable(false);
  const lastPointerX = withGet(writable(0));
  const pointerGraceIntent = withGet(writable(null));
  const pointerDir = withGet(writable("right"));
  const currentFocusedItem = withGet(writable(null));
  const pointerMovingToSubmenu = withGet(derived([pointerDir, pointerGraceIntent], ([$pointerDir, $pointerGraceIntent]) => {
    return (e) => {
      const isMovingTowards = $pointerDir === $pointerGraceIntent?.side;
      return isMovingTowards && isPointerInGraceArea(e, $pointerGraceIntent?.area);
    };
  }));
  const { typed, handleTypeaheadSearch } = createTypeaheadSearch();
  const rootIds = toWritableStores({ ...generateIds(menuIdParts), ...opts.ids });
  const isVisible = derivedVisible({
    open: rootOpen,
    forceVisible,
    activeTrigger: rootActiveTrigger
  });
  const rootMenu = makeElement(name(), {
    stores: [isVisible, portal, rootIds.menu, rootIds.trigger],
    returned: ([$isVisible, $portal, $rootMenuId, $rootTriggerId]) => {
      return {
        role: "menu",
        hidden: $isVisible ? void 0 : true,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        id: $rootMenuId,
        "aria-labelledby": $rootTriggerId,
        "data-state": $isVisible ? "open" : "closed",
        "data-portal": portalAttr($portal),
        tabindex: -1
      };
    },
    action: (node) => {
      let unsubPopper = noop;
      const unsubDerived = effect([isVisible, rootActiveTrigger, positioning, closeOnOutsideClick, portal, closeOnEscape], ([$isVisible, $rootActiveTrigger, $positioning, $closeOnOutsideClick, $portal, $closeOnEscape]) => {
        unsubPopper();
        if (!$isVisible || !$rootActiveTrigger)
          return;
        tick().then(() => {
          unsubPopper();
          setMeltMenuAttribute(node, selector);
          unsubPopper = usePopper(node, {
            anchorElement: $rootActiveTrigger,
            open: rootOpen,
            options: {
              floating: $positioning,
              modal: {
                closeOnInteractOutside: $closeOnOutsideClick,
                shouldCloseOnInteractOutside: (e) => {
                  onOutsideClick.get()?.(e);
                  if (e.defaultPrevented)
                    return false;
                  if (isHTMLElement($rootActiveTrigger) && $rootActiveTrigger.contains(e.target)) {
                    return false;
                  }
                  return true;
                },
                onClose: () => {
                  rootOpen.set(false);
                  $rootActiveTrigger.focus();
                },
                open: $isVisible
              },
              portal: getPortalDestination(node, $portal),
              escapeKeydown: $closeOnEscape ? void 0 : null
            }
          }).destroy;
        });
      });
      const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => {
        const target = e.target;
        const menuEl = e.currentTarget;
        if (!isHTMLElement(target) || !isHTMLElement(menuEl))
          return;
        const isKeyDownInside = target.closest('[role="menu"]') === menuEl;
        if (!isKeyDownInside)
          return;
        if (FIRST_LAST_KEYS.includes(e.key)) {
          handleMenuNavigation(e, loop.get() ?? false);
        }
        if (e.key === kbd.TAB) {
          e.preventDefault();
          rootOpen.set(false);
          handleTabNavigation(e, nextFocusable, prevFocusable);
          return;
        }
        const isCharacterKey = e.key.length === 1;
        const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
        if (!isModifierKey && isCharacterKey && typeahead.get() === true) {
          handleTypeaheadSearch(e.key, getMenuItems(menuEl));
        }
      }));
      return {
        destroy() {
          unsubDerived();
          unsubEvents();
          unsubPopper();
        }
      };
    }
  });
  const rootTrigger = makeElement(name("trigger"), {
    stores: [rootOpen, rootIds.menu, rootIds.trigger],
    returned: ([$rootOpen, $rootMenuId, $rootTriggerId]) => {
      return {
        "aria-controls": $rootMenuId,
        "aria-expanded": $rootOpen,
        "data-state": $rootOpen ? "open" : "closed",
        id: $rootTriggerId,
        tabindex: 0
      };
    },
    action: (node) => {
      applyAttrsIfDisabled(node);
      rootActiveTrigger.update((p) => {
        if (p)
          return p;
        return node;
      });
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        const $rootOpen = rootOpen.get();
        const triggerEl = e.currentTarget;
        if (!isHTMLElement(triggerEl))
          return;
        handleOpen(triggerEl);
        if (!$rootOpen)
          e.preventDefault();
      }), addMeltEventListener(node, "keydown", (e) => {
        const triggerEl = e.currentTarget;
        if (!isHTMLElement(triggerEl))
          return;
        if (!(SELECTION_KEYS.includes(e.key) || e.key === kbd.ARROW_DOWN))
          return;
        e.preventDefault();
        handleOpen(triggerEl);
        const menuId = triggerEl.getAttribute("aria-controls");
        if (!menuId)
          return;
        const menu = document.getElementById(menuId);
        if (!menu)
          return;
        const menuItems = getMenuItems(menu);
        if (!menuItems.length)
          return;
        handleRovingFocus(menuItems[0]);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const rootArrow = makeElement(name("arrow"), {
    stores: arrowSize,
    returned: ($arrowSize) => ({
      "data-arrow": true,
      style: styleToString({
        position: "absolute",
        width: `var(--arrow-size, ${$arrowSize}px)`,
        height: `var(--arrow-size, ${$arrowSize}px)`
      })
    })
  });
  const overlay = makeElement(name("overlay"), {
    stores: [isVisible],
    returned: ([$isVisible]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        tabindex: -1,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        "aria-hidden": "true",
        "data-state": stateAttr($isVisible)
      };
    },
    action: (node) => {
      let unsubEscapeKeydown = noop;
      if (closeOnEscape.get()) {
        const escapeKeydown = useEscapeKeydown(node, {
          handler: () => {
            rootOpen.set(false);
            const $rootActiveTrigger = rootActiveTrigger.get();
            if ($rootActiveTrigger)
              $rootActiveTrigger.focus();
          }
        });
        if (escapeKeydown && escapeKeydown.destroy) {
          unsubEscapeKeydown = escapeKeydown.destroy;
        }
      }
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
          unsubEscapeKeydown();
          unsubPortal();
        }
      };
    }
  });
  const item = makeElement(name("item"), {
    returned: () => {
      return {
        role: "menuitem",
        tabindex: -1,
        "data-orientation": "vertical"
      };
    },
    action: (node) => {
      setMeltMenuAttribute(node, selector);
      applyAttrsIfDisabled(node);
      const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
        const itemEl = e.currentTarget;
        if (!isHTMLElement(itemEl))
          return;
        if (isElementDisabled(itemEl)) {
          e.preventDefault();
          return;
        }
      }), addMeltEventListener(node, "click", (e) => {
        const itemEl = e.currentTarget;
        if (!isHTMLElement(itemEl))
          return;
        if (isElementDisabled(itemEl)) {
          e.preventDefault();
          return;
        }
        if (e.defaultPrevented) {
          handleRovingFocus(itemEl);
          return;
        }
        if (closeOnItemClick.get()) {
          sleep(1).then(() => {
            rootOpen.set(false);
          });
        }
      }), addMeltEventListener(node, "keydown", (e) => {
        onItemKeyDown(e);
      }), addMeltEventListener(node, "pointermove", (e) => {
        onMenuItemPointerMove(e);
      }), addMeltEventListener(node, "pointerleave", (e) => {
        onMenuItemPointerLeave(e);
      }), addMeltEventListener(node, "focusin", (e) => {
        onItemFocusIn(e);
      }), addMeltEventListener(node, "focusout", (e) => {
        onItemFocusOut(e);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const group = makeElement(name("group"), {
    returned: () => {
      return (groupId) => ({
        role: "group",
        "aria-labelledby": groupId
      });
    }
  });
  const groupLabel = makeElement(name("group-label"), {
    returned: () => {
      return (groupId) => ({
        id: groupId
      });
    }
  });
  const checkboxItemDefaults = {
    defaultChecked: false,
    disabled: false
  };
  const createCheckboxItem = (props) => {
    const withDefaults = { ...checkboxItemDefaults, ...props };
    const checkedWritable = withDefaults.checked ?? writable(withDefaults.defaultChecked ?? null);
    const checked = overridable(checkedWritable, withDefaults.onCheckedChange);
    const disabled = writable(withDefaults.disabled);
    const checkboxItem = makeElement(name("checkbox-item"), {
      stores: [checked, disabled],
      returned: ([$checked, $disabled]) => {
        return {
          role: "menuitemcheckbox",
          tabindex: -1,
          "data-orientation": "vertical",
          "aria-checked": isIndeterminate($checked) ? "mixed" : $checked ? "true" : "false",
          "data-disabled": disabledAttr($disabled),
          "data-state": getCheckedState($checked)
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector);
        applyAttrsIfDisabled(node);
        const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            e.preventDefault();
            return;
          }
        }), addMeltEventListener(node, "click", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            e.preventDefault();
            return;
          }
          if (e.defaultPrevented) {
            handleRovingFocus(itemEl);
            return;
          }
          checked.update((prev) => {
            if (isIndeterminate(prev))
              return true;
            return !prev;
          });
          if (closeOnItemClick.get()) {
            tick().then(() => {
              rootOpen.set(false);
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          onItemKeyDown(e);
        }), addMeltEventListener(node, "pointermove", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            onItemLeave(e);
            return;
          }
          onMenuItemPointerMove(e, itemEl);
        }), addMeltEventListener(node, "pointerleave", (e) => {
          onMenuItemPointerLeave(e);
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          onItemFocusOut(e);
        }));
        return {
          destroy: unsub
        };
      }
    });
    const isChecked = derived(checked, ($checked) => $checked === true);
    const _isIndeterminate = derived(checked, ($checked) => $checked === "indeterminate");
    return {
      elements: {
        checkboxItem
      },
      states: {
        checked
      },
      helpers: {
        isChecked,
        isIndeterminate: _isIndeterminate
      },
      options: {
        disabled
      }
    };
  };
  const createMenuRadioGroup = (args = {}) => {
    const valueWritable = args.value ?? writable(args.defaultValue ?? null);
    const value = overridable(valueWritable, args.onValueChange);
    const radioGroup = makeElement(name("radio-group"), {
      returned: () => ({
        role: "group"
      })
    });
    const radioItemDefaults = {
      disabled: false
    };
    const radioItem = makeElement(name("radio-item"), {
      stores: [value],
      returned: ([$value]) => {
        return (itemProps) => {
          const { value: itemValue, disabled } = { ...radioItemDefaults, ...itemProps };
          const checked = $value === itemValue;
          return {
            disabled,
            role: "menuitemradio",
            "data-state": checked ? "checked" : "unchecked",
            "aria-checked": checked,
            "data-disabled": disabledAttr(disabled),
            "data-value": itemValue,
            "data-orientation": "vertical",
            tabindex: -1
          };
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector);
        const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            e.preventDefault();
            return;
          }
        }), addMeltEventListener(node, "click", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            e.preventDefault();
            return;
          }
          if (e.defaultPrevented) {
            if (!isHTMLElement(itemEl))
              return;
            handleRovingFocus(itemEl);
            return;
          }
          value.set(itemValue);
          if (closeOnItemClick.get()) {
            tick().then(() => {
              rootOpen.set(false);
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          onItemKeyDown(e);
        }), addMeltEventListener(node, "pointermove", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            onItemLeave(e);
            return;
          }
          onMenuItemPointerMove(e, itemEl);
        }), addMeltEventListener(node, "pointerleave", (e) => {
          onMenuItemPointerLeave(e);
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          onItemFocusOut(e);
        }));
        return {
          destroy: unsub
        };
      }
    });
    const isChecked = derived(value, ($value) => {
      return (itemValue) => {
        return $value === itemValue;
      };
    });
    return {
      elements: {
        radioGroup,
        radioItem
      },
      states: {
        value
      },
      helpers: {
        isChecked
      }
    };
  };
  const { elements: { root: separator } } = createSeparator({
    orientation: "horizontal"
  });
  const subMenuDefaults = {
    ...defaults$2,
    disabled: false,
    positioning: {
      placement: "right-start",
      gutter: 8
    }
  };
  const createSubmenu = (args) => {
    const withDefaults = { ...subMenuDefaults, ...args };
    const subOpenWritable = withDefaults.open ?? writable(false);
    const subOpen = overridable(subOpenWritable, withDefaults?.onOpenChange);
    const options = toWritableStores(omit(withDefaults, "ids"));
    const { positioning: positioning2, arrowSize: arrowSize2, disabled } = options;
    const subActiveTrigger = withGet(writable(null));
    const subOpenTimer = withGet(writable(null));
    const pointerGraceTimer = withGet(writable(0));
    const subIds = toWritableStores({ ...generateIds(menuIdParts), ...withDefaults.ids });
    safeOnMount(() => {
      const subTrigger2 = document.getElementById(subIds.trigger.get());
      if (subTrigger2) {
        subActiveTrigger.set(subTrigger2);
      }
    });
    const subIsVisible = derivedVisible({
      open: subOpen,
      forceVisible,
      activeTrigger: subActiveTrigger
    });
    const subMenu = makeElement(name("submenu"), {
      stores: [subIsVisible, subIds.menu, subIds.trigger],
      returned: ([$subIsVisible, $subMenuId, $subTriggerId]) => {
        return {
          role: "menu",
          hidden: $subIsVisible ? void 0 : true,
          style: styleToString({
            display: $subIsVisible ? void 0 : "none"
          }),
          id: $subMenuId,
          "aria-labelledby": $subTriggerId,
          "data-state": $subIsVisible ? "open" : "closed",
          // unit tests fail on `.closest` if the id starts with a number
          // so using a data attribute
          "data-id": $subMenuId,
          tabindex: -1
        };
      },
      action: (node) => {
        let unsubPopper = noop;
        const unsubDerived = effect([subIsVisible, positioning2], ([$subIsVisible, $positioning]) => {
          unsubPopper();
          if (!$subIsVisible)
            return;
          const activeTrigger = subActiveTrigger.get();
          if (!activeTrigger)
            return;
          tick().then(() => {
            unsubPopper();
            const parentMenuEl = getParentMenu(activeTrigger);
            unsubPopper = usePopper(node, {
              anchorElement: activeTrigger,
              open: subOpen,
              options: {
                floating: $positioning,
                portal: isHTMLElement(parentMenuEl) ? parentMenuEl : void 0,
                modal: null,
                focusTrap: null,
                escapeKeydown: null
              }
            }).destroy;
          });
        });
        const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => {
          if (e.key === kbd.ESCAPE) {
            return;
          }
          const target = e.target;
          const menuEl = e.currentTarget;
          if (!isHTMLElement(target) || !isHTMLElement(menuEl))
            return;
          const isKeyDownInside = target.closest('[role="menu"]') === menuEl;
          if (!isKeyDownInside)
            return;
          if (FIRST_LAST_KEYS.includes(e.key)) {
            e.stopImmediatePropagation();
            handleMenuNavigation(e, loop.get() ?? false);
            return;
          }
          const isCloseKey = SUB_CLOSE_KEYS["ltr"].includes(e.key);
          const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
          const isCharacterKey = e.key.length === 1;
          if (isCloseKey) {
            const $subActiveTrigger = subActiveTrigger.get();
            e.preventDefault();
            subOpen.update(() => {
              if ($subActiveTrigger) {
                handleRovingFocus($subActiveTrigger);
              }
              return false;
            });
            return;
          }
          if (e.key === kbd.TAB) {
            e.preventDefault();
            rootOpen.set(false);
            handleTabNavigation(e, nextFocusable, prevFocusable);
            return;
          }
          if (!isModifierKey && isCharacterKey && typeahead.get() === true) {
            handleTypeaheadSearch(e.key, getMenuItems(menuEl));
          }
        }), addMeltEventListener(node, "pointermove", (e) => {
          onMenuPointerMove(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          const $subActiveTrigger = subActiveTrigger.get();
          if (isUsingKeyboard.get()) {
            const target = e.target;
            const submenuEl = document.getElementById(subIds.menu.get());
            if (!isHTMLElement(submenuEl) || !isHTMLElement(target))
              return;
            if (!submenuEl.contains(target) && target !== $subActiveTrigger) {
              subOpen.set(false);
            }
          } else {
            const menuEl = e.currentTarget;
            const relatedTarget = e.relatedTarget;
            if (!isHTMLElement(relatedTarget) || !isHTMLElement(menuEl))
              return;
            if (!menuEl.contains(relatedTarget) && relatedTarget !== $subActiveTrigger) {
              subOpen.set(false);
            }
          }
        }));
        return {
          destroy() {
            unsubDerived();
            unsubPopper();
            unsubEvents();
          }
        };
      }
    });
    const subTrigger = makeElement(name("subtrigger"), {
      stores: [subOpen, disabled, subIds.menu, subIds.trigger],
      returned: ([$subOpen, $disabled, $subMenuId, $subTriggerId]) => {
        return {
          role: "menuitem",
          id: $subTriggerId,
          tabindex: -1,
          "aria-controls": $subMenuId,
          "aria-expanded": $subOpen,
          "data-state": $subOpen ? "open" : "closed",
          "data-disabled": disabledAttr($disabled),
          "aria-haspopop": "menu"
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector);
        applyAttrsIfDisabled(node);
        subActiveTrigger.update((p) => {
          if (p)
            return p;
          return node;
        });
        const unsubTimer = () => {
          clearTimerStore(subOpenTimer);
          window.clearTimeout(pointerGraceTimer.get());
          pointerGraceIntent.set(null);
        };
        const unsubEvents = executeCallbacks(addMeltEventListener(node, "click", (e) => {
          if (e.defaultPrevented)
            return;
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl) || isElementDisabled(triggerEl))
            return;
          handleRovingFocus(triggerEl);
          if (!subOpen.get()) {
            subOpen.update((prev) => {
              const isAlreadyOpen = prev;
              if (!isAlreadyOpen) {
                subActiveTrigger.set(triggerEl);
                return !prev;
              }
              return prev;
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          const $typed = typed.get();
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl) || isElementDisabled(triggerEl))
            return;
          const isTypingAhead = $typed.length > 0;
          if (isTypingAhead && e.key === kbd.SPACE)
            return;
          if (SUB_OPEN_KEYS["ltr"].includes(e.key)) {
            if (!subOpen.get()) {
              triggerEl.click();
              e.preventDefault();
              return;
            }
            const menuId = triggerEl.getAttribute("aria-controls");
            if (!menuId)
              return;
            const menuEl = document.getElementById(menuId);
            if (!isHTMLElement(menuEl))
              return;
            const firstItem = getMenuItems(menuEl)[0];
            handleRovingFocus(firstItem);
          }
        }), addMeltEventListener(node, "pointermove", (e) => {
          if (!isMouse(e))
            return;
          onItemEnter(e);
          if (e.defaultPrevented)
            return;
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl))
            return;
          if (!isFocusWithinSubmenu(subIds.menu.get())) {
            handleRovingFocus(triggerEl);
          }
          const openTimer = subOpenTimer.get();
          if (!subOpen.get() && !openTimer && !isElementDisabled(triggerEl)) {
            subOpenTimer.set(window.setTimeout(() => {
              subOpen.update(() => {
                subActiveTrigger.set(triggerEl);
                return true;
              });
              clearTimerStore(subOpenTimer);
            }, 100));
          }
        }), addMeltEventListener(node, "pointerleave", (e) => {
          if (!isMouse(e))
            return;
          clearTimerStore(subOpenTimer);
          const submenuEl = document.getElementById(subIds.menu.get());
          const contentRect = submenuEl?.getBoundingClientRect();
          if (contentRect) {
            const side = submenuEl?.dataset.side;
            const rightSide = side === "right";
            const bleed = rightSide ? -5 : 5;
            const contentNearEdge = contentRect[rightSide ? "left" : "right"];
            const contentFarEdge = contentRect[rightSide ? "right" : "left"];
            pointerGraceIntent.set({
              area: [
                // Apply a bleed on clientX to ensure that our exit point is
                // consistently within polygon bounds
                { x: e.clientX + bleed, y: e.clientY },
                { x: contentNearEdge, y: contentRect.top },
                { x: contentFarEdge, y: contentRect.top },
                { x: contentFarEdge, y: contentRect.bottom },
                { x: contentNearEdge, y: contentRect.bottom }
              ],
              side
            });
            window.clearTimeout(pointerGraceTimer.get());
            pointerGraceTimer.set(window.setTimeout(() => {
              pointerGraceIntent.set(null);
            }, 300));
          } else {
            onTriggerLeave(e);
            if (e.defaultPrevented)
              return;
            pointerGraceIntent.set(null);
          }
        }), addMeltEventListener(node, "focusout", (e) => {
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl))
            return;
          removeHighlight(triggerEl);
          const relatedTarget = e.relatedTarget;
          if (!isHTMLElement(relatedTarget))
            return;
          const menuId = triggerEl.getAttribute("aria-controls");
          if (!menuId)
            return;
          const menu = document.getElementById(menuId);
          if (menu && !menu.contains(relatedTarget)) {
            subOpen.set(false);
          }
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }));
        return {
          destroy() {
            unsubTimer();
            unsubEvents();
          }
        };
      }
    });
    const subArrow = makeElement(name("subarrow"), {
      stores: arrowSize2,
      returned: ($arrowSize) => ({
        "data-arrow": true,
        style: styleToString({
          position: "absolute",
          width: `var(--arrow-size, ${$arrowSize}px)`,
          height: `var(--arrow-size, ${$arrowSize}px)`
        })
      })
    });
    effect([rootOpen], ([$rootOpen]) => {
      if (!$rootOpen) {
        subActiveTrigger.set(null);
        subOpen.set(false);
      }
    });
    effect([pointerGraceIntent], ([$pointerGraceIntent]) => {
      if (!isBrowser || $pointerGraceIntent)
        return;
      window.clearTimeout(pointerGraceTimer.get());
    });
    effect([subOpen], ([$subOpen]) => {
      if (!isBrowser)
        return;
      if ($subOpen && isUsingKeyboard.get()) {
        sleep(1).then(() => {
          const menuEl = document.getElementById(subIds.menu.get());
          if (!menuEl)
            return;
          const menuItems = getMenuItems(menuEl);
          if (!menuItems.length)
            return;
          handleRovingFocus(menuItems[0]);
        });
      }
      if (!$subOpen) {
        const focusedItem = currentFocusedItem.get();
        const subTriggerEl = document.getElementById(subIds.trigger.get());
        if (focusedItem) {
          sleep(1).then(() => {
            const menuEl = document.getElementById(subIds.menu.get());
            if (!menuEl)
              return;
            if (menuEl.contains(focusedItem)) {
              removeHighlight(focusedItem);
            }
          });
        }
        if (!subTriggerEl || document.activeElement === subTriggerEl)
          return;
        removeHighlight(subTriggerEl);
      }
    });
    return {
      ids: subIds,
      elements: {
        subTrigger,
        subMenu,
        subArrow
      },
      states: {
        subOpen
      },
      options
    };
  };
  safeOnMount(() => {
    const triggerEl = document.getElementById(rootIds.trigger.get());
    if (isHTMLElement(triggerEl) && rootOpen.get()) {
      rootActiveTrigger.set(triggerEl);
    }
    const unsubs = [];
    const handlePointer = () => isUsingKeyboard.set(false);
    const handleKeyDown = () => {
      isUsingKeyboard.set(true);
      unsubs.push(executeCallbacks(addEventListener(document, "pointerdown", handlePointer, { capture: true, once: true }), addEventListener(document, "pointermove", handlePointer, { capture: true, once: true })));
    };
    const keydownListener = (e) => {
      if (e.key === kbd.ESCAPE && closeOnEscape.get()) {
        rootOpen.set(false);
        return;
      }
    };
    unsubs.push(addEventListener(document, "keydown", handleKeyDown, { capture: true }));
    unsubs.push(addEventListener(document, "keydown", keydownListener));
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  effect([rootOpen, currentFocusedItem], ([$rootOpen, $currentFocusedItem]) => {
    if (!$rootOpen && $currentFocusedItem) {
      removeHighlight($currentFocusedItem);
    }
  });
  effect([rootOpen], ([$rootOpen]) => {
    if (!isBrowser)
      return;
    if (!$rootOpen) {
      const $rootActiveTrigger = rootActiveTrigger.get();
      if (!$rootActiveTrigger)
        return;
      const $closeFocus = closeFocus.get();
      if (!$rootOpen && $rootActiveTrigger) {
        handleFocus({ prop: $closeFocus, defaultEl: $rootActiveTrigger });
      }
    }
  });
  effect([rootOpen, preventScroll], ([$rootOpen, $preventScroll]) => {
    if (!isBrowser)
      return;
    const unsubs = [];
    if ($rootOpen && $preventScroll) {
      unsubs.push(removeScroll());
    }
    sleep(1).then(() => {
      const menuEl = document.getElementById(rootIds.menu.get());
      if (menuEl && $rootOpen && isUsingKeyboard.get()) {
        if (disableFocusFirstItem.get()) {
          handleRovingFocus(menuEl);
          return;
        }
        const menuItems = getMenuItems(menuEl);
        if (!menuItems.length)
          return;
        handleRovingFocus(menuItems[0]);
      }
    });
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  effect(rootOpen, ($rootOpen) => {
    if (!isBrowser)
      return;
    const handlePointer = () => isUsingKeyboard.set(false);
    const handleKeyDown = (e) => {
      isUsingKeyboard.set(true);
      if (e.key === kbd.ESCAPE && $rootOpen && closeOnEscape.get()) {
        rootOpen.set(false);
        return;
      }
    };
    return executeCallbacks(addEventListener(document, "pointerdown", handlePointer, { capture: true, once: true }), addEventListener(document, "pointermove", handlePointer, { capture: true, once: true }), addEventListener(document, "keydown", handleKeyDown, { capture: true }));
  });
  function handleOpen(triggerEl) {
    rootOpen.update((prev) => {
      const isOpen = !prev;
      if (isOpen) {
        nextFocusable.set(getNextFocusable(triggerEl));
        prevFocusable.set(getPreviousFocusable(triggerEl));
        rootActiveTrigger.set(triggerEl);
      }
      return isOpen;
    });
  }
  function onItemFocusIn(e) {
    const itemEl = e.currentTarget;
    if (!isHTMLElement(itemEl))
      return;
    const $currentFocusedItem = currentFocusedItem.get();
    if ($currentFocusedItem) {
      removeHighlight($currentFocusedItem);
    }
    addHighlight(itemEl);
    currentFocusedItem.set(itemEl);
  }
  function onItemFocusOut(e) {
    const itemEl = e.currentTarget;
    if (!isHTMLElement(itemEl))
      return;
    removeHighlight(itemEl);
  }
  function onItemEnter(e) {
    if (isPointerMovingToSubmenu(e)) {
      e.preventDefault();
    }
  }
  function onItemLeave(e) {
    if (isPointerMovingToSubmenu(e)) {
      return;
    }
    const target = e.target;
    if (!isHTMLElement(target))
      return;
    const parentMenuEl = getParentMenu(target);
    if (!parentMenuEl)
      return;
    handleRovingFocus(parentMenuEl);
  }
  function onTriggerLeave(e) {
    if (isPointerMovingToSubmenu(e)) {
      e.preventDefault();
    }
  }
  function onMenuPointerMove(e) {
    if (!isMouse(e))
      return;
    const target = e.target;
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(currentTarget) || !isHTMLElement(target))
      return;
    const $lastPointerX = lastPointerX.get();
    const pointerXHasChanged = $lastPointerX !== e.clientX;
    if (currentTarget.contains(target) && pointerXHasChanged) {
      const newDir = e.clientX > $lastPointerX ? "right" : "left";
      pointerDir.set(newDir);
      lastPointerX.set(e.clientX);
    }
  }
  function onMenuItemPointerMove(e, currTarget = null) {
    if (!isMouse(e))
      return;
    onItemEnter(e);
    if (e.defaultPrevented)
      return;
    if (currTarget) {
      handleRovingFocus(currTarget);
      return;
    }
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(currentTarget))
      return;
    handleRovingFocus(currentTarget);
  }
  function onMenuItemPointerLeave(e) {
    if (!isMouse(e))
      return;
    onItemLeave(e);
  }
  function onItemKeyDown(e) {
    const $typed = typed.get();
    const isTypingAhead = $typed.length > 0;
    if (isTypingAhead && e.key === kbd.SPACE) {
      e.preventDefault();
      return;
    }
    if (SELECTION_KEYS.includes(e.key)) {
      e.preventDefault();
      const itemEl = e.currentTarget;
      if (!isHTMLElement(itemEl))
        return;
      itemEl.click();
    }
  }
  function isIndeterminate(checked) {
    return checked === "indeterminate";
  }
  function getCheckedState(checked) {
    return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
  }
  function isPointerMovingToSubmenu(e) {
    return pointerMovingToSubmenu.get()(e);
  }
  function getParentMenu(element) {
    const parentMenuEl = element.closest('[role="menu"]');
    if (!isHTMLElement(parentMenuEl))
      return null;
    return parentMenuEl;
  }
  return {
    elements: {
      trigger: rootTrigger,
      menu: rootMenu,
      overlay,
      item,
      group,
      groupLabel,
      arrow: rootArrow,
      separator
    },
    builders: {
      createCheckboxItem,
      createSubmenu,
      createMenuRadioGroup
    },
    states: {
      open: rootOpen
    },
    helpers: {
      handleTypeaheadSearch
    },
    ids: rootIds,
    options: opts.rootOptions
  };
}
function handleTabNavigation(e, nextFocusable, prevFocusable) {
  if (e.shiftKey) {
    const $prevFocusable = prevFocusable.get();
    if ($prevFocusable) {
      e.preventDefault();
      sleep(1).then(() => $prevFocusable.focus());
      prevFocusable.set(null);
    }
  } else {
    const $nextFocusable = nextFocusable.get();
    if ($nextFocusable) {
      e.preventDefault();
      sleep(1).then(() => $nextFocusable.focus());
      nextFocusable.set(null);
    }
  }
}
function getMenuItems(menuElement) {
  return Array.from(menuElement.querySelectorAll(`[data-melt-menu-id="${menuElement.id}"]`)).filter((item) => isHTMLElement(item));
}
function applyAttrsIfDisabled(element) {
  if (!element || !isElementDisabled(element))
    return;
  element.setAttribute("data-disabled", "");
  element.setAttribute("aria-disabled", "true");
}
function clearTimerStore(timerStore) {
  if (!isBrowser)
    return;
  const timer = timerStore.get();
  if (timer) {
    window.clearTimeout(timer);
    timerStore.set(null);
  }
}
function isMouse(e) {
  return e.pointerType === "mouse";
}
function setMeltMenuAttribute(element, selector) {
  if (!element)
    return;
  const menuEl = element.closest(`${selector()}, ${selector("submenu")}`);
  if (!isHTMLElement(menuEl))
    return;
  element.setAttribute("data-melt-menu-id", menuEl.id);
}
function handleMenuNavigation(e, loop) {
  e.preventDefault();
  const currentFocusedItem = document.activeElement;
  const currentTarget = e.currentTarget;
  if (!isHTMLElement(currentFocusedItem) || !isHTMLElement(currentTarget))
    return;
  const menuItems = getMenuItems(currentTarget);
  if (!menuItems.length)
    return;
  const candidateNodes = menuItems.filter((item) => {
    if (item.hasAttribute("data-disabled") || item.getAttribute("disabled") === "true") {
      return false;
    }
    return true;
  });
  const currentIndex = candidateNodes.indexOf(currentFocusedItem);
  let nextIndex;
  switch (e.key) {
    case kbd.ARROW_DOWN:
      if (loop) {
        nextIndex = currentIndex < candidateNodes.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex < candidateNodes.length - 1 ? currentIndex + 1 : currentIndex;
      }
      break;
    case kbd.ARROW_UP:
      if (loop) {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : candidateNodes.length - 1;
      } else {
        nextIndex = currentIndex < 0 ? candidateNodes.length - 1 : currentIndex > 0 ? currentIndex - 1 : 0;
      }
      break;
    case kbd.HOME:
      nextIndex = 0;
      break;
    case kbd.END:
      nextIndex = candidateNodes.length - 1;
      break;
    default:
      return;
  }
  handleRovingFocus(candidateNodes[nextIndex]);
}
function isPointerInGraceArea(e, area) {
  if (!area)
    return false;
  const cursorPos = { x: e.clientX, y: e.clientY };
  return isPointInPolygon(cursorPos, area);
}
function isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
}
function isFocusWithinSubmenu(submenuId) {
  const activeEl = document.activeElement;
  if (!isHTMLElement(activeEl))
    return false;
  const submenuEl = activeEl.closest(`[data-id="${submenuId}"]`);
  return isHTMLElement(submenuEl);
}
function stateAttr(open) {
  return open ? "open" : "closed";
}
const defaults$1 = {
  arrowSize: 8,
  positioning: {
    placement: "bottom"
  },
  preventScroll: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  portal: void 0,
  loop: false,
  dir: "ltr",
  defaultOpen: false,
  forceVisible: false,
  typeahead: true,
  closeFocus: void 0,
  disableFocusFirstItem: false,
  closeOnItemClick: true,
  onOutsideClick: void 0
};
function createDropdownMenu(props) {
  const withDefaults = { ...defaults$1, ...props };
  const rootOptions = toWritableStores(omit(withDefaults, "ids"));
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const rootOpen = overridable(openWritable, withDefaults?.onOpenChange);
  const rootActiveTrigger = withGet(writable(null));
  const nextFocusable = withGet(writable(null));
  const prevFocusable = withGet(writable(null));
  const { elements, builders, ids, states, options } = createMenuBuilder({
    rootOptions,
    rootOpen,
    rootActiveTrigger: withGet(rootActiveTrigger),
    nextFocusable: withGet(nextFocusable),
    prevFocusable: withGet(prevFocusable),
    selector: "dropdown-menu",
    ids: withDefaults.ids
  });
  return {
    ids,
    elements,
    states,
    builders,
    options
  };
}
const defaults = {
  orientation: "horizontal",
  decorative: false
};
const createSeparator = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(withDefaults);
  const { orientation, decorative } = options;
  const root = makeElement("separator", {
    stores: [orientation, decorative],
    returned: ([$orientation, $decorative]) => {
      const ariaOrientation = $orientation === "vertical" ? $orientation : void 0;
      return {
        role: $decorative ? "none" : "separator",
        "aria-orientation": ariaOrientation,
        "aria-hidden": $decorative,
        "data-orientation": $orientation
      };
    }
  });
  return {
    elements: {
      root
    },
    options
  };
};
function getMenuData() {
  const NAME = "menu";
  const SUB_NAME = "menu-submenu";
  const RADIO_GROUP_NAME = "menu-radiogroup";
  const CHECKBOX_ITEM_NAME = "menu-checkboxitem";
  const RADIO_ITEM_NAME = "menu-radioitem";
  const GROUP_NAME = "menu-group";
  const PARTS = [
    "arrow",
    "checkbox-indicator",
    "checkbox-item",
    "content",
    "group",
    "item",
    "label",
    "radio-group",
    "radio-item",
    "radio-indicator",
    "separator",
    "sub-content",
    "sub-trigger",
    "trigger"
  ];
  return {
    NAME,
    SUB_NAME,
    RADIO_GROUP_NAME,
    CHECKBOX_ITEM_NAME,
    RADIO_ITEM_NAME,
    GROUP_NAME,
    PARTS
  };
}
function getCtx() {
  const { NAME } = getMenuData();
  return getContext(NAME);
}
function setCtx(props) {
  const { NAME, PARTS } = getMenuData();
  const getAttrs = createBitAttrs("menu", PARTS);
  const dropdownMenu = {
    ...createDropdownMenu({ ...removeUndefined(props), forceVisible: true }),
    getAttrs
  };
  setContext(NAME, dropdownMenu);
  return {
    ...dropdownMenu,
    updateOption: getOptionUpdater(dropdownMenu.options)
  };
}
function setRadioGroupCtx(props) {
  const { RADIO_GROUP_NAME } = getMenuData();
  const { builders: { createMenuRadioGroup }, getAttrs } = getCtx();
  const radioGroup = createMenuRadioGroup(props);
  setContext(RADIO_GROUP_NAME, { ...radioGroup, getAttrs });
  return {
    ...radioGroup,
    getAttrs
  };
}
function setRadioItem(value) {
  const { RADIO_ITEM_NAME, RADIO_GROUP_NAME } = getMenuData();
  const dropdownMenu = getContext(RADIO_GROUP_NAME);
  setContext(RADIO_ITEM_NAME, { ...dropdownMenu, value });
  return {
    ...dropdownMenu,
    value
  };
}
function getRadioIndicator() {
  const { RADIO_ITEM_NAME } = getMenuData();
  const radioItem = getContext(RADIO_ITEM_NAME);
  return {
    ...radioItem
  };
}
function getGroupLabel() {
  const { GROUP_NAME } = getMenuData();
  const id = getContext(GROUP_NAME) ?? generateId();
  const { elements: { groupLabel }, getAttrs } = getCtx();
  return { groupLabel, id, getAttrs };
}
function updatePositioning(props) {
  const defaultPlacement = {
    side: "bottom",
    align: "center"
  };
  const withDefaults = { ...defaultPlacement, ...props };
  const { options: { positioning } } = getCtx();
  const updater = getPositioningUpdater(positioning);
  updater(withDefaults);
}
const Menu_label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $groupLabel, $$unsubscribe_groupLabel;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { groupLabel, id, getAttrs } = getGroupLabel();
  $$unsubscribe_groupLabel = subscribe(groupLabel, (value) => $groupLabel = value);
  const attrs = getAttrs("label");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $groupLabel(id);
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_groupLabel();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Menu_radio_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["value", "disabled", "asChild", "el"]);
  let $radioItem, $$unsubscribe_radioItem;
  let { value } = $$props;
  let { disabled = false } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { radioItem }, getAttrs } = setRadioItem(value);
  $$unsubscribe_radioItem = subscribe(radioItem, (value2) => $radioItem = value2);
  const attrs = getAttrs("radio-item");
  createDispatcher();
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $radioItem({ value, disabled });
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_radioItem();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Menu_separator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $separator, $$unsubscribe_separator;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { separator }, getAttrs } = getCtx();
  $$unsubscribe_separator = subscribe(separator, (value) => $separator = value);
  const attrs = getAttrs("separator");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $separator;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_separator();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object($separator), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>`}`;
});
const Menu_radio_group = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["value", "onValueChange", "asChild", "el"]);
  let $radioGroup, $$unsubscribe_radioGroup;
  let { value = void 0 } = $$props;
  let { onValueChange = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { radioGroup }, states: { value: localValue }, getAttrs } = setRadioGroupCtx({
    defaultValue: value,
    onValueChange: ({ next }) => {
      if (next != null && next !== value) {
        onValueChange?.(next);
        value = next;
      }
      return next;
    }
  });
  $$unsubscribe_radioGroup = subscribe(radioGroup, (value2) => $radioGroup = value2);
  const attrs = getAttrs("radio-group");
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0) $$bindings.onValueChange(onValueChange);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  value !== void 0 && localValue.set(value);
  builder = $radioGroup;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_radioGroup();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Menu_radio_indicator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let checked;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $isChecked, $$unsubscribe_isChecked;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { helpers: { isChecked }, value, getAttrs } = getRadioIndicator();
  $$unsubscribe_isChecked = subscribe(isChecked, (value2) => $isChecked = value2);
  const attrs = getAttrs("radio-indicator");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  checked = $isChecked(value);
  $$unsubscribe_isChecked();
  return `${asChild ? `${slots.default ? slots.default({ attrs, checked }) : ``}` : `<div${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${checked ? `${slots.default ? slots.default({ attrs, checked }) : ``}` : ``}</div>`}`;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $idValues, $$unsubscribe_idValues;
  let { closeOnOutsideClick = void 0 } = $$props;
  let { closeOnEscape = void 0 } = $$props;
  let { portal = void 0 } = $$props;
  let { open = void 0 } = $$props;
  let { onOpenChange = void 0 } = $$props;
  let { preventScroll = void 0 } = $$props;
  let { loop = void 0 } = $$props;
  let { dir = void 0 } = $$props;
  let { typeahead = void 0 } = $$props;
  let { closeFocus = void 0 } = $$props;
  let { disableFocusFirstItem = void 0 } = $$props;
  let { closeOnItemClick = void 0 } = $$props;
  let { onOutsideClick = void 0 } = $$props;
  const { states: { open: localOpen }, updateOption, ids } = setCtx({
    closeOnOutsideClick,
    closeOnEscape,
    portal,
    forceVisible: true,
    defaultOpen: open,
    preventScroll,
    loop,
    dir,
    typeahead,
    closeFocus,
    disableFocusFirstItem,
    closeOnItemClick,
    onOutsideClick,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    }
  });
  const idValues = derived([ids.menu, ids.trigger], ([$menuId, $triggerId]) => ({ menu: $menuId, trigger: $triggerId }));
  $$unsubscribe_idValues = subscribe(idValues, (value) => $idValues = value);
  if ($$props.closeOnOutsideClick === void 0 && $$bindings.closeOnOutsideClick && closeOnOutsideClick !== void 0) $$bindings.closeOnOutsideClick(closeOnOutsideClick);
  if ($$props.closeOnEscape === void 0 && $$bindings.closeOnEscape && closeOnEscape !== void 0) $$bindings.closeOnEscape(closeOnEscape);
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0) $$bindings.portal(portal);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.onOpenChange === void 0 && $$bindings.onOpenChange && onOpenChange !== void 0) $$bindings.onOpenChange(onOpenChange);
  if ($$props.preventScroll === void 0 && $$bindings.preventScroll && preventScroll !== void 0) $$bindings.preventScroll(preventScroll);
  if ($$props.loop === void 0 && $$bindings.loop && loop !== void 0) $$bindings.loop(loop);
  if ($$props.dir === void 0 && $$bindings.dir && dir !== void 0) $$bindings.dir(dir);
  if ($$props.typeahead === void 0 && $$bindings.typeahead && typeahead !== void 0) $$bindings.typeahead(typeahead);
  if ($$props.closeFocus === void 0 && $$bindings.closeFocus && closeFocus !== void 0) $$bindings.closeFocus(closeFocus);
  if ($$props.disableFocusFirstItem === void 0 && $$bindings.disableFocusFirstItem && disableFocusFirstItem !== void 0) $$bindings.disableFocusFirstItem(disableFocusFirstItem);
  if ($$props.closeOnItemClick === void 0 && $$bindings.closeOnItemClick && closeOnItemClick !== void 0) $$bindings.closeOnItemClick(closeOnItemClick);
  if ($$props.onOutsideClick === void 0 && $$bindings.onOutsideClick && onOutsideClick !== void 0) $$bindings.onOutsideClick(onOutsideClick);
  open !== void 0 && localOpen.set(open);
  {
    updateOption("closeOnOutsideClick", closeOnOutsideClick);
  }
  {
    updateOption("closeOnEscape", closeOnEscape);
  }
  {
    updateOption("portal", portal);
  }
  {
    updateOption("preventScroll", preventScroll);
  }
  {
    updateOption("loop", loop);
  }
  {
    updateOption("dir", dir);
  }
  {
    updateOption("closeFocus", closeFocus);
  }
  {
    updateOption("disableFocusFirstItem", disableFocusFirstItem);
  }
  {
    updateOption("typeahead", typeahead);
  }
  {
    updateOption("closeOnItemClick", closeOnItemClick);
  }
  {
    updateOption("onOutsideClick", onOutsideClick);
  }
  $$unsubscribe_idValues();
  return `${slots.default ? slots.default({ ids: $idValues }) : ``}`;
});
const Menu_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
    "side",
    "align",
    "sideOffset",
    "alignOffset",
    "collisionPadding",
    "avoidCollisions",
    "collisionBoundary",
    "sameWidth",
    "fitViewport",
    "strategy",
    "overlap",
    "el"
  ]);
  let $open, $$unsubscribe_open;
  let $menu, $$unsubscribe_menu;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { side = "bottom" } = $$props;
  let { align = "center" } = $$props;
  let { sideOffset = 0 } = $$props;
  let { alignOffset = 0 } = $$props;
  let { collisionPadding = 8 } = $$props;
  let { avoidCollisions = true } = $$props;
  let { collisionBoundary = void 0 } = $$props;
  let { sameWidth = false } = $$props;
  let { fitViewport = false } = $$props;
  let { strategy = "absolute" } = $$props;
  let { overlap = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { menu }, states: { open }, ids, getAttrs } = getCtx();
  $$unsubscribe_menu = subscribe(menu, (value) => $menu = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  createDispatcher();
  const attrs = getAttrs("content");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0) $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0) $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0) $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0) $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.side === void 0 && $$bindings.side && side !== void 0) $$bindings.side(side);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0) $$bindings.align(align);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0) $$bindings.sideOffset(sideOffset);
  if ($$props.alignOffset === void 0 && $$bindings.alignOffset && alignOffset !== void 0) $$bindings.alignOffset(alignOffset);
  if ($$props.collisionPadding === void 0 && $$bindings.collisionPadding && collisionPadding !== void 0) $$bindings.collisionPadding(collisionPadding);
  if ($$props.avoidCollisions === void 0 && $$bindings.avoidCollisions && avoidCollisions !== void 0) $$bindings.avoidCollisions(avoidCollisions);
  if ($$props.collisionBoundary === void 0 && $$bindings.collisionBoundary && collisionBoundary !== void 0) $$bindings.collisionBoundary(collisionBoundary);
  if ($$props.sameWidth === void 0 && $$bindings.sameWidth && sameWidth !== void 0) $$bindings.sameWidth(sameWidth);
  if ($$props.fitViewport === void 0 && $$bindings.fitViewport && fitViewport !== void 0) $$bindings.fitViewport(fitViewport);
  if ($$props.strategy === void 0 && $$bindings.strategy && strategy !== void 0) $$bindings.strategy(strategy);
  if ($$props.overlap === void 0 && $$bindings.overlap && overlap !== void 0) $$bindings.overlap(overlap);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.menu.set(id);
    }
  }
  builder = $menu;
  {
    Object.assign(builder, attrs);
  }
  {
    if ($open) {
      updatePositioning({
        side,
        align,
        sideOffset,
        alignOffset,
        collisionPadding,
        avoidCollisions,
        collisionBoundary,
        sameWidth,
        fitViewport,
        strategy,
        overlap
      });
    }
  }
  $$unsubscribe_open();
  $$unsubscribe_menu();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${$open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Menu_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "id", "el"]);
  let $trigger, $$unsubscribe_trigger;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { trigger }, ids, getAttrs } = getCtx();
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  createDispatcher();
  const attrs = getAttrs("trigger");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.trigger.set(id);
    }
  }
  builder = $trigger;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_trigger();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const AbilityListView = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const AbilityList = [
    {
      type: "serverless",
      content: "熟悉 Serverless 架构，能熟练使用 Cloudflare Workers 进行应用开发，以及 Zeabur 部署服务。"
    },
    {
      type: "dev",
      content: "理解面向对象基本原理，能熟练使用 Node.js、PHP 进行系统及架构开发设计，可以使用 Java、Python 进行系统开发，了解 Rust、C / CPP。"
    },
    {
      type: "web-devices",
      content: "熟练使用 WEB 大前端相关技术，能够从头创建自适应界面，能通过 JavaScript 进行工程化开发设计，能借助 Electron、NW.js、uni-app 及 Flutter 进行跨平台系统应用开发工作。"
    },
    {
      type: "api",
      content: "对应用程序接口 API / SDK 有深入理解，能快速完成 API 设计、开发、测试及部署这一整套流程。"
    },
    {
      type: "cache",
      content: "熟悉 LNMP 架构原理，熟悉数据库常见的操作及查询优化，精通常见的缓存技术如 Redis / Memcached。"
    },
    {
      type: "wallet",
      content: "熟悉支付平台整体架构及充值、提现、退款、打款、对账、结算和代发代付等基本业务流程。"
    },
    {
      type: "daq",
      content: "熟练使用 Node.js、Python 进行数据采集，包括 Nightmare、Puppeteer 等浏览器自动化框架。"
    },
    {
      type: "sec",
      content: "熟悉 Javascript 逆向，对渗透测试、社工技术有一定了解，能借助各类情报平台、工具进行信息挖掘。"
    },
    {
      type: "me",
      content: "拥抱新技术，接受新观点，终生学习者。"
    }
  ];
  return `<ul class="px-profile space-y-2 text-sm xs:text-base">${each(AbilityList, (ability) => {
    return `<li class="flex gap-2 items-start leading-[24px]"><div class="shrink-0 w-7 opacity-80">${ability.type === "serverless" ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-world"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path><path d="M3.6 9h16.8"></path><path d="M3.6 15h16.8"></path><path d="M11.5 3a17 17 0 0 0 0 18"></path><path d="M12.5 3a17 17 0 0 1 0 18"></path></svg>` : ``} ${ability.type === "dev" ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-code" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7 8l-4 4l4 4"></path><path d="M17 8l4 4l-4 4"></path><path d="M14 4l-4 16"></path></svg>` : ``} ${ability.type === "sec" ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shield-half" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"></path><path d="M12 3v18"></path></svg>` : ``} ${ability.type === "daq" ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-database-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3"></path><path d="M4 6v6c0 1.657 3.582 3 8 3m8 -3.5v-5.5"></path><path d="M4 12v6c0 1.657 3.582 3 8 3"></path><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path><path d="M20.2 20.2l1.8 1.8"></path></svg>` : ``} ${ability.type === "wallet" ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wallet" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12"></path><path d="M20 12v4h-4a2 2 0 0 1 0 -4h4"></path></svg>` : ``} ${ability.type === "web-devices" ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-devices-code" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M13 15.5v-6.5a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v4m0 6a1 1 0 0 1 -1 1"></path><path d="M18 8v-3a1 1 0 0 0 -1 -1h-13a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h7"></path><path d="M20 21l2 -2l-2 -2"></path><path d="M17 17l-2 2l2 2"></path><path d="M16 9h2"></path></svg>` : ``} ${ability.type === "api" ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-api" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 13h5"></path><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"></path><path d="M20 8v8"></path><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"></path></svg>` : ``} ${ability.type === "cache" ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-analyze" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M20 11a8.1 8.1 0 0 0 -6.986 -6.918a8.095 8.095 0 0 0 -8.019 3.918"></path><path d="M4 13a8.1 8.1 0 0 0 15 3"></path><path d="M19 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M5 8m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path></svg>` : ``} ${ability.type === "me" ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-seeding" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 10a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3"></path><path d="M12 14a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3"></path><path d="M12 20l0 -10"></path></svg>` : ``}</div> <p>${escape(ability.content)}</p> </li>`;
  })}</ul>`;
});
const SkillListView = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const SkillList = [
    {
      name: "编程",
      items: [
        {
          key: "精通",
          value: "HTML/CSS, JavaScript, Node.js, PHP"
        },
        {
          key: "熟练",
          value: "MySQL, PostgreSQL, Java, Python, Dart, Redis, Memcached, Nginx, Linux, Git"
        },
        {
          key: "了解",
          value: "Rust, Kotlin, C"
        }
      ]
    },
    {
      name: "框架",
      items: [
        {
          key: "精通",
          value: "jQuery, Svelte, TypeScript, Tailwind, Webman"
        },
        {
          key: "熟练",
          value: "Serverless, Electron, NW.js, Flutter, Vue.js, Vite.js, SpringBoot, Docker"
        },
        {
          key: "了解",
          value: "React, ReactNative"
        }
      ]
    },
    {
      name: "Art",
      items: [
        {
          key: "熟练",
          value: "Photoshop, Illustrator, Premiere Pro, UI / RP"
        }
      ]
    },
    {
      name: "社工",
      items: [
        {
          key: "熟练",
          value: "社会工程学, OSINT, 渗透测试, SQLMap, Burp Suite, Nmap"
        }
      ]
    }
  ];
  return `${each(SkillList, (item) => {
    return `<section class="flex items-start px-profile"><div class="font-semibold w-16 shrink-0 break-all pr-1">${escape(item.name)}</div> <ul class="flex flex-col gap-2">${each(item.items, (skill) => {
      return `<li class="flex flex-wrap items-center gap-2">${validate_component(Badge, "Badge").$$render(
        $$result,
        {
          class: "bg-green-600 hover:bg-green-700 \n      text-white rounded-sm"
        },
        {},
        {
          default: () => {
            return `${escape(skill.key)}`;
          }
        }
      )} ${each(skill.value.split(","), (skillItem) => {
        return `${validate_component(Badge, "Badge").$$render($$result, { class: "rounded-sm", variant: "outline" }, {}, {
          default: () => {
            return `${escape(skillItem.trim())}`;
          }
        })}`;
      })} </li>`;
    })}</ul> </section>`;
  })}`;
});
const File_type_pdf = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M14 3v4a1 1 0 0 0 1 1h4" }],
    ["path", { "d": "M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" }],
    [
      "path",
      {
        "d": "M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6"
      }
    ],
    ["path", { "d": "M17 18h2" }],
    ["path", { "d": "M20 15h-3v6" }],
    [
      "path",
      {
        "d": "M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { type: "outline" }, { name: "file-type-pdf" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M5 12l-2 0l9 -9l9 9l-2 0" }],
    [
      "path",
      {
        "d": "M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"
      }
    ],
    [
      "path",
      {
        "d": "M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { type: "outline" }, { name: "home" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Receipt = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2m4 -14h6m-6 4h6m-2 4h2"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { type: "outline" }, { name: "receipt" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Share = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
      }
    ],
    [
      "path",
      {
        "d": "M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
      }
    ],
    [
      "path",
      {
        "d": "M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
      }
    ],
    ["path", { "d": "M8.7 10.7l6.6 -3.4" }],
    ["path", { "d": "M8.7 13.3l6.6 3.4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { type: "outline" }, { name: "share" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const File_type_html = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M14 3v4a1 1 0 0 0 1 1h4" }],
    ["path", { "d": "M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" }],
    ["path", { "d": "M2 21v-6" }],
    ["path", { "d": "M5 15v6" }],
    ["path", { "d": "M2 18h3" }],
    ["path", { "d": "M20 15v6h2" }],
    ["path", { "d": "M13 21v-6l2 3l2 -3v6" }],
    ["path", { "d": "M7.5 15h3" }],
    ["path", { "d": "M9 15v6" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { type: "outline" }, { name: "file-type-html" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Building_estate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M3 21h18" }],
    ["path", { "d": "M19 21v-4" }],
    [
      "path",
      {
        "d": "M19 17a2 2 0 0 0 2 -2v-2a2 2 0 1 0 -4 0v2a2 2 0 0 0 2 2z"
      }
    ],
    [
      "path",
      {
        "d": "M14 21v-14a3 3 0 0 0 -3 -3h-4a3 3 0 0 0 -3 3v14"
      }
    ],
    ["path", { "d": "M9 17v4" }],
    ["path", { "d": "M8 13h2" }],
    ["path", { "d": "M8 9h2" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { type: "outline" }, { name: "building-estate" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Microscope = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M5 21h14" }],
    ["path", { "d": "M6 18h2" }],
    ["path", { "d": "M7 18v3" }],
    ["path", { "d": "M9 11l3 3l6 -6l-3 -3z" }],
    ["path", { "d": "M10.5 12.5l-1.5 1.5" }],
    ["path", { "d": "M17 3l3 3" }],
    ["path", { "d": "M12 21a6 6 0 0 0 3.715 -10.712" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { type: "outline" }, { name: "microscope" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Accessible = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"
      }
    ],
    [
      "path",
      {
        "d": "M10 16.5l2 -3l2 3m-2 -3v-2l3 -1m-6 0l3 1"
      }
    ],
    [
      "circle",
      {
        "cx": "12",
        "cy": "7.5",
        "r": ".5",
        "fill": "currentColor"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { type: "outline" }, { name: "accessible" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Tools = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4"
      }
    ],
    ["path", { "d": "M14.5 5.5l4 4" }],
    ["path", { "d": "M12 8l-5 -5l-4 4l5 5" }],
    ["path", { "d": "M7 8l-1.5 1.5" }],
    ["path", { "d": "M16 12l5 5l-4 4l-5 -5" }],
    ["path", { "d": "M16 17l-1.5 1.5" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { type: "outline" }, { name: "tools" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Dropdown_menu_label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "inset"]);
  let { class: className = void 0 } = $$props;
  let { inset = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.inset === void 0 && $$bindings.inset && inset !== void 0) $$bindings.inset(inset);
  return `${validate_component(Menu_label, "DropdownMenuPrimitive.Label").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)
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
const Dropdown_menu_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "sideOffset", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { sideOffset = 4 } = $$props;
  let { transition = flyAndScale } = $$props;
  let { transitionConfig = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0) $$bindings.sideOffset(sideOffset);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(Menu_content, "DropdownMenuPrimitive.Content").$$render(
    $$result,
    Object.assign(
      {},
      { transition },
      { transitionConfig },
      { sideOffset },
      {
        class: cn("z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md focus:outline-none", className)
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
const DotFilled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "ariaLabel", "withEvents"]);
  const ctx = getContext("iconCtx") ?? {};
  let { size = ctx.size || "24" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { color = ctx.color || "currentColor" } = $$props;
  let { ariaLabel = "dot filled," } = $$props;
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
  )}><path d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z" fill="currentColor"></path></svg>` : `<svg${spread(
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
  )}><path d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z" fill="currentColor"></path></svg>`} `;
});
const Dropdown_menu_radio_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  return `${validate_component(Menu_radio_item, "DropdownMenuPrimitive.RadioItem").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50", className)
      },
      { value },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">${validate_component(Menu_radio_indicator, "DropdownMenuPrimitive.RadioIndicator").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(DotFilled, "DotFilled").$$render($$result, { class: "h-4 w-4 fill-current" }, {}, {})}`;
          }
        })}</span> ${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Dropdown_menu_separator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Menu_separator, "DropdownMenuPrimitive.Separator").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("-mx-1 my-1 h-px bg-muted", className)
      },
      $$restProps
    ),
    {},
    {}
  )}`;
});
const Dropdown_menu_radio_group = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["value"]);
  let { value = void 0 } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Menu_radio_group, "DropdownMenuPrimitive.RadioGroup").$$render(
      $$result,
      Object.assign({}, $$restProps, { value }),
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Root = Menu;
const Trigger = Menu_trigger;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const PI = {
    mode: data.mode,
    shareTip: "分享",
    shareTimer: setTimeout(() => {
    }),
    language: data.language
  };
  const Profile = {
    fullname_en: "JU Chengren",
    birthdate: "2002-02-14",
    email: "hi@gxzv.com",
    phone: data.phone || "",
    website: "https://gxzv.com",
    intros: [
      "一名全栈工程师 & 独立开发者，有六年的从 0 到 1 的互联网项目开发及运营经验。",
      "有简化复杂事物的天赋，致力于多样化，包容开放行为，拥抱伤害和困顿。"
    ]
  };
  const Menus = [
    {
      icon: Home,
      title: "主页",
      tip: "主页",
      href: "/",
      smHidden: false
    },
    {
      icon: File_type_pdf,
      title: "PDF",
      tip: "PDF 模式",
      action: "pdf"
    },
    {
      icon: Receipt,
      title: "佐证",
      tip: "查看佐证",
      href: "/resume/support"
    },
    {
      icon: Share,
      title: "分享",
      tip: "分享",
      action: "share"
    }
  ];
  const Navs = [
    {
      id: "employments",
      icon: Building_estate,
      title: "工作经历"
    },
    {
      id: "projects",
      icon: Microscope,
      title: "个人项目"
    },
    {
      id: "accessibles",
      icon: Accessible,
      title: "个人能力"
    },
    {
      id: "tools",
      icon: Tools,
      title: "个人技能"
    }
  ];
  EmploymentListData.map((item) => {
    return { ...item, supports: void 0 };
  });
  let ProjectList = [
    ...ProjectListData.map((item) => {
      return { ...item, supports: void 0 };
    }),
    {
      id: "more",
      dom_class: "opacity-80",
      title: "更多项目请私信咨询",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-puzzle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
 <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
 <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1"></path>
</svg>`,
      keywords: ["🤐"],
      finished_at: "2023-10",
      contents: [
        {
          key: "说明",
          value: "有较多项目因待完善或保密需要未做公布，劳烦私信咨询。"
        }
      ]
    }
  ];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(SEO, "Seo").$$render($$result, { title: "我的简历" }, {}, {})}  ${PI.mode === "web" ? `<div class="max-w-[920px] w-full py-0 sm:px-profile flex justify-between bg-card max-sm:pb-1 sm:h-12 fixed z-20 bottom-0 sm:bottom-[unset] sm:top-6 left-1/2 -translate-x-1/2"><div class="flex items-center shrink-0 max-sm:py-1.5 shadow sm:border border-r border-t gap-4 px-4 max-sm:pb-safe">${each(Menus, (item) => {
      return `<a${add_attribute("href", item.href || null, 0)} class="${[
        "tooltip sm:tooltip-bottom cursor-pointer flex items-center max-sm:flex-col gap-1 hover:opacity-85",
        item.smHidden ? "max-sm:hidden" : ""
      ].join(" ").trim()}"${add_attribute("data-tip", item.action === "share" ? PI.shareTip : item.tip, 0)}>${validate_component(item.icon || missing_component, "svelte:component").$$render($$result, { class: "w-5 h-5" }, {}, {})} <span class="text-sm max-sm:text-xs">${escape(item.title)}</span> </a>`;
    })}</div> ${validate_component(Marquee, "Marquee").$$render(
      $$result,
      {
        class: "bg-base-100 dark:bg-base-100 \n  flex items-center flex-grow \n  shadow sm:border !border-l-0 border-t",
        repeat: 2,
        duration: 20,
        gap: "0px"
      },
      {},
      {
        default: () => {
          return `${each(Navs, (item) => {
            return `<a href="${"#" + escape(item.id, true)}" class="btn btn-ghost font-normal flex max-sm:flex-col items-center gap-1 mx-2 hover:opacity-85 max-sm:py-1.5 max-sm:pb-safe">${validate_component(item.icon || missing_component, "svelte:component").$$render($$result, { class: "w-5 h-5" }, {}, {})} <span class="text-sm max-sm:text-xs">${escape(item.title)}</span> </a>`;
          })}`;
        }
      }
    )}</div>` : ``} <div class="${[
      "profile-" + escape(PI.mode, true) + " grid-pattern min-h-screen pb-12 sm:py-24",
      PI.mode === "pdf" ? "!py-0" : ""
    ].join(" ").trim()}"><div class="${[
      "max-w-[920px] relative mx-auto bg-card shadow-lg",
      PI.mode === "pdf" ? "max-w-none" : ""
    ].join(" ").trim()}"><div class="absolute top-0 right-0 flex items-center"> ${validate_component(Root, "DropdownMenu.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Trigger, "DropdownMenu.Trigger").$$render($$result, { asChild: true }, {}, {
          default: ({ builder }) => {
            return `${validate_component(Button, "Button").$$render(
              $$result,
              {
                variant: "ghost",
                class: "rounded-none",
                builders: [builder]
              },
              {},
              {
                default: () => {
                  return `Language`;
                }
              }
            )}`;
          }
        })} ${validate_component(Dropdown_menu_content, "DropdownMenu.Content").$$render($$result, { class: "w-56 max-h-96 overflow-auto" }, {}, {
          default: () => {
            return `${validate_component(Dropdown_menu_label, "DropdownMenu.Label").$$render($$result, {}, {}, {
              default: () => {
                return `切换语言`;
              }
            })} ${validate_component(Dropdown_menu_separator, "DropdownMenu.Separator").$$render($$result, {}, {}, {})} ${validate_component(Dropdown_menu_radio_group, "DropdownMenu.RadioGroup").$$render(
              $$result,
              { value: PI.language },
              {
                value: ($$value) => {
                  PI.language = $$value;
                  $$settled = false;
                }
              },
              {
                default: () => {
                  return ` ${validate_component(Dropdown_menu_radio_item, "DropdownMenu.RadioItem").$$render($$result, { value: "chinese_simplified" }, {}, {
                    default: () => {
                      return `简体中文`;
                    }
                  })} `;
                }
              }
            )}`;
          }
        })}`;
      }
    })}  ${PI.mode === "pdf" ? `${validate_component(Button, "Button").$$render($$result, { variant: "ghost", class: "rounded-none" }, {}, {
      default: () => {
        return `${validate_component(File_type_html, "IconFileTypeHtml").$$render($$result, {}, {}, {})}`;
      }
    })}` : ``}</div> <section class="p-profile"><h1 class="text-3xl font-bold">${escape(Profile.fullname_en)}</h1> <div class="flex flex-wrap items-center gap-y-2 gap-3 mt-1">${validate_component(Badge$1, "Badge").$$render($$result, { type: "gender" }, {}, {
      default: () => {
        return `${escape(Math.floor((Date.now() - new Date(Profile.birthdate).getTime()) / (1e3 * 60 * 60 * 24 * 365)))} 岁`;
      }
    })} ${`<div class="tooltip tooltip-bottom" data-tip="个人网站">${validate_component(Badge$1, "Badge").$$render(
      $$result,
      {
        type: "website",
        iconClass: "text-green-500",
        rightClass: "bg-green-700"
      },
      {},
      {
        default: () => {
          return `<a${add_attribute("href", Profile.website, 0)}>${escape(Profile.website.replace(/^https?:\/\//, ""))}</a>`;
        }
      }
    )}</div>`} <div class="tooltip tooltip-bottom" data-tip="电子邮箱">${validate_component(Badge$1, "Badge").$$render(
      $$result,
      {
        type: "mail",
        iconClass: "text-green-500",
        rightClass: "bg-green-700"
      },
      {},
      {
        default: () => {
          return `<a href="${"mailto:" + escape(Profile.email, true)}">${escape(Profile.email)}</a>`;
        }
      }
    )}</div> ${Profile.phone ? `<div class="tooltip tooltip-bottom" data-tip="手机号码">${validate_component(Badge$1, "Badge").$$render(
      $$result,
      {
        type: "phone",
        iconClass: "text-green-500",
        rightClass: "bg-green-700"
      },
      {},
      {
        default: () => {
          return `<a${add_attribute(
            "href",
            isNaN(Number(Profile.phone)) ? null : `sms:${Profile.phone}`,
            0
          )}>+86 ${escape(Profile.phone)}</a>`;
        }
      }
    )}</div>` : ``}</div> <div class="leading-relaxed mt-4 text-sm xs:text-base flex flex-col gap-0.5">${each(Profile.intros, (intro) => {
      return `<p class="inline sm:block"><!-- HTML_TAG_START -->${intro}<!-- HTML_TAG_END --></p>`;
    })}</div></section> <section id="employments" class="bg-card-foreground/5 leading-relaxed"><div class="p-profile flex items-center justify-between"><h2 class="text-2xl font-semibold">${validate_component(Building_estate, "IconBuildingEstate").$$render($$result, { class: "text-green-400" }, {}, {})}
          工作经历</h2></div> <div class="flex flex-col gap-5" data-svelte-h="svelte-vr4j7j"><article class="p-profile !py-0"><p>最早是 18 年前后自己接 Web 方面的外包，20 年初开了个网络技术工作室，21 年底注册了家科技公司，亲力亲为。期间也在其他初创公司任职过 CTO，擅长从 0 到 1 架构并开发软件产品、产品设计和成本优化等，能独挡一面。</p></article> </div></section> <section id="projects" class="bg-card-foreground/5 pt-4">${validate_component(ProjectListView, "ProjectListView").$$render(
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
          return `<h2 slot="title" class="text-2xl font-semibold">${validate_component(Microscope, "IconMicroscope").$$render($$result, { class: "text-green-400" }, {}, {})}
          个人项目</h2>`;
        }
      }
    )}</section> <section id="accessibles" class="bg-card-foreground/5 pt-4"><div class="p-profile flex items-center justify-between"><h2 class="text-2xl font-semibold">${validate_component(Accessible, "IconAccessible").$$render($$result, { class: "text-green-400" }, {}, {})}
          个人能力</h2></div> ${validate_component(AbilityListView, "AbilityListView").$$render($$result, {}, {}, {})}</section> <section id="tools" class="bg-card-foreground/5 pt-4"><div class="p-profile flex items-center justify-between"><h2 class="text-2xl font-semibold">${validate_component(Tools, "IconTools").$$render($$result, { class: "text-green-400" }, {}, {})}
          个人技能</h2></div> <div class="flex flex-col gap-5">${validate_component(SkillListView, "SkillListView").$$render($$result, {}, {}, {})}</div></section> <div class="${["bg-card-foreground/5 py-6", PI.mode === "pdf" ? "lg:py-8" : ""].join(" ").trim()}"></div> <section><div class="${["px-profile py-6 text-sm sm:text-base", PI.mode === "pdf" ? "lg:py-8" : ""].join(" ").trim()}" data-svelte-h="svelte-35m5zk"><p class="opacity-80">🌱 World is powered by solitude</p> <p class="opacity-80">🍀 相信内向者的力量</p></div></section></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
