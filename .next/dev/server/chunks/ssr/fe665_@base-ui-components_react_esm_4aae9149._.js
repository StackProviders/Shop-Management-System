module.exports = [
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/merge-props/mergeProps.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "makeEventPreventable",
    ()=>makeEventPreventable,
    "mergeClassNames",
    ()=>mergeClassNames,
    "mergeProps",
    ()=>mergeProps,
    "mergePropsN",
    ()=>mergePropsN
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$mergeObjects$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/mergeObjects.js [app-ssr] (ecmascript)");
;
const EMPTY_PROPS = {};
function mergeProps(a, b, c, d, e) {
    // We need to mutably own `merged`
    let merged = {
        ...resolvePropsGetter(a, EMPTY_PROPS)
    };
    if (b) {
        merged = mergeOne(merged, b);
    }
    if (c) {
        merged = mergeOne(merged, c);
    }
    if (d) {
        merged = mergeOne(merged, d);
    }
    if (e) {
        merged = mergeOne(merged, e);
    }
    return merged;
}
function mergePropsN(props) {
    if (props.length === 0) {
        return EMPTY_PROPS;
    }
    if (props.length === 1) {
        return resolvePropsGetter(props[0], EMPTY_PROPS);
    }
    // We need to mutably own `merged`
    let merged = {
        ...resolvePropsGetter(props[0], EMPTY_PROPS)
    };
    for(let i = 1; i < props.length; i += 1){
        merged = mergeOne(merged, props[i]);
    }
    return merged;
}
function mergeOne(merged, inputProps) {
    if (isPropsGetter(inputProps)) {
        return inputProps(merged);
    }
    return mutablyMergeInto(merged, inputProps);
}
/**
 * Merges two sets of props. In case of conflicts, the external props take precedence.
 */ function mutablyMergeInto(mergedProps, externalProps) {
    if (!externalProps) {
        return mergedProps;
    }
    // eslint-disable-next-line guard-for-in
    for(const propName in externalProps){
        const externalPropValue = externalProps[propName];
        switch(propName){
            case 'style':
                {
                    mergedProps[propName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$mergeObjects$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeObjects"])(mergedProps.style, externalPropValue);
                    break;
                }
            case 'className':
                {
                    mergedProps[propName] = mergeClassNames(mergedProps.className, externalPropValue);
                    break;
                }
            default:
                {
                    if (isEventHandler(propName, externalPropValue)) {
                        mergedProps[propName] = mergeEventHandlers(mergedProps[propName], externalPropValue);
                    } else {
                        mergedProps[propName] = externalPropValue;
                    }
                }
        }
    }
    return mergedProps;
}
function isEventHandler(key, value) {
    // This approach is more efficient than using a regex.
    const code0 = key.charCodeAt(0);
    const code1 = key.charCodeAt(1);
    const code2 = key.charCodeAt(2);
    return code0 === 111 /* o */  && code1 === 110 /* n */  && code2 >= 65 /* A */  && code2 <= 90 /* Z */  && (typeof value === 'function' || typeof value === 'undefined');
}
function isPropsGetter(inputProps) {
    return typeof inputProps === 'function';
}
function resolvePropsGetter(inputProps, previousProps) {
    if (isPropsGetter(inputProps)) {
        return inputProps(previousProps);
    }
    return inputProps ?? EMPTY_PROPS;
}
function mergeEventHandlers(ourHandler, theirHandler) {
    if (!theirHandler) {
        return ourHandler;
    }
    if (!ourHandler) {
        return theirHandler;
    }
    return (event)=>{
        if (isSyntheticEvent(event)) {
            const baseUIEvent = event;
            makeEventPreventable(baseUIEvent);
            const result = theirHandler(baseUIEvent);
            if (!baseUIEvent.baseUIHandlerPrevented) {
                ourHandler?.(baseUIEvent);
            }
            return result;
        }
        const result = theirHandler(event);
        ourHandler?.(event);
        return result;
    };
}
function makeEventPreventable(event) {
    event.preventBaseUIHandler = ()=>{
        event.baseUIHandlerPrevented = true;
    };
    return event;
}
function mergeClassNames(ourClassName, theirClassName) {
    if (theirClassName) {
        if (ourClassName) {
            // eslint-disable-next-line prefer-template
            return theirClassName + ' ' + ourClassName;
        }
        return theirClassName;
    }
    return ourClassName;
}
function isSyntheticEvent(event) {
    return event != null && typeof event === 'object' && 'nativeEvent' in event;
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/getStateAttributesProps.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStateAttributesProps",
    ()=>getStateAttributesProps
]);
function getStateAttributesProps(state, customMapping) {
    const props = {};
    /* eslint-disable-next-line guard-for-in */ for(const key in state){
        const value = state[key];
        if (customMapping?.hasOwnProperty(key)) {
            const customProps = customMapping[key](value);
            if (customProps != null) {
                Object.assign(props, customProps);
            }
            continue;
        }
        if (value === true) {
            props[`data-${key.toLowerCase()}`] = '';
        } else if (value) {
            props[`data-${key.toLowerCase()}`] = value.toString();
        }
    }
    return props;
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/resolveClassName.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * If the provided className is a string, it will be returned as is.
 * Otherwise, the function will call the className function with the state as the first argument.
 *
 * @param className
 * @param state
 */ __turbopack_context__.s([
    "resolveClassName",
    ()=>resolveClassName
]);
function resolveClassName(className, state) {
    return typeof className === 'function' ? className(state) : className;
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRenderElement",
    ()=>useRenderElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useMergedRefs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$reactVersion$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/reactVersion.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$mergeObjects$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/mergeObjects.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$getStateAttributesProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/getStateAttributesProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$resolveClassName$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/resolveClassName.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/merge-props/mergeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/empty.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
function useRenderElement(element, componentProps, params = {}) {
    const renderProp = componentProps.render;
    const outProps = useRenderElementProps(componentProps, params);
    if (params.enabled === false) {
        return null;
    }
    const state = params.state ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    return evaluateRenderProp(element, renderProp, outProps, state);
}
/**
 * Computes render element final props.
 */ function useRenderElementProps(componentProps, params = {}) {
    const { className: classNameProp, render: renderProp } = componentProps;
    const { state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"], ref, props, stateAttributesMapping, enabled = true } = params;
    const className = enabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$resolveClassName$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveClassName"])(classNameProp, state) : undefined;
    const stateProps = enabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$getStateAttributesProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStateAttributesProps"])(state, stateAttributesMapping) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    const outProps = enabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$mergeObjects$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeObjects"])(stateProps, Array.isArray(props) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergePropsN"])(props) : props) ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    // SAFETY: The `useMergedRefs` functions use a single hook to store the same value,
    // switching between them at runtime is safe. If this assertion fails, React will
    // throw at runtime anyway.
    // This also skips the `useMergedRefs` call on the server, which is fine because
    // refs are not used on the server side.
    /* eslint-disable react-hooks/rules-of-hooks */ if (typeof document !== 'undefined') {
        if (!enabled) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMergedRefs"])(null, null);
        } else if (Array.isArray(ref)) {
            outProps.ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMergedRefsN"])([
                outProps.ref,
                getChildRef(renderProp),
                ...ref
            ]);
        } else {
            outProps.ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMergedRefs"])(outProps.ref, getChildRef(renderProp), ref);
        }
    }
    if (!enabled) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    }
    if (className !== undefined) {
        outProps.className = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeClassNames"])(outProps.className, className);
    }
    return outProps;
}
function evaluateRenderProp(element, render, props, state) {
    if (render) {
        if (typeof render === 'function') {
            return render(props, state);
        }
        const mergedProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])(props, render.props);
        mergedProps.ref = props.ref;
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cloneElement"](render, mergedProps);
    }
    if (element) {
        if (typeof element === 'string') {
            return renderTag(element, props);
        }
    }
    // Unreachable, but the typings on `useRenderElement` need to be reworked
    // to annotate it correctly.
    throw new Error('Base UI: Render element or function are not defined.');
}
function renderTag(Tag, props) {
    if (Tag === 'button') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("button", {
            type: "button",
            ...props
        });
    }
    if (Tag === 'img') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("img", {
            alt: "",
            ...props
        });
    }
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](Tag, props);
}
function getChildRef(render) {
    if (render && typeof render !== 'function') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$reactVersion$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isReactVersionAtLeast"])(19) ? render.props.ref : render.ref;
    }
    return null;
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/use-render/useRender.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRender",
    ()=>useRender
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
;
function useRender(params) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])(params.defaultTagName ?? 'div', params, params);
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/index.parts.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/control/FieldControlDataAttributes.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldControlDataAttributes",
    ()=>FieldControlDataAttributes
]);
let FieldControlDataAttributes = /*#__PURE__*/ function(FieldControlDataAttributes) {
    /**
   * Present when the field is disabled.
   */ FieldControlDataAttributes["disabled"] = "data-disabled";
    /**
   * Present when the field is in valid state.
   */ FieldControlDataAttributes["valid"] = "data-valid";
    /**
   * Present when the field is in invalid state.
   */ FieldControlDataAttributes["invalid"] = "data-invalid";
    /**
   * Present when the field has been touched.
   */ FieldControlDataAttributes["touched"] = "data-touched";
    /**
   * Present when the field's value has changed.
   */ FieldControlDataAttributes["dirty"] = "data-dirty";
    /**
   * Present when the field is filled.
   */ FieldControlDataAttributes["filled"] = "data-filled";
    /**
   * Present when the field control is focused.
   */ FieldControlDataAttributes["focused"] = "data-focused";
    return FieldControlDataAttributes;
}({});
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/utils/constants.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_VALIDITY_STATE",
    ()=>DEFAULT_VALIDITY_STATE,
    "fieldValidityMapping",
    ()=>fieldValidityMapping
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$control$2f$FieldControlDataAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/control/FieldControlDataAttributes.js [app-ssr] (ecmascript)");
;
const DEFAULT_VALIDITY_STATE = {
    badInput: false,
    customError: false,
    patternMismatch: false,
    rangeOverflow: false,
    rangeUnderflow: false,
    stepMismatch: false,
    tooLong: false,
    tooShort: false,
    typeMismatch: false,
    valid: null,
    valueMissing: false
};
const fieldValidityMapping = {
    valid (value) {
        if (value === null) {
            return null;
        }
        if (value) {
            return {
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$control$2f$FieldControlDataAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldControlDataAttributes"].valid]: ''
            };
        }
        return {
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$control$2f$FieldControlDataAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldControlDataAttributes"].invalid]: ''
        };
    }
};
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/root/FieldRootContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldRootContext",
    ()=>FieldRootContext,
    "useFieldRootContext",
    ()=>useFieldRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/empty.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/utils/constants.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const FieldRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"]({
    invalid: undefined,
    controlId: undefined,
    setControlId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NOOP"],
    labelId: undefined,
    setLabelId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NOOP"],
    messageIds: [],
    setMessageIds: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NOOP"],
    name: undefined,
    validityData: {
        state: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_VALIDITY_STATE"],
        errors: [],
        error: '',
        value: '',
        initialValue: null
    },
    setValidityData: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NOOP"],
    disabled: undefined,
    touched: false,
    setTouched: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NOOP"],
    dirty: false,
    setDirty: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NOOP"],
    filled: false,
    setFilled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NOOP"],
    focused: false,
    setFocused: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NOOP"],
    validate: ()=>null,
    validationMode: 'onBlur',
    validationDebounceTime: 0,
    state: {
        disabled: false,
        valid: null,
        touched: false,
        dirty: false,
        filled: false,
        focused: false
    },
    markedDirtyRef: {
        current: false
    }
});
if ("TURBOPACK compile-time truthy", 1) FieldRootContext.displayName = "FieldRootContext";
function useFieldRootContext(optional = true) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](FieldRootContext);
    if (context.setControlId === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NOOP"] && !optional) {
        throw new Error('Base UI: FieldRootContext is missing. Field parts must be placed within <Field.Root>.');
    }
    return context;
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/fieldset/root/FieldsetRootContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldsetRootContext",
    ()=>FieldsetRootContext,
    "useFieldsetRootContext",
    ()=>useFieldsetRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
const FieldsetRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"]({
    legendId: undefined,
    setLegendId: ()=>{},
    disabled: undefined
});
if ("TURBOPACK compile-time truthy", 1) FieldsetRootContext.displayName = "FieldsetRootContext";
function useFieldsetRootContext() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](FieldsetRootContext);
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/form/FormContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FormContext",
    ()=>FormContext,
    "useFormContext",
    ()=>useFormContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/empty.js [app-ssr] (ecmascript)");
'use client';
;
;
const FormContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"]({
    formRef: {
        current: {
            fields: new Map()
        }
    },
    errors: {},
    clearErrors: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NOOP"]
});
if ("TURBOPACK compile-time truthy", 1) FormContext.displayName = "FormContext";
function useFormContext() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](FormContext);
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/root/FieldRoot.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldRoot",
    ()=>FieldRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/root/FieldRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/utils/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$fieldset$2f$root$2f$FieldsetRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/fieldset/root/FieldsetRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$form$2f$FormContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/form/FormContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
/**
 * Groups all parts of the field.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Field](https://base-ui.com/react/components/field)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const FieldRoot = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function FieldRoot(componentProps, forwardedRef) {
    const { render, className, validate: validateProp, validationDebounceTime = 0, validationMode = 'onBlur', name, disabled: disabledProp = false, invalid: invalidProp, ...elementProps } = componentProps;
    const { disabled: disabledFieldset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$fieldset$2f$root$2f$FieldsetRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldsetRootContext"])();
    const { errors } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$form$2f$FormContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFormContext"])();
    const validate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])(validateProp || (()=>null));
    const disabled = disabledFieldset || disabledProp;
    const [controlId, setControlId] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](undefined);
    const [labelId, setLabelId] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](undefined);
    const [messageIds, setMessageIds] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]([]);
    const [touched, setTouched] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [dirty, setDirtyUnwrapped] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [filled, setFilled] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [focused, setFocused] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const markedDirtyRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    const setDirty = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((value)=>{
        if (value) {
            markedDirtyRef.current = true;
        }
        setDirtyUnwrapped(value);
    }, []);
    const invalid = Boolean(invalidProp || name && ({}).hasOwnProperty.call(errors, name) && errors[name] !== undefined);
    const [validityData, setValidityData] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]({
        state: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_VALIDITY_STATE"],
        error: '',
        errors: [],
        value: null,
        initialValue: null
    });
    const valid = !invalid && validityData.state.valid;
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            disabled,
            touched,
            dirty,
            valid,
            filled,
            focused
        }), [
        disabled,
        touched,
        dirty,
        valid,
        filled,
        focused
    ]);
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            invalid,
            controlId,
            setControlId,
            labelId,
            setLabelId,
            messageIds,
            setMessageIds,
            name,
            validityData,
            setValidityData,
            disabled,
            touched,
            setTouched,
            dirty,
            setDirty,
            filled,
            setFilled,
            focused,
            setFocused,
            validate,
            validationMode,
            validationDebounceTime,
            state,
            markedDirtyRef
        }), [
        invalid,
        controlId,
        labelId,
        messageIds,
        name,
        validityData,
        disabled,
        touched,
        dirty,
        setDirty,
        filled,
        setFilled,
        focused,
        setFocused,
        validate,
        validationMode,
        validationDebounceTime,
        state
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: forwardedRef,
        state,
        props: elementProps,
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fieldValidityMapping"]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldRootContext"].Provider, {
        value: contextValue,
        children: element
    });
});
if ("TURBOPACK compile-time truthy", 1) FieldRoot.displayName = "FieldRoot";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/constants.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACTIVE_KEY",
    ()=>ACTIVE_KEY,
    "ARROW_DOWN",
    ()=>ARROW_DOWN,
    "ARROW_LEFT",
    ()=>ARROW_LEFT,
    "ARROW_RIGHT",
    ()=>ARROW_RIGHT,
    "ARROW_UP",
    ()=>ARROW_UP,
    "FOCUSABLE_ATTRIBUTE",
    ()=>FOCUSABLE_ATTRIBUTE,
    "SELECTED_KEY",
    ()=>SELECTED_KEY,
    "TYPEABLE_SELECTOR",
    ()=>TYPEABLE_SELECTOR
]);
const FOCUSABLE_ATTRIBUTE = 'data-base-ui-focusable';
const ACTIVE_KEY = 'active';
const SELECTED_KEY = 'selected';
const TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled])," + "[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/element.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "activeElement",
    ()=>activeElement,
    "contains",
    ()=>contains,
    "getDocument",
    ()=>getDocument,
    "getFloatingFocusElement",
    ()=>getFloatingFocusElement,
    "getTarget",
    ()=>getTarget,
    "isEventTargetWithin",
    ()=>isEventTargetWithin,
    "isRootElement",
    ()=>isRootElement,
    "isTypeableCombobox",
    ()=>isTypeableCombobox,
    "isTypeableElement",
    ()=>isTypeableElement,
    "matchesFocusVisible",
    ()=>matchesFocusVisible
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.10/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/detectBrowser.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/constants.js [app-ssr] (ecmascript)");
;
;
;
function activeElement(doc) {
    let element = doc.activeElement;
    while(element?.shadowRoot?.activeElement != null){
        element = element.shadowRoot.activeElement;
    }
    return element;
}
function contains(parent, child) {
    if (!parent || !child) {
        return false;
    }
    const rootNode = child.getRootNode?.();
    // First, attempt with faster native method
    if (parent.contains(child)) {
        return true;
    }
    // then fallback to custom implementation with Shadow DOM support
    if (rootNode && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isShadowRoot"])(rootNode)) {
        let next = child;
        while(next){
            if (parent === next) {
                return true;
            }
            next = next.parentNode || next.host;
        }
    }
    // Give up, the result is false
    return false;
}
function getTarget(event) {
    if ('composedPath' in event) {
        return event.composedPath()[0];
    }
    // TS thinks `event` is of type never as it assumes all browsers support
    // `composedPath()`, but browsers without shadow DOM don't.
    return event.target;
}
function isEventTargetWithin(event, node) {
    if (node == null) {
        return false;
    }
    if ('composedPath' in event) {
        return event.composedPath().includes(node);
    }
    // TS thinks `event` is of type never as it assumes all browsers support composedPath, but browsers without shadow dom don't
    const eventAgain = event;
    return eventAgain.target != null && node.contains(eventAgain.target);
}
function isRootElement(element) {
    return element.matches('html,body');
}
function getDocument(node) {
    return node?.ownerDocument || document;
}
function isTypeableElement(element) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"])(element) && element.matches(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TYPEABLE_SELECTOR"]);
}
function isTypeableCombobox(element) {
    if (!element) {
        return false;
    }
    return element.getAttribute('role') === 'combobox' && isTypeableElement(element);
}
function matchesFocusVisible(element) {
    // We don't want to block focus from working with `visibleOnly`
    // (JSDOM doesn't match `:focus-visible` when the element has `:focus`)
    if (!element || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isJSDOM"]) {
        return true;
    }
    try {
        return element.matches(':focus-visible');
    } catch (_e) {
        return true;
    }
}
function getFloatingFocusElement(floatingElement) {
    if (!floatingElement) {
        return null;
    }
    // Try to find the element that has `{...getFloatingProps()}` spread on it.
    // This indicates the floating element is acting as a positioning wrapper, and
    // so focus should be managed on the child element with the event handlers and
    // aria props.
    return floatingElement.hasAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FOCUSABLE_ATTRIBUTE"]) ? floatingElement : floatingElement.querySelector(`[${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FOCUSABLE_ATTRIBUTE"]}]`) || floatingElement;
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBaseUiId",
    ()=>useBaseUiId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useId.js [app-ssr] (ecmascript)");
'use client';
;
function useBaseUiId(idOverride) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])(idOverride, 'base-ui');
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/label/FieldLabel.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldLabel",
    ()=>FieldLabel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/element.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/root/FieldRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/utils/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const FieldLabel = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function FieldLabel(componentProps, forwardedRef) {
    const { render, className, id: idProp, ...elementProps } = componentProps;
    const { labelId, setLabelId, state, controlId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldRootContext"])(false);
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    const htmlFor = controlId ?? undefined;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (controlId != null || idProp) {
            setLabelId(id);
        }
        return ()=>{
            setLabelId(undefined);
        };
    }, [
        controlId,
        id,
        idProp,
        setLabelId
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('label', componentProps, {
        ref: forwardedRef,
        state,
        props: [
            {
                id: labelId,
                htmlFor,
                onMouseDown (event) {
                    const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTarget"])(event.nativeEvent);
                    if (target?.closest('button,input,select,textarea')) {
                        return;
                    }
                    // Prevent text selection when double clicking label.
                    if (!event.defaultPrevented && event.detail > 1) {
                        event.preventDefault();
                    }
                }
            },
            elementProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fieldValidityMapping"]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) FieldLabel.displayName = "FieldLabel";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/error/FieldError.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldError",
    ()=>FieldError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/root/FieldRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/utils/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$form$2f$FormContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/form/FormContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const FieldError = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function FieldError(componentProps, forwardedRef) {
    const { render, id: idProp, className, match, ...elementProps } = componentProps;
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    const { validityData, state, name, setMessageIds } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldRootContext"])(false);
    const { errors } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$form$2f$FormContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFormContext"])();
    const formError = name ? errors[name] : null;
    let rendered = false;
    if (formError || match === true) {
        rendered = true;
    } else if (match) {
        rendered = Boolean(validityData.state[match]);
    } else {
        rendered = validityData.state.valid === false;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (!rendered || !id) {
            return undefined;
        }
        setMessageIds((v)=>v.concat(id));
        return ()=>{
            setMessageIds((v)=>v.filter((item)=>item !== id));
        };
    }, [
        rendered,
        id,
        setMessageIds
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        ref: forwardedRef,
        state,
        props: [
            {
                id,
                children: formError || (validityData.errors.length > 1 ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]('ul', {}, validityData.errors.map((message)=>/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]('li', {
                        key: message
                    }, message))) : validityData.error)
            },
            elementProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fieldValidityMapping"]
    });
    if (!rendered) {
        return null;
    }
    return element;
});
if ("TURBOPACK compile-time truthy", 1) FieldError.displayName = "FieldError";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/description/FieldDescription.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldDescription",
    ()=>FieldDescription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/root/FieldRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/utils/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const FieldDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function FieldDescription(componentProps, forwardedRef) {
    const { render, id: idProp, className, ...elementProps } = componentProps;
    const { state } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldRootContext"])(false);
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    const { setMessageIds } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldRootContext"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (!id) {
            return undefined;
        }
        setMessageIds((v)=>v.concat(id));
        return ()=>{
            setMessageIds((v)=>v.filter((item)=>item !== id));
        };
    }, [
        id,
        setMessageIds
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('p', componentProps, {
        ref: forwardedRef,
        state,
        props: [
            {
                id
            },
            elementProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fieldValidityMapping"]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) FieldDescription.displayName = "FieldDescription";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/utils/getCombinedFieldValidityData.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Combines the field's client-side, stateful validity data with the external invalid state to
 * determine the field's true validity.
 */ __turbopack_context__.s([
    "getCombinedFieldValidityData",
    ()=>getCombinedFieldValidityData
]);
function getCombinedFieldValidityData(validityData, invalid) {
    return {
        ...validityData,
        state: {
            ...validityData.state,
            valid: !invalid && validityData.state.valid
        }
    };
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/useField.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useField",
    ()=>useField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useLatestRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useLatestRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/utils/getCombinedFieldValidityData.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$form$2f$FormContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/form/FormContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/root/FieldRootContext.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
function useField(params) {
    const { formRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$form$2f$FormContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFormContext"])();
    const { invalid, markedDirtyRef, validityData, setValidityData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldRootContext"])();
    const { enabled = true, value, id, name, controlRef, commitValidation } = params;
    const getValueRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useLatestRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLatestRef"])(params.getValue);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (!enabled) {
            return;
        }
        let initialValue = value;
        if (initialValue === undefined) {
            initialValue = getValueRef.current?.();
        }
        if (validityData.initialValue === null && initialValue !== validityData.initialValue) {
            setValidityData((prev)=>({
                    ...prev,
                    initialValue
                }));
        }
    }, [
        enabled,
        setValidityData,
        value,
        validityData.initialValue,
        getValueRef
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (!enabled) {
            return;
        }
        if (id) {
            formRef.current.fields.set(id, {
                controlRef,
                validityData: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCombinedFieldValidityData"])(validityData, invalid),
                validate () {
                    let nextValue = value;
                    if (nextValue === undefined) {
                        nextValue = getValueRef.current?.();
                    }
                    markedDirtyRef.current = true;
                    // Synchronously update the validity state so the submit event can be prevented.
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["flushSync"](()=>commitValidation(nextValue));
                },
                getValueRef,
                name
            });
        }
    }, [
        commitValidation,
        controlRef,
        enabled,
        formRef,
        getValueRef,
        id,
        invalid,
        markedDirtyRef,
        name,
        validityData,
        value
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        const fields = formRef.current.fields;
        return ()=>{
            if (id) {
                fields.delete(id);
            }
        };
    }, [
        formRef,
        id
    ]);
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/control/useFieldControlValidation.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFieldControlValidation",
    ()=>useFieldControlValidation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useTimeout.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/root/FieldRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/merge-props/mergeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/utils/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$form$2f$FormContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/form/FormContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/utils/getCombinedFieldValidityData.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const validityKeys = Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_VALIDITY_STATE"]);
function isOnlyValueMissing(state) {
    if (!state || state.valid || !state.valueMissing) {
        return false;
    }
    let onlyValueMissing = false;
    for (const key of validityKeys){
        if (key === 'valid') {
            continue;
        }
        if (key === 'valueMissing') {
            onlyValueMissing = state[key];
        }
        if (state[key]) {
            onlyValueMissing = false;
        }
    }
    return onlyValueMissing;
}
function useFieldControlValidation() {
    const { setValidityData, validate, messageIds, validityData, validationMode, validationDebounceTime, invalid, markedDirtyRef, controlId, state, name } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldRootContext"])();
    const { formRef, clearErrors } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$form$2f$FormContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFormContext"])();
    const timeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTimeout"])();
    const inputRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const commitValidation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])(async (value, revalidate = false)=>{
        const element = inputRef.current;
        if (!element) {
            return;
        }
        if (revalidate) {
            if (state.valid !== false) {
                return;
            }
            const currentNativeValidity = element.validity;
            if (!currentNativeValidity.valueMissing) {
                // The 'valueMissing' (required) condition has been resolved by the user typing.
                // Temporarily mark the field as valid for this onChange event.
                // Other native errors (e.g., typeMismatch) will be caught by full validation on blur or submit.
                const nextValidityData = {
                    value,
                    state: {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_VALIDITY_STATE"],
                        valid: true
                    },
                    error: '',
                    errors: [],
                    initialValue: validityData.initialValue
                };
                element.setCustomValidity('');
                if (controlId) {
                    const currentFieldData = formRef.current.fields.get(controlId);
                    if (currentFieldData) {
                        formRef.current.fields.set(controlId, {
                            ...currentFieldData,
                            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCombinedFieldValidityData"])(nextValidityData, false) // invalid = false
                        });
                    }
                }
                setValidityData(nextValidityData);
                return;
            }
            // Value is still missing, or other conditions apply.
            // Let's use a representation of current validity for isOnlyValueMissing.
            const currentNativeValidityObject = validityKeys.reduce((acc, key)=>{
                acc[key] = currentNativeValidity[key];
                return acc;
            }, {});
            // If it's (still) natively invalid due to something other than just valueMissing,
            // then bail from this revalidation on change to avoid "scolding" for other errors.
            if (!currentNativeValidityObject.valid && !isOnlyValueMissing(currentNativeValidityObject)) {
                return;
            }
        // If valueMissing is still true AND it's the only issue, or if the field is now natively valid,
        // let it fall through to the main validation logic below.
        }
        function getState(el) {
            const computedState = validityKeys.reduce((acc, key)=>{
                acc[key] = el.validity[key];
                return acc;
            }, {});
            let hasOnlyValueMissingError = false;
            for (const key of validityKeys){
                if (key === 'valid') {
                    continue;
                }
                if (key === 'valueMissing' && computedState[key]) {
                    hasOnlyValueMissingError = true;
                } else if (computedState[key]) {
                    return computedState;
                }
            }
            // Only make `valueMissing` mark the field invalid if it's been changed
            // to reduce error noise.
            if (hasOnlyValueMissingError && !markedDirtyRef.current) {
                computedState.valid = true;
                computedState.valueMissing = false;
            }
            return computedState;
        }
        timeout.clear();
        let result = null;
        let validationErrors = [];
        const nextState = getState(element);
        let defaultValidationMessage;
        if (element.validationMessage) {
            defaultValidationMessage = element.validationMessage;
            validationErrors = [
                element.validationMessage
            ];
        } else {
            const formValues = Array.from(formRef.current.fields.values()).reduce((acc, field)=>{
                if (field.name && field.getValueRef) {
                    acc[field.name] = field.getValueRef.current?.();
                }
                return acc;
            }, {});
            const resultOrPromise = validate(value, formValues);
            if (typeof resultOrPromise === 'object' && resultOrPromise !== null && 'then' in resultOrPromise) {
                result = await resultOrPromise;
            } else {
                result = resultOrPromise;
            }
            if (result !== null) {
                nextState.valid = false;
                nextState.customError = true;
                if (Array.isArray(result)) {
                    validationErrors = result;
                    element.setCustomValidity(result.join('\n'));
                } else if (result) {
                    validationErrors = [
                        result
                    ];
                    element.setCustomValidity(result);
                }
            }
        }
        const nextValidityData = {
            value,
            state: nextState,
            error: defaultValidationMessage ?? (Array.isArray(result) ? result[0] : result ?? ''),
            errors: validationErrors,
            initialValue: validityData.initialValue
        };
        if (controlId) {
            const currentFieldData = formRef.current.fields.get(controlId);
            if (currentFieldData) {
                formRef.current.fields.set(controlId, {
                    ...currentFieldData,
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCombinedFieldValidityData"])(nextValidityData, invalid)
                });
            }
        }
        setValidityData(nextValidityData);
    });
    const getValidationProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((externalProps = {})=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])({
            ...messageIds.length && {
                'aria-describedby': messageIds.join(' ')
            },
            ...state.valid === false && {
                'aria-invalid': true
            }
        }, externalProps), [
        messageIds,
        state.valid
    ]);
    const getInputValidationProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((externalProps = {})=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])({
            onChange (event) {
                // Workaround for https://github.com/facebook/react/issues/9023
                if (event.nativeEvent.defaultPrevented) {
                    return;
                }
                clearErrors(name);
                if (validationMode !== 'onChange') {
                    commitValidation(event.currentTarget.value, true);
                    return;
                }
                if (invalid) {
                    return;
                }
                const element = event.currentTarget;
                if (element.value === '') {
                    // Ignore the debounce time for empty values.
                    commitValidation(element.value);
                    return;
                }
                timeout.clear();
                if (validationDebounceTime) {
                    timeout.start(validationDebounceTime, ()=>{
                        commitValidation(element.value);
                    });
                } else {
                    commitValidation(element.value);
                }
            }
        }, getValidationProps(externalProps)), [
        getValidationProps,
        clearErrors,
        name,
        timeout,
        commitValidation,
        invalid,
        validationMode,
        validationDebounceTime
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            getValidationProps,
            getInputValidationProps,
            inputRef,
            commitValidation
        }), [
        getValidationProps,
        getInputValidationProps,
        commitValidation
    ]);
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/createBaseUIEventDetails.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createChangeEventDetails",
    ()=>createChangeEventDetails,
    "createGenericEventDetails",
    ()=>createGenericEventDetails
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/empty.js [app-ssr] (ecmascript)");
;
function createChangeEventDetails(reason, event, customProperties) {
    let canceled = false;
    let allowPropagation = false;
    const custom = customProperties ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    return {
        reason,
        event: event ?? new Event('base-ui'),
        cancel () {
            canceled = true;
        },
        allowPropagation () {
            allowPropagation = true;
        },
        get isCanceled () {
            return canceled;
        },
        get isPropagationAllowed () {
            return allowPropagation;
        },
        ...custom
    };
}
function createGenericEventDetails(reason, event, custom) {
    const customProperties = custom ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"];
    return {
        reason,
        event: event ?? new Event('base-ui'),
        ...customProperties
    };
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/control/FieldControl.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldControl",
    ()=>FieldControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useControlled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useControlled.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/root/FieldRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/utils/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$useField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/useField.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$control$2f$useFieldControlValidation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/control/useFieldControlValidation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/createBaseUIEventDetails.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
const FieldControl = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function FieldControl(componentProps, forwardedRef) {
    const { render, className, id: idProp, name: nameProp, value: valueProp, disabled: disabledProp = false, onValueChange, defaultValue, ...elementProps } = componentProps;
    const { state: fieldState, name: fieldName, disabled: fieldDisabled } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldRootContext"])();
    const disabled = fieldDisabled || disabledProp;
    const name = fieldName ?? nameProp;
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            ...fieldState,
            disabled
        }), [
        fieldState,
        disabled
    ]);
    const { setControlId, labelId, setTouched, setDirty, validityData, setFocused, setFilled, validationMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldRootContext"])();
    const { getValidationProps, getInputValidationProps, commitValidation, inputRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$control$2f$useFieldControlValidation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldControlValidation"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        setControlId(id);
        return ()=>{
            setControlId(undefined);
        };
    }, [
        id,
        setControlId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        const hasExternalValue = valueProp != null;
        if (inputRef.current?.value || hasExternalValue && valueProp !== '') {
            setFilled(true);
        } else if (hasExternalValue && valueProp === '') {
            setFilled(false);
        }
    }, [
        inputRef,
        setFilled,
        valueProp
    ]);
    const [value, setValueUnwrapped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useControlled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useControlled"])({
        controlled: valueProp,
        default: defaultValue,
        name: 'FieldControl',
        state: 'value'
    });
    const isControlled = valueProp !== undefined;
    const setValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((nextValue, eventDetails)=>{
        onValueChange?.(nextValue, eventDetails);
        if (eventDetails.isCanceled) {
            return;
        }
        setValueUnwrapped(nextValue);
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$useField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useField"])({
        id,
        name,
        commitValidation,
        value,
        getValue: ()=>inputRef.current?.value,
        controlRef: inputRef
    });
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('input', componentProps, {
        ref: forwardedRef,
        state,
        props: [
            {
                id,
                disabled,
                name,
                ref: inputRef,
                'aria-labelledby': labelId,
                ...isControlled ? {
                    value
                } : {
                    defaultValue
                },
                onChange (event) {
                    const inputValue = event.currentTarget.value;
                    setValue(inputValue, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])('none', event.nativeEvent));
                    setDirty(inputValue !== validityData.initialValue);
                    setFilled(inputValue !== '');
                },
                onFocus () {
                    setFocused(true);
                },
                onBlur (event) {
                    setTouched(true);
                    setFocused(false);
                    if (validationMode === 'onBlur') {
                        commitValidation(event.currentTarget.value);
                    }
                },
                onKeyDown (event) {
                    if (event.currentTarget.tagName === 'INPUT' && event.key === 'Enter') {
                        setTouched(true);
                        commitValidation(event.currentTarget.value);
                    }
                }
            },
            getValidationProps(),
            getInputValidationProps(),
            elementProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fieldValidityMapping"]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) FieldControl.displayName = "FieldControl";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/validity/FieldValidity.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldValidity",
    ()=>FieldValidity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/root/FieldRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/utils/getCombinedFieldValidityData.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const FieldValidity = function FieldValidity(props) {
    const { children } = props;
    const { validityData, invalid } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$root$2f$FieldRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldRootContext"])(false);
    const fieldValidityState = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const combinedFieldValidityData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$utils$2f$getCombinedFieldValidityData$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCombinedFieldValidityData"])(validityData, invalid);
        return {
            ...combinedFieldValidityData,
            validity: combinedFieldValidityData.state
        };
    }, [
        validityData,
        invalid
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children(fieldValidityState)
    });
};
if ("TURBOPACK compile-time truthy", 1) FieldValidity.displayName = "FieldValidity";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/index.parts.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Control",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$control$2f$FieldControl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldControl"],
    "Description",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$description$2f$FieldDescription$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldDescription"],
    "Error",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$error$2f$FieldError$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldError"],
    "Label",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$label$2f$FieldLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldLabel"],
    "Root",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$root$2f$FieldRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldRoot"],
    "Validity",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$validity$2f$FieldValidity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldValidity"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/index.parts.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$root$2f$FieldRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/root/FieldRoot.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$label$2f$FieldLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/label/FieldLabel.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$error$2f$FieldError$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/error/FieldError.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$description$2f$FieldDescription$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/description/FieldDescription.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$control$2f$FieldControl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/control/FieldControl.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$validity$2f$FieldValidity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/validity/FieldValidity.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/index.parts.js [app-ssr] (ecmascript) <export * as Field>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Field",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/index.parts.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/input/Input.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Field$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/field/index.parts.js [app-ssr] (ecmascript) <export * as Field>");
