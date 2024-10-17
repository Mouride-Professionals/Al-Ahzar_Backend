(self["webpackChunkal_azhar_back"] = self["webpackChunkal_azhar_back"] || []).push([[5538],{

/***/ 95423:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./ar.json": [
		53803,
		7958
	],
	"./ca.json": [
		67634,
		3516
	],
	"./cs.json": [
		67278,
		7519
	],
	"./de.json": [
		52961,
		6901
	],
	"./dk.json": [
		72259,
		7898
	],
	"./en.json": [
		49898,
		320
	],
	"./es.json": [
		86702,
		8367
	],
	"./eu.json": [
		38153,
		8360
	],
	"./fr.json": [
		10542,
		8006
	],
	"./gu.json": [
		66003,
		2248
	],
	"./he.json": [
		51574,
		830
	],
	"./hi.json": [
		16007,
		6332
	],
	"./hu.json": [
		61919,
		5894
	],
	"./id.json": [
		1354,
		8897
	],
	"./it.json": [
		57442,
		3364
	],
	"./ja.json": [
		72185,
		1312
	],
	"./ko.json": [
		92975,
		1377
	],
	"./ml.json": [
		78270,
		9903
	],
	"./ms.json": [
		16427,
		3025
	],
	"./nl.json": [
		35566,
		2671
	],
	"./no.json": [
		39217,
		562
	],
	"./pl.json": [
		2506,
		7846
	],
	"./pt-BR.json": [
		61913,
		9647
	],
	"./pt.json": [
		57786,
		3340
	],
	"./ru.json": [
		76711,
		123
	],
	"./sa.json": [
		55119,
		9726
	],
	"./sk.json": [
		19043,
		606
	],
	"./sv.json": [
		42862,
		9303
	],
	"./th.json": [
		15364,
		749
	],
	"./tr.json": [
		49394,
		395
	],
	"./uk.json": [
		88068,
		7403
	],
	"./vi.json": [
		93473,
		3278
	],
	"./zh-Hans.json": [
		23407,
		2553
	],
	"./zh.json": [
		70326,
		1011
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(() => {
		return __webpack_require__.t(id, 3 | 16);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 95423;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 28840:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   iL: () => (/* binding */ LanguageProvider),
/* harmony export */   nt: () => (/* binding */ useLocales),
/* harmony export */   xW: () => (/* binding */ LANGUAGE_LOCAL_STORAGE_KEY)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67294);
/* harmony import */ var lodash_defaultsDeep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66913);
/* harmony import */ var lodash_defaultsDeep__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_defaultsDeep__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29558);




const LocalesContext = react__WEBPACK_IMPORTED_MODULE_1__.createContext({
  changeLocale: () => {
    throw new Error("LocalesContext: changeLocale() is not implemented");
  },
  localeNames: {}
});
const useLocales = () => react__WEBPACK_IMPORTED_MODULE_1__.useContext(LocalesContext);
const LANGUAGE_LOCAL_STORAGE_KEY = "strapi-admin-language";
const LanguageProvider = ({ children, localeNames, messages }) => {
  const [{ locale }, dispatch] = react__WEBPACK_IMPORTED_MODULE_1__.useReducer(
    reducer,
    initialState,
    () => {
      const languageFromLocaleStorage = window.localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY);
      if (languageFromLocaleStorage && localeNames[languageFromLocaleStorage]) {
        return {
          locale: languageFromLocaleStorage,
          localeNames
        };
      } else {
        return {
          locale: "en",
          localeNames
        };
      }
    }
  );
  react__WEBPACK_IMPORTED_MODULE_1__.useEffect(() => {
    window.localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, locale);
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);
  const changeLocale = react__WEBPACK_IMPORTED_MODULE_1__.useCallback((locale2) => {
    dispatch({
      type: "CHANGE_LOCALE",
      locale: locale2
    });
  }, []);
  const appMessages = lodash_defaultsDeep__WEBPACK_IMPORTED_MODULE_2___default()(messages[locale], messages.en);
  const contextValue = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(
    () => ({ changeLocale, localeNames }),
    [changeLocale, localeNames]
  );
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_intl__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, { locale, defaultLocale: "en", messages: appMessages, textComponent: "span", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LocalesContext.Provider, { value: contextValue, children }) });
};
const initialState = {
  localeNames: { en: "English" },
  locale: "en"
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_LOCALE": {
      const { locale } = action;
      if (!state.localeNames[locale]) {
        return state;
      }
      return { ...state, locale };
    }
    default: {
      return state;
    }
  }
};



/***/ }),

/***/ 19097:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ useNpsSurveySettings),
/* harmony export */   b: () => (/* binding */ NpsSurvey)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67294);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(78048);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(11219);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(96987);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(10574);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(16607);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(96208);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(17734);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(22304);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(45094);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(457);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(12473);
/* harmony import */ var _strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2317);
/* harmony import */ var _strapi_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(35771);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(41054);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(86896);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(88767);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(88972);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(87561);










const FieldWrapper = (0,styled_components__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_strapi_design_system__WEBPACK_IMPORTED_MODULE_7__/* .Field */ .g))`
  height: ${32 / 16}rem;
  width: ${32 / 16}rem;

  > label,
  ~ input {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  > label {
    color: inherit;
    cursor: pointer;
    padding: ${({ theme }) => theme.spaces[2]};
    text-align: center;
    vertical-align: middle;
  }

  &:hover,
  &:focus-within {
    background-color: ${({ theme }) => theme.colors.neutral0};
  }

  &:active,
  &.selected {
    color: ${({ theme }) => theme.colors.primary700};
    background-color: ${({ theme }) => theme.colors.neutral0};
    border-color: ${({ theme }) => theme.colors.primary700};
  }
`;
const delays = {
  postResponse: 90 * 24 * 60 * 60 * 1e3,
  // 90 days in ms
  postFirstDismissal: 7 * 24 * 60 * 60 * 1e3,
  // 7 days in ms
  postSubsequentDismissal: 90 * 24 * 60 * 60 * 1e3,
  // 90 days in ms
  display: 5 * 60 * 1e3
  // 5 minutes in ms
};
const ratingArray = [...Array(11).keys()];
const checkIfShouldShowSurvey = (settings) => {
  const { enabled, lastResponseDate, firstDismissalDate, lastDismissalDate } = settings;
  if (window.strapi.flags.nps === false) {
    return false;
  }
  if (enabled === false) {
    return false;
  }
  if (lastResponseDate) {
    const timeSinceLastResponse = Date.now() - new Date(lastResponseDate).getTime();
    if (timeSinceLastResponse >= delays.postResponse) {
      return true;
    }
    return false;
  }
  if (lastDismissalDate) {
    const timeSinceLastDismissal = Date.now() - new Date(lastDismissalDate).getTime();
    if (timeSinceLastDismissal >= delays.postSubsequentDismissal) {
      return true;
    }
    return false;
  }
  if (firstDismissalDate) {
    const timeSinceFirstDismissal = Date.now() - new Date(firstDismissalDate).getTime();
    if (timeSinceFirstDismissal >= delays.postFirstDismissal) {
      return true;
    }
    return false;
  }
  return true;
};
const NpsSurvey = () => {
  const theme = (0,styled_components__WEBPACK_IMPORTED_MODULE_6__.useTheme)();
  const { formatMessage } = (0,react_intl__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z)();
  const { npsSurveySettings, setNpsSurveySettings } = useNpsSurveySettings();
  const [isFeedbackResponse, setIsFeedbackResponse] = react__WEBPACK_IMPORTED_MODULE_1__.useState(false);
  const toggleNotification = (0,_strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_2__/* .useNotification */ .lm)();
  const { currentEnvironment, strapiVersion } = (0,_strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_2__/* .useAppInfo */ .L7)();
  const { mutate, isLoading } = (0,react_query__WEBPACK_IMPORTED_MODULE_4__.useMutation)(
    async (form) => {
      const res = await fetch("https://analytics.strapi.io/submit-nps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        throw new Error("Failed to submit NPS survey");
      }
      return res;
    },
    {
      onSuccess() {
        setNpsSurveySettings((settings) => ({
          ...settings,
          lastResponseDate: new Date().toString(),
          firstDismissalDate: null,
          lastDismissalDate: null
        }));
        setIsFeedbackResponse(true);
        setTimeout(() => {
          setSurveyIsShown(false);
        }, 3e3);
      },
      onError() {
        toggleNotification({
          type: "warning",
          message: formatMessage({ id: "notification.error", defaultMessage: "An error occurred" })
        });
      }
    }
  );
  const [surveyIsShown, setSurveyIsShown] = react__WEBPACK_IMPORTED_MODULE_1__.useState(
    checkIfShouldShowSurvey(npsSurveySettings)
  );
  const [displaySurvey, setDisplaySurvey] = react__WEBPACK_IMPORTED_MODULE_1__.useState(false);
  react__WEBPACK_IMPORTED_MODULE_1__.useEffect(() => {
    const displayTime = setTimeout(() => {
      setDisplaySurvey(true);
    }, delays.display);
    return () => {
      clearTimeout(displayTime);
    };
  }, []);
  if (!displaySurvey) {
    return null;
  }
  if (!surveyIsShown) {
    return null;
  }
  const handleSubmitResponse = ({
    npsSurveyRating,
    npsSurveyFeedback
  }) => {
    const userInfo = _strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_2__/* .auth */ .I8.getUserInfo();
    mutate({
      email: typeof userInfo === "object" && userInfo !== null ? userInfo.email : "",
      rating: npsSurveyRating,
      comment: npsSurveyFeedback,
      environment: currentEnvironment,
      version: strapiVersion,
      license: window.strapi.projectType
    });
  };
  const handleDismiss = () => {
    setNpsSurveySettings((settings) => {
      const nextSettings = {
        ...settings,
        lastResponseDate: null
      };
      if (settings.firstDismissalDate) {
        nextSettings.lastDismissalDate = new Date().toString();
      } else {
        nextSettings.firstDismissalDate = new Date().toString();
      }
      return nextSettings;
    });
    setSurveyIsShown(false);
  };
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_strapi_design_system__WEBPACK_IMPORTED_MODULE_9__/* .Portal */ .h, { children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    formik__WEBPACK_IMPORTED_MODULE_3__/* .Formik */ .J9,
    {
      initialValues: { npsSurveyFeedback: "", npsSurveyRating: null },
      onSubmit: handleSubmitResponse,
      validationSchema: yup__WEBPACK_IMPORTED_MODULE_5__/* .object */ .Ry({
        npsSurveyFeedback: yup__WEBPACK_IMPORTED_MODULE_5__/* .string */ .Z_(),
        npsSurveyRating: yup__WEBPACK_IMPORTED_MODULE_5__/* .number */ .Rx().required()
      }),
      children: ({ values, handleChange, setFieldValue }) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(formik__WEBPACK_IMPORTED_MODULE_3__/* .Form */ .l0, { name: "npsSurveyForm", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
        _strapi_design_system__WEBPACK_IMPORTED_MODULE_10__/* .Flex */ .k,
        {
          hasRadius: true,
          direction: "column",
          padding: 4,
          borderColor: "primary200",
          background: "neutral0",
          shadow: "popupShadow",
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: theme.zIndices[2],
          width: "50%",
          children: isFeedbackResponse ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_strapi_design_system__WEBPACK_IMPORTED_MODULE_11__/* .Typography */ .Z, { fontWeight: "semiBold", children: formatMessage({
            id: "app.components.NpsSurvey.feedback-response",
            defaultMessage: "Thank you very much for your feedback!"
          }) }) : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_strapi_design_system__WEBPACK_IMPORTED_MODULE_12__/* .Box */ .x, { as: "fieldset", width: "100%", children: [
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_strapi_design_system__WEBPACK_IMPORTED_MODULE_10__/* .Flex */ .k, { justifyContent: "space-between", width: "100%", children: [
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_strapi_design_system__WEBPACK_IMPORTED_MODULE_12__/* .Box */ .x, { marginLeft: "auto", marginRight: "auto", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_strapi_design_system__WEBPACK_IMPORTED_MODULE_11__/* .Typography */ .Z, { fontWeight: "semiBold", as: "legend", children: formatMessage({
                id: "app.components.NpsSurvey.banner-title",
                defaultMessage: "How likely are you to recommend Strapi to a friend or colleague?"
              }) }) }),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _strapi_design_system__WEBPACK_IMPORTED_MODULE_13__/* .IconButton */ .h,
                {
                  onClick: handleDismiss,
                  "aria-label": formatMessage({
                    id: "app.components.NpsSurvey.dismiss-survey-label",
                    defaultMessage: "Dismiss survey"
                  }),
                  icon: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_strapi_icons__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z, {})
                }
              )
            ] }),
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_strapi_design_system__WEBPACK_IMPORTED_MODULE_10__/* .Flex */ .k, { gap: 2, marginTop: 2, marginBottom: 2, justifyContent: "center", children: [
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_strapi_design_system__WEBPACK_IMPORTED_MODULE_11__/* .Typography */ .Z, { variant: "pi", textColor: "neutral600", children: formatMessage({
                id: "app.components.NpsSurvey.no-recommendation",
                defaultMessage: "Not at all likely"
              }) }),
              ratingArray.map((number) => {
                return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  FieldWrapper,
                  {
                    className: values.npsSurveyRating === number ? "selected" : void 0,
                    hasRadius: true,
                    background: "primary100",
                    borderColor: "primary200",
                    color: "primary600",
                    position: "relative",
                    cursor: "pointer",
                    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_strapi_design_system__WEBPACK_IMPORTED_MODULE_15__/* .FieldLabel */ .Q, { htmlFor: `nps-survey-rating-${number}-input`, children: [
                      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_strapi_design_system__WEBPACK_IMPORTED_MODULE_16__/* .VisuallyHidden */ .T, { children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        _strapi_design_system__WEBPACK_IMPORTED_MODULE_17__/* .FieldInput */ ._,
                        {
                          type: "radio",
                          id: `nps-survey-rating-${number}-input`,
                          name: "npsSurveyRating",
                          checked: values.npsSurveyRating === number,
                          onChange: (e) => setFieldValue("npsSurveyRating", parseInt(e.target.value, 10)),
                          value: number
                        }
                      ) }),
                      number
                    ] })
                  },
                  number
                );
              }),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_strapi_design_system__WEBPACK_IMPORTED_MODULE_11__/* .Typography */ .Z, { variant: "pi", textColor: "neutral600", children: formatMessage({
                id: "app.components.NpsSurvey.happy-to-recommend",
                defaultMessage: "Extremely likely"
              }) })
            ] }),
            values.npsSurveyRating !== null && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_strapi_design_system__WEBPACK_IMPORTED_MODULE_10__/* .Flex */ .k, { direction: "column", children: [
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_strapi_design_system__WEBPACK_IMPORTED_MODULE_12__/* .Box */ .x, { marginTop: 2, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_strapi_design_system__WEBPACK_IMPORTED_MODULE_15__/* .FieldLabel */ .Q, { htmlFor: "npsSurveyFeedback", fontWeight: "semiBold", fontSize: 2, children: formatMessage({
                id: "app.components.NpsSurvey.feedback-question",
                defaultMessage: "Do you have any suggestion for improvements?"
              }) }) }),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_strapi_design_system__WEBPACK_IMPORTED_MODULE_12__/* .Box */ .x, { width: "62%", marginTop: 3, marginBottom: 4, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _strapi_design_system__WEBPACK_IMPORTED_MODULE_18__/* .Textarea */ .g,
                {
                  id: "npsSurveyFeedback",
                  width: "100%",
                  onChange: handleChange,
                  children: values.npsSurveyFeedback
                }
              ) }),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_strapi_design_system__WEBPACK_IMPORTED_MODULE_19__/* .Button */ .z, { marginBottom: 2, type: "submit", loading: isLoading, children: formatMessage({
                id: "app.components.NpsSurvey.submit-feedback",
                defaultMessage: "Submit Feedback"
              }) })
            ] })
          ] })
        }
      ) })
    }
  ) });
};
function useNpsSurveySettings() {
  const [npsSurveySettings, setNpsSurveySettings] = (0,_strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_2__/* .usePersistentState */ .Yw)(
    "STRAPI_NPS_SURVEY_SETTINGS",
    {
      enabled: true,
      lastResponseDate: null,
      firstDismissalDate: null,
      lastDismissalDate: null
    }
  );
  return { npsSurveySettings, setNpsSurveySettings };
}



