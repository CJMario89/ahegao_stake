"use strict";
exports.id = 588;
exports.ids = [588];
exports.modules = {

/***/ 9:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2210);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__]);
_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const Ball = ({ ...restProps })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Flex, {
        position: "absolute",
        w: "6px",
        h: "6px",
        borderRadius: "50%",
        backgroundColor: "#E686FF",
        zIndex: 2,
        justifyContent: "center",
        alignItems: "center",
        ...restProps,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
            w: "2px",
            h: "2px",
            borderRadius: "50%",
            m: "auto",
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        })
    });
};
const HeaderIcon = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Flex, {
        position: "absolute",
        top: "0px",
        h: "70px",
        w: "350px",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                id: "pink",
                w: "350px",
                h: "50px",
                backgroundColor: "#E686FF",
                position: "absolute",
                top: "0",
                left: "0"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                id: "pink",
                w: "350px",
                h: "0",
                borderTop: "20px solid #E686FF",
                borderRight: "30px solid transparent",
                position: "absolute",
                top: "50px",
                left: "0px"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                id: "pink",
                w: "3px",
                h: "50px",
                position: "absolute",
                backgroundColor: "#E686FF",
                top: "10px",
                left: "10px",
                zIndex: 1
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                id: "mask",
                w: "338px",
                h: "46px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                position: "absolute",
                top: "2px",
                left: "10px"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                id: "mask",
                w: "338px",
                h: "0",
                borderTop: "20px solid rgba(0, 0, 0, 0.5)",
                borderRight: "30px solid transparent",
                position: "absolute",
                top: "48px",
                left: "10px"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Ball, {
                right: "7px",
                top: "10px"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Ball, {
                right: "7px",
                top: "20px"
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeaderIcon);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3924:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const useScreenWidth = ()=>{
    const [screenWidth, setScreenWidth] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const onResize = (e)=>{
            setScreenWidth(e.target.innerWidth);
        };
        window.addEventListener("resize", onResize);
        return ()=>window.removeEventListener("resize", onResize);
    }, [
        screenWidth
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        setScreenWidth(window.innerWidth);
    }, []);
    const isMobile = screenWidth < 800;
    return {
        screenWidth,
        isMobile
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useScreenWidth);


/***/ })

};
;