/**
 * A native input element that automatically works with [Field](https://base-ui.com/react/components/field).
 * Renders an `<input>` element.
 *
 * Documentation: [Base UI Input](https://base-ui.com/react/components/input)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function Input(props, forwardedRef) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$field$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Field$3e$__["Field"].Control, {
        ref: forwardedRef,
        ...props
    });
});
if ("TURBOPACK compile-time truthy", 1) Input.displayName = "Input";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/index.parts.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
;
;
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/DialogRootContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogRootContext",
    ()=>DialogRootContext,
    "useDialogRootContext",
    ()=>useDialogRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
const DialogRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) DialogRootContext.displayName = "DialogRootContext";
function useDialogRootContext(optional) {
    const dialogRootContext = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](DialogRootContext);
    if (optional === false && dialogRootContext === undefined) {
        throw new Error('Base UI: DialogRootContext is missing. Dialog parts must be placed within <Dialog.Root>.');
    }
    return dialogRootContext;
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/stateAttributesMapping.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TransitionStatusDataAttributes",
    ()=>TransitionStatusDataAttributes,
    "transitionStatusMapping",
    ()=>transitionStatusMapping
]);
let TransitionStatusDataAttributes = /*#__PURE__*/ function(TransitionStatusDataAttributes) {
    /**
   * Present when the component is animating in.
   */ TransitionStatusDataAttributes["startingStyle"] = "data-starting-style";
    /**
   * Present when the component is animating out.
   */ TransitionStatusDataAttributes["endingStyle"] = "data-ending-style";
    return TransitionStatusDataAttributes;
}({});
const STARTING_HOOK = {
    [TransitionStatusDataAttributes.startingStyle]: ''
};
const ENDING_HOOK = {
    [TransitionStatusDataAttributes.endingStyle]: ''
};
const transitionStatusMapping = {
    transitionStatus (value) {
        if (value === 'starting') {
            return STARTING_HOOK;
        }
        if (value === 'ending') {
            return ENDING_HOOK;
        }
        return null;
    }
};
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommonPopupDataAttributes",
    ()=>CommonPopupDataAttributes,
    "CommonTriggerDataAttributes",
    ()=>CommonTriggerDataAttributes,
    "popupStateMapping",
    ()=>popupStateMapping,
    "pressableTriggerOpenStateMapping",
    ()=>pressableTriggerOpenStateMapping,
    "triggerOpenStateMapping",
    ()=>triggerOpenStateMapping
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/stateAttributesMapping.js [app-ssr] (ecmascript)");
;
let CommonPopupDataAttributes = function(CommonPopupDataAttributes) {
    /**
   * Present when the popup is open.
   */ CommonPopupDataAttributes["open"] = "data-open";
    /**
   * Present when the popup is closed.
   */ CommonPopupDataAttributes["closed"] = "data-closed";
    /**
   * Present when the popup is animating in.
   */ CommonPopupDataAttributes[CommonPopupDataAttributes["startingStyle"] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TransitionStatusDataAttributes"].startingStyle] = "startingStyle";
    /**
   * Present when the popup is animating out.
   */ CommonPopupDataAttributes[CommonPopupDataAttributes["endingStyle"] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TransitionStatusDataAttributes"].endingStyle] = "endingStyle";
    /**
   * Present when the anchor is hidden.
   */ CommonPopupDataAttributes["anchorHidden"] = "data-anchor-hidden";
    return CommonPopupDataAttributes;
}({});
let CommonTriggerDataAttributes = /*#__PURE__*/ function(CommonTriggerDataAttributes) {
    /**
   * Present when the popup is open.
   */ CommonTriggerDataAttributes["popupOpen"] = "data-popup-open";
    /**
   * Present when a pressable trigger is pressed.
   */ CommonTriggerDataAttributes["pressed"] = "data-pressed";
    return CommonTriggerDataAttributes;
}({});
const TRIGGER_HOOK = {
    [CommonTriggerDataAttributes.popupOpen]: ''
};
const PRESSABLE_TRIGGER_HOOK = {
    [CommonTriggerDataAttributes.popupOpen]: '',
    [CommonTriggerDataAttributes.pressed]: ''
};
const POPUP_OPEN_HOOK = {
    [CommonPopupDataAttributes.open]: ''
};
const POPUP_CLOSED_HOOK = {
    [CommonPopupDataAttributes.closed]: ''
};
const ANCHOR_HIDDEN_HOOK = {
    [CommonPopupDataAttributes.anchorHidden]: ''
};
const triggerOpenStateMapping = {
    open (value) {
        if (value) {
            return TRIGGER_HOOK;
        }
        return null;
    }
};
const pressableTriggerOpenStateMapping = {
    open (value) {
        if (value) {
            return PRESSABLE_TRIGGER_HOOK;
        }
        return null;
    }
};
const popupStateMapping = {
    open (value) {
        if (value) {
            return POPUP_OPEN_HOOK;
        }
        return POPUP_CLOSED_HOOK;
    },
    anchorHidden (value) {
        if (value) {
            return ANCHOR_HIDDEN_HOOK;
        }
        return null;
    }
};
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/backdrop/DialogBackdrop.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogBackdrop",
    ()=>DialogBackdrop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/DialogRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/stateAttributesMapping.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const stateAttributesMapping = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["popupStateMapping"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transitionStatusMapping"]
};
const DialogBackdrop = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function DialogBackdrop(componentProps, forwardedRef) {
    const { render, className, forceRender = false, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const open = store.useState('open');
    const nested = store.useState('nested');
    const mounted = store.useState('mounted');
    const transitionStatus = store.useState('transitionStatus');
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            open,
            transitionStatus
        }), [
        open,
        transitionStatus
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        ref: [
            store.context.backdropRef,
            forwardedRef
        ],
        stateAttributesMapping,
        props: [
            {
                role: 'presentation',
                hidden: !mounted,
                style: {
                    userSelect: 'none',
                    WebkitUserSelect: 'none'
                }
            },
            elementProps
        ],
        enabled: forceRender || !nested
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogBackdrop.displayName = "DialogBackdrop";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/root/CompositeRootContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompositeRootContext",
    ()=>CompositeRootContext,
    "useCompositeRootContext",
    ()=>useCompositeRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
const CompositeRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) CompositeRootContext.displayName = "CompositeRootContext";
function useCompositeRootContext(optional = false) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](CompositeRootContext);
    if (context === undefined && !optional) {
        throw new Error('Base UI: CompositeRootContext is missing. Composite parts must be placed within <Composite.Root>.');
    }
    return context;
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useFocusableWhenDisabled.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFocusableWhenDisabled",
    ()=>useFocusableWhenDisabled
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
function useFocusableWhenDisabled(parameters) {
    const { focusableWhenDisabled, disabled, composite = false, tabIndex: tabIndexProp = 0, isNativeButton } = parameters;
    const isFocusableComposite = composite && focusableWhenDisabled !== false;
    const isNonFocusableComposite = composite && focusableWhenDisabled === false;
    // we can't explicitly assign `undefined` to any of these props because it
    // would otherwise prevent subsequently merged props from setting them
    const props = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const additionalProps = {
            // allow Tabbing away from focusableWhenDisabled elements
            onKeyDown (event) {
                if (disabled && focusableWhenDisabled && event.key !== 'Tab') {
                    event.preventDefault();
                }
            }
        };
        if (!composite) {
            additionalProps.tabIndex = tabIndexProp;
            if (!isNativeButton && disabled) {
                additionalProps.tabIndex = focusableWhenDisabled ? tabIndexProp : -1;
            }
        }
        if (isNativeButton && (focusableWhenDisabled || isFocusableComposite) || !isNativeButton && disabled) {
            additionalProps['aria-disabled'] = disabled;
        }
        if (isNativeButton && (!focusableWhenDisabled || isNonFocusableComposite)) {
            additionalProps.disabled = disabled;
        }
        return additionalProps;
    }, [
        composite,
        disabled,
        focusableWhenDisabled,
        isFocusableComposite,
        isNonFocusableComposite,
        isNativeButton,
        tabIndexProp
    ]);
    return {
        props
    };
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/use-button/useButton.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useButton",
    ()=>useButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.10/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/error.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/merge-props/mergeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/root/CompositeRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useFocusableWhenDisabled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useFocusableWhenDisabled.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function useButton(parameters = {}) {
    const { disabled = false, focusableWhenDisabled, tabIndex = 0, native: isNativeButton = true } = parameters;
    const elementRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const isCompositeItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompositeRootContext"])(true) !== undefined;
    const isValidLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])(()=>{
        const element = elementRef.current;
        return Boolean(element?.tagName === 'A' && element?.href);
    });
    const { props: focusableWhenDisabledProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useFocusableWhenDisabled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFocusableWhenDisabled"])({
        focusableWhenDisabled,
        disabled,
        composite: isCompositeItem,
        tabIndex,
        isNativeButton
    });
    if ("TURBOPACK compile-time truthy", 1) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
            if (!elementRef.current) {
                return;
            }
            const isButtonTag = elementRef.current.tagName === 'BUTTON';
            if (isNativeButton) {
                if (!isButtonTag) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["error"])('A component that acts as a button was not rendered as a native <button>, which does not match the default. Ensure that the element passed to the `render` prop of the component is a real <button>, or set the `nativeButton` prop on the component to `false`.');
                }
            } else if (isButtonTag) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["error"])('A component that acts as a button was rendered as a native <button>, which does not match the default. Ensure that the element passed to the `render` prop of the component is not a real <button>, or set the `nativeButton` prop on the component to `true`.');
            }
        }, [
            isNativeButton
        ]);
    }
    // handles a disabled composite button rendering another button, e.g.
    // <Toolbar.Button disabled render={<Menu.Trigger />} />
    // the `disabled` prop needs to pass through 2 `useButton`s then finally
    // delete the `disabled` attribute from DOM
    const updateDisabled = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>{
        const element = elementRef.current;
        if (!isButtonElement(element)) {
            return;
        }
        if (isCompositeItem && disabled && focusableWhenDisabledProps.disabled === undefined && element.disabled) {
            element.disabled = false;
        }
    }, [
        disabled,
        focusableWhenDisabledProps.disabled,
        isCompositeItem
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(updateDisabled, [
        updateDisabled
    ]);
    const getButtonProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((externalProps = {})=>{
        const { onClick: externalOnClick, onMouseDown: externalOnMouseDown, onKeyUp: externalOnKeyUp, onKeyDown: externalOnKeyDown, onPointerDown: externalOnPointerDown, ...otherExternalProps } = externalProps;
        const type = isNativeButton ? 'button' : undefined;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])({
            type,
            onClick (event) {
                if (disabled) {
                    event.preventDefault();
                    return;
                }
                externalOnClick?.(event);
            },
            onMouseDown (event) {
                if (!disabled) {
                    externalOnMouseDown?.(event);
                }
            },
            onKeyDown (event) {
                if (!disabled) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeEventPreventable"])(event);
                    externalOnKeyDown?.(event);
                }
                if (event.baseUIHandlerPrevented) {
                    return;
                }
                const shouldClick = event.target === event.currentTarget && !isNativeButton && !isValidLink() && !disabled;
                const isEnterKey = event.key === 'Enter';
                const isSpaceKey = event.key === ' ';
                // Keyboard accessibility for non interactive elements
                if (shouldClick) {
                    if (isSpaceKey || isEnterKey) {
                        event.preventDefault();
                    }
                    if (isEnterKey) {
                        externalOnClick?.(event);
                    }
                }
            },
            onKeyUp (event) {
                // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
                // https://codesandbox.io/p/sandbox/button-keyup-preventdefault-dn7f0
                // Keyboard accessibility for non interactive elements
                if (!disabled) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeEventPreventable"])(event);
                    externalOnKeyUp?.(event);
                }
                if (event.baseUIHandlerPrevented) {
                    return;
                }
                if (event.target === event.currentTarget && !isNativeButton && !disabled && event.key === ' ') {
                    externalOnClick?.(event);
                }
            },
            onPointerDown (event) {
                if (disabled) {
                    event.preventDefault();
                    return;
                }
                externalOnPointerDown?.(event);
            }
        }, !isNativeButton ? {
            role: 'button'
        } : undefined, focusableWhenDisabledProps, otherExternalProps);
    }, [
        disabled,
        focusableWhenDisabledProps,
        isNativeButton,
        isValidLink
    ]);
    const buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((element)=>{
        elementRef.current = element;
        updateDisabled();
    });
    return {
        getButtonProps,
        buttonRef
    };
}
function isButtonElement(elem) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"])(elem) && elem.tagName === 'BUTTON';
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/close/useDialogClose.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDialogClose",
    ()=>useDialogClose
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/use-button/useButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/merge-props/mergeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/createBaseUIEventDetails.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function useDialogClose(params) {
    const { open, setOpen, disabled, nativeButton } = params;
    const handleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((event)=>{
        if (open) {
            setOpen(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])('close-press', event.nativeEvent));
        }
    });
    const { getButtonProps, buttonRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useButton"])({
        disabled,
        native: nativeButton
    });
    const getRootProps = (externalProps)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$merge$2d$props$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])({
            onClick: handleClick
        }, externalProps, getButtonProps);
    return {
        getRootProps,
        ref: buttonRef
    };
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/close/DialogClose.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogClose",
    ()=>DialogClose
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$close$2f$useDialogClose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/close/useDialogClose.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/DialogRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const DialogClose = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function DialogClose(componentProps, forwardedRef) {
    const { render, className, disabled = false, nativeButton = true, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const open = store.useState('open');
    const { getRootProps, ref } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$close$2f$useDialogClose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogClose"])({
        disabled,
        open,
        setOpen: store.setOpen,
        nativeButton
    });
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            disabled
        }), [
        disabled
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('button', componentProps, {
        state,
        ref: [
            forwardedRef,
            ref
        ],
        props: [
            elementProps,
            getRootProps
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogClose.displayName = "DialogClose";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/description/DialogDescription.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogDescription",
    ()=>DialogDescription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/DialogRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const DialogDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function DialogDescription(componentProps, forwardedRef) {
    const { render, className, id: idProp, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    store.useSyncedValueWithCleanup('descriptionElementId', id);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('p', componentProps, {
        ref: forwardedRef,
        props: [
            {
                id
            },
            elementProps
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogDescription.displayName = "DialogDescription";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/FocusGuard.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FocusGuard",
    ()=>FocusGuard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/detectBrowser.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$visuallyHidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/visuallyHidden.js [app-ssr] (ecmascript)");
/**
 * @internal
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const FocusGuard = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function FocusGuard(props, ref) {
    const [role, setRole] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSafari"]) {
            // Unlike other screen readers such as NVDA and JAWS, the virtual cursor
            // on VoiceOver does trigger the onFocus event, so we can use the focus
            // trap element. On Safari, only buttons trigger the onFocus event.
            setRole('button');
        }
    }, []);
    const restProps = {
        tabIndex: 0,
        // Role is only for VoiceOver
        role
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
        ...props,
        ref: ref,
        style: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$visuallyHidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["visuallyHidden"],
        "aria-hidden": role ? undefined : true,
        ...restProps,
        "data-base-ui-focus-guard": ""
    });
});
if ("TURBOPACK compile-time truthy", 1) FocusGuard.displayName = "FocusGuard";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/event.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isMouseLikePointerType",
    ()=>isMouseLikePointerType,
    "isReactEvent",
    ()=>isReactEvent,
    "isVirtualClick",
    ()=>isVirtualClick,
    "isVirtualPointerEvent",
    ()=>isVirtualPointerEvent,
    "stopEvent",
    ()=>stopEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/detectBrowser.js [app-ssr] (ecmascript)");
;
function stopEvent(event) {
    event.preventDefault();
    event.stopPropagation();
}
function isReactEvent(event) {
    return 'nativeEvent' in event;
}
function isVirtualClick(event) {
    // FIXME: Firefox is now emitting a deprecation warning for `mozInputSource`.
    // Try to find a workaround for this. `react-aria` source still has the check.
    if (event.mozInputSource === 0 && event.isTrusted) {
        return true;
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAndroid"] && event.pointerType) {
        return event.type === 'click' && event.buttons === 1;
    }
    return event.detail === 0 && !event.pointerType;
}
function isVirtualPointerEvent(event) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isJSDOM"]) {
        return false;
    }
    return !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAndroid"] && event.width === 0 && event.height === 0 || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAndroid"] && event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === 'mouse' || // iOS VoiceOver returns 0.333• for width/height.
    event.width < 1 && event.height < 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === 'touch';
}
function isMouseLikePointerType(pointerType, strict) {
    // On some Linux machines with Chromium, mouse inputs return a `pointerType`
    // of "pen": https://github.com/floating-ui/floating-ui/issues/2015
    const values = [
        'mouse',
        'pen'
    ];
    if (!strict) {
        values.push('', undefined);
    }
    return values.includes(pointerType);
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/nodes.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-loop-func */ __turbopack_context__.s([
    "getDeepestNode",
    ()=>getDeepestNode,
    "getNodeAncestors",
    ()=>getNodeAncestors,
    "getNodeChildren",
    ()=>getNodeChildren
]);
function getNodeChildren(nodes, id, onlyOpenChildren = true) {
    const directChildren = nodes.filter((node)=>node.parentId === id && (!onlyOpenChildren || node.context?.open));
    return directChildren.flatMap((child)=>[
            child,
            ...getNodeChildren(nodes, child.id, onlyOpenChildren)
        ]);
}
function getDeepestNode(nodes, id) {
    let deepestNodeId;
    let maxDepth = -1;
    function findDeepest(nodeId, depth) {
        if (depth > maxDepth) {
            deepestNodeId = nodeId;
            maxDepth = depth;
        }
        const children = getNodeChildren(nodes, nodeId);
        children.forEach((child)=>{
            findDeepest(child.id, depth + 1);
        });
    }
    findDeepest(id, 0);
    return nodes.find((node)=>node.id === deepestNodeId);
}
function getNodeAncestors(nodes, id) {
    let allAncestors = [];
    let currentParentId = nodes.find((node)=>node.id === id)?.parentId;
    while(currentParentId){
        const currentNode = nodes.find((node)=>node.id === currentParentId);
        currentParentId = currentNode?.parentId;
        if (currentNode) {
            allAncestors = allAncestors.concat(currentNode);
        }
    }
    return allAncestors;
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/tabbable.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "disableFocusInside",
    ()=>disableFocusInside,
    "enableFocusInside",
    ()=>enableFocusInside,
    "getNextTabbable",
    ()=>getNextTabbable,
    "getPreviousTabbable",
    ()=>getPreviousTabbable,
    "getTabbableOptions",
    ()=>getTabbableOptions,
    "isOutsideEvent",
    ()=>isOutsideEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tabbable$40$6$2e$3$2e$0$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tabbable@6.3.0/node_modules/tabbable/dist/index.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/element.js [app-ssr] (ecmascript)");
;
;
const getTabbableOptions = ()=>({
        getShadowRoot: true,
        displayCheck: // JSDOM does not support the `tabbable` library. To solve this we can
        // check if `ResizeObserver` is a real function (not polyfilled), which
        // determines if the current environment is JSDOM-like.
        typeof ResizeObserver === 'function' && ResizeObserver.toString().includes('[native code]') ? 'full' : 'none'
    });
function getTabbableIn(container, dir) {
    const list = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tabbable$40$6$2e$3$2e$0$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tabbable"])(container, getTabbableOptions());
    const len = list.length;
    if (len === 0) {
        return undefined;
    }
    const active = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["activeElement"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocument"])(container));
    const index = list.indexOf(active);
    // eslint-disable-next-line no-nested-ternary
    const nextIndex = index === -1 ? dir === 1 ? 0 : len - 1 : index + dir;
    return list[nextIndex];
}
function getNextTabbable(referenceElement) {
    return getTabbableIn((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocument"])(referenceElement).body, 1) || referenceElement;
}
function getPreviousTabbable(referenceElement) {
    return getTabbableIn((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocument"])(referenceElement).body, -1) || referenceElement;
}
function isOutsideEvent(event, container) {
    const containerElement = container || event.currentTarget;
    const relatedTarget = event.relatedTarget;
    return !relatedTarget || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(containerElement, relatedTarget);
}
function disableFocusInside(container) {
    const tabbableElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tabbable$40$6$2e$3$2e$0$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tabbable"])(container, getTabbableOptions());
    tabbableElements.forEach((element)=>{
        element.dataset.tabindex = element.getAttribute('tabindex') || '';
        element.setAttribute('tabindex', '-1');
    });
}
function enableFocusInside(container) {
    const elements = container.querySelectorAll('[data-tabindex]');
    elements.forEach((element)=>{
        const tabindex = element.dataset.tabindex;
        delete element.dataset.tabindex;
        if (tabindex) {
            element.setAttribute('tabindex', tabindex);
        } else {
            element.removeAttribute('tabindex');
        }
    });
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/createAttribute.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAttribute",
    ()=>createAttribute
]);
function createAttribute(name) {
    return `data-base-ui-${name}`;
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/enqueueFocus.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "enqueueFocus",
    ()=>enqueueFocus
]);
let rafId = 0;
function enqueueFocus(el, options = {}) {
    const { preventScroll = false, cancelPrevious = true, sync = false } = options;
    if (cancelPrevious) {
        cancelAnimationFrame(rafId);
    }
    const exec = ()=>el?.focus({
            preventScroll
        });
    if (sync) {
        exec();
    } else {
        rafId = requestAnimationFrame(exec);
    }
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/markOthers.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Modified to add conditional `aria-hidden` support:
// https://github.com/theKashey/aria-hidden/blob/9220c8f4a4fd35f63bee5510a9f41a37264382d4/src/index.ts
__turbopack_context__.s([
    "markOthers",
    ()=>markOthers,
    "supportsInert",
    ()=>supportsInert
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.10/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/element.js [app-ssr] (ecmascript)");
;
;
const counters = {
    inert: new WeakMap(),
    'aria-hidden': new WeakMap(),
    none: new WeakMap()
};
function getCounterMap(control) {
    if (control === 'inert') {
        return counters.inert;
    }
    if (control === 'aria-hidden') {
        return counters['aria-hidden'];
    }
    return counters.none;
}
let uncontrolledElementsSet = new WeakSet();
let markerMap = {};
let lockCount = 0;
const supportsInert = ()=>typeof HTMLElement !== 'undefined' && 'inert' in HTMLElement.prototype;
const unwrapHost = (node)=>node && (node.host || unwrapHost(node.parentNode));
const correctElements = (parent, targets)=>targets.map((target)=>{
        if (parent.contains(target)) {
            return target;
        }
        const correctedTarget = unwrapHost(target);
        if (parent.contains(correctedTarget)) {
            return correctedTarget;
        }
        return null;
    }).filter((x)=>x != null);
function applyAttributeToOthers(uncorrectedAvoidElements, body, ariaHidden, inert) {
    const markerName = 'data-base-ui-inert';
    // eslint-disable-next-line no-nested-ternary
    const controlAttribute = inert ? 'inert' : ariaHidden ? 'aria-hidden' : null;
    const avoidElements = correctElements(body, uncorrectedAvoidElements);
    const elementsToKeep = new Set();
    const elementsToStop = new Set(avoidElements);
    const hiddenElements = [];
    if (!markerMap[markerName]) {
        markerMap[markerName] = new WeakMap();
    }
    const markerCounter = markerMap[markerName];
    avoidElements.forEach(keep);
    deep(body);
    elementsToKeep.clear();
    function keep(el) {
        if (!el || elementsToKeep.has(el)) {
            return;
        }
        elementsToKeep.add(el);
        if (el.parentNode) {
            keep(el.parentNode);
        }
    }
    function deep(parent) {
        if (!parent || elementsToStop.has(parent)) {
            return;
        }
        [].forEach.call(parent.children, (node)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNodeName"])(node) === 'script') {
                return;
            }
            if (elementsToKeep.has(node)) {
                deep(node);
            } else {
                const attr = controlAttribute ? node.getAttribute(controlAttribute) : null;
                const alreadyHidden = attr !== null && attr !== 'false';
                const counterMap = getCounterMap(controlAttribute);
                const counterValue = (counterMap.get(node) || 0) + 1;
                const markerValue = (markerCounter.get(node) || 0) + 1;
                counterMap.set(node, counterValue);
                markerCounter.set(node, markerValue);
                hiddenElements.push(node);
                if (counterValue === 1 && alreadyHidden) {
                    uncontrolledElementsSet.add(node);
                }
                if (markerValue === 1) {
                    node.setAttribute(markerName, '');
                }
                if (!alreadyHidden && controlAttribute) {
                    node.setAttribute(controlAttribute, controlAttribute === 'inert' ? '' : 'true');
                }
            }
        });
    }
    lockCount += 1;
    return ()=>{
        hiddenElements.forEach((element)=>{
            const counterMap = getCounterMap(controlAttribute);
            const currentCounterValue = counterMap.get(element) || 0;
            const counterValue = currentCounterValue - 1;
            const markerValue = (markerCounter.get(element) || 0) - 1;
            counterMap.set(element, counterValue);
            markerCounter.set(element, markerValue);
            if (!counterValue) {
                if (!uncontrolledElementsSet.has(element) && controlAttribute) {
                    element.removeAttribute(controlAttribute);
                }
                uncontrolledElementsSet.delete(element);
            }
            if (!markerValue) {
                element.removeAttribute(markerName);
            }
        });
        lockCount -= 1;
        if (!lockCount) {
            counters.inert = new WeakMap();
            counters['aria-hidden'] = new WeakMap();
            counters.none = new WeakMap();
            uncontrolledElementsSet = new WeakSet();
            markerMap = {};
        }
    };
}
function markOthers(avoidElements, ariaHidden = false, inert = false) {
    const body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocument"])(avoidElements[0]).body;
    return applyAttributeToOthers(avoidElements.concat(Array.from(body.querySelectorAll('[aria-live]'))), body, ariaHidden, inert);
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingPortal.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FloatingPortal",
    ()=>FloatingPortal,
    "useFloatingPortalNode",
    ()=>useFloatingPortalNode,
    "usePortalContext",
    ()=>usePortalContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.10/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$visuallyHidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/visuallyHidden.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$FocusGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/FocusGuard.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/tabbable.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/createBaseUIEventDetails.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/createAttribute.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
const PortalContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](null);
if ("TURBOPACK compile-time truthy", 1) PortalContext.displayName = "PortalContext";
const usePortalContext = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](PortalContext);
const attr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createAttribute"])('portal');
function useFloatingPortalNode(props = {}) {
    const { id, root } = props;
    const uniqueId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const portalContext = usePortalContext();
    const [portalNode, setPortalNode] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const portalNodeRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        return ()=>{
            portalNode?.remove();
            // Allow the subsequent layout effects to create a new node on updates.
            // The portal node will still be cleaned up on unmount.
            // https://github.com/floating-ui/floating-ui/issues/2454
            queueMicrotask(()=>{
                portalNodeRef.current = null;
            });
        };
    }, [
        portalNode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        // Wait for the uniqueId to be generated before creating the portal node in
        // React <18 (using `useFloatingId` instead of the native `useId`).
        // https://github.com/floating-ui/floating-ui/issues/2778
        if (!uniqueId) {
            return;
        }
        if (portalNodeRef.current) {
            return;
        }
        const existingIdRoot = id ? document.getElementById(id) : null;
        if (!existingIdRoot) {
            return;
        }
        const subRoot = document.createElement('div');
        subRoot.id = uniqueId;
        subRoot.setAttribute(attr, '');
        existingIdRoot.appendChild(subRoot);
        portalNodeRef.current = subRoot;
        setPortalNode(subRoot);
    }, [
        id,
        uniqueId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        // Wait for the root to exist before creating the portal node. The root must
        // be stored in state, not a ref, for this to work reactively.
        if (root === null) {
            return;
        }
        if (!uniqueId) {
            return;
        }
        if (portalNodeRef.current) {
            return;
        }
        let container = root || portalContext?.portalNode;
        if (container && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(container)) {
            container = container.current;
        }
        container = container || document.body;
        let idWrapper = null;
        if (id) {
            idWrapper = document.createElement('div');
            idWrapper.id = id;
            container.appendChild(idWrapper);
        }
        const subRoot = document.createElement('div');
        subRoot.id = uniqueId;
        subRoot.setAttribute(attr, '');
        container = idWrapper || container;
        container.appendChild(subRoot);
        portalNodeRef.current = subRoot;
        setPortalNode(subRoot);
    }, [
        id,
        root,
        uniqueId,
        portalContext
    ]);
    return portalNode;
}
function FloatingPortal(props) {
    const { children, id, root, preserveTabOrder = true } = props;
    const portalNode = useFloatingPortalNode({
        id,
        root
    });
    const [focusManagerState, setFocusManagerState] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const beforeOutsideRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const afterOutsideRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const beforeInsideRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const afterInsideRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const modal = focusManagerState?.modal;
    const open = focusManagerState?.open;
    const shouldRenderGuards = // The FocusManager and therefore floating element are currently open/
    // rendered.
    !!focusManagerState && // Guards are only for non-modal focus management.
    !focusManagerState.modal && // Don't render if unmount is transitioning.
    focusManagerState.open && preserveTabOrder && !!(root || portalNode);
    // https://codesandbox.io/s/tabbable-portal-f4tng?file=/src/TabbablePortal.tsx
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (!portalNode || !preserveTabOrder || modal) {
            return undefined;
        }
        // Make sure elements inside the portal element are tabbable only when the
        // portal has already been focused, either by tabbing into a focus trap
        // element outside or using the mouse.
        function onFocus(event) {
            if (portalNode && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isOutsideEvent"])(event)) {
                const focusing = event.type === 'focusin';
                const manageFocus = focusing ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enableFocusInside"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disableFocusInside"];
                manageFocus(portalNode);
            }
        }
        // Listen to the event on the capture phase so they run before the focus
        // trap elements onFocus prop is called.
        portalNode.addEventListener('focusin', onFocus, true);
        portalNode.addEventListener('focusout', onFocus, true);
        return ()=>{
            portalNode.removeEventListener('focusin', onFocus, true);
            portalNode.removeEventListener('focusout', onFocus, true);
        };
    }, [
        portalNode,
        preserveTabOrder,
        modal
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (!portalNode) {
            return;
        }
        if (open) {
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enableFocusInside"])(portalNode);
    }, [
        open,
        portalNode
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(PortalContext.Provider, {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
                preserveTabOrder,
                beforeOutsideRef,
                afterOutsideRef,
                beforeInsideRef,
                afterInsideRef,
                portalNode,
                setFocusManagerState
            }), [
            preserveTabOrder,
            portalNode
        ]),
        children: [
            shouldRenderGuards && portalNode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$FocusGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FocusGuard"], {
                "data-type": "outside",
                ref: beforeOutsideRef,
                onFocus: (event)=>{
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isOutsideEvent"])(event, portalNode)) {
                        beforeInsideRef.current?.focus();
                    } else {
                        const domReference = focusManagerState ? focusManagerState.domReference : null;
                        const prevTabbable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPreviousTabbable"])(domReference);
                        prevTabbable?.focus();
                    }
                }
            }),
            shouldRenderGuards && portalNode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                "aria-owns": portalNode.id,
                style: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$visuallyHidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["visuallyHidden"]
            }),
            portalNode && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"](children, portalNode),
            shouldRenderGuards && portalNode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$FocusGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FocusGuard"], {
                "data-type": "outside",
                ref: afterOutsideRef,
                onFocus: (event)=>{
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isOutsideEvent"])(event, portalNode)) {
                        afterInsideRef.current?.focus();
                    } else {
                        const domReference = focusManagerState ? focusManagerState.domReference : null;
                        const nextTabbable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNextTabbable"])(domReference);
                        nextTabbable?.focus();
                        if (focusManagerState?.closeOnFocusOut) {
                            focusManagerState?.onOpenChange(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])('focus-out', event.nativeEvent));
                        }
                    }
                }
            })
        ]
    });
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/createEventEmitter.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createEventEmitter",
    ()=>createEventEmitter
]);
function createEventEmitter() {
    const map = new Map();
    return {
        emit (event, data) {
            map.get(event)?.forEach((listener)=>listener(data));
        },
        on (event, listener) {
            if (!map.has(event)) {
                map.set(event, new Set());
            }
            map.get(event).add(listener);
        },
        off (event, listener) {
            map.get(event)?.delete(listener);
        }
    };
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingTree.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FloatingNode",
    ()=>FloatingNode,
    "FloatingTree",
    ()=>FloatingTree,
    "useFloatingNodeId",
    ()=>useFloatingNodeId,
    "useFloatingParentNodeId",
    ()=>useFloatingParentNodeId,
    "useFloatingTree",
    ()=>useFloatingTree
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createEventEmitter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/createEventEmitter.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
;
;
;
;
const FloatingNodeContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](null);
if ("TURBOPACK compile-time truthy", 1) FloatingNodeContext.displayName = "FloatingNodeContext";
const FloatingTreeContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](null);
/**
 * Returns the parent node id for nested floating elements, if available.
 * Returns `null` for top-level floating elements.
 */ if ("TURBOPACK compile-time truthy", 1) FloatingTreeContext.displayName = "FloatingTreeContext";
