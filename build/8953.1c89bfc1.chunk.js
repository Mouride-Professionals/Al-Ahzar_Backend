"use strict";
(self["webpackChunkal_azhar_back"] = self["webpackChunkal_azhar_back"] || []).push([[8953],{

/***/ 89117:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = __webpack_require__(85893);
const React = __webpack_require__(67294);
const icons = __webpack_require__(89952);
const uiPrimitives = __webpack_require__(61299);
const styled = __webpack_require__(88972);
const strings = __webpack_require__(75794);
const useComposeRefs = __webpack_require__(18627);
const useControllableState = __webpack_require__(39171);
const useId = __webpack_require__(24414);
const useIntersection = __webpack_require__(93717);
const Loader = __webpack_require__(49385);
const utils = __webpack_require__(69186);
const Flex = __webpack_require__(90291);
const Box = __webpack_require__(60665);
const Typography = __webpack_require__(4583);
const Field = __webpack_require__(58674);
const FieldLabel = __webpack_require__(64919);
const FieldHint = __webpack_require__(92298);
const FieldError = __webpack_require__(73582);

const _interopDefault = e => e && e.__esModule ? e : { default: e };

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
  if (e) {
    for (const k in e) {
      if (k !== 'default') {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}

const React__namespace = /*#__PURE__*/_interopNamespace(React);
const styled__default = /*#__PURE__*/_interopDefault(styled);

const ComboboxInput = React__namespace.forwardRef(({ allowCustomValue, autocomplete, children, className, clearLabel = 'clear', creatable = false, createMessage = (value) => `Create "${value}"`, defaultFilterValue, defaultTextValue, defaultOpen = false, open, onOpenChange, disabled = false, error, filterValue, hasMoreItems = false, id, isPrintableCharacter, loading = false, loadingMessage = 'Loading content...', noOptionsMessage = () => 'No results found', onChange, onClear, onCreateOption, onFilterValueChange, onInputChange, onTextValueChange, onLoadMore, placeholder = 'Select or enter a value', required = false, size = 'M', startIcon, textValue, value, ...restProps }, forwardedRef) => {
    const [internalIsOpen, setInternalIsOpen] = useControllableState.useControllableState({
        prop: open,
        defaultProp: defaultOpen,
        onChange: onOpenChange,
    });
    const [internalTextValue, setInternalTextValue] = useControllableState.useControllableState({
        prop: textValue,
        defaultProp: allowCustomValue && !defaultTextValue ? value : defaultTextValue,
        onChange: onTextValueChange,
    });
    const [internalFilterValue, setInternalFilterValue] = useControllableState.useControllableState({
        prop: filterValue,
        defaultProp: defaultFilterValue,
        onChange: onFilterValueChange,
    });
    /**
     * Used for the intersection observer
     */
    const viewportRef = React__namespace.useRef(null);
    const triggerRef = React__namespace.useRef(null);
    const composedTriggerRefs = useComposeRefs.useComposedRefs(triggerRef, forwardedRef);
    const clearRef = React__namespace.useRef(null);
    const handleClearClick = (e) => {
        if (onClear && !disabled) {
            setInternalTextValue('');
            setInternalFilterValue('');
            onClear(e);
            triggerRef.current.focus();
        }
    };
    const handleOpenChange = (open) => {
        setInternalIsOpen(open);
    };
    const handleTextValueChange = (textValue) => {
        setInternalTextValue(textValue);
    };
    const handleFilterValueChange = (filterValue) => {
        setInternalFilterValue(filterValue);
    };
    const handleInputChange = (e) => {
        if (onInputChange) {
            onInputChange(e);
        }
    };
    const handleChange = (value) => {
        if (onChange) {
            onChange(value);
        }
    };
    const handleReachEnd = (entry) => {
        if (onLoadMore && hasMoreItems && !loading) {
            onLoadMore(entry);
        }
    };
    const handleCreateItemClick = () => {
        if (onCreateOption && internalTextValue) {
            onCreateOption(internalTextValue);
        }
    };
    const generatedId = useId.useId(id);
    const generatedIntersectionId = useId.useId();
    const intersectionId = `intersection-${strings.stripReactIdOfColon(generatedIntersectionId)}`;
    useIntersection.useIntersection(viewportRef, handleReachEnd, {
        selectorToWatch: `#${intersectionId}`,
        /**
         * We need to know when the select is open because only then will viewportRef
         * not be null. Because it uses a portal that (sensibly) is not mounted 24/7.
         */
        skipWhen: !internalIsOpen,
    });
    const hintId = `${generatedId}-hint`;
    const errorId = `${generatedId}-error`;
    return (jsxRuntime.jsxs(uiPrimitives.Combobox.Root, { autocomplete: autocomplete || (creatable ? 'list' : 'both'), onOpenChange: handleOpenChange, open: internalIsOpen, onTextValueChange: handleTextValueChange, textValue: internalTextValue, allowCustomValue: creatable || allowCustomValue, disabled: disabled, required: required, value: value, onValueChange: handleChange, filterValue: internalFilterValue, onFilterValueChange: handleFilterValueChange, isPrintableCharacter: isPrintableCharacter, children: [jsxRuntime.jsxs(Trigger, { "$hasError": Boolean(error), "$size": size, className: className, children: [jsxRuntime.jsxs(Flex.Flex, { flex: "1", as: "span", gap: 3, children: [startIcon ? (jsxRuntime.jsx(Box.Box, { as: "span", "aria-hidden": true, children: startIcon })) : null, jsxRuntime.jsx(TextInput, { placeholder: placeholder, id: id, "aria-invalid": Boolean(error), "aria-describedby": `${hintId} ${errorId}`, onChange: handleInputChange, ref: composedTriggerRefs, ...restProps })] }), jsxRuntime.jsxs(Flex.Flex, { as: "span", gap: 3, children: [internalTextValue && onClear ? (jsxRuntime.jsx(IconBox, { as: "button", hasRadius: true, background: "transparent", type: "button", onClick: handleClearClick, "aria-disabled": disabled, "aria-label": clearLabel, title: clearLabel, ref: clearRef, children: jsxRuntime.jsx(icons.Cross, {}) })) : null, jsxRuntime.jsx(DownIcon, { children: jsxRuntime.jsx(icons.CarretDown, {}) })] })] }), jsxRuntime.jsx(uiPrimitives.Combobox.Portal, { children: jsxRuntime.jsx(Content, { sideOffset: 4, children: jsxRuntime.jsxs(Viewport, { ref: viewportRef, children: [children, creatable ? (jsxRuntime.jsx(uiPrimitives.Combobox.CreateItem, { onPointerUp: handleCreateItemClick, onClick: handleCreateItemClick, asChild: true, children: jsxRuntime.jsx(OptionBox, { children: jsxRuntime.jsx(Typography.Typography, { children: createMessage(internalTextValue ?? '') }) }) })) : null, !creatable && !loading ? (jsxRuntime.jsx(uiPrimitives.Combobox.NoValueFound, { asChild: true, children: jsxRuntime.jsx(OptionBox, { "$hasHover": false, children: jsxRuntime.jsx(Typography.Typography, { children: noOptionsMessage(internalTextValue ?? '') }) }) })) : null, loading ? (jsxRuntime.jsx(Flex.Flex, { justifyContent: "center", alignItems: "center", paddingTop: 2, paddingBottom: 2, children: jsxRuntime.jsx(Loader.Loader, { small: true, children: loadingMessage }) })) : null, jsxRuntime.jsx(Box.Box, { id: intersectionId, width: "100%", height: "1px" })] }) }) })] }));
});
const Combobox = React__namespace.forwardRef(({ error, hint, id, label, labelAction, required = false, ...restProps }, forwardedRef) => {
    const generatedId = useId.useId(id);
    return (jsxRuntime.jsx(Field.Field, { hint: hint, error: error, id: generatedId, required: required, children: jsxRuntime.jsxs(Flex.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [label ? jsxRuntime.jsx(FieldLabel.FieldLabel, { action: labelAction, children: label }) : null, jsxRuntime.jsx(ComboboxInput, { ref: forwardedRef, id: generatedId, error: error, required: required, ...restProps }), jsxRuntime.jsx(FieldHint.FieldHint, {}), jsxRuntime.jsx(FieldError.FieldError, {})] }) }));
});
const CreatableCombobox = (props) => jsxRuntime.jsx(Combobox, { ...props, creatable: true });
const IconBox = styled__default.default(Box.Box) `
  border: none;

  svg {
    height: ${11 / 16}rem;
    width: ${11 / 16}rem;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.neutral600};
  }
`;
const Trigger = styled__default.default(uiPrimitives.Combobox.Trigger) `
  position: relative;
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.danger600 : theme.colors.neutral200)};
  padding-right: ${({ theme }) => theme.spaces[3]};
  padding-left: ${({ theme }) => theme.spaces[3]};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spaces[4]};
  min-height: ${({ theme, $size }) => utils.getThemeSize('input')({ theme, size: $size })};

  &[data-disabled] {
    color: ${({ theme }) => theme.colors.neutral600};
    background: ${({ theme }) => theme.colors.neutral150};
    cursor: not-allowed;
  }

  /* Required to ensure the below inputFocusStyles are adhered too */
  &:focus-visible {
    outline: none;
  }

  ${({ theme, $hasError }) => utils.inputFocusStyle()({ theme, hasError: $hasError })};
`;
const TextInput = styled__default.default(uiPrimitives.Combobox.TextInput) `
  width: 100%;
  font-size: ${14 / 16}rem;
  color: ${({ theme }) => theme.colors.neutral800};
  padding: 0;
  border: none;
  background-color: transparent;

  &:focus-visible {
    outline: none;
  }

  &[aria-disabled='true'] {
    cursor: inherit;
  }
`;
const DownIcon = styled__default.default(uiPrimitives.Combobox.Icon) `
  & > svg {
    width: ${6 / 16}rem;

    & > path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }

  &[aria-disabled='true'] {
    cursor: inherit;
  }
`;
const Content = styled__default.default(uiPrimitives.Combobox.Content) `
  background: ${({ theme }) => theme.colors.neutral0};
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: ${({ theme }) => theme.borderRadius};
  width: var(--radix-combobox-trigger-width);
  /* This is from the design-system figma file. */
  max-height: 15rem;
  z-index: ${({ theme }) => theme.zIndices[1]};
`;
const Viewport = styled__default.default(uiPrimitives.Combobox.Viewport) `
  padding: ${({ theme }) => theme.spaces[1]};
`;
const Option = React__namespace.forwardRef(({ children, value, disabled, textValue, ...props }, ref) => {
    return (jsxRuntime.jsx(uiPrimitives.Combobox.ComboboxItem, { asChild: true, value: value, disabled: disabled, textValue: textValue, children: jsxRuntime.jsx(OptionBox, { ref: ref, ...props, children: jsxRuntime.jsx(uiPrimitives.Combobox.ItemText, { asChild: true, children: jsxRuntime.jsx(Typography.Typography, { children: children }) }) }) }));
});
const OptionBox = styled__default.default.div `
  width: 100%;
  border: none;
  text-align: left;
  outline-offset: -3px;
  padding: ${({ theme }) => theme.spaces[2]} ${({ theme }) => theme.spaces[4]};
  background-color: ${({ theme }) => theme.colors.neutral0};
  border-radius: ${({ theme }) => theme.borderRadius};
  user-select: none;

  &[data-state='checked'] {
    background-color: ${({ theme }) => theme.colors.primary100};

    ${Typography.Typography} {
      color: ${({ theme }) => theme.colors.primary600};
      font-weight: bold;
    }
  }

  &:hover,
  &[data-highlighted] {
    outline: none;
    background-color: ${({ theme, $hasHover = true }) => ($hasHover ? theme.colors.primary100 : theme.colors.neutral0)};
  }

  &[data-highlighted] {
    ${Typography.Typography} {
      color: ${({ theme }) => theme.colors.primary600};
      font-weight: bold;
    }
  }
`;

exports.Combobox = Combobox;
exports.ComboboxInput = ComboboxInput;
exports.CreatableCombobox = CreatableCombobox;
exports.Option = Option;
exports.OptionBox = OptionBox;


/***/ }),

/***/ 28364:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const Combobox = __webpack_require__(89117);

const ComboboxOption = Combobox.Option;

exports.ComboboxOption = ComboboxOption;


/***/ }),