/***/ }),

/***/ 43847:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ Logo)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88972);
/* harmony import */ var _hooks_useConfiguration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(83171);



const Img = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].img`
  height: ${72 / 16}rem;
`;
const Logo = () => {
  const {
    logos: { auth }
  } = (0,_hooks_useConfiguration__WEBPACK_IMPORTED_MODULE_1__/* .useConfiguration */ .m)();
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Img, { src: auth?.custom ?? auth.default, "aria-hidden": true, alt: "" });
};



/***/ }),

/***/ 93575:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ useAdmin),
/* harmony export */   u: () => (/* binding */ AdminContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);

const AdminContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  getAdminInjectedComponents() {
    throw new Error("AdminContext: getAdminInjectedComponents() not implemented");
  }
});
const useAdmin = () => react__WEBPACK_IMPORTED_MODULE_0__.useContext(AdminContext);



/***/ }),

/***/ 60371:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ ConfigurationContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);

const ConfigurationContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  logos: {
    auth: { default: "" },
    menu: { default: "" }
  },
  showTutorials: false,
  showReleaseNotification: false,
  updateProjectSettings: () => {
    throw new Error("updateProjectSettings was not implemented");
  }
});



/***/ }),

/***/ 38482:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ ThemeToggleContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);

const ThemeToggleContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});


/***/ }),

/***/ 83171:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ useConfiguration)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var _contexts_configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(60371);


const useConfiguration = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_contexts_configuration__WEBPACK_IMPORTED_MODULE_1__/* .ConfigurationContext */ ._);


/***/ }),

/***/ 48232:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ useEnterprise)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var _strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2317);


function isEnterprise() {
  return window.strapi.isEE;
}
function useEnterprise(ceData, eeCallback, {
  defaultValue = null,
  combine = (ceData2, eeData) => eeData,
  enabled = true
} = {}) {
  const eeCallbackRef = (0,_strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_1__/* .useCallbackRef */ .W6)(eeCallback);
  const combineCallbackRef = (0,_strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_1__/* .useCallbackRef */ .W6)(combine);
  const [{ data }, setData] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    data: isEnterprise() && enabled ? defaultValue : ceData
  });
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    async function importEE() {
      const eeData = await eeCallbackRef();
      setData({ data: combineCallbackRef(ceData, eeData) });
    }
    if (isEnterprise() && enabled) {
      importEE();
    }
  }, [ceData, eeCallbackRef, combineCallbackRef, enabled]);
  return data;
}


/***/ }),

/***/ 27027:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ useThemeToggle)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var _contexts_themeToggle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38482);


const useThemeToggle = () => {
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_contexts_themeToggle__WEBPACK_IMPORTED_MODULE_1__/* .ThemeToggleContext */ .R);
  return context;
};


/***/ }),

/***/ 14438:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src_StrapiApp)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/themes/lightTheme/index.mjs + 2 modules
var lightTheme = __webpack_require__(12255);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/themes/darkTheme/index.mjs + 2 modules
var darkTheme = __webpack_require__(5907);
// EXTERNAL MODULE: ./node_modules/invariant/browser.js
var browser = __webpack_require__(41143);
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);
// EXTERNAL MODULE: ./node_modules/lodash/isFunction.js
var isFunction = __webpack_require__(23560);
var isFunction_default = /*#__PURE__*/__webpack_require__.n(isFunction);
// EXTERNAL MODULE: ./node_modules/lodash/merge.js
var merge = __webpack_require__(82492);
var merge_default = /*#__PURE__*/__webpack_require__.n(merge);
// EXTERNAL MODULE: ./node_modules/lodash/pick.js
var pick = __webpack_require__(78718);
var pick_default = /*#__PURE__*/__webpack_require__.n(pick);
// EXTERNAL MODULE: ./node_modules/react-helmet/es/Helmet.js
var Helmet = __webpack_require__(64593);
// EXTERNAL MODULE: ./node_modules/react-router-dom/esm/react-router-dom.js
var react_router_dom = __webpack_require__(73727);
// EXTERNAL MODULE: ./.cache/admin/src/assets/images/logo-strapi-2022.svg
var logo_strapi_2022 = __webpack_require__(61473);
// EXTERNAL MODULE: ./.cache/admin/src/components/LanguageProvider.tsx
var LanguageProvider = __webpack_require__(28840);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/dist/index.mjs + 15 modules
var dist = __webpack_require__(2317);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(45697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/react-query/es/index.js
var es = __webpack_require__(88767);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 21 modules
var react_redux_es = __webpack_require__(86706);
// EXTERNAL MODULE: ./.cache/admin/src/contexts/admin.ts
var admin = __webpack_require__(93575);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(85893);
// EXTERNAL MODULE: ./.cache/admin/src/contexts/configuration.ts
var configuration = __webpack_require__(60371);
;// CONCATENATED MODULE: ./.cache/admin/src/components/ConfigurationProvider.tsx



const ConfigurationProvider = ({
  children,
  authLogo: defaultAuthLogo,
  menuLogo: defaultMenuLogo,
  showReleaseNotification = false,
  showTutorials = false
}) => {
  const [{ menuLogo, authLogo }, setLogos] = react.useState({
    menuLogo: null,
    authLogo: null
  });
  const updateProjectSettings = react.useCallback(
    ({ menuLogo: menuLogo2, authLogo: authLogo2 }) => {
      setLogos({
        menuLogo: menuLogo2 || defaultMenuLogo,
        authLogo: authLogo2 || defaultAuthLogo
      });
    },
    [defaultAuthLogo, defaultMenuLogo]
  );
  const configurationValue = react.useMemo(() => {
    return {
      logos: {
        menu: { custom: menuLogo, default: defaultMenuLogo },
        auth: { custom: authLogo, default: defaultAuthLogo }
      },
      updateProjectSettings,
      showReleaseNotification,
      showTutorials
    };
  }, [
    menuLogo,
    defaultMenuLogo,
    authLogo,
    defaultAuthLogo,
    updateProjectSettings,
    showReleaseNotification,
    showTutorials
  ]);
  return /* @__PURE__ */ (0,jsx_runtime.jsx)(configuration/* ConfigurationContext */._.Provider, { value: configurationValue, children });
};


// EXTERNAL MODULE: ./node_modules/lodash/get.js
var get = __webpack_require__(27361);
var get_default = /*#__PURE__*/__webpack_require__.n(get);
// EXTERNAL MODULE: ./node_modules/lodash/set.js
var set = __webpack_require__(36968);
var set_default = /*#__PURE__*/__webpack_require__.n(set);
;// CONCATENATED MODULE: ./.cache/admin/src/components/GuidedTour/utils/persistStateToLocaleStorage.js
const CURRENT_STEP = "GUIDED_TOUR_CURRENT_STEP";
const COMPLETED_STEPS = "GUIDED_TOUR_COMPLETED_STEPS";
const SKIPPED = "GUIDED_TOUR_SKIPPED";
const parse = JSON.parse;
const stringify = JSON.stringify;
const persistStateToLocaleStorage = {
  clear() {
    localStorage.removeItem(CURRENT_STEP);
    localStorage.removeItem(COMPLETED_STEPS);
  },
  addCompletedStep(completedStep) {
    const currentSteps = parse(localStorage.getItem(COMPLETED_STEPS))?.slice() || [];
    const isAlreadyStored = currentSteps.includes(completedStep);
    if (isAlreadyStored) {
      return;
    }
    currentSteps.push(completedStep);
    localStorage.setItem(COMPLETED_STEPS, stringify(currentSteps));
  },
  addCurrentStep(currentStep) {
    localStorage.setItem(CURRENT_STEP, stringify(currentStep));
  },
  setSkipped(value) {
    localStorage.setItem(SKIPPED, stringify(value));
  },
  get(item) {
    return parse(localStorage.getItem(item));
  }
};
/* harmony default export */ const utils_persistStateToLocaleStorage = (persistStateToLocaleStorage);

;// CONCATENATED MODULE: ./.cache/admin/src/components/GuidedTour/init.js


const init = (initialState) => {
  const copyInitialState = { ...initialState };
  const guidedTourLocaleStorage = utils_persistStateToLocaleStorage.get(COMPLETED_STEPS);
  const currentStepLocaleStorage = utils_persistStateToLocaleStorage.get(CURRENT_STEP);
  const skippedLocaleStorage = utils_persistStateToLocaleStorage.get(SKIPPED);
  if (guidedTourLocaleStorage) {
    guidedTourLocaleStorage.forEach((step) => {
      const [sectionName, stepName] = step.split(".");
      set_default()(copyInitialState, ["guidedTourState", sectionName, stepName], true);
    });
  }
  if (currentStepLocaleStorage) {
    const [sectionName, stepName] = currentStepLocaleStorage.split(".");
    set_default()(copyInitialState, ["guidedTourState", sectionName, stepName], true);
    utils_persistStateToLocaleStorage.addCompletedStep(currentStepLocaleStorage);
    utils_persistStateToLocaleStorage.addCurrentStep(null);
  }
  if (skippedLocaleStorage !== null) {
    set_default()(copyInitialState, "isSkipped", skippedLocaleStorage);
  }
  return copyInitialState;
};
/* harmony default export */ const GuidedTour_init = (init);

// EXTERNAL MODULE: ./node_modules/immer/dist/immer.esm.js
var immer_esm = __webpack_require__(18172);
;// CONCATENATED MODULE: ./.cache/admin/src/components/GuidedTour/reducer.js

const initialState = {
  currentStep: null,
  guidedTourState: {
    contentTypeBuilder: {
      create: false,
      success: false
    },
    contentManager: {
      create: false,
      success: false
    },
    apiTokens: {
      create: false,
      success: false
    }
  },
  isGuidedTourVisible: false,
  isSkipped: true
};
const reducer = (state = initialState, action) => (0,immer_esm/* default */.ZP)(state, (draftState) => {
  switch (action.type) {
    case "SET_CURRENT_STEP": {
      draftState.currentStep = action.step;
      break;
    }
    case "SET_STEP_STATE": {
      const [section, step] = action.currentStep.split(".");
      draftState.guidedTourState[section][step] = action.value;
      break;
    }
    case "SET_SKIPPED": {
      draftState.isSkipped = action.value;
      break;
    }
    case "SET_GUIDED_TOUR_VISIBILITY": {
      draftState.isGuidedTourVisible = action.value;
      break;
    }
    default: {
      return draftState;
    }
  }
});
/* harmony default export */ const GuidedTour_reducer = (reducer);

;// CONCATENATED MODULE: ./.cache/admin/src/components/GuidedTour/utils/arePreviousSectionsDone.js
const arePreviousSectionsDone = (sectionName, guidedTourState) => {
  const guidedTourArray = Object.entries(guidedTourState);
  const currentSectionIndex = guidedTourArray.findIndex(([key]) => key === sectionName);
  const previousSections = guidedTourArray.slice(0, currentSectionIndex);
  return previousSections.every(([, sectionValue]) => Object.values(sectionValue).every(Boolean));
};
/* harmony default export */ const utils_arePreviousSectionsDone = (arePreviousSectionsDone);

;// CONCATENATED MODULE: ./.cache/admin/src/components/GuidedTour/utils/arePreviousStepsDone.js
const arePreviousStepsDone = (step, guidedTourState) => {
  const stepSplit = step.split(".");
  const stepName = stepSplit[1];
  const sectionArray = Object.entries(guidedTourState[stepSplit[0]]);
  const currentStepIndex = sectionArray.findIndex(([key]) => key === stepName);
  const previousSteps = sectionArray.slice(0, currentStepIndex);
  return previousSteps.every(([, sectionValue]) => sectionValue);
};
/* harmony default export */ const utils_arePreviousStepsDone = (arePreviousStepsDone);

;// CONCATENATED MODULE: ./.cache/admin/src/components/GuidedTour/index.js









const GuidedTour = ({ children }) => {
  const [{ currentStep, guidedTourState, isGuidedTourVisible, isSkipped }, dispatch] = (0,react.useReducer)(
    GuidedTour_reducer,
    initialState,
    GuidedTour_init
  );
  const setCurrentStep = (step) => {
    if (step !== null) {
      const isStepAlreadyDone = get_default()(guidedTourState, step);
      const isStepToShow = utils_arePreviousStepsDone(step, guidedTourState);
      if (isStepAlreadyDone || isSkipped || !isStepToShow) {
        return null;
      }
    }
    utils_persistStateToLocaleStorage.addCurrentStep(step);
    return dispatch({
      type: "SET_CURRENT_STEP",
      step
    });
  };
  const setGuidedTourVisibility = (value) => {
    dispatch({
      type: "SET_GUIDED_TOUR_VISIBILITY",
      value
    });
  };
  const setStepState = (currentStep2, value) => {
    utils_persistStateToLocaleStorage.addCompletedStep(currentStep2);
    dispatch({
      type: "SET_STEP_STATE",
      currentStep: currentStep2,
      value
    });
  };
  const startSection = (sectionName) => {
    const sectionSteps = guidedTourState[sectionName];
    if (sectionSteps) {
      const isSectionToShow = utils_arePreviousSectionsDone(sectionName, guidedTourState);
      const firstStep = Object.keys(sectionSteps)[0];
      const isFirstStepDone = sectionSteps[firstStep];
      if (isSectionToShow && !currentStep && !isFirstStepDone) {
        return setCurrentStep(`${sectionName}.${firstStep}`);
      }
    }
    return null;
  };
  const setSkipped = (value) => {
    utils_persistStateToLocaleStorage.setSkipped(value);
    dispatch({
      type: "SET_SKIPPED",
      value
    });
  };
  return /* @__PURE__ */ react.createElement(
    dist/* GuidedTourProvider */.Zc,
    {
      guidedTourState,
      currentStep,
      setCurrentStep,
      setGuidedTourVisibility,
      setSkipped,
      setStepState,
      startSection,
      isGuidedTourVisible,
      isSkipped
    },
    children
  );
};
GuidedTour.propTypes = {
  children: (prop_types_default()).element.isRequired
};
/* harmony default export */ const components_GuidedTour = (GuidedTour);

// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/DesignSystemProvider.mjs + 2 modules
var DesignSystemProvider = __webpack_require__(33850);
// EXTERNAL MODULE: ./node_modules/react-intl/lib/src/components/useIntl.js
var useIntl = __webpack_require__(86896);
// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js + 4 modules
var styled_components_browser_esm = __webpack_require__(88972);
// EXTERNAL MODULE: ./.cache/admin/src/hooks/useThemeToggle.ts
var useThemeToggle = __webpack_require__(27027);
;// CONCATENATED MODULE: ./.cache/admin/src/components/Theme.tsx





const Theme = ({ children }) => {
  const { currentTheme, themes } = (0,useThemeToggle/* useThemeToggle */.M)();
  const { locale } = (0,useIntl/* default */.Z)();
  return /* @__PURE__ */ (0,jsx_runtime.jsxs)(
    DesignSystemProvider/* DesignSystemProvider */.h,
    {
      locale,
      theme: currentTheme && themes ? themes[currentTheme] : themes?.light,
      children: [
        children,
        /* @__PURE__ */ (0,jsx_runtime.jsx)(GlobalStyle, {})
      ]
    }
  );
};
const GlobalStyle = (0,styled_components_browser_esm.createGlobalStyle)`
  body {
    background: ${({ theme }) => theme.colors.neutral100};
  }
`;


// EXTERNAL MODULE: ./.cache/admin/src/contexts/themeToggle.ts
var themeToggle = __webpack_require__(38482);
;// CONCATENATED MODULE: ./.cache/admin/src/components/ThemeToggleProvider.tsx



const THEME_KEY = "STRAPI_THEME";
const getDefaultTheme = () => {
  const browserTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const persistedTheme = localStorage.getItem(THEME_KEY);
  if (!persistedTheme) {
    localStorage.setItem(THEME_KEY, browserTheme);
  }
  return persistedTheme || browserTheme;
};
const ThemeToggleProvider = ({ children, themes }) => {
  const [currentTheme, setCurrentTheme] = react.useState(getDefaultTheme());
  const handleChangeTheme = react.useCallback(
    (nextTheme) => {
      setCurrentTheme(nextTheme);
      localStorage.setItem(THEME_KEY, nextTheme);
    },
    [setCurrentTheme]
  );
  const themeValues = react.useMemo(() => {
    return {
      currentTheme,
      onChangeTheme: handleChangeTheme,
      themes
    };
  }, [currentTheme, handleChangeTheme, themes]);
  return /* @__PURE__ */ (0,jsx_runtime.jsx)(themeToggle/* ThemeToggleContext */.R.Provider, { value: themeValues, children });
};


;// CONCATENATED MODULE: ./.cache/admin/src/components/Providers/index.js











const queryClient = new es.QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});
const Providers = ({
  authLogo,
  children,
  components,
  customFields,
  fields,
  getAdminInjectedComponents,
  getPlugin,
  localeNames,
  menu,
  menuLogo,
  messages,
  plugins,
  runHookParallel,
  runHookSeries,
  runHookWaterfall,
  settings,
  showReleaseNotification,
  showTutorials,
  store,
  themes
}) => {
  return /* @__PURE__ */ react.createElement(LanguageProvider/* LanguageProvider */.iL, { messages, localeNames }, /* @__PURE__ */ react.createElement(ThemeToggleProvider, { themes }, /* @__PURE__ */ react.createElement(Theme, null, /* @__PURE__ */ react.createElement(es.QueryClientProvider, { client: queryClient }, /* @__PURE__ */ react.createElement(react_redux_es/* Provider */.zt, { store }, /* @__PURE__ */ react.createElement(admin/* AdminContext */.u.Provider, { value: { getAdminInjectedComponents } }, /* @__PURE__ */ react.createElement(
    ConfigurationProvider,
    {
      authLogo,
      menuLogo,
      showReleaseNotification,
      showTutorials
    },
    /* @__PURE__ */ react.createElement(
      dist/* StrapiAppProvider */._Y,
      {
        getPlugin,
        menu,
        plugins,
        runHookParallel,
        runHookWaterfall,
        runHookSeries,
        settings
      },
      /* @__PURE__ */ react.createElement(dist/* LibraryProvider */.rt, { components, fields }, /* @__PURE__ */ react.createElement(dist/* CustomFieldsProvider */.MG, { customFields }, /* @__PURE__ */ react.createElement(dist/* AutoReloadOverlayBlockerProvider */.m$, null, /* @__PURE__ */ react.createElement(dist/* OverlayBlockerProvider */.w7, null, /* @__PURE__ */ react.createElement(components_GuidedTour, null, /* @__PURE__ */ react.createElement(dist/* NotificationsProvider */.N$, null, children))))))
    )
  )))))));
};
Providers.propTypes = {
  authLogo: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).any]).isRequired,
  children: (prop_types_default()).node.isRequired,
  components: (prop_types_default()).object.isRequired,
  customFields: (prop_types_default()).object.isRequired,
  fields: (prop_types_default()).object.isRequired,
  getAdminInjectedComponents: (prop_types_default()).func.isRequired,
  getPlugin: (prop_types_default()).func.isRequired,
  localeNames: prop_types_default().objectOf((prop_types_default()).string).isRequired,
  menu: prop_types_default().arrayOf(
    prop_types_default().shape({
      to: (prop_types_default()).string.isRequired,
      icon: (prop_types_default()).func.isRequired,
      intlLabel: prop_types_default().shape({
        id: (prop_types_default()).string.isRequired,
        defaultMessage: (prop_types_default()).string.isRequired
      }).isRequired,
      permissions: (prop_types_default()).array,
      Component: (prop_types_default()).func
    })
  ).isRequired,
  menuLogo: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).any]).isRequired,
  messages: (prop_types_default()).object.isRequired,
  plugins: (prop_types_default()).object.isRequired,
  runHookParallel: (prop_types_default()).func.isRequired,
  runHookWaterfall: (prop_types_default()).func.isRequired,
  runHookSeries: (prop_types_default()).func.isRequired,
  settings: (prop_types_default()).object.isRequired,
  showReleaseNotification: (prop_types_default()).bool.isRequired,
  showTutorials: (prop_types_default()).bool.isRequired,
  store: (prop_types_default()).object.isRequired,
  themes: prop_types_default().shape({
    light: prop_types_default().shape({
      colors: (prop_types_default()).object.isRequired,
      shadows: (prop_types_default()).object.isRequired,
      sizes: (prop_types_default()).object.isRequired,
      zIndices: (prop_types_default()).array.isRequired,
      spaces: (prop_types_default()).array.isRequired,
      borderRadius: (prop_types_default()).string.isRequired,
      mediaQueries: (prop_types_default()).object.isRequired,
      fontSizes: (prop_types_default()).array.isRequired,
      lineHeights: (prop_types_default()).array.isRequired,
      fontWeights: (prop_types_default()).object.isRequired
    }).isRequired,
    dark: prop_types_default().shape({
      colors: (prop_types_default()).object.isRequired,
      shadows: (prop_types_default()).object.isRequired,
      sizes: (prop_types_default()).object.isRequired,
      zIndices: (prop_types_default()).array.isRequired,
      spaces: (prop_types_default()).array.isRequired,
      borderRadius: (prop_types_default()).string.isRequired,
      mediaQueries: (prop_types_default()).object.isRequired,
      fontSizes: (prop_types_default()).array.isRequired,
      lineHeights: (prop_types_default()).array.isRequired,
      fontWeights: (prop_types_default()).object.isRequired
    }).isRequired,
    custom: (prop_types_default()).object
  }).isRequired
};
/* harmony default export */ const components_Providers = (Providers);