const useFloatingParentNodeId = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](FloatingNodeContext)?.id || null;
const useFloatingTree = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](FloatingTreeContext);
function useFloatingNodeId(customParentId) {
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const tree = useFloatingTree();
    const reactParentId = useFloatingParentNodeId();
    const parentId = customParentId || reactParentId;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (!id) {
            return undefined;
        }
        const node = {
            id,
            parentId
        };
        tree?.addNode(node);
        return ()=>{
            tree?.removeNode(node);
        };
    }, [
        tree,
        id,
        parentId
    ]);
    return id;
}
function FloatingNode(props) {
    const { children, id } = props;
    const parentId = useFloatingParentNodeId();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(FloatingNodeContext.Provider, {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
                id,
                parentId
            }), [
            id,
            parentId
        ]),
        children: children
    });
}
function FloatingTree(props) {
    const { children } = props;
    const nodesRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"]([]);
    const addNode = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((node)=>{
        nodesRef.current = [
            ...nodesRef.current,
            node
        ];
    }, []);
    const removeNode = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((node)=>{
        nodesRef.current = nodesRef.current.filter((n)=>n !== node);
    }, []);
    const [events] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createEventEmitter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createEventEmitter"])());
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(FloatingTreeContext.Provider, {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
                nodesRef,
                addNode,
                removeNode,
                events
            }), [
            addNode,
            removeNode,
            events
        ]),
        children: children
    });
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/constants.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CLICK_TRIGGER_IDENTIFIER",
    ()=>CLICK_TRIGGER_IDENTIFIER,
    "DISABLED_TRANSITIONS_STYLE",
    ()=>DISABLED_TRANSITIONS_STYLE,
    "DROPDOWN_COLLISION_AVOIDANCE",
    ()=>DROPDOWN_COLLISION_AVOIDANCE,
    "PATIENT_CLICK_THRESHOLD",
    ()=>PATIENT_CLICK_THRESHOLD,
    "POPUP_COLLISION_AVOIDANCE",
    ()=>POPUP_COLLISION_AVOIDANCE,
    "TYPEAHEAD_RESET_MS",
    ()=>TYPEAHEAD_RESET_MS
]);
const TYPEAHEAD_RESET_MS = 500;
const PATIENT_CLICK_THRESHOLD = 500;
const DISABLED_TRANSITIONS_STYLE = {
    style: {
        transition: 'none'
    }
};
;
const CLICK_TRIGGER_IDENTIFIER = 'data-base-ui-click-trigger';
const DROPDOWN_COLLISION_AVOIDANCE = {
    fallbackAxisSide: 'none'
};
const POPUP_COLLISION_AVOIDANCE = {
    fallbackAxisSide: 'end'
};
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingFocusManager.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FloatingFocusManager",
    ()=>FloatingFocusManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tabbable$40$6$2e$3$2e$0$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tabbable@6.3.0/node_modules/tabbable/dist/index.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.10/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useMergedRefs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useLatestRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useLatestRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$visuallyHidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/visuallyHidden.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useTimeout.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useAnimationFrame.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__getWindow__as__ownerWindow$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.10/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-ssr] (ecmascript) <export getWindow as ownerWindow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$FocusGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/FocusGuard.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/element.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/event.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/nodes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/tabbable.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/createBaseUIEventDetails.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/createAttribute.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$enqueueFocus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/enqueueFocus.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$markOthers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/markOthers.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingPortal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingPortal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingTree.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/constants.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function getEventType(event, lastInteractionType) {
    const win = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__getWindow__as__ownerWindow$3e$__["ownerWindow"])(event.target);
    if (event instanceof win.KeyboardEvent) {
        return 'keyboard';
    }
    if (event instanceof win.FocusEvent) {
        // Focus events can be caused by a preceding pointer interaction (e.g., focusout on outside press).
        // Prefer the last known pointer type if provided, else treat as keyboard.
        return lastInteractionType || 'keyboard';
    }
    if ('pointerType' in event) {
        return event.pointerType || 'keyboard';
    }
    if ('touches' in event) {
        return 'touch';
    }
    if (event instanceof win.MouseEvent) {
        // onClick events may not contain pointer events, and will fall through to here
        return lastInteractionType || (event.detail === 0 ? 'keyboard' : 'mouse');
    }
    return '';
}
const LIST_LIMIT = 20;
let previouslyFocusedElements = [];
function clearDisconnectedPreviouslyFocusedElements() {
    previouslyFocusedElements = previouslyFocusedElements.filter((el)=>el.isConnected);
}
function addPreviouslyFocusedElement(element) {
    clearDisconnectedPreviouslyFocusedElements();
    if (element && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNodeName"])(element) !== 'body') {
        previouslyFocusedElements.push(element);
        if (previouslyFocusedElements.length > LIST_LIMIT) {
            previouslyFocusedElements = previouslyFocusedElements.slice(-LIST_LIMIT);
        }
    }
}
function getPreviouslyFocusedElement() {
    clearDisconnectedPreviouslyFocusedElements();
    return previouslyFocusedElements[previouslyFocusedElements.length - 1];
}
function getFirstTabbableElement(container) {
    if (!container) {
        return null;
    }
    const tabbableOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTabbableOptions"])();
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tabbable$40$6$2e$3$2e$0$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTabbable"])(container, tabbableOptions)) {
        return container;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tabbable$40$6$2e$3$2e$0$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tabbable"])(container, tabbableOptions)[0] || container;
}
function handleTabIndex(floatingFocusElement, orderRef) {
    if (!orderRef.current.includes('floating') && !floatingFocusElement.getAttribute('role')?.includes('dialog')) {
        return;
    }
    const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTabbableOptions"])();
    const focusableElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tabbable$40$6$2e$3$2e$0$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusable"])(floatingFocusElement, options);
    const tabbableContent = focusableElements.filter((element)=>{
        const dataTabIndex = element.getAttribute('data-tabindex') || '';
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tabbable$40$6$2e$3$2e$0$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTabbable"])(element, options) || element.hasAttribute('data-tabindex') && !dataTabIndex.startsWith('-');
    });
    const tabIndex = floatingFocusElement.getAttribute('tabindex');
    if (orderRef.current.includes('floating') || tabbableContent.length === 0) {
        if (tabIndex !== '0') {
            floatingFocusElement.setAttribute('tabindex', '0');
        }
    } else if (tabIndex !== '-1' || floatingFocusElement.hasAttribute('data-tabindex') && floatingFocusElement.getAttribute('data-tabindex') !== '-1') {
        floatingFocusElement.setAttribute('tabindex', '-1');
        floatingFocusElement.setAttribute('data-tabindex', '-1');
    }
}
function FloatingFocusManager(props) {
    const { context, children, disabled = false, order = [
        'content'
    ], initialFocus = true, returnFocus = true, restoreFocus = false, modal = true, closeOnFocusOut = true, openInteractionType = '', getInsideElements: getInsideElementsProp = ()=>[] } = props;
    const { open, onOpenChange, events, dataRef, elements: { domReference, floating } } = context;
    const getNodeId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])(()=>dataRef.current.floatingContext?.nodeId);
    const getInsideElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])(getInsideElementsProp);
    const ignoreInitialFocus = initialFocus === false;
    // If the reference is a combobox and is typeable (e.g. input/textarea),
    // there are different focus semantics. The guards should not be rendered, but
    // aria-hidden should be applied to all nodes still. Further, the visually
    // hidden dismiss button should only appear at the end of the list, not the
    // start.
    const isUntrappedTypeableCombobox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTypeableCombobox"])(domReference) && ignoreInitialFocus;
    const orderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useLatestRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLatestRef"])(order);
    const initialFocusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useLatestRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLatestRef"])(initialFocus);
    const returnFocusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useLatestRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLatestRef"])(returnFocus);
    const openInteractionTypeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useLatestRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLatestRef"])(openInteractionType);
    const tree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFloatingTree"])();
    const portalContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingPortal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePortalContext"])();
    const startDismissButtonRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const endDismissButtonRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const preventReturnFocusRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    const isPointerDownRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    const tabbableIndexRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](-1);
    const closeTypeRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"]('');
    const lastInteractionTypeRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"]('');
    const blurTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTimeout"])();
    const pointerDownTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTimeout"])();
    const restoreFocusFrame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAnimationFrame"])();
    const isInsidePortal = portalContext != null;
    const floatingFocusElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFloatingFocusElement"])(floating);
    const getTabbableContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((container = floatingFocusElement)=>{
        return container ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tabbable$40$6$2e$3$2e$0$2f$node_modules$2f$tabbable$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tabbable"])(container, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTabbableOptions"])()) : [];
    });
    const getTabbableElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((container)=>{
        const content = getTabbableContent(container);
        return orderRef.current.map(()=>content).filter(Boolean).flat();
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (disabled) {
            return undefined;
        }
        if (!modal) {
            return undefined;
        }
        function onKeyDown(event) {
            if (event.key === 'Tab') {
                // The focus guards have nothing to focus, so we need to stop the event.
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(floatingFocusElement, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["activeElement"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement))) && getTabbableContent().length === 0 && !isUntrappedTypeableCombobox) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stopEvent"])(event);
                }
            }
        }
        const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement);
        doc.addEventListener('keydown', onKeyDown);
        return ()=>{
            doc.removeEventListener('keydown', onKeyDown);
        };
    }, [
        disabled,
        domReference,
        floatingFocusElement,
        modal,
        orderRef,
        isUntrappedTypeableCombobox,
        getTabbableContent,
        getTabbableElements
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (disabled) {
            return undefined;
        }
        if (!floating) {
            return undefined;
        }
        function handleFocusIn(event) {
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTarget"])(event);
            const tabbableContent = getTabbableContent();
            const tabbableIndex = tabbableContent.indexOf(target);
            if (tabbableIndex !== -1) {
                tabbableIndexRef.current = tabbableIndex;
            }
        }
        floating.addEventListener('focusin', handleFocusIn);
        return ()=>{
            floating.removeEventListener('focusin', handleFocusIn);
        };
    }, [
        disabled,
        floating,
        getTabbableContent
    ]);
    // Track the last interaction type at the document level to disambiguate focus events
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (disabled || !open) {
            return undefined;
        }
        const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement);
        function onPointerDown(event) {
            lastInteractionTypeRef.current = event.pointerType || 'keyboard';
        }
        function onKeyDown() {
            lastInteractionTypeRef.current = 'keyboard';
        }
        doc.addEventListener('pointerdown', onPointerDown, true);
        doc.addEventListener('keydown', onKeyDown, true);
        return ()=>{
            doc.removeEventListener('pointerdown', onPointerDown, true);
            doc.removeEventListener('keydown', onKeyDown, true);
        };
    }, [
        disabled,
        floating,
        domReference,
        floatingFocusElement,
        open
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (disabled) {
            return undefined;
        }
        if (!closeOnFocusOut) {
            return undefined;
        }
        // In Safari, buttons lose focus when pressing them.
        function handlePointerDown() {
            isPointerDownRef.current = true;
            pointerDownTimeout.start(0, ()=>{
                isPointerDownRef.current = false;
            });
        }
        function handleFocusOutside(event) {
            const relatedTarget = event.relatedTarget;
            const currentTarget = event.currentTarget;
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTarget"])(event);
            queueMicrotask(()=>{
                const nodeId = getNodeId();
                const movedToUnrelatedNode = !((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(domReference, relatedTarget) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(floating, relatedTarget) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(relatedTarget, floating) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(portalContext?.portalNode, relatedTarget) || relatedTarget?.hasAttribute((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createAttribute"])('focus-guard')) || tree && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNodeChildren"])(tree.nodesRef.current, nodeId).find((node)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(node.context?.elements.floating, relatedTarget) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(node.context?.elements.domReference, relatedTarget)) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNodeAncestors"])(tree.nodesRef.current, nodeId).find((node)=>[
                        node.context?.elements.floating,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFloatingFocusElement"])(node.context?.elements.floating)
                    ].includes(relatedTarget) || node.context?.elements.domReference === relatedTarget)));
                if (currentTarget === domReference && floatingFocusElement) {
                    handleTabIndex(floatingFocusElement, orderRef);
                }
                // Restore focus to the previous tabbable element index to prevent
                // focus from being lost outside the floating tree.
                if (restoreFocus && currentTarget !== domReference && !target?.isConnected && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["activeElement"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement)) === (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement).body) {
                    // Let `FloatingPortal` effect knows that focus is still inside the
                    // floating tree.
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"])(floatingFocusElement)) {
                        floatingFocusElement.focus();
                        // If explicitly requested to restore focus to the popup container, do not search
                        // for the next/previous tabbable element.
                        if (restoreFocus === 'popup') {
                            // If the element is removed on pointerdown, focus tries to move it,
                            // but since it's removed at the same time, focus gets lost as it
                            // happens after the .focus() call above.
                            // In this case, focus needs to be moved asynchronously.
                            restoreFocusFrame.request(()=>{
                                floatingFocusElement.focus();
                            });
                            return;
                        }
                    }
                    const prevTabbableIndex = tabbableIndexRef.current;
                    const tabbableContent = getTabbableContent();
                    const nodeToFocus = tabbableContent[prevTabbableIndex] || tabbableContent[tabbableContent.length - 1] || floatingFocusElement;
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"])(nodeToFocus)) {
                        nodeToFocus.focus();
                    }
                }
                // https://github.com/floating-ui/floating-ui/issues/3060
                if (dataRef.current.insideReactTree) {
                    dataRef.current.insideReactTree = false;
                    return;
                }
                // Focus did not move inside the floating tree, and there are no tabbable
                // portal guards to handle closing.
                if ((isUntrappedTypeableCombobox ? true : !modal) && relatedTarget && movedToUnrelatedNode && (// Fix React 18 Strict Mode returnFocus due to double rendering.
                // For an "untrapped" typeable combobox (input role=combobox with
                // initialFocus=false), re-opening the popup and tabbing out should still close it even
                // when the previously focused element (e.g. the next tabbable outside the popup) is
                // focused again. Otherwise, the popup remains open on the second Tab sequence:
                // click input -> Tab (closes) -> click input -> Tab.
                // Allow closing when `isUntrappedTypeableCombobox` regardless of the previously focused element.
                isUntrappedTypeableCombobox || relatedTarget !== getPreviouslyFocusedElement())) {
                    preventReturnFocusRef.current = true;
                    onOpenChange(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])('focus-out', event));
                }
            });
        }
        function markInsideReactTree() {
            dataRef.current.insideReactTree = true;
            blurTimeout.start(0, ()=>{
                dataRef.current.insideReactTree = false;
            });
        }
        if (floating && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"])(domReference)) {
            domReference.addEventListener('focusout', handleFocusOutside);
            domReference.addEventListener('pointerdown', handlePointerDown);
            floating.addEventListener('focusout', handleFocusOutside);
            if (portalContext) {
                floating.addEventListener('focusout', markInsideReactTree, true);
            }
            return ()=>{
                domReference.removeEventListener('focusout', handleFocusOutside);
                domReference.removeEventListener('pointerdown', handlePointerDown);
                floating.removeEventListener('focusout', handleFocusOutside);
                if (portalContext) {
                    floating.removeEventListener('focusout', markInsideReactTree, true);
                }
            };
        }
        return undefined;
    }, [
        disabled,
        domReference,
        floating,
        floatingFocusElement,
        modal,
        tree,
        portalContext,
        onOpenChange,
        closeOnFocusOut,
        restoreFocus,
        getTabbableContent,
        isUntrappedTypeableCombobox,
        getNodeId,
        orderRef,
        dataRef,
        blurTimeout,
        pointerDownTimeout,
        restoreFocusFrame
    ]);
    const beforeGuardRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const afterGuardRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const mergedBeforeGuardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMergedRefs"])(beforeGuardRef, portalContext?.beforeInsideRef);
    const mergedAfterGuardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMergedRefs"])(afterGuardRef, portalContext?.afterInsideRef);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (disabled || !floating || !open) {
            return undefined;
        }
        // Don't hide portals nested within the parent portal.
        const portalNodes = Array.from(portalContext?.portalNode?.querySelectorAll(`[${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createAttribute"])('portal')}]`) || []);
        const ancestors = tree ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNodeAncestors"])(tree.nodesRef.current, getNodeId()) : [];
        const rootAncestorComboboxDomReference = ancestors.find((node)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTypeableCombobox"])(node.context?.elements.domReference || null))?.context?.elements.domReference;
        const insideElements = [
            floating,
            rootAncestorComboboxDomReference,
            ...portalNodes,
            ...getInsideElements(),
            startDismissButtonRef.current,
            endDismissButtonRef.current,
            beforeGuardRef.current,
            afterGuardRef.current,
            portalContext?.beforeOutsideRef.current,
            portalContext?.afterOutsideRef.current,
            isUntrappedTypeableCombobox ? domReference : null
        ].filter((x)=>x != null);
        const cleanup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$markOthers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["markOthers"])(insideElements, modal || isUntrappedTypeableCombobox);
        return ()=>{
            cleanup();
        };
    }, [
        open,
        disabled,
        domReference,
        floating,
        modal,
        orderRef,
        portalContext,
        isUntrappedTypeableCombobox,
        tree,
        getNodeId,
        getInsideElements
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (disabled || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"])(floatingFocusElement)) {
            return;
        }
        const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement);
        const previouslyFocusedElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["activeElement"])(doc);
        // Wait for any layout effect state setters to execute to set `tabIndex`.
        queueMicrotask(()=>{
            const focusableElements = getTabbableElements(floatingFocusElement);
            const initialFocusValueOrFn = initialFocusRef.current;
            const resolvedInitialFocus = typeof initialFocusValueOrFn === 'function' ? initialFocusValueOrFn(openInteractionTypeRef.current || '') : initialFocusValueOrFn;
            // `null` should fallback to default behavior in case of an empty ref.
            if (resolvedInitialFocus === undefined || resolvedInitialFocus === false) {
                return;
            }
            let elToFocus;
            if (resolvedInitialFocus === true || resolvedInitialFocus === null) {
                elToFocus = focusableElements[0] || floatingFocusElement;
            } else if ('current' in resolvedInitialFocus) {
                elToFocus = resolvedInitialFocus.current;
            } else {
                elToFocus = resolvedInitialFocus;
            }
            elToFocus = elToFocus || focusableElements[0] || floatingFocusElement;
            const focusAlreadyInsideFloatingEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(floatingFocusElement, previouslyFocusedElement);
            if (!focusAlreadyInsideFloatingEl && open) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$enqueueFocus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enqueueFocus"])(elToFocus, {
                    preventScroll: elToFocus === floatingFocusElement
                });
            }
        });
    }, [
        disabled,
        open,
        floatingFocusElement,
        ignoreInitialFocus,
        getTabbableElements,
        initialFocusRef,
        openInteractionTypeRef
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (disabled || !floatingFocusElement) {
            return undefined;
        }
        const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement);
        const previouslyFocusedElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["activeElement"])(doc);
        addPreviouslyFocusedElement(previouslyFocusedElement);
        // Dismissing via outside press should always ignore `returnFocus` to
        // prevent unwanted scrolling.
        function onOpenChangeLocal(details) {
            if (!details.open) {
                closeTypeRef.current = getEventType(details.nativeEvent, lastInteractionTypeRef.current);
            }
            if (details.reason === 'trigger-hover' && details.nativeEvent.type === 'mouseleave') {
                preventReturnFocusRef.current = true;
            }
            if (details.reason !== 'outside-press') {
                return;
            }
            if (details.nested) {
                preventReturnFocusRef.current = false;
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVirtualClick"])(details.nativeEvent) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVirtualPointerEvent"])(details.nativeEvent)) {
                preventReturnFocusRef.current = false;
            } else {
                let isPreventScrollSupported = false;
                document.createElement('div').focus({
                    get preventScroll () {
                        isPreventScrollSupported = true;
                        return false;
                    }
                });
                if (isPreventScrollSupported) {
                    preventReturnFocusRef.current = false;
                } else {
                    preventReturnFocusRef.current = true;
                }
            }
        }
        events.on('openchange', onOpenChangeLocal);
        const fallbackEl = doc.createElement('span');
        fallbackEl.setAttribute('tabindex', '-1');
        fallbackEl.setAttribute('aria-hidden', 'true');
        Object.assign(fallbackEl.style, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$visuallyHidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["visuallyHidden"]);
        if (isInsidePortal && domReference) {
            domReference.insertAdjacentElement('afterend', fallbackEl);
        }
        function getReturnElement() {
            const returnFocusValueOrFn = returnFocusRef.current;
            let resolvedReturnFocusValue = typeof returnFocusValueOrFn === 'function' ? returnFocusValueOrFn(closeTypeRef.current) : returnFocusValueOrFn;
            // `null` should fallback to default behavior in case of an empty ref.
            if (resolvedReturnFocusValue === undefined || resolvedReturnFocusValue === false) {
                return null;
            }
            if (resolvedReturnFocusValue === null) {
                resolvedReturnFocusValue = true;
            }
            if (typeof resolvedReturnFocusValue === 'boolean') {
                const el = domReference || getPreviouslyFocusedElement();
                return el && el.isConnected ? el : fallbackEl;
            }
            const fallback = domReference || getPreviouslyFocusedElement() || fallbackEl;
            if ('current' in resolvedReturnFocusValue) {
                return resolvedReturnFocusValue.current || fallback;
            }
            return resolvedReturnFocusValue || fallback;
        }
        return ()=>{
            events.off('openchange', onOpenChangeLocal);
            const activeEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["activeElement"])(doc);
            const isFocusInsideFloatingTree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(floating, activeEl) || tree && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNodeChildren"])(tree.nodesRef.current, getNodeId(), false).some((node)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(node.context?.elements.floating, activeEl));
            const returnElement = getReturnElement();
            queueMicrotask(()=>{
                // This is `returnElement`, if it's tabbable, or its first tabbable child.
                const tabbableReturnElement = getFirstTabbableElement(returnElement);
                const hasExplicitReturnFocus = typeof returnFocusRef.current !== 'boolean';
                if (// eslint-disable-next-line react-hooks/exhaustive-deps
                returnFocusRef.current && !preventReturnFocusRef.current && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"])(tabbableReturnElement) && (// If the focus moved somewhere else after mount, avoid returning focus
                // since it likely entered a different element which should be
                // respected: https://github.com/floating-ui/floating-ui/issues/2607
                !hasExplicitReturnFocus && tabbableReturnElement !== activeEl && activeEl !== doc.body ? isFocusInsideFloatingTree : true)) {
                    tabbableReturnElement.focus({
                        preventScroll: true
                    });
                }
                fallbackEl.remove();
            });
        };
    }, [
        disabled,
        floating,
        floatingFocusElement,
        returnFocusRef,
        dataRef,
        events,
        tree,
        isInsidePortal,
        domReference,
        getNodeId
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        // The `returnFocus` cleanup behavior is inside a microtask; ensure we
        // wait for it to complete before resetting the flag.
        queueMicrotask(()=>{
            preventReturnFocusRef.current = false;
        });
    }, [
        disabled
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (disabled || !open) {
            return undefined;
        }
        function handlePointerDown(event) {
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTarget"])(event);
            if (target?.closest(`[${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CLICK_TRIGGER_IDENTIFIER"]}]`)) {
                isPointerDownRef.current = true;
            }
        }
        const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocument"])(floatingFocusElement);
        doc.addEventListener('pointerdown', handlePointerDown, true);
        return ()=>{
            doc.removeEventListener('pointerdown', handlePointerDown, true);
        };
    }, [
        disabled,
        open,
        floatingFocusElement
    ]);
    // Synchronize the `context` & `modal` value to the FloatingPortal context.
    // It will decide whether or not it needs to render its own guards.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (disabled) {
            return undefined;
        }
        if (!portalContext) {
            return undefined;
        }
        portalContext.setFocusManagerState({
            modal,
            closeOnFocusOut,
            open,
            onOpenChange,
            domReference
        });
        return ()=>{
            portalContext.setFocusManagerState(null);
        };
    }, [
        disabled,
        portalContext,
        modal,
        open,
        onOpenChange,
        closeOnFocusOut,
        domReference
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (disabled || !floatingFocusElement) {
            return undefined;
        }
        handleTabIndex(floatingFocusElement, orderRef);
        return ()=>{
            queueMicrotask(clearDisconnectedPreviouslyFocusedElements);
        };
    }, [
        disabled,
        floatingFocusElement,
        orderRef
    ]);
    const shouldRenderGuards = !disabled && (modal ? !isUntrappedTypeableCombobox : true) && (isInsidePortal || modal);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            shouldRenderGuards && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$FocusGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FocusGuard"], {
                "data-type": "inside",
                ref: mergedBeforeGuardRef,
                onFocus: (event)=>{
                    if (modal) {
                        const els = getTabbableElements();
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$enqueueFocus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enqueueFocus"])(els[els.length - 1]);
                    } else if (portalContext?.preserveTabOrder && portalContext.portalNode) {
                        preventReturnFocusRef.current = false;
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isOutsideEvent"])(event, portalContext.portalNode)) {
                            const nextTabbable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNextTabbable"])(domReference);
                            nextTabbable?.focus();
                        } else {
                            portalContext.beforeOutsideRef.current?.focus();
                        }
                    }
                }
            }),
            children,
            shouldRenderGuards && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$FocusGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FocusGuard"], {
                "data-type": "inside",
                ref: mergedAfterGuardRef,
                onFocus: (event)=>{
                    if (modal) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$enqueueFocus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enqueueFocus"])(getTabbableElements()[0]);
                    } else if (portalContext?.preserveTabOrder && portalContext.portalNode) {
                        if (closeOnFocusOut) {
                            preventReturnFocusRef.current = true;
                        }
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isOutsideEvent"])(event, portalContext.portalNode)) {
                            const prevTabbable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$tabbable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPreviousTabbable"])(domReference);
                            prevTabbable?.focus();
                        } else {
                            portalContext.afterOutsideRef.current?.focus();
                        }
                    }
                }
            })
        ]
    });
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/popup/DialogPopupCssVars.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogPopupCssVars",
    ()=>DialogPopupCssVars
]);
let DialogPopupCssVars = /*#__PURE__*/ function(DialogPopupCssVars) {
    /**
   * Indicates how many dialogs are nested within.
   * @type {number}
   */ DialogPopupCssVars["nestedDialogs"] = "--nested-dialogs";
    return DialogPopupCssVars;
}({});
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/popup/DialogPopupDataAttributes.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogPopupDataAttributes",
    ()=>DialogPopupDataAttributes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
