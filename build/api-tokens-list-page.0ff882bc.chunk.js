"use strict";
(self["webpackChunkal_azhar_back"] = self["webpackChunkal_azhar_back"] || []).push([[8056],{

/***/ 92668:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ Tokens_Table)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Table/Tbody.mjs
var Tbody = __webpack_require__(35752);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Table/Tr.mjs
var Tr = __webpack_require__(29299);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Table/Cell.mjs
var Cell = __webpack_require__(69398);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.mjs + 2 modules
var Typography = __webpack_require__(10574);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Flex/Flex.mjs
var Flex = __webpack_require__(96987);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/dist/index.mjs + 15 modules
var dist = __webpack_require__(2317);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(45697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/react-intl/lib/src/components/useIntl.js
var useIntl = __webpack_require__(86896);
// EXTERNAL MODULE: ./node_modules/react-router/esm/react-router.js
var react_router = __webpack_require__(16550);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Box/Box.mjs
var Box = __webpack_require__(16607);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/IconButton/IconButton.mjs
var IconButton = __webpack_require__(96208);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/Trash.mjs
var Trash = __webpack_require__(54425);
;// CONCATENATED MODULE: ./.cache/admin/src/pages/SettingsPage/components/Tokens/Table/DeleteButton/index.js






const DeleteButton = ({ tokenName, onClickDelete, tokenType }) => {
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const { trackUsage } = (0,dist/* useTracking */.rS)();
  const [showConfirmDialog, setShowConfirmDialog] = (0,react.useState)(false);
  const handleClickDelete = () => {
    setShowConfirmDialog(false);
    trackUsage("willDeleteToken", {
      tokenType
    });
    onClickDelete();
  };
  return /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingLeft: 1, onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ react.createElement(
    IconButton/* IconButton */.h,
    {
      onClick: () => {
        setShowConfirmDialog(true);
      },
      label: formatMessage(
        {
          id: "global.delete-target",
          defaultMessage: "Delete {target}"
        },
        { target: `${tokenName}` }
      ),
      name: "delete",
      noBorder: true,
      icon: /* @__PURE__ */ react.createElement(Trash/* default */.Z, null)
    }
  ), /* @__PURE__ */ react.createElement(
    dist/* ConfirmDialog */.QH,
    {
      onToggleDialog: () => setShowConfirmDialog(false),
      onConfirm: handleClickDelete,
      isOpen: showConfirmDialog
    }
  ));
};
DeleteButton.propTypes = {
  tokenName: (prop_types_default()).string.isRequired,
  onClickDelete: (prop_types_default()).func.isRequired,
  tokenType: (prop_types_default()).string.isRequired
};
/* harmony default export */ const Table_DeleteButton = (DeleteButton);

// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/Eye.mjs
var Eye = __webpack_require__(81851);
// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js + 4 modules
var styled_components_browser_esm = __webpack_require__(88972);
;// CONCATENATED MODULE: ./.cache/admin/src/pages/SettingsPage/components/Tokens/Table/DefaultButton/index.js






const MESSAGES_MAP = {
  edit: {
    id: "app.component.table.edit",
    defaultMessage: "Edit {target}"
  },
  read: {
    id: "app.component.table.read",
    defaultMessage: "Read {target}"
  }
};
const LinkStyled = (0,styled_components_browser_esm["default"])((0,dist/* Link */.rU))`
  svg {
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }

  &:hover,
  &:focus {
    svg {
      path {
        fill: ${({ theme }) => theme.colors.neutral800};
      }
    }
  }
`;
const DefaultButton = ({ tokenName, tokenId, buttonType, children }) => {
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const {
    location: { pathname }
  } = (0,react_router/* useHistory */.k6)();
  return /* @__PURE__ */ react.createElement(
    LinkStyled,
    {
      to: `${pathname}/${tokenId}`,
      title: formatMessage(MESSAGES_MAP[buttonType], { target: tokenName })
    },
    children
  );
};
DefaultButton.propTypes = {
  tokenName: (prop_types_default()).string.isRequired,
  tokenId: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number]).isRequired,
  buttonType: (prop_types_default()).string,
  children: (prop_types_default()).node.isRequired
};
DefaultButton.defaultProps = {
  buttonType: "edit"
};
/* harmony default export */ const Table_DefaultButton = (DefaultButton);