// EXTERNAL MODULE: ./.cache/admin/src/core/apis/index.js + 6 modules
var apis = __webpack_require__(48198);
// EXTERNAL MODULE: ./node_modules/redux/es/redux.js
var redux = __webpack_require__(14890);
;// CONCATENATED MODULE: ./.cache/admin/src/core/store/configureStore.js

const configureStore = (appMiddlewares, appReducers) => {
  let composeEnhancers = redux.compose;
  const middlewares = [];
  appMiddlewares.forEach((middleware) => {
    middlewares.push(middleware());
  });
  if (false) {}
  const store = (0,redux.createStore)(
    createReducer(appReducers, {}),
    {},
    composeEnhancers((0,redux.applyMiddleware)(...middlewares))
  );
  store.asyncReducers = {};
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(appReducers, store.asyncReducers));
  };
  return store;
};
const createReducer = (appReducers, asyncReducers) => {
  return (0,redux.combineReducers)({
    ...appReducers,
    ...asyncReducers
  });
};
/* harmony default export */ const store_configureStore = (configureStore);

// EXTERNAL MODULE: ./.cache/admin/src/core/utils/basename.js
var basename = __webpack_require__(95651);
;// CONCATENATED MODULE: ./.cache/admin/src/core/utils/createHook.js
const createHook = () => {
  const _handlers = [];
  return {
    register(fn) {
      _handlers.push(fn);
    },
    delete(handler) {
      _handlers.splice(_handlers.indexOf(handler), 1);
    },
    runWaterfall(args, store) {
      return _handlers.reduce((acc, fn) => fn(acc, store), args);
    },
    async runWaterfallAsync(args, store) {
      let result = args;
      for (const fn of _handlers) {
        result = await fn(result, store);
      }
      return result;
    },
    runSeries(...args) {
      return _handlers.map((fn) => fn(...args));
    },
    async runSeriesAsync(...args) {
      const result = [];
      for (const fn of _handlers) {
        result.push(await fn(...args));
      }
      return result;
    },
    runParallel(...args) {
      return Promise.all(
        _handlers.map((fn) => {
          return fn(...args);
        })
      );
    }
  };
};
/* harmony default export */ const utils_createHook = (createHook);

;// CONCATENATED MODULE: ./.cache/admin/src/core/utils/index.js



// EXTERNAL MODULE: ./.cache/admin/src/exposedHooks.js
var exposedHooks = __webpack_require__(85338);
;// CONCATENATED MODULE: ./.cache/admin/src/favicon.png
const favicon_namespaceObject = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAXVBMVEUAAABIRP9IRP9IRP9IRP9IRP9IRP9IRP9IRP9IRP9IRP9IRP9IRP9IRP9IRP9JRf9IRf9IRP5IRP5JRP9JRf////+Vk/+zsv++vf9mY/9taf9/fP+Jh//c3P9RTf/Ibar2AAAAFHRSTlMA/MJX+fPt48cahaff1dMaGqcahSpTPmAAAAEvSURBVFjD7dfNTsMwEATgXcf5cdKEtixtcYH3f0xEibIguba1g8Slc+58iqUedmhNaMbJzX3Xema5G2bfdv3iprE50s80g7Yqw0Oz1Z+cmOL2a38nxuy+BSfmuNv7BUhDRAMCDESBEYCDvsD6hmcMGGnCgIkcBjhaMGCmHgN66jCgoxYDWvIY4IkxgHFAkrmeU7kmfpkG4uUllXMtEE82QPs2QPs2QPs2QPs2QPsAoH0DoH0LoH0QeN3ydtnyXg38ok76MQ/gAfwf8JH8V18LQOljomBAFAyIkga4CGT7XAtEuQf4IpDri6e2BoiZA6OrAGLuxOnLQMweWXMRyPVlwQ/NAwZMNGLACJ/76ODYo5MHHl3o7EOHZ6BbjtbpG/5kfOv8P7ilbv7PX/M/rMVPqrI3XI3nd3sAAAAASUVORK5CYII=";
;// CONCATENATED MODULE: ./.cache/admin/src/injectionZones.js
const injectionZones = {
  admin: {
    // Temporary injection zone, support for the react-tour plugin in foodadvisor
    tutorials: {
      links: []
    }
  },
  contentManager: {
    editView: { informations: [], "right-links": [] },
    listView: {
      actions: [],
      deleteModalAdditionalInfos: [],
      publishModalAdditionalInfos: [],
      unpublishModalAdditionalInfos: []
    }
  }
};
/* harmony default export */ const src_injectionZones = (injectionZones);

// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Main/SkipToContent.mjs
var SkipToContent = __webpack_require__(47754);
// EXTERNAL MODULE: ./node_modules/react-router/esm/react-router.js
var react_router = __webpack_require__(16550);
;// CONCATENATED MODULE: ./.cache/admin/src/components/PrivateRoute.tsx



const PrivateRoute = ({
  component: Component,
  path,
  ...rest
}) => {
  const { pathname, search } = (0,react_router/* useLocation */.TH)();
  return /* @__PURE__ */ (0,jsx_runtime.jsx)(
    react_router/* Route */.AW,
    {
      path,
      render: (props) => dist/* auth */.I8.getToken() !== null ? /* @__PURE__ */ (0,jsx_runtime.jsx)(Component, { ...rest, ...props }) : /* @__PURE__ */ (0,jsx_runtime.jsx)(
        react_router/* Redirect */.l_,
        {
          to: {
            pathname: "/auth/login",
            search: pathname !== "/" ? `?redirectTo=${encodeURIComponent(`${pathname}${search}`)}` : void 0
          }
        }
      )
    }
  );
};


;// CONCATENATED MODULE: ./.cache/admin/src/constants.js
const ADMIN_PERMISSIONS_CE = {
  contentManager: {
    main: [],
    collectionTypesConfigurations: [
      {
        action: "plugin::content-manager.collection-types.configure-view",
        subject: null
      }
    ],
    componentsConfigurations: [
      {
        action: "plugin::content-manager.components.configure-layout",
        subject: null
      }
    ],
    singleTypesConfigurations: [
      {
        action: "plugin::content-manager.single-types.configure-view",
        subject: null
      }
    ]
  },
  marketplace: {
    main: [{ action: "admin::marketplace.read", subject: null }],
    read: [{ action: "admin::marketplace.read", subject: null }]
  },
  settings: {
    roles: {
      main: [
        { action: "admin::roles.create", subject: null },
        { action: "admin::roles.update", subject: null },
        { action: "admin::roles.read", subject: null },
        { action: "admin::roles.delete", subject: null }
      ],
      create: [{ action: "admin::roles.create", subject: null }],
      delete: [{ action: "admin::roles.delete", subject: null }],
      read: [{ action: "admin::roles.read", subject: null }],
      update: [{ action: "admin::roles.update", subject: null }]
    },
    users: {
      main: [
        { action: "admin::users.create", subject: null },
        { action: "admin::users.read", subject: null },
        { action: "admin::users.update", subject: null },
        { action: "admin::users.delete", subject: null }
      ],
      create: [{ action: "admin::users.create", subject: null }],
      delete: [{ action: "admin::users.delete", subject: null }],
      read: [{ action: "admin::users.read", subject: null }],
      update: [{ action: "admin::users.update", subject: null }]
    },
    webhooks: {
      main: [
        { action: "admin::webhooks.create", subject: null },
        { action: "admin::webhooks.read", subject: null },
        { action: "admin::webhooks.update", subject: null },
        { action: "admin::webhooks.delete", subject: null }
      ],
      create: [{ action: "admin::webhooks.create", subject: null }],
      delete: [{ action: "admin::webhooks.delete", subject: null }],
      read: [
        { action: "admin::webhooks.read", subject: null },
        // NOTE: We need to check with the API
        { action: "admin::webhooks.update", subject: null },
        { action: "admin::webhooks.delete", subject: null }
      ],
      update: [{ action: "admin::webhooks.update", subject: null }]
    },
    "api-tokens": {
      main: [{ action: "admin::api-tokens.access", subject: null }],
      create: [{ action: "admin::api-tokens.create", subject: null }],
      delete: [{ action: "admin::api-tokens.delete", subject: null }],
      read: [{ action: "admin::api-tokens.read", subject: null }],
      update: [{ action: "admin::api-tokens.update", subject: null }],
      regenerate: [{ action: "admin::api-tokens.regenerate", subject: null }]
    },
    "transfer-tokens": {
      main: [{ action: "admin::transfer.tokens.access", subject: null }],
      create: [{ action: "admin::transfer.tokens.create", subject: null }],
      delete: [{ action: "admin::transfer.tokens.delete", subject: null }],
      read: [{ action: "admin::transfer.tokens.read", subject: null }],
      update: [{ action: "admin::transfer.tokens.update", subject: null }],
      regenerate: [{ action: "admin::transfer.tokens.regenerate", subject: null }]
    },
    "project-settings": {
      read: [{ action: "admin::project-settings.read", subject: null }],
      update: [{ action: "admin::project-settings.update", subject: null }]
    }
  }
};

// EXTERNAL MODULE: ./.cache/admin/src/hooks/useConfiguration.ts
var useConfiguration = __webpack_require__(83171);
// EXTERNAL MODULE: ./.cache/admin/src/hooks/useEnterprise.ts
var useEnterprise = __webpack_require__(48232);
// EXTERNAL MODULE: ./.cache/admin/src/utils/index.js + 4 modules
var utils = __webpack_require__(96854);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 40 modules
var axios = __webpack_require__(52861);
// EXTERNAL MODULE: ./node_modules/lodash/camelCase.js
var camelCase = __webpack_require__(68929);
var camelCase_default = /*#__PURE__*/__webpack_require__.n(camelCase);
// EXTERNAL MODULE: ./node_modules/lodash/omit.js
var omit = __webpack_require__(57557);
var omit_default = /*#__PURE__*/__webpack_require__.n(omit);
// EXTERNAL MODULE: ./.cache/admin/src/utils/formatAPIErrors.js
var formatAPIErrors = __webpack_require__(26779);
// EXTERNAL MODULE: ./.cache/admin/src/layouts/UnauthenticatedLayout/index.js + 1 modules
var UnauthenticatedLayout = __webpack_require__(50745);
// EXTERNAL MODULE: ./.cache/admin/src/pages/AuthPage/components/Login/BaseLogin.js
var BaseLogin = __webpack_require__(31640);
;// CONCATENATED MODULE: ./.cache/admin/src/pages/AuthPage/components/Login/index.js