;
let DialogPopupDataAttributes = function(DialogPopupDataAttributes) {
    /**
   * Present when the dialog is open.
   */ DialogPopupDataAttributes[DialogPopupDataAttributes["open"] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].open] = "open";
    /**
   * Present when the dialog is closed.
   */ DialogPopupDataAttributes[DialogPopupDataAttributes["closed"] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].closed] = "closed";
    /**
   * Present when the dialog is animating in.
   */ DialogPopupDataAttributes[DialogPopupDataAttributes["startingStyle"] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].startingStyle] = "startingStyle";
    /**
   * Present when the dialog is animating out.
   */ DialogPopupDataAttributes[DialogPopupDataAttributes["endingStyle"] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].endingStyle] = "endingStyle";
    /**
   * Present when the dialog is nested within another dialog.
   */ DialogPopupDataAttributes["nested"] = "data-nested";
    /**
   * Present when the dialog has other open dialogs nested within it.
   */ DialogPopupDataAttributes["nestedDialogOpen"] = "data-nested-dialog-open";
    return DialogPopupDataAttributes;
}({});
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/InternalBackdrop.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InternalBackdrop",
    ()=>InternalBackdrop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
/**
 * @internal
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
;
const InternalBackdrop = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function InternalBackdrop(props, ref) {
    const { cutout, ...otherProps } = props;
    let clipPath;
    if (cutout) {
        const rect = cutout?.getBoundingClientRect();
        clipPath = `polygon(
      0% 0%,
      100% 0%,
      100% 100%,
      0% 100%,
      0% 0%,
      ${rect.left}px ${rect.top}px,
      ${rect.left}px ${rect.bottom}px,
      ${rect.right}px ${rect.bottom}px,
      ${rect.right}px ${rect.top}px,
      ${rect.left}px ${rect.top}px
    )`;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
        ref: ref,
        role: "presentation",
        "data-base-ui-inert": "",
        ...otherProps,
        style: {
            position: 'fixed',
            inset: 0,
            userSelect: 'none',
            WebkitUserSelect: 'none',
            clipPath
        }
    });
});
if ("TURBOPACK compile-time truthy", 1) InternalBackdrop.displayName = "InternalBackdrop";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/portal/DialogPortalContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogPortalContext",
    ()=>DialogPortalContext,
    "useDialogPortalContext",
    ()=>useDialogPortalContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const DialogPortalContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) DialogPortalContext.displayName = "DialogPortalContext";
function useDialogPortalContext() {
    const value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](DialogPortalContext);
    if (value === undefined) {
        throw new Error('Base UI: <Dialog.Portal> is missing.');
    }
    return value;
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useAnimationsFinished.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAnimationsFinished",
    ()=>useAnimationsFinished
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useAnimationFrame.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEventCallback.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function useAnimationsFinished(elementOrRef, waitForNextTick = false) {
    const frame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAnimationFrame"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((fnToExecute, /**
   * An optional [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that
   * can be used to abort `fnToExecute` before all the animations have finished.
   * @default null
   */ signal = null)=>{
        frame.cancel();
        if (elementOrRef == null) {
            return;
        }
        let element;
        if ('current' in elementOrRef) {
            if (elementOrRef.current == null) {
                return;
            }
            element = elementOrRef.current;
        } else {
            element = elementOrRef;
        }
        if (typeof element.getAnimations !== 'function' || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
            fnToExecute();
        } else {
            frame.request(()=>{
                function exec() {
                    if (!element) {
                        return;
                    }
                    Promise.allSettled(element.getAnimations().map((anim)=>anim.finished)).then(()=>{
                        if (signal != null && signal.aborted) {
                            return;
                        }
                        // Synchronously flush the unmounting of the component so that the browser doesn't
                        // paint: https://github.com/mui/base-ui/issues/979
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["flushSync"](fnToExecute);
                    });
                }
                // `open: true` animations need to wait for the next tick to be detected
                if (waitForNextTick) {
                    frame.request(exec);
                } else {
                    exec();
                }
            });
        }
    });
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useOpenChangeComplete.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useOpenChangeComplete",
    ()=>useOpenChangeComplete
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useLatestRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useLatestRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useAnimationsFinished$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useAnimationsFinished.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function useOpenChangeComplete(parameters) {
    const { enabled = true, open, ref, onComplete: onCompleteParam } = parameters;
    const openRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useLatestRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLatestRef"])(open);
    const onComplete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])(onCompleteParam);
    const runOnceAnimationsFinish = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useAnimationsFinished$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAnimationsFinished"])(ref, open);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (!enabled) {
            return;
        }
        runOnceAnimationsFinish(()=>{
            if (open === openRef.current) {
                onComplete();
            }
        });
    }, [
        enabled,
        open,
        onComplete,
        runOnceAnimationsFinish,
        openRef
    ]);
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/composite.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_KEYS",
    ()=>ALL_KEYS,
    "ALT",
    ()=>ALT,
    "ARROW_DOWN",
    ()=>ARROW_DOWN,
    "ARROW_KEYS",
    ()=>ARROW_KEYS,
    "ARROW_LEFT",
    ()=>ARROW_LEFT,
    "ARROW_RIGHT",
    ()=>ARROW_RIGHT,
    "ARROW_UP",
    ()=>ARROW_UP,
    "COMPOSITE_KEYS",
    ()=>COMPOSITE_KEYS,
    "CONTROL",
    ()=>CONTROL,
    "END",
    ()=>END,
    "HOME",
    ()=>HOME,
    "HORIZONTAL_KEYS",
    ()=>HORIZONTAL_KEYS,
    "HORIZONTAL_KEYS_WITH_EXTRA_KEYS",
    ()=>HORIZONTAL_KEYS_WITH_EXTRA_KEYS,
    "META",
    ()=>META,
    "MODIFIER_KEYS",
    ()=>MODIFIER_KEYS,
    "SHIFT",
    ()=>SHIFT,
    "VERTICAL_KEYS",
    ()=>VERTICAL_KEYS,
    "VERTICAL_KEYS_WITH_EXTRA_KEYS",
    ()=>VERTICAL_KEYS_WITH_EXTRA_KEYS,
    "isNativeInput",
    ()=>isNativeInput,
    "scrollIntoViewIfNeeded",
    ()=>scrollIntoViewIfNeeded
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.10/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-ssr] (ecmascript)");
;
;
const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
const HOME = 'Home';
const END = 'End';
const HORIZONTAL_KEYS = new Set([
    ARROW_LEFT,
    ARROW_RIGHT
]);
const HORIZONTAL_KEYS_WITH_EXTRA_KEYS = new Set([
    ARROW_LEFT,
    ARROW_RIGHT,
    HOME,
    END
]);
const VERTICAL_KEYS = new Set([
    ARROW_UP,
    ARROW_DOWN
]);
const VERTICAL_KEYS_WITH_EXTRA_KEYS = new Set([
    ARROW_UP,
    ARROW_DOWN,
    HOME,
    END
]);
const ARROW_KEYS = new Set([
    ...HORIZONTAL_KEYS,
    ...VERTICAL_KEYS
]);
const ALL_KEYS = new Set([
    ...ARROW_KEYS,
    HOME,
    END
]);
const COMPOSITE_KEYS = new Set([
    ARROW_UP,
    ARROW_DOWN,
    ARROW_LEFT,
    ARROW_RIGHT,
    HOME,
    END
]);
const SHIFT = 'Shift';
const CONTROL = 'Control';
const ALT = 'Alt';
const META = 'Meta';
const MODIFIER_KEYS = new Set([
    SHIFT,
    CONTROL,
    ALT,
    META
]);
function isInputElement(element) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"])(element) && element.tagName === 'INPUT';
}
function isNativeInput(element) {
    if (isInputElement(element) && element.selectionStart != null) {
        return true;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"])(element) && element.tagName === 'TEXTAREA') {
        return true;
    }
    return false;
}
function scrollIntoViewIfNeeded(scrollContainer, element, direction, orientation) {
    if (!scrollContainer || !element || !element.scrollTo) {
        return;
    }
    let targetX = scrollContainer.scrollLeft;
    let targetY = scrollContainer.scrollTop;
    const isOverflowingX = scrollContainer.clientWidth < scrollContainer.scrollWidth;
    const isOverflowingY = scrollContainer.clientHeight < scrollContainer.scrollHeight;
    if (isOverflowingX && orientation !== 'vertical') {
        const elementOffsetLeft = getOffset(scrollContainer, element, 'left');
        const containerStyles = getStyles(scrollContainer);
        const elementStyles = getStyles(element);
        if (direction === 'ltr') {
            if (elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight > scrollContainer.scrollLeft + scrollContainer.clientWidth - containerStyles.scrollPaddingRight) {
                // overflow to the right, scroll to align right edges
                targetX = elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight - scrollContainer.clientWidth + containerStyles.scrollPaddingRight;
            } else if (elementOffsetLeft - elementStyles.scrollMarginLeft < scrollContainer.scrollLeft + containerStyles.scrollPaddingLeft) {
                // overflow to the left, scroll to align left edges
                targetX = elementOffsetLeft - elementStyles.scrollMarginLeft - containerStyles.scrollPaddingLeft;
            }
        }
        if (direction === 'rtl') {
            if (elementOffsetLeft - elementStyles.scrollMarginRight < scrollContainer.scrollLeft + containerStyles.scrollPaddingLeft) {
                // overflow to the left, scroll to align left edges
                targetX = elementOffsetLeft - elementStyles.scrollMarginLeft - containerStyles.scrollPaddingLeft;
            } else if (elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight > scrollContainer.scrollLeft + scrollContainer.clientWidth - containerStyles.scrollPaddingRight) {
                // overflow to the right, scroll to align right edges
                targetX = elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight - scrollContainer.clientWidth + containerStyles.scrollPaddingRight;
            }
        }
    }
    if (isOverflowingY && orientation !== 'horizontal') {
        const elementOffsetTop = getOffset(scrollContainer, element, 'top');
        const containerStyles = getStyles(scrollContainer);
        const elementStyles = getStyles(element);
        if (elementOffsetTop - elementStyles.scrollMarginTop < scrollContainer.scrollTop + containerStyles.scrollPaddingTop) {
            // overflow upwards, align top edges
            targetY = elementOffsetTop - elementStyles.scrollMarginTop - containerStyles.scrollPaddingTop;
        } else if (elementOffsetTop + element.offsetHeight + elementStyles.scrollMarginBottom > scrollContainer.scrollTop + scrollContainer.clientHeight - containerStyles.scrollPaddingBottom) {
            // overflow downwards, align bottom edges
            targetY = elementOffsetTop + element.offsetHeight + elementStyles.scrollMarginBottom - scrollContainer.clientHeight + containerStyles.scrollPaddingBottom;
        }
    }
    scrollContainer.scrollTo({
        left: targetX,
        top: targetY,
        behavior: 'auto'
    });
}
function getOffset(ancestor, element, side) {
    const propName = side === 'left' ? 'offsetLeft' : 'offsetTop';
    let result = 0;
    while(element.offsetParent){
        result += element[propName];
        if (element.offsetParent === ancestor) {
            break;
        }
        element = element.offsetParent;
    }
    return result;
}
function getStyles(element) {
    const styles = getComputedStyle(element);
    return {
        scrollMarginTop: parseFloat(styles.scrollMarginTop) || 0,
        scrollMarginRight: parseFloat(styles.scrollMarginRight) || 0,
        scrollMarginBottom: parseFloat(styles.scrollMarginBottom) || 0,
        scrollMarginLeft: parseFloat(styles.scrollMarginLeft) || 0,
        scrollPaddingTop: parseFloat(styles.scrollPaddingTop) || 0,
        scrollPaddingRight: parseFloat(styles.scrollPaddingRight) || 0,
        scrollPaddingBottom: parseFloat(styles.scrollPaddingBottom) || 0,
        scrollPaddingLeft: parseFloat(styles.scrollPaddingLeft) || 0
    };
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/popup/DialogPopup.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogPopup",
    ()=>DialogPopup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$inertValue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/inertValue.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingFocusManager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingFocusManager.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/DialogRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/stateAttributesMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$popup$2f$DialogPopupCssVars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/popup/DialogPopupCssVars.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$popup$2f$DialogPopupDataAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/popup/DialogPopupDataAttributes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$InternalBackdrop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/InternalBackdrop.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$portal$2f$DialogPortalContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/portal/DialogPortalContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useOpenChangeComplete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useOpenChangeComplete.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/composite.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const stateAttributesMapping = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["popupStateMapping"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transitionStatusMapping"],
    nestedDialogOpen (value) {
        return value ? {
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$popup$2f$DialogPopupDataAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogPopupDataAttributes"].nestedDialogOpen]: ''
        } : null;
    }
};
const DialogPopup = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function DialogPopup(componentProps, forwardedRef) {
    const { className, finalFocus, initialFocus, render, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const descriptionElementId = store.useState('descriptionElementId');
    const dismissible = store.useState('dismissible');
    const floatingRootContext = store.useState('floatingRootContext');
    const rootPopupProps = store.useState('popupProps');
    const modal = store.useState('modal');
    const mounted = store.useState('mounted');
    const nested = store.useState('nested');
    const nestedOpenDialogCount = store.useState('nestedOpenDialogCount');
    const open = store.useState('open');
    const openMethod = store.useState('openMethod');
    const titleElementId = store.useState('titleElementId');
    const transitionStatus = store.useState('transitionStatus');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$portal$2f$DialogPortalContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogPortalContext"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useOpenChangeComplete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOpenChangeComplete"])({
        open,
        ref: store.context.popupRef,
        onComplete () {
            if (open) {
                store.context.openChangeComplete?.(true);
            }
        }
    });
    // Default initial focus logic:
    // If opened by touch, focus the popup element to prevent the virtual keyboard from opening
    // (this is required for Android specifically as iOS handles this automatically).
    const defaultInitialFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((interactionType)=>{
        if (interactionType === 'touch') {
            return store.context.popupRef.current;
        }
        return true;
    });
    const resolvedInitialFocus = initialFocus === undefined ? defaultInitialFocus : initialFocus;
    const nestedDialogOpen = nestedOpenDialogCount > 0;
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            open,
            nested,
            transitionStatus,
            nestedDialogOpen
        }), [
        open,
        nested,
        transitionStatus,
        nestedDialogOpen
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        props: [
            rootPopupProps,
            {
                'aria-labelledby': titleElementId ?? undefined,
                'aria-describedby': descriptionElementId ?? undefined,
                role: 'dialog',
                tabIndex: -1,
                hidden: !mounted,
                onKeyDown (event) {
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["COMPOSITE_KEYS"].has(event.key)) {
                        event.stopPropagation();
                    }
                },
                style: {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$popup$2f$DialogPopupCssVars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogPopupCssVars"].nestedDialogs]: nestedOpenDialogCount
                }
            },
            elementProps
        ],
        ref: [
            forwardedRef,
            store.context.popupRef,
            store.getElementSetter('popupElement')
        ],
        stateAttributesMapping
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            mounted && modal === true && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$InternalBackdrop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InternalBackdrop"], {
                ref: store.context.internalBackdropRef,
                inert: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$inertValue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inertValue"])(!open)
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingFocusManager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatingFocusManager"], {
                context: floatingRootContext,
                openInteractionType: openMethod,
                disabled: !mounted,
                closeOnFocusOut: dismissible,
                initialFocus: resolvedInitialFocus,
                returnFocus: finalFocus,
                modal: modal !== false,
                restoreFocus: "popup",
                children: element
            })
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogPopup.displayName = "DialogPopup";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/portal/DialogPortal.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogPortal",
    ()=>DialogPortal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingPortal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingPortal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/DialogRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$portal$2f$DialogPortalContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/portal/DialogPortalContext.js [app-ssr] (ecmascript)");
