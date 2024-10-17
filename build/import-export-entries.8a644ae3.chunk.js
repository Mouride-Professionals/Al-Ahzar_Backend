"use strict";
(self["webpackChunkal_azhar_back"] = self["webpackChunkal_azhar_back"] || []).push([[3770],{

/***/ 2788:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages_App)
});

// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/dist/index.mjs + 15 modules
var dist = __webpack_require__(2317);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/react-router/esm/react-router.js
var react_router = __webpack_require__(16550);
// EXTERNAL MODULE: ./node_modules/strapi-plugin-import-export-entries/admin/src/pluginId.js
var pluginId = __webpack_require__(11919);
var pluginId_default = /*#__PURE__*/__webpack_require__.n(pluginId);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/ContentLayout.mjs
var ContentLayout = __webpack_require__(34726);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Flex/Flex.mjs
var Flex = __webpack_require__(96987);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Box/Box.mjs
var Box = __webpack_require__(16607);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.mjs + 2 modules
var Typography = __webpack_require__(10574);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Checkbox/Checkbox.mjs
var Checkbox = __webpack_require__(22546);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Select/Select.mjs
var Select = __webpack_require__(59586);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Select/Option.mjs
var Option = __webpack_require__(40933);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Link/Link.mjs
var Link = __webpack_require__(29824);
// EXTERNAL MODULE: ./node_modules/lodash/range.js
var range = __webpack_require__(96026);
var range_default = /*#__PURE__*/__webpack_require__.n(range);
// EXTERNAL MODULE: ./node_modules/strapi-plugin-import-export-entries/admin/src/components/ExportButton/index.js + 6 modules
var ExportButton = __webpack_require__(94007);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/HeaderLayout.mjs + 2 modules
var HeaderLayout = __webpack_require__(90731);
// EXTERNAL MODULE: ./node_modules/strapi-plugin-import-export-entries/admin/src/hooks/useI18n.js
var useI18n = __webpack_require__(41756);
;// CONCATENATED MODULE: ./node_modules/strapi-plugin-import-export-entries/admin/src/components/Header/Header.js



const Header = () => {
  const { i18n } = (0,useI18n/* useI18n */.Q)();
  return /* @__PURE__ */ react.createElement(Box/* Box */.x, { background: "neutral100" }, /* @__PURE__ */ react.createElement(
    HeaderLayout/* BaseHeaderLayout */.A,
    {
      title: i18n("plugin.name", "Import Export"),
      subtitle: i18n("plugin.description", "Import/Export data from and to your database in just few clicks"),
      as: "h2"
    }
  ));
};

;// CONCATENATED MODULE: ./node_modules/strapi-plugin-import-export-entries/admin/src/components/Header/index.js


// EXTERNAL MODULE: ./node_modules/strapi-plugin-import-export-entries/admin/src/components/ImportButton/index.js + 7 modules
var ImportButton = __webpack_require__(87939);
// EXTERNAL MODULE: ./node_modules/strapi-plugin-import-export-entries/admin/src/components/Injected/Alerts/index.js + 2 modules
var Alerts = __webpack_require__(92838);
// EXTERNAL MODULE: ./node_modules/strapi-plugin-import-export-entries/admin/src/hooks/useLocalStorage.js
var useLocalStorage = __webpack_require__(83726);
// EXTERNAL MODULE: ./node_modules/strapi-plugin-import-export-entries/admin/src/permissions.js
var permissions = __webpack_require__(35842);
// EXTERNAL MODULE: ./node_modules/strapi-plugin-import-export-entries/admin/src/utils/dataFormats.js
var dataFormats = __webpack_require__(93574);
;// CONCATENATED MODULE: ./node_modules/strapi-plugin-import-export-entries/admin/src/pages/HomePage/HomePage.js