const LoginCE = (loginProps) => {
  return /* @__PURE__ */ react.createElement(UnauthenticatedLayout/* default */.ZP, null, /* @__PURE__ */ react.createElement(BaseLogin/* default */.Z, { ...loginProps }));
};
LoginCE.defaultProps = {
  onSubmit: (e) => e.preventDefault()
};
LoginCE.propTypes = {
  onSubmit: (prop_types_default()).func
};

// EXTERNAL MODULE: ./node_modules/yup/es/index.js + 26 modules
var yup_es = __webpack_require__(87561);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Main/Main.mjs
var Main = __webpack_require__(40720);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Box/Box.mjs
var Box = __webpack_require__(16607);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.mjs + 2 modules
var Typography = __webpack_require__(10574);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Flex/Flex.mjs
var Flex = __webpack_require__(96987);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/TextInput/TextInput.mjs
var TextInput = __webpack_require__(38670);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Button/Button.mjs
var Button = __webpack_require__(12473);
// EXTERNAL MODULE: ./node_modules/formik/dist/formik.esm.js + 121 modules
var formik_esm = __webpack_require__(41054);
// EXTERNAL MODULE: ./.cache/admin/src/components/UnauthenticatedLogo.tsx
var UnauthenticatedLogo = __webpack_require__(43847);
;// CONCATENATED MODULE: ./.cache/admin/src/pages/AuthPage/components/ForgotPassword/index.js








const ForgotPassword = ({ onSubmit, schema }) => {
  const { formatMessage } = (0,useIntl/* default */.Z)();
  return /* @__PURE__ */ react.createElement(UnauthenticatedLayout/* default */.ZP, null, /* @__PURE__ */ react.createElement(Main/* Main */.o, null, /* @__PURE__ */ react.createElement(UnauthenticatedLayout/* LayoutContent */.bU, null, /* @__PURE__ */ react.createElement(
    formik_esm/* Formik */.J9,
    {
      enableReinitialize: true,
      initialValues: {
        email: ""
      },
      onSubmit,
      validationSchema: schema,
      validateOnChange: false
    },
    ({ values, errors, handleChange }) => /* @__PURE__ */ react.createElement(dist/* Form */.l0, { noValidate: true }, /* @__PURE__ */ react.createElement(UnauthenticatedLayout/* Column */.sg, null, /* @__PURE__ */ react.createElement(UnauthenticatedLogo/* Logo */.T, null), /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingTop: 6, paddingBottom: 7 }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { as: "h1", variant: "alpha" }, formatMessage({
      id: "Auth.form.button.password-recovery",
      defaultMessage: "Password Recovery"
    }))), errors.errorMessage && /* @__PURE__ */ react.createElement(
      Typography/* Typography */.Z,
      {
        id: "global-form-error",
        role: "alert",
        tabIndex: -1,
        textColor: "danger600"
      },
      formatMessage({
        id: errors.errorMessage,
        defaultMessage: "An error occurred"
      })
    )), /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { direction: "column", alignItems: "stretch", gap: 6 }, /* @__PURE__ */ react.createElement(
      TextInput/* TextInput */.o,
      {
        error: errors.email ? formatMessage({
          id: errors.email,
          defaultMessage: "This email is invalid."
        }) : "",
        value: values.email,
        onChange: handleChange,
        label: formatMessage({ id: "Auth.form.email.label", defaultMessage: "Email" }),
        placeholder: formatMessage({
          id: "Auth.form.email.placeholder",
          defaultMessage: "kai@doe.com"
        }),
        name: "email",
        required: true
      }
    ), /* @__PURE__ */ react.createElement(Button/* Button */.z, { type: "submit", fullWidth: true }, formatMessage({
      id: "Auth.form.button.forgot-password",
      defaultMessage: "Send Email"
    }))))
  )), /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { justifyContent: "center" }, /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingTop: 4 }, /* @__PURE__ */ react.createElement(dist/* Link */.rU, { to: "/auth/login" }, formatMessage({ id: "Auth.link.ready", defaultMessage: "Ready to sign in?" }))))));
};
ForgotPassword.defaultProps = {
  onSubmit: (e) => e.preventDefault()
};
ForgotPassword.propTypes = {
  onSubmit: (prop_types_default()).func,
  schema: prop_types_default().shape({
    type: (prop_types_default()).string.isRequired
  }).isRequired
};
/* harmony default export */ const components_ForgotPassword = (ForgotPassword);

;// CONCATENATED MODULE: ./.cache/admin/src/pages/AuthPage/components/ForgotPasswordSuccess/index.js






const ForgotPasswordSuccess = () => {
  const { formatMessage } = (0,useIntl/* default */.Z)();
  return /* @__PURE__ */ react.createElement(UnauthenticatedLayout/* default */.ZP, null, /* @__PURE__ */ react.createElement(Main/* Main */.o, null, /* @__PURE__ */ react.createElement(UnauthenticatedLayout/* LayoutContent */.bU, null, /* @__PURE__ */ react.createElement(UnauthenticatedLayout/* Column */.sg, null, /* @__PURE__ */ react.createElement(UnauthenticatedLogo/* Logo */.T, null), /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingTop: 6, paddingBottom: 7 }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { as: "h1", variant: "alpha" }, formatMessage({
    id: "app.containers.AuthPage.ForgotPasswordSuccess.title",
    defaultMessage: "Email sent"
  }))), /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, null, formatMessage({
    id: "app.containers.AuthPage.ForgotPasswordSuccess.text.email",
    defaultMessage: "It can take a few minutes to receive your password recovery link."
  })), /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingTop: 4 }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, null, formatMessage({
    id: "app.containers.AuthPage.ForgotPasswordSuccess.text.contact-admin",
    defaultMessage: "If you do not receive this link, please contact your administrator."
  }))))), /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { justifyContent: "center" }, /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingTop: 4 }, /* @__PURE__ */ react.createElement(dist/* Link */.rU, { to: "/auth/login" }, formatMessage({ id: "Auth.link.signin", defaultMessage: "Sign in" }))))));
};
/* harmony default export */ const components_ForgotPasswordSuccess = (ForgotPasswordSuccess);

;// CONCATENATED MODULE: ./.cache/admin/src/pages/AuthPage/components/Oops/index.js






const Oops = () => {
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const query = (0,dist/* useQuery */.aM)();
  const message = query.get("info") || formatMessage({
    id: "Auth.components.Oops.text",
    defaultMessage: "Your account has been suspended."
  });
  return /* @__PURE__ */ react.createElement(UnauthenticatedLayout/* default */.ZP, null, /* @__PURE__ */ react.createElement(Main/* Main */.o, null, /* @__PURE__ */ react.createElement(UnauthenticatedLayout/* LayoutContent */.bU, null, /* @__PURE__ */ react.createElement(UnauthenticatedLayout/* Column */.sg, null, /* @__PURE__ */ react.createElement(UnauthenticatedLogo/* Logo */.T, null), /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingTop: 6, paddingBottom: 7 }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { as: "h1", variant: "alpha" }, formatMessage({ id: "Auth.components.Oops.title", defaultMessage: "Oops..." }))), /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, null, message), /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingTop: 4 }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, null, formatMessage({
    id: "Auth.components.Oops.text.admin",
    defaultMessage: "If this is a mistake, please contact your administrator."
  }))))), /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { justifyContent: "center" }, /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingTop: 4 }, /* @__PURE__ */ react.createElement(dist/* Link */.rU, { to: "/auth/login" }, formatMessage({ id: "Auth.link.signin", defaultMessage: "Sign in" }))))));
};
/* harmony default export */ const components_Oops = (Oops);

// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Grid/Grid.mjs
var Grid = __webpack_require__(31988);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Grid/GridItem.mjs
var GridItem = __webpack_require__(6498);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Checkbox/Checkbox.mjs
var Checkbox = __webpack_require__(22546);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/Eye.mjs
var Eye = __webpack_require__(81851);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/EyeStriked.mjs
var EyeStriked = __webpack_require__(92795);
// EXTERNAL MODULE: ./.cache/admin/src/components/NpsSurvey.tsx
var NpsSurvey = __webpack_require__(19097);
// EXTERNAL MODULE: ./.cache/admin/src/pages/AuthPage/components/FieldActionWrapper/index.js
var FieldActionWrapper = __webpack_require__(91458);
;// CONCATENATED MODULE: ./.cache/admin/src/pages/AuthPage/components/Register/index.js















const A = styled_components_browser_esm["default"].a`
  color: ${({ theme }) => theme.colors.primary600};
`;
const PasswordInput = (0,styled_components_browser_esm["default"])((0,TextInput/* TextInput */.o))`
  ::-ms-reveal {
    display: none;
  }
`;
const Register = ({ authType, fieldsToDisable, noSignin, onSubmit, schema }) => {
  const toggleNotification = (0,dist/* useNotification */.lm)();
  const { push } = (0,react_router/* useHistory */.k6)();
  const [passwordShown, setPasswordShown] = (0,react.useState)(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = (0,react.useState)(false);
  const [submitCount, setSubmitCount] = (0,react.useState)(0);
  const { trackUsage } = (0,dist/* useTracking */.rS)();
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const query = (0,dist/* useQuery */.aM)();
  const { formatAPIError } = (0,dist/* useAPIErrorHandler */.So)();
  const { get } = (0,dist/* useFetchClient */.kY)();
  const { setNpsSurveySettings } = (0,NpsSurvey/* useNpsSurveySettings */.$)();
  const registrationToken = query.get("registrationToken");
  const { data: userInfo } = (0,es.useQuery)({
    queryKey: ["admin", "registration-info", registrationToken],
    async queryFn() {
      const {
        data: { data }
      } = await get(`/admin/registration-info`, {
        params: {
          registrationToken
        }
      });
      return data;
    },
    enabled: !!registrationToken,
    initialData: {},
    onError(err) {
      const message = formatAPIError(err);
      toggleNotification({
        type: "warning",
        message
      });
      push(`/auth/oops?info=${encodeURIComponent(message)}`);
    }
  });
  function normalizeData(data) {
    return Object.entries(data).reduce((acc, [key, value]) => {
      let normalizedvalue = value;
      if (!["password", "confirmPassword"].includes(key) && typeof value === "string") {
        normalizedvalue = normalizedvalue.trim();
        if (key === "lastname") {
          normalizedvalue = normalizedvalue || null;
        }
      }
      acc[key] = normalizedvalue;
      return acc;
    }, {});
  }
  return /* @__PURE__ */ react.createElement(UnauthenticatedLayout/* default */.ZP, null, /* @__PURE__ */ react.createElement(UnauthenticatedLayout/* LayoutContent */.bU, null, /* @__PURE__ */ react.createElement(
    formik_esm/* Formik */.J9,
    {
      enableReinitialize: true,
      initialValues: {
        firstname: userInfo.firstname || "",
        lastname: userInfo.lastname || "",
        email: userInfo.email || "",
        password: "",
        confirmPassword: "",
        registrationToken: registrationToken || void 0,
        news: false
      },
      onSubmit: async (data, formik) => {
        const normalizedData = normalizeData(data);
        try {
          await schema.validate(normalizedData, { abortEarly: false });
          if (submitCount > 0 && authType === "register-admin") {
            trackUsage("didSubmitWithErrorsFirstAdmin", { count: submitCount.toString() });
          }
          if (registrationToken) {
            onSubmit(
              { userInfo: omit_default()(normalizedData, ["registrationToken"]), registrationToken },
              formik
            );
          } else {
            onSubmit(normalizedData, formik);
          }
          setNpsSurveySettings({ enabled: data.news });
        } catch (err) {
          const errors = (0,dist/* getYupInnerErrors */.CJ)(err);
          setSubmitCount(submitCount + 1);
          formik.setErrors(errors);
        }
      },
      validateOnChange: false
    },
    ({ values, errors, handleChange }) => {
      return /* @__PURE__ */ react.createElement(dist/* Form */.l0, { noValidate: true }, /* @__PURE__ */ react.createElement(Main/* Main */.o, null, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { direction: "column", alignItems: "center", gap: 3 }, /* @__PURE__ */ react.createElement(UnauthenticatedLogo/* Logo */.T, null), /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { as: "h1", variant: "alpha", textAlign: "center" }, formatMessage({
        id: "Auth.form.welcome.title",
        defaultMessage: "Welcome to Strapi!"
      })), /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "epsilon", textColor: "neutral600", textAlign: "center" }, formatMessage({
        id: "Auth.form.register.subtitle",
        defaultMessage: "Credentials are only used to authenticate in Strapi. All saved data will be stored in your database."
      }))), /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { direction: "column", alignItems: "stretch", gap: 6, marginTop: 7 }, /* @__PURE__ */ react.createElement(Grid/* Grid */.r, { gap: 4 }, /* @__PURE__ */ react.createElement(GridItem/* GridItem */.P, { col: 6 }, /* @__PURE__ */ react.createElement(
        TextInput/* TextInput */.o,
        {
          name: "firstname",
          required: true,
          value: values.firstname,
          error: errors.firstname ? formatMessage(errors.firstname) : void 0,
          onChange: handleChange,
          label: formatMessage({
            id: "Auth.form.firstname.label",
            defaultMessage: "Firstname"
          })
        }
      )), /* @__PURE__ */ react.createElement(GridItem/* GridItem */.P, { col: 6 }, /* @__PURE__ */ react.createElement(
        TextInput/* TextInput */.o,
        {
          name: "lastname",
          value: values.lastname,
          onChange: handleChange,
          label: formatMessage({
            id: "Auth.form.lastname.label",
            defaultMessage: "Lastname"
          })
        }
      ))), /* @__PURE__ */ react.createElement(
        TextInput/* TextInput */.o,
        {
          name: "email",
          disabled: fieldsToDisable.includes("email"),
          value: values.email,
          onChange: handleChange,
          error: errors.email ? formatMessage(errors.email) : void 0,
          required: true,
          label: formatMessage({
            id: "Auth.form.email.label",
            defaultMessage: "Email"
          }),
          type: "email"
        }
      ), /* @__PURE__ */ react.createElement(
        PasswordInput,
        {
          name: "password",
          onChange: handleChange,
          value: values.password,
          error: errors.password ? formatMessage(errors.password) : void 0,
          endAction: /* @__PURE__ */ react.createElement(
            FieldActionWrapper/* default */.Z,
            {
              onClick: (e) => {
                e.preventDefault();
                setPasswordShown((prev) => !prev);
              },
              label: formatMessage(
                passwordShown ? {
                  id: "Auth.form.password.show-password",
                  defaultMessage: "Show password"
                } : {
                  id: "Auth.form.password.hide-password",
                  defaultMessage: "Hide password"
                }
              )
            },
            passwordShown ? /* @__PURE__ */ react.createElement(Eye/* default */.Z, null) : /* @__PURE__ */ react.createElement(EyeStriked/* default */.Z, null)
          ),
          hint: formatMessage({
            id: "Auth.form.password.hint",
            defaultMessage: "Must be at least 8 characters, 1 uppercase, 1 lowercase & 1 number"
          }),
          required: true,
          label: formatMessage({
            id: "global.password",
            defaultMessage: "Password"
          }),
          type: passwordShown ? "text" : "password"
        }
      ), /* @__PURE__ */ react.createElement(
        PasswordInput,
        {
          name: "confirmPassword",
          onChange: handleChange,
          value: values.confirmPassword,
          error: errors.confirmPassword ? formatMessage(errors.confirmPassword) : void 0,
          endAction: /* @__PURE__ */ react.createElement(
            FieldActionWrapper/* default */.Z,
            {
              onClick: (e) => {
                e.preventDefault();
                setConfirmPasswordShown((prev) => !prev);
              },
              label: formatMessage(
                confirmPasswordShown ? {
                  id: "Auth.form.password.show-password",
                  defaultMessage: "Show password"
                } : {
                  id: "Auth.form.password.hide-password",
                  defaultMessage: "Hide password"
                }
              )
            },
            confirmPasswordShown ? /* @__PURE__ */ react.createElement(Eye/* default */.Z, null) : /* @__PURE__ */ react.createElement(EyeStriked/* default */.Z, null)
          ),
          required: true,
          label: formatMessage({
            id: "Auth.form.confirmPassword.label",
            defaultMessage: "Confirm Password"
          }),
          type: confirmPasswordShown ? "text" : "password"
        }
      ), /* @__PURE__ */ react.createElement(
        Checkbox/* Checkbox */.X,
        {
          onValueChange: (checked) => {
            handleChange({ target: { value: checked, name: "news" } });
          },
          value: values.news,
          name: "news",
          "aria-label": "news"
        },
        formatMessage(
          {
            id: "Auth.form.register.news.label",
            defaultMessage: "Keep me updated about new features & upcoming improvements (by doing this you accept the {terms} and the {policy})."
          },
          {
            terms: /* @__PURE__ */ react.createElement(A, { target: "_blank", href: "https://strapi.io/terms", rel: "noreferrer" }, formatMessage({
              id: "Auth.privacy-policy-agreement.terms",
              defaultMessage: "terms"
            })),
            policy: /* @__PURE__ */ react.createElement(A, { target: "_blank", href: "https://strapi.io/privacy", rel: "noreferrer" }, formatMessage({
              id: "Auth.privacy-policy-agreement.policy",
              defaultMessage: "policy"
            }))
          }
        )
      ), /* @__PURE__ */ react.createElement(Button/* Button */.z, { fullWidth: true, size: "L", type: "submit" }, formatMessage({
        id: "Auth.form.button.register",
        defaultMessage: "Let's start"
      })))));
    }
  ), !noSignin && /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingTop: 4 }, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { justifyContent: "center" }, /* @__PURE__ */ react.createElement(dist/* Link */.rU, { label: "Auth.link.signin", to: "/auth/login" }, formatMessage({
    id: "Auth.link.signin.account",
    defaultMessage: "Already have an account?"
  }))))));
};
Register.defaultProps = {
  fieldsToDisable: [],
  noSignin: false,
  onSubmit: (e) => e.preventDefault()
};
Register.propTypes = {
  authType: (prop_types_default()).string.isRequired,
  fieldsToDisable: (prop_types_default()).array,
  noSignin: (prop_types_default()).bool,
  onSubmit: (prop_types_default()).func,
  schema: prop_types_default().shape({
    validate: (prop_types_default()).func.isRequired,
    type: (prop_types_default()).string.isRequired
  }).isRequired
};
/* harmony default export */ const components_Register = (Register);