/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function DialogPortal(props) {
    const { children, keepMounted = false, container } = props;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const mounted = store.useState('mounted');
    const shouldRender = mounted || keepMounted;
    if (!shouldRender) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$portal$2f$DialogPortalContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogPortalContext"].Provider, {
        value: keepMounted,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingPortal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatingPortal"], {
            root: container,
            children: children
        })
    });
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useClick.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useClick",
    ()=>useClick
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useAnimationFrame.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useTimeout.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/empty.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/event.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/element.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/createBaseUIEventDetails.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function useClick(context, props = {}) {
    const { open, onOpenChange, dataRef } = context;
    const { enabled = true, event: eventOption = 'click', toggle = true, ignoreMouse = false, stickIfOpen = true, touchOpenDelay = 0 } = props;
    const pointerTypeRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](undefined);
    const frame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAnimationFrame"])();
    const touchOpenTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTimeout"])();
    const reference = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            onPointerDown (event) {
                pointerTypeRef.current = event.pointerType;
            },
            onMouseDown (event) {
                const pointerType = pointerTypeRef.current;
                const nativeEvent = event.nativeEvent;
                // Ignore all buttons except for the "main" button.
                // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
                if (event.button !== 0 || eventOption === 'click' || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMouseLikePointerType"])(pointerType, true) && ignoreMouse) {
                    return;
                }
                const openEvent = dataRef.current.openEvent;
                const openEventType = openEvent?.type;
                const nextOpen = !(open && toggle && (openEvent && stickIfOpen ? openEventType === 'click' || openEventType === 'mousedown' : true));
                // Animations sometimes won't run on a typeable element if using a rAF.
                // Focus is always set on these elements. For touch, we may delay opening.
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTypeableElement"])(nativeEvent.target)) {
                    const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])('trigger-press', nativeEvent);
                    if (nextOpen && pointerType === 'touch' && touchOpenDelay > 0) {
                        touchOpenTimeout.start(touchOpenDelay, ()=>{
                            onOpenChange(true, details);
                        });
                    } else {
                        onOpenChange(nextOpen, details);
                    }
                    return;
                }
                // Wait until focus is set on the element. This is an alternative to
                // `event.preventDefault()` to avoid :focus-visible from appearing when using a pointer.
                frame.request(()=>{
                    const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])('trigger-press', nativeEvent);
                    if (nextOpen && pointerType === 'touch' && touchOpenDelay > 0) {
                        touchOpenTimeout.start(touchOpenDelay, ()=>{
                            onOpenChange(true, details);
                        });
                    } else {
                        onOpenChange(nextOpen, details);
                    }
                });
            },
            onClick (event) {
                if (eventOption === 'mousedown-only') {
                    return;
                }
                const pointerType = pointerTypeRef.current;
                if (eventOption === 'mousedown' && pointerType) {
                    pointerTypeRef.current = undefined;
                    return;
                }
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMouseLikePointerType"])(pointerType, true) && ignoreMouse) {
                    return;
                }
                const openEvent = dataRef.current.openEvent;
                const openEventType = openEvent?.type;
                const nextOpen = !(open && toggle && (openEvent && stickIfOpen ? openEventType === 'click' || openEventType === 'mousedown' || openEventType === 'keydown' || openEventType === 'keyup' : true));
                const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])('trigger-press', event.nativeEvent);
                if (nextOpen && pointerType === 'touch' && touchOpenDelay > 0) {
                    touchOpenTimeout.start(touchOpenDelay, ()=>{
                        onOpenChange(true, details);
                    });
                } else {
                    onOpenChange(nextOpen, details);
                }
            },
            onKeyDown () {
                pointerTypeRef.current = undefined;
            }
        }), [
        dataRef,
        eventOption,
        ignoreMouse,
        onOpenChange,
        open,
        stickIfOpen,
        toggle,
        frame,
        touchOpenTimeout,
        touchOpenDelay
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>enabled ? {
            reference
        } : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"], [
        enabled,
        reference
    ]);
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useDismiss.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeProp",
    ()=>normalizeProp,
    "useDismiss",
    ()=>useDismiss
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.10/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useTimeout.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/element.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/event.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/nodes.js [app-ssr] (ecmascript)");
/* eslint-disable no-underscore-dangle */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingTree.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/createBaseUIEventDetails.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/createAttribute.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
const bubbleHandlerKeys = {
    intentional: 'onClick',
    sloppy: 'onPointerDown'
};
function normalizeProp(normalizable) {
    return {
        escapeKey: typeof normalizable === 'boolean' ? normalizable : normalizable?.escapeKey ?? false,
        outsidePress: typeof normalizable === 'boolean' ? normalizable : normalizable?.outsidePress ?? true
    };
}
function useDismiss(context, props = {}) {
    const { open, onOpenChange, elements, dataRef } = context;
    const { enabled = true, escapeKey = true, outsidePress: outsidePressProp = true, outsidePressEvent = 'sloppy', referencePress = false, referencePressEvent = 'sloppy', ancestorScroll = false, bubbles, capture } = props;
    const tree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFloatingTree"])();
    const outsidePressFn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])(typeof outsidePressProp === 'function' ? outsidePressProp : ()=>false);
    const outsidePress = typeof outsidePressProp === 'function' ? outsidePressFn : outsidePressProp;
    const endedOrStartedInsideRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    const { escapeKey: escapeKeyBubbles, outsidePress: outsidePressBubbles } = normalizeProp(bubbles);
    const { escapeKey: escapeKeyCapture, outsidePress: outsidePressCapture } = normalizeProp(capture);
    const touchStateRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const cancelDismissOnEndTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTimeout"])();
    const insideReactTreeTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTimeout"])();
    const isComposingRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    const currentPointerTypeRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"]('');
    const trackPointerType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((event)=>{
        currentPointerTypeRef.current = event.pointerType;
    });
    const getOutsidePressEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])(()=>{
        const type = currentPointerTypeRef.current;
        const computedType = type === 'pen' || !type ? 'mouse' : type;
        const resolved = typeof outsidePressEvent === 'function' ? outsidePressEvent() : outsidePressEvent;
        if (typeof resolved === 'string') {
            return resolved;
        }
        return resolved[computedType];
    });
    const closeOnEscapeKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((event)=>{
        if (!open || !enabled || !escapeKey || event.key !== 'Escape') {
            return;
        }
        // Wait until IME is settled. Pressing `Escape` while composing should
        // close the compose menu, but not the floating element.
        if (isComposingRef.current) {
            return;
        }
        const nodeId = dataRef.current.floatingContext?.nodeId;
        const children = tree ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNodeChildren"])(tree.nodesRef.current, nodeId) : [];
        if (!escapeKeyBubbles) {
            if (children.length > 0) {
                let shouldDismiss = true;
                children.forEach((child)=>{
                    if (child.context?.open && !child.context.dataRef.current.__escapeKeyBubbles) {
                        shouldDismiss = false;
                    }
                });
                if (!shouldDismiss) {
                    return;
                }
            }
        }
        const native = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isReactEvent"])(event) ? event.nativeEvent : event;
        const eventDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])('escape-key', native);
        onOpenChange(false, eventDetails);
        if (!escapeKeyBubbles && !eventDetails.isPropagationAllowed) {
            event.stopPropagation();
        }
    });
    const shouldIgnoreEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((event)=>{
        const computedOutsidePressEvent = getOutsidePressEvent();
        return computedOutsidePressEvent === 'intentional' && event.type !== 'click' || computedOutsidePressEvent === 'sloppy' && event.type === 'click';
    });
    const closeOnEscapeKeyDownCapture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((event)=>{
        const callback = ()=>{
            closeOnEscapeKeyDown(event);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTarget"])(event)?.removeEventListener('keydown', callback);
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTarget"])(event)?.addEventListener('keydown', callback);
    });
    const closeOnPressOutside = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((event, endedOrStartedInside = false)=>{
        if (shouldIgnoreEvent(event)) {
            return;
        }
        // Given developers can stop the propagation of the synthetic event,
        // we can only be confident with a positive value.
        const insideReactTree = dataRef.current.insideReactTree;
        dataRef.current.insideReactTree = false;
        if (getOutsidePressEvent() === 'intentional' && endedOrStartedInside) {
            return;
        }
        if (insideReactTree) {
            return;
        }
        if (typeof outsidePress === 'function' && !outsidePress(event)) {
            return;
        }
        const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTarget"])(event);
        const inertSelector = `[${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createAttribute$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createAttribute"])('inert')}]`;
        const markers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocument"])(elements.floating).querySelectorAll(inertSelector);
        let targetRootAncestor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(target) ? target : null;
        while(targetRootAncestor && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isLastTraversableNode"])(targetRootAncestor)){
            const nextParent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getParentNode"])(targetRootAncestor);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isLastTraversableNode"])(nextParent) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(nextParent)) {
                break;
            }
            targetRootAncestor = nextParent;
        }
        // Check if the click occurred on a third-party element injected after the
        // floating element rendered.
        if (markers.length && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(target) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRootElement"])(target) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
        !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(target, elements.floating) && // If the target root element contains none of the markers, then the
        // element was injected after the floating element rendered.
        Array.from(markers).every((marker)=>!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(targetRootAncestor, marker))) {
            return;
        }
        // Check if the click occurred on the scrollbar
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"])(target)) {
            const lastTraversableNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isLastTraversableNode"])(target);
            const style = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getComputedStyle"])(target);
            const scrollRe = /auto|scroll/;
            const isScrollableX = lastTraversableNode || scrollRe.test(style.overflowX);
            const isScrollableY = lastTraversableNode || scrollRe.test(style.overflowY);
            const canScrollX = isScrollableX && target.clientWidth > 0 && target.scrollWidth > target.clientWidth;
            const canScrollY = isScrollableY && target.clientHeight > 0 && target.scrollHeight > target.clientHeight;
            const isRTL = style.direction === 'rtl';
            // Check click position relative to scrollbar.
            // In some browsers it is possible to change the <body> (or window)
            // scrollbar to the left side, but is very rare and is difficult to
            // check for. Plus, for modal dialogs with backdrops, it is more
            // important that the backdrop is checked but not so much the window.
            const pressedVerticalScrollbar = canScrollY && (isRTL ? event.offsetX <= target.offsetWidth - target.clientWidth : event.offsetX > target.clientWidth);
            const pressedHorizontalScrollbar = canScrollX && event.offsetY > target.clientHeight;
            if (pressedVerticalScrollbar || pressedHorizontalScrollbar) {
                return;
            }
        }
        const nodeId = dataRef.current.floatingContext?.nodeId;
        const targetIsInsideChildren = tree && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNodeChildren"])(tree.nodesRef.current, nodeId).some((node)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, node.context?.elements.floating));
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, elements.floating) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, elements.domReference) || targetIsInsideChildren) {
            return;
        }
        const children = tree ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$nodes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNodeChildren"])(tree.nodesRef.current, nodeId) : [];
        if (children.length > 0) {
            let shouldDismiss = true;
            children.forEach((child)=>{
                if (child.context?.open && !child.context.dataRef.current.__outsidePressBubbles) {
                    shouldDismiss = false;
                }
            });
            if (!shouldDismiss) {
                return;
            }
        }
        onOpenChange(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])('outside-press', event));
    });
    const handlePointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((event)=>{
        if (getOutsidePressEvent() !== 'sloppy' || !open || !enabled || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, elements.floating) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, elements.domReference)) {
            return;
        }
        if (event.pointerType === 'touch') {
            touchStateRef.current = {
                startTime: Date.now(),
                startX: event.clientX,
                startY: event.clientY,
                dismissOnPointerUp: false,
                dismissOnMouseDown: true
            };
            cancelDismissOnEndTimeout.start(1000, ()=>{
                if (touchStateRef.current) {
                    touchStateRef.current.dismissOnPointerUp = false;
                    touchStateRef.current.dismissOnMouseDown = false;
                }
            });
            return;
        }
        closeOnPressOutside(event);
    });
    const closeOnPressOutsideCapture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((event)=>{
        // When click outside is lazy (`up` event), handle dragging.
        // Don't close if:
        // - The click started inside the floating element.
        // - The click ended inside the floating element.
        const endedOrStartedInside = endedOrStartedInsideRef.current;
        endedOrStartedInsideRef.current = false;
        if (shouldIgnoreEvent(event)) {
            return;
        }
        cancelDismissOnEndTimeout.clear();
        if (event.type === 'mousedown' && touchStateRef.current && !touchStateRef.current.dismissOnMouseDown) {
            return;
        }
        const callback = ()=>{
            if (event.type === 'pointerdown') {
                handlePointerDown(event);
            } else {
                closeOnPressOutside(event, endedOrStartedInside);
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTarget"])(event)?.removeEventListener(event.type, callback);
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTarget"])(event)?.addEventListener(event.type, callback);
    });
    const handlePointerMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((event)=>{
        if (getOutsidePressEvent() !== 'sloppy' || event.pointerType !== 'touch' || !touchStateRef.current || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, elements.floating) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, elements.domReference)) {
            return;
        }
        const deltaX = Math.abs(event.clientX - touchStateRef.current.startX);
        const deltaY = Math.abs(event.clientY - touchStateRef.current.startY);
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (distance > 5) {
            touchStateRef.current.dismissOnPointerUp = true;
        }
        if (distance > 10) {
            closeOnPressOutside(event);
            cancelDismissOnEndTimeout.clear();
            touchStateRef.current = null;
        }
    });
    const handlePointerUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((event)=>{
        if (getOutsidePressEvent() !== 'sloppy' || event.pointerType !== 'touch' || !touchStateRef.current || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, elements.floating) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isEventTargetWithin"])(event, elements.domReference)) {
            return;
        }
        if (touchStateRef.current.dismissOnPointerUp) {
            closeOnPressOutside(event);
        }
        cancelDismissOnEndTimeout.clear();
        touchStateRef.current = null;
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (!open || !enabled) {
            return undefined;
        }
        dataRef.current.__escapeKeyBubbles = escapeKeyBubbles;
        dataRef.current.__outsidePressBubbles = outsidePressBubbles;
        const compositionTimeout = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timeout"]();
        function onScroll(event) {
            onOpenChange(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])('none', event));
        }
        function handleCompositionStart() {
            compositionTimeout.clear();
            isComposingRef.current = true;
        }
        function handleCompositionEnd() {
            // Safari fires `compositionend` before `keydown`, so we need to wait
            // until the next tick to set `isComposing` to `false`.
            // https://bugs.webkit.org/show_bug.cgi?id=165004
            compositionTimeout.start(// 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
            // Only apply to WebKit for the test to remain 0ms.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isWebKit"])() ? 5 : 0, ()=>{
                isComposingRef.current = false;
            });
        }
        const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocument"])(elements.floating);
        doc.addEventListener('pointerdown', trackPointerType, true);
        if (escapeKey) {
            doc.addEventListener('keydown', escapeKeyCapture ? closeOnEscapeKeyDownCapture : closeOnEscapeKeyDown, escapeKeyCapture);
            doc.addEventListener('compositionstart', handleCompositionStart);
            doc.addEventListener('compositionend', handleCompositionEnd);
        }
        if (outsidePress) {
            doc.addEventListener('click', outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
            doc.addEventListener('pointerdown', outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
            doc.addEventListener('pointermove', handlePointerMove, outsidePressCapture);
            doc.addEventListener('pointerup', handlePointerUp, outsidePressCapture);
            doc.addEventListener('mousedown', closeOnPressOutsideCapture, outsidePressCapture);
        }
        let ancestors = [];
        if (ancestorScroll) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(elements.domReference)) {
                ancestors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOverflowAncestors"])(elements.domReference);
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(elements.floating)) {
                ancestors = ancestors.concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOverflowAncestors"])(elements.floating));
            }
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(elements.reference) && elements.reference && elements.reference.contextElement) {
                ancestors = ancestors.concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOverflowAncestors"])(elements.reference.contextElement));
            }
        }
        // Ignore the visual viewport for scrolling dismissal (allow pinch-zoom)
        ancestors = ancestors.filter((ancestor)=>ancestor !== doc.defaultView?.visualViewport);
        ancestors.forEach((ancestor)=>{
            ancestor.addEventListener('scroll', onScroll, {
                passive: true
            });
        });
        return ()=>{
            doc.removeEventListener('pointerdown', trackPointerType, true);
            if (escapeKey) {
                doc.removeEventListener('keydown', escapeKeyCapture ? closeOnEscapeKeyDownCapture : closeOnEscapeKeyDown, escapeKeyCapture);
                doc.removeEventListener('compositionstart', handleCompositionStart);
                doc.removeEventListener('compositionend', handleCompositionEnd);
            }
            if (outsidePress) {
                doc.removeEventListener('click', outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
                doc.removeEventListener('pointerdown', outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
                doc.removeEventListener('pointermove', handlePointerMove, outsidePressCapture);
                doc.removeEventListener('pointerup', handlePointerUp, outsidePressCapture);
                doc.removeEventListener('mousedown', closeOnPressOutsideCapture, outsidePressCapture);
            }
            ancestors.forEach((ancestor)=>{
                ancestor.removeEventListener('scroll', onScroll);
            });
            compositionTimeout.clear();
        };
    }, [
        dataRef,
        elements,
        escapeKey,
        outsidePress,
        open,
        onOpenChange,
        ancestorScroll,
        enabled,
        escapeKeyBubbles,
        outsidePressBubbles,
        closeOnEscapeKeyDown,
        escapeKeyCapture,
        closeOnEscapeKeyDownCapture,
        closeOnPressOutside,
        outsidePressCapture,
        closeOnPressOutsideCapture,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        trackPointerType
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        dataRef.current.insideReactTree = false;
    }, [
        dataRef,
        outsidePress
    ]);
    const reference = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            onKeyDown: closeOnEscapeKeyDown,
            ...referencePress && {
                [bubbleHandlerKeys[referencePressEvent]]: (event)=>{
                    onOpenChange(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])('trigger-press', event.nativeEvent));
                },
                ...referencePressEvent !== 'intentional' && {
                    onClick (event) {
                        onOpenChange(false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])('trigger-press', event.nativeEvent));
                    }
                }
            }
        }), [
        closeOnEscapeKeyDown,
        onOpenChange,
        referencePress,
        referencePressEvent
    ]);
    const handlePressedInside = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((event)=>{
        const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTarget"])(event.nativeEvent);
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(elements.floating, target) || event.button !== 0) {
            return;
        }
        endedOrStartedInsideRef.current = true;
    });
    const handleCaptureInside = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])(()=>{
        dataRef.current.insideReactTree = true;
        insideReactTreeTimeout.start(0, ()=>{
            dataRef.current.insideReactTree = false;
        });
    });
    const floating = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            onKeyDown: closeOnEscapeKeyDown,
            onMouseDown: handlePressedInside,
            onMouseUp: handlePressedInside,
            onPointerDownCapture: handleCaptureInside,
            onMouseDownCapture: handleCaptureInside,
            onClickCapture: handleCaptureInside,
            onMouseUpCapture: handleCaptureInside
        }), [
        closeOnEscapeKeyDown,
        handlePressedInside,
        handleCaptureInside
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>enabled ? {
            reference,
            floating
        } : {}, [
        enabled,
        reference,
        floating
    ]);
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useFloatingRootContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getEmptyContext",
    ()=>getEmptyContext,
    "useFloatingRootContext",
    ()=>useFloatingRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.10/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createEventEmitter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/createEventEmitter.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingTree.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
function useFloatingRootContext(options) {
    const { open = false, onOpenChange: onOpenChangeProp, elements: elementsProp } = options;
    const floatingId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const dataRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"]({});
    const [events] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$createEventEmitter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createEventEmitter"])());
    const nested = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFloatingParentNodeId"])() != null;
    if ("TURBOPACK compile-time truthy", 1) {
        const optionDomReference = elementsProp.reference;
        if (optionDomReference && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(optionDomReference)) {
            console.error('Cannot pass a virtual element to the `elements.reference` option,', 'as it must be a real DOM element. Use `refs.setPositionReference()`', 'instead.');
        }
    }
    const [positionReference, setPositionReference] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](elementsProp.reference);
    const onOpenChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((newOpen, eventDetails)=>{
        dataRef.current.openEvent = newOpen ? eventDetails.event : undefined;
        if (!options.noEmit) {
            const details = {
                open: newOpen,
                reason: eventDetails.reason,
                nativeEvent: eventDetails.event,
                nested
            };
            events.emit('openchange', details);
        }
        onOpenChangeProp?.(newOpen, eventDetails);
    });
    const refs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            setPositionReference
        }), []);
    const elements = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            reference: positionReference || elementsProp.reference || null,
            floating: elementsProp.floating || null,
            domReference: elementsProp.reference
        }), [
        positionReference,
        elementsProp.reference,
        elementsProp.floating
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            dataRef,
            open,
            onOpenChange,
            elements,
            events,
            floatingId,
            refs
        }), [
        open,
        onOpenChange,
        elements,
        events,
        floatingId,
        refs
    ]);
}
function getEmptyContext() {
    return {
        open: false,
        onOpenChange: ()=>{},
        dataRef: {
            current: {}
        },
        elements: {
            floating: null,
            reference: null,
            domReference: null
        },
        events: {
            on: ()=>{},
            off: ()=>{},
            emit: ()=>{}
        },
        floatingId: '',
        refs: {
            setPositionReference: ()=>{}
        }
    };
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useInteractions.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useInteractions",
    ()=>useInteractions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/constants.js [app-ssr] (ecmascript)");
;
;
function useInteractions(propsList = []) {
    const referenceDeps = propsList.map((key)=>key?.reference);
    const floatingDeps = propsList.map((key)=>key?.floating);
    const itemDeps = propsList.map((key)=>key?.item);
    const getReferenceProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((userProps)=>mergeProps(userProps, propsList, 'reference'), // eslint-disable-next-line react-hooks/exhaustive-deps
    referenceDeps);
    const getFloatingProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((userProps)=>mergeProps(userProps, propsList, 'floating'), // eslint-disable-next-line react-hooks/exhaustive-deps
    floatingDeps);
    const getItemProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((userProps)=>mergeProps(userProps, propsList, 'item'), // eslint-disable-next-line react-hooks/exhaustive-deps
    itemDeps);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            getReferenceProps,
            getFloatingProps,
            getItemProps
        }), [
        getReferenceProps,
        getFloatingProps,
        getItemProps
    ]);
}
/* eslint-disable guard-for-in */ function mergeProps(userProps, propsList, elementKey) {
    const eventHandlers = new Map();
    const isItem = elementKey === 'item';
    const outputProps = {};
    if (elementKey === 'floating') {
        outputProps.tabIndex = -1;
        outputProps[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FOCUSABLE_ATTRIBUTE"]] = '';
    }
    for(const key in userProps){
        if (isItem && userProps) {
            if (key === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ACTIVE_KEY"] || key === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELECTED_KEY"]) {
                continue;
            }
        }
        outputProps[key] = userProps[key];
    }
    for(let i = 0; i < propsList.length; i += 1){
        let props;
        const propsOrGetProps = propsList[i]?.[elementKey];
        if (typeof propsOrGetProps === 'function') {
            props = userProps ? propsOrGetProps(userProps) : null;
        } else {
            props = propsOrGetProps;
        }
        if (!props) {
            continue;
        }
        mutablyMergeProps(outputProps, props, isItem, eventHandlers);
    }
    mutablyMergeProps(outputProps, userProps, isItem, eventHandlers);
    return outputProps;
}
function mutablyMergeProps(outputProps, props, isItem, eventHandlers) {
    for(const key in props){
        const value = props[key];
        if (isItem && (key === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ACTIVE_KEY"] || key === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELECTED_KEY"])) {
            continue;
        }
        if (!key.startsWith('on')) {
            outputProps[key] = value;
        } else {
            if (!eventHandlers.has(key)) {
                eventHandlers.set(key, []);
            }
            if (typeof value === 'function') {
                eventHandlers.get(key)?.push(value);
                outputProps[key] = (...args)=>{
                    return eventHandlers.get(key)?.map((fn)=>fn(...args)).find((val)=>val !== undefined);
                };
            }
        }
    }
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useRole.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRole",
    ()=>useRole
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/element.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingTree.js [app-ssr] (ecmascript)");
;
;
;
;
const componentRoleToAriaRoleMap = new Map([
    [
        'select',
        'listbox'
    ],
    [
        'combobox',
        'listbox'
    ],
    [
        'label',
        false
    ]
]);
function useRole(context, props = {}) {
    const { open, elements, floatingId: defaultFloatingId } = context;
    const { enabled = true, role = 'dialog' } = props;
    const defaultReferenceId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const referenceId = elements.domReference?.id || defaultReferenceId;
    const floatingId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFloatingFocusElement"])(elements.floating)?.id || defaultFloatingId, [
        elements.floating,
        defaultFloatingId
    ]);
    const ariaRole = componentRoleToAriaRoleMap.get(role) ?? role;
    const parentId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFloatingParentNodeId"])();
    const isNested = parentId != null;
    const reference = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (ariaRole === 'tooltip' || role === 'label') {
            return {
                [`aria-${role === 'label' ? 'labelledby' : 'describedby'}`]: open ? floatingId : undefined
            };
        }
        return {
            'aria-expanded': open ? 'true' : 'false',
            'aria-haspopup': ariaRole === 'alertdialog' ? 'dialog' : ariaRole,
            'aria-controls': open ? floatingId : undefined,
            ...ariaRole === 'listbox' && {
                role: 'combobox'
            },
            ...ariaRole === 'menu' && {
                id: referenceId
            },
            ...ariaRole === 'menu' && isNested && {
                role: 'menuitem'
            },
            ...role === 'select' && {
                'aria-autocomplete': 'none'
            },
            ...role === 'combobox' && {
                'aria-autocomplete': 'list'
            }
        };
    }, [
        ariaRole,
        floatingId,
        isNested,
        open,
        referenceId,
        role
    ]);
    const floating = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const floatingProps = {
            id: floatingId,
            ...ariaRole && {
                role: ariaRole
            }
        };
        if (ariaRole === 'tooltip' || role === 'label') {
            return floatingProps;
        }
        return {
            ...floatingProps,
            ...ariaRole === 'menu' && {
                'aria-labelledby': referenceId
            }
        };
    }, [
        ariaRole,
        floatingId,
        referenceId,
        role
    ]);
    const item = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](({ active, selected })=>{
        const commonProps = {
            role: 'option',
            ...active && {
                id: `${floatingId}-fui-option`
            }
        };
        // For `menu`, we are unable to tell if the item is a `menuitemradio`
        // or `menuitemcheckbox`. For backwards-compatibility reasons, also
        // avoid defaulting to `menuitem` as it may overwrite custom role props.
        switch(role){
            case 'select':
            case 'combobox':
                return {
                    ...commonProps,
                    'aria-selected': selected
                };
            default:
        }
        return {};
    }, [
        floatingId,
        role
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>enabled ? {
            reference,
            floating,
            item
        } : {}, [
        enabled,
        reference,
        floating,
        item
    ]);
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useScrollLock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useScrollLock",
    ()=>useScrollLock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/detectBrowser.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/owner.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__getWindow__as__ownerWindow$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.10/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs [app-ssr] (ecmascript) <export getWindow as ownerWindow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useTimeout.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useAnimationFrame.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/empty.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
/* eslint-disable lines-between-class-members */ let originalHtmlStyles = {};
let originalBodyStyles = {};
let originalHtmlScrollBehavior = '';
function hasInsetScrollbars(referenceElement) {
    if (typeof document === 'undefined') {
        return false;
    }
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(referenceElement);
    const win = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__getWindow__as__ownerWindow$3e$__["ownerWindow"])(doc);
    return win.innerWidth - doc.documentElement.clientWidth > 0;
}
function preventScrollBasic(referenceElement) {
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(referenceElement);
    const html = doc.documentElement;
    const originalOverflow = html.style.overflow;
    html.style.overflow = 'hidden';
    return ()=>{
        html.style.overflow = originalOverflow;
    };
}
function preventScrollStandard(referenceElement) {
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(referenceElement);
    const html = doc.documentElement;
    const body = doc.body;
    const win = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__getWindow__as__ownerWindow$3e$__["ownerWindow"])(html);
    let scrollTop = 0;
    let scrollLeft = 0;
    const resizeFrame = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimationFrame"].create();
    // Pinch-zoom in Safari causes a shift. Just don't lock scroll if there's any pinch-zoom.
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isWebKit"] && (win.visualViewport?.scale ?? 1) !== 1) {
        return ()=>{};
    }
    function lockScroll() {
        /* DOM reads: */ const htmlStyles = win.getComputedStyle(html);
        const bodyStyles = win.getComputedStyle(body);
        scrollTop = html.scrollTop;
        scrollLeft = html.scrollLeft;
        originalHtmlStyles = {
            scrollbarGutter: html.style.scrollbarGutter,
            overflowY: html.style.overflowY,
            overflowX: html.style.overflowX
        };
        originalHtmlScrollBehavior = html.style.scrollBehavior;
        originalBodyStyles = {
            position: body.style.position,
            height: body.style.height,
            width: body.style.width,
            boxSizing: body.style.boxSizing,
            overflowY: body.style.overflowY,
            overflowX: body.style.overflowX,
            scrollBehavior: body.style.scrollBehavior
        };
        // Handle `scrollbar-gutter` in Chrome when there is no scrollable content.
        const supportsStableScrollbarGutter = typeof CSS !== 'undefined' && CSS.supports?.('scrollbar-gutter', 'stable');
        const isScrollableY = html.scrollHeight > html.clientHeight;
        const isScrollableX = html.scrollWidth > html.clientWidth;
        const hasConstantOverflowY = htmlStyles.overflowY === 'scroll' || bodyStyles.overflowY === 'scroll';
        const hasConstantOverflowX = htmlStyles.overflowX === 'scroll' || bodyStyles.overflowX === 'scroll';
        // Values can be negative in Firefox
        const scrollbarWidth = Math.max(0, win.innerWidth - html.clientWidth);
        const scrollbarHeight = Math.max(0, win.innerHeight - html.clientHeight);
        // Avoid shift due to the default <body> margin. This does cause elements to be clipped
        // with whitespace. Warn if <body> has margins?
        const marginY = parseFloat(bodyStyles.marginTop) + parseFloat(bodyStyles.marginBottom);
        const marginX = parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight);
        /*
     * DOM writes:
     * Do not read the DOM past this point!
     */ Object.assign(html.style, {
            scrollbarGutter: 'stable',
            overflowY: !supportsStableScrollbarGutter && (isScrollableY || hasConstantOverflowY) ? 'scroll' : 'hidden',
            overflowX: !supportsStableScrollbarGutter && (isScrollableX || hasConstantOverflowX) ? 'scroll' : 'hidden'
        });
        Object.assign(body.style, {
            position: 'relative',
            height: marginY || scrollbarHeight ? `calc(100dvh - ${marginY + scrollbarHeight}px)` : '100dvh',
            width: marginX || scrollbarWidth ? `calc(100vw - ${marginX + scrollbarWidth}px)` : '100vw',
            boxSizing: 'border-box',
            overflow: 'hidden',
            scrollBehavior: 'unset'
        });
        body.scrollTop = scrollTop;
        body.scrollLeft = scrollLeft;
        html.setAttribute('data-base-ui-scroll-locked', '');
        html.style.scrollBehavior = 'unset';
    }
    function cleanup() {
        Object.assign(html.style, originalHtmlStyles);
        Object.assign(body.style, originalBodyStyles);
        html.scrollTop = scrollTop;
        html.scrollLeft = scrollLeft;
        html.removeAttribute('data-base-ui-scroll-locked');
        html.style.scrollBehavior = originalHtmlScrollBehavior;
    }
    function handleResize() {
        cleanup();
        resizeFrame.request(lockScroll);
    }
    lockScroll();
    win.addEventListener('resize', handleResize);
    return ()=>{
        resizeFrame.cancel();
        cleanup();
        win.removeEventListener('resize', handleResize);
    };
}
class ScrollLocker {
    lockCount = 0;
    restore = (()=>null)();
    timeoutLock = (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timeout"].create())();
    timeoutUnlock = (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useTimeout$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Timeout"].create())();
    acquire(referenceElement) {
        this.lockCount += 1;
        if (this.lockCount === 1 && this.restore === null) {
            this.timeoutLock.start(0, ()=>this.lock(referenceElement));
        }
        return this.release;
    }
    release = ()=>{
        this.lockCount -= 1;
        if (this.lockCount === 0 && this.restore) {
            this.timeoutUnlock.start(0, this.unlock);
        }
    };
    unlock = ()=>{
        if (this.lockCount === 0 && this.restore) {
            this.restore?.();
            this.restore = null;
        }
    };
    lock(referenceElement) {
        if (this.lockCount === 0 || this.restore !== null) {
            return;
        }
        const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(referenceElement);
        const html = doc.documentElement;
        const htmlOverflowY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__getWindow__as__ownerWindow$3e$__["ownerWindow"])(html).getComputedStyle(html).overflowY;
        // If the site author already hid overflow on <html>, respect it and bail out.
        if (htmlOverflowY === 'hidden' || htmlOverflowY === 'clip') {
            this.restore = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NOOP"];
            return;
        }
        const isOverflowHiddenLock = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isIOS"] || !hasInsetScrollbars(referenceElement);
        // On iOS, scroll locking does not work if the navbar is collapsed. Due to numerous
        // side effects and bugs that arise on iOS, it must be researched extensively before
        // being enabled to ensure it doesn't cause the following issues:
        // - Textboxes must scroll into view when focused, nor cause a glitchy scroll animation.
        // - The navbar must not force itself into view and cause layout shift.
        // - Scroll containers must not flicker upon closing a popup when it has an exit animation.
        this.restore = isOverflowHiddenLock ? preventScrollBasic(referenceElement) : preventScrollStandard(referenceElement);
    }
}
const SCROLL_LOCKER = new ScrollLocker();
function useScrollLock(params) {
    const { enabled = true, mounted, open, referenceElement = null } = params;
    // https://github.com/mui/base-ui/issues/1135
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (enabled && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isWebKit"] && mounted && !open) {
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(referenceElement);
            const originalUserSelect = doc.body.style.userSelect;
            const originalWebkitUserSelect = doc.body.style.webkitUserSelect;
            doc.body.style.userSelect = 'none';
            doc.body.style.webkitUserSelect = 'none';
            return ()=>{
                doc.body.style.userSelect = originalUserSelect;
                doc.body.style.webkitUserSelect = originalWebkitUserSelect;
            };
        }
        return undefined;
    }, [
        enabled,
        mounted,
        open,
        referenceElement
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (!enabled) {
            return undefined;
        }
        return SCROLL_LOCKER.acquire(referenceElement);
    }, [
        enabled,
        referenceElement
    ]);
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useTransitionStatus.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTransitionStatus",
    ()=>useTransitionStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useAnimationFrame.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function useTransitionStatus(open, enableIdleState = false, deferEndingState = false) {
    const [transitionStatus, setTransitionStatus] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](open && enableIdleState ? 'idle' : undefined);
    const [mounted, setMounted] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](open);
    if (open && !mounted) {
        setMounted(true);
        setTransitionStatus('starting');
    }
    if (!open && mounted && transitionStatus !== 'ending' && !deferEndingState) {
        setTransitionStatus('ending');
    }
    if (!open && !mounted && transitionStatus === 'ending') {
        setTransitionStatus(undefined);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (!open && mounted && transitionStatus !== 'ending' && deferEndingState) {
            const frame = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimationFrame"].request(()=>{
                setTransitionStatus('ending');
            });
            return ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimationFrame"].cancel(frame);
            };
        }
        return undefined;
    }, [
        open,
        mounted,
        transitionStatus,
        deferEndingState
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (!open || enableIdleState) {
            return undefined;
        }
        const frame = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimationFrame"].request(()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["flushSync"](()=>{
                setTransitionStatus(undefined);
            });
        });
        return ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimationFrame"].cancel(frame);
        };
    }, [
        enableIdleState,
        open
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (!open || !enableIdleState) {
            return undefined;
        }
        if (open && mounted && transitionStatus !== 'idle') {
            setTransitionStatus('starting');
        }
        const frame = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimationFrame"].request(()=>{
            setTransitionStatus('idle');
        });
        return ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useAnimationFrame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimationFrame"].cancel(frame);
        };
    }, [
        enableIdleState,
        open,
        mounted,
        setTransitionStatus,
        transitionStatus
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            mounted,
            setMounted,
            transitionStatus
        }), [
        mounted,
        transitionStatus
    ]);
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useOpenInteractionType.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useOpenInteractionType",
    ()=>useOpenInteractionType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEnhancedClickHandler$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEnhancedClickHandler.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function useOpenInteractionType(open) {
    const [openMethod, setOpenMethod] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const handleTriggerClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((_, interactionType)=>{
        if (!open) {
            setOpenMethod(interactionType);
        }
    });
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])(()=>{
        setOpenMethod(null);
    });
    const { onClick, onPointerDown } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEnhancedClickHandler$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEnhancedClickHandler"])(handleTriggerClick);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            openMethod,
            reset,
            triggerProps: {
                onClick,
                onPointerDown
            }
        }), [
        openMethod,
        reset,
        onClick,
        onPointerDown
    ]);
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/useDialogRoot.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDialogRoot",
    ()=>useDialogRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useClick$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useClick.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useDismiss$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useDismiss.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useFloatingRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useFloatingRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useInteractions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useInteractions.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useRole$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useRole.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/element.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useScrollLock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useScrollLock.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useTransitionStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useTransitionStatus.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useOpenInteractionType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useOpenInteractionType.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useOpenChangeComplete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useOpenChangeComplete.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function useDialogRoot(params) {
    const { store, parentContext } = params;
    const open = store.useState('open');
    const dismissible = store.useState('dismissible');
    const modal = store.useState('modal');
    const triggerElement = store.useState('triggerElement');
    const popupElement = store.useState('popupElement');
    const { mounted, setMounted, transitionStatus } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useTransitionStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransitionStatus"])(open);
    const { openMethod, triggerProps, reset: resetOpenInteractionType } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useOpenInteractionType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOpenInteractionType"])(open);
    const handleUnmount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])(()=>{
        setMounted(false);
        store.context.openChangeComplete?.(false);
        resetOpenInteractionType();
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useOpenChangeComplete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOpenChangeComplete"])({
        enabled: !params.actionsRef,
        open,
        ref: store.context.popupRef,
        onComplete () {
            if (!open) {
                handleUnmount();
            }
        }
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useImperativeHandle"](params.actionsRef, ()=>({
            unmount: handleUnmount
        }), [
        handleUnmount
    ]);
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useFloatingRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFloatingRootContext"])({
        elements: {
            reference: triggerElement,
            floating: popupElement
        },
        open,
        onOpenChange: store.setOpen,
        noEmit: true
    });
    const [ownNestedOpenDialogs, setOwnNestedOpenDialogs] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](0);
    const isTopmost = ownNestedOpenDialogs === 0;
    const role = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useRole$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRole"])(context);
    const click = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useClick$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useClick"])(context);
    const dismiss = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useDismiss$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDismiss"])(context, {
        outsidePressEvent () {
            if (store.context.internalBackdropRef.current || store.context.backdropRef.current) {
                return 'intentional';
            }
            // Ensure `aria-hidden` on outside elements is removed immediately
            // on outside press when trapping focus.
            return {
                mouse: modal === 'trap-focus' ? 'sloppy' : 'intentional',
                touch: 'sloppy'
            };
        },
        outsidePress (event) {
            if (event.button !== 0) {
                return false;
            }
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTarget"])(event);
            if (isTopmost && dismissible) {
                const eventTarget = target;
                // Only close if the click occurred on the dialog's owning backdrop.
                // This supports multiple modal dialogs that aren't nested in the React tree:
                // https://github.com/mui/base-ui/issues/1320
                if (modal) {
                    return store.context.internalBackdropRef.current || store.context.backdropRef.current ? store.context.internalBackdropRef.current === eventTarget || store.context.backdropRef.current === eventTarget : true;
                }
                return true;
            }
            return false;
        },
        escapeKey: isTopmost
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useScrollLock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScrollLock"])({
        enabled: open && modal === true,
        mounted,
        open,
        referenceElement: popupElement
    });
    const { getReferenceProps, getFloatingProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useInteractions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInteractions"])([
        role,
        click,
        dismiss
    ]);
    // Listen for nested open/close events on this store to maintain the count
    store.useContextCallback('nestedDialogOpen', (ownChildrenCount)=>{
        setOwnNestedOpenDialogs(ownChildrenCount + 1);
    });
    store.useContextCallback('nestedDialogClose', ()=>{
        setOwnNestedOpenDialogs(0);
    });
    // Notify parent of our open/close state using parent callbacks, if any
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (parentContext?.nestedDialogOpen && open) {
            parentContext.nestedDialogOpen(ownNestedOpenDialogs);
        }
        if (parentContext?.nestedDialogClose && !open) {
            parentContext.nestedDialogClose();
        }
        return ()=>{
            if (parentContext?.nestedDialogClose && open) {
                parentContext.nestedDialogClose();
            }
        };
    }, [
        open,
        parentContext,
        ownNestedOpenDialogs
    ]);
    const dialogTriggerProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>getReferenceProps(triggerProps), [
        getReferenceProps,
        triggerProps
    ]);
    store.useSyncedValues({
        openMethod,
        mounted,
        transitionStatus,
        triggerProps: dialogTriggerProps,
        popupProps: getFloatingProps(),
        floatingRootContext: context,
        nestedOpenDialogCount: ownNestedOpenDialogs
    });
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/store.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogStore",
    ()=>DialogStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/store/createSelector.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$store$2f$ReactStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/store/ReactStore.js [app-ssr] (ecmascript)");