;// CONCATENATED MODULE: ./.cache/admin/src/pages/SettingsPage/components/Tokens/Table/ReadButton/index.js




const ReadButton = ({ tokenName, tokenId }) => {
  return /* @__PURE__ */ react.createElement(Table_DefaultButton, { tokenName, tokenId, buttonType: "read" }, /* @__PURE__ */ react.createElement(Eye/* default */.Z, null));
};
ReadButton.propTypes = {
  tokenName: (prop_types_default()).string.isRequired,
  tokenId: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number]).isRequired
};
/* harmony default export */ const Table_ReadButton = (ReadButton);

// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/Pencil.mjs
var Pencil = __webpack_require__(2382);
;// CONCATENATED MODULE: ./.cache/admin/src/pages/SettingsPage/components/Tokens/Table/UpdateButton/index.js




const UpdateButton = ({ tokenName, tokenId }) => {
  return /* @__PURE__ */ react.createElement(Table_DefaultButton, { tokenName, tokenId }, /* @__PURE__ */ react.createElement(Pencil/* default */.Z, null));
};
UpdateButton.propTypes = {
  tokenName: (prop_types_default()).string.isRequired,
  tokenId: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number]).isRequired
};
/* harmony default export */ const Table_UpdateButton = (UpdateButton);

;// CONCATENATED MODULE: ./.cache/admin/src/pages/SettingsPage/components/Tokens/Table/index.js