/***/ 27021:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const Combobox = __webpack_require__(89117);
const ComboboxOption = __webpack_require__(28364);



exports.Combobox = Combobox.Combobox;
exports.CreatableCombobox = Combobox.CreatableCombobox;
exports.ComboboxOption = ComboboxOption.ComboboxOption;


/***/ }),

/***/ 70072:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = __webpack_require__(85893);
const React = __webpack_require__(67294);
const styled = __webpack_require__(88972);
const Flex = __webpack_require__(90291);
const VisuallyHidden = __webpack_require__(98365);

const _interopDefault = e => e && e.__esModule ? e : { default: e };

const styled__default = /*#__PURE__*/_interopDefault(styled);

const FieldActionWrapper = styled__default.default(Flex.Flex) `
  font-size: 1.6rem;
  padding: 0;
`;
const FieldAction = React.forwardRef(({ label, children, ...props }, ref) => (jsxRuntime.jsxs(FieldActionWrapper, { justifyContent: "unset", background: "transparent", borderStyle: "none", type: "button", ...props, as: "button", ref: ref, children: [jsxRuntime.jsx(VisuallyHidden.VisuallyHidden, { as: "span", children: label }), React.cloneElement(children, {
            'aria-hidden': true,
            focusable: false, // See: https://allyjs.io/tutorials/focusing-in-svg.html#making-svg-elements-focusable
        })] })));