;
;
const selectors = {
    open: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.open),
    modal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.modal),
    nested: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.nested),
    nestedOpenDialogCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.nestedOpenDialogCount),
    dismissible: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.dismissible),
    openMethod: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.openMethod),
    descriptionElementId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.descriptionElementId),
    titleElementId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.titleElementId),
    mounted: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.mounted),
    transitionStatus: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.transitionStatus),
    triggerProps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.triggerProps),
    popupProps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.popupProps),
    floatingRootContext: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.floatingRootContext),
    popupElement: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.popupElement),
    triggerElement: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$store$2f$createSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.triggerElement)
};
class DialogStore extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$store$2f$ReactStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReactStore"] {
    static create(initialState) {
        const context = {
            popupRef: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRef"](),
            backdropRef: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRef"](),
            internalBackdropRef: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRef"]()
        };
        return new DialogStore(initialState, context, selectors);
    }
    setOpen = (nextOpen, eventDetails)=>{
        this.context.openChange?.(nextOpen, eventDetails);
        if (eventDetails.isCanceled) {
            return;
        }
        const details = {
            open: nextOpen,
            nativeEvent: eventDetails.event,
            reason: eventDetails.reason,
            nested: this.state.nested
        };
        this.state.floatingRootContext.events?.emit('openchange', details);
        this.set('open', nextOpen);
    };
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/DialogRoot.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogRoot",
    ()=>DialogRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useRefWithInit.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$useDialogRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/useDialogRoot.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/DialogRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/store.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useFloatingRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useFloatingRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/empty.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const INITIAL_STATE = {
    open: false,
    dismissible: true,
    nested: false,
    popupElement: null,
    triggerElement: null,
    modal: true,
    descriptionElementId: undefined,
    titleElementId: undefined,
    openMethod: null,
    mounted: false,
    transitionStatus: 'idle',
    nestedOpenDialogCount: 0,
    triggerProps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"],
    popupProps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"],
    floatingRootContext: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useFloatingRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getEmptyContext"])()
};
const DialogRoot = function DialogRoot(props) {
    const { children, open: openProp, defaultOpen: defaultOpenProp = false, onOpenChange, onOpenChangeComplete, dismissible = true, modal = true, actionsRef } = props;
    const parentDialogRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogRootContext"])(true);
    const nested = Boolean(parentDialogRootContext);
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRefWithInit"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogStore"].create, INITIAL_STATE).current;
    store.useControlledProp('open', openProp, defaultOpenProp);
    store.useSyncedValues({
        dismissible,
        nested,
        modal
    });
    store.useContextCallback('openChange', onOpenChange);
    store.useContextCallback('openChangeComplete', onOpenChangeComplete);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$useDialogRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogRoot"])({
        store,
        actionsRef,
        parentContext: parentDialogRootContext?.store.context,
        onOpenChange
    });
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            store
        }), [
        store
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogRootContext"].Provider, {
        value: contextValue,
        children: children
    });
};
if ("TURBOPACK compile-time truthy", 1) DialogRoot.displayName = "DialogRoot";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/title/DialogTitle.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogTitle",
    ()=>DialogTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/DialogRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const DialogTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function DialogTitle(componentProps, forwardedRef) {
    const { render, className, id: idProp, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    store.useSyncedValueWithCleanup('titleElementId', id);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('h2', componentProps, {
        ref: forwardedRef,
        props: [
            {
                id
            },
            elementProps
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogTitle.displayName = "DialogTitle";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/trigger/DialogTrigger.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/DialogRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/use-button/useButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/constants.js [app-ssr] (ecmascript) <locals>");
'use client';
;
;
;
;
;
;
const DialogTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function DialogTrigger(componentProps, forwardedRef) {
    const { render, className, disabled = false, nativeButton = true, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const open = store.useState('open');
    const triggerProps = store.useState('triggerProps');
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            disabled,
            open
        }), [
        disabled,
        open
    ]);
    const { getButtonProps, buttonRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useButton"])({
        disabled,
        native: nativeButton
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('button', componentProps, {
        state,
        ref: [
            buttonRef,
            forwardedRef,
            store.getElementSetter('triggerElement')
        ],
        props: [
            triggerProps,
            {
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CLICK_TRIGGER_IDENTIFIER"]]: ''
            },
            elementProps,
            getButtonProps
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["triggerOpenStateMapping"]
    });
});
if ("TURBOPACK compile-time truthy", 1) DialogTrigger.displayName = "DialogTrigger";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/index.parts.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Backdrop",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$backdrop$2f$DialogBackdrop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogBackdrop"],
    "Close",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$close$2f$DialogClose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogClose"],
    "Description",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$description$2f$DialogDescription$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogDescription"],
    "Popup",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$popup$2f$DialogPopup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogPopup"],
    "Portal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$portal$2f$DialogPortal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogPortal"],
    "Root",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogRoot"],
    "Title",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$title$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"],
    "Trigger",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$trigger$2f$DialogTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTrigger"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/index.parts.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$backdrop$2f$DialogBackdrop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/backdrop/DialogBackdrop.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$close$2f$DialogClose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/close/DialogClose.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$description$2f$DialogDescription$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/description/DialogDescription.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$popup$2f$DialogPopup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/popup/DialogPopup.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$portal$2f$DialogPortal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/portal/DialogPortal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/DialogRoot.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$title$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/title/DialogTitle.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$trigger$2f$DialogTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/trigger/DialogTrigger.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/index.parts.js [app-ssr] (ecmascript) <export * as Dialog>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/index.parts.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/index.parts.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
;
;
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/backdrop/AlertDialogBackdrop.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialogBackdrop",
    ()=>AlertDialogBackdrop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/stateAttributesMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/DialogRootContext.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const stateAttributesMapping = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["popupStateMapping"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transitionStatusMapping"]
};
const AlertDialogBackdrop = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function AlertDialogBackdrop(componentProps, forwardedRef) {
    const { render, className, forceRender = false, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const open = store.useState('open');
    const nested = store.useState('nested');
    const mounted = store.useState('mounted');
    const transitionStatus = store.useState('transitionStatus');
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            open,
            transitionStatus
        }), [
        open,
        transitionStatus
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        ref: [
            store.context.backdropRef,
            forwardedRef
        ],
        props: [
            {
                role: 'presentation',
                hidden: !mounted,
                style: {
                    userSelect: 'none',
                    WebkitUserSelect: 'none'
                }
            },
            elementProps
        ],
        stateAttributesMapping,
        enabled: forceRender || !nested
    });
});
if ("TURBOPACK compile-time truthy", 1) AlertDialogBackdrop.displayName = "AlertDialogBackdrop";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/close/AlertDialogClose.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialogClose",
    ()=>AlertDialogClose
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$close$2f$useDialogClose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/close/useDialogClose.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/DialogRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const AlertDialogClose = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function AlertDialogClose(componentProps, forwardedRef) {
    const { render, className, disabled = false, nativeButton = true, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const open = store.useState('open');
    const { getRootProps, ref } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$close$2f$useDialogClose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogClose"])({
        disabled,
        open,
        setOpen: store.setOpen,
        nativeButton
    });
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            disabled
        }), [
        disabled
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('button', componentProps, {
        state,
        ref: [
            forwardedRef,
            ref
        ],
        props: [
            elementProps,
            getRootProps
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) AlertDialogClose.displayName = "AlertDialogClose";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/description/AlertDialogDescription.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialogDescription",
    ()=>AlertDialogDescription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/DialogRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const AlertDialogDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function AlertDialogDescription(componentProps, forwardedRef) {
    const { render, className, id: idProp, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    store.useSyncedValueWithCleanup('descriptionElementId', id);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('p', componentProps, {
        ref: forwardedRef,
        props: [
            {
                id
            },
            elementProps
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) AlertDialogDescription.displayName = "AlertDialogDescription";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/popup/AlertDialogPopupCssVars.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialogPopupCssVars",
    ()=>AlertDialogPopupCssVars
]);
let AlertDialogPopupCssVars = /*#__PURE__*/ function(AlertDialogPopupCssVars) {
    /**
   * Indicates how many dialogs are nested within.
   * @type {number}
   */ AlertDialogPopupCssVars["nestedDialogs"] = "--nested-dialogs";
    return AlertDialogPopupCssVars;
}({});
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/popup/AlertDialogPopupDataAttributes.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialogPopupDataAttributes",
    ()=>AlertDialogPopupDataAttributes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
;
let AlertDialogPopupDataAttributes = function(AlertDialogPopupDataAttributes) {
    /**
   * Present when the dialog is open.
   */ AlertDialogPopupDataAttributes[AlertDialogPopupDataAttributes["open"] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].open] = "open";
    /**
   * Present when the dialog is closed.
   */ AlertDialogPopupDataAttributes[AlertDialogPopupDataAttributes["closed"] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].closed] = "closed";
    /**
   * Present when the dialog is animating in.
   */ AlertDialogPopupDataAttributes[AlertDialogPopupDataAttributes["startingStyle"] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].startingStyle] = "startingStyle";
    /**
   * Present when the dialog is animating out.
   */ AlertDialogPopupDataAttributes[AlertDialogPopupDataAttributes["endingStyle"] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommonPopupDataAttributes"].endingStyle] = "endingStyle";
    /**
   * Present when the dialog is nested within another dialog.
   */ AlertDialogPopupDataAttributes["nested"] = "data-nested";
    /**
   * Present when the dialog has other open dialogs nested within it.
   */ AlertDialogPopupDataAttributes["nestedDialogOpen"] = "data-nested-dialog-open";
    return AlertDialogPopupDataAttributes;
}({});
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/portal/AlertDialogPortalContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialogPortalContext",
    ()=>AlertDialogPortalContext,
    "useAlertDialogPortalContext",
    ()=>useAlertDialogPortalContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const AlertDialogPortalContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) AlertDialogPortalContext.displayName = "AlertDialogPortalContext";
function useAlertDialogPortalContext() {
    const value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](AlertDialogPortalContext);
    if (value === undefined) {
        throw new Error('Base UI: <AlertDialog.Portal> is missing.');
    }
    return value;
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/popup/AlertDialogPopup.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialogPopup",
    ()=>AlertDialogPopup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$inertValue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/inertValue.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingFocusManager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingFocusManager.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/DialogRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/stateAttributesMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$popup$2f$AlertDialogPopupCssVars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/popup/AlertDialogPopupCssVars.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$popup$2f$AlertDialogPopupDataAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/popup/AlertDialogPopupDataAttributes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$InternalBackdrop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/InternalBackdrop.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$portal$2f$AlertDialogPortalContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/portal/AlertDialogPortalContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useOpenChangeComplete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useOpenChangeComplete.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/composite.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const stateAttributesMapping = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["popupStateMapping"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transitionStatusMapping"],
    nestedDialogOpen (value) {
        return value ? {
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$popup$2f$AlertDialogPopupDataAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogPopupDataAttributes"].nestedDialogOpen]: ''
        } : null;
    }
};
const AlertDialogPopup = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function AlertDialogPopup(componentProps, forwardedRef) {
    const { className, render, initialFocus, finalFocus, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const descriptionElementId = store.useState('descriptionElementId');
    const floatingRootContext = store.useState('floatingRootContext');
    const rootPopupProps = store.useState('popupProps');
    const mounted = store.useState('mounted');
    const nested = store.useState('nested');
    const nestedOpenDialogCount = store.useState('nestedOpenDialogCount');
    const open = store.useState('open');
    const titleElementId = store.useState('titleElementId');
    const transitionStatus = store.useState('transitionStatus');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$portal$2f$AlertDialogPortalContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAlertDialogPortalContext"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useOpenChangeComplete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOpenChangeComplete"])({
        open,
        ref: store.context.popupRef,
        onComplete () {
            if (open) {
                store.context.openChangeComplete?.(true);
            }
        }
    });
    // Default initial focus logic:
    // If opened by touch, focus the popup element to prevent the virtual keyboard from opening
    // (this is required for Android specifically as iOS handles this automatically).
    const defaultInitialFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((interactionType)=>{
        if (interactionType === 'touch') {
            return store.context.popupRef.current;
        }
        return true;
    });
    const resolvedInitialFocus = initialFocus === undefined ? defaultInitialFocus : initialFocus;
    const nestedDialogOpen = nestedOpenDialogCount > 0;
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            open,
            nested,
            transitionStatus,
            nestedDialogOpen
        }), [
        open,
        nested,
        transitionStatus,
        nestedDialogOpen
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        props: [
            rootPopupProps,
            {
                'aria-labelledby': titleElementId ?? undefined,
                'aria-describedby': descriptionElementId ?? undefined,
                role: 'alertdialog',
                tabIndex: -1,
                hidden: !mounted,
                onKeyDown (event) {
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["COMPOSITE_KEYS"].has(event.key)) {
                        event.stopPropagation();
                    }
                },
                style: {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$popup$2f$AlertDialogPopupCssVars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogPopupCssVars"].nestedDialogs]: nestedOpenDialogCount
                }
            },
            elementProps
        ],
        ref: [
            forwardedRef,
            store.context.popupRef,
            store.getElementSetter('popupElement')
        ],
        stateAttributesMapping
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$InternalBackdrop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InternalBackdrop"], {
                ref: store.context.internalBackdropRef,
                inert: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$inertValue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inertValue"])(!open)
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingFocusManager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatingFocusManager"], {
                context: floatingRootContext,
                disabled: !mounted,
                initialFocus: resolvedInitialFocus,
                returnFocus: finalFocus,
                children: element
            })
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) AlertDialogPopup.displayName = "AlertDialogPopup";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/portal/AlertDialogPortal.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialogPortal",
    ()=>AlertDialogPortal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingPortal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingPortal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/DialogRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$portal$2f$AlertDialogPortalContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/portal/AlertDialogPortalContext.js [app-ssr] (ecmascript)");