const Table = ({
  permissions,
  headers,
  contentType,
  isLoading,
  tokens,
  onConfirmDelete,
  tokenType
}) => {
  const { canDelete, canUpdate, canRead } = permissions;
  return /* @__PURE__ */ react.createElement(
    dist/* DynamicTable */.tM,
    {
      headers,
      contentType,
      rows: tokens,
      withBulkActions: canDelete || canUpdate || canRead,
      isLoading,
      onConfirmDelete
    },
    /* @__PURE__ */ react.createElement(
      TableRows,
      {
        tokenType,
        permissions,
        onConfirmDelete
      }
    )
  );
};
Table.propTypes = {
  tokens: (prop_types_default()).array,
  permissions: prop_types_default().shape({
    canRead: (prop_types_default()).bool,
    canDelete: (prop_types_default()).bool,
    canUpdate: (prop_types_default()).bool
  }).isRequired,
  headers: prop_types_default().arrayOf(
    prop_types_default().shape({
      cellFormatter: (prop_types_default()).func,
      key: (prop_types_default()).string.isRequired,
      metadatas: prop_types_default().shape({
        label: (prop_types_default()).string.isRequired,
        sortable: (prop_types_default()).bool
      }).isRequired,
      name: (prop_types_default()).string.isRequired
    })
  ),
  contentType: (prop_types_default()).string.isRequired,
  isLoading: (prop_types_default()).bool,
  onConfirmDelete: (prop_types_default()).func,
  tokenType: (prop_types_default()).string.isRequired
};
Table.defaultProps = {
  tokens: [],
  headers: [],
  isLoading: false,
  onConfirmDelete() {
  }
};
/* harmony default export */ const Tokens_Table = (Table);
const TableRows = ({ tokenType, permissions, rows, withBulkActions, onConfirmDelete }) => {
  const { canDelete, canUpdate, canRead } = permissions;
  const [{ query }] = (0,dist/* useQueryParams */.Kx)();
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const [, sortOrder] = query ? query.sort.split(":") : "ASC";
  const {
    push,
    location: { pathname }
  } = (0,react_router/* useHistory */.k6)();
  const { trackUsage } = (0,dist/* useTracking */.rS)();
  const sortedTokens = rows.sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return sortOrder === "DESC" ? -comparison : comparison;
  });
  return /* @__PURE__ */ react.createElement(Tbody/* Tbody */.p, null, sortedTokens.map((token) => {
    return /* @__PURE__ */ react.createElement(
      Tr.Tr,
      {
        key: token.id,
        ...(0,dist/* onRowClick */.X7)({
          fn() {
            trackUsage("willEditTokenFromList", {
              tokenType
            });
            push(`${pathname}/${token.id}`);
          },
          condition: canUpdate
        })
      },
      /* @__PURE__ */ react.createElement(Cell.Td, { maxWidth: (0,dist/* pxToRem */.Q1)(250) }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { textColor: "neutral800", fontWeight: "bold", ellipsis: true }, token.name)),
      /* @__PURE__ */ react.createElement(Cell.Td, { maxWidth: (0,dist/* pxToRem */.Q1)(250) }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { textColor: "neutral800", ellipsis: true }, token.description)),
      /* @__PURE__ */ react.createElement(Cell.Td, null, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { textColor: "neutral800" }, /* @__PURE__ */ react.createElement(dist/* RelativeTime */.ij, { timestamp: new Date(token.createdAt) }))),
      /* @__PURE__ */ react.createElement(Cell.Td, null, token.lastUsedAt && /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { textColor: "neutral800" }, /* @__PURE__ */ react.createElement(
        dist/* RelativeTime */.ij,
        {
          timestamp: new Date(token.lastUsedAt),
          customIntervals: [
            {
              unit: "hours",
              threshold: 1,
              text: formatMessage({
                id: "Settings.apiTokens.lastHour",
                defaultMessage: "last hour"
              })
            }
          ]
        }
      ))),
      withBulkActions && /* @__PURE__ */ react.createElement(Cell.Td, null, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { justifyContent: "end" }, canUpdate && /* @__PURE__ */ react.createElement(Table_UpdateButton, { tokenName: token.name, tokenId: token.id }), !canUpdate && canRead && /* @__PURE__ */ react.createElement(Table_ReadButton, { tokenName: token.name, tokenId: token.id }), canDelete && /* @__PURE__ */ react.createElement(
        Table_DeleteButton,
        {
          tokenName: token.name,
          onClickDelete: () => onConfirmDelete(token.id),
          tokenType
        }
      )))
    );
  }));
};
TableRows.defaultProps = {
  rows: [],
  withBulkActions: false
};
TableRows.propTypes = {
  rows: (prop_types_default()).array,
  permissions: prop_types_default().shape({
    canRead: (prop_types_default()).bool,
    canDelete: (prop_types_default()).bool,
    canUpdate: (prop_types_default()).bool
  }).isRequired,
  onConfirmDelete: (prop_types_default()).func.isRequired,
  tokenType: (prop_types_default()).string.isRequired,
  withBulkActions: (prop_types_default()).bool
};


/***/ }),

/***/ 81966:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ API_TOKEN_TYPE),
/* harmony export */   f: () => (/* binding */ TRANSFER_TOKEN_TYPE)
/* harmony export */ });
const API_TOKEN_TYPE = "api-token";
const TRANSFER_TOKEN_TYPE = "transfer-token";


/***/ }),