exports.FieldAction = FieldAction;


/***/ }),

/***/ 83534:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const Field = __webpack_require__(58674);
const FieldLabel = __webpack_require__(64919);
const FieldInput = __webpack_require__(30969);
const FieldHint = __webpack_require__(92298);
const FieldError = __webpack_require__(73582);
const FieldContext = __webpack_require__(44158);
const FieldAction = __webpack_require__(70072);



exports.Field = Field.Field;
exports.FieldLabel = FieldLabel.FieldLabel;
exports.FieldInput = FieldInput.FieldInput;
exports.InputWrapper = FieldInput.InputWrapper;
exports.FieldHint = FieldHint.FieldHint;
exports.FieldError = FieldError.FieldError;
exports.FieldContext = FieldContext.FieldContext;
exports.useField = FieldContext.useField;
exports.FieldAction = FieldAction.FieldAction;


/***/ }),

/***/ 49385:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = __webpack_require__(85893);
const React = __webpack_require__(67294);
const styled = __webpack_require__(88972);
const loader = __webpack_require__(53332);
const VisuallyHidden = __webpack_require__(98365);

const _interopDefault = e => e && e.__esModule ? e : { default: e };

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
  if (e) {
    for (const k in e) {
      if (k !== 'default') {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}

const React__namespace = /*#__PURE__*/_interopNamespace(React);
const styled__default = /*#__PURE__*/_interopDefault(styled);

const rotation = styled.keyframes `
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;
const LoaderImg = styled__default.default.img `
  animation: ${rotation} 1s infinite linear;
  will-change: transform;
  ${({ small, theme }) => small && `width: ${theme.spaces[6]}; height: ${theme.spaces[6]};`}
`;
const Loader = React__namespace.forwardRef(({ children, small = false, ...props }, ref) => {
    return (jsxRuntime.jsxs("div", { role: "alert", "aria-live": "assertive", ref: ref, ...props, children: [jsxRuntime.jsx(VisuallyHidden.VisuallyHidden, { children: children }), jsxRuntime.jsx(LoaderImg, { src: loader, "aria-hidden": true, small: small })] }));
});

exports.Loader = Loader;


/***/ }),

/***/ 53332:
/***/ ((module) => {



const loaderSvg = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjMiIGhlaWdodD0iNjMiIHZpZXdCb3g9IjAgMCA2MyA2MyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQyLjU1NjMgMTEuOTgxNkMzOS40ODQgMTAuMzA3MSAzNS44NTc1IDkuMjkwOTcgMzIuMzM1NCA5LjEzNTIxQzI4LjY0NDMgOC45Mjg4OCAyNC44Mjk1IDkuNzIzMTggMjEuMzMzNiAxMS40MTI5QzIwLjkxMjMgMTEuNTkwMSAyMC41Mzc2IDExLjgxMDEgMjAuMTcyMiAxMi4wMjQ5TDIwLjAxMDggMTIuMTE3OUMxOS44Nzc0IDEyLjE5NTEgMTkuNzQ0MSAxMi4yNzI0IDE5LjYwOCAxMi4zNTM2QzE5LjMyNTMgMTIuNTE0NiAxOS4wNDkyIDEyLjY3NDQgMTguNzU0NCAxMi44NzkyQzE4LjU0NjMgMTMuMDMyOSAxOC4zMzk1IDEzLjE3NTkgMTguMTMwMSAxMy4zMjNDMTcuNTY1OCAxMy43MjA4IDE2Ljk4NjggMTQuMTMxNyAxNi40OTgzIDE0LjU5NzlDMTQuODQ3NiAxNS45NTI0IDEzLjU1NzEgMTcuNjA3NSAxMi42MDcxIDE4LjkyMTRDMTAuNDM2NSAyMi4xNTY2IDkuMDg2MjIgMjUuOTU2NyA4LjgwNzAyIDI5LjYxNDNMOC43NzY0IDMwLjE1ODhDOC43MzMyOCAzMC45MTk2IDguNjg0NzYgMzEuNzA1NyA4Ljc1MzUzIDMyLjQ1NTVDOC43NjY0OCAzMi42MDg0IDguNzY2MSAzMi43NjM4IDguNzc1MDYgMzIuOTE0QzguNzg4OTUgMzMuMjI5IDguODAxNTIgMzMuNTM3MyA4Ljg0NiAzMy44NjcyTDkuMDczOTYgMzUuNDIyMUM5LjA5NzU2IDM1LjU3NjQgOS4xMTk4IDM1Ljc0MTMgOS4xNjMzIDM1LjkyNjNMOS42NTkxOSAzNy45MjcyTDEwLjEzOCAzOS4yODIzQzEwLjI3MjkgMzkuNjY3MyAxMC40MTU4IDQwLjA3NTEgMTAuNiA0MC40M0MxMi4wMjkyIDQzLjYzNyAxNC4xNDI1IDQ2LjQ1NzggMTYuNzA2MyA0OC41ODVDMTkuMDUwOCA1MC41Mjk2IDIxLjgyNCA1Mi4wMDIzIDI0Ljc0OTEgNTIuODQ1MkwyNi4yMzcxIDUzLjIzNzZDMjYuMzc4MSA1My4yNjkzIDI2LjQ5MjYgNTMuMjg4OSAyNi42MDMxIDUzLjMwNThMMjYuNzc3NSA1My4zMzExQzI3LjAwNTIgNTMuMzYzNiAyNy4yMTk1IDUzLjM5ODYgMjcuNDQ0NSA1My40MzVDMjcuODU5OCA1My41MDc2IDI4LjI2NzIgNTMuNTc0OCAyOC43MDc5IDUzLjYxODNMMzAuNTY0MSA1My43MjI5QzMwLjk1MTYgNTMuNzI0OSAzMS4zMzUyIDUzLjcwNjggMzEuNzA4MSA1My42ODc0QzMxLjkwMzkgNTMuNjgxIDMyLjA5ODQgNTMuNjY4MSAzMi4zMjg4IDUzLjY2MkMzNC41MjUzIDUzLjQ3NzIgMzYuNTEwNiA1My4wNjM0IDM4LjA1MTYgNTIuNDY1MkMzOC4xNzY5IDUyLjQxNzEgMzguMzAwOCA1Mi4zNzk2IDM4LjQyMzQgNTIuMzM1NUMzOC42NzI3IDUyLjI0OTkgMzguOTI1OSA1Mi4xNjcgMzkuMTQzMiA1Mi4wNTk5TDQwLjg1OTEgNTEuMjYyNkw0Mi41NzAyIDUwLjI2NkM0Mi45MDA5IDUwLjA2ODIgNDMuMDIwNSA0OS42NDE0IDQyLjgyODIgNDkuMjk4NEM0Mi42MzIgNDguOTUyNiA0Mi4yMDM0IDQ4LjgzMDggNDEuODYzNCA0OS4wMTY2TDQwLjE3OTIgNDkuOTIxOEwzOC40OTk1IDUwLjYyMjRDMzguMzE2OSA1MC42OTUzIDM4LjEyMSA1MC43NTM0IDM3LjkyMjQgNTAuODE1NUMzNy43ODM4IDUwLjg0ODkgMzcuNjUxOCA1MC44OTgzIDM3LjUwMTIgNTAuOTQwOEMzNi4wNzExIDUxLjQzNSAzNC4yNDQ1IDUxLjc0MjUgMzIuMjQ0IDUxLjgzNDZDMzIuMDQ0MiA1MS44MzgzIDMxLjg0NzEgNTEuODM3OSAzMS42NTQgNTEuODQwM0MzMS4zMDUxIDUxLjg0MTQgMzAuOTYwMiA1MS44NDUxIDMwLjYzOTIgNTEuODMwNUwyOC45MTc3IDUxLjY3MjVDMjguNTQ3NiA1MS42MTkgMjguMTY5NSA1MS41NDI3IDI3Ljc4NDggNTEuNDY3OEMyNy41NjM5IDUxLjQxNjcgMjcuMzM3NiA1MS4zNzM3IDI3LjEyOTkgNTEuMzM3NEwyNi45NTI5IDUxLjI5ODdDMjYuODcwNCA1MS4yODM0IDI2Ljc3NzIgNTEuMjY2NyAyNi43MzMzIDUxLjI1NDNMMjUuMzQ2NiA1MC44MzIyQzIyLjc2NTEgNDkuOTc4OSAyMC4zMyA0OC41NzI5IDE4LjI5NDIgNDYuNzU1N0MxNi4xMDU2IDQ0Ljc5NTEgMTQuMzMzOSA0Mi4yMzM1IDEzLjE3NDIgMzkuMzU4MkMxMi4wMjc2IDM2LjYwMTMgMTEuNTk4OCAzMy4yNzkyIDExLjk3MTYgMzAuMDA3NkMxMi4zMTQ1IDI3LjAyMTMgMTMuMzk0OCAyNC4xNjM1IDE1LjE4NTggMjEuNTA4M0MxNS4zMDM0IDIxLjMzMzkgMTUuNDIxIDIxLjE1OTYgMTUuNTIxMiAyMS4wMTk2QzE2LjQzMDkgMTkuODY4OCAxNy41NDA4IDE4LjU1ODkgMTguOTQ4MyAxNy40OTZDMTkuMzM2NyAxNy4xNTI1IDE5Ljc4NjIgMTYuODU2IDIwLjI2MTEgMTYuNTQ3OEMyMC40ODc4IDE2LjQwMDkgMjAuNzA3OSAxNi4yNTUzIDIwLjg5MDcgMTYuMTMwNkMyMS4wOTc0IDE2LjAwNDggMjEuMzE4OCAxNS44ODMxIDIxLjUzNDggMTUuNzY5NEMyMS42NzYxIDE1LjY5NzUgMjEuODE2MiAxNS42MTkgMjEuOTM4OCAxNS41NTc2TDIyLjEwMDIgMTUuNDY0NkMyMi40MDAyIDE1LjMwMzcgMjIuNjc0OSAxNS4xNTQ2IDIyLjk5MDggMTUuMDM5TDI0LjExODYgMTQuNTcxNUMyNC4zMzk5IDE0LjQ4NDQgMjQuNTcxOCAxNC40MTU5IDI0Ljc5OTcgMTQuMzQ0N0MyNC45NTMgMTQuMjk4MiAyNS4wOTgyIDE0LjI2MzUgMjUuMjYzNSAxNC4yMDc4QzI1Ljc4NiAxNC4wMTgyIDI2LjMyODMgMTMuOTExMiAyNi45MTA1IDEzLjc5NjVDMjcuMTE3IDEzLjc1NzEgMjcuMzMwMiAxMy43MTYzIDI3LjU2MDggMTMuNjU4NUMyNy43NTUzIDEzLjYxMSAyNy45NzM3IDEzLjU5NjkgMjguMjA4MiAxMy41NzYyQzI4LjM2NCAxMy41NjAzIDI4LjUxNzIgMTMuNTQ4MyAyOC42MzE4IDEzLjUzMzNDMjguNzg3NiAxMy41MTczIDI4LjkzNDIgMTMuNTA2NiAyOS4wOTI3IDEzLjQ4NjdDMjkuMzI4NSAxMy40NTU1IDI5LjU0NTYgMTMuNDM0NyAyOS43NDk0IDEzLjQzMzdDMzAuMDIzNyAxMy40NCAzMC4yOTk0IDEzLjQzNTcgMzAuNTc3NyAxMy40Mjc0QzMxLjA4MTEgMTMuNDIxIDMxLjU1NzkgMTMuNDE5NyAzMi4wMzE4IDEzLjQ5MTRDMzQuOTY2NCAxMy43MzUyIDM3LjcxNDQgMTQuNjA4NSA0MC4yMDUyIDE2LjA4NjhDNDIuMzQ4OSAxNy4zNjU1IDQ0LjI3MTYgMTkuMTUyNSA0NS43NjA3IDIxLjI2NEM0Ny4wMjU1IDIzLjA2MjggNDcuOTc1NiAyNS4wNTI4IDQ4LjQ5MjggMjcuMDM5M0M0OC41NzIgMjcuMzE3NiA0OC42Mjk5IDI3LjU5MzEgNDguNjgzOSAyNy44NjU5QzQ4LjcxNTQgMjguMDQyOCA0OC43NTYzIDI4LjIxNDUgNDguNzg5MiAyOC4zNjM2QzQ4LjgwMzcgMjguNDU0MSA0OC44MjA4IDI4LjU0MDYgNDguODQ0NSAyOC42MjU4QzQ4Ljg3NDkgMjguNzQ0MyA0OC44OTg2IDI4Ljg2NCA0OC45MTE2IDI4Ljk2NTFMNDguOTc5MyAyOS42MDQ3QzQ4Ljk5MjIgMjkuNzc0OCA0OS4wMTMyIDI5LjkzMzEgNDkuMDMwMSAzMC4wODg3QzQ5LjA2NjggMzAuMzI2OCA0OS4wODg5IDMwLjU2MDggNDkuMDk2NCAzMC43NTYxTDQ5LjEwODMgMzEuOTAwMUM0OS4xMzEyIDMyLjMzMDcgNDkuMDg5IDMyLjcxMTYgNDkuMDUyMiAzMy4wNjczQzQ5LjAzODQgMzMuMjU5OCA0OS4wMTI2IDMzLjQ0NDMgNDkuMDEyMyAzMy41ODI0QzQ4Ljk5NjEgMzMuNjkyNiA0OC45OTE4IDMzLjc5MzUgNDguOTgzNiAzMy44OTE3QzQ4Ljk3NTMgMzQuMDA3MiA0OC45NzI0IDM0LjExNDggNDguOTQxNCAzNC4yNTU0TDQ4LjU0NDkgMzYuMzA1OUM0OC4zMTM0IDM3Ljg2MjMgNDkuMzc5MyAzOS4zMzY1IDUwLjk0ODggMzkuNTgyMkM1Mi4wNDE3IDM5Ljc2MDEgNTMuMTUzNiAzOS4yODE5IDUzLjc3MTEgMzguMzY2NEM1NC4wMDYzIDM4LjAxNzYgNTQuMTYwNCAzNy42MjU3IDU0LjIyMjcgMzcuMjA2NEw1NC41MjE3IDM1LjI1NzRDNTQuNTUxNCAzNS4wNzU2IDU0LjU3MiAzNC44MyA1NC41ODQ2IDM0LjU3OTFMNTQuNjAyOCAzNC4yMzM4QzU0LjYwOTggMzQuMDU5OCA1NC42MjIzIDMzLjg3NzkgNTQuNjM0NyAzMy42Nzg4QzU0LjY3MzQgMzMuMTA1MiA1NC43MTYzIDMyLjQ0NzkgNTQuNjYxOSAzMS44MDU4TDU0LjU4NjcgMzAuNDI4OUM1NC41NjIyIDMwLjA5NTIgNTQuNTA5NyAyOS43NiA1NC40NTU5IDI5LjQxODFDNTQuNDMxIDI5LjI1NzIgNTQuNDA0OCAyOS4wODk2IDU0LjM4MjYgMjguOTA3NEw1NC4yNjg3IDI4LjEwNEM1NC4yMzMyIDI3LjkyNDQgNTQuMTgwNCAyNy43MjczIDU0LjEzMjkgMjcuNTM5Nkw1NC4wNjQzIDI3LjI0NTRDNTQuMDE5NSAyNy4wNzEgNTMuOTc3MyAyNi44OTI3IDUzLjkzMzggMjYuNzA3NkM1My44NDU1IDI2LjMzMDkgNTMuNzQ3OSAyNS45NDIyIDUzLjYxMyAyNS41NTcxQzUyLjg0IDIzLjAyOTIgNTEuNTM4MyAyMC41MTk0IDQ5LjgzMzggMTguMjc5OUM0Ny44NTQ0IDE1LjY4MiA0NS4zMzMzIDEzLjUwODcgNDIuNTU2MyAxMS45ODE2WiIgZmlsbD0iIzQ5NDVGRiIvPgo8L3N2Zz4K";

module.exports = loaderSvg;


/***/ }),

/***/ 75794:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const stripReactIdOfColon = (str) => str.replaceAll(':', '');

exports.stripReactIdOfColon = stripReactIdOfColon;


/***/ }),

/***/ 18627:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const React = __webpack_require__(67294);

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    if (e) {
        for (const k in e) {
            if (k !== 'default') {
                const d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: () => e[k]
                });
            }
        }
    }
    n.default = e;
    return Object.freeze(n);
}

const React__namespace = /*#__PURE__*/_interopNamespace(React);

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
function setRef(ref, value) {
    if (typeof ref === 'function') {
        ref(value);
    }
    else if (ref !== null && ref !== undefined) {
        ref.current = value;
    }
}
/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */
function composeRefs(...refs) {
    return (node) => refs.forEach((ref) => setRef(ref, node));
}
/**
 * Takes multiple React like refs either React.Ref or a callback:
 * (node: T) => void and returns a single function that can be
 * passed to a React component as a ref.
 *
 * Example:
 * ```tsx
 * import { useComposedRefs } from '../hooks/useComposedRefs';
 *
 * const Component = React.forwardRef<HTMLInputElement, ComponentProps>((props, forwardedRef) => {
 *  const ref = useComposedRefs(internalRef, forwardedRef);
 *
 *  React.useEffect(() => {
 *   ref.current.focus();
 *  }, [ref]);
 *
 *  return <input ref={ref} />
 * }
 * ```
 */
function useComposedRefs(...refs) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return React__namespace.useCallback(composeRefs(...refs), refs);
}

exports.composeRefs = composeRefs;
exports.useComposedRefs = useComposedRefs;


/***/ }),

/***/ 39171:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const React = __webpack_require__(67294);
const uiPrimitives = __webpack_require__(61299);

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    if (e) {
        for (const k in e) {
            if (k !== 'default') {
                const d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: () => e[k]
                });
            }
        }
    }
    n.default = e;
    return Object.freeze(n);
}

const React__namespace = /*#__PURE__*/_interopNamespace(React);

function useControllableState({ prop, defaultProp, onChange = () => { }, }) {
    const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({ defaultProp, onChange });
    const isControlled = prop !== undefined;
    const propValue = prop instanceof Function ? prop(uncontrolledProp) : prop;
    const value = isControlled ? propValue : uncontrolledProp;
    const handleChange = uiPrimitives.useCallbackRef(onChange);
    const setValue = React__namespace.useCallback((nextValue) => {
        if (isControlled) {
            const setter = nextValue;
            const value = typeof nextValue === 'function' ? setter(propValue) : nextValue;
            if (value !== propValue) {
                handleChange(value);
                setUncontrolledProp(nextValue);
            }
        }
        else {
            setUncontrolledProp(nextValue);
        }
    }, [isControlled, propValue, setUncontrolledProp, handleChange]);
    return [value, setValue];
}
function useUncontrolledState({ defaultProp, onChange }) {
    const uncontrolledState = React__namespace.useState(defaultProp);
    const [value] = uncontrolledState;
    const prevValueRef = React__namespace.useRef(value);
    const handleChange = uiPrimitives.useCallbackRef(onChange);
    React__namespace.useEffect(() => {
        if (prevValueRef.current !== value) {
            handleChange(value);
            prevValueRef.current = value;
        }
    }, [value, prevValueRef, handleChange]);
    return uncontrolledState;
}

exports.useControllableState = useControllableState;


/***/ }),

/***/ 93717:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const React = __webpack_require__(67294);
const uiPrimitives = __webpack_require__(61299);

const useIntersection = (scrollableAreaRef, callback, { selectorToWatch, skipWhen = false }) => {
    const handleIntersection = uiPrimitives.useCallbackRef(callback);
    React.useEffect(() => {
        if (skipWhen || !scrollableAreaRef.current)
            return;
        const options = {
            root: scrollableAreaRef.current,
            rootMargin: '0px',
        };
        const onEnterZone = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && scrollableAreaRef.current) {
                    if (scrollableAreaRef.current.scrollHeight > scrollableAreaRef.current.clientHeight) {
                        handleIntersection(entry);
                    }
                }
            });
        };
        const observer = new IntersectionObserver(onEnterZone, options);
        /**
         * @note We need to escape the selector because we use `React.useId` to generate our ids an
         * they contain `:` which is not a valid selector because it's part of the CSS spec
         */
        const target = scrollableAreaRef.current.querySelector(selectorToWatch);
        if (target) {
            observer.observe(target);
        }
        return () => {
            observer.disconnect();
        };
    }, [skipWhen, handleIntersection, selectorToWatch, scrollableAreaRef]);
};

exports.useIntersection = useIntersection;


/***/ }),

/***/ 98953:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(45697);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _strapi_design_system_Combobox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(27021);
/* harmony import */ var _strapi_design_system_Combobox__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_strapi_design_system_Combobox__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _strapi_design_system_Stack__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(42919);
/* harmony import */ var _strapi_design_system_Stack__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_strapi_design_system_Stack__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _strapi_design_system_Field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(83534);
/* harmony import */ var _strapi_design_system_Field__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_strapi_design_system_Field__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(86896);
/* harmony import */ var _utils_getTrad__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(77582);







const CountrySelect = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
  value,
  onChange,
  name,
  intlLabel,
  labelAction,
  required,
  attribute,
  description,
  placeholder,
  disabled,
  error
}, forwardedRef) => {
  const { formatMessage, messages } = (0,react_intl__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
  const parsedOptions = JSON.parse(messages[(0,_utils_getTrad__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)("countries")]);
  const isValidValue = !value || parsedOptions.hasOwnProperty(value);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    _strapi_design_system_Field__WEBPACK_IMPORTED_MODULE_3__.Field,
    {
      name,
      id: name,
      error: !isValidValue ? formatMessage({ id: (0,_utils_getTrad__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)("country-select.unsupported-country-code") }, { countryCode: value }) : error,
      required,
      hint: description && formatMessage(description)
    },
    /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_design_system_Stack__WEBPACK_IMPORTED_MODULE_4__.Stack, { spacing: 1 }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_design_system_Field__WEBPACK_IMPORTED_MODULE_3__.FieldLabel, { action: labelAction }, formatMessage(intlLabel)), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      _strapi_design_system_Combobox__WEBPACK_IMPORTED_MODULE_5__.Combobox,
      {
        ref: forwardedRef,
        placeholder: placeholder && formatMessage(placeholder),
        "aria-label": formatMessage(intlLabel),
        "aria-disabled": disabled,
        disabled,
        value: isValidValue ? value : null,
        onChange: (countryCode) => onChange({ target: { name, value: countryCode, type: attribute.type } }),
        onClear: () => onChange({ target: { name, value: "", type: attribute.type } })
      },
      Object.entries(parsedOptions).sort(([c1, n1], [c2, n2]) => n1.localeCompare(n2)).map(([countryCode, countryName]) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_design_system_Combobox__WEBPACK_IMPORTED_MODULE_5__.ComboboxOption, { value: countryCode, key: countryCode }, countryName))
    ), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_design_system_Field__WEBPACK_IMPORTED_MODULE_3__.FieldHint, null), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_design_system_Field__WEBPACK_IMPORTED_MODULE_3__.FieldError, null))
  );
});
CountrySelect.defaultProps = {
  description: null,
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
  value: ""
};
CountrySelect.propTypes = {
  intlLabel: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().object).isRequired,
  onChange: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func).isRequired,
  attribute: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().object).isRequired,
  name: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string).isRequired,
  description: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().object),
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),
  error: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),
  labelAction: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().object),
  required: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),
  value: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CountrySelect);


/***/ })

}]);