/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 *
 * Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function AlertDialogPortal(props) {
    const { children, keepMounted = false, container } = props;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const mounted = store.useState('mounted');
    const shouldRender = mounted || keepMounted;
    if (!shouldRender) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$portal$2f$AlertDialogPortalContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogPortalContext"].Provider, {
        value: keepMounted,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$components$2f$FloatingPortal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatingPortal"], {
            root: container,
            children: children
        })
    });
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/root/AlertDialogRoot.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialogRoot",
    ()=>AlertDialogRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useRefWithInit.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$useDialogRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/useDialogRoot.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/store.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/DialogRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useFloatingRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useFloatingRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/empty.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const INITIAL_STATE = {
    open: false,
    dismissible: false,
    nested: false,
    popupElement: null,
    triggerElement: null,
    modal: true,
    descriptionElementId: undefined,
    titleElementId: undefined,
    openMethod: null,
    mounted: false,
    transitionStatus: 'idle',
    nestedOpenDialogCount: 0,
    triggerProps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"],
    popupProps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"],
    floatingRootContext: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$hooks$2f$useFloatingRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getEmptyContext"])()
};
const AlertDialogRoot = function AlertDialogRoot(props) {
    const { children, defaultOpen = false, onOpenChange, onOpenChangeComplete, open: openProp, actionsRef } = props;
    const parentDialogRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const nested = Boolean(parentDialogRootContext);
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRefWithInit"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogStore"].create, INITIAL_STATE).current;
    store.useControlledProp('open', openProp, defaultOpen);
    store.useSyncedValue('nested', nested);
    store.useContextCallback('openChange', onOpenChange);
    store.useContextCallback('openChangeComplete', onOpenChangeComplete);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$useDialogRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogRoot"])({
        store,
        actionsRef,
        parentContext: parentDialogRootContext?.store.context,
        onOpenChange
    });
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            store
        }), [
        store
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogRootContext"].Provider, {
        value: contextValue,
        children: children
    });
};
if ("TURBOPACK compile-time truthy", 1) AlertDialogRoot.displayName = "AlertDialogRoot";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/title/AlertDialogTitle.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialogTitle",
    ()=>AlertDialogTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/DialogRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const AlertDialogTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function AlertDialogTitle(componentProps, forwardedRef) {
    const { render, className, id: idProp, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    store.useSyncedValueWithCleanup('titleElementId', id);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('h2', componentProps, {
        ref: forwardedRef,
        props: [
            {
                id
            },
            elementProps
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) AlertDialogTitle.displayName = "AlertDialogTitle";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/trigger/AlertDialogTrigger.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialogTrigger",
    ()=>AlertDialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/dialog/root/DialogRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/use-button/useButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const AlertDialogTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function AlertDialogTrigger(componentProps, forwardedRef) {
    const { render, className, disabled = false, nativeButton = true, ...elementProps } = componentProps;
    const { store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$dialog$2f$root$2f$DialogRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDialogRootContext"])();
    const open = store.useState('open');
    const triggerProps = store.useState('triggerProps');
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            disabled,
            open
        }), [
        disabled,
        open
    ]);
    const { getButtonProps, buttonRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useButton"])({
        disabled,
        native: nativeButton
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('button', componentProps, {
        state,
        ref: [
            forwardedRef,
            buttonRef,
            store.getElementSetter('triggerElement')
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["triggerOpenStateMapping"],
        props: [
            triggerProps,
            elementProps,
            getButtonProps
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) AlertDialogTrigger.displayName = "AlertDialogTrigger";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/index.parts.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Backdrop",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$backdrop$2f$AlertDialogBackdrop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogBackdrop"],
    "Close",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$close$2f$AlertDialogClose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogClose"],
    "Description",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$description$2f$AlertDialogDescription$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogDescription"],
    "Popup",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$popup$2f$AlertDialogPopup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogPopup"],
    "Portal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$portal$2f$AlertDialogPortal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogPortal"],
    "Root",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$root$2f$AlertDialogRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogRoot"],
    "Title",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$title$2f$AlertDialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogTitle"],
    "Trigger",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$trigger$2f$AlertDialogTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogTrigger"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/index.parts.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$backdrop$2f$AlertDialogBackdrop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/backdrop/AlertDialogBackdrop.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$close$2f$AlertDialogClose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/close/AlertDialogClose.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$description$2f$AlertDialogDescription$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/description/AlertDialogDescription.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$popup$2f$AlertDialogPopup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/popup/AlertDialogPopup.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$portal$2f$AlertDialogPortal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/portal/AlertDialogPortal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$root$2f$AlertDialogRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/root/AlertDialogRoot.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$title$2f$AlertDialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/title/AlertDialogTitle.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$trigger$2f$AlertDialogTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/trigger/AlertDialogTrigger.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/index.parts.js [app-ssr] (ecmascript) <export * as AlertDialog>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$alert$2d$dialog$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/alert-dialog/index.parts.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/index.parts.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/list/CompositeListContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompositeListContext",
    ()=>CompositeListContext,
    "useCompositeListContext",
    ()=>useCompositeListContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
const CompositeListContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"]({
    register: ()=>{},
    unregister: ()=>{},
    subscribeMapChange: ()=>{
        return ()=>{};
    },
    elementsRef: {
        current: []
    },
    nextIndexRef: {
        current: 0
    }
});
if ("TURBOPACK compile-time truthy", 1) CompositeListContext.displayName = "CompositeListContext";
function useCompositeListContext() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](CompositeListContext);
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/list/CompositeList.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable no-bitwise */ __turbopack_context__.s([
    "CompositeList",
    ()=>CompositeList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useRefWithInit.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/empty.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeListContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/list/CompositeListContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function CompositeList(props) {
    const { children, elementsRef, labelsRef, onMapChange } = props;
    const nextIndexRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](0);
    const listeners = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRefWithInit"])(createListeners).current;
    // We use a stable `map` to avoid O(n^2) re-allocation costs for large lists.
    // `mapTick` is our re-render trigger mechanism. We also need to update the
    // elements and label refs, but there's a lot of async work going on and sometimes
    // the effect that handles `onMapChange` gets called after those refs have been
    // filled, and we don't want to lose those values by setting their lengths to `0`.
    // We also need to have them at the proper length because floating-ui uses that
    // information for list navigation.
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useRefWithInit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRefWithInit"])(createMap).current;
    const [mapTick, setMapTick] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"]);
    const lastTickRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](mapTick);
    const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((node, metadata)=>{
        map.set(node, metadata ?? null);
        lastTickRef.current = {};
        setMapTick(lastTickRef.current);
    });
    const unregister = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((node)=>{
        map.delete(node);
        lastTickRef.current = {};
        setMapTick(lastTickRef.current);
    });
    const sortedMap = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        // `mapTick` is the `useMemo` trigger as `map` is stable.
        disableEslintWarning(mapTick);
        const newMap = new Map();
        const sortedNodes = Array.from(map.keys()).sort(sortByDocumentPosition);
        sortedNodes.forEach((node, index)=>{
            const metadata = map.get(node) ?? {};
            newMap.set(node, {
                ...metadata,
                index
            });
        });
        return newMap;
    }, [
        map,
        mapTick
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (typeof MutationObserver !== 'function' || sortedMap.size === 0) {
            return undefined;
        }
        const mutationObserver = new MutationObserver((entries)=>{
            const diff = new Set();
            const updateDiff = (node)=>diff.has(node) ? diff.delete(node) : diff.add(node);
            entries.forEach((entry)=>{
                entry.removedNodes.forEach(updateDiff);
                entry.addedNodes.forEach(updateDiff);
            });
            if (diff.size === 0) {
                lastTickRef.current = {};
                setMapTick(lastTickRef.current);
            }
        });
        sortedMap.forEach((_, node)=>{
            if (node.parentElement) {
                mutationObserver.observe(node.parentElement, {
                    childList: true
                });
            }
        });
        return ()=>{
            mutationObserver.disconnect();
        };
    }, [
        sortedMap
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        const shouldUpdateLengths = lastTickRef.current === mapTick;
        if (shouldUpdateLengths) {
            if (elementsRef.current.length !== sortedMap.size) {
                elementsRef.current.length = sortedMap.size;
            }
            if (labelsRef && labelsRef.current.length !== sortedMap.size) {
                labelsRef.current.length = sortedMap.size;
            }
            nextIndexRef.current = sortedMap.size;
        }
        onMapChange?.(sortedMap);
    }, [
        onMapChange,
        sortedMap,
        elementsRef,
        labelsRef,
        mapTick
    ]);
    const subscribeMapChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((fn)=>{
        listeners.add(fn);
        return ()=>{
            listeners.delete(fn);
        };
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        listeners.forEach((l)=>l(sortedMap));
    }, [
        listeners,
        sortedMap
    ]);
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            register,
            unregister,
            subscribeMapChange,
            elementsRef,
            labelsRef,
            nextIndexRef
        }), [
        register,
        unregister,
        subscribeMapChange,
        elementsRef,
        labelsRef,
        nextIndexRef
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeListContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompositeListContext"].Provider, {
        value: contextValue,
        children: children
    });
}
function createMap() {
    return new Map();
}
function createListeners() {
    return new Set();
}
function sortByDocumentPosition(a, b) {
    const position = a.compareDocumentPosition(b);
    if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
        return -1;
    }
    if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS) {
        return 1;
    }
    return 0;
}
function disableEslintWarning(_) {}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/direction-provider/DirectionContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DirectionContext",
    ()=>DirectionContext,
    "useDirection",
    ()=>useDirection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
const DirectionContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) DirectionContext.displayName = "DirectionContext";
function useDirection(optional = true) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](DirectionContext);
    if (context === undefined && !optional) {
        throw new Error('Base UI: DirectionContext is missing.');
    }
    return context?.direction ?? 'ltr';
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/root/TabsRootContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsRootContext",
    ()=>TabsRootContext,
    "useTabsRootContext",
    ()=>useTabsRootContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
const TabsRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) TabsRootContext.displayName = "TabsRootContext";
function useTabsRootContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](TabsRootContext);
    if (context === undefined) {
        throw new Error('Base UI: TabsRootContext is missing. Tabs parts must be placed within <Tabs.Root>.');
    }
    return context;
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/root/TabsRootDataAttributes.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsRootDataAttributes",
    ()=>TabsRootDataAttributes
]);
let TabsRootDataAttributes = /*#__PURE__*/ function(TabsRootDataAttributes) {
    /**
   * Indicates the direction of the activation (based on the previous selected tab).
   * @type {'left' | 'right' | 'up' | 'down' | 'none'}
   */ TabsRootDataAttributes["activationDirection"] = "data-activation-direction";
    /**
   * Indicates the orientation of the tabs.
   * @type {'horizontal' | 'vertical'}
   */ TabsRootDataAttributes["orientation"] = "data-orientation";
    return TabsRootDataAttributes;
}({});
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/root/stateAttributesMapping.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "tabsStateAttributesMapping",
    ()=>tabsStateAttributesMapping
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootDataAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/root/TabsRootDataAttributes.js [app-ssr] (ecmascript)");
;
const tabsStateAttributesMapping = {
    tabActivationDirection: (dir)=>({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootDataAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsRootDataAttributes"].activationDirection]: dir
        })
};
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/root/TabsRoot.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsRoot",
    ()=>TabsRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useControlled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useControlled.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/list/CompositeList.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/direction-provider/DirectionContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/root/TabsRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/root/stateAttributesMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
const TabsRoot = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function TabsRoot(componentProps, forwardedRef) {
    const { className, defaultValue = 0, onValueChange: onValueChangeProp, orientation = 'horizontal', render, value: valueProp, ...elementProps } = componentProps;
    const direction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDirection"])();
    const tabPanelRefs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"]([]);
    const [value, setValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useControlled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useControlled"])({
        controlled: valueProp,
        default: defaultValue,
        name: 'Tabs',
        state: 'value'
    });
    const [tabPanelMap, setTabPanelMap] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>new Map());
    const [tabMap, setTabMap] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>new Map());
    const [tabActivationDirection, setTabActivationDirection] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('none');
    const onValueChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((newValue, eventDetails)=>{
        onValueChangeProp?.(newValue, eventDetails);
        if (eventDetails.isCanceled) {
            return;
        }
        setValue(newValue);
        setTabActivationDirection(eventDetails.activationDirection);
    });
    // get the `id` attribute of <Tabs.Panel> to set as the value of `aria-controls` on <Tabs.Tab>
    const getTabPanelIdByTabValueOrIndex = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((tabValue, index)=>{
        if (tabValue === undefined && index < 0) {
            return undefined;
        }
        for (const tabPanelMetadata of tabPanelMap.values()){
            // find by tabValue
            if (tabValue !== undefined && tabPanelMetadata && tabValue === tabPanelMetadata?.value) {
                return tabPanelMetadata.id;
            }
            // find by index
            if (tabValue === undefined && tabPanelMetadata?.index && tabPanelMetadata?.index === index) {
                return tabPanelMetadata.id;
            }
        }
        return undefined;
    }, [
        tabPanelMap
    ]);
    // get the `id` attribute of <Tabs.Tab> to set as the value of `aria-labelledby` on <Tabs.Panel>
    const getTabIdByPanelValueOrIndex = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((tabPanelValue, index)=>{
        if (tabPanelValue === undefined && index < 0) {
            return undefined;
        }
        for (const tabMetadata of tabMap.values()){
            // find by tabPanelValue
            if (tabPanelValue !== undefined && index > -1 && tabPanelValue === (tabMetadata?.value ?? tabMetadata?.index ?? undefined)) {
                return tabMetadata?.id;
            }
            // find by index
            if (tabPanelValue === undefined && index > -1 && index === (tabMetadata?.value ?? tabMetadata?.index ?? undefined)) {
                return tabMetadata?.id;
            }
        }
        return undefined;
    }, [
        tabMap
    ]);
    // used in `useActivationDirectionDetector` for setting data-activation-direction
    const getTabElementBySelectedValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((selectedValue)=>{
        if (selectedValue === undefined) {
            return null;
        }
        for (const [tabElement, tabMetadata] of tabMap.entries()){
            if (tabMetadata != null && selectedValue === (tabMetadata.value ?? tabMetadata.index)) {
                return tabElement;
            }
        }
        return null;
    }, [
        tabMap
    ]);
    const tabsContextValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            direction,
            getTabElementBySelectedValue,
            getTabIdByPanelValueOrIndex,
            getTabPanelIdByTabValueOrIndex,
            onValueChange,
            orientation,
            setTabMap,
            tabActivationDirection,
            value
        }), [
        direction,
        getTabElementBySelectedValue,
        getTabIdByPanelValueOrIndex,
        getTabPanelIdByTabValueOrIndex,
        onValueChange,
        orientation,
        setTabMap,
        tabActivationDirection,
        value
    ]);
    const state = {
        orientation,
        tabActivationDirection
    };
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        ref: forwardedRef,
        props: elementProps,
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tabsStateAttributesMapping"]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsRootContext"].Provider, {
        value: tabsContextValue,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompositeList"], {
            elementsRef: tabPanelRefs,
            onMapChange: setTabPanelMap,
            children: element
        })
    });
});
if ("TURBOPACK compile-time truthy", 1) TabsRoot.displayName = "TabsRoot";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/constants.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACTIVE_COMPOSITE_ITEM",
    ()=>ACTIVE_COMPOSITE_ITEM
]);
const ACTIVE_COMPOSITE_ITEM = 'data-composite-item-active';
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/list/useCompositeListItem.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IndexGuessBehavior",
    ()=>IndexGuessBehavior,
    "useCompositeListItem",
    ()=>useCompositeListItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeListContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/list/CompositeListContext.js [app-ssr] (ecmascript)");
'use client';
;
;
;
let IndexGuessBehavior = /*#__PURE__*/ function(IndexGuessBehavior) {
    IndexGuessBehavior[IndexGuessBehavior["None"] = 0] = "None";
    IndexGuessBehavior[IndexGuessBehavior["GuessFromOrder"] = 1] = "GuessFromOrder";
    return IndexGuessBehavior;
}({});
function useCompositeListItem(params = {}) {
    const { label, metadata, textRef, indexGuessBehavior, index: externalIndex } = params;
    const { register, unregister, subscribeMapChange, elementsRef, labelsRef, nextIndexRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeListContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompositeListContext"])();
    const indexRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](-1);
    const [index, setIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](externalIndex ?? (indexGuessBehavior === IndexGuessBehavior.GuessFromOrder ? ()=>{
        if (indexRef.current === -1) {
            const newIndex = nextIndexRef.current;
            nextIndexRef.current += 1;
            indexRef.current = newIndex;
        }
        return indexRef.current;
    } : -1));
    const componentRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const ref = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((node)=>{
        componentRef.current = node;
        if (index !== -1 && node !== null) {
            elementsRef.current[index] = node;
            if (labelsRef) {
                const isLabelDefined = label !== undefined;
                labelsRef.current[index] = isLabelDefined ? label : textRef?.current?.textContent ?? node.textContent;
            }
        }
    }, [
        index,
        elementsRef,
        labelsRef,
        label,
        textRef
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (externalIndex != null) {
            return undefined;
        }
        const node = componentRef.current;
        if (node) {
            register(node, metadata);
            return ()=>{
                unregister(node);
            };
        }
        return undefined;
    }, [
        externalIndex,
        register,
        unregister,
        metadata
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (externalIndex != null) {
            return undefined;
        }
        return subscribeMapChange((map)=>{
            const i = componentRef.current ? map.get(componentRef.current)?.index : null;
            if (i != null) {
                setIndex(i);
            }
        });
    }, [
        externalIndex,
        subscribeMapChange,
        setIndex
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            ref,
            index
        }), [
        index,
        ref
    ]);
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/item/useCompositeItem.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCompositeItem",
    ()=>useCompositeItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useMergedRefs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/root/CompositeRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/list/useCompositeListItem.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function useCompositeItem(params = {}) {
    const { highlightItemOnHover, highlightedIndex, onHighlightedIndexChange } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompositeRootContext"])();
    const { ref, index } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompositeListItem"])(params);
    const isHighlighted = highlightedIndex === index;
    const itemRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMergedRefs"])(ref, itemRef);
    const compositeProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            tabIndex: isHighlighted ? 0 : -1,
            onFocus () {
                onHighlightedIndexChange(index);
            },
            onMouseMove () {
                const item = itemRef.current;
                if (!highlightItemOnHover || !item) {
                    return;
                }
                const disabled = item.hasAttribute('disabled') || item.ariaDisabled === 'true';
                if (!isHighlighted && !disabled) {
                    item.focus();
                }
            }
        }), [
        isHighlighted,
        onHighlightedIndexChange,
        index,
        highlightItemOnHover
    ]);
    return {
        compositeProps,
        compositeRef: mergedRef,
        index
    };
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/list/TabsListContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsListContext",
    ()=>TabsListContext,
    "useTabsListContext",
    ()=>useTabsListContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
const TabsListContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) TabsListContext.displayName = "TabsListContext";
function useTabsListContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](TabsListContext);
    if (context === undefined) {
        throw new Error('Base UI: TabsListContext is missing. TabsList parts must be placed within <Tabs.List>.');
    }
    return context;
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/tab/TabsTab.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsTab",
    ()=>TabsTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/owner.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/use-button/useButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$item$2f$useCompositeItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/item/useCompositeItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/root/TabsRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsListContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/list/TabsListContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/createBaseUIEventDetails.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/element.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
const TabsTab = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function TabsTab(componentProps, forwardedRef) {
    const { className, disabled = false, render, value: valueProp, id: idProp, nativeButton = true, ...elementProps } = componentProps;
    const { value: selectedTabValue, getTabPanelIdByTabValueOrIndex, orientation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTabsRootContext"])();
    const { activateOnFocus, highlightedTabIndex, onTabActivation, setHighlightedTabIndex, tabsListRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsListContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTabsListContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    const tabMetadata = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            disabled,
            id,
            value: valueProp
        }), [
        disabled,
        id,
        valueProp
    ]);
    const { compositeProps, compositeRef, index } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$item$2f$useCompositeItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompositeItem"])({
        metadata: tabMetadata
    });
    const tabValue = valueProp ?? index;
    // the `selected` state isn't set on the server (it relies on effects to be calculated),
    // so we fall back to checking the `value` param with the selectedTabValue from the TabsContext
    const selected = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (valueProp === undefined) {
            return index < 0 ? false : index === selectedTabValue;
        }
        return valueProp === selectedTabValue;
    }, [
        index,
        selectedTabValue,
        valueProp
    ]);
    const isNavigatingRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    // Keep the highlighted item in sync with the currently selected tab
    // when the value prop changes externally (controlled mode)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        if (isNavigatingRef.current) {
            isNavigatingRef.current = false;
            return;
        }
        if (!(selected && index > -1 && highlightedTabIndex !== index)) {
            return;
        }
        // If focus is currently within the tabs list, don't override the roving
        // focus highlight. This keeps keyboard navigation relative to the focused
        // item after an external/asynchronous selection change.
        const listElement = tabsListRef.current;
        const activeEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["activeElement"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(listElement));
        if (listElement && activeEl && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(listElement, activeEl)) {
            return;
        }
        setHighlightedTabIndex(index);
    }, [
        selected,
        index,
        highlightedTabIndex,
        setHighlightedTabIndex,
        disabled,
        tabsListRef
    ]);
    const { getButtonProps, buttonRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useButton"])({
        disabled,
        native: nativeButton,
        focusableWhenDisabled: true
    });
    const tabPanelId = index > -1 ? getTabPanelIdByTabValueOrIndex(valueProp, index) : undefined;
    const isPressingRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    const isMainButtonRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    const onClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((event)=>{
        if (selected || disabled) {
            return;
        }
        onTabActivation(tabValue, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])('none', event.nativeEvent, {
            activationDirection: 'none'
        }));
    });
    const onFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((event)=>{
        if (selected) {
            return;
        }
        if (index > -1) {
            setHighlightedTabIndex(index);
        }
        if (disabled) {
            return;
        }
        if (activateOnFocus && !isPressingRef.current || // keyboard or touch focus
        isPressingRef.current && isMainButtonRef.current // mouse focus
        ) {
            onTabActivation(tabValue, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$createBaseUIEventDetails$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createChangeEventDetails"])('none', event.nativeEvent, {
                activationDirection: 'none'
            }));
        }
    });
    const onPointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((event)=>{
        if (selected || disabled) {
            return;
        }
        isPressingRef.current = true;
        function handlePointerUp() {
            isPressingRef.current = false;
            isMainButtonRef.current = false;
        }
        if (!event.button || event.button === 0) {
            isMainButtonRef.current = true;
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ownerDocument"])(event.currentTarget);
            doc.addEventListener('pointerup', handlePointerUp, {
                once: true
            });
        }
    });
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            disabled,
            selected,
            orientation
        }), [
        disabled,
        selected,
        orientation
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('button', componentProps, {
        state,
        ref: [
            forwardedRef,
            buttonRef,
            compositeRef
        ],
        props: [
            compositeProps,
            {
                role: 'tab',
                'aria-controls': tabPanelId,
                'aria-selected': selected,
                id,
                onClick,
                onFocus,
                onPointerDown,
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ACTIVE_COMPOSITE_ITEM"]]: selected ? '' : undefined,
                onKeyDownCapture () {
                    isNavigatingRef.current = true;
                }
            },
            elementProps,
            getButtonProps
        ]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) TabsTab.displayName = "TabsTab";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/indicator/prehydrationScript.min.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This file is autogenerated. Do not edit it directly.
// To update it, modify the corresponding source file and run `pnpm inline-scripts`.
// prettier-ignore
__turbopack_context__.s([
    "script",
    ()=>script
]);
const script = '!function(){const t=document.currentScript.previousElementSibling;if(!t)return;const e=t.closest(\'[role="tablist"]\');if(!e)return;const o=e.querySelector("[data-selected]");if(!o)return;if(0===o.offsetWidth||0===e.offsetWidth)return;const i=getComputedStyle(e).direction,f=o.offsetLeft-e.clientLeft,{width:n,height:r}=o.getBoundingClientRect(),l=Math.floor(n),c=Math.floor(r),s="ltr"===i?e.scrollWidth-o.offsetLeft-l-e.clientLeft:o.offsetLeft-e.clientLeft,h=o.offsetTop-e.clientTop,d=e.scrollHeight-o.offsetTop-c-e.clientTop;function u(e,o){t.style.setProperty(`--active-tab-${e}`,`${o}px`)}u("left",f),u("right",s),u("top",h),u("bottom",d),u("width",l),u("height",c),l>0&&c>0&&t.removeAttribute("hidden")}();';
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/indicator/TabsIndicatorCssVars.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsIndicatorCssVars",
    ()=>TabsIndicatorCssVars
]);
let TabsIndicatorCssVars = /*#__PURE__*/ function(TabsIndicatorCssVars) {
    /**
   * Indicates the distance on the left side from the parent's container if the tab is active.
   * @type {number}
   */ TabsIndicatorCssVars["activeTabLeft"] = "--active-tab-left";
    /**
   * Indicates the distance on the right side from the parent's container if the tab is active.
   * @type {number}
   */ TabsIndicatorCssVars["activeTabRight"] = "--active-tab-right";
    /**
   * Indicates the distance on the top side from the parent's container if the tab is active.
   * @type {number}
   */ TabsIndicatorCssVars["activeTabTop"] = "--active-tab-top";
    /**
   * Indicates the distance on the bottom side from the parent's container if the tab is active.
   * @type {number}
   */ TabsIndicatorCssVars["activeTabBottom"] = "--active-tab-bottom";
    /**
   * Indicates the width of the tab if it is active.
   * @type {number}
   */ TabsIndicatorCssVars["activeTabWidth"] = "--active-tab-width";
    /**
   * Indicates the width of the tab if it is active.
   * @type {number}
   */ TabsIndicatorCssVars["activeTabHeight"] = "--active-tab-height";
    return TabsIndicatorCssVars;
}({});
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/indicator/TabsIndicator.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsIndicator",
    ()=>TabsIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$generateId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/generateId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useForcedRerendering$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useForcedRerendering.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useOnMount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useOnMount.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/direction-provider/DirectionContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/root/TabsRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/root/stateAttributesMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsListContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/list/TabsListContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$prehydrationScript$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/indicator/prehydrationScript.min.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/indicator/TabsIndicatorCssVars.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