;// CONCATENATED MODULE: ./.cache/admin/src/pages/AuthPage/components/ResetPassword/index.js











const ResetPassword_PasswordInput = (0,styled_components_browser_esm["default"])((0,TextInput/* TextInput */.o))`
  ::-ms-reveal {
    display: none;
  }
`;
const ResetPassword_ForgotPassword = ({ onSubmit, schema }) => {
  const [passwordShown, setPasswordShown] = (0,react.useState)(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = (0,react.useState)(false);
  const { formatMessage } = (0,useIntl/* default */.Z)();
  return /* @__PURE__ */ react.createElement(UnauthenticatedLayout/* default */.ZP, null, /* @__PURE__ */ react.createElement(Main/* Main */.o, null, /* @__PURE__ */ react.createElement(UnauthenticatedLayout/* LayoutContent */.bU, null, /* @__PURE__ */ react.createElement(
    formik_esm/* Formik */.J9,
    {
      enableReinitialize: true,
      initialValues: {
        password: "",
        confirmPassword: ""
      },
      onSubmit,
      validationSchema: schema,
      validateOnChange: false
    },
    ({ values, errors, handleChange }) => /* @__PURE__ */ react.createElement(dist/* Form */.l0, { noValidate: true }, /* @__PURE__ */ react.createElement(UnauthenticatedLayout/* Column */.sg, null, /* @__PURE__ */ react.createElement(UnauthenticatedLogo/* Logo */.T, null), /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingTop: 6, paddingBottom: 7 }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { as: "h1", variant: "alpha" }, formatMessage({
      id: "global.reset-password",
      defaultMessage: "Reset password"
    }))), errors.errorMessage && /* @__PURE__ */ react.createElement(
      Typography/* Typography */.Z,
      {
        id: "global-form-error",
        role: "alert",
        tabIndex: -1,
        textColor: "danger600"
      },
      formatMessage({
        id: errors.errorMessage,
        defaultMessage: "An error occurred"
      })
    )), /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { direction: "column", alignItems: "stretch", gap: 6 }, /* @__PURE__ */ react.createElement(
      ResetPassword_PasswordInput,
      {
        name: "password",
        onChange: handleChange,
        value: values.password,
        error: errors.password ? formatMessage({
          id: errors.password,
          defaultMessage: "This field is required."
        }) : void 0,
        endAction: /* @__PURE__ */ react.createElement(
          FieldActionWrapper/* default */.Z,
          {
            onClick: (e) => {
              e.preventDefault();
              setPasswordShown((prev) => !prev);
            },
            label: formatMessage(
              passwordShown ? {
                id: "Auth.form.password.show-password",
                defaultMessage: "Show password"
              } : {
                id: "Auth.form.password.hide-password",
                defaultMessage: "Hide password"
              }
            )
          },
          passwordShown ? /* @__PURE__ */ react.createElement(Eye/* default */.Z, null) : /* @__PURE__ */ react.createElement(EyeStriked/* default */.Z, null)
        ),
        hint: formatMessage({
          id: "Auth.form.password.hint",
          defaultMessage: "Password must contain at least 8 characters, 1 uppercase, 1 lowercase and 1 number"
        }),
        required: true,
        label: formatMessage({
          id: "global.password",
          defaultMessage: "Password"
        }),
        type: passwordShown ? "text" : "password"
      }
    ), /* @__PURE__ */ react.createElement(
      ResetPassword_PasswordInput,
      {
        name: "confirmPassword",
        onChange: handleChange,
        value: values.confirmPassword,
        error: errors.confirmPassword ? formatMessage({
          id: errors.confirmPassword,
          defaultMessage: "This value is required."
        }) : void 0,
        endAction: /* @__PURE__ */ react.createElement(
          FieldActionWrapper/* default */.Z,
          {
            onClick: (e) => {
              e.preventDefault();
              setConfirmPasswordShown((prev) => !prev);
            },
            label: formatMessage(
              passwordShown ? {
                id: "Auth.form.password.show-password",
                defaultMessage: "Show password"
              } : {
                id: "Auth.form.password.hide-password",
                defaultMessage: "Hide password"
              }
            )
          },
          confirmPasswordShown ? /* @__PURE__ */ react.createElement(Eye/* default */.Z, null) : /* @__PURE__ */ react.createElement(EyeStriked/* default */.Z, null)
        ),
        required: true,
        label: formatMessage({
          id: "Auth.form.confirmPassword.label",
          defaultMessage: "Confirm Password"
        }),
        type: confirmPasswordShown ? "text" : "password"
      }
    ), /* @__PURE__ */ react.createElement(Button/* Button */.z, { fullwidth: true, type: "submit" }, formatMessage({
      id: "global.change-password",
      defaultMessage: "Change password"
    }))))
  )), /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { justifyContent: "center" }, /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingTop: 4 }, /* @__PURE__ */ react.createElement(dist/* Link */.rU, { to: "/auth/login" }, formatMessage({ id: "Auth.link.ready", defaultMessage: "Ready to sign in?" }))))));
};
ResetPassword_ForgotPassword.defaultProps = {
  onSubmit: (e) => e.preventDefault()
};
ResetPassword_ForgotPassword.propTypes = {
  onSubmit: (prop_types_default()).func,
  schema: prop_types_default().shape({
    type: (prop_types_default()).string.isRequired
  }).isRequired
};
/* harmony default export */ const ResetPassword = (ResetPassword_ForgotPassword);

;// CONCATENATED MODULE: ./.cache/admin/src/pages/AuthPage/constants.js







const FORMS = {
  "forgot-password": {
    Component: components_ForgotPassword,
    endPoint: "forgot-password",
    fieldsToDisable: [],
    fieldsToOmit: [],
    schema: yup_es/* object */.Ry().shape({
      email: yup_es/* string */.Z_().email(dist/* translatedErrors */.I0.email).required(dist/* translatedErrors */.I0.required)
    }),
    inputsPrefix: ""
  },
  "forgot-password-success": {
    Component: components_ForgotPasswordSuccess,
    endPoint: "",
    fieldsToDisable: [],
    fieldsToOmit: [],
    schema: null,
    inputsPrefix: ""
  },
  // the `Component` attribute is set after all forms and CE/EE components are loaded, but since we
  // are here outside of a React component we can not use the hook directly
  login: {
    endPoint: "login",
    fieldsToDisable: [],
    fieldsToOmit: ["rememberMe"],
    schema: yup_es/* object */.Ry().shape({
      email: yup_es/* string */.Z_().email(dist/* translatedErrors */.I0.email).required(dist/* translatedErrors */.I0.required),
      password: yup_es/* string */.Z_().required(dist/* translatedErrors */.I0.required),
      rememberMe: yup_es/* bool */.Xg().nullable()
    }),
    inputsPrefix: ""
  },
  oops: {
    Component: components_Oops,
    endPoint: null,
    fieldsToDisable: [],
    fieldsToOmit: [],
    schema: null,
    inputsPrefix: ""
  },
  register: {
    Component: components_Register,
    endPoint: "register",
    fieldsToDisable: ["email"],
    fieldsToOmit: ["userInfo.confirmPassword", "userInfo.news", "userInfo.email"],
    schema: yup_es/* object */.Ry().shape({
      firstname: yup_es/* string */.Z_().trim().required(dist/* translatedErrors */.I0.required),
      lastname: yup_es/* string */.Z_().nullable(),
      password: yup_es/* string */.Z_().min(8, dist/* translatedErrors */.I0.minLength).matches(/[a-z]/, "components.Input.error.contain.lowercase").matches(/[A-Z]/, "components.Input.error.contain.uppercase").matches(/\d/, "components.Input.error.contain.number").required(dist/* translatedErrors */.I0.required),
      confirmPassword: yup_es/* string */.Z_().oneOf([yup_es/* ref */.iH("password"), null], "components.Input.error.password.noMatch").required(dist/* translatedErrors */.I0.required),
      registrationToken: yup_es/* string */.Z_().required(dist/* translatedErrors */.I0.required)
    }),
    inputsPrefix: "userInfo."
  },
  "register-admin": {
    Component: components_Register,
    endPoint: "register-admin",
    noSignin: true,
    fieldsToDisable: [],
    fieldsToOmit: ["confirmPassword", "news"],
    schema: yup_es/* object */.Ry().shape({
      firstname: yup_es/* string */.Z_().trim().required(dist/* translatedErrors */.I0.required),
      lastname: yup_es/* string */.Z_().nullable(),
      password: yup_es/* string */.Z_().min(8, dist/* translatedErrors */.I0.minLength).matches(/[a-z]/, "components.Input.error.contain.lowercase").matches(/[A-Z]/, "components.Input.error.contain.uppercase").matches(/\d/, "components.Input.error.contain.number").required(dist/* translatedErrors */.I0.required),
      email: yup_es/* string */.Z_().email(dist/* translatedErrors */.I0.email).strict().lowercase(dist/* translatedErrors */.I0.lowercase).required(dist/* translatedErrors */.I0.required),
      confirmPassword: yup_es/* string */.Z_().oneOf([yup_es/* ref */.iH("password"), null], "components.Input.error.password.noMatch").required(dist/* translatedErrors */.I0.required)
    }),
    inputsPrefix: ""
  },
  "reset-password": {
    Component: ResetPassword,
    endPoint: "reset-password",
    fieldsToDisable: [],
    fieldsToOmit: ["confirmPassword"],
    schema: yup_es/* object */.Ry().shape({
      password: yup_es/* string */.Z_().min(8, dist/* translatedErrors */.I0.minLength).matches(/[a-z]/, "components.Input.error.contain.lowercase").matches(/[A-Z]/, "components.Input.error.contain.uppercase").matches(/\d/, "components.Input.error.contain.number").required(dist/* translatedErrors */.I0.required),
      confirmPassword: yup_es/* string */.Z_().oneOf([yup_es/* ref */.iH("password"), null], "components.Input.error.password.noMatch").required(dist/* translatedErrors */.I0.required)
    })
  }
};

;// CONCATENATED MODULE: ./.cache/admin/src/pages/AuthPage/init.js
const init_init = (initialState) => {
  return initialState;
};
/* harmony default export */ const AuthPage_init = (init_init);

;// CONCATENATED MODULE: ./.cache/admin/src/pages/AuthPage/reducer.js


const reducer_initialState = {
  formErrors: {},
  modifiedData: {},
  requestError: null
};
const reducer_reducer = (state, action) => (0,immer_esm/* default */.ZP)(state, (draftState) => {
  switch (action.type) {
    case "ON_CHANGE": {
      set_default()(draftState.modifiedData, action.keys.split("."), action.value);
      break;
    }
    case "RESET_PROPS": {
      return reducer_initialState;
    }
    case "SET_DATA": {
      draftState.modifiedData = action.data;
      break;
    }
    case "SET_ERRORS": {
      draftState.formErrors = action.errors;
      break;
    }
    case "SET_REQUEST_ERROR": {
      draftState.requestError = {
        errorMessage: action.errorMessage,
        errorStatus: action.errorStatus
      };
      break;
    }
    default:
      return draftState;
  }
});


;// CONCATENATED MODULE: ./.cache/admin/src/pages/AuthPage/index.js
