const HomePage = () => {
  const { i18n } = (0,useI18n/* useI18n */.Q)();
  const { getPreferences, updatePreferences } = (0,useLocalStorage/* useLocalStorage */._)();
  const [preferences, setPreferences] = (0,react.useState)(getPreferences());
  const handleUpdatePreferences = (key, value) => {
    updatePreferences({ [key]: value });
    setPreferences(getPreferences());
  };
  return /* @__PURE__ */ react.createElement(dist/* CheckPagePermissions */.O4, { permissions: permissions/* pluginPermissions */.I.main }, /* @__PURE__ */ react.createElement(Header, null), /* @__PURE__ */ react.createElement(ContentLayout/* ContentLayout */.D, null, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { direction: "column", alignItems: "start", gap: 8 }, /* @__PURE__ */ react.createElement(Box/* Box */.x, { style: { alignSelf: "stretch" }, background: "neutral0", padding: "32px", hasRadius: true }, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { direction: "column", alignItems: "start", gap: 6 }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "alpha" }, i18n("plugin.page.homepage.section.quick-actions.title", "Quick Actions")), /* @__PURE__ */ react.createElement(Box/* Box */.x, null, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { direction: "column", alignItems: "start", gap: 4 }, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { gap: 4 }, /* @__PURE__ */ react.createElement(ImportButton/* ImportButton */.r, null), /* @__PURE__ */ react.createElement(ExportButton/* ExportButton */.j, { availableExportFormats: [dataFormats/* dataFormats */.g.JSON_V2] })))))), /* @__PURE__ */ react.createElement(Box/* Box */.x, { style: { alignSelf: "stretch" }, background: "neutral0", padding: "32px", hasRadius: true }, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { direction: "column", alignItems: "start", gap: 6 }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "alpha" }, i18n("plugin.page.homepage.section.preferences.title", "Preferences")), /* @__PURE__ */ react.createElement(Box/* Box */.x, null, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { direction: "column", alignItems: "start", gap: 4 }, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { justifyContent: "space-between" }, /* @__PURE__ */ react.createElement(Checkbox/* Checkbox */.X, { value: preferences.applyFilters, onValueChange: (value) => handleUpdatePreferences("applyFilters", value) }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, null, i18n("plugin.export.apply-filters-and-sort", "Apply filters and sort to exported data")))), /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { justifyContent: "space-between" }, /* @__PURE__ */ react.createElement(
    Select/* Select */.P,
    {
      label: i18n("plugin.export.deepness", "Deepness"),
      placeholder: i18n("plugin.export.deepness", "Deepness"),
      value: preferences.deepness,
      onChange: (value) => handleUpdatePreferences("deepness", value)
    },
    range_default()(1, 21).map((deepness) => /* @__PURE__ */ react.createElement(Option/* Option */.W, { key: deepness, value: deepness }, deepness))
  )))))), /* @__PURE__ */ react.createElement(Box/* Box */.x, { style: { alignSelf: "stretch" }, background: "neutral0", padding: "32px", hasRadius: true }, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { direction: "column", alignItems: "start", gap: 6 }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "alpha" }, i18n("plugin.page.homepage.section.need-help.title", "Feature Request / Bug Report")), /* @__PURE__ */ react.createElement(Box/* Box */.x, null, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { direction: "column", alignItems: "start", gap: 4 }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, null, i18n("plugin.page.homepage.section.need-help.description", "Feel free to reach out on the product roadmap, discord or github \u270C\uFE0F")), /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { gap: 4 }, /* @__PURE__ */ react.createElement(Link/* Link */.r, { href: "https://strapi-import-export-entries.canny.io", isExternal: true }, i18n("plugin.page.homepage.section.need-help.product-roadmap", "Product Roadmap")), /* @__PURE__ */ react.createElement(Link/* Link */.r, { href: "https://discord.gg/dcqCAFFdP8", isExternal: true }, i18n("plugin.page.homepage.section.need-help.discord", "Discord")), /* @__PURE__ */ react.createElement(Link/* Link */.r, { href: "https://github.com/Baboo7/strapi-plugin-import-export-entries/issues", isExternal: true }, i18n("plugin.page.homepage.section.need-help.github", "GitHub"))))))))), /* @__PURE__ */ react.createElement(Alerts/* Alerts */.p, null));
};
/* harmony default export */ const HomePage_HomePage = ((0,react.memo)(HomePage));

;// CONCATENATED MODULE: ./node_modules/strapi-plugin-import-export-entries/admin/src/pages/HomePage/index.js


;// CONCATENATED MODULE: ./node_modules/strapi-plugin-import-export-entries/admin/src/pages/App/index.js





const App = () => {
  return /* @__PURE__ */ react.createElement("div", null, /* @__PURE__ */ react.createElement(react_router/* Switch */.rs, null, /* @__PURE__ */ react.createElement(react_router/* Route */.AW, { path: `/plugins/${(pluginId_default())}`, component: HomePage_HomePage, exact: true }), /* @__PURE__ */ react.createElement(react_router/* Route */.AW, { component: dist/* AnErrorOccurred */.Hn })));
};
/* harmony default export */ const pages_App = (App);