const stateAttributesMapping = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tabsStateAttributesMapping"],
    selectedTabPosition: ()=>null,
    selectedTabSize: ()=>null
};
const TabsIndicator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function TabIndicator(componentProps, forwardedRef) {
    const { className, render, renderBeforeHydration = false, ...elementProps } = componentProps;
    const { getTabElementBySelectedValue, orientation, tabActivationDirection, value } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTabsRootContext"])();
    const { tabsListRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsListContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTabsListContext"])();
    const [instanceId] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$generateId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateId"])('tab'));
    const [isMounted, setIsMounted] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const { value: activeTabValue } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTabsRootContext"])();
    const direction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDirection"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useOnMount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOnMount"])(()=>setIsMounted(true));
    const rerender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useForcedRerendering$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForcedRerendering"])();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (value != null && tabsListRef.current != null && typeof ResizeObserver !== 'undefined') {
            const resizeObserver = new ResizeObserver(()=>{
                rerender();
            });
            resizeObserver.observe(tabsListRef.current);
            return ()=>{
                resizeObserver.disconnect();
            };
        }
        return undefined;
    }, [
        value,
        tabsListRef,
        rerender
    ]);
    let left = 0;
    let right = 0;
    let top = 0;
    let bottom = 0;
    let width = 0;
    let height = 0;
    let isTabSelected = false;
    if (value != null && tabsListRef.current != null) {
        const selectedTab = getTabElementBySelectedValue(value);
        const tabsList = tabsListRef.current;
        isTabSelected = true;
        if (selectedTab != null) {
            // Use offset-based positioning, but determine size using sub-pixel
            // precision and floor it to avoid potential overflow.
            // See https://github.com/mui/base-ui/issues/2235.
            left = selectedTab.offsetLeft - tabsList.clientLeft;
            top = selectedTab.offsetTop - tabsList.clientTop;
            const { width: rectWidth, height: rectHeight } = selectedTab.getBoundingClientRect();
            width = Math.floor(rectWidth);
            height = Math.floor(rectHeight);
            right = direction === 'ltr' ? tabsList.scrollWidth - selectedTab.offsetLeft - width - tabsList.clientLeft : selectedTab.offsetLeft - tabsList.clientLeft;
            bottom = tabsList.scrollHeight - selectedTab.offsetTop - height - tabsList.clientTop;
        }
    }
    const selectedTabPosition = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>isTabSelected ? {
            left,
            right,
            top,
            bottom
        } : null, [
        left,
        right,
        top,
        bottom,
        isTabSelected
    ]);
    const selectedTabSize = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>isTabSelected ? {
            width,
            height
        } : null, [
        width,
        height,
        isTabSelected
    ]);
    const style = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (!isTabSelected) {
            return undefined;
        }
        return {
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsIndicatorCssVars"].activeTabLeft]: `${left}px`,
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsIndicatorCssVars"].activeTabRight]: `${right}px`,
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsIndicatorCssVars"].activeTabTop]: `${top}px`,
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsIndicatorCssVars"].activeTabBottom]: `${bottom}px`,
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsIndicatorCssVars"].activeTabWidth]: `${width}px`,
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicatorCssVars$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsIndicatorCssVars"].activeTabHeight]: `${height}px`
        };
    }, [
        left,
        right,
        top,
        bottom,
        width,
        height,
        isTabSelected
    ]);
    const displayIndicator = isTabSelected && width > 0 && height > 0;
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            orientation,
            selectedTabPosition,
            selectedTabSize,
            tabActivationDirection
        }), [
        orientation,
        selectedTabPosition,
        selectedTabSize,
        tabActivationDirection
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('span', componentProps, {
        state,
        ref: forwardedRef,
        props: [
            {
                role: 'presentation',
                style,
                hidden: !displayIndicator // do not display the indicator before the layout is settled
            },
            elementProps,
            {
                ['data-instance-id']: !(isMounted && renderBeforeHydration) ? instanceId : undefined,
                suppressHydrationWarning: true
            }
        ],
        stateAttributesMapping
    });
    if (activeTabValue == null) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            element,
            !isMounted && renderBeforeHydration && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("script", {
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML: {
                    __html: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$prehydrationScript$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["script"]
                },
                suppressHydrationWarning: true
            })
        ]
    });
});
if ("TURBOPACK compile-time truthy", 1) TabsIndicator.displayName = "TabsIndicator";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/panel/TabsPanelDataAttributes.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsPanelDataAttributes",
    ()=>TabsPanelDataAttributes
]);
let TabsPanelDataAttributes = /*#__PURE__*/ function(TabsPanelDataAttributes) {
    /**
   * Indicates the index of the tab panel.
   */ TabsPanelDataAttributes["index"] = "data-index";
    /**
   * Indicates the direction of the activation (based on the previous selected tab).
   * @type {'left' | 'right' | 'up' | 'down' | 'none'}
   */ TabsPanelDataAttributes["activationDirection"] = "data-activation-direction";
    /**
   * Indicates the orientation of the tabs.
   * @type {'horizontal' | 'vertical'}
   */ TabsPanelDataAttributes["orientation"] = "data-orientation";
    /**
   * Present when the panel is hidden.
   */ TabsPanelDataAttributes["hidden"] = "data-hidden";
    return TabsPanelDataAttributes;
}({});
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/panel/TabsPanel.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsPanel",
    ()=>TabsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/list/useCompositeListItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/root/stateAttributesMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/root/TabsRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$panel$2f$TabsPanelDataAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/panel/TabsPanelDataAttributes.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const TabsPanel = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function TabPanel(componentProps, forwardedRef) {
    const { children, className, value: valueProp, render, keepMounted = false, ...elementProps } = componentProps;
    const { value: selectedValue, getTabIdByPanelValueOrIndex, orientation, tabActivationDirection } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTabsRootContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseUiId"])();
    const metadata = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            id,
            value: valueProp
        }), [
        id,
        valueProp
    ]);
    const { ref: listItemRef, index } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompositeListItem"])({
        metadata
    });
    const tabPanelValue = valueProp ?? index;
    const hidden = tabPanelValue !== selectedValue;
    const correspondingTabId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        return getTabIdByPanelValueOrIndex(valueProp, index);
    }, [
        getTabIdByPanelValueOrIndex,
        index,
        valueProp
    ]);
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            hidden,
            orientation,
            tabActivationDirection
        }), [
        hidden,
        orientation,
        tabActivationDirection
    ]);
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])('div', componentProps, {
        state,
        ref: [
            forwardedRef,
            listItemRef
        ],
        props: [
            {
                'aria-labelledby': correspondingTabId,
                hidden,
                id: id ?? undefined,
                role: 'tabpanel',
                tabIndex: hidden ? -1 : 0,
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$panel$2f$TabsPanelDataAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsPanelDataAttributes"].index]: index
            },
            elementProps,
            {
                children: hidden && !keepMounted ? undefined : children
            }
        ],
        stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tabsStateAttributesMapping"]
    });
    return element;
});
if ("TURBOPACK compile-time truthy", 1) TabsPanel.displayName = "TabsPanel";
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/composite.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createGridCellMap",
    ()=>createGridCellMap,
    "findNonDisabledListIndex",
    ()=>findNonDisabledListIndex,
    "getGridCellIndexOfCorner",
    ()=>getGridCellIndexOfCorner,
    "getGridCellIndices",
    ()=>getGridCellIndices,
    "getGridNavigatedIndex",
    ()=>getGridNavigatedIndex,
    "getMaxListIndex",
    ()=>getMaxListIndex,
    "getMinListIndex",
    ()=>getMinListIndex,
    "isDifferentGridRow",
    ()=>isDifferentGridRow,
    "isIndexOutOfListBounds",
    ()=>isIndexOutOfListBounds,
    "isListIndexDisabled",
    ()=>isListIndexDisabled
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.10/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/event.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/constants.js [app-ssr] (ecmascript)");
;
;
;
function isDifferentGridRow(index, cols, prevRow) {
    return Math.floor(index / cols) !== prevRow;
}
function isIndexOutOfListBounds(listRef, index) {
    return index < 0 || index >= listRef.current.length;
}
function getMinListIndex(listRef, disabledIndices) {
    return findNonDisabledListIndex(listRef, {
        disabledIndices
    });
}
function getMaxListIndex(listRef, disabledIndices) {
    return findNonDisabledListIndex(listRef, {
        decrement: true,
        startingIndex: listRef.current.length,
        disabledIndices
    });
}
function findNonDisabledListIndex(listRef, { startingIndex = -1, decrement = false, disabledIndices, amount = 1 } = {}) {
    let index = startingIndex;
    do {
        index += decrement ? -amount : amount;
    }while (index >= 0 && index <= listRef.current.length - 1 && isListIndexDisabled(listRef, index, disabledIndices))
    return index;
}
function getGridNavigatedIndex(listRef, { event, orientation, loop, rtl, cols, disabledIndices, minIndex, maxIndex, prevIndex, stopEvent: stop = false }) {
    let nextIndex = prevIndex;
    // ---------------------------------------------------------------------------
    // Detect row structure based on DOM. This works when items are grouped inside
    // elements that declare `role="row"` (e.g., Combobox.Row). We build a matrix
    // where each entry is the array of item indices for that visual row. The
    // algorithm gracefully falls back to regular `cols`-based handling when no
    // row structure can be detected.
    // ---------------------------------------------------------------------------
    const rows = [];
    const rowIndexMap = {};
    let hasRoleRow = false;
    {
        let currentRowEl = null;
        let currentRowIndex = -1;
        listRef.current.forEach((el, idx)=>{
            if (el == null) {
                return;
            }
            const rowEl = el.closest('[role="row"]');
            if (rowEl) {
                hasRoleRow = true;
            }
            if (rowEl !== currentRowEl || currentRowIndex === -1) {
                currentRowEl = rowEl;
                currentRowIndex += 1;
                rows[currentRowIndex] = [];
            }
            rows[currentRowIndex].push(idx);
            rowIndexMap[idx] = currentRowIndex;
        });
    }
    const hasDomRows = hasRoleRow && rows.length > 0 && rows.some((row)=>row.length !== cols);
    function navigateVertically(direction) {
        if (!hasDomRows || prevIndex === -1) {
            return undefined;
        }
        const currentRow = rowIndexMap[prevIndex];
        if (currentRow == null) {
            return undefined;
        }
        const colInRow = rows[currentRow].indexOf(prevIndex);
        let nextRow = direction === 'up' ? currentRow - 1 : currentRow + 1;
        if (loop) {
            if (nextRow < 0) {
                nextRow = rows.length - 1;
            } else if (nextRow >= rows.length) {
                nextRow = 0;
            }
        }
        const visited = new Set();
        while(nextRow >= 0 && nextRow < rows.length && !visited.has(nextRow)){
            visited.add(nextRow);
            const targetRow = rows[nextRow];
            if (targetRow.length === 0) {
                nextRow = direction === 'up' ? nextRow - 1 : nextRow + 1;
                continue;
            }
            const clampedCol = Math.min(colInRow, targetRow.length - 1);
            // Start from the preferred column, fallback leftwards until first
            // enabled item is found.
            for(let col = clampedCol; col >= 0; col -= 1){
                const candidate = targetRow[col];
                if (!isListIndexDisabled(listRef, candidate, disabledIndices)) {
                    return candidate;
                }
            }
            // Row had no enabled items, move to next row in the same direction.
            nextRow = direction === 'up' ? nextRow - 1 : nextRow + 1;
            if (loop) {
                if (nextRow < 0) {
                    nextRow = rows.length - 1;
                } else if (nextRow >= rows.length) {
                    nextRow = 0;
                }
            }
        }
        return undefined;
    }
    if (event.key === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ARROW_UP"]) {
        const domBasedCandidate = navigateVertically('up');
        if (domBasedCandidate !== undefined) {
            if (stop) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stopEvent"])(event);
            }
            nextIndex = domBasedCandidate;
        } else {
            // fallback to original logic
            if (stop) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stopEvent"])(event);
            }
            if (prevIndex === -1) {
                nextIndex = maxIndex;
            } else {
                nextIndex = findNonDisabledListIndex(listRef, {
                    startingIndex: nextIndex,
                    amount: cols,
                    decrement: true,
                    disabledIndices
                });
                if (loop && (prevIndex - cols < minIndex || nextIndex < 0)) {
                    const col = prevIndex % cols;
                    const maxCol = maxIndex % cols;
                    const offset = maxIndex - (maxCol - col);
                    if (maxCol === col) {
                        nextIndex = maxIndex;
                    } else {
                        nextIndex = maxCol > col ? offset : offset - cols;
                    }
                }
            }
            if (isIndexOutOfListBounds(listRef, nextIndex)) {
                nextIndex = prevIndex;
            }
        }
    }
    if (event.key === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ARROW_DOWN"]) {
        const domBasedCandidate = navigateVertically('down');
        if (domBasedCandidate !== undefined) {
            if (stop) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stopEvent"])(event);
            }
            nextIndex = domBasedCandidate;
        } else {
            if (stop) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stopEvent"])(event);
            }
            if (prevIndex === -1) {
                nextIndex = minIndex;
            } else {
                nextIndex = findNonDisabledListIndex(listRef, {
                    startingIndex: prevIndex,
                    amount: cols,
                    disabledIndices
                });
                if (loop && prevIndex + cols > maxIndex) {
                    nextIndex = findNonDisabledListIndex(listRef, {
                        startingIndex: prevIndex % cols - cols,
                        amount: cols,
                        disabledIndices
                    });
                }
            }
            if (isIndexOutOfListBounds(listRef, nextIndex)) {
                nextIndex = prevIndex;
            }
        }
    }
    // Remains on the same row/column.
    if (orientation === 'both') {
        const prevRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["floor"])(prevIndex / cols);
        if (event.key === (rtl ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ARROW_LEFT"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ARROW_RIGHT"])) {
            if (stop) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stopEvent"])(event);
            }
            if (prevIndex % cols !== cols - 1) {
                nextIndex = findNonDisabledListIndex(listRef, {
                    startingIndex: prevIndex,
                    disabledIndices
                });
                if (loop && isDifferentGridRow(nextIndex, cols, prevRow)) {
                    nextIndex = findNonDisabledListIndex(listRef, {
                        startingIndex: prevIndex - prevIndex % cols - 1,
                        disabledIndices
                    });
                }
            } else if (loop) {
                nextIndex = findNonDisabledListIndex(listRef, {
                    startingIndex: prevIndex - prevIndex % cols - 1,
                    disabledIndices
                });
            }
            if (isDifferentGridRow(nextIndex, cols, prevRow)) {
                nextIndex = prevIndex;
            }
        }
        if (event.key === (rtl ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ARROW_RIGHT"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ARROW_LEFT"])) {
            if (stop) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stopEvent"])(event);
            }
            if (prevIndex % cols !== 0) {
                nextIndex = findNonDisabledListIndex(listRef, {
                    startingIndex: prevIndex,
                    decrement: true,
                    disabledIndices
                });
                if (loop && isDifferentGridRow(nextIndex, cols, prevRow)) {
                    nextIndex = findNonDisabledListIndex(listRef, {
                        startingIndex: prevIndex + (cols - prevIndex % cols),
                        decrement: true,
                        disabledIndices
                    });
                }
            } else if (loop) {
                nextIndex = findNonDisabledListIndex(listRef, {
                    startingIndex: prevIndex + (cols - prevIndex % cols),
                    decrement: true,
                    disabledIndices
                });
            }
            if (isDifferentGridRow(nextIndex, cols, prevRow)) {
                nextIndex = prevIndex;
            }
        }
        const lastRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$10$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["floor"])(maxIndex / cols) === prevRow;
        if (isIndexOutOfListBounds(listRef, nextIndex)) {
            if (loop && lastRow) {
                nextIndex = event.key === (rtl ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ARROW_RIGHT"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ARROW_LEFT"]) ? maxIndex : findNonDisabledListIndex(listRef, {
                    startingIndex: prevIndex - prevIndex % cols - 1,
                    disabledIndices
                });
            } else {
                nextIndex = prevIndex;
            }
        }
    }
    return nextIndex;
}
function createGridCellMap(sizes, cols, dense) {
    const cellMap = [];
    let startIndex = 0;
    sizes.forEach(({ width, height }, index)=>{
        if (width > cols) {
            if ("TURBOPACK compile-time truthy", 1) {
                throw new Error(`[Floating UI]: Invalid grid - item width at index ${index} is greater than grid columns`);
            }
        }
        let itemPlaced = false;
        if (dense) {
            startIndex = 0;
        }
        while(!itemPlaced){
            const targetCells = [];
            for(let i = 0; i < width; i += 1){
                for(let j = 0; j < height; j += 1){
                    targetCells.push(startIndex + i + j * cols);
                }
            }
            if (startIndex % cols + width <= cols && targetCells.every((cell)=>cellMap[cell] == null)) {
                targetCells.forEach((cell)=>{
                    cellMap[cell] = index;
                });
                itemPlaced = true;
            } else {
                startIndex += 1;
            }
        }
    });
    // convert into a non-sparse array
    return [
        ...cellMap
    ];
}
function getGridCellIndexOfCorner(index, sizes, cellMap, cols, corner) {
    if (index === -1) {
        return -1;
    }
    const firstCellIndex = cellMap.indexOf(index);
    const sizeItem = sizes[index];
    switch(corner){
        case 'tl':
            return firstCellIndex;
        case 'tr':
            if (!sizeItem) {
                return firstCellIndex;
            }
            return firstCellIndex + sizeItem.width - 1;
        case 'bl':
            if (!sizeItem) {
                return firstCellIndex;
            }
            return firstCellIndex + (sizeItem.height - 1) * cols;
        case 'br':
            return cellMap.lastIndexOf(index);
        default:
            return -1;
    }
}
function getGridCellIndices(indices, cellMap) {
    return cellMap.flatMap((index, cellIndex)=>indices.includes(index) ? [
            cellIndex
        ] : []);
}
function isListIndexDisabled(listRef, index, disabledIndices) {
    if (typeof disabledIndices === 'function') {
        return disabledIndices(index);
    }
    if (disabledIndices) {
        return disabledIndices.includes(index);
    }
    const element = listRef.current[index];
    return element == null || element.hasAttribute('disabled') || element.getAttribute('aria-disabled') === 'true';
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/root/useCompositeRoot.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCompositeRoot",
    ()=>useCompositeRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$isElementDisabled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/isElementDisabled.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useMergedRefs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/composite.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/composite.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/constants.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const EMPTY_ARRAY = [];
function useCompositeRoot(params) {
    const { itemSizes, cols = 1, loop = true, dense = false, orientation = 'both', direction, highlightedIndex: externalHighlightedIndex, onHighlightedIndexChange: externalSetHighlightedIndex, rootRef: externalRef, enableHomeAndEndKeys = false, stopEventPropagation = false, disabledIndices, modifierKeys = EMPTY_ARRAY } = params;
    const [internalHighlightedIndex, internalSetHighlightedIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](0);
    const isGrid = cols > 1;
    const rootRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMergedRefs"])(rootRef, externalRef);
    const elementsRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"]([]);
    const hasSetDefaultIndexRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    const highlightedIndex = externalHighlightedIndex ?? internalHighlightedIndex;
    const onHighlightedIndexChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((index, shouldScrollIntoView = false)=>{
        (externalSetHighlightedIndex ?? internalSetHighlightedIndex)(index);
        if (shouldScrollIntoView) {
            const newActiveItem = elementsRef.current[index];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["scrollIntoViewIfNeeded"])(rootRef.current, newActiveItem, direction, orientation);
        }
    });
    const onMapChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((map)=>{
        if (map.size === 0 || hasSetDefaultIndexRef.current) {
            return;
        }
        hasSetDefaultIndexRef.current = true;
        const sortedElements = Array.from(map.keys());
        const activeItem = sortedElements.find((compositeElement)=>compositeElement?.hasAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ACTIVE_COMPOSITE_ITEM"])) ?? null;
        // Set the default highlighted index of an arbitrary composite item.
        const activeIndex = activeItem ? sortedElements.indexOf(activeItem) : -1;
        if (activeIndex !== -1) {
            onHighlightedIndexChange(activeIndex);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["scrollIntoViewIfNeeded"])(rootRef.current, activeItem, direction, orientation);
    });
    const props = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            'aria-orientation': orientation === 'both' ? undefined : orientation,
            ref: mergedRef,
            onFocus (event) {
                const element = rootRef.current;
                if (!element || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isNativeInput"])(event.target)) {
                    return;
                }
                event.target.setSelectionRange(0, event.target.value.length ?? 0);
            },
            onKeyDown (event) {
                const RELEVANT_KEYS = enableHomeAndEndKeys ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ALL_KEYS"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_KEYS"];
                if (!RELEVANT_KEYS.has(event.key)) {
                    return;
                }
                if (isModifierKeySet(event, modifierKeys)) {
                    return;
                }
                const element = rootRef.current;
                if (!element) {
                    return;
                }
                const isRtl = direction === 'rtl';
                const horizontalForwardKey = isRtl ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_LEFT"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_RIGHT"];
                const forwardKey = {
                    horizontal: horizontalForwardKey,
                    vertical: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_DOWN"],
                    both: horizontalForwardKey
                }[orientation];
                const horizontalBackwardKey = isRtl ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_RIGHT"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_LEFT"];
                const backwardKey = {
                    horizontal: horizontalBackwardKey,
                    vertical: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_UP"],
                    both: horizontalBackwardKey
                }[orientation];
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isNativeInput"])(event.target) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$isElementDisabled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElementDisabled"])(event.target)) {
                    const selectionStart = event.target.selectionStart;
                    const selectionEnd = event.target.selectionEnd;
                    const textContent = event.target.value ?? '';
                    // return to native textbox behavior when
                    // 1 - Shift is held to make a text selection, or if there already is a text selection
                    if (selectionStart == null || event.shiftKey || selectionStart !== selectionEnd) {
                        return;
                    }
                    // 2 - arrow-ing forward and not in the last position of the text
                    if (event.key !== backwardKey && selectionStart < textContent.length) {
                        return;
                    }
                    // 3 -arrow-ing backward and not in the first position of the text
                    if (event.key !== forwardKey && selectionStart > 0) {
                        return;
                    }
                }
                let nextIndex = highlightedIndex;
                const minIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMinListIndex"])(elementsRef, disabledIndices);
                const maxIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMaxListIndex"])(elementsRef, disabledIndices);
                if (isGrid) {
                    const sizes = itemSizes || Array.from({
                        length: elementsRef.current.length
                    }, ()=>({
                            width: 1,
                            height: 1
                        }));
                    // To calculate movements on the grid, we use hypothetical cell indices
                    // as if every item was 1x1, then convert back to real indices.
                    const cellMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createGridCellMap"])(sizes, cols, dense);
                    const minGridIndex = cellMap.findIndex((index)=>index != null && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isListIndexDisabled"])(elementsRef, index, disabledIndices));
                    // last enabled index
                    const maxGridIndex = cellMap.reduce((foundIndex, index, cellIndex)=>index != null && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isListIndexDisabled"])(elementsRef, index, disabledIndices) ? cellIndex : foundIndex, -1);
                    nextIndex = cellMap[(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGridNavigatedIndex"])({
                        current: cellMap.map((itemIndex)=>itemIndex ? elementsRef.current[itemIndex] : null)
                    }, {
                        event,
                        orientation,
                        loop,
                        cols,
                        // treat undefined (empty grid spaces) as disabled indices so we
                        // don't end up in them
                        disabledIndices: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGridCellIndices"])([
                            ...disabledIndices || elementsRef.current.map((_, index)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isListIndexDisabled"])(elementsRef, index) ? index : undefined),
                            undefined
                        ], cellMap),
                        minIndex: minGridIndex,
                        maxIndex: maxGridIndex,
                        prevIndex: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGridCellIndexOfCorner"])(highlightedIndex > maxIndex ? minIndex : highlightedIndex, sizes, cellMap, cols, // use a corner matching the edge closest to the direction we're
                        // moving in so we don't end up in the same item. Prefer
                        // top/left over bottom/right.
                        // eslint-disable-next-line no-nested-ternary
                        event.key === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_DOWN"] ? 'bl' : event.key === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_RIGHT"] ? 'tr' : 'tl'),
                        rtl: isRtl
                    })]; // navigated cell will never be nullish
                }
                const forwardKeys = {
                    horizontal: [
                        horizontalForwardKey
                    ],
                    vertical: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_DOWN"]
                    ],
                    both: [
                        horizontalForwardKey,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_DOWN"]
                    ]
                }[orientation];
                const backwardKeys = {
                    horizontal: [
                        horizontalBackwardKey
                    ],
                    vertical: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_UP"]
                    ],
                    both: [
                        horizontalBackwardKey,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ARROW_UP"]
                    ]
                }[orientation];
                const preventedKeys = isGrid ? RELEVANT_KEYS : ({
                    horizontal: enableHomeAndEndKeys ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HORIZONTAL_KEYS_WITH_EXTRA_KEYS"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HORIZONTAL_KEYS"],
                    vertical: enableHomeAndEndKeys ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["VERTICAL_KEYS_WITH_EXTRA_KEYS"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["VERTICAL_KEYS"],
                    both: RELEVANT_KEYS
                })[orientation];
                if (enableHomeAndEndKeys) {
                    if (event.key === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HOME"]) {
                        nextIndex = minIndex;
                    } else if (event.key === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["END"]) {
                        nextIndex = maxIndex;
                    }
                }
                if (nextIndex === highlightedIndex && (forwardKeys.includes(event.key) || backwardKeys.includes(event.key))) {
                    if (loop && nextIndex === maxIndex && forwardKeys.includes(event.key)) {
                        nextIndex = minIndex;
                    } else if (loop && nextIndex === minIndex && backwardKeys.includes(event.key)) {
                        nextIndex = maxIndex;
                    } else {
                        nextIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findNonDisabledListIndex"])(elementsRef, {
                            startingIndex: nextIndex,
                            decrement: backwardKeys.includes(event.key),
                            disabledIndices
                        });
                    }
                }
                if (nextIndex !== highlightedIndex && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$floating$2d$ui$2d$react$2f$utils$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isIndexOutOfListBounds"])(elementsRef, nextIndex)) {
                    if (stopEventPropagation) {
                        event.stopPropagation();
                    }
                    if (preventedKeys.has(event.key)) {
                        event.preventDefault();
                    }
                    onHighlightedIndexChange(nextIndex, true);
                    // Wait for FocusManager `returnFocus` to execute.
                    queueMicrotask(()=>{
                        elementsRef.current[nextIndex]?.focus();
                    });
                }
            }
        }), [
        cols,
        dense,
        direction,
        disabledIndices,
        elementsRef,
        enableHomeAndEndKeys,
        highlightedIndex,
        isGrid,
        itemSizes,
        loop,
        mergedRef,
        modifierKeys,
        onHighlightedIndexChange,
        orientation,
        stopEventPropagation
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            props,
            highlightedIndex,
            onHighlightedIndexChange,
            elementsRef,
            disabledIndices,
            onMapChange
        }), [
        props,
        highlightedIndex,
        onHighlightedIndexChange,
        elementsRef,
        disabledIndices,
        onMapChange
    ]);
}
function isModifierKeySet(event, ignoredModifierKeys) {
    for (const key of __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$composite$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MODIFIER_KEYS"].values()){
        if (ignoredModifierKeys.includes(key)) {
            continue;
        }
        if (event.getModifierState(key)) {
            return true;
        }
    }
    return false;
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/root/CompositeRoot.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompositeRoot",
    ()=>CompositeRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/list/CompositeList.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$root$2f$useCompositeRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/root/useCompositeRoot.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/root/CompositeRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/utils/useRenderElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/direction-provider/DirectionContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/empty.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
function CompositeRoot(componentProps) {
    const { render, className, refs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"], props = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"], state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$empty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_OBJECT"], stateAttributesMapping, highlightedIndex: highlightedIndexProp, onHighlightedIndexChange: onHighlightedIndexChangeProp, orientation, dense, itemSizes, loop, cols, enableHomeAndEndKeys, onMapChange: onMapChangeProp, stopEventPropagation = true, rootRef, disabledIndices, modifierKeys, highlightItemOnHover = false, tag = 'div', ...elementProps } = componentProps;
    const direction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDirection"])();
    const { props: defaultProps, highlightedIndex, onHighlightedIndexChange, elementsRef, onMapChange: onMapChangeUnwrapped } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$root$2f$useCompositeRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompositeRoot"])({
        itemSizes,
        cols,
        loop,
        dense,
        orientation,
        highlightedIndex: highlightedIndexProp,
        onHighlightedIndexChange: onHighlightedIndexChangeProp,
        rootRef,
        stopEventPropagation,
        enableHomeAndEndKeys,
        direction,
        disabledIndices,
        modifierKeys
    });
    const onMapChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((newMap)=>{
        onMapChangeProp?.(newMap);
        onMapChangeUnwrapped(newMap);
    });
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderElement"])(tag, componentProps, {
        state,
        ref: refs,
        props: [
            defaultProps,
            ...props,
            elementProps
        ],
        stateAttributesMapping
    });
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            highlightedIndex,
            onHighlightedIndexChange,
            highlightItemOnHover
        }), [
        highlightedIndex,
        onHighlightedIndexChange,
        highlightItemOnHover
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompositeRootContext"].Provider, {
        value: contextValue,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompositeList"], {
            elementsRef: elementsRef,
            onMapChange: onMapChange,
            children: element
        })
    });
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/list/TabsList.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsList",
    ()=>TabsList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+utils@0_4acb86403a85056711ff999ac22f6939/node_modules/@base-ui-components/utils/esm/useIsoLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/composite/root/CompositeRoot.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/root/stateAttributesMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/root/TabsRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsListContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/list/TabsListContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const EMPTY_ARRAY = [];
const TabsList = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function TabsList(componentProps, forwardedRef) {
    const { activateOnFocus = true, className, loop = true, render, ...elementProps } = componentProps;
    const { getTabElementBySelectedValue, onValueChange, orientation, value, setTabMap, tabActivationDirection } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTabsRootContext"])();
    const [highlightedTabIndex, setHighlightedTabIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](0);
    const tabsListRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const detectActivationDirection = useActivationDirectionDetector(value, // the old value
    orientation, tabsListRef, getTabElementBySelectedValue);
    const onTabActivation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((newValue, eventDetails)=>{
        if (newValue !== value) {
            const activationDirection = detectActivationDirection(newValue);
            eventDetails.activationDirection = activationDirection;
            onValueChange(newValue, eventDetails);
        }
    });
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            orientation,
            tabActivationDirection
        }), [
        orientation,
        tabActivationDirection
    ]);
    const defaultProps = {
        'aria-orientation': orientation === 'vertical' ? 'vertical' : undefined,
        role: 'tablist'
    };
    const tabsListContextValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            activateOnFocus,
            highlightedTabIndex,
            onTabActivation,
            setHighlightedTabIndex,
            tabsListRef,
            value
        }), [
        activateOnFocus,
        highlightedTabIndex,
        onTabActivation,
        setHighlightedTabIndex,
        tabsListRef,
        value
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsListContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsListContext"].Provider, {
        value: tabsListContextValue,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$root$2f$CompositeRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompositeRoot"], {
            render: render,
            className: className,
            state: state,
            refs: [
                forwardedRef,
                tabsListRef
            ],
            props: [
                defaultProps,
                elementProps
            ],
            stateAttributesMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$stateAttributesMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tabsStateAttributesMapping"],
            highlightedIndex: highlightedTabIndex,
            enableHomeAndEndKeys: true,
            loop: loop,
            orientation: orientation,
            onHighlightedIndexChange: setHighlightedTabIndex,
            onMapChange: setTabMap,
            disabledIndices: EMPTY_ARRAY
        })
    });
});
if ("TURBOPACK compile-time truthy", 1) TabsList.displayName = "TabsList";
function getInset(tab, tabsList) {
    const { left: tabLeft, top: tabTop } = tab.getBoundingClientRect();
    const { left: listLeft, top: listTop } = tabsList.getBoundingClientRect();
    const left = tabLeft - listLeft;
    const top = tabTop - listTop;
    return {
        left,
        top
    };
}
function useActivationDirectionDetector(// the old value
selectedTabValue, orientation, tabsListRef, getTabElement) {
    const previousTabEdge = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$utils$40$0_4acb86403a85056711ff999ac22f6939$2f$node_modules$2f40$base$2d$ui$2d$components$2f$utils$2f$esm$2f$useIsoLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoLayoutEffect"])(()=>{
        // Whenever orientation changes, reset the state.
        if (selectedTabValue == null || tabsListRef.current == null) {
            previousTabEdge.current = null;
            return;
        }
        const activeTab = getTabElement(selectedTabValue);
        if (activeTab == null) {
            previousTabEdge.current = null;
            return;
        }
        const { left, top } = getInset(activeTab, tabsListRef.current);
        previousTabEdge.current = orientation === 'horizontal' ? left : top;
    }, [
        orientation,
        getTabElement,
        tabsListRef,
        selectedTabValue
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((newValue)=>{
        if (newValue === selectedTabValue) {
            return 'none';
        }
        if (newValue == null) {
            previousTabEdge.current = null;
            return 'none';
        }
        if (newValue != null && tabsListRef.current != null) {
            const selectedTabElement = getTabElement(newValue);
            if (selectedTabElement != null) {
                const { left, top } = getInset(selectedTabElement, tabsListRef.current);
                if (previousTabEdge.current == null) {
                    previousTabEdge.current = orientation === 'horizontal' ? left : top;
                    return 'none';
                }
                if (orientation === 'horizontal') {
                    if (left < previousTabEdge.current) {
                        previousTabEdge.current = left;
                        return 'left';
                    }
                    if (left > previousTabEdge.current) {
                        previousTabEdge.current = left;
                        return 'right';
                    }
                } else if (top < previousTabEdge.current) {
                    previousTabEdge.current = top;
                    return 'up';
                } else if (top > previousTabEdge.current) {
                    previousTabEdge.current = top;
                    return 'down';
                }
            }
        }
        return 'none';
    }, [
        getTabElement,
        orientation,
        previousTabEdge,
        tabsListRef,
        selectedTabValue
    ]);
}
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/index.parts.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Indicator",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsIndicator"],
    "List",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsList"],
    "Panel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$panel$2f$TabsPanel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsPanel"],
    "Root",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsRoot"],
    "Tab",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$tab$2f$TabsTab$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTab"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/index.parts.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$root$2f$TabsRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/root/TabsRoot.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$tab$2f$TabsTab$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/tab/TabsTab.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$indicator$2f$TabsIndicator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/indicator/TabsIndicator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$panel$2f$TabsPanel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/panel/TabsPanel.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$list$2f$TabsList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/list/TabsList.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/index.parts.js [app-ssr] (ecmascript) <export * as Tabs>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1_1c660c132e5bca0ce30fa7d03a7400cb$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$tabs$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@base-ui-components+react@1_1c660c132e5bca0ce30fa7d03a7400cb/node_modules/@base-ui-components/react/esm/tabs/index.parts.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=fe665_%40base-ui-components_react_esm_4aae9149._.js.map