const AuthPage = ({ hasAdmin, setHasAdmin }) => {
  const {
    push,
    location: { search }
  } = (0,react_router/* useHistory */.k6)();
  const { changeLocale } = (0,LanguageProvider/* useLocales */.nt)();
  const { setSkipped } = (0,dist/* useGuidedTour */.c1)();
  const { trackUsage } = (0,dist/* useTracking */.rS)();
  const {
    params: { authType }
  } = (0,react_router/* useRouteMatch */.$B)("/auth/:authType");
  const query = (0,dist/* useQuery */.aM)();
  const Login = (0,useEnterprise/* useEnterprise */.c)(
    LoginCE,
    async () => (await __webpack_require__.e(/* import() */ 6394).then(__webpack_require__.bind(__webpack_require__, 76394))).LoginEE
  );
  const forms = (0,useEnterprise/* useEnterprise */.c)(
    FORMS,
    async () => (await __webpack_require__.e(/* import() */ 2501).then(__webpack_require__.bind(__webpack_require__, 52501))).FORMS,
    {
      combine(ceForms, eeForms) {
        return {
          ...ceForms,
          ...eeForms
        };
      },
      defaultValue: FORMS
    }
  );
  const [{ formErrors, modifiedData, requestError }, dispatch] = (0,react.useReducer)(
    reducer_reducer,
    reducer_initialState,
    AuthPage_init
  );
  const CancelToken = axios["default"].CancelToken;
  const source = CancelToken.source();
  const { endPoint, fieldsToDisable, fieldsToOmit, inputsPrefix, schema, ...rest } = forms?.[authType] ?? {};
  (0,react.useEffect)(() => {
    return () => {
      source.cancel("Component unmounted");
    };
  }, []);
  const { post } = (0,dist/* useFetchClient */.kY)();
  (0,react.useEffect)(() => {
    dispatch({
      type: "RESET_PROPS"
    });
  }, [authType]);
  const handleChange = ({ target: { name, value } }) => {
    dispatch({
      type: "ON_CHANGE",
      keys: name,
      value
    });
  };
  const handleSubmit = async (e, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    const body = omit_default()(e, fieldsToOmit);
    const requestURL = `/admin/${endPoint}`;
    if (authType === "login") {
      await loginRequest(e, requestURL, { setSubmitting, setErrors });
    }
    if (authType === "register" || authType === "register-admin") {
      await registerRequest(e, requestURL, { setSubmitting, setErrors });
    }
    if (authType === "forgot-password") {
      await forgotPasswordRequest(body, requestURL, { setSubmitting, setErrors });
    }
    if (authType === "reset-password") {
      await resetPasswordRequest(body, requestURL, { setSubmitting, setErrors });
    }
  };
  const forgotPasswordRequest = async (body, requestURL, { setSubmitting, setErrors }) => {
    try {
      await post(requestURL, body, { cancelToken: source.token });
      push("/auth/forgot-password-success");
    } catch (err) {
      console.error(err);
      setErrors({ errorMessage: "notification.error" });
    } finally {
      setSubmitting(false);
    }
  };
  const loginRequest = async (body, requestURL, { setSubmitting, setErrors }) => {
    try {
      const {
        data: {
          data: { token, user }
        }
      } = await post(requestURL, omit_default()(body, fieldsToOmit), { cancelToken: source.token });
      if (user.preferedLanguage) {
        changeLocale(user.preferedLanguage);
      }
      dist/* auth */.I8.setToken(token, body.rememberMe);
      dist/* auth */.I8.setUserInfo(user, body.rememberMe);
      redirectToPreviousLocation();
    } catch (err) {
      if (err.response) {
        const errorMessage = get_default()(
          err,
          ["response", "data", "error", "message"],
          "Something went wrong"
        );
        if (camelCase_default()(errorMessage).toLowerCase() === "usernotactive") {
          push("/auth/oops");
          dispatch({
            type: "RESET_PROPS"
          });
          return;
        }
        setErrors({ errorMessage });
      }
    } finally {
      setSubmitting(false);
    }
  };
  const registerRequest = async (body, requestURL, { setSubmitting, setErrors }) => {
    try {
      trackUsage("willCreateFirstAdmin");
      const {
        data: {
          data: { token, user }
        }
      } = await post(requestURL, omit_default()(body, fieldsToOmit), { cancelToken: source.token });
      dist/* auth */.I8.setToken(token, false);
      dist/* auth */.I8.setUserInfo(user, false);
      setSubmitting(false);
      setHasAdmin(true);
      const { roles } = user;
      if (roles) {
        const isUserSuperAdmin = roles.find(({ code }) => code === "strapi-super-admin");
        if (isUserSuperAdmin) {
          utils_persistStateToLocaleStorage.setSkipped(false);
          setSkipped(false);
          trackUsage("didLaunchGuidedtour");
        }
      }
      if (authType === "register" && body.userInfo.news === true || authType === "register-admin" && body.news === true) {
        push({
          pathname: "/usecase",
          search: `?hasAdmin=${hasAdmin}`
        });
        return;
      }
      redirectToPreviousLocation();
    } catch (err) {
      trackUsage("didNotCreateFirstAdmin");
      if (err.response) {
        const { data } = err.response;
        const apiErrors = (0,formatAPIErrors/* default */.Z)(data);
        setErrors({ apiErrors });
      }
    }
  };
  const resetPasswordRequest = async (body, requestURL, { setErrors, setSubmitting }) => {
    try {
      const {
        data: {
          data: { token, user }
        }
      } = await post(
        requestURL,
        { ...body, resetPasswordToken: query.get("code") },
        { cancelToken: source.token }
      );
      dist/* auth */.I8.setToken(token, false);
      dist/* auth */.I8.setUserInfo(user, false);
      push("/");
    } catch (err) {
      if (err.response) {
        const errorMessage = get_default()(err, ["response", "data", "message"], "Something went wrong");
        const errorStatus = get_default()(err, ["response", "data", "statusCode"], 400);
        dispatch({
          type: "SET_REQUEST_ERROR",
          errorMessage,
          errorStatus
        });
        setErrors({ errorMessage });
      }
    } finally {
      setSubmitting(false);
    }
  };
  const redirectToPreviousLocation = () => {
    if (authType === "login") {
      const redirectTo = query.get("redirectTo");
      const redirectUrl = redirectTo ? decodeURIComponent(redirectTo) : "/";
      push(redirectUrl);
    } else {
      push("/");
    }
  };
  if (!forms[authType] || hasAdmin && authType === "register-admin" || dist/* auth */.I8.getToken()) {
    return /* @__PURE__ */ react.createElement(react_router/* Redirect */.l_, { to: "/" });
  }
  if (!hasAdmin && authType !== "register-admin") {
    return /* @__PURE__ */ react.createElement(
      react_router/* Redirect */.l_,
      {
        to: {
          pathname: "/auth/register-admin",
          // Forward the `?redirectTo` from /auth/login
          // /abc => /auth/login?redirectTo=%2Fabc => /auth/register-admin?redirectTo=%2Fabc
          search
        }
      }
    );
  }
  if (Login) {
    forms.login.Component = Login;
  }
  if (!Login) {
    return null;
  }
  const { Component } = forms?.[authType] ?? {};
  return /* @__PURE__ */ react.createElement(
    Component,
    {
      ...rest,
      authType,
      fieldsToDisable,
      formErrors,
      inputsPrefix,
      modifiedData,
      onChange: handleChange,
      onSubmit: handleSubmit,
      requestError,
      schema
    }
  );
};
AuthPage.defaultProps = {
  hasAdmin: false
};
AuthPage.propTypes = {
  hasAdmin: (prop_types_default()).bool,
  setHasAdmin: (prop_types_default()).func.isRequired
};
/* harmony default export */ const pages_AuthPage = (AuthPage);

// EXTERNAL MODULE: ./.cache/admin/src/pages/NotFoundPage/index.js
var NotFoundPage = __webpack_require__(23337);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Select/Select.mjs
var Select = __webpack_require__(59586);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Select/Option.mjs
var Option = __webpack_require__(40933);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/TextButton/TextButton.mjs
var TextButton = __webpack_require__(58753);
// EXTERNAL MODULE: ./node_modules/qs/lib/index.js
var lib = __webpack_require__(80129);
;// CONCATENATED MODULE: ./.cache/admin/src/pages/UseCasePage/index.js









const options = [
  {
    intlLabel: {
      id: "Usecase.front-end",
      defaultMessage: "Front-end developer"
    },
    value: "front_end_developer"
  },
  {
    intlLabel: {
      id: "Usecase.back-end",
      defaultMessage: "Back-end developer"
    },
    value: "back_end_developer"
  },
  {
    intlLabel: {
      id: "Usecase.full-stack",
      defaultMessage: "Full-stack developer"
    },
    value: "full_stack_developer"
  },
  {
    intlLabel: {
      id: "global.content-manager",
      defaultMessage: "Content Manager"
    },
    value: "content_manager"
  },
  {
    intlLabel: {
      id: "Usecase.content-creator",
      defaultMessage: "Content Creator"
    },
    value: "content_creator"
  },
  {
    intlLabel: {
      id: "Usecase.other",
      defaultMessage: "Other"
    },
    value: "other"
  }
];
const TypographyCenter = (0,styled_components_browser_esm["default"])((0,Typography/* Typography */.Z))`
  text-align: center;
`;
const UseCasePage = () => {
  const toggleNotification = (0,dist/* useNotification */.lm)();
  const { push, location } = (0,react_router/* useHistory */.k6)();
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const [role, setRole] = (0,react.useState)();
  const [otherRole, setOtherRole] = (0,react.useState)("");
  const { post } = (0,dist/* useFetchClient */.kY)();
  const { firstname, email } = dist/* auth */.I8.getUserInfo();
  const { hasAdmin } = (0,lib.parse)(location?.search, { ignoreQueryPrefix: true });
  const isOther = role === "other";
  const handleSubmit = async (event, skipPersona) => {
    event.preventDefault();
    try {
      await post("https://analytics.strapi.io/register", {
        email,
        username: firstname,
        firstAdmin: Boolean(!hasAdmin),
        persona: {
          role: skipPersona ? void 0 : role,
          otherRole: skipPersona ? void 0 : otherRole
        }
      });
      toggleNotification({
        type: "success",
        message: {
          id: "Usecase.notification.success.project-created",
          defaultMessage: "Project has been successfully created"
        }
      });
      push("/");
    } catch (err) {
    }
  };
  return /* @__PURE__ */ react.createElement(UnauthenticatedLayout/* default */.ZP, null, /* @__PURE__ */ react.createElement(Main/* Main */.o, { labelledBy: "usecase-title" }, /* @__PURE__ */ react.createElement(UnauthenticatedLayout/* LayoutContent */.bU, null, /* @__PURE__ */ react.createElement("form", { onSubmit: (e) => handleSubmit(e, false) }, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { direction: "column", paddingBottom: 7 }, /* @__PURE__ */ react.createElement(UnauthenticatedLogo/* Logo */.T, null), /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingTop: 6, paddingBottom: 1, width: (0,dist/* pxToRem */.Q1)(250) }, /* @__PURE__ */ react.createElement(TypographyCenter, { variant: "alpha", as: "h1", id: "usecase-title" }, formatMessage({
    id: "Usecase.title",
    defaultMessage: "Tell us a bit more about yourself"
  })))), /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { direction: "column", alignItems: "stretch", gap: 6 }, /* @__PURE__ */ react.createElement(
    Select/* Select */.P,
    {
      id: "usecase",
      "data-testid": "usecase",
      label: formatMessage({
        id: "Usecase.input.work-type",
        defaultMessage: "What type of work do you do?"
      }),
      onChange: setRole,
      value: role
    },
    options.map(({ intlLabel, value }) => /* @__PURE__ */ react.createElement(Option/* Option */.W, { key: value, value }, formatMessage(intlLabel)))
  ), isOther && /* @__PURE__ */ react.createElement(
    TextInput/* TextInput */.o,
    {
      name: "other",
      label: formatMessage({ id: "Usecase.other", defaultMessage: "Other" }),
      value: otherRole,
      onChange: (e) => setOtherRole(e.target.value),
      "data-testid": "other"
    }
  ), /* @__PURE__ */ react.createElement(Button/* Button */.z, { type: "submit", size: "L", fullWidth: true, disabled: !role }, formatMessage({ id: "global.finish", defaultMessage: "Finish" }))))), /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { justifyContent: "center" }, /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingTop: 4 }, /* @__PURE__ */ react.createElement(TextButton/* TextButton */.A, { onClick: () => handleSubmit(true) }, formatMessage({
    id: "Usecase.button.skip",
    defaultMessage: "Skip this question"
  }))))));
};
/* harmony default export */ const pages_UseCasePage = (UseCasePage);

// EXTERNAL MODULE: ./.cache/admin/src/pages/App/constants.js
var constants = __webpack_require__(79687);
;// CONCATENATED MODULE: ./.cache/admin/src/pages/App/index.js
















const AuthenticatedApp = (0,react.lazy)(
  () => Promise.all(/* import() | Admin-authenticatedApp */[__webpack_require__.e(9659), __webpack_require__.e(801)]).then(__webpack_require__.bind(__webpack_require__, 31444))
);
function App() {
  const adminPermissions = (0,useEnterprise/* useEnterprise */.c)(
    ADMIN_PERMISSIONS_CE,
    async () => (await __webpack_require__.e(/* import() */ 2786).then(__webpack_require__.bind(__webpack_require__, 32786))).ADMIN_PERMISSIONS_EE,
    {
      combine(cePermissions, eePermissions) {
        return merge_default()({}, cePermissions, eePermissions);
      },
      defaultValue: ADMIN_PERMISSIONS_CE
    }
  );
  const routes = (0,useEnterprise/* useEnterprise */.c)(
    constants/* ROUTES_CE */.y3,
    async () => (await __webpack_require__.e(/* import() */ 4972).then(__webpack_require__.bind(__webpack_require__, 14972))).ROUTES_EE,
    {
      defaultValue: []
    }
  );
  const toggleNotification = (0,dist/* useNotification */.lm)();
  const { updateProjectSettings } = (0,useConfiguration/* useConfiguration */.m)();
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const [{ isLoading, hasAdmin, uuid, deviceId }, setState] = (0,react.useState)({
    isLoading: true,
    hasAdmin: false
  });
  const dispatch = (0,react_redux_es/* useDispatch */.I0)();
  const appInfo = (0,dist/* useAppInfo */.L7)();
  const { get, post } = (0,dist/* useFetchClient */.kY)();
  const authRoutes = (0,react.useMemo)(() => {
    return (0,utils/* makeUniqueRoutes */.WW)(
      routes.map(({ to, Component, exact }) => (0,utils/* createRoute */.ot)(Component, to, exact))
    );
  }, [routes]);
  const [telemetryProperties, setTelemetryProperties] = (0,react.useState)(null);
  (0,react.useEffect)(() => {
    dispatch({ type: constants/* SET_ADMIN_PERMISSIONS */.XS, payload: adminPermissions });
  }, [adminPermissions, dispatch]);
  (0,react.useEffect)(() => {
    const currentToken = dist/* auth */.I8.getToken();
    const renewToken = async () => {
      try {
        const {
          data: {
            data: { token }
          }
        } = await post("/admin/renew-token", { token: currentToken });
        dist/* auth */.I8.updateToken(token);
      } catch (err) {
        dist/* auth */.I8.clearAppStorage();
        window.location.reload();
      }
    };
    if (currentToken) {
      renewToken();
    }
  }, [post]);
  (0,react.useEffect)(() => {
    const getData = async () => {
      try {
        const {
          data: {
            data: { hasAdmin: hasAdmin2, uuid: uuid2, menuLogo, authLogo }
          }
        } = await get(`/admin/init`);
        updateProjectSettings({
          menuLogo: (0,dist/* prefixFileUrlWithBackendUrl */.CR)(menuLogo),
          authLogo: (0,dist/* prefixFileUrlWithBackendUrl */.CR)(authLogo)
        });
        if (uuid2) {
          const {
            data: { data: properties }
          } = await get(`/admin/telemetry-properties`, {
            // NOTE: needed because the interceptors of the fetchClient redirect to /login when receive a 401 and it would end up in an infinite loop when the user doesn't have a session.
            validateStatus: (status) => status < 500
          });
          setTelemetryProperties(properties);
          try {
            const event = "didInitializeAdministration";
            await post(
              "https://analytics.strapi.io/api/v2/track",
              {
                // This event is anonymous
                event,
                userId: "",
                deviceId,
                eventPropeties: {},
                userProperties: { environment: appInfo.currentEnvironment },
                groupProperties: { ...properties, projectId: uuid2 }
              },
              {
                headers: {
                  "X-Strapi-Event": event
                }
              }
            );
          } catch (e) {
          }
        }
        setState({ isLoading: false, hasAdmin: hasAdmin2, uuid: uuid2, deviceId });
      } catch (err) {
        toggleNotification({
          type: "warning",
          message: { id: "app.containers.App.notification.error.init" }
        });
      }
    };
    getData();
  }, [toggleNotification, updateProjectSettings]);
  const setHasAdmin = (hasAdmin2) => setState((prev) => ({ ...prev, hasAdmin: hasAdmin2 }));
  const trackingInfo = (0,react.useMemo)(
    () => ({
      uuid,
      telemetryProperties,
      deviceId
    }),
    [uuid, telemetryProperties, deviceId]
  );
  if (isLoading) {
    return /* @__PURE__ */ react.createElement(dist/* LoadingIndicatorPage */.dO, null);
  }
  return /* @__PURE__ */ react.createElement(react.Suspense, { fallback: /* @__PURE__ */ react.createElement(dist/* LoadingIndicatorPage */.dO, null) }, /* @__PURE__ */ react.createElement(SkipToContent/* SkipToContent */.z, null, formatMessage({ id: "skipToContent", defaultMessage: "Skip to content" })), /* @__PURE__ */ react.createElement(dist/* TrackingProvider */.L8, { value: trackingInfo }, /* @__PURE__ */ react.createElement(react_router/* Switch */.rs, null, authRoutes, /* @__PURE__ */ react.createElement(
    react_router/* Route */.AW,
    {
      path: "/auth/:authType",
      render: (routerProps) => /* @__PURE__ */ react.createElement(pages_AuthPage, { ...routerProps, setHasAdmin, hasAdmin }),
      exact: true
    }
  ), /* @__PURE__ */ react.createElement(PrivateRoute, { path: "/usecase", component: pages_UseCasePage }), /* @__PURE__ */ react.createElement(PrivateRoute, { path: "/", component: AuthenticatedApp }), /* @__PURE__ */ react.createElement(react_router/* Route */.AW, { path: "", component: NotFoundPage["default"] }))));
}
/* harmony default export */ const pages_App = (App);