/***/ }),

/***/ 34726:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ ContentLayout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var _Box_Box_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16607);



const ContentLayout = ({ children }) => {
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Box_Box_mjs__WEBPACK_IMPORTED_MODULE_1__/* .Box */ .x, { paddingLeft: 10, paddingRight: 10, children: children }));
};




/***/ }),

/***/ 90731:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ BaseHeaderLayout),
  T: () => (/* binding */ HeaderLayout)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(85893);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js + 4 modules
var styled_components_browser_esm = __webpack_require__(88972);
;// CONCATENATED MODULE: ./node_modules/@strapi/design-system/dist/hooks/useElementOnScreen.mjs


const useElementOnScreen = (options) => {
    const containerRef = (0,react.useRef)(null);
    const [isVisible, setIsVisible] = (0,react.useState)(true);
    const callback = ([entry]) => {
        setIsVisible(entry.isIntersecting);
    };
    (0,react.useEffect)(() => {
        const containerEl = containerRef.current;
        const observer = new IntersectionObserver(callback, options);
        if (containerEl) {
            observer.observe(containerRef.current);
        }
        return () => {
            if (containerEl) {
                observer.disconnect();
            }
        };
    }, [containerRef, options]);
    return [containerRef, isVisible];
};



// EXTERNAL MODULE: ./node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var dist = __webpack_require__(79698);
;// CONCATENATED MODULE: ./node_modules/@strapi/design-system/dist/hooks/useResizeObserver.mjs



const useResizeObserver = (sources, onResize) => {
    const handleResize = (0,dist/* useCallbackRef */.W)(onResize);
    (0,react.useLayoutEffect)(() => {
        const resizeObs = new ResizeObserver(handleResize);
        if (Array.isArray(sources)) {
            sources.forEach((source) => {
                if (source.current) {
                    resizeObs.observe(source.current);
                }
            });
        }
        else if (sources.current) {
            resizeObs.observe(sources.current);
        }
        return () => {
            resizeObs.disconnect();
        };
    }, [sources, handleResize]);
};



// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Box/Box.mjs
var Box = __webpack_require__(16607);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Flex/Flex.mjs
var Flex = __webpack_require__(96987);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.mjs + 2 modules
var Typography = __webpack_require__(10574);
;// CONCATENATED MODULE: ./node_modules/@strapi/design-system/dist/Layout/HeaderLayout.mjs









