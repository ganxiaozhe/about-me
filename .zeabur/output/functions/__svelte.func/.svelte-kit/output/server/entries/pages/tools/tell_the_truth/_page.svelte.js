import { q as get_store_value, s as setContext, j as getContext, c as create_ssr_component, h as subscribe, k as compute_rest_props, d as spread, a as add_attribute, f as escape_object, e as escape, l as escape_attribute_value, v as validate_component, i as each } from "../../../../chunks/ssr.js";
import "../../../../chunks/index4.js";
import { C as Card } from "../../../../chunks/card.js";
import "clsx";
import { b as isHTMLElement, r as getElementByMeltId, t as isElement, v as isHTMLLabelElement, m as makeElement, a as addMeltEventListener, w as withGet, o as omit, c as createElHelpers, x as dequal, y as isObject, z as stripValues, e as executeCallbacks, k as kbd, A as isHTMLButtonElement, F as FIRST_LAST_KEYS, h as isElementDisabled, u as useEscapeKeydown, n as noop, d as disabledAttr, B as isHTMLInputElement, f as effect, s as styleToString, C as createHiddenInput, j as safeOnMount, i as isBrowser, D as makeElementArray, l as addEventListener } from "../../../../chunks/create.js";
import { w as writable, d as derived, a as readonly } from "../../../../chunks/index2.js";
import { o as overridable, t as toWritableStores, l as last, b as back, f as forward, p as prev, n as next, d as toggle, c as createBitAttrs, r as removeUndefined, g as getOptionUpdater, a as createDispatcher } from "../../../../chunks/updater.js";
import { c as createTypeaheadSearch, d as derivedVisible, u as usePopper, b as addHighlight, r as removeHighlight, f as generateId$1, e as getPositioningUpdater } from "../../../../chunks/helpers.js";
import { g as generateIds, t as tick, a as getPortalDestination, e as generateId, r as removeScroll, h as scale } from "../../../../chunks/index3.js";
import { c as cn, f as flyAndScale } from "../../../../chunks/utils.js";
import { S as SEO } from "../../../../chunks/SEO.js";
import { B as Button } from "../../../../chunks/button.js";
function getOptions(el) {
  return Array.from(el.querySelectorAll('[role="option"]:not([data-disabled])')).filter((el2) => isHTMLElement(el2));
}
function createClickOutsideIgnore(meltId) {
  return (e) => {
    const target = e.target;
    const triggerEl = getElementByMeltId(meltId);
    if (!triggerEl || !isElement(target))
      return false;
    const id = triggerEl.id;
    if (isHTMLLabelElement(target) && id === target.htmlFor) {
      return true;
    }
    if (target.closest(`label[for="${id}"]`)) {
      return true;
    }
    return false;
  };
}
function snapValueToStep(value, min, max, step) {
  const remainder = (value - (isNaN(min) ? 0 : min)) % step;
  let snappedValue = Math.abs(remainder) * 2 >= step ? value + Math.sign(remainder) * (step - Math.abs(remainder)) : value - remainder;
  if (!isNaN(min)) {
    if (snappedValue < min) {
      snappedValue = min;
    } else if (!isNaN(max) && snappedValue > max) {
      snappedValue = min + Math.floor((max - min) / step) * step;
    }
  } else if (!isNaN(max) && snappedValue > max) {
    snappedValue = Math.floor(max / step) * step;
  }
  const string = step.toString();
  const index = string.indexOf(".");
  const precision = index >= 0 ? string.length - index : 0;
  if (precision > 0) {
    const pow = Math.pow(10, precision);
    snappedValue = Math.round(snappedValue * pow) / pow;
  }
  return snappedValue;
}
function createLabel() {
  const root = makeElement("label", {
    action: (node) => {
      const mouseDown = addMeltEventListener(node, "mousedown", (e) => {
        if (!e.defaultPrevented && e.detail > 1) {
          e.preventDefault();
        }
      });
      return {
        destroy: mouseDown
      };
    }
  });
  return {
    elements: {
      root
    }
  };
}
const INTERACTION_KEYS = [kbd.ARROW_LEFT, kbd.ESCAPE, kbd.ARROW_RIGHT, kbd.SHIFT, kbd.CAPS_LOCK, kbd.CONTROL, kbd.ALT, kbd.META, kbd.ENTER, kbd.F1, kbd.F2, kbd.F3, kbd.F4, kbd.F5, kbd.F6, kbd.F7, kbd.F8, kbd.F9, kbd.F10, kbd.F11, kbd.F12];
const defaults$1 = {
  positioning: {
    placement: "bottom",
    sameWidth: true
  },
  scrollAlignment: "nearest",
  loop: true,
  defaultOpen: false,
  closeOnOutsideClick: true,
  preventScroll: true,
  closeOnEscape: true,
  forceVisible: false,
  portal: void 0,
  builder: "listbox",
  disabled: false,
  required: false,
  name: void 0,
  typeahead: true,
  highlightOnHover: true,
  onOutsideClick: void 0
};
const listboxIdParts = ["trigger", "menu", "label"];
function createListbox(props) {
  const withDefaults = { ...defaults$1, ...props };
  const activeTrigger = withGet(writable(null));
  const highlightedItem = withGet(writable(null));
  const selectedWritable = withDefaults.selected ?? writable(withDefaults.defaultSelected);
  const selected = overridable(selectedWritable, withDefaults?.onSelectedChange);
  const highlighted = derived(highlightedItem, ($highlightedItem) => $highlightedItem ? getOptionProps($highlightedItem) : void 0);
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const open = overridable(openWritable, withDefaults?.onOpenChange);
  const options = toWritableStores({
    ...omit(withDefaults, "open", "defaultOpen", "builder", "ids"),
    multiple: withDefaults.multiple ?? false
  });
  const { scrollAlignment, loop, closeOnOutsideClick, closeOnEscape, preventScroll, portal, forceVisible, positioning, multiple, arrowSize, disabled, required, typeahead, name: nameProp, highlightOnHover, onOutsideClick } = options;
  const { name: name2, selector } = createElHelpers(withDefaults.builder);
  const ids = toWritableStores({ ...generateIds(listboxIdParts), ...withDefaults.ids });
  const { handleTypeaheadSearch } = createTypeaheadSearch({
    onMatch: (element) => {
      highlightedItem.set(element);
      element.scrollIntoView({ block: scrollAlignment.get() });
    },
    getCurrentItem() {
      return highlightedItem.get();
    }
  });
  function getOptionProps(el) {
    const value = el.getAttribute("data-value");
    const label2 = el.getAttribute("data-label");
    const disabled2 = el.hasAttribute("data-disabled");
    return {
      value: value ? JSON.parse(value) : value,
      label: label2 ?? el.textContent ?? void 0,
      disabled: disabled2 ? true : false
    };
  }
  const setOption = (newOption) => {
    selected.update(($option) => {
      const $multiple = multiple.get();
      if ($multiple) {
        const optionArr = Array.isArray($option) ? [...$option] : [];
        return toggle(newOption, optionArr, (itemA, itemB) => dequal(itemA.value, itemB.value));
      }
      return newOption;
    });
  };
  function selectItem(item) {
    const props2 = getOptionProps(item);
    setOption(props2);
  }
  async function openMenu() {
    open.set(true);
    const triggerEl = document.getElementById(ids.trigger.get());
    if (!triggerEl)
      return;
    if (triggerEl !== activeTrigger.get())
      activeTrigger.set(triggerEl);
    await tick();
    const menuElement = document.getElementById(ids.menu.get());
    if (!isHTMLElement(menuElement))
      return;
    const selectedItem = menuElement.querySelector("[aria-selected=true]");
    if (!isHTMLElement(selectedItem))
      return;
    highlightedItem.set(selectedItem);
  }
  function closeMenu() {
    open.set(false);
    highlightedItem.set(null);
  }
  const isVisible = derivedVisible({ open, forceVisible, activeTrigger });
  const isSelected = derived([selected], ([$selected]) => {
    return (value) => {
      if (Array.isArray($selected)) {
        return $selected.some((o) => dequal(o.value, value));
      }
      if (isObject(value)) {
        return dequal($selected?.value, stripValues(value, void 0));
      }
      return dequal($selected?.value, value);
    };
  });
  const isHighlighted = derived([highlighted], ([$value]) => {
    return (item) => {
      return dequal($value?.value, item);
    };
  });
  const trigger = makeElement(name2("trigger"), {
    stores: [open, highlightedItem, disabled, ids.menu, ids.trigger, ids.label],
    returned: ([$open, $highlightedItem, $disabled, $menuId, $triggerId, $labelId]) => {
      return {
        "aria-activedescendant": $highlightedItem?.id,
        "aria-autocomplete": "list",
        "aria-controls": $menuId,
        "aria-expanded": $open,
        "aria-labelledby": $labelId,
        // autocomplete: 'off',
        id: $triggerId,
        role: "combobox",
        disabled: disabledAttr($disabled),
        type: withDefaults.builder === "select" ? "button" : void 0
      };
    },
    action: (node) => {
      const isInput = isHTMLInputElement(node);
      const unsubscribe = executeCallbacks(
        addMeltEventListener(node, "click", () => {
          node.focus();
          const $open = open.get();
          if ($open) {
            closeMenu();
          } else {
            openMenu();
          }
        }),
        // Handle all input key events including typing, meta, and navigation.
        addMeltEventListener(node, "keydown", (e) => {
          const $open = open.get();
          if (!$open) {
            if (INTERACTION_KEYS.includes(e.key)) {
              return;
            }
            if (e.key === kbd.TAB) {
              return;
            }
            if (e.key === kbd.BACKSPACE && isInput && node.value === "") {
              return;
            }
            if (e.key === kbd.SPACE && isHTMLButtonElement(node)) {
              return;
            }
            openMenu();
            tick().then(() => {
              const $selectedItem = selected.get();
              if ($selectedItem)
                return;
              const menuEl = document.getElementById(ids.menu.get());
              if (!isHTMLElement(menuEl))
                return;
              const enabledItems = Array.from(menuEl.querySelectorAll(`${selector("item")}:not([data-disabled]):not([data-hidden])`)).filter((item) => isHTMLElement(item));
              if (!enabledItems.length)
                return;
              if (e.key === kbd.ARROW_DOWN) {
                highlightedItem.set(enabledItems[0]);
                enabledItems[0].scrollIntoView({ block: scrollAlignment.get() });
              } else if (e.key === kbd.ARROW_UP) {
                highlightedItem.set(last(enabledItems));
                last(enabledItems).scrollIntoView({ block: scrollAlignment.get() });
              }
            });
          }
          if (e.key === kbd.TAB) {
            closeMenu();
            return;
          }
          if (e.key === kbd.ENTER && !e.isComposing || e.key === kbd.SPACE && isHTMLButtonElement(node)) {
            e.preventDefault();
            const $highlightedItem = highlightedItem.get();
            if ($highlightedItem) {
              selectItem($highlightedItem);
            }
            if (!multiple.get()) {
              closeMenu();
            }
          }
          if (e.key === kbd.ARROW_UP && e.altKey) {
            closeMenu();
          }
          if (FIRST_LAST_KEYS.includes(e.key)) {
            e.preventDefault();
            const menuElement = document.getElementById(ids.menu.get());
            if (!isHTMLElement(menuElement))
              return;
            const itemElements = getOptions(menuElement);
            if (!itemElements.length)
              return;
            const candidateNodes = itemElements.filter((opt) => !isElementDisabled(opt) && opt.dataset.hidden === void 0);
            const $currentItem = highlightedItem.get();
            const currentIndex = $currentItem ? candidateNodes.indexOf($currentItem) : -1;
            const $loop = loop.get();
            const $scrollAlignment = scrollAlignment.get();
            let nextItem;
            switch (e.key) {
              case kbd.ARROW_DOWN:
                nextItem = next(candidateNodes, currentIndex, $loop);
                break;
              case kbd.ARROW_UP:
                nextItem = prev(candidateNodes, currentIndex, $loop);
                break;
              case kbd.PAGE_DOWN:
                nextItem = forward(candidateNodes, currentIndex, 10, $loop);
                break;
              case kbd.PAGE_UP:
                nextItem = back(candidateNodes, currentIndex, 10, $loop);
                break;
              case kbd.HOME:
                nextItem = candidateNodes[0];
                break;
              case kbd.END:
                nextItem = last(candidateNodes);
                break;
              default:
                return;
            }
            highlightedItem.set(nextItem);
            nextItem?.scrollIntoView({ block: $scrollAlignment });
          } else if (typeahead.get()) {
            const menuEl = document.getElementById(ids.menu.get());
            if (!isHTMLElement(menuEl))
              return;
            handleTypeaheadSearch(e.key, getOptions(menuEl));
          }
        })
      );
      let unsubEscapeKeydown = noop;
      const escape2 = useEscapeKeydown(node, {
        handler: closeMenu,
        enabled: derived([open, closeOnEscape], ([$open, $closeOnEscape]) => {
          return $open && $closeOnEscape;
        })
      });
      if (escape2 && escape2.destroy) {
        unsubEscapeKeydown = escape2.destroy;
      }
      return {
        destroy() {
          unsubscribe();
          unsubEscapeKeydown();
        }
      };
    }
  });
  const menu = makeElement(name2("menu"), {
    stores: [isVisible, ids.menu],
    returned: ([$isVisible, $menuId]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        id: $menuId,
        role: "listbox",
        style: styleToString({ display: $isVisible ? void 0 : "none" })
      };
    },
    action: (node) => {
      let unsubPopper = noop;
      const unsubscribe = executeCallbacks(
        // Bind the popper portal to the input element.
        effect([isVisible, portal, closeOnOutsideClick, positioning, activeTrigger], ([$isVisible, $portal, $closeOnOutsideClick, $positioning, $activeTrigger]) => {
          unsubPopper();
          if (!$isVisible || !$activeTrigger)
            return;
          tick().then(() => {
            unsubPopper();
            const ignoreHandler = createClickOutsideIgnore(ids.trigger.get());
            unsubPopper = usePopper(node, {
              anchorElement: $activeTrigger,
              open,
              options: {
                floating: $positioning,
                focusTrap: null,
                modal: {
                  closeOnInteractOutside: $closeOnOutsideClick,
                  onClose: closeMenu,
                  open: $isVisible,
                  shouldCloseOnInteractOutside: (e) => {
                    onOutsideClick.get()?.(e);
                    if (e.defaultPrevented)
                      return false;
                    const target = e.target;
                    if (!isElement(target))
                      return false;
                    if (target === $activeTrigger || $activeTrigger.contains(target)) {
                      return false;
                    }
                    if (ignoreHandler(e))
                      return false;
                    return true;
                  }
                },
                escapeKeydown: null,
                portal: getPortalDestination(node, $portal)
              }
            }).destroy;
          });
        })
      );
      return {
        destroy: () => {
          unsubscribe();
          unsubPopper();
        }
      };
    }
  });
  const { elements: { root: labelBuilder } } = createLabel();
  const { action: labelAction } = get_store_value(labelBuilder);
  const label = makeElement(name2("label"), {
    stores: [ids.label, ids.trigger],
    returned: ([$labelId, $triggerId]) => {
      return {
        id: $labelId,
        for: $triggerId
      };
    },
    action: labelAction
  });
  const option = makeElement(name2("option"), {
    stores: [isSelected],
    returned: ([$isSelected]) => (props2) => {
      const selected2 = $isSelected(props2.value);
      return {
        "data-value": JSON.stringify(props2.value),
        "data-label": props2.label,
        "data-disabled": disabledAttr(props2.disabled),
        "aria-disabled": props2.disabled ? true : void 0,
        "aria-selected": selected2,
        "data-selected": selected2 ? "" : void 0,
        id: generateId(),
        role: "option"
      };
    },
    action: (node) => {
      const unsubscribe = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        if (isElementDisabled(node)) {
          e.preventDefault();
          return;
        }
        selectItem(node);
        if (!multiple.get()) {
          closeMenu();
        }
      }), effect(highlightOnHover, ($highlightOnHover) => {
        if (!$highlightOnHover)
          return;
        const unsub = executeCallbacks(addMeltEventListener(node, "mouseover", () => {
          highlightedItem.set(node);
        }), addMeltEventListener(node, "mouseleave", () => {
          highlightedItem.set(null);
        }));
        return unsub;
      }));
      return { destroy: unsubscribe };
    }
  });
  const group = makeElement(name2("group"), {
    returned: () => {
      return (groupId) => ({
        role: "group",
        "aria-labelledby": groupId
      });
    }
  });
  const groupLabel = makeElement(name2("group-label"), {
    returned: () => {
      return (groupId) => ({
        id: groupId
      });
    }
  });
  const hiddenInput = createHiddenInput({
    value: derived([selected], ([$selected]) => {
      const value = Array.isArray($selected) ? $selected.map((o) => o.value) : $selected?.value;
      return typeof value === "string" ? value : JSON.stringify(value);
    }),
    name: readonly(nameProp),
    required,
    prefix: withDefaults.builder
  });
  const arrow = makeElement(name2("arrow"), {
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
  safeOnMount(() => {
    if (!isBrowser)
      return;
    const menuEl = document.getElementById(ids.menu.get());
    const triggerEl = document.getElementById(ids.trigger.get());
    if (triggerEl) {
      activeTrigger.set(triggerEl);
    }
    if (!menuEl)
      return;
    const selectedEl = menuEl.querySelector("[data-selected]");
    if (!isHTMLElement(selectedEl))
      return;
  });
  effect([highlightedItem], ([$highlightedItem]) => {
    if (!isBrowser)
      return;
    const menuElement = document.getElementById(ids.menu.get());
    if (!isHTMLElement(menuElement))
      return;
    getOptions(menuElement).forEach((node) => {
      if (node === $highlightedItem) {
        addHighlight(node);
      } else {
        removeHighlight(node);
      }
    });
  });
  effect([open], ([$open]) => {
    if (!isBrowser)
      return;
    let unsubScroll = noop;
    if (preventScroll.get() && $open) {
      unsubScroll = removeScroll();
    }
    return () => {
      unsubScroll();
    };
  });
  return {
    ids,
    elements: {
      trigger,
      group,
      option,
      menu,
      groupLabel,
      label,
      hiddenInput,
      arrow
    },
    states: {
      open,
      selected,
      highlighted,
      highlightedItem
    },
    helpers: {
      isSelected,
      isHighlighted,
      closeMenu
    },
    options
  };
}
function createSelect(props) {
  const listbox = createListbox({ ...props, builder: "select" });
  const selectedLabel = derived(listbox.states.selected, ($selected) => {
    if (Array.isArray($selected)) {
      return $selected.map((o) => o.label).join(", ");
    }
    return $selected?.label ?? "";
  });
  return {
    ...listbox,
    elements: {
      ...listbox.elements
    },
    states: {
      ...listbox.states,
      selectedLabel
    }
  };
}
const defaults = {
  defaultValue: [],
  min: 0,
  max: 100,
  step: 1,
  orientation: "horizontal",
  dir: "ltr",
  disabled: false
};
const { name } = createElHelpers("slider");
const createSlider = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "value", "onValueChange", "defaultValue"));
  const { min, max, step, orientation, dir, disabled } = options;
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults?.onValueChange);
  const isActive = withGet(writable(false));
  const currentThumbIndex = withGet(writable(0));
  const activeThumb = withGet(writable(null));
  const meltIds = generateIds(["root"]);
  const updatePosition = (val, index) => {
    value.update((prev2) => {
      if (!prev2)
        return [val];
      if (prev2[index] === val)
        return prev2;
      const newValue = [...prev2];
      const direction2 = newValue[index] > val ? -1 : 1;
      function swap() {
        newValue[index] = newValue[index + direction2];
        newValue[index + direction2] = val;
        const thumbs2 = getAllThumbs();
        if (thumbs2) {
          thumbs2[index + direction2].focus();
          activeThumb.set({ thumb: thumbs2[index + direction2], index: index + direction2 });
        }
      }
      if (direction2 === -1 && val < newValue[index - 1]) {
        swap();
        return newValue;
      } else if (direction2 === 1 && val > newValue[index + 1]) {
        swap();
        return newValue;
      }
      const $min = min.get();
      const $max = max.get();
      const $step = step.get();
      newValue[index] = snapValueToStep(val, $min, $max, $step);
      return newValue;
    });
  };
  const getAllThumbs = () => {
    const root2 = getElementByMeltId(meltIds.root);
    if (!root2)
      return null;
    return Array.from(root2.querySelectorAll('[data-melt-part="thumb"]')).filter((thumb) => isHTMLElement(thumb));
  };
  const position = derived([min, max], ([$min, $max]) => {
    return (val) => {
      const pos = (val - $min) / ($max - $min) * 100;
      return pos;
    };
  });
  const direction = withGet.derived([orientation, dir], ([$orientation, $dir]) => {
    if ($orientation === "horizontal") {
      return $dir === "rtl" ? "rl" : "lr";
    } else {
      return $dir === "rtl" ? "tb" : "bt";
    }
  });
  const root = makeElement(name(), {
    stores: [disabled, orientation, dir],
    returned: ([$disabled, $orientation, $dir]) => {
      return {
        dir: $dir,
        disabled: disabledAttr($disabled),
        "data-disabled": disabledAttr($disabled),
        "data-orientation": $orientation,
        style: $disabled ? void 0 : `touch-action: ${$orientation === "horizontal" ? "pan-y" : "pan-x"}`,
        "data-melt-id": meltIds.root
      };
    }
  });
  const range = makeElement(name("range"), {
    stores: [value, direction, position],
    returned: ([$value, $direction, $position]) => {
      const minimum = $value.length > 1 ? $position(Math.min(...$value) ?? 0) : 0;
      const maximum = 100 - $position(Math.max(...$value) ?? 0);
      const style = {
        position: "absolute"
      };
      switch ($direction) {
        case "lr": {
          style.left = `${minimum}%`;
          style.right = `${maximum}%`;
          break;
        }
        case "rl": {
          style.right = `${minimum}%`;
          style.left = `${maximum}%`;
          break;
        }
        case "bt": {
          style.bottom = `${minimum}%`;
          style.top = `${maximum}%`;
          break;
        }
        case "tb": {
          style.top = `${minimum}%`;
          style.bottom = `${maximum}%`;
          break;
        }
      }
      return {
        style: styleToString(style)
      };
    }
  });
  const thumbs = makeElementArray(name("thumb"), {
    stores: [value, position, min, max, disabled, orientation, direction],
    returned: ([$value, $position, $min, $max, $disabled, $orientation, $direction]) => {
      const result = Array.from({ length: $value.length || 1 }, (_, i) => {
        const currentThumb = currentThumbIndex.get();
        if (currentThumb < $value.length) {
          currentThumbIndex.update((prev2) => prev2 + 1);
        }
        const thumbValue = $value[i];
        const thumbPosition = `${$position(thumbValue)}%`;
        const style = {
          position: "absolute"
        };
        switch ($direction) {
          case "lr": {
            style.left = thumbPosition;
            style.translate = "-50% 0";
            break;
          }
          case "rl": {
            style.right = thumbPosition;
            style.translate = "50% 0";
            break;
          }
          case "bt": {
            style.bottom = thumbPosition;
            style.translate = "0 50%";
            break;
          }
          case "tb": {
            style.top = thumbPosition;
            style.translate = "0 -50%";
            break;
          }
        }
        return {
          role: "slider",
          "aria-valuemin": $min,
          "aria-valuemax": $max,
          "aria-valuenow": thumbValue,
          "aria-disabled": disabledAttr($disabled),
          "aria-orientation": $orientation,
          "data-melt-part": "thumb",
          "data-value": thumbValue,
          style: styleToString(style),
          tabindex: $disabled ? -1 : 0
        };
      });
      return result;
    },
    action: (node) => {
      const unsub = addMeltEventListener(node, "keydown", (event) => {
        if (disabled.get())
          return;
        const target = event.currentTarget;
        if (!isHTMLElement(target))
          return;
        const thumbs2 = getAllThumbs();
        if (!thumbs2?.length)
          return;
        const index = thumbs2.indexOf(target);
        currentThumbIndex.set(index);
        if (![
          kbd.ARROW_LEFT,
          kbd.ARROW_RIGHT,
          kbd.ARROW_UP,
          kbd.ARROW_DOWN,
          kbd.HOME,
          kbd.END
        ].includes(event.key)) {
          return;
        }
        event.preventDefault();
        const $min = min.get();
        const $max = max.get();
        const $step = step.get();
        const $value = value.get();
        const $orientation = orientation.get();
        const $direction = direction.get();
        const thumbValue = $value[index];
        switch (event.key) {
          case kbd.HOME: {
            updatePosition($min, index);
            break;
          }
          case kbd.END: {
            updatePosition($max, index);
            break;
          }
          case kbd.ARROW_LEFT: {
            if ($orientation !== "horizontal")
              break;
            if (event.metaKey) {
              const newValue = $direction === "rl" ? $max : $min;
              updatePosition(newValue, index);
            } else if ($direction === "rl" && thumbValue < $max) {
              updatePosition(thumbValue + $step, index);
            } else if ($direction === "lr" && thumbValue > $min) {
              updatePosition(thumbValue - $step, index);
            }
            break;
          }
          case kbd.ARROW_RIGHT: {
            if ($orientation !== "horizontal")
              break;
            if (event.metaKey) {
              const newValue = $direction === "rl" ? $min : $max;
              updatePosition(newValue, index);
            } else if ($direction === "rl" && thumbValue > $min) {
              updatePosition(thumbValue - $step, index);
            } else if ($direction === "lr" && thumbValue < $max) {
              updatePosition(thumbValue + $step, index);
            }
            break;
          }
          case kbd.ARROW_UP: {
            if (event.metaKey) {
              const newValue = $direction === "tb" ? $min : $max;
              updatePosition(newValue, index);
            } else if ($direction === "tb" && thumbValue > $min) {
              updatePosition(thumbValue - $step, index);
            } else if ($direction !== "tb" && thumbValue < $max) {
              updatePosition(thumbValue + $step, index);
            }
            break;
          }
          case kbd.ARROW_DOWN: {
            if (event.metaKey) {
              const newValue = $direction === "tb" ? $max : $min;
              updatePosition(newValue, index);
            } else if ($direction === "tb" && thumbValue < $max) {
              updatePosition(thumbValue + $step, index);
            } else if ($direction !== "tb" && thumbValue > $min) {
              updatePosition(thumbValue - $step, index);
            }
            break;
          }
        }
      });
      return {
        destroy: unsub
      };
    }
  });
  const ticks = makeElementArray(name("tick"), {
    stores: [value, min, max, step, direction],
    returned: ([$value, $min, $max, $step, $direction]) => {
      const difference = $max - $min;
      let count = Math.ceil(difference / $step);
      if (difference % $step == 0) {
        count++;
      }
      return Array.from({ length: count }, (_, i) => {
        const tickPosition = `${i * ($step / ($max - $min)) * 100}%`;
        const isFirst = i === 0;
        const isLast = i === count - 1;
        const offsetPercentage = isFirst ? 0 : isLast ? -100 : -50;
        const style = {
          position: "absolute"
        };
        switch ($direction) {
          case "lr": {
            style.left = tickPosition;
            style.translate = `${offsetPercentage}% 0`;
            break;
          }
          case "rl": {
            style.right = tickPosition;
            style.translate = `${-offsetPercentage}% 0`;
            break;
          }
          case "bt": {
            style.bottom = tickPosition;
            style.translate = `0 ${-offsetPercentage}%`;
            break;
          }
          case "tb": {
            style.top = tickPosition;
            style.translate = `0 ${offsetPercentage}%`;
            break;
          }
        }
        const tickValue = $min + i * $step;
        const bounded = $value.length === 1 ? tickValue <= $value[0] : $value[0] <= tickValue && tickValue <= $value[$value.length - 1];
        return {
          "data-bounded": bounded ? true : void 0,
          "data-value": tickValue,
          style: styleToString(style)
        };
      });
    }
  });
  effect([root, min, max, disabled, orientation, direction, step], ([$root, $min, $max, $disabled, $orientation, $direction, $step]) => {
    if (!isBrowser || $disabled)
      return;
    const applyPosition = (clientXY, activeThumbIdx, start, end) => {
      const percent = (clientXY - start) / (end - start);
      const val = percent * ($max - $min) + $min;
      if (val < $min) {
        updatePosition($min, activeThumbIdx);
      } else if (val > $max) {
        updatePosition($max, activeThumbIdx);
      } else {
        const step2 = $step;
        const min2 = $min;
        const currentStep = Math.floor((val - min2) / step2);
        const midpointOfCurrentStep = min2 + currentStep * step2 + step2 / 2;
        const midpointOfNextStep = min2 + (currentStep + 1) * step2 + step2 / 2;
        const newValue = val >= midpointOfCurrentStep && val < midpointOfNextStep ? (currentStep + 1) * step2 + min2 : currentStep * step2 + min2;
        if (newValue <= $max) {
          updatePosition(newValue, activeThumbIdx);
        }
      }
    };
    const getClosestThumb = (e) => {
      const thumbs2 = getAllThumbs();
      if (!thumbs2)
        return;
      thumbs2.forEach((thumb2) => thumb2.blur());
      const distances = thumbs2.map((thumb2) => {
        if ($orientation === "horizontal") {
          const { left, right } = thumb2.getBoundingClientRect();
          return Math.abs(e.clientX - (left + right) / 2);
        } else {
          const { top, bottom } = thumb2.getBoundingClientRect();
          return Math.abs(e.clientY - (top + bottom) / 2);
        }
      });
      const thumb = thumbs2[distances.indexOf(Math.min(...distances))];
      const index = thumbs2.indexOf(thumb);
      return { thumb, index };
    };
    const pointerMove = (e) => {
      if (!isActive.get())
        return;
      e.preventDefault();
      e.stopPropagation();
      const sliderEl = getElementByMeltId($root["data-melt-id"]);
      const closestThumb = activeThumb.get();
      if (!sliderEl || !closestThumb)
        return;
      closestThumb.thumb.focus();
      const { left, right, top, bottom } = sliderEl.getBoundingClientRect();
      switch ($direction) {
        case "lr": {
          applyPosition(e.clientX, closestThumb.index, left, right);
          break;
        }
        case "rl": {
          applyPosition(e.clientX, closestThumb.index, right, left);
          break;
        }
        case "bt": {
          applyPosition(e.clientY, closestThumb.index, bottom, top);
          break;
        }
        case "tb": {
          applyPosition(e.clientY, closestThumb.index, top, bottom);
          break;
        }
      }
    };
    const pointerDown = (e) => {
      if (e.button !== 0)
        return;
      const sliderEl = getElementByMeltId($root["data-melt-id"]);
      const closestThumb = getClosestThumb(e);
      if (!closestThumb || !sliderEl)
        return;
      const target = e.target;
      if (!isHTMLElement(target) || !sliderEl.contains(target)) {
        return;
      }
      e.preventDefault();
      activeThumb.set(closestThumb);
      closestThumb.thumb.focus();
      isActive.set(true);
      pointerMove(e);
    };
    const pointerUp = () => {
      isActive.set(false);
    };
    const unsub = executeCallbacks(addEventListener(document, "pointerdown", pointerDown), addEventListener(document, "pointerup", pointerUp), addEventListener(document, "pointerleave", pointerUp), addEventListener(document, "pointermove", pointerMove));
    return () => {
      unsub();
    };
  });
  effect([step, min, max, value], function fixValue([$step, $min, $max, $value]) {
    const isValidValue = (v) => {
      const snappedValue = snapValueToStep(v, $min, $max, $step);
      return snappedValue === v;
    };
    const gcv = (v) => {
      return snapValueToStep(v, $min, $max, $step);
    };
    if ($value.some((v) => !isValidValue(v))) {
      value.update((prev2) => {
        return prev2.map(gcv);
      });
    }
  });
  return {
    elements: {
      root,
      thumbs,
      range,
      ticks
    },
    states: {
      value
    },
    options
  };
};
function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((value, index) => value === arr2[index]);
}
function getSelectData() {
  const NAME = "select";
  const GROUP_NAME = "select-group";
  const ITEM_NAME = "select-item";
  const PARTS = [
    "arrow",
    "content",
    "group",
    "item",
    "indicator",
    "input",
    "label",
    "trigger",
    "value"
  ];
  return {
    NAME,
    GROUP_NAME,
    ITEM_NAME,
    PARTS
  };
}
function getCtx$1() {
  const { NAME } = getSelectData();
  return getContext(NAME);
}
function setCtx$1(props) {
  const { NAME, PARTS } = getSelectData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const select = {
    ...createSelect({ ...removeUndefined(props), forceVisible: true }),
    getAttrs
  };
  setContext(NAME, select);
  return {
    ...select,
    updateOption: getOptionUpdater(select.options)
  };
}
function setGroupCtx() {
  const { GROUP_NAME } = getSelectData();
  const id = generateId$1();
  setContext(GROUP_NAME, id);
  const { elements: { group }, getAttrs } = getCtx$1();
  return { group, id, getAttrs };
}
function setItemCtx(value) {
  const { ITEM_NAME } = getSelectData();
  const select = getCtx$1();
  setContext(ITEM_NAME, value);
  return select;
}
function getItemIndicator() {
  const { ITEM_NAME } = getSelectData();
  const { helpers: { isSelected }, getAttrs } = getCtx$1();
  const value = getContext(ITEM_NAME);
  return {
    value,
    isSelected,
    getAttrs
  };
}
function updatePositioning(props) {
  const defaultPlacement = {
    side: "bottom",
    align: "center",
    sameWidth: true
  };
  const withDefaults = { ...defaultPlacement, ...props };
  const { options: { positioning } } = getCtx$1();
  const updater = getPositioningUpdater(positioning);
  updater(withDefaults);
}
const Select = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $idValues, $$unsubscribe_idValues;
  let { required = void 0 } = $$props;
  let { disabled = void 0 } = $$props;
  let { preventScroll = void 0 } = $$props;
  let { loop = void 0 } = $$props;
  let { closeOnEscape = void 0 } = $$props;
  let { closeOnOutsideClick = void 0 } = $$props;
  let { portal = void 0 } = $$props;
  let { name: name2 = void 0 } = $$props;
  let { multiple = false } = $$props;
  let { selected = void 0 } = $$props;
  let { onSelectedChange = void 0 } = $$props;
  let { open = void 0 } = $$props;
  let { onOpenChange = void 0 } = $$props;
  let { items = [] } = $$props;
  let { onOutsideClick = void 0 } = $$props;
  let { typeahead = void 0 } = $$props;
  const { states: { open: localOpen, selected: localSelected }, updateOption, ids } = setCtx$1({
    required,
    disabled,
    preventScroll,
    loop,
    closeOnEscape,
    closeOnOutsideClick,
    portal,
    name: name2,
    onOutsideClick,
    multiple,
    forceVisible: true,
    defaultSelected: Array.isArray(selected) ? [...selected] : selected,
    defaultOpen: open,
    onSelectedChange: ({ next: next2 }) => {
      if (Array.isArray(next2)) {
        if (!Array.isArray(selected) || !arraysAreEqual(selected, next2)) {
          onSelectedChange?.(next2);
          selected = next2;
          return next2;
        }
        return next2;
      }
      if (selected !== next2) {
        onSelectedChange?.(next2);
        selected = next2;
      }
      return next2;
    },
    onOpenChange: ({ next: next2 }) => {
      if (open !== next2) {
        onOpenChange?.(next2);
        open = next2;
      }
      return next2;
    },
    items,
    typeahead
  });
  const idValues = derived([ids.menu, ids.trigger, ids.label], ([$menuId, $triggerId, $labelId]) => ({
    menu: $menuId,
    trigger: $triggerId,
    label: $labelId
  }));
  $$unsubscribe_idValues = subscribe(idValues, (value) => $idValues = value);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0) $$bindings.required(required);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.preventScroll === void 0 && $$bindings.preventScroll && preventScroll !== void 0) $$bindings.preventScroll(preventScroll);
  if ($$props.loop === void 0 && $$bindings.loop && loop !== void 0) $$bindings.loop(loop);
  if ($$props.closeOnEscape === void 0 && $$bindings.closeOnEscape && closeOnEscape !== void 0) $$bindings.closeOnEscape(closeOnEscape);
  if ($$props.closeOnOutsideClick === void 0 && $$bindings.closeOnOutsideClick && closeOnOutsideClick !== void 0) $$bindings.closeOnOutsideClick(closeOnOutsideClick);
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0) $$bindings.portal(portal);
  if ($$props.name === void 0 && $$bindings.name && name2 !== void 0) $$bindings.name(name2);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0) $$bindings.multiple(multiple);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0) $$bindings.selected(selected);
  if ($$props.onSelectedChange === void 0 && $$bindings.onSelectedChange && onSelectedChange !== void 0) $$bindings.onSelectedChange(onSelectedChange);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.onOpenChange === void 0 && $$bindings.onOpenChange && onOpenChange !== void 0) $$bindings.onOpenChange(onOpenChange);
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.onOutsideClick === void 0 && $$bindings.onOutsideClick && onOutsideClick !== void 0) $$bindings.onOutsideClick(onOutsideClick);
  if ($$props.typeahead === void 0 && $$bindings.typeahead && typeahead !== void 0) $$bindings.typeahead(typeahead);
  open !== void 0 && localOpen.set(open);
  selected !== void 0 && localSelected.set(Array.isArray(selected) ? [...selected] : selected);
  {
    updateOption("required", required);
  }
  {
    updateOption("disabled", disabled);
  }
  {
    updateOption("preventScroll", preventScroll);
  }
  {
    updateOption("loop", loop);
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
    updateOption("name", name2);
  }
  {
    updateOption("multiple", multiple);
  }
  {
    updateOption("onOutsideClick", onOutsideClick);
  }
  {
    updateOption("typeahead", typeahead);
  }
  $$unsubscribe_idValues();
  return `${slots.default ? slots.default({ ids: $idValues }) : ``}`;
});
const Select_content$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { sameWidth = true } = $$props;
  let { fitViewport = false } = $$props;
  let { strategy = "absolute" } = $$props;
  let { overlap = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { menu }, states: { open }, ids, getAttrs } = getCtx$1();
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
  return ` ${asChild && $open ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${$open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Select_group = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $group, $$unsubscribe_group;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { group, id, getAttrs } = setGroupCtx();
  $$unsubscribe_group = subscribe(group, (value) => $group = value);
  const attrs = getAttrs("group");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $group(id);
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_group();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Select_input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let attrs;
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $hiddenInput, $$unsubscribe_hiddenInput;
  let $disabled, $$unsubscribe_disabled;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { hiddenInput }, options: { disabled }, getAttrs } = getCtx$1();
  $$unsubscribe_hiddenInput = subscribe(hiddenInput, (value) => $hiddenInput = value);
  $$unsubscribe_disabled = subscribe(disabled, (value) => $disabled = value);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  attrs = {
    ...getAttrs("input"),
    disabled: $disabled ? true : void 0
  };
  builder = $hiddenInput;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_hiddenInput();
  $$unsubscribe_disabled();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<input${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>`}`;
});
const Select_item$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let isSelected;
  let $$restProps = compute_rest_props($$props, ["value", "disabled", "label", "asChild", "el"]);
  let $isSelectedStore, $$unsubscribe_isSelectedStore;
  let $item, $$unsubscribe_item;
  let { value } = $$props;
  let { disabled = void 0 } = $$props;
  let { label = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { option: item }, helpers: { isSelected: isSelectedStore }, getAttrs } = setItemCtx(value);
  $$unsubscribe_item = subscribe(item, (value2) => $item = value2);
  $$unsubscribe_isSelectedStore = subscribe(isSelectedStore, (value2) => $isSelectedStore = value2);
  createDispatcher();
  const attrs = getAttrs("item");
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $item({ value, disabled, label });
  {
    Object.assign(builder, attrs);
  }
  isSelected = $isSelectedStore(value);
  $$unsubscribe_isSelectedStore();
  $$unsubscribe_item();
  return ` ${asChild ? `${slots.default ? slots.default({ builder, isSelected }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder, isSelected }) : ` ${escape(label || value)} `}</div>`}`;
});
const Select_item_indicator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $isSelected, $$unsubscribe_isSelected;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { isSelected, value, getAttrs } = getItemIndicator();
  $$unsubscribe_isSelected = subscribe(isSelected, (value2) => $isSelected = value2);
  const attrs = getAttrs("indicator");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  $$unsubscribe_isSelected();
  return `${asChild ? `${slots.default ? slots.default({ attrs, isSelected: $isSelected(value) }) : ``}` : `<div${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${$isSelected(value) ? `${slots.default ? slots.default({ attrs, isSelected: $isSelected(value) }) : ``}` : ``}</div>`}`;
});
const Select_trigger$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "id", "el"]);
  let $trigger, $$unsubscribe_trigger;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { trigger }, ids, getAttrs } = getCtx$1();
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
const Select_value = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let label;
  let $$restProps = compute_rest_props($$props, ["placeholder", "asChild", "el"]);
  let $selectedLabel, $$unsubscribe_selectedLabel;
  let { placeholder = "" } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { states: { selectedLabel }, getAttrs } = getCtx$1();
  $$unsubscribe_selectedLabel = subscribe(selectedLabel, (value) => $selectedLabel = value);
  const attrs = getAttrs("value");
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  label = $selectedLabel;
  $$unsubscribe_selectedLabel();
  return `${asChild ? `${slots.default ? slots.default({ label, attrs }) : ``}` : `<span${spread(
    [
      escape_object($$restProps),
      escape_object(attrs),
      {
        "data-placeholder": escape_attribute_value(!label ? "" : void 0)
      }
    ],
    {}
  )}${add_attribute("this", el, 0)}>${escape(label || placeholder)}</span>`}`;
});
function getSliderData() {
  const NAME = "slider";
  const PARTS = ["root", "input", "range", "thumb", "tick"];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getSliderData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const slider = { ...createSlider(removeUndefined(props)), getAttrs };
  setContext(NAME, slider);
  return {
    ...slider,
    updateOption: getOptionUpdater(slider.options)
  };
}
function getCtx() {
  const { NAME } = getSliderData();
  return getContext(NAME);
}
const Slider$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "disabled",
    "min",
    "max",
    "step",
    "orientation",
    "dir",
    "value",
    "onValueChange",
    "asChild",
    "el"
  ]);
  let $root, $$unsubscribe_root;
  let $ticks, $$unsubscribe_ticks;
  let $thumbs, $$unsubscribe_thumbs;
  let { disabled = void 0 } = $$props;
  let { min = void 0 } = $$props;
  let { max = void 0 } = $$props;
  let { step = void 0 } = $$props;
  let { orientation = void 0 } = $$props;
  let { dir = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { onValueChange = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root, ticks, thumbs }, states: { value: localValue }, updateOption, getAttrs } = setCtx({
    disabled,
    dir,
    min,
    max,
    step,
    orientation,
    defaultValue: value,
    onValueChange: ({ next: next2 }) => {
      if (value !== next2) {
        onValueChange?.(next2);
        value = next2;
      }
      return next2;
    }
  });
  $$unsubscribe_root = subscribe(root, (value2) => $root = value2);
  $$unsubscribe_ticks = subscribe(ticks, (value2) => $ticks = value2);
  $$unsubscribe_thumbs = subscribe(thumbs, (value2) => $thumbs = value2);
  const attrs = getAttrs("root");
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0) $$bindings.min(min);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0) $$bindings.max(max);
  if ($$props.step === void 0 && $$bindings.step && step !== void 0) $$bindings.step(step);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0) $$bindings.orientation(orientation);
  if ($$props.dir === void 0 && $$bindings.dir && dir !== void 0) $$bindings.dir(dir);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0) $$bindings.onValueChange(onValueChange);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  value !== void 0 && localValue.set(value);
  {
    updateOption("disabled", disabled);
  }
  {
    updateOption("min", min);
  }
  {
    updateOption("max", max);
  }
  {
    updateOption("step", step);
  }
  {
    updateOption("orientation", orientation);
  }
  {
    updateOption("dir", dir);
  }
  builder = $root;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
  $$unsubscribe_ticks();
  $$unsubscribe_thumbs();
  return `${asChild ? `${slots.default ? slots.default({ builder, ticks: $ticks, thumbs: $thumbs }) : ``}` : `<span${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder, ticks: $ticks, thumbs: $thumbs }) : ``}</span>`}`;
});
const Slider_range = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $range, $$unsubscribe_range;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { range }, getAttrs } = getCtx();
  $$unsubscribe_range = subscribe(range, (value) => $range = value);
  const attrs = getAttrs("range");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $range;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_range();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<span${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></span>`}`;
});
const Slider_thumb = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el", "thumb"]);
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  let { thumb } = $$props;
  const { getAttrs } = getCtx();
  createDispatcher();
  const attrs = getAttrs("thumb");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  if ($$props.thumb === void 0 && $$bindings.thumb && thumb !== void 0) $$bindings.thumb(thumb);
  builder = thumb;
  {
    Object.assign(builder, attrs);
  }
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<span${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></span>`}`;
});
const Check = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "ariaLabel", "withEvents"]);
  const ctx = getContext("iconCtx") ?? {};
  let { size = ctx.size || "24" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { color = ctx.color || "currentColor" } = $$props;
  let { ariaLabel = "check," } = $$props;
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
  )}><path fill-rule="evenodd" clip-rule="evenodd" d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor"></path></svg>` : `<svg${spread(
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
  )}><path fill-rule="evenodd" clip-rule="evenodd" d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor"></path></svg>`} `;
});
const Select_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value", "label", "disabled"]);
  let { class: className = void 0 } = $$props;
  let { value } = $$props;
  let { label = void 0 } = $$props;
  let { disabled = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  return `${validate_component(Select_item$1, "SelectPrimitive.Item").$$render(
    $$result,
    Object.assign(
      {},
      { value },
      { disabled },
      { label },
      {
        class: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `<span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">${validate_component(Select_item_indicator, "SelectPrimitive.ItemIndicator").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Check, "Check").$$render($$result, { class: "h-4 w-4" }, {}, {})}`;
          }
        })}</span> ${slots.default ? slots.default({}) : ` ${escape(label || value)} `}`;
      }
    }
  )}`;
});
const Select_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "class",
    "sideOffset",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig"
  ]);
  let { class: className = void 0 } = $$props;
  let { sideOffset = 4 } = $$props;
  let { inTransition = flyAndScale } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = scale } = $$props;
  let { outTransitionConfig = { start: 0.95, opacity: 0, duration: 50 } } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0) $$bindings.sideOffset(sideOffset);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0) $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0) $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0) $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0) $$bindings.outTransitionConfig(outTransitionConfig);
  return `${validate_component(Select_content$1, "SelectPrimitive.Content").$$render(
    $$result,
    Object.assign(
      {},
      { inTransition },
      { inTransitionConfig },
      { outTransition },
      { outTransitionConfig },
      { sideOffset },
      {
        class: cn("relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md focus:outline-none", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `<div class="w-full p-1">${slots.default ? slots.default({}) : ``}</div>`;
      }
    }
  )}`;
});
const CaretSort = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "ariaLabel", "withEvents"]);
  const ctx = getContext("iconCtx") ?? {};
  let { size = ctx.size || "24" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { color = ctx.color || "currentColor" } = $$props;
  let { ariaLabel = "caret sort," } = $$props;
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
  )}><path fill-rule="evenodd" clip-rule="evenodd" d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor"></path></svg>` : `<svg${spread(
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
  )}><path fill-rule="evenodd" clip-rule="evenodd" d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor"></path></svg>`} `;
});
const Select_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Select_trigger$1, "SelectPrimitive.Trigger").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``} <div>${validate_component(CaretSort, "CaretSort").$$render($$result, { class: "h-4 w-4 opacity-50" }, {}, {})}</div>`;
      }
    }
  )}`;
});
const Root = Select;
const Group = Select_group;
const Input = Select_input;
const Value = Select_value;
const Slider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value = [0] } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Slider$1, "SliderPrimitive.Root").$$render(
      $$result,
      Object.assign(
        {},
        {
          class: cn("relative flex w-full touch-none select-none items-center", className)
        },
        $$restProps,
        { value }
      ),
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        }
      },
      {
        default: ({ thumbs }) => {
          return `<span class="bg-primary/20 relative h-1.5 w-full grow overflow-hidden rounded-full">${validate_component(Slider_range, "SliderPrimitive.Range").$$render($$result, { class: "bg-primary absolute h-full" }, {}, {})}</span> ${each(thumbs, (thumb) => {
            return `${validate_component(Slider_thumb, "SliderPrimitive.Thumb").$$render(
              $$result,
              {
                thumb,
                class: "border-primary/50 bg-background focus-visible:ring-ring block h-4 w-4 rounded-full border shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
              },
              {},
              {}
            )}`;
          })}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredQuestions;
  let categories;
  let tags;
  const highIntensityQuestions = [
    {
      content: "你曾经对伴侣撒过的最大的谎是什么？",
      category: "关系",
      tags: ["诚实", "伴侣"],
      intensity: 8
    },
    {
      content: "描述一下你最疯狂的性幻想，不要隐藏细节",
      category: "性",
      tags: ["幻想", "刺激"],
      intensity: 9
    },
    {
      content: "你有没有对现在在座的某个人产生过性幻想？是谁？",
      category: "性",
      tags: ["幻想", "现场"],
      intensity: 9
    },
    {
      content: "你曾经做过的最出格的性体验是什么？",
      category: "性",
      tags: ["经验", "刺激"],
      intensity: 10
    },
    {
      content: "如果可以和在座的任何一个人发生一夜情，你会选择谁？为什么？",
      category: "性",
      tags: ["选择", "欲望"],
      intensity: 9
    },
    {
      content: "你最后一次自慰是什么时候？当时在想什么？",
      category: "性",
      tags: ["自慰", "幻想"],
      intensity: 8
    },
    {
      content: "你曾经出轨过吗？详细描述那次经历",
      category: "关系",
      tags: ["出轨", "背叛"],
      intensity: 10
    },
    {
      content: "你有没有过一夜情？最刺激的一次是什么样的？",
      category: "性",
      tags: ["一夜情", "经验"],
      intensity: 9
    },
    {
      content: "你最喜欢的性爱姿势是什么？为什么喜欢？",
      category: "性",
      tags: ["姿势", "偏好"],
      intensity: 8
    },
    {
      content: "你有什么特殊的性癖好是伴侣不知道的？",
      category: "性",
      tags: ["癖好", "秘密"],
      intensity: 9
    },
    {
      content: "你曾经在什么最奇怪或公开的地方做爱？",
      category: "性",
      tags: ["场所", "冒险"],
      intensity: 8
    },
    {
      content: "你有没有过同性经验或幻想？详细描述",
      category: "性",
      tags: ["同性", "幻想"],
      intensity: 9
    },
    {
      content: "你看过最让你兴奋的色情内容是什么类型的？",
      category: "性",
      tags: ["色情", "兴趣"],
      intensity: 8
    },
    {
      content: "你曾经因为什么事情被性唤起，但羞于告诉别人？",
      category: "性",
      tags: ["唤起", "羞耻"],
      intensity: 8
    },
    {
      content: "你曾经偷看过别人做爱或自慰吗？什么情况？",
      category: "性",
      tags: ["偷窥", "经验"],
      intensity: 9
    },
    {
      content: "你曾经假装高潮过吗？为什么？",
      category: "性",
      tags: ["高潮", "伪装"],
      intensity: 8
    },
    {
      content: "你有没有性幻想过你最好朋友的伴侣？详细说说",
      category: "性",
      tags: ["幻想", "禁忌"],
      intensity: 9
    },
    {
      content: "你曾经在性方面欺骗过伴侣什么事情？",
      category: "关系",
      tags: ["欺骗", "性"],
      intensity: 9
    },
    {
      content: "你曾经尝试过哪些角色扮演？哪个是你最喜欢的？",
      category: "性",
      tags: ["角色扮演", "幻想"],
      intensity: 8
    },
    {
      content: "你最近的性梦是关于谁的？详细描述",
      category: "性",
      tags: ["梦境", "幻想"],
      intensity: 8
    },
    {
      content: "你曾经在工作或学习场所有过性行为吗？描述一下",
      category: "性",
      tags: ["场所", "冒险"],
      intensity: 9
    },
    {
      content: "你曾经对伴侣有过什么变态的要求？",
      category: "性",
      tags: ["要求", "癖好"],
      intensity: 9
    },
    {
      content: "你曾经为了性而做过什么疯狂的事情？",
      category: "性",
      tags: ["冒险", "疯狂"],
      intensity: 9
    },
    {
      content: "你有没有过多人性行为的经历或幻想？详细说说",
      category: "性",
      tags: ["多人", "幻想"],
      intensity: 10
    },
    {
      content: "你最想和哪位名人发生性关系？为什么是他/她？",
      category: "性",
      tags: ["名人", "幻想"],
      intensity: 7
    },
    {
      content: "你曾经在性方面让自己或伴侣失望的经历是什么？",
      category: "性",
      tags: ["失望", "经验"],
      intensity: 8
    },
    {
      content: "你曾经在约会应用上做过最出格的事情是什么？",
      category: "关系",
      tags: ["约会", "社交媒体"],
      intensity: 8
    },
    {
      content: "你曾经因为什么性幻想而感到内疚？",
      category: "性",
      tags: ["幻想", "内疚"],
      intensity: 8
    },
    {
      content: "你有没有过与陌生人发生性关系的经历？详细描述",
      category: "性",
      tags: ["陌生人", "冒险"],
      intensity: 9
    },
    {
      content: "你最后悔的性经历是什么？为什么会后悔？",
      category: "性",
      tags: ["后悔", "经验"],
      intensity: 9
    },
    {
      content: "你曾经在性方面做过什么让你感到羞耻的事情？",
      category: "性",
      tags: ["羞耻", "经验"],
      intensity: 9
    },
    {
      content: "你曾经在性爱中喊错名字吗？详细说说那次经历",
      category: "性",
      tags: ["尴尬", "失误"],
      intensity: 8
    },
    {
      content: "你曾经在什么不合适的场合被性唤起？",
      category: "性",
      tags: ["唤起", "尴尬"],
      intensity: 7
    },
    {
      content: "你曾经对伴侣隐瞒过什么重要的性史？",
      category: "关系",
      tags: ["隐瞒", "性史"],
      intensity: 8
    },
    {
      content: "你曾经为了性而花过最多的钱是什么时候？花在什么上？",
      category: "性",
      tags: ["消费", "欲望"],
      intensity: 8
    },
    {
      content: "你曾经在性方面做过什么让伴侣震惊的事情？",
      category: "性",
      tags: ["震惊", "行为"],
      intensity: 9
    },
    {
      content: "你曾经在醉酒状态下做过什么性方面的事情后来后悔了？",
      category: "性",
      tags: ["醉酒", "后悔"],
      intensity: 9
    },
    {
      content: "你最疯狂的性癖好是什么？为什么会有这种癖好？",
      category: "性",
      tags: ["癖好", "心理"],
      intensity: 9
    },
    {
      content: "你曾经在性方面被拒绝过最尴尬的一次是什么情况？",
      category: "性",
      tags: ["拒绝", "尴尬"],
      intensity: 8
    },
    {
      content: "你曾经对谁有过不伦之恋？发展到了什么程度？",
      category: "关系",
      tags: ["不伦", "禁忌"],
      intensity: 10
    },
    {
      content: "你曾经在性方面做过什么让你感到非常内疚的事情？",
      category: "性",
      tags: ["内疚", "道德"],
      intensity: 9
    },
    {
      content: "如果可以和在座任何人的伴侣发生关系而不会被发现，你会选谁的？",
      category: "关系",
      tags: ["禁忌", "幻想"],
      intensity: 10
    },
    {
      content: "你曾经因为性而伤害过谁？详细说说那次经历",
      category: "关系",
      tags: ["伤害", "后果"],
      intensity: 9
    },
    {
      content: "你曾经在性方面说过的最大谎言是什么？",
      category: "性",
      tags: ["谎言", "欺骗"],
      intensity: 8
    },
    {
      content: "你曾经在性方面做过什么让你感到非常自豪的事情？",
      category: "性",
      tags: ["自豪", "成就"],
      intensity: 7
    },
    {
      content: "你曾经在性方面有过什么奇怪的意外？详细描述",
      category: "性",
      tags: ["意外", "尴尬"],
      intensity: 8
    },
    {
      content: "你曾经为了性而牺牲过什么重要的东西？后悔吗？",
      category: "性",
      tags: ["牺牲", "后悔"],
      intensity: 9
    },
    {
      content: "你曾经在性方面做过什么最冒险的事情？",
      category: "性",
      tags: ["冒险", "刺激"],
      intensity: 9
    },
    {
      content: "你曾经在什么最不寻常的地点或情况下达到高潮？",
      category: "性",
      tags: ["高潮", "场所"],
      intensity: 8
    },
    {
      content: "你最不为人知的性幻想是什么？为什么不敢实现它？",
      category: "性",
      tags: ["幻想", "秘密"],
      intensity: 10
    }
  ];
  const mediumHighIntensityQuestions = [
    {
      content: "你曾经对某人有过性幻想但从未告诉过他/她吗？是谁？",
      category: "性",
      tags: ["幻想", "暗恋"],
      intensity: 7
    },
    {
      content: "你在性方面最大的遗憾是什么？",
      category: "性",
      tags: ["遗憾", "反思"],
      intensity: 7
    },
    {
      content: "你曾经在什么公共场所差点被发现做爱？",
      category: "性",
      tags: ["公共场所", "冒险"],
      intensity: 8
    },
    {
      content: "你曾经对伴侣撒过什么谎来逃避性行为？",
      category: "关系",
      tags: ["谎言", "逃避"],
      intensity: 6
    },
    {
      content: "你最喜欢伴侣对你做的性行为是什么？详细描述",
      category: "性",
      tags: ["偏好", "快感"],
      intensity: 7
    },
    {
      content: "你曾经因为什么性幻想而自慰？最近一次是什么时候？",
      category: "性",
      tags: ["自慰", "幻想"],
      intensity: 7
    },
    {
      content: "你曾经在约会中有过什么尴尬的性经历？",
      category: "性",
      tags: ["约会", "尴尬"],
      intensity: 6
    },
    {
      content: "如果可以和在座的人中交换伴侣一晚，你会选择谁？",
      category: "关系",
      tags: ["交换", "幻想"],
      intensity: 8
    },
    {
      content: "你曾经对性伴侣说过什么谎言来取悦对方？",
      category: "性",
      tags: ["谎言", "取悦"],
      intensity: 6
    },
    {
      content: "你最近一次看色情内容是什么时候？内容是什么？",
      category: "性",
      tags: ["色情", "消费"],
      intensity: 6
    },
    {
      content: "你曾经尝试过什么性玩具？哪个是你的最爱？",
      category: "性",
      tags: ["玩具", "体验"],
      intensity: 7
    },
    {
      content: '你曾经在什么奇怪的地方留下过"痕迹"？',
      category: "性",
      tags: ["场所", "痕迹"],
      intensity: 7
    },
    {
      content: "你曾经在性方面做过什么让自己感到惊讶的事情？",
      category: "性",
      tags: ["惊讶", "发现"],
      intensity: 7
    },
    {
      content: "你最想尝试但还没尝试过的性行为是什么？",
      category: "性",
      tags: ["愿望", "好奇"],
      intensity: 7
    },
    {
      content: "你曾经因为什么原因拒绝了伴侣的性要求？",
      category: "关系",
      tags: ["拒绝", "理由"],
      intensity: 6
    },
    {
      content: "你曾经在性方面让伴侣失望的事情是什么？",
      category: "性",
      tags: ["失望", "遗憾"],
      intensity: 6
    },
    {
      content: "你曾经在什么不合适的场合想到性而分心？",
      category: "性",
      tags: ["分心", "场合"],
      intensity: 6
    },
    {
      content: "你曾经对什么类型的人产生过性吸引但不愿公开承认？",
      category: "性",
      tags: ["吸引", "秘密"],
      intensity: 7
    },
    {
      content: "你曾经在性方面做过什么让伴侣特别开心的事情？",
      category: "性",
      tags: ["取悦", "技巧"],
      intensity: 6
    },
    {
      content: '你曾经在性方面有过什么尴尬的"第一次"经历？',
      category: "性",
      tags: ["第一次", "尴尬"],
      intensity: 7
    },
    {
      content: "你最疯狂的约会经历是什么？结果如何？",
      category: "关系",
      tags: ["约会", "疯狂"],
      intensity: 6
    },
    {
      content: "你曾经在性方面做过什么让自己后悔的决定？",
      category: "性",
      tags: ["决定", "后悔"],
      intensity: 7
    },
    {
      content: "你曾经因为什么原因假装对性感兴趣？",
      category: "性",
      tags: ["伪装", "动机"],
      intensity: 6
    },
    {
      content: "你曾经在多长时间内和多少不同的人发生过关系？",
      category: "性",
      tags: ["数量", "时间"],
      intensity: 7
    },
    {
      content: "你曾经在什么情况下被他人的某个特质意外地性唤起？",
      category: "性",
      tags: ["唤起", "特质"],
      intensity: 6
    },
    {
      content: "你曾经为了性而做过什么让自己感到羞耻的事情？",
      category: "性",
      tags: ["羞耻", "行为"],
      intensity: 7
    },
    {
      content: "你最享受的前戏是什么？为什么特别喜欢？",
      category: "性",
      tags: ["前戏", "偏好"],
      intensity: 6
    },
    {
      content: "你曾经在什么情况下对不应该有感觉的人产生过性冲动？",
      category: "性",
      tags: ["冲动", "禁忌"],
      intensity: 7
    },
    {
      content: "你曾经在性方面有过什么让你感到尴尬的身体反应？",
      category: "性",
      tags: ["身体", "尴尬"],
      intensity: 6
    },
    {
      content: "你曾经在性方面做过什么让伴侣惊讶的事情？反应如何？",
      category: "性",
      tags: ["惊喜", "反应"],
      intensity: 7
    },
    {
      content: "你曾经因为什么原因在性行为中途停止？",
      category: "性",
      tags: ["中断", "原因"],
      intensity: 6
    },
    {
      content: "你曾经对伴侣隐瞒过什么性方面的秘密？",
      category: "关系",
      tags: ["秘密", "隐瞒"],
      intensity: 7
    },
    {
      content: "你曾经在性方面有过什么特别难忘的经历？为什么难忘？",
      category: "性",
      tags: ["难忘", "经历"],
      intensity: 7
    },
    {
      content: "你曾经在什么情况下感到最性感或最有魅力？",
      category: "性",
      tags: ["自信", "魅力"],
      intensity: 6
    },
    {
      content: "你曾经在性方面做过什么冒险但值得的事情？",
      category: "性",
      tags: ["冒险", "价值"],
      intensity: 7
    },
    {
      content: "你曾经因为什么原因拒绝了一个你有好感的人？",
      category: "关系",
      tags: ["拒绝", "原因"],
      intensity: 6
    },
    {
      content: "你曾经在性方面有过什么特别疯狂的幻想？",
      category: "性",
      tags: ["幻想", "疯狂"],
      intensity: 7
    },
    {
      content: "你曾经在什么情况下对性感到恐惧或焦虑？",
      category: "性",
      tags: ["恐惧", "焦虑"],
      intensity: 6
    },
    {
      content: "你曾经在性方面做过什么让自己感到特别满足的事情？",
      category: "性",
      tags: ["满足", "成就"],
      intensity: 6
    },
    {
      content: "你曾经在什么情况下感觉自己被性方面的欲望控制？",
      category: "性",
      tags: ["欲望", "控制"],
      intensity: 7
    },
    {
      content: "你曾经对伴侣有过什么性方面的不满但没有直接表达？",
      category: "关系",
      tags: ["不满", "沟通"],
      intensity: 6
    },
    {
      content: "你曾经在性方面做过什么让伴侣感到不舒服的事情？",
      category: "性",
      tags: ["不适", "边界"],
      intensity: 7
    },
    {
      content: "你曾经在什么情况下对性感到特别渴望？",
      category: "性",
      tags: ["渴望", "情境"],
      intensity: 6
    },
    {
      content: "你曾经在性方面有过什么误解导致的尴尬经历？",
      category: "性",
      tags: ["误解", "尴尬"],
      intensity: 6
    },
    {
      content: "你曾经在什么情况下感到自己在性方面表现出色？",
      category: "性",
      tags: ["表现", "自信"],
      intensity: 6
    },
    {
      content: "你曾经在性方面做过什么让自己感到特别兴奋的事情？",
      category: "性",
      tags: ["兴奋", "体验"],
      intensity: 7
    },
    {
      content: "你曾经在什么情况下感觉自己被性方面的欲望拒绝？",
      category: "性",
      tags: ["拒绝", "挫折"],
      intensity: 6
    },
    {
      content: "你曾经对什么类型的性行为感到好奇但害怕尝试？",
      category: "性",
      tags: ["好奇", "恐惧"],
      intensity: 7
    },
    {
      content: "你曾经在性方面有过什么让你感到惊喜的发现？",
      category: "性",
      tags: ["发现", "惊喜"],
      intensity: 6
    },
    {
      content: "你曾经在什么情况下感觉自己在性方面特别有创意？",
      category: "性",
      tags: ["创意", "表现"],
      intensity: 6
    },
    {
      content: "你曾经为了取悦伴侣而做过什么自己不太喜欢的性行为？",
      category: "性",
      tags: ["取悦", "牺牲"],
      intensity: 7
    }
  ];
  const lowIntensityQuestions = [
    {
      content: "你第一次约会的经历是什么样的？",
      category: "关系",
      tags: ["约会", "回忆"],
      intensity: 3
    },
    {
      content: "你做过的最尴尬的事情是什么？",
      category: "个人",
      tags: ["尴尬", "经历"],
      intensity: 4
    },
    {
      content: "你有什么特殊的才能是大多数人不知道的？",
      category: "个人",
      tags: ["才能", "秘密"],
      intensity: 2
    },
    {
      content: "你最后一次对某人撒谎是什么时候？为什么要撒谎？",
      category: "行为",
      tags: ["诚实", "谎言"],
      intensity: 5
    },
    {
      content: "你曾经暗恋过谁？他/她知道吗？",
      category: "关系",
      tags: ["暗恋", "感情"],
      intensity: 4
    },
    {
      content: "你最喜欢自己身体的哪个部位？为什么？",
      category: "个人",
      tags: ["身体", "自信"],
      intensity: 3
    },
    {
      content: "你最近一次哭是因为什么？",
      category: "情感",
      tags: ["脆弱", "情绪"],
      intensity: 4
    },
    {
      content: "你做过的最疯狂的事情是什么？",
      category: "冒险",
      tags: ["冒险", "刺激"],
      intensity: 5
    },
    {
      content: "如果可以和一位名人共进晚餐，你会选谁？为什么？",
      category: "幻想",
      tags: ["名人", "兴趣"],
      intensity: 2
    },
    {
      content: "你曾经因为什么事情感到特别骄傲？",
      category: "成就",
      tags: ["骄傲", "成就"],
      intensity: 2
    },
    {
      content: "你有什么奇怪的习惯是别人不知道的？",
      category: "个人",
      tags: ["习惯", "怪癖"],
      intensity: 3
    },
    {
      content: "你最后一次做的冲动决定是什么？结果如何？",
      category: "决策",
      tags: ["冲动", "后果"],
      intensity: 3
    },
    {
      content: "你曾经熬夜做过最疯狂的事情是什么？",
      category: "经历",
      tags: ["熬夜", "疯狂"],
      intensity: 4
    },
    {
      content: "你收到过最糟糕的礼物是什么？当时你是怎么反应的？",
      category: "社交",
      tags: ["礼物", "反应"],
      intensity: 3
    },
    {
      content: "你曾经做过什么事后来让你感到特别后悔？",
      category: "反思",
      tags: ["后悔", "教训"],
      intensity: 4
    },
    {
      content: "你最喜欢的约会活动是什么？",
      category: "关系",
      tags: ["约会", "活动"],
      intensity: 2
    },
    {
      content: "你曾经在公共场合做过什么令人尴尬的事情？",
      category: "社交",
      tags: ["尴尬", "公共"],
      intensity: 4
    },
    {
      content: "你有什么奇怪的食物组合是你特别喜欢的？",
      category: "喜好",
      tags: ["食物", "怪癖"],
      intensity: 1
    },
    {
      content: "你最大的恐惧是什么？为什么会害怕？",
      category: "心理",
      tags: ["恐惧", "脆弱"],
      intensity: 4
    },
    {
      content: "你曾经因为什么事情被误解最深？",
      category: "沟通",
      tags: ["误解", "沟通"],
      intensity: 3
    },
    {
      content: "你最近一次感到特别开心是因为什么事？",
      category: "情感",
      tags: ["快乐", "情绪"],
      intensity: 2
    },
    {
      content: "你曾经在社交媒体上做过什么让你后悔的事情？",
      category: "社交",
      tags: ["社交媒体", "后悔"],
      intensity: 4
    },
    {
      content: "你最喜欢的电影是什么？为什么特别喜欢它？",
      category: "喜好",
      tags: ["电影", "兴趣"],
      intensity: 1
    },
    {
      content: "你曾经因为什么事情感到非常尴尬但后来发现其实没人注意到？",
      category: "社交",
      tags: ["尴尬", "自我意识"],
      intensity: 3
    },
    {
      content: "如果你可以改变过去的一件事，会是什么？",
      category: "反思",
      tags: ["后悔", "改变"],
      intensity: 4
    },
    {
      content: "你最近一次说谎是什么时候？说了什么谎？",
      category: "行为",
      tags: ["谎言", "诚实"],
      intensity: 4
    },
    {
      content: "你有什么特别的童年记忆让你至今难忘？",
      category: "回忆",
      tags: ["童年", "记忆"],
      intensity: 3
    },
    {
      content: "你曾经做过什么事情让你的朋友感到惊讶？",
      category: "社交",
      tags: ["惊喜", "朋友"],
      intensity: 3
    },
    {
      content: "你最近一次感到非常尴尬是什么时候？发生了什么？",
      category: "社交",
      tags: ["尴尬", "经历"],
      intensity: 4
    },
    {
      content: "你曾经有过什么特别浪漫的经历？",
      category: "关系",
      tags: ["浪漫", "经历"],
      intensity: 3
    },
    {
      content: "你最喜欢的放松方式是什么？",
      category: "个人",
      tags: ["放松", "习惯"],
      intensity: 1
    },
    {
      content: "你曾经因为什么事情感到特别嫉妒？",
      category: "情感",
      tags: ["嫉妒", "情绪"],
      intensity: 4
    },
    {
      content: "你做过的最勇敢的事情是什么？",
      category: "个人",
      tags: ["勇气", "挑战"],
      intensity: 3
    },
    {
      content: "如果你可以立刻掌握一项新技能，会选择什么？",
      category: "愿望",
      tags: ["技能", "梦想"],
      intensity: 2
    },
    {
      content: "你生活中最大的遗憾是什么？",
      category: "反思",
      tags: ["遗憾", "后悔"],
      intensity: 5
    },
    {
      content: "你曾经做过什么事情后来发现完全是场误会？",
      category: "经历",
      tags: ["误会", "尴尬"],
      intensity: 3
    },
    {
      content: "你有什么秘密技能是大多数人不知道的？",
      category: "个人",
      tags: ["技能", "秘密"],
      intensity: 2
    },
    {
      content: "你最喜欢自己的什么性格特点？",
      category: "个人",
      tags: ["性格", "自我认知"],
      intensity: 2
    },
    {
      content: "你曾经在什么场合笑得最不受控制？",
      category: "经历",
      tags: ["笑", "尴尬"],
      intensity: 3
    },
    {
      content: "你曾经做过什么事情让你的家人感到惊讶？",
      category: "家庭",
      tags: ["惊喜", "家人"],
      intensity: 3
    },
    {
      content: "你最近一次感到特别感动是因为什么？",
      category: "情感",
      tags: ["感动", "情绪"],
      intensity: 3
    },
    {
      content: "你曾经有过什么特别难忘的旅行经历？",
      category: "经历",
      tags: ["旅行", "回忆"],
      intensity: 2
    },
    {
      content: "你最近一次做了什么让自己感到自豪的事情？",
      category: "成就",
      tags: ["自豪", "成就"],
      intensity: 2
    },
    {
      content: "你曾经因为什么事情感到特别尴尬但后来变成了笑话？",
      category: "经历",
      tags: ["尴尬", "幽默"],
      intensity: 3
    },
    {
      content: "你最喜欢的儿时游戏是什么？",
      category: "回忆",
      tags: ["童年", "游戏"],
      intensity: 1
    },
    {
      content: "你曾经有过什么误会导致的有趣经历？",
      category: "经历",
      tags: ["误会", "幽默"],
      intensity: 2
    },
    {
      content: "你最想去但还没去过的地方是哪里？为什么想去？",
      category: "愿望",
      tags: ["旅行", "梦想"],
      intensity: 1
    },
    {
      content: "你曾经收到过什么让你特别感动的礼物？",
      category: "经历",
      tags: ["礼物", "感动"],
      intensity: 2
    },
    {
      content: "你有什么小时候特别喜欢但现在觉得很尴尬的爱好？",
      category: "回忆",
      tags: ["爱好", "成长"],
      intensity: 2
    },
    {
      content: "如果你可以和过去的自己说一句话，会说什么？",
      category: "反思",
      tags: ["自我", "建议"],
      intensity: 3
    },
    {
      content: "你曾经做过什么事情完全超出了自己的舒适区？",
      category: "成长",
      tags: ["挑战", "舒适区"],
      intensity: 3
    },
    {
      content: "你最后一次因为什么事情感到特别惊喜？",
      category: "经历",
      tags: ["惊喜", "情绪"],
      intensity: 2
    }
  ];
  const questions = [
    ...lowIntensityQuestions,
    ...mediumHighIntensityQuestions,
    ...highIntensityQuestions
  ];
  let selectedCategory = "all";
  let selectedTag = "all";
  let intensityLevel = [5];
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    filteredQuestions = questions.filter((q) => {
      const categoryMatch = selectedCategory === "all" || q.category === selectedCategory;
      const tagMatch = selectedTag === "all" || q.tags?.includes(selectedTag);
      const intensityMatch = q.intensity <= intensityLevel[0];
      return categoryMatch && tagMatch && intensityMatch;
    });
    categories = [...new Set(questions.map((q) => q.category))];
    tags = [...new Set(questions.flatMap((q) => q.tags || []))];
    $$rendered = `${validate_component(SEO, "Seo").$$render($$result, { title: "Tell The Truth | 真心话大冒险" }, {}, {})} <div class="container mx-auto px-4 py-12 max-w-3xl"><h1 class="text-4xl font-bold text-center mb-12" data-svelte-h="svelte-1pndclr">Tell The Truth</h1> <div class="grid gap-6 mb-8">${validate_component(Card, "Card").$$render($$result, { class: "p-6" }, {}, {
      default: () => {
        return `<h2 class="text-xl font-semibold mb-4" data-svelte-h="svelte-1tvec4e">筛选选项</h2> <div class="grid gap-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="space-y-2"><label for="category-select" class="text-sm font-medium" data-svelte-h="svelte-12pszbg">分类</label> ${validate_component(Root, "Select.Root").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Select_trigger, "Select.Trigger").$$render($$result, { class: "w-full" }, {}, {
              default: () => {
                return `${validate_component(Value, "Select.Value").$$render($$result, { placeholder: "选择分类" }, {}, {})}`;
              }
            })} ${validate_component(Select_content, "Select.Content").$$render($$result, { class: "max-h-96 overflow-y-auto" }, {}, {
              default: () => {
                return `${validate_component(Group, "Select.Group").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Select_item, "Select.Item").$$render($$result, { value: "all" }, {}, {
                      default: () => {
                        return `全部分类`;
                      }
                    })} ${each(categories, (category) => {
                      return `${validate_component(Select_item, "Select.Item").$$render($$result, { value: category }, {}, {
                        default: () => {
                          return `${escape(category)}`;
                        }
                      })}`;
                    })}`;
                  }
                })}`;
              }
            })} ${validate_component(Input, "Select.Input").$$render(
              $$result,
              { value: selectedCategory },
              {
                value: ($$value) => {
                  selectedCategory = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`;
          }
        })}</div> <div class="space-y-2"><label for="tag-select" class="text-sm font-medium" data-svelte-h="svelte-1xs8ifq">标签</label> ${validate_component(Root, "Select.Root").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Select_trigger, "Select.Trigger").$$render($$result, { class: "w-full" }, {}, {
              default: () => {
                return `${validate_component(Value, "Select.Value").$$render($$result, { placeholder: "选择标签" }, {}, {})}`;
              }
            })} ${validate_component(Select_content, "Select.Content").$$render($$result, { class: "max-h-96 overflow-y-auto" }, {}, {
              default: () => {
                return `${validate_component(Group, "Select.Group").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Select_item, "Select.Item").$$render($$result, { value: "all" }, {}, {
                      default: () => {
                        return `全部标签`;
                      }
                    })} ${each(tags, (tag) => {
                      return `${validate_component(Select_item, "Select.Item").$$render($$result, { value: tag }, {}, {
                        default: () => {
                          return `${escape(tag)}`;
                        }
                      })}`;
                    })}`;
                  }
                })}`;
              }
            })} ${validate_component(Input, "Select.Input").$$render(
              $$result,
              { value: selectedTag },
              {
                value: ($$value) => {
                  selectedTag = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`;
          }
        })}</div></div> <div class="space-y-2"><label for="intensity-slider" class="text-sm font-medium">刺激程度 ${escape(intensityLevel)} / 10</label> ${validate_component(Slider, "Slider").$$render(
          $$result,
          {
            id: "intensity-slider",
            min: 1,
            max: 10,
            step: 1,
            value: intensityLevel
          },
          {
            value: ($$value) => {
              intensityLevel = $$value;
              $$settled = false;
            }
          },
          {}
        )}</div></div>`;
      }
    })} ${validate_component(Card, "Card").$$render($$result, { class: "p-6" }, {}, {
      default: () => {
        return `<div class="text-center"><div class="min-h-[200px] flex items-center justify-center mb-6">${`${`<div class="text-gray-500" data-svelte-h="svelte-ju9u12">点击下方按钮抽取题目</div>`}`}</div> ${``} ${validate_component(Button, "Button").$$render(
          $$result,
          {
            size: "lg",
            disabled: filteredQuestions.length === 0
          },
          {},
          {
            default: () => {
              return `${escape(filteredQuestions.length === 0 ? "没有符合条件的题目" : "抽取新题目")}`;
            }
          }
        )} <p class="text-xs text-gray-500 mt-2">总题库：${escape(questions.length)} 题，当前题库：${escape(filteredQuestions.length)} 题</p></div>`;
      }
    })}</div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