;// CONCATENATED MODULE: ./.cache/admin/src/translations/languageNativeNames.js
const languageNativeNames = {
  ar: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
  ca: "Catal\xE0",
  cs: "\u010Ce\u0161tina",
  de: "Deutsch",
  dk: "Dansk",
  en: "English",
  es: "Espa\xF1ol",
  eu: "Euskara",
  fr: "Fran\xE7ais",
  gu: "Gujarati",
  he: "\u05E2\u05D1\u05E8\u05D9\u05EA",
  hu: "Magyar",
  id: "Indonesian",
  it: "Italiano",
  ja: "\u65E5\u672C\u8A9E",
  ko: "\uD55C\uAD6D\uC5B4",
  ml: "Malayalam",
  ms: "Melayu",
  nl: "Nederlands",
  no: "Norwegian",
  pl: "Polski",
  "pt-BR": "Portugu\xEAs (Brasil)",
  pt: "Portugu\xEAs (Portugal)",
  ru: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439",
  sk: "Sloven\u010Dina",
  sv: "Swedish",
  th: "\u0E44\u0E17\u0E22",
  tr: "T\xFCrk\xE7e",
  uk: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",
  vi: "Ti\u1EBFng Vi\u1EC7t",
  "zh-Hans": "\u4E2D\u6587 (\u7B80\u4F53)",
  zh: "\u4E2D\u6587 (\u7E41\u9AD4)",
  sa: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924",
  hi: "\u0939\u093F\u0928\u094D\u0926\u0940"
};
/* harmony default export */ const translations_languageNativeNames = (languageNativeNames);

;// CONCATENATED MODULE: ./.cache/admin/src/StrapiApp.js



















class StrapiApp {
  constructor({ adminConfig, appPlugins, library, middlewares, reducers }) {
    this.customConfigurations = adminConfig.config;
    this.customBootstrapConfiguration = adminConfig.bootstrap;
    this.configurations = {
      authLogo: logo_strapi_2022,
      head: { favicon: favicon_namespaceObject },
      locales: ["en"],
      menuLogo: logo_strapi_2022,
      notifications: { releases: true },
      themes: { light: lightTheme/* lightTheme */.W, dark: darkTheme/* darkTheme */.$ },
      translations: {},
      tutorials: true
    };
    this.appPlugins = appPlugins || {};
    this.library = library;
    this.middlewares = middlewares;
    this.plugins = {};
    this.reducers = reducers;
    this.translations = {};
    this.hooksDict = {};
    this.admin = {
      injectionZones: src_injectionZones
    };
    this.customFields = apis/* customFields */.rh;
    this.menu = [];
    this.settings = {
      global: {
        id: "global",
        intlLabel: {
          id: "Settings.global",
          defaultMessage: "Global Settings"
        },
        links: []
      }
    };
  }
  addComponents = (components) => {
    if (Array.isArray(components)) {
      components.map((compo) => this.library.components.add(compo));
    } else {
      this.library.components.add(components);
    }
  };
  addCorePluginMenuLink = (link) => {
    const stringifiedLink = JSON.stringify(link);
    browser_default()(link.to, `link.to should be defined for ${stringifiedLink}`);
    browser_default()(
      typeof link.to === "string",
      `Expected link.to to be a string instead received ${typeof link.to}`
    );
    browser_default()(
      ["/plugins/content-type-builder", "/plugins/upload"].includes(link.to),
      "This method is not available for your plugin"
    );
    browser_default()(
      link.intlLabel?.id && link.intlLabel?.defaultMessage,
      `link.intlLabel.id & link.intlLabel.defaultMessage for ${stringifiedLink}`
    );
    this.menu.push(link);
  };
  addFields = (fields) => {
    if (Array.isArray(fields)) {
      fields.map((field) => this.library.fields.add(field));
    } else {
      this.library.fields.add(fields);
    }
  };
  addMenuLink = (link) => {
    const stringifiedLink = JSON.stringify(link);
    browser_default()(link.to, `link.to should be defined for ${stringifiedLink}`);
    browser_default()(
      typeof link.to === "string",
      `Expected link.to to be a string instead received ${typeof link.to}`
    );
    browser_default()(
      link.intlLabel?.id && link.intlLabel?.defaultMessage,
      `link.intlLabel.id & link.intlLabel.defaultMessage for ${stringifiedLink}`
    );
    browser_default()(
      link.Component && typeof link.Component === "function",
      `link.Component should be a valid React Component`
    );
    browser_default()(
      link.icon && typeof link.icon === "function",
      `link.Icon should be a valid React Component`
    );
    this.menu.push(link);
  };
  addMiddlewares = (middlewares) => {
    middlewares.forEach((middleware) => {
      this.middlewares.add(middleware);
    });
  };
  addReducers = (reducers) => {
    Object.keys(reducers).forEach((reducerName) => {
      this.reducers.add(reducerName, reducers[reducerName]);
    });
  };
  addSettingsLink = (sectionId, link) => {
    browser_default()(this.settings[sectionId], "The section does not exist");
    const stringifiedLink = JSON.stringify(link);
    browser_default()(link.id, `link.id should be defined for ${stringifiedLink}`);
    browser_default()(
      link.intlLabel?.id && link.intlLabel?.defaultMessage,
      `link.intlLabel.id & link.intlLabel.defaultMessage for ${stringifiedLink}`
    );
    browser_default()(link.to, `link.to should be defined for ${stringifiedLink}`);
    browser_default()(
      link.Component && typeof link.Component === "function",
      `link.Component should be a valid React Component`
    );
    this.settings[sectionId].links.push(link);
  };
  addSettingsLinks = (sectionId, links) => {
    browser_default()(this.settings[sectionId], "The section does not exist");
    browser_default()(Array.isArray(links), "TypeError expected links to be an array");
    links.forEach((link) => {
      this.addSettingsLink(sectionId, link);
    });
  };
  async bootstrap() {
    Object.keys(this.appPlugins).forEach((plugin) => {
      const bootstrap = this.appPlugins[plugin].bootstrap;
      if (bootstrap) {
        bootstrap({
          addSettingsLink: this.addSettingsLink,
          addSettingsLinks: this.addSettingsLinks,
          getPlugin: this.getPlugin,
          injectContentManagerComponent: this.injectContentManagerComponent,
          injectAdminComponent: this.injectAdminComponent,
          registerHook: this.registerHook
        });
      }
    });
    if (isFunction_default()(this.customBootstrapConfiguration)) {
      this.customBootstrapConfiguration({
        addComponents: this.addComponents,
        addFields: this.addFields,
        addMenuLink: this.addMenuLink,
        addReducers: this.addReducers,
        addSettingsLink: this.addSettingsLink,
        addSettingsLinks: this.addSettingsLinks,
        getPlugin: this.getPlugin,
        injectContentManagerComponent: this.injectContentManagerComponent,
        injectAdminComponent: this.injectAdminComponent,
        registerHook: this.registerHook
      });
    }
  }
  bootstrapAdmin = async () => {
    await this.createCustomConfigurations();
    this.createHook(exposedHooks/* INJECT_COLUMN_IN_TABLE */.No);
    this.createHook(exposedHooks/* MUTATE_COLLECTION_TYPES_LINKS */.LK);
    this.createHook(exposedHooks/* MUTATE_SINGLE_TYPES_LINKS */.dV);
    this.createHook(exposedHooks/* MUTATE_EDIT_VIEW_LAYOUT */.Eo);
    return Promise.resolve();
  };
  createCustomConfigurations = async () => {
    if (this.customConfigurations?.locales) {
      this.configurations.locales = [
        "en",
        ...this.customConfigurations.locales?.filter((loc) => loc !== "en") || []
      ];
    }
    if (this.customConfigurations?.auth?.logo) {
      this.configurations.authLogo = this.customConfigurations.auth.logo;
    }
    if (this.customConfigurations?.menu?.logo) {
      this.configurations.menuLogo = this.customConfigurations.menu.logo;
    }
    if (this.customConfigurations?.head?.favicon) {
      this.configurations.head.favicon = this.customConfigurations.head.favicon;
    }
    if (this.customConfigurations?.theme) {
      const darkTheme2 = this.customConfigurations.theme.dark;
      const lightTheme2 = this.customConfigurations.theme.light;
      if (!darkTheme2 && !lightTheme2) {
        console.warn(
          `[deprecated] In future versions, Strapi will stop supporting this theme customization syntax. The theme configuration accepts a light and a dark key to customize each theme separately. See https://docs.strapi.io/developer-docs/latest/development/admin-customization.html#theme-extension.`
        );
        merge_default()(this.configurations.themes.light, this.customConfigurations.theme);
      }
      if (lightTheme2)
        merge_default()(this.configurations.themes.light, lightTheme2);
      if (darkTheme2)
        merge_default()(this.configurations.themes.dark, darkTheme2);
    }
    if (this.customConfigurations?.notifications?.releases !== void 0) {
      this.configurations.notifications.releases = this.customConfigurations.notifications.releases;
    }
    if (this.customConfigurations?.tutorials !== void 0) {
      this.configurations.tutorials = this.customConfigurations.tutorials;
    }
  };
  createHook = (name) => {
    this.hooksDict[name] = utils_createHook();
  };
  createSettingSection = (section, links) => {
    browser_default()(section.id, "section.id should be defined");
    browser_default()(
      section.intlLabel?.id && section.intlLabel?.defaultMessage,
      "section.intlLabel should be defined"
    );
    browser_default()(Array.isArray(links), "TypeError expected links to be an array");
    browser_default()(this.settings[section.id] === void 0, "A similar section already exists");
    this.settings[section.id] = { ...section, links: [] };
    links.forEach((link) => {
      this.addSettingsLink(section.id, link);
    });
  };
  createStore = () => {
    const store = store_configureStore(this.middlewares.middlewares, this.reducers.reducers);
    return store;
  };
  getAdminInjectedComponents = (moduleName, containerName, blockName) => {
    try {
      return this.admin.injectionZones[moduleName][containerName][blockName] || [];
    } catch (err) {
      console.error("Cannot get injected component", err);
      return err;
    }
  };
  getPlugin = (pluginId) => {
    return this.plugins[pluginId];
  };
  async initialize() {
    Object.keys(this.appPlugins).forEach((plugin) => {
      this.appPlugins[plugin].register(this);
    });
  }
  injectContentManagerComponent = (containerName, blockName, component) => {
    browser_default()(
      this.admin.injectionZones.contentManager[containerName]?.[blockName],
      `The ${containerName} ${blockName} zone is not defined in the content manager`
    );
    browser_default()(component, "A Component must be provided");
    this.admin.injectionZones.contentManager[containerName][blockName].push(component);
  };
  injectAdminComponent = (containerName, blockName, component) => {
    browser_default()(
      this.admin.injectionZones.admin[containerName]?.[blockName],
      `The ${containerName} ${blockName} zone is not defined in the admin`
    );
    browser_default()(component, "A Component must be provided");
    this.admin.injectionZones.admin[containerName][blockName].push(component);
  };
  /**
   * Load the admin translations
   * @returns {Object} The imported admin translations
   */
  async loadAdminTrads() {
    const arrayOfPromises = this.configurations.locales.map((locale) => {
      return __webpack_require__(95423)(`./${locale}.json`).then(({ default: data }) => {
        return { data, locale };
      }).catch(() => {
        return { data: null, locale };
      });
    });
    const adminLocales = await Promise.all(arrayOfPromises);
    const translations = adminLocales.reduce((acc, current) => {
      if (current.data) {
        acc[current.locale] = current.data;
      }
      return acc;
    }, {});
    return translations;
  }
  /**
   * Load the application's translations and merged the custom translations
   * with the default ones.
   *
   */
  async loadTrads() {
    const adminTranslations = await this.loadAdminTrads();
    const arrayOfPromises = Object.keys(this.appPlugins).map((plugin) => {
      const registerTrads = this.appPlugins[plugin].registerTrads;
      if (registerTrads) {
        return registerTrads({ locales: this.configurations.locales });
      }
      return null;
    }).filter((a) => a);
    const pluginsTrads = await Promise.all(arrayOfPromises);
    const mergedTrads = pluginsTrads.reduce((acc, currentPluginTrads) => {
      const pluginTrads = currentPluginTrads.reduce((acc1, current) => {
        acc1[current.locale] = current.data;
        return acc1;
      }, {});
      Object.keys(pluginTrads).forEach((locale) => {
        acc[locale] = { ...acc[locale], ...pluginTrads[locale] };
      });
      return acc;
    }, {});
    const translations = this.configurations.locales.reduce((acc, current) => {
      acc[current] = {
        ...adminTranslations[current],
        ...mergedTrads[current] || {},
        ...this.customConfigurations?.translations?.[current]
      };
      return acc;
    }, {});
    this.configurations.translations = translations;
    return Promise.resolve();
  }
  registerHook = (name, fn) => {
    browser_default()(
      this.hooksDict[name],
      `The hook ${name} is not defined. You are trying to register a hook that does not exist in the application.`
    );
    this.hooksDict[name].register(fn);
  };
  registerPlugin = (pluginConf) => {
    const plugin = (0,apis/* Plugin */.Sy)(pluginConf);
    this.plugins[plugin.pluginId] = plugin;
  };
  runHookSeries = (name, asynchronous = false) => asynchronous ? this.hooksDict[name].runSeriesAsync() : this.hooksDict[name].runSeries();
  runHookWaterfall = (name, initialValue, asynchronous = false, store) => {
    return asynchronous ? this.hooksDict[name].runWaterfallAsync(initialValue, store) : this.hooksDict[name].runWaterfall(initialValue, store);
  };
  runHookParallel = (name) => this.hooksDict[name].runParallel();
  render() {
    const store = this.createStore();
    const localeNames = pick_default()(translations_languageNativeNames, this.configurations.locales || []);
    const {
      components: { components },
      fields: { fields }
    } = this.library;
    return /* @__PURE__ */ react.createElement(
      components_Providers,
      {
        authLogo: this.configurations.authLogo,
        components,
        fields,
        customFields: this.customFields,
        localeNames,
        getAdminInjectedComponents: this.getAdminInjectedComponents,
        getPlugin: this.getPlugin,
        messages: this.configurations.translations,
        menu: this.menu,
        menuLogo: this.configurations.menuLogo,
        plugins: this.plugins,
        runHookParallel: this.runHookParallel,
        runHookWaterfall: (name, initialValue, async = false) => {
          return this.runHookWaterfall(name, initialValue, async, store);
        },
        runHookSeries: this.runHookSeries,
        themes: this.configurations.themes,
        settings: this.settings,
        showTutorials: this.configurations.tutorials,
        showReleaseNotification: this.configurations.notifications.releases,
        store
      },
      /* @__PURE__ */ react.createElement(
        Helmet/* Helmet */.q,
        {
          link: [
            {
              rel: "icon",
              type: "image/png",
              href: this.configurations.head.favicon
            }
          ],
          htmlAttributes: { lang: localStorage.getItem(LanguageProvider/* LANGUAGE_LOCAL_STORAGE_KEY */.xW) || "en" }
        }
      ),
      /* @__PURE__ */ react.createElement(react_router_dom.BrowserRouter, { basename: basename/* default */.Z }, /* @__PURE__ */ react.createElement(pages_App, { store }))
    );
  }
}
/* harmony default export */ const src_StrapiApp = (({ adminConfig = {}, appPlugins, library, middlewares, reducers }) => new StrapiApp({ adminConfig, appPlugins, library, middlewares, reducers }));