const HeaderLayout = (props) => {
    const baseHeaderLayoutRef = (0,react.useRef)(null);
    const [headerSize, setHeaderSize] = (0,react.useState)(null);
    const [containerRef, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: 0,
    });
    useResizeObserver(containerRef, () => {
        if (containerRef.current) {
            setHeaderSize(containerRef.current.getBoundingClientRect());
        }
    });
    (0,react.useEffect)(() => {
        if (baseHeaderLayoutRef.current) {
            setHeaderSize(baseHeaderLayoutRef.current.getBoundingClientRect());
        }
    }, [baseHeaderLayoutRef]);
    return ((0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [(0,jsx_runtime.jsx)("div", { style: { height: headerSize?.height }, ref: containerRef, children: isVisible && (0,jsx_runtime.jsx)(BaseHeaderLayout, { ref: baseHeaderLayoutRef, ...props }) }), !isVisible && (0,jsx_runtime.jsx)(BaseHeaderLayout, { ...props, sticky: true, width: headerSize?.width })] }));
};
HeaderLayout.displayName = 'HeaderLayout';
const StickyBox = (0,styled_components_browser_esm["default"])((0,Box/* Box */.x)) `
  width: ${({ width }) => (width ? `${width / 16}rem` : undefined)};
  z-index: ${({ theme }) => theme.zIndices[1]};
`;
const BaseHeaderLayout = react.forwardRef(({ navigationAction, primaryAction, secondaryAction, subtitle, title, sticky, width, ...props }, ref) => {
    const isSubtitleString = typeof subtitle === 'string';
    if (sticky) {
        return ((0,jsx_runtime.jsx)(StickyBox, { paddingLeft: 6, paddingRight: 6, paddingTop: 3, paddingBottom: 3, position: "fixed", top: 0, right: 0, background: "neutral0", shadow: "tableShadow", width: width, "data-strapi-header-sticky": true, children: (0,jsx_runtime.jsxs)(Flex/* Flex */.k, { justifyContent: "space-between", children: [(0,jsx_runtime.jsxs)(Flex/* Flex */.k, { children: [navigationAction && (0,jsx_runtime.jsx)(Box/* Box */.x, { paddingRight: 3, children: navigationAction }), (0,jsx_runtime.jsxs)(Box/* Box */.x, { children: [(0,jsx_runtime.jsx)(Typography/* Typography */.Z, { variant: "beta", as: "h1", ...props, children: title }), isSubtitleString ? ((0,jsx_runtime.jsx)(Typography/* Typography */.Z, { variant: "pi", textColor: "neutral600", children: subtitle })) : (subtitle)] }), secondaryAction ? (0,jsx_runtime.jsx)(Box/* Box */.x, { paddingLeft: 4, children: secondaryAction }) : null] }), (0,jsx_runtime.jsx)(Flex/* Flex */.k, { children: primaryAction ? (0,jsx_runtime.jsx)(Box/* Box */.x, { paddingLeft: 2, children: primaryAction }) : undefined })] }) }));
    }
    return ((0,jsx_runtime.jsxs)(Box/* Box */.x, { ref: ref, paddingLeft: 10, paddingRight: 10, paddingBottom: 8, paddingTop: navigationAction ? 6 : 8, background: "neutral100", "data-strapi-header": true, children: [navigationAction ? (0,jsx_runtime.jsx)(Box/* Box */.x, { paddingBottom: 2, children: navigationAction }) : null, (0,jsx_runtime.jsxs)(Flex/* Flex */.k, { justifyContent: "space-between", children: [(0,jsx_runtime.jsxs)(Flex/* Flex */.k, { minWidth: 0, children: [(0,jsx_runtime.jsx)(Typography/* Typography */.Z, { as: "h1", variant: "alpha", ...props, children: title }), secondaryAction ? (0,jsx_runtime.jsx)(Box/* Box */.x, { paddingLeft: 4, children: secondaryAction }) : null] }), primaryAction] }), isSubtitleString ? ((0,jsx_runtime.jsx)(Typography/* Typography */.Z, { variant: "epsilon", textColor: "neutral600", as: "p", children: subtitle })) : (subtitle)] }));
});




/***/ }),

/***/ 29824:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ Link)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67294);
/* harmony import */ var _strapi_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(62577);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(73727);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88972);
/* harmony import */ var _themes_utils_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(66362);
/* harmony import */ var _Typography_Typography_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10574);
/* harmony import */ var _Box_Box_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(16607);









const LinkWrapper = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].a `
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : undefined)};
  color: ${({ disabled, theme }) => (disabled ? theme.colors.neutral600 : theme.colors.primary600)};

  svg path {
    transition: fill 150ms ease-out;
    fill: currentColor;
  }

  svg {
    font-size: ${10 / 16}rem;
  }

  ${_Typography_Typography_mjs__WEBPACK_IMPORTED_MODULE_3__/* .Typography */ .Z} {
    transition: color 150ms ease-out;
    color: currentColor;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary500};
  }

  &:active {
    color: ${({ theme }) => theme.colors.primary700};
  }

  ${_themes_utils_mjs__WEBPACK_IMPORTED_MODULE_4__/* .buttonFocusStyle */ .BF};
`;
const IconWrapper = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_Box_Box_mjs__WEBPACK_IMPORTED_MODULE_5__/* .Box */ .x)) `
  display: flex;
`;
const Link = react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ children, href, to, disabled = false, startIcon, endIcon, ...restProps }, ref) => {
    const target = href ? '_blank' : undefined;
    const rel = href ? 'noreferrer noopener' : undefined;
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(LinkWrapper, { as: to && !disabled ? react_router_dom__WEBPACK_IMPORTED_MODULE_6__.NavLink : 'a', target: target, rel: rel, to: disabled ? undefined : to, href: disabled ? '#' : href, disabled: disabled, ref: ref, ...restProps, children: [startIcon && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(IconWrapper, { as: "span", "aria-hidden": true, paddingRight: 2, children: startIcon })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Typography_Typography_mjs__WEBPACK_IMPORTED_MODULE_3__/* .Typography */ .Z, { children: children }), endIcon && !href && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(IconWrapper, { as: "span", "aria-hidden": true, paddingLeft: 2, children: endIcon })), href && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(IconWrapper, { as: "span", "aria-hidden": true, paddingLeft: 2, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_strapi_icons__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {}) }))] }));
});




/***/ })

}]);