/***/ 71362:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ ProtectedListView)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/dist/index.mjs + 15 modules
var dist = __webpack_require__(2317);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 21 modules
var es = __webpack_require__(86706);
// EXTERNAL MODULE: ./.cache/admin/src/pages/App/selectors.js
var selectors = __webpack_require__(36364);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Main/Main.mjs
var Main = __webpack_require__(40720);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/HeaderLayout.mjs + 2 modules
var HeaderLayout = __webpack_require__(90731);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/ContentLayout.mjs
var ContentLayout = __webpack_require__(34726);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/Plus.mjs
var Plus = __webpack_require__(83598);
// EXTERNAL MODULE: ./node_modules/qs/lib/index.js
var lib = __webpack_require__(80129);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);
// EXTERNAL MODULE: ./node_modules/react-intl/lib/src/components/useIntl.js
var useIntl = __webpack_require__(86896);
// EXTERNAL MODULE: ./node_modules/react-query/es/index.js
var react_query_es = __webpack_require__(88767);
// EXTERNAL MODULE: ./node_modules/react-router/esm/react-router.js
var react_router = __webpack_require__(16550);
// EXTERNAL MODULE: ./.cache/admin/src/pages/SettingsPage/components/Tokens/constants.js
var constants = __webpack_require__(81966);
// EXTERNAL MODULE: ./.cache/admin/src/pages/SettingsPage/components/Tokens/Table/index.js + 4 modules
var Table = __webpack_require__(92668);
;// CONCATENATED MODULE: ./.cache/admin/src/pages/SettingsPage/pages/ApiTokens/ListView/utils/tableHeaders.js
const tableHeaders = [
  {
    name: "name",
    key: "name",
    metadatas: {
      label: {
        id: "Settings.apiTokens.ListView.headers.name",
        defaultMessage: "Name"
      },
      sortable: true
    }
  },
  {
    name: "description",
    key: "description",
    metadatas: {
      label: {
        id: "Settings.apiTokens.ListView.headers.description",
        defaultMessage: "Description"
      },
      sortable: false
    }
  },
  {
    name: "createdAt",
    key: "createdAt",
    metadatas: {
      label: {
        id: "Settings.apiTokens.ListView.headers.createdAt",
        defaultMessage: "Created at"
      },
      sortable: false
    }
  },
  {
    name: "lastUsedAt",
    key: "lastUsedAt",
    metadatas: {
      label: {
        id: "Settings.apiTokens.ListView.headers.lastUsedAt",
        defaultMessage: "Last used"
      },
      sortable: false
    }
  }
];
/* harmony default export */ const utils_tableHeaders = (tableHeaders);

;// CONCATENATED MODULE: ./.cache/admin/src/pages/SettingsPage/pages/ApiTokens/ListView/index.js