/***/ }),

/***/ 95651:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const basename = "/admin/".replace(window.location.origin, "");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (basename);


/***/ }),

/***/ 85338:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Eo: () => (/* binding */ MUTATE_EDIT_VIEW_LAYOUT),
/* harmony export */   LK: () => (/* binding */ MUTATE_COLLECTION_TYPES_LINKS),
/* harmony export */   No: () => (/* binding */ INJECT_COLUMN_IN_TABLE),
/* harmony export */   dV: () => (/* binding */ MUTATE_SINGLE_TYPES_LINKS)
/* harmony export */ });
const INJECT_COLUMN_IN_TABLE = "Admin/CM/pages/ListView/inject-column-in-table";
const MUTATE_COLLECTION_TYPES_LINKS = "Admin/CM/pages/App/mutate-collection-types-links";
const MUTATE_EDIT_VIEW_LAYOUT = "Admin/CM/pages/EditView/mutate-edit-view-layout";
const MUTATE_SINGLE_TYPES_LINKS = "Admin/CM/pages/App/mutate-single-types-links";


/***/ }),

/***/ 50745:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  sg: () => (/* binding */ Column),
  bU: () => (/* binding */ LayoutContent),
  ZP: () => (/* binding */ layouts_UnauthenticatedLayout)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Box/Box.mjs
var Box = __webpack_require__(16607);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Flex/Flex.mjs
var Flex = __webpack_require__(96987);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(45697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js + 4 modules
var styled_components_browser_esm = __webpack_require__(88972);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Select/SingleSelect.mjs
var SingleSelect = __webpack_require__(90090);
// EXTERNAL MODULE: ./node_modules/react-intl/lib/src/components/useIntl.js
var useIntl = __webpack_require__(86896);
// EXTERNAL MODULE: ./.cache/admin/src/components/LanguageProvider.tsx
var LanguageProvider = __webpack_require__(28840);
;// CONCATENATED MODULE: ./.cache/admin/src/layouts/UnauthenticatedLayout/LocaleToggle/index.js




const LocaleToggle = () => {
  const { changeLocale, localeNames } = (0,LanguageProvider/* useLocales */.nt)();
  const { locale } = (0,useIntl/* default */.Z)();
  return /* @__PURE__ */ react.createElement(SingleSelect/* SingleSelect */.q4, { value: locale, onChange: (language) => changeLocale(language) }, Object.entries(localeNames).map(([language, name]) => /* @__PURE__ */ react.createElement(SingleSelect/* SingleSelectOption */.ag, { key: language, value: language }, name)));
};
/* harmony default export */ const UnauthenticatedLayout_LocaleToggle = (LocaleToggle);

;// CONCATENATED MODULE: ./.cache/admin/src/layouts/UnauthenticatedLayout/index.js





const Wrapper = (0,styled_components_browser_esm["default"])((0,Box/* Box */.x))`
  margin: 0 auto;
  width: 552px;
`;
const Column = (0,styled_components_browser_esm["default"])((0,Flex/* Flex */.k))`
  flex-direction: column;
`;
const LayoutContent = ({ children }) => /* @__PURE__ */ react.createElement(
  Wrapper,
  {
    shadow: "tableShadow",
    hasRadius: true,
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 10,
    paddingRight: 10,
    background: "neutral0",
    justifyContent: "center"
  },
  children
);
LayoutContent.propTypes = {
  children: (prop_types_default()).node.isRequired
};
const UnauthenticatedLayout = ({ children }) => {
  return /* @__PURE__ */ react.createElement("div", null, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { as: "header", justifyContent: "flex-end" }, /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingTop: 6, paddingRight: 8 }, /* @__PURE__ */ react.createElement(UnauthenticatedLayout_LocaleToggle, null))), /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingTop: 2, paddingBottom: 11 }, children));
};
UnauthenticatedLayout.propTypes = {
  children: (prop_types_default()).node.isRequired
};
/* harmony default export */ const layouts_UnauthenticatedLayout = (UnauthenticatedLayout);


/***/ }),

/***/ 91458:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7659);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(88972);


const FieldActionWrapper = (0,styled_components__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_strapi_design_system__WEBPACK_IMPORTED_MODULE_1__/* .FieldAction */ .E))`
  svg {
    height: 1rem;
    width: 1rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FieldActionWrapper);


/***/ }),

/***/ 31640:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(38670);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(40720);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(16607);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(10574);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(96987);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(22546);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(12473);
/* harmony import */ var _strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2317);
/* harmony import */ var _strapi_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(81851);
/* harmony import */ var _strapi_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(92795);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41054);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(45697);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(86896);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(88972);
/* harmony import */ var _components_UnauthenticatedLogo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(43847);
/* harmony import */ var _layouts_UnauthenticatedLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(50745);
/* harmony import */ var _FieldActionWrapper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(91458);











const PasswordInput = (0,styled_components__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_strapi_design_system__WEBPACK_IMPORTED_MODULE_7__/* .TextInput */ .o))`
  ::-ms-reveal {
    display: none;
  }
`;
const Login = ({ onSubmit, schema, children }) => {
  const [passwordShown, setPasswordShown] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const { formatMessage } = (0,react_intl__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z)();
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_design_system__WEBPACK_IMPORTED_MODULE_9__/* .Main */ .o, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_layouts_UnauthenticatedLayout__WEBPACK_IMPORTED_MODULE_4__/* .LayoutContent */ .bU, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    formik__WEBPACK_IMPORTED_MODULE_2__/* .Formik */ .J9,
    {
      enableReinitialize: true,
      initialValues: {
        email: "",
        password: "",
        rememberMe: false
      },
      onSubmit,
      validationSchema: schema,
      validateOnChange: false
    },
    ({ values, errors, handleChange }) => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_1__/* .Form */ .l0, { noValidate: true }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_layouts_UnauthenticatedLayout__WEBPACK_IMPORTED_MODULE_4__/* .Column */ .sg, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_UnauthenticatedLogo__WEBPACK_IMPORTED_MODULE_3__/* .Logo */ .T, null), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_design_system__WEBPACK_IMPORTED_MODULE_10__/* .Box */ .x, { paddingTop: 6, paddingBottom: 1 }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_design_system__WEBPACK_IMPORTED_MODULE_11__/* .Typography */ .Z, { variant: "alpha", as: "h1" }, formatMessage({
      id: "Auth.form.welcome.title",
      defaultMessage: "Welcome!"
    }))), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_design_system__WEBPACK_IMPORTED_MODULE_10__/* .Box */ .x, { paddingBottom: 7 }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_design_system__WEBPACK_IMPORTED_MODULE_11__/* .Typography */ .Z, { variant: "epsilon", textColor: "neutral600" }, formatMessage({
      id: "Auth.form.welcome.subtitle",
      defaultMessage: "Log in to your Strapi account"
    }))), errors.errorMessage && /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      _strapi_design_system__WEBPACK_IMPORTED_MODULE_11__/* .Typography */ .Z,
      {
        id: "global-form-error",
        role: "alert",
        tabIndex: -1,
        textColor: "danger600"
      },
      errors.errorMessage
    )), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_design_system__WEBPACK_IMPORTED_MODULE_12__/* .Flex */ .k, { direction: "column", alignItems: "stretch", gap: 6 }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      _strapi_design_system__WEBPACK_IMPORTED_MODULE_7__/* .TextInput */ .o,
      {
        error: errors.email ? formatMessage({
          id: errors.email,
          defaultMessage: "This value is required."
        }) : "",
        value: values.email,
        onChange: handleChange,
        label: formatMessage({ id: "Auth.form.email.label", defaultMessage: "Email" }),
        placeholder: formatMessage({
          id: "Auth.form.email.placeholder",
          defaultMessage: "kai@doe.com"
        }),
        name: "email",
        required: true
      }
    ), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      PasswordInput,
      {
        error: errors.password ? formatMessage({
          id: errors.password,
          defaultMessage: "This value is required."
        }) : "",
        onChange: handleChange,
        value: values.password,
        label: formatMessage({
          id: "global.password",
          defaultMessage: "Password"
        }),
        name: "password",
        type: passwordShown ? "text" : "password",
        endAction: /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
          _FieldActionWrapper__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z,
          {
            onClick: (e) => {
              e.stopPropagation();
              setPasswordShown((prev) => !prev);
            },
            label: formatMessage(
              passwordShown ? {
                id: "Auth.form.password.show-password",
                defaultMessage: "Show password"
              } : {
                id: "Auth.form.password.hide-password",
                defaultMessage: "Hide password"
              }
            )
          },
          passwordShown ? /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_icons__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, null) : /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_icons__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z, null)
        ),
        required: true
      }
    ), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      _strapi_design_system__WEBPACK_IMPORTED_MODULE_15__/* .Checkbox */ .X,
      {
        onValueChange: (checked) => {
          handleChange({ target: { value: checked, name: "rememberMe" } });
        },
        value: values.rememberMe,
        "aria-label": "rememberMe",
        name: "rememberMe"
      },
      formatMessage({
        id: "Auth.form.rememberMe.label",
        defaultMessage: "Remember me"
      })
    ), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_design_system__WEBPACK_IMPORTED_MODULE_16__/* .Button */ .z, { fullWidth: true, type: "submit" }, formatMessage({ id: "Auth.form.button.login", defaultMessage: "Login" }))))
  ), children), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_design_system__WEBPACK_IMPORTED_MODULE_12__/* .Flex */ .k, { justifyContent: "center" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_design_system__WEBPACK_IMPORTED_MODULE_10__/* .Box */ .x, { paddingTop: 4 }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_1__/* .Link */ .rU, { to: "/auth/forgot-password" }, formatMessage({
    id: "Auth.link.forgot-password",
    defaultMessage: "Forgot your password?"
  })))));
};
Login.defaultProps = {
  children: null,
  onSubmit() {
  }
};
Login.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().node),
  onSubmit: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().func),
  schema: prop_types__WEBPACK_IMPORTED_MODULE_17___default().shape({
    type: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().string).isRequired
  }).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Login);


/***/ }),

/***/ 23337:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40720);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(90731);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(34726);
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(96912);
/* harmony import */ var _strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2317);
/* harmony import */ var _strapi_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(98);
/* harmony import */ var _strapi_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(18857);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(86896);





const NoContentType = () => {
  const { formatMessage } = (0,react_intl__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
  (0,_strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_1__/* .useFocusWhenNavigate */ .go)();
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_design_system__WEBPACK_IMPORTED_MODULE_3__/* .Main */ .o, { labelledBy: "title" }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    _strapi_design_system__WEBPACK_IMPORTED_MODULE_4__/* .HeaderLayout */ .T,
    {
      id: "title",
      title: formatMessage({
        id: "content-manager.pageNotFound",
        defaultMessage: "Page not found"
      })
    }
  ), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_design_system__WEBPACK_IMPORTED_MODULE_5__/* .ContentLayout */ .D, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    _strapi_design_system__WEBPACK_IMPORTED_MODULE_6__/* .EmptyStateLayout */ .x,
    {
      action: /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_1__/* .LinkButton */ .Qj, { variant: "secondary", endIcon: /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_icons__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, null), to: "/" }, formatMessage({
        id: "app.components.NotFoundPage.back",
        defaultMessage: "Back to homepage"
      })),
      content: formatMessage({
        id: "app.page.not.found",
        defaultMessage: "Oops! We can't seem to find the page you're looging for..."
      }),
      hasRadius: true,
      icon: /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_icons__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, { width: "10rem" }),
      shadow: "tableShadow"
    }
  )));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NoContentType);


/***/ }),

/***/ 95187:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var _strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2317);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(45697);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16550);




const LazyCompo = ({ loadComponent }) => {
  const [Compo, setCompo] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const loadCompo = async () => {
      try {
        const loadedCompo = await loadComponent();
        setCompo(() => loadedCompo?.default ?? loadedCompo);
      } catch (err) {
        console.log(err);
      }
    };
    loadCompo();
  }, [loadComponent]);
  if (Compo) {
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Compo, null);
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_1__/* .LoadingIndicatorPage */ .dO, null);
};
const createRoute = (Component, to, exact) => {
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
    react_router_dom__WEBPACK_IMPORTED_MODULE_2__/* .Route */ .AW,
    {
      render: () => /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(LazyCompo, { loadComponent: Component }),
      key: to,
      path: to,
      exact: exact || false
    }
  );
};
LazyCompo.propTypes = {
  loadComponent: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createRoute);


/***/ }),

/***/ 26779:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const formatAPIError = ({ data }) => {
  try {
    return Object.keys(data).reduce((acc, current) => {
      const errorMessage = data[current][0];
      acc[current] = {
        id: errorMessage,
        defaultMessage: errorMessage
      };
      return acc;
    }, {});
  } catch (err) {
    return {};
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatAPIError);


/***/ }),

/***/ 96854:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  R6: () => (/* reexport */ utils_checkFormValidity),
  ot: () => (/* reexport */ createRoute/* default */.Z),
  Iz: () => (/* reexport */ formatAPIErrors/* default */.Z),
  Pp: () => (/* reexport */ getFullName),
  Qy: () => (/* reexport */ hashAdminUserEmail),
  WW: () => (/* reexport */ makeUniqueRoutes/* default */.Z)
});

// UNUSED EXPORTS: getAttributesToDisplay, getExistingActions, sortLinks

// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/dist/index.mjs + 15 modules
var dist = __webpack_require__(2317);
;// CONCATENATED MODULE: ./.cache/admin/src/utils/checkFormValidity.js

const checkFormValidity = async (data, schema) => {
  let errors = null;
  try {
    await schema.validate(data, { abortEarly: false });
  } catch (err) {
    errors = (0,dist/* getYupInnerErrors */.CJ)(err);
  }
  return errors;
};
/* harmony default export */ const utils_checkFormValidity = (checkFormValidity);

// EXTERNAL MODULE: ./.cache/admin/src/utils/createRoute.js
var createRoute = __webpack_require__(95187);
// EXTERNAL MODULE: ./.cache/admin/src/utils/formatAPIErrors.js
var formatAPIErrors = __webpack_require__(26779);
;// CONCATENATED MODULE: ./.cache/admin/src/utils/getFullName.js
/* harmony default export */ const getFullName = ((firstname, lastname = "") => {
  return [firstname, lastname].filter((str) => str).join(" ");
});

// EXTERNAL MODULE: ./.cache/admin/src/utils/makeUniqueRoutes.js
var makeUniqueRoutes = __webpack_require__(14155);
// EXTERNAL MODULE: ./node_modules/lodash/sortBy.js
var lodash_sortBy = __webpack_require__(89734);
;// CONCATENATED MODULE: ./.cache/admin/src/utils/sortLinks.js

const sortLinks = (links) => sortBy(links, (object) => object.name);
/* harmony default export */ const utils_sortLinks = ((/* unused pure expression or super */ null && (sortLinks)));

;// CONCATENATED MODULE: ./.cache/admin/src/utils/uniqueAdminHash.js
const utils = {
  bufferToHex(buffer) {
    return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
  },
  async digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    return this.bufferToHex(hashBuffer);
  }
};
async function hashAdminUserEmail(payload) {
  if (!payload) {
    return null;
  }
  try {
    return await utils.digestMessage(payload.email);
  } catch (error) {
    return null;
  }
}

;// CONCATENATED MODULE: ./.cache/admin/src/utils/index.js











/***/ }),

/***/ 14155:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const makeUniqueRoutes = (routes) => routes.filter((route, index, refArray) => {
  return refArray.findIndex((obj) => obj.key === route.key) === index;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (makeUniqueRoutes);


/***/ }),

/***/ 61473:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "70674f63fc3904c20de0.svg";

/***/ })

}]);