const ApiTokenListView = () => {
  (0,dist/* useFocusWhenNavigate */.go)();
  const queryClient = (0,react_query_es.useQueryClient)();
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const toggleNotification = (0,dist/* useNotification */.lm)();
  const permissions = (0,es/* useSelector */.v9)(selectors/* selectAdminPermissions */._);
  const {
    allowedActions: { canCreate, canDelete, canUpdate, canRead }
  } = (0,dist/* useRBAC */.ss)(permissions.settings["api-tokens"]);
  const { push } = (0,react_router/* useHistory */.k6)();
  const { trackUsage } = (0,dist/* useTracking */.rS)();
  const { startSection } = (0,dist/* useGuidedTour */.c1)();
  const startSectionRef = react.useRef(startSection);
  const { get, del } = (0,dist/* useFetchClient */.kY)();
  const { formatAPIError } = (0,dist/* useAPIErrorHandler */.So)();
  react.useEffect(() => {
    if (startSectionRef.current) {
      startSectionRef.current("apiTokens");
    }
  }, []);
  react.useEffect(() => {
    push({ search: lib_default().stringify({ sort: "name:ASC" }, { encode: false }) });
  }, [push]);
  const headers = utils_tableHeaders.map((header) => ({
    ...header,
    metadatas: {
      ...header.metadatas,
      label: formatMessage(header.metadatas.label)
    }
  }));
  const { data: apiTokens, isLoading: isLoadingTokens } = (0,react_query_es.useQuery)(
    ["api-tokens"],
    async () => {
      trackUsage("willAccessTokenList", {
        tokenType: constants/* API_TOKEN_TYPE */.Z
      });
      const {
        data: { data }
      } = await get(`/admin/api-tokens`);
      trackUsage("didAccessTokenList", { number: data.length, tokenType: constants/* API_TOKEN_TYPE */.Z });
      return data;
    },
    {
      cacheTime: 0,
      enabled: canRead,
      onError(error) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(error)
        });
      }
    }
  );
  const isLoading = isLoadingTokens;
  const deleteMutation = (0,react_query_es.useMutation)(
    async (id) => {
      await del(`/admin/api-tokens/${id}`);
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries(["api-tokens"]);
        trackUsage("didDeleteToken");
      },
      onError(error) {
        toggleNotification({ type: "warning", message: formatAPIError(error) });
      }
    }
  );
  const hasApiTokens = apiTokens && apiTokens.length > 0;
  const shouldDisplayDynamicTable = canRead && hasApiTokens;
  const shouldDisplayNoContent = canRead && !hasApiTokens && !canCreate;
  const shouldDisplayNoContentWithCreationButton = canRead && !hasApiTokens && canCreate;
  return /* @__PURE__ */ react.createElement(Main/* Main */.o, { "aria-busy": isLoading }, /* @__PURE__ */ react.createElement(dist/* SettingsPageTitle */.SL, { name: "API Tokens" }), /* @__PURE__ */ react.createElement(
    HeaderLayout/* HeaderLayout */.T,
    {
      title: formatMessage({ id: "Settings.apiTokens.title", defaultMessage: "API Tokens" }),
      subtitle: formatMessage({
        id: "Settings.apiTokens.description",
        defaultMessage: "List of generated tokens to consume the API"
      }),
      primaryAction: canCreate && /* @__PURE__ */ react.createElement(
        dist/* LinkButton */.Qj,
        {
          "data-testid": "create-api-token-button",
          startIcon: /* @__PURE__ */ react.createElement(Plus/* default */.Z, null),
          size: "S",
          onClick: () => trackUsage("willAddTokenFromList", {
            tokenType: constants/* API_TOKEN_TYPE */.Z
          }),
          to: "/settings/api-tokens/create"
        },
        formatMessage({
          id: "Settings.apiTokens.create",
          defaultMessage: "Create new API Token"
        })
      )
    }
  ), /* @__PURE__ */ react.createElement(ContentLayout/* ContentLayout */.D, null, !canRead && /* @__PURE__ */ react.createElement(dist/* NoPermissions */.ZF, null), shouldDisplayDynamicTable && /* @__PURE__ */ react.createElement(
    Table/* default */.Z,
    {
      permissions: { canRead, canDelete, canUpdate },
      headers,
      contentType: "api-tokens",
      rows: apiTokens,
      isLoading,
      onConfirmDelete: (id) => deleteMutation.mutateAsync(id),
      tokens: apiTokens,
      tokenType: constants/* API_TOKEN_TYPE */.Z
    }
  ), shouldDisplayNoContentWithCreationButton && /* @__PURE__ */ react.createElement(
    dist/* NoContent */.dJ,
    {
      content: {
        id: "Settings.apiTokens.addFirstToken",
        defaultMessage: "Add your first API Token"
      },
      action: /* @__PURE__ */ react.createElement(dist/* LinkButton */.Qj, { variant: "secondary", startIcon: /* @__PURE__ */ react.createElement(Plus/* default */.Z, null), to: "/settings/api-tokens/create" }, formatMessage({
        id: "Settings.apiTokens.addNewToken",
        defaultMessage: "Add new API Token"
      }))
    }
  ), shouldDisplayNoContent && /* @__PURE__ */ react.createElement(
    dist/* NoContent */.dJ,
    {
      content: {
        id: "Settings.apiTokens.emptyStateLayout",
        defaultMessage: "You don\u2019t have any content yet..."
      }
    }
  )));
};
/* harmony default export */ const ListView = (ApiTokenListView);

;// CONCATENATED MODULE: ./.cache/admin/src/pages/SettingsPage/pages/ApiTokens/ProtectedListView/index.js





const ProtectedApiTokenListView = () => {
  const permissions = (0,es/* useSelector */.v9)(selectors/* selectAdminPermissions */._);
  return /* @__PURE__ */ react.createElement(dist/* CheckPagePermissions */.O4, { permissions: permissions.settings["api-tokens"].main }, /* @__PURE__ */ react.createElement(ListView, null));
};
/* harmony default export */ const ProtectedListView = (ProtectedApiTokenListView);


/***/ })

}]);