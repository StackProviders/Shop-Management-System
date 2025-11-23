module.exports = [
"[project]/src/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatCurrency",
    ()=>formatCurrency
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$3$2e$1$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tailwind-merge@3.3.1/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$3$2e$1$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatCurrency(amount, currency = 'INR') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
    }).format(amount);
}
}),
"[project]/src/lib/db/schema.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "devicesCollection",
    ()=>devicesCollection,
    "otpRequestsCollection",
    ()=>otpRequestsCollection,
    "partiesCollection",
    ()=>partiesCollection,
    "shopMembersCollection",
    ()=>shopMembersCollection,
    "shopsCollection",
    ()=>shopsCollection,
    "trustedDevicesCollection",
    ()=>trustedDevicesCollection,
    "userIdentifiersCollection",
    ()=>userIdentifiersCollection,
    "usersCollection",
    ()=>usersCollection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/firestore-repository@0.4.2/node_modules/firestore-repository/build/esm/schema.js [app-ssr] (ecmascript)");
;
const shopsCollection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rootCollection"])({
    name: 'shops',
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapTo"])('id'),
    // @ts-expect-error - firestore-repository DocumentData constraint issue
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["data"])()
});
const shopMembersCollection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rootCollection"])({
    name: 'shop_members',
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapTo"])('id'),
    // @ts-expect-error - firestore-repository DocumentData constraint issue
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["data"])()
});
const usersCollection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rootCollection"])({
    name: 'users',
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapTo"])('id'),
    // @ts-expect-error - firestore-repository DocumentData constraint issue
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["data"])()
});
const userIdentifiersCollection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rootCollection"])({
    name: 'user_identifiers',
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapTo"])('id'),
    // @ts-expect-error - firestore-repository DocumentData constraint issue
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["data"])()
});
const otpRequestsCollection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rootCollection"])({
    name: 'otp_requests',
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapTo"])('id'),
    // @ts-expect-error - firestore-repository DocumentData constraint issue
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["data"])()
});
const trustedDevicesCollection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rootCollection"])({
    name: 'trusted_devices',
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapTo"])('id'),
    // @ts-expect-error - firestore-repository DocumentData constraint issue
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["data"])()
});
const devicesCollection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rootCollection"])({
    name: 'devices',
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapTo"])('id'),
    // @ts-expect-error - firestore-repository DocumentData constraint issue
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["data"])()
});
const partiesCollection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rootCollection"])({
    name: 'parties',
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapTo"])('id'),
    // @ts-expect-error - firestore-repository DocumentData constraint issue
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["data"])()
});
}),
"[project]/src/lib/db/queries.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getShopMemberQuery",
    ()=>getShopMemberQuery,
    "getShopMembersQuery",
    ()=>getShopMembersQuery,
    "getShopsByStatusQuery",
    ()=>getShopsByStatusQuery,
    "getUserActiveShopsQuery",
    ()=>getUserActiveShopsQuery,
    "getUserDevicesQuery",
    ()=>getUserDevicesQuery,
    "getUserShopsQuery",
    ()=>getUserShopsQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/firestore-repository@0.4.2/node_modules/firestore-repository/build/esm/query.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/schema.ts [app-ssr] (ecmascript)");
;
;
const getUserShopsQuery = (userId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shopMembersCollection"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["condition"])('userId', '==', userId));
const getShopMembersQuery = (shopId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shopMembersCollection"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["condition"])('shopId', '==', shopId));
const getShopMemberQuery = (shopId, userId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shopMembersCollection"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["condition"])('shopId', '==', shopId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["condition"])('userId', '==', userId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["limit"])(1));
const getUserActiveShopsQuery = (userId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shopsCollection"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["condition"])('created_userId', '==', userId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["condition"])('status', '==', 'active'));
const getShopsByStatusQuery = (status)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shopsCollection"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["condition"])('status', '==', status), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'));
const getUserDevicesQuery = (userId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["devicesCollection"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firestore$2d$repository$40$0$2e$4$2e$2$2f$node_modules$2f$firestore$2d$repository$2f$build$2f$esm$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["condition"])('userId', '==', userId));
}),
"[project]/src/lib/db/repositories.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Repository",
    ()=>Repository
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firebase$40$12$2e$4$2e$0$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/firebase@12.4.0/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@firebase+firestore@4.9.2_@firebase+app@0.14.4/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firebase$40$12$2e$4$2e$0$2f$node_modules$2f$firebase$2f$app$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/firebase@12.4.0/node_modules/firebase/app/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@firebase+app@0.14.4/node_modules/@firebase/app/dist/esm/index.esm.js [app-ssr] (ecmascript)");
;
;
class Repository {
    collectionName;
    constructor(collectionName){
        this.collectionName = collectionName;
    }
    getDb() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirestore"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApp"])());
    }
    async get(filter) {
        const db = this.getDb();
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(db, this.collectionName, filter.id);
        const docSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDoc"])(docRef);
        return docSnap.exists() ? {
            id: docSnap.id,
            ...docSnap.data()
        } : null;
    }
    async list(q) {
        const db = this.getDb();
        const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocs"])(q || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(db, this.collectionName));
        return querySnapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data()
            }));
    }
    subscribe(callback, q) {
        const db = this.getDb();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onSnapshot"])(q || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(db, this.collectionName), {
            includeMetadataChanges: true
        }, (snapshot)=>{
            const data = snapshot.docs.map((doc)=>({
                    id: doc.id,
                    ...doc.data()
                }));
            callback(data);
        });
    }
    async set(data) {
        const db = this.getDb();
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(db, this.collectionName, data.id);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])(docRef, data, {
            merge: true
        });
    }
    async delete(filter) {
        const db = this.getDb();
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(db, this.collectionName, filter.id);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteDoc"])(docRef);
    }
    async batchDelete(items) {
        const db = this.getDb();
        const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeBatch"])(db);
        items.forEach((item)=>{
            const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(db, this.collectionName, item.id);
            batch.delete(docRef);
        });
        await batch.commit();
    }
}
}),
"[project]/src/lib/db/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "devicesRepo",
    ()=>devicesRepo,
    "getDatabase",
    ()=>getDatabase,
    "getStorageInstance",
    ()=>getStorageInstance,
    "otpsRepo",
    ()=>otpsRepo,
    "shopMembersRepo",
    ()=>shopMembersRepo,
    "shopsRepo",
    ()=>shopsRepo,
    "usersRepo",
    ()=>usersRepo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/schema.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$queries$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/queries.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$repositories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/repositories.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firebase$40$12$2e$4$2e$0$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/firebase@12.4.0/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@firebase+firestore@4.9.2_@firebase+app@0.14.4/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firebase$40$12$2e$4$2e$0$2f$node_modules$2f$firebase$2f$storage$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/firebase@12.4.0/node_modules/firebase/storage/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$storage$40$0$2e$14$2e$0_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@firebase+storage@0.14.0_@firebase+app@0.14.4/node_modules/@firebase/storage/dist/node-esm/index.node.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firebase$40$12$2e$4$2e$0$2f$node_modules$2f$firebase$2f$app$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/firebase@12.4.0/node_modules/firebase/app/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@firebase+app@0.14.4/node_modules/@firebase/app/dist/esm/index.esm.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
const getDatabase = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirestore"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApp"])());
const getStorageInstance = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$storage$40$0$2e$14$2e$0_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStorage"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApp"])());
;
const usersRepo = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$repositories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Repository"]('users');
const shopsRepo = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$repositories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Repository"]('shops');
const shopMembersRepo = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$repositories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Repository"]('shop_members');
const devicesRepo = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$repositories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Repository"]('devices');
const otpsRepo = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$repositories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Repository"]('otps');
}),
"[project]/src/lib/store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STORE_KEYS",
    ()=>STORE_KEYS,
    "appStore",
    ()=>appStore,
    "authStore",
    ()=>authStore,
    "saleStore",
    ()=>saleStore,
    "shopStore",
    ()=>shopStore,
    "storeHelpers",
    ()=>storeHelpers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$store$40$2$2e$4$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$store$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+plugin-store@2.4.0/node_modules/@tauri-apps/plugin-store/dist-js/index.js [app-ssr] (ecmascript)");
;
const authStore = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$store$40$2$2e$4$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$store$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LazyStore"]('auth.json');
const shopStore = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$store$40$2$2e$4$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$store$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LazyStore"]('shop-settings.json');
const saleStore = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$store$40$2$2e$4$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$store$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LazyStore"]('sale-settings.json');
const appStore = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$store$40$2$2e$4$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$store$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LazyStore"]('app-settings.json');
const STORE_KEYS = {
    // Auth keys
    DEVICE_ID: 'deviceId',
    DEVICE_TOKEN: 'deviceToken',
    USER_ID: 'userId',
    USER_SESSION: 'userSession',
    LOGOUT_FLAG: 'logoutFlag',
    LAST_LOGIN_TYPE: 'lastLoginType',
    // Shop keys
    CURRENT_SHOP_ID: 'currentShopId',
    // Sale keys
    SALE_COLUMN_VISIBILITY: 'saleColumnVisibility',
    // App settings keys
    THEME: 'theme',
    LANGUAGE: 'language',
    NOTIFICATIONS_ENABLED: 'notificationsEnabled'
};
const storeHelpers = {
    async get (store, key) {
        return await store.get(key) || null;
    },
    async set (store, key, value) {
        await store.set(key, value);
        await store.save();
    },
    async delete (store, key) {
        await store.delete(key);
        await store.save();
    },
    async clear (store) {
        await store.clear();
        await store.save();
    }
};
}),
"[project]/src/lib/tauri.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendEmail",
    ()=>sendEmail,
    "sendSMS",
    ()=>sendSMS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/core.js [app-ssr] (ecmascript)");
;
const isTauri = ("TURBOPACK compile-time value", "undefined") !== 'undefined' && '__TAURI__' in window;
const sendSMS = async (apiKey, phoneNumber, message)=>{
    // Ensure apiKey, phoneNumber, and message are not empty
    if (!apiKey || !phoneNumber || !message) {
        throw new Error('All parameters must be non-empty strings');
    }
    if ("TURBOPACK compile-time truthy", 1) {
        console.log('Mocking SMS send:', {
            apiKey,
            phoneNumber,
            message
        });
        return;
    }
    //TURBOPACK unreachable
    ;
};
const sendEmail = async (apiKey, toEmail, subject, html)=>{
    // Ensure apiKey, toEmail, subject, and html are not empty
    if (!apiKey || !toEmail || !subject || !html) {
        throw new Error('All parameters must be non-empty strings');
    }
    if ("TURBOPACK compile-time truthy", 1) {
        console.log('Mocking Email send:', {
            apiKey,
            toEmail,
            subject,
            html
        });
        return;
    }
    //TURBOPACK unreachable
    ;
};
}),
"[project]/src/lib/image-cache.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchAndCacheImage",
    ()=>fetchAndCacheImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$http$40$2$2e$5$2e$2$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$http$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+plugin-http@2.5.2/node_modules/@tauri-apps/plugin-http/dist-js/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tauri$2d$plugin$2d$cache$2d$api$40$0$2e$1$2e$5$2f$node_modules$2f$tauri$2d$plugin$2d$cache$2d$api$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tauri-plugin-cache-api@0.1.5/node_modules/tauri-plugin-cache-api/dist-js/index.js [app-ssr] (ecmascript)");
;
;
const updateQueue = new Map();
async function fetchAndCacheImage(url, noCache = false) {
    const cacheKey = `img:${url}`;
    if (!noCache) {
        const cached = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tauri$2d$plugin$2d$cache$2d$api$40$0$2e$1$2e$5$2f$node_modules$2f$tauri$2d$plugin$2d$cache$2d$api$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["get"])(cacheKey);
        if (cached?.data) {
            if (!updateQueue.has(url)) {
                updateQueue.set(url, checkAndUpdate(url, cached));
            }
            return cached.data;
        }
    }
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$http$40$2$2e$5$2e$2$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$http$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetch"])(url);
    const blob = await response.blob();
    const base64 = await blobToBase64(blob);
    const dataUrl = `data:${blob.type};base64,${base64}`;
    if (!noCache) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tauri$2d$plugin$2d$cache$2d$api$40$0$2e$1$2e$5$2f$node_modules$2f$tauri$2d$plugin$2d$cache$2d$api$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["set"])(cacheKey, {
            data: dataUrl,
            etag: response.headers.get('etag') || undefined,
            lastModified: response.headers.get('last-modified') || undefined
        }, {
            compress: true
        }).catch(()=>{});
    }
    return dataUrl;
}
async function checkAndUpdate(url, cached) {
    try {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$http$40$2$2e$5$2e$2$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$http$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetch"])(url, {
            method: 'HEAD'
        });
        const etag = response.headers.get('etag');
        const lastModified = response.headers.get('last-modified');
        if (etag && etag !== cached.etag || lastModified && lastModified !== cached.lastModified) {
            const fullResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$http$40$2$2e$5$2e$2$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$http$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetch"])(url);
            const blob = await fullResponse.blob();
            const base64 = await blobToBase64(blob);
            const dataUrl = `data:${blob.type};base64,${base64}`;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tauri$2d$plugin$2d$cache$2d$api$40$0$2e$1$2e$5$2f$node_modules$2f$tauri$2d$plugin$2d$cache$2d$api$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["set"])(`img:${url}`, {
                data: dataUrl,
                etag: fullResponse.headers.get('etag') || undefined,
                lastModified: fullResponse.headers.get('last-modified') || undefined
            }, {
                compress: true
            });
        }
    } finally{
        updateQueue.delete(url);
    }
}
function blobToBase64(blob) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onloadend = ()=>{
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
}),
"[project]/src/lib/firebase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "app",
    ()=>app,
    "firebaseConfig",
    ()=>firebaseConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firebase$40$12$2e$4$2e$0$2f$node_modules$2f$firebase$2f$app$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/firebase@12.4.0/node_modules/firebase/app/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@firebase+app@0.14.4/node_modules/@firebase/app/dist/esm/index.esm.js [app-ssr] (ecmascript)");
;
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "your_firebase_api_key") || '',
    authDomain: ("TURBOPACK compile-time value", "your_project.firebaseapp.com") || '',
    projectId: ("TURBOPACK compile-time value", "your_project_id") || '',
    storageBucket: ("TURBOPACK compile-time value", "your_project.appspot.com") || '',
    messagingSenderId: ("TURBOPACK compile-time value", "your_sender_id") || '',
    appId: ("TURBOPACK compile-time value", "your_app_id") || ''
};
if (!firebaseConfig.projectId) {
    throw new Error('Firebase projectId is missing. Please configure .env file with NEXT_PUBLIC_FIREBASE_PROJECT_ID');
}
const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig);
}),
"[project]/src/lib/storage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteImage",
    ()=>deleteImage,
    "deleteImages",
    ()=>deleteImages,
    "deleteUnusedImages",
    ()=>deleteUnusedImages,
    "uploadImage",
    ()=>uploadImage,
    "uploadImages",
    ()=>uploadImages
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firebase$40$12$2e$4$2e$0$2f$node_modules$2f$firebase$2f$storage$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/firebase@12.4.0/node_modules/firebase/storage/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$storage$40$0$2e$14$2e$0_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@firebase+storage@0.14.0_@firebase+app@0.14.4/node_modules/@firebase/storage/dist/node-esm/index.node.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-ssr] (ecmascript)");
;
;
const storage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$storage$40$0$2e$14$2e$0_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStorage"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["app"]);
async function deleteImage(url) {
    try {
        const imageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$storage$40$0$2e$14$2e$0_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(storage, url);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$storage$40$0$2e$14$2e$0_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteObject"])(imageRef);
    } catch (error) {
        console.error('Failed to delete image:', error);
        throw error;
    }
}
async function deleteImages(urls) {
    await Promise.allSettled(urls.map((url)=>deleteImage(url)));
}
async function deleteUnusedImages(currentImages, initialImages) {
    const unusedImages = currentImages.filter((img)=>!initialImages.includes(img));
    if (unusedImages.length > 0) {
        await deleteImages(unusedImages);
    }
}
async function uploadImage(file, path) {
    const imageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$storage$40$0$2e$14$2e$0_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(storage, path);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$storage$40$0$2e$14$2e$0_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uploadBytes"])(imageRef, file);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$storage$40$0$2e$14$2e$0_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDownloadURL"])(imageRef);
}
async function uploadImages(files, basePath) {
    const uploadPromises = files.map((file, index)=>{
        const path = `${basePath}/${Date.now()}-${index}-${file.name}`;
        return uploadImage(file, path);
    });
    return Promise.all(uploadPromises);
}
}),
"[project]/src/lib/firestore-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteDocWithTimeout",
    ()=>deleteDocWithTimeout,
    "setDocWithTimeout",
    ()=>setDocWithTimeout,
    "updateDocWithTimeout",
    ()=>updateDocWithTimeout,
    "waitForPendingWritesWithTimeout",
    ()=>waitForPendingWritesWithTimeout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firebase$40$12$2e$4$2e$0$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/firebase@12.4.0/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@firebase+firestore@4.9.2_@firebase+app@0.14.4/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
;
const FIRESTORE_TIMEOUT = 1000 // 1 second
;
function withTimeout(promise, timeoutMs) {
    return Promise.race([
        promise,
        new Promise((resolve)=>setTimeout(()=>resolve(undefined), timeoutMs))
    ]);
}
async function setDocWithTimeout(reference, data, options) {
    const { setDoc } = await __turbopack_context__.A("[project]/node_modules/.pnpm/firebase@12.4.0/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript, async loader)");
    const cleanData = Object.fromEntries(Object.entries(data).filter(([, v])=>v !== undefined));
    return withTimeout(options ? setDoc(reference, cleanData, options) : setDoc(reference, cleanData), FIRESTORE_TIMEOUT);
}
async function updateDocWithTimeout(reference, data) {
    const { updateDoc } = await __turbopack_context__.A("[project]/node_modules/.pnpm/firebase@12.4.0/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript, async loader)");
    const cleanData = Object.fromEntries(Object.entries(data).filter(([, v])=>v !== undefined));
    return withTimeout(updateDoc(reference, cleanData), FIRESTORE_TIMEOUT);
}
async function deleteDocWithTimeout(reference) {
    const { deleteDoc } = await __turbopack_context__.A("[project]/node_modules/.pnpm/firebase@12.4.0/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript, async loader)");
    return withTimeout(deleteDoc(reference), FIRESTORE_TIMEOUT);
}
async function waitForPendingWritesWithTimeout(firestore, timeoutMs = FIRESTORE_TIMEOUT) {
    return withTimeout((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["waitForPendingWrites"])(firestore), timeoutMs);
}
}),
"[project]/src/lib/data-table.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCommonPinningStyles",
    ()=>getCommonPinningStyles,
    "getDefaultFilterOperator",
    ()=>getDefaultFilterOperator,
    "getFilterOperators",
    ()=>getFilterOperators,
    "getValidFilters",
    ()=>getValidFilters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$data$2d$table$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/data-table.ts [app-ssr] (ecmascript)");
;
function getCommonPinningStyles({ column, withBorder = false }) {
    const isPinned = column.getIsPinned();
    const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left');
    const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right');
    return {
        boxShadow: withBorder ? isLastLeftPinnedColumn ? '-4px 0 4px -4px var(--border) inset' : isFirstRightPinnedColumn ? '4px 0 4px -4px var(--border) inset' : undefined : undefined,
        left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
        right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
        opacity: isPinned ? 0.97 : 1,
        position: isPinned ? 'sticky' : 'relative',
        background: isPinned ? 'var(--background)' : 'var(--background)',
        width: column.getSize(),
        zIndex: isPinned ? 1 : undefined
    };
}
function getFilterOperators(filterVariant) {
    const operatorMap = {
        text: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$data$2d$table$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataTableConfig"].textOperators,
        number: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$data$2d$table$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataTableConfig"].numericOperators,
        range: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$data$2d$table$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataTableConfig"].numericOperators,
        date: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$data$2d$table$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataTableConfig"].dateOperators,
        dateRange: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$data$2d$table$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataTableConfig"].dateOperators,
        boolean: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$data$2d$table$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataTableConfig"].booleanOperators,
        select: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$data$2d$table$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataTableConfig"].selectOperators,
        multiSelect: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$data$2d$table$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataTableConfig"].multiSelectOperators
    };
    return operatorMap[filterVariant] ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$data$2d$table$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataTableConfig"].textOperators;
}
function getDefaultFilterOperator(filterVariant) {
    const operators = getFilterOperators(filterVariant);
    return operators[0]?.value ?? (filterVariant === 'text' ? 'iLike' : 'eq');
}
function getValidFilters(filters) {
    return filters.filter((filter)=>filter.operator === 'isEmpty' || filter.operator === 'isNotEmpty' || (Array.isArray(filter.value) ? filter.value.length > 0 : filter.value !== '' && filter.value !== null && filter.value !== undefined));
}
}),
"[project]/src/lib/validations/shop.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "shopMemberSchema",
    ()=>shopMemberSchema,
    "shopSchema",
    ()=>shopSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.1.12/node_modules/zod/v4/classic/schemas.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$shop$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/shop.ts [app-ssr] (ecmascript)");
;
;
const shopSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
    shopname: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().min(1, 'Shop name is required').min(3, 'Shop name must be at least 3 characters').max(100, 'Shop name must be at most 100 characters').trim(),
    logo_url: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().url('Invalid URL').optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["literal"]('')),
    phone_number: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().optional(),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().email('Invalid email').optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["literal"]('')),
    shop_type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().optional(),
    shop_category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().optional(),
    shop_address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().optional(),
    signature: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().optional(),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nativeEnum"](__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$shop$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShopStatus"])
});
const shopMemberSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
    role: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nativeEnum"](__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$shop$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShopRole"]),
    permissions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["array"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
        resource: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"](),
        actions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["array"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$1$2e$12$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enum"]([
            'read',
            'write',
            'delete'
        ]))
    }))
});
}),
"[project]/src/lib/validations/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validations$2f$shop$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/validations/shop.ts [app-ssr] (ecmascript)");
;
}),
"[project]/src/lib/desktop/app-menu.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setupAppMenu",
    ()=>setupAppMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/menu.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/menuItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$submenu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/submenu.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$process$40$2$2e$3$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$process$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+plugin-process@2.3.0/node_modules/@tauri-apps/plugin-process/dist-js/index.js [app-ssr] (ecmascript)");
;
;
async function setupAppMenu() {
    const fileSubmenu = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$submenu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Submenu"].new({
        text: 'File',
        items: [
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItem"].new({
                id: 'new-shop',
                text: 'New Shop',
                accelerator: 'CmdOrCtrl+N',
                action: ()=>console.log('New Shop')
            }),
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItem"].new({
                id: 'settings',
                text: 'Settings',
                accelerator: 'CmdOrCtrl+,',
                action: ()=>console.log('Settings')
            }),
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItem"].new({
                id: 'separator-1',
                text: '---'
            }),
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItem"].new({
                id: 'quit',
                text: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                action: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$process$40$2$2e$3$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$process$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exit"])()
            })
        ]
    });
    const editSubmenu = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$submenu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Submenu"].new({
        text: 'Edit',
        items: [
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItem"].new({
                id: 'undo',
                text: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                action: ()=>console.log('Undo')
            }),
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItem"].new({
                id: 'redo',
                text: 'Redo',
                accelerator: 'CmdOrCtrl+Shift+Z',
                action: ()=>console.log('Redo')
            })
        ]
    });
    const helpSubmenu = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$submenu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Submenu"].new({
        text: 'Help',
        items: [
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItem"].new({
                id: 'about',
                text: 'About',
                action: ()=>console.log('About')
            }),
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItem"].new({
                id: 'documentation',
                text: 'Documentation',
                action: ()=>console.log('Documentation')
            })
        ]
    });
    const menu = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Menu"].new({
        items: [
            fileSubmenu,
            editSubmenu,
            helpSubmenu
        ]
    });
    await menu.setAsAppMenu();
}
}),
"[project]/src/lib/desktop/system-tray.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setupSystemTray",
    ()=>setupSystemTray
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$tray$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/tray.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/menu.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/menuItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$app$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/app.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$window$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/window.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$process$40$2$2e$3$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$process$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+plugin-process@2.3.0/node_modules/@tauri-apps/plugin-process/dist-js/index.js [app-ssr] (ecmascript)");
;
;
;
;
;
const TRAY_ID = 'shop-management-tray';
let trayInstance = null;
async function setupSystemTray() {
    // Remove all existing tray icons
    try {
        const existingTray = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$tray$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrayIcon"].getById(TRAY_ID);
        if (existingTray) {
            await existingTray.close();
        }
    } catch  {
    // Tray doesn't exist, continue
    }
    if (trayInstance) {
        try {
            await trayInstance.close();
        } catch  {
        // Already closed
        }
        trayInstance = null;
    }
    const window = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$window$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCurrentWindow"])();
    const icon = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$app$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultWindowIcon"])();
    if (!icon) {
        console.warn('No default icon available for system tray');
        return;
    }
    const trayMenu = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Menu"].new({
        items: [
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItem"].new({
                id: 'show',
                text: 'Show Window',
                action: async ()=>{
                    await window.show();
                    await window.unminimize();
                    await window.setFocus();
                }
            }),
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItem"].new({
                id: 'hide',
                text: 'Hide Window',
                action: ()=>window.hide()
            }),
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItem"].new({
                id: 'separator-1',
                text: '---------------------',
                enabled: false
            }),
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItem"].new({
                id: 'quit',
                text: 'Quit',
                action: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$process$40$2$2e$3$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$process$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exit"])()
            })
        ]
    });
    trayInstance = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$tray$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrayIcon"].new({
        id: TRAY_ID,
        icon,
        menu: trayMenu,
        tooltip: 'Shop Management System',
        menuOnLeftClick: false,
        action: async (event)=>{
            if (event.type === 'Click' && event.button === 'Left') {
                const isVisible = await window.isVisible();
                if (isVisible) {
                    await window.hide();
                } else {
                    await window.show();
                    await window.unminimize();
                    await window.setFocus();
                }
            }
        }
    });
}
}),
"[project]/src/lib/desktop/window-behavior.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setupWindowBehavior",
    ()=>setupWindowBehavior
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$window$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/window.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$window$2d$state$40$2$2e$4$2e$1$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$window$2d$state$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+plugin-window-state@2.4.1/node_modules/@tauri-apps/plugin-window-state/dist-js/index.js [app-ssr] (ecmascript)");
;
;
const isProduction = ("TURBOPACK compile-time value", "development") === 'production';
async function setupWindowBehavior() {
    const window = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$window$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getCurrentWindow"])();
    // Restore window state (production only)
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Prevent window close, hide instead
    await window.onCloseRequested(async (event)=>{
        event.preventDefault();
        // Save window state (production only)
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        await window.hide();
    });
}
}),
"[project]/src/lib/desktop/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initializeDesktop",
    ()=>initializeDesktop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$desktop$2f$app$2d$menu$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/desktop/app-menu.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$desktop$2f$system$2d$tray$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/desktop/system-tray.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$desktop$2f$window$2d$behavior$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/desktop/window-behavior.ts [app-ssr] (ecmascript)");
;
;
;
async function initializeDesktop() {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$desktop$2f$window$2d$behavior$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setupWindowBehavior"])();
        // await setupAppMenu()
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$desktop$2f$system$2d$tray$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setupSystemTray"])();
        console.log('Desktop features initialized');
    } catch (error) {
        console.error('Failed to initialize desktop features:', error);
    }
}
;
}),
"[project]/src/lib/updater.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkForAppUpdates",
    ()=>checkForAppUpdates
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$updater$40$2$2e$9$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$updater$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+plugin-updater@2.9.0/node_modules/@tauri-apps/plugin-updater/dist-js/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$dialog$40$2$2e$4$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$dialog$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+plugin-dialog@2.4.0/node_modules/@tauri-apps/plugin-dialog/dist-js/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$process$40$2$2e$3$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$process$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+plugin-process@2.3.0/node_modules/@tauri-apps/plugin-process/dist-js/index.js [app-ssr] (ecmascript)");
;
;
;
async function checkForAppUpdates(onUserClick) {
    const update = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$updater$40$2$2e$9$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$updater$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["check"])();
    if (!update?.available) {
        console.log('No update available');
    } else if (update?.available) {
        console.log('Update available!', update.version, update.body);
        const yes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$dialog$40$2$2e$4$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$dialog$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ask"])(`Update to ${update.version} is available!\n\nRelease notes: ${update.body}`, {
            title: 'Update Available',
            kind: 'info',
            okLabel: 'Update',
            cancelLabel: 'Cancel'
        });
        if (yes) {
            await update.downloadAndInstall();
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$process$40$2$2e$3$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$process$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["relaunch"])();
        } else {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$process$40$2$2e$3$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$process$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exit"])(0);
        }
    } else if (onUserClick) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$dialog$40$2$2e$4$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$dialog$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["message"])('You are on the latest version. Stay awesome!', {
            title: 'No Update Available',
            kind: 'info',
            okLabel: 'OK'
        });
    }
}
}),
"[project]/src/lib/config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "APP_VERSION",
    ()=>APP_VERSION
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$package$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/package.json (json)");
;
const APP_VERSION = __TURBOPACK__imported__module__$5b$project$5d2f$package$2e$json__$28$json$29$__["default"].version;
}),
"[project]/src/types/shop.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShopRole",
    ()=>ShopRole,
    "ShopStatus",
    ()=>ShopStatus
]);
var ShopRole = /*#__PURE__*/ function(ShopRole) {
    ShopRole["OWNER"] = "owner";
    ShopRole["ADMIN"] = "admin";
    ShopRole["MANAGER"] = "manager";
    ShopRole["STAFF"] = "staff";
    ShopRole["VIEWER"] = "viewer";
    return ShopRole;
}({});
var ShopStatus = /*#__PURE__*/ function(ShopStatus) {
    ShopStatus["ACTIVE"] = "active";
    ShopStatus["INACTIVE"] = "inactive";
    ShopStatus["SUSPENDED"] = "suspended";
    return ShopStatus;
}({});
}),
"[project]/src/stores/auth-store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$8_$40$types$2b$react$40$_118794a7ae775361407cab6bb6945c7e$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zustand@5.0.8_@types+react@_118794a7ae775361407cab6bb6945c7e/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$8_$40$types$2b$react$40$_118794a7ae775361407cab6bb6945c7e$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set)=>({
        user: null,
        isAuthenticated: false,
        loading: true,
        error: null,
        lastLoginType: 'phone',
        setUser: (user)=>set({
                user,
                isAuthenticated: !!user,
                error: null
            }),
        setLoading: (loading)=>set({
                loading
            }),
        setError: (error)=>set({
                error
            }),
        setLastLoginType: (type)=>set({
                lastLoginType: type
            }),
        reset: ()=>set({
                user: null,
                isAuthenticated: false,
                loading: false,
                error: null
            })
    }));
}),
"[project]/src/assets/logo/dark-logo.svg (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("http://localhost:3000/_next/static/media/dark-logo.5f6653e5.svg");}),
"[project]/src/assets/logo/dark-logo.svg.mjs { IMAGE => \"[project]/src/assets/logo/dark-logo.svg (static in ecmascript, tag client)\" } [app-ssr] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$logo$2f$dark$2d$logo$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/assets/logo/dark-logo.svg (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$logo$2f$dark$2d$logo$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 839,
    height: 1411,
    blurWidth: 0,
    blurHeight: 0
};
}),
"[project]/src/assets/logo/light-logo.svg (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("http://localhost:3000/_next/static/media/light-logo.e3da23a9.svg");}),
"[project]/src/assets/logo/light-logo.svg.mjs { IMAGE => \"[project]/src/assets/logo/light-logo.svg (static in ecmascript, tag client)\" } [app-ssr] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$logo$2f$light$2d$logo$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/assets/logo/light-logo.svg (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$logo$2f$light$2d$logo$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 839,
    height: 1411,
    blurWidth: 0,
    blurHeight: 0
};
}),
"[project]/src/hooks/use-mobile.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsMobile",
    ()=>useIsMobile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
    const [isMobile, setIsMobile] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](undefined);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        const onChange = ()=>{
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };
        mql.addEventListener('change', onChange);
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        return ()=>mql.removeEventListener('change', onChange);
    }, []);
    return !!isMobile;
}
}),
"[project]/src/hooks/use-safe-area-insets.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSafeAreaInsets",
    ()=>useSafeAreaInsets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tauri$2d$plugin$2d$safe$2d$area$2d$insets$40$0$2e$1$2e$0$2f$node_modules$2f$tauri$2d$plugin$2d$safe$2d$area$2d$insets$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tauri-plugin-safe-area-insets@0.1.0/node_modules/tauri-plugin-safe-area-insets/dist-js/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$platform$2d$detection$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/platform-detection.ts [app-ssr] (ecmascript)");
;
;
;
function useSafeAreaInsets() {
    const { isMobile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$platform$2d$detection$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPlatform"])();
    const [insets, setInsets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isMobile) return;
        const fetchInsets = async ()=>{
            try {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tauri$2d$plugin$2d$safe$2d$area$2d$insets$40$0$2e$1$2e$0$2f$node_modules$2f$tauri$2d$plugin$2d$safe$2d$area$2d$insets$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getInsets"])();
                console.log({
                    result
                });
                setInsets({
                    top: result.top,
                    right: result.right,
                    bottom: result.bottom,
                    left: result.left
                });
                // Set CSS variables
                document.documentElement.style.setProperty('--sat', `${result.top}px`);
                document.documentElement.style.setProperty('--sar', `${result.right}px`);
                document.documentElement.style.setProperty('--sab', `${result.bottom}px`);
                document.documentElement.style.setProperty('--sal', `${result.left}px`);
            } catch (error) {
                console.error('Failed to get safe area insets:', error);
            }
        };
        fetchInsets();
        window.addEventListener('resize', fetchInsets);
        return ()=>window.removeEventListener('resize', fetchInsets);
    }, [
        isMobile
    ]);
    return {
        insets,
        isMobile
    };
}
}),
"[project]/src/config/data-table.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTableConfig",
    ()=>dataTableConfig
]);
const dataTableConfig = {
    textOperators: [
        {
            label: 'Contains',
            value: 'iLike'
        },
        {
            label: 'Does not contain',
            value: 'notILike'
        },
        {
            label: 'Is',
            value: 'eq'
        },
        {
            label: 'Is not',
            value: 'ne'
        },
        {
            label: 'Is empty',
            value: 'isEmpty'
        },
        {
            label: 'Is not empty',
            value: 'isNotEmpty'
        }
    ],
    numericOperators: [
        {
            label: 'Is',
            value: 'eq'
        },
        {
            label: 'Is not',
            value: 'ne'
        },
        {
            label: 'Is less than',
            value: 'lt'
        },
        {
            label: 'Is less than or equal to',
            value: 'lte'
        },
        {
            label: 'Is greater than',
            value: 'gt'
        },
        {
            label: 'Is greater than or equal to',
            value: 'gte'
        },
        {
            label: 'Is between',
            value: 'isBetween'
        },
        {
            label: 'Is empty',
            value: 'isEmpty'
        },
        {
            label: 'Is not empty',
            value: 'isNotEmpty'
        }
    ],
    dateOperators: [
        {
            label: 'Is',
            value: 'eq'
        },
        {
            label: 'Is not',
            value: 'ne'
        },
        {
            label: 'Is before',
            value: 'lt'
        },
        {
            label: 'Is after',
            value: 'gt'
        },
        {
            label: 'Is on or before',
            value: 'lte'
        },
        {
            label: 'Is on or after',
            value: 'gte'
        },
        {
            label: 'Is between',
            value: 'isBetween'
        },
        {
            label: 'Is relative to today',
            value: 'isRelativeToToday'
        },
        {
            label: 'Is empty',
            value: 'isEmpty'
        },
        {
            label: 'Is not empty',
            value: 'isNotEmpty'
        }
    ],
    selectOperators: [
        {
            label: 'Is',
            value: 'eq'
        },
        {
            label: 'Is not',
            value: 'ne'
        },
        {
            label: 'Is empty',
            value: 'isEmpty'
        },
        {
            label: 'Is not empty',
            value: 'isNotEmpty'
        }
    ],
    multiSelectOperators: [
        {
            label: 'Has any of',
            value: 'inArray'
        },
        {
            label: 'Has none of',
            value: 'notInArray'
        },
        {
            label: 'Is empty',
            value: 'isEmpty'
        },
        {
            label: 'Is not empty',
            value: 'isNotEmpty'
        }
    ],
    booleanOperators: [
        {
            label: 'Is',
            value: 'eq'
        },
        {
            label: 'Is not',
            value: 'ne'
        }
    ],
    sortOrders: [
        {
            label: 'Asc',
            value: 'asc'
        },
        {
            label: 'Desc',
            value: 'desc'
        }
    ],
    filterVariants: [
        'text',
        'number',
        'range',
        'date',
        'dateRange',
        'boolean',
        'select',
        'multiSelect'
    ],
    operators: [
        'iLike',
        'notILike',
        'eq',
        'ne',
        'inArray',
        'notInArray',
        'isEmpty',
        'isNotEmpty',
        'lt',
        'lte',
        'gt',
        'gte',
        'isBetween',
        'isRelativeToToday'
    ],
    joinOperators: [
        'and',
        'or'
    ]
};
}),
"[project]/src/config/units.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UNITS",
    ()=>UNITS
]);
const UNITS = [
    {
        id: 'none',
        fullName: 'None',
        shortName: ''
    },
    {
        id: 'bags',
        fullName: 'BAGS',
        shortName: 'Bag'
    },
    {
        id: 'bottles',
        fullName: 'BOTTLES',
        shortName: 'Btl'
    },
    {
        id: 'box',
        fullName: 'BOX',
        shortName: 'Box'
    },
    {
        id: 'bundles',
        fullName: 'BUNDLES',
        shortName: 'Bdl'
    },
    {
        id: 'cans',
        fullName: 'CANS',
        shortName: 'Can'
    },
    {
        id: 'cartons',
        fullName: 'CARTONS',
        shortName: 'Ctn'
    },
    {
        id: 'dozens',
        fullName: 'DOZENS',
        shortName: 'Dzn'
    },
    {
        id: 'grammes',
        fullName: 'GRAMMES',
        shortName: 'Gm'
    },
    {
        id: 'kilograms',
        fullName: 'KILOGRAMS',
        shortName: 'Kg'
    },
    {
        id: 'litre',
        fullName: 'LITRE',
        shortName: 'Ltr'
    },
    {
        id: 'meters',
        fullName: 'METERS',
        shortName: 'Mtr'
    },
    {
        id: 'mililitre',
        fullName: 'MILILITRE',
        shortName: 'Ml'
    },
    {
        id: 'numbers',
        fullName: 'NUMBERS',
        shortName: 'Nos'
    },
    {
        id: 'packs',
        fullName: 'PACKS',
        shortName: 'Pac'
    },
    {
        id: 'pairs',
        fullName: 'PAIRS',
        shortName: 'Prs'
    },
    {
        id: 'pieces',
        fullName: 'PIECES',
        shortName: 'Pcs'
    },
    {
        id: 'quintal',
        fullName: 'QUINTAL',
        shortName: 'Qtl'
    },
    {
        id: 'rolls',
        fullName: 'ROLLS',
        shortName: 'Rol'
    },
    {
        id: 'square-feet',
        fullName: 'SQUARE FEET',
        shortName: 'Sqf'
    },
    {
        id: 'square-meters',
        fullName: 'SQUARE METERS',
        shortName: 'Sqm'
    },
    {
        id: 'tablets',
        fullName: 'TABLETS',
        shortName: 'Tbs'
    }
];
}),
"[project]/src/config/sidebar-config.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sidebarItems",
    ()=>sidebarItems
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBellRinging$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBellRinging$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconBellRinging.mjs [app-ssr] (ecmascript) <export default as IconBellRinging>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingStore$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingStore$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconBuildingStore.mjs [app-ssr] (ecmascript) <export default as IconBuildingStore>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChartBar$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChartBar$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconChartBar.mjs [app-ssr] (ecmascript) <export default as IconChartBar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChartLine$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChartLine$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconChartLine.mjs [app-ssr] (ecmascript) <export default as IconChartLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCoin$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCoin$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconCoin.mjs [app-ssr] (ecmascript) <export default as IconCoin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCreditCard$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconCreditCard.mjs [app-ssr] (ecmascript) <export default as IconCreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileInvoice$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileInvoice$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconFileInvoice.mjs [app-ssr] (ecmascript) <export default as IconFileInvoice>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconHome$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconHome$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconHome.mjs [app-ssr] (ecmascript) <export default as IconHome>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconKey$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconKey$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconKey.mjs [app-ssr] (ecmascript) <export default as IconKey>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPackage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPackage$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconPackage.mjs [app-ssr] (ecmascript) <export default as IconPackage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconPlus.mjs [app-ssr] (ecmascript) <export default as IconPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconReceipt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconReceipt$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconReceipt.mjs [app-ssr] (ecmascript) <export default as IconReceipt>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconReportMoney$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconReportMoney$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconReportMoney.mjs [app-ssr] (ecmascript) <export default as IconReportMoney>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconRotateClockwise2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconRotateClockwise2$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconRotateClockwise2.mjs [app-ssr] (ecmascript) <export default as IconRotateClockwise2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSettings$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSettings$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconSettings.mjs [app-ssr] (ecmascript) <export default as IconSettings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShoppingBag$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconShoppingBag.mjs [app-ssr] (ecmascript) <export default as IconShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShoppingCart$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconShoppingCart.mjs [app-ssr] (ecmascript) <export default as IconShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrendingDown$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrendingDown$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconTrendingDown.mjs [app-ssr] (ecmascript) <export default as IconTrendingDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrendingUp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconTrendingUp.mjs [app-ssr] (ecmascript) <export default as IconTrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUser$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUser$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconUser.mjs [app-ssr] (ecmascript) <export default as IconUser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUsers$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUsers$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconUsers.mjs [app-ssr] (ecmascript) <export default as IconUsers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconWallet$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconWallet$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconWallet.mjs [app-ssr] (ecmascript) <export default as IconWallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconWebhook$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconWebhook$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tabler+icons-react@3.35.0_react@19.2.0/node_modules/@tabler/icons-react/dist/esm/icons/IconWebhook.mjs [app-ssr] (ecmascript) <export default as IconWebhook>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$to$2d$line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownToLine$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.544.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/arrow-down-to-line.js [app-ssr] (ecmascript) <export default as ArrowDownToLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$from$2d$line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpFromLine$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.544.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/arrow-up-from-line.js [app-ssr] (ecmascript) <export default as ArrowUpFromLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeDollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.544.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/badge-dollar-sign.js [app-ssr] (ecmascript) <export default as BadgeDollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.544.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.544.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/smartphone.js [app-ssr] (ecmascript) <export default as Smartphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.544.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.544.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/undo-2.js [app-ssr] (ecmascript) <export default as Undo2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sidebar$2f$badge$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/sidebar/badge-helpers.ts [app-ssr] (ecmascript)");
;
;
;
const sidebarItems = [
    {
        id: 'home',
        label: 'Home',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconHome$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconHome$3e$__["IconHome"],
        route: '/'
    },
    {
        id: 'parties',
        label: 'Parties',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUsers$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUsers$3e$__["IconUsers"],
        route: '/parties',
        action: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__["IconPlus"],
            onClick: ()=>console.log('Add party'),
            label: 'Add Party'
        }
    },
    {
        id: 'items',
        label: 'Items',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPackage$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPackage$3e$__["IconPackage"],
        route: '/items',
        action: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__["IconPlus"],
            onClick: ()=>console.log('Add item'),
            label: 'Add Item'
        }
    },
    {
        id: 'sales',
        label: 'Sales',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrendingUp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrendingUp$3e$__["IconTrendingUp"],
        subItems: [
            {
                id: 'sales-list',
                label: 'All Sales',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileInvoice$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileInvoice$3e$__["IconFileInvoice"],
                route: '/sales'
            },
            {
                id: 'add-sale',
                label: 'New Sale',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__["IconPlus"],
                route: '/sales/create'
            },
            {
                id: 'sale-return',
                label: 'Sale Returns',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__["Undo2"],
                route: '/sales/return'
            }
        ]
    },
    {
        id: 'purchases',
        label: 'Purchases',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShoppingCart$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShoppingCart$3e$__["IconShoppingCart"],
        subItems: [
            {
                id: 'purchase-list',
                label: 'All Purchases',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconReceipt$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconReceipt$3e$__["IconReceipt"],
                route: '/purchase'
            },
            {
                id: 'add-purchase',
                label: 'New Purchase',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__["IconPlus"],
                route: '/purchase/add'
            },
            {
                id: 'purchase-return',
                label: 'Purchase Returns',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconRotateClockwise2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconRotateClockwise2$3e$__["IconRotateClockwise2"],
                route: '/purchase/return'
            }
        ]
    },
    {
        id: 'payments',
        label: 'Payments',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconWallet$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconWallet$3e$__["IconWallet"],
        subItems: [
            {
                id: 'payment-in',
                label: 'Payment In',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$to$2d$line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownToLine$3e$__["ArrowDownToLine"],
                route: '/payment/in'
            },
            {
                id: 'payment-out',
                label: 'Payment Out',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$from$2d$line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpFromLine$3e$__["ArrowUpFromLine"],
                route: '/payment/out'
            }
        ]
    },
    {
        id: 'expenses',
        label: 'Expenses',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconTrendingDown$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconTrendingDown$3e$__["IconTrendingDown"],
        route: '/expenses',
        action: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPlus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPlus$3e$__["IconPlus"],
            onClick: ()=>console.log('Add expense'),
            label: 'Add Expense'
        }
    },
    {
        id: 'mobile-banking',
        label: 'Mobile Banking',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"],
        subItems: [
            {
                id: 'bkash',
                label: 'bKash',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCoin$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCoin$3e$__["IconCoin"],
                route: '/mobile-banking/bkash'
            },
            {
                id: 'nagad',
                label: 'Nagad',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCoin$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCoin$3e$__["IconCoin"],
                route: '/mobile-banking/nagad'
            },
            {
                id: 'rocket',
                label: 'Rocket',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCoin$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCoin$3e$__["IconCoin"],
                route: '/mobile-banking/rocket'
            }
        ]
    },
    {
        id: 'reports',
        label: 'Reports',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChartBar$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChartBar$3e$__["IconChartBar"],
        badge: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sidebar$2f$badge$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSecurityCount"],
        subItems: [
            {
                id: 'sales-report',
                label: 'Sales Report',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
                route: '/reports/sales'
            },
            {
                id: 'purchase-report',
                label: 'Purchase Report',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconShoppingBag$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconShoppingBag$3e$__["IconShoppingBag"],
                route: '/reports/purchase'
            },
            {
                id: 'profit-loss',
                label: 'Profit & Loss',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconReportMoney$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconReportMoney$3e$__["IconReportMoney"],
                route: '/reports/profit-loss'
            },
            {
                id: 'inventory-report',
                label: 'Inventory Report',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
                route: '/reports/inventory'
            },
            {
                id: 'party-statement',
                label: 'Party Statement',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeDollarSign$3e$__["BadgeDollarSign"],
                route: '/reports/party-statement'
            },
            {
                id: 'cash-flow',
                label: 'Cash Flow',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconChartLine$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconChartLine$3e$__["IconChartLine"],
                route: '/reports/cash-flow'
            }
        ]
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSettings$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSettings$3e$__["IconSettings"],
        subItems: [
            {
                id: 'shop-settings',
                label: 'Shop Settings',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBuildingStore$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBuildingStore$3e$__["IconBuildingStore"],
                route: '/settings/shop'
            },
            {
                id: 'profile',
                label: 'Profile',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconUser$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconUser$3e$__["IconUser"],
                route: '/settings/profile'
            },
            {
                id: 'billing',
                label: 'Billing',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCreditCard$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCreditCard$3e$__["IconCreditCard"],
                route: '/settings/billing'
            },
            {
                id: 'notifications',
                label: 'Notifications',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconBellRinging$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconBellRinging$3e$__["IconBellRinging"],
                route: '/settings/notifications'
            },
            {
                id: 'webhooks',
                label: 'Webhooks',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconWebhook$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconWebhook$3e$__["IconWebhook"],
                route: '/settings/webhooks'
            },
            {
                id: 'api-keys',
                label: 'API Keys',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tabler$2b$icons$2d$react$40$3$2e$35$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconKey$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconKey$3e$__["IconKey"],
                route: '/settings/api-keys'
            }
        ]
    }
];
}),
"[project]/src/config/quick-actions.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_BOTTOM_ACTIONS",
    ()=>DEFAULT_BOTTOM_ACTIONS,
    "QUICK_ACTIONS",
    ()=>QUICK_ACTIONS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.544.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.544.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/arrow-down-left.js [app-ssr] (ecmascript) <export default as ArrowDownLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.544.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.544.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/clipboard-list.js [app-ssr] (ecmascript) <export default as ClipboardList>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.544.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/file-check.js [app-ssr] (ecmascript) <export default as FileCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FilePlus$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.544.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/file-plus.js [app-ssr] (ecmascript) <export default as FilePlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.544.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/truck.js [app-ssr] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.544.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-ssr] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.544.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-ssr] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.544.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.544.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/receipt.js [app-ssr] (ecmascript) <export default as Receipt>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftRight$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.544.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/arrow-left-right.js [app-ssr] (ecmascript) <export default as ArrowLeftRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.544.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-ssr] (ecmascript) <export default as ShoppingBag>");
;
const QUICK_ACTIONS = [
    {
        title: 'Sale Transactions',
        items: [
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
                label: 'Sale Invoice',
                href: '/sale-invoice'
            },
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownLeft$3e$__["ArrowDownLeft"],
                label: 'Payment-In',
                href: '/payment-in'
            },
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"],
                label: 'Credit Note',
                href: '/credit-note'
            },
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"],
                label: 'Sale Order',
                href: '/sale-order'
            },
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCheck$3e$__["FileCheck"],
                label: 'Estimate',
                href: '/estimate'
            },
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FilePlus$3e$__["FilePlus"],
                label: 'Proforma Invoice',
                href: '/proforma-invoice'
            },
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"],
                label: 'Delivery Challan',
                href: '/delivery-challan'
            }
        ]
    },
    {
        title: 'Purchase Transactions',
        items: [
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"],
                label: 'Purchase',
                href: '/purchase'
            },
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"],
                label: 'Payment-Out',
                href: '/payment-out'
            },
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"],
                label: 'Debit Note',
                href: '/debit-note'
            },
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"],
                label: 'Purchase Order',
                href: '/purchase-order'
            }
        ]
    },
    {
        title: 'Other Transactions',
        items: [
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__["Receipt"],
                label: 'Expenses',
                href: '/expenses'
            },
            {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftRight$3e$__["ArrowLeftRight"],
                label: 'Party Transfer',
                href: '/party-transfer'
            }
        ]
    }
];
const DEFAULT_BOTTOM_ACTIONS = [
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"],
        label: 'Purchase',
        href: '/purchase'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"],
        label: 'Sale',
        href: '/sale-invoice'
    }
];
}),
"[project]/src/legacy-app/pages/auth.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "AuthPage",
    ()=>AuthPage,
    "ProfilePage",
    ()=>ProfilePage,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$components$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/auth/components/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$components$2f$login$2d$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/components/login-form.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$components$2f$profile$2d$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/components/profile-form.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/components/auth-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$components$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$components$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function AuthPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleAuthSuccess = ()=>{
        router.push('/shops');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-md",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$components$2f$login$2d$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoginForm"], {
                onSuccess: handleAuthSuccess
            }, void 0, false, {
                fileName: "[project]/src/legacy-app/pages/auth.tsx",
                lineNumber: 15,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/legacy-app/pages/auth.tsx",
            lineNumber: 14,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/legacy-app/pages/auth.tsx",
        lineNumber: 13,
        columnNumber: 9
    }, this);
}
function ProfilePage() {
    const { logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const handleLogout = async ()=>{
        await logout();
        window.location.href = '/';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 overflow-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-2xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold",
                            children: "Profile Settings"
                        }, void 0, false, {
                            fileName: "[project]/src/legacy-app/pages/auth.tsx",
                            lineNumber: 33,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            onClick: handleLogout,
                            children: "Logout"
                        }, void 0, false, {
                            fileName: "[project]/src/legacy-app/pages/auth.tsx",
                            lineNumber: 34,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/legacy-app/pages/auth.tsx",
                    lineNumber: 32,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$components$2f$profile$2d$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProfileForm"], {}, void 0, false, {
                    fileName: "[project]/src/legacy-app/pages/auth.tsx",
                    lineNumber: 38,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/legacy-app/pages/auth.tsx",
            lineNumber: 31,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/legacy-app/pages/auth.tsx",
        lineNumber: 30,
        columnNumber: 9
    }, this);
}
const __TURBOPACK__default__export__ = AuthPage;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/utils/platform-detection.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPlatform",
    ()=>getPlatform,
    "getUpdaterPlatformString",
    ()=>getUpdaterPlatformString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$os$40$2$2e$3$2e$1$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$os$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+plugin-os@2.3.1/node_modules/@tauri-apps/plugin-os/dist-js/index.js [app-ssr] (ecmascript)");
;
function getPlatform() {
    if ("TURBOPACK compile-time truthy", 1) {
        return {
            platform: 'mobile-web',
            isMobile: false,
            isDesktop: false,
            isAndroid: false,
            isIOS: false,
            isTauri: false,
            userAgent: 'server'
        };
    }
    //TURBOPACK unreachable
    ;
    const isTauri = undefined;
    let platform;
    let isAndroid;
    let isIOS;
    // Only call tauriPlatform if we are in a Tauri environment or if the plugin handles non-Tauri gracefully.
    // Assuming the plugin might throw or fail if window is missing (which we checked) or if not in Tauri.
    // But the error was specifically "window is not defined" inside the plugin call likely.
    let currentPlatform;
    const isMobile = undefined;
}
function getUpdaterPlatformString() {
    const platformInfo = getPlatform();
    if (platformInfo.isAndroid) {
        return 'android-aarch64';
    } else if (platformInfo.isIOS) {
        return 'darwin-aarch64' // iOS uses darwin-aarch64 in the API
        ;
    } else {
        // Default to android for mobile web and desktop
        return 'android-aarch64';
    }
}
}),
"[project]/src/services/mobile-updater.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobileUpdaterService",
    ()=>MobileUpdaterService,
    "mobileUpdater",
    ()=>mobileUpdater
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$os$40$2$2e$3$2e$1$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$os$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+plugin-os@2.3.1/node_modules/@tauri-apps/plugin-os/dist-js/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$http$40$2$2e$5$2e$2$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$http$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+plugin-http@2.5.2/node_modules/@tauri-apps/plugin-http/dist-js/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$upload$40$2$2e$3$2e$1$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$upload$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+plugin-upload@2.3.1/node_modules/@tauri-apps/plugin-upload/dist-js/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$fs$40$2$2e$4$2e$2$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$fs$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+plugin-fs@2.4.2/node_modules/@tauri-apps/plugin-fs/dist-js/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$path$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/path.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$opener$40$2$2e$5$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$opener$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+plugin-opener@2.5.0/node_modules/@tauri-apps/plugin-opener/dist-js/index.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
// Helper function to compare semantic versions
function compareVersions(version1, version2) {
    const v1parts = version1.split('.').map(Number);
    const v2parts = version2.split('.').map(Number);
    for(let i = 0; i < Math.max(v1parts.length, v2parts.length); i++){
        const v1part = v1parts[i] || 0;
        const v2part = v2parts[i] || 0;
        if (v1part > v2part) return 1;
        if (v1part < v2part) return -1;
    }
    return 0;
}
// Detect current platform using Tauri OS plugin when available
async function getCurrentPlatform() {
    try {
        // Check if running in Tauri environment
        if (("TURBOPACK compile-time value", "undefined") !== 'undefined' && '__TAURI__' in window) //TURBOPACK unreachable
        ;
        // Fallback to user agent detection
        const userAgent = navigator.userAgent.toLowerCase();
        if (/android/.test(userAgent)) {
            return 'android-aarch64';
        } else if (/iphone|ipad|ipod/.test(userAgent)) {
            return 'darwin-aarch64' // iOS uses darwin-aarch64
            ;
        }
        // Default to android for mobile web and desktop
        return 'android-aarch64';
    } catch (error) {
        console.error('Error detecting platform:', error);
        return 'android-aarch64' // Safe fallback
        ;
    }
}
class MobileUpdaterService {
    static instance;
    isInitialized = false;
    checkInterval = null;
    listeners = [];
    isEnabled = false;
    currentState = {
        status: 'idle'
    };
    UPDATE_ENDPOINT = 'https://updater-worker.stackproviders.workers.dev/latest?ttl=300';
    constructor(){}
    static getInstance() {
        if (!MobileUpdaterService.instance) {
            MobileUpdaterService.instance = new MobileUpdaterService();
        }
        return MobileUpdaterService.instance;
    }
    setEnabled(enabled) {
        this.isEnabled = enabled;
        if (enabled && !this.isInitialized) {
            this.initialize();
        } else if (!enabled) {
            this.stopPeriodicChecks();
        }
    }
    subscribe(listener) {
        this.listeners.push(listener);
        // Immediately call listener with current state
        listener(this.currentState);
        return ()=>{
            this.listeners = this.listeners.filter((l)=>l !== listener);
        };
    }
    notifyListeners() {
        this.listeners.forEach((listener)=>listener(this.currentState));
    }
    updateState(newState) {
        this.currentState = {
            ...this.currentState,
            ...newState
        };
        this.notifyListeners();
    }
    async initialize() {
        if (this.isInitialized || !this.isEnabled) {
            return;
        }
        try {
            await this.checkForUpdates();
            this.startPeriodicChecks();
            this.isInitialized = true;
            console.log('Mobile auto-updater initialized');
        } catch (error) {
            console.error('Failed to initialize mobile auto-updater:', error);
            this.updateState({
                status: 'error',
                error: error instanceof Error ? error.message : 'Failed to initialize updater'
            });
        }
    }
    async checkForUpdates() {
        if (!this.isEnabled) return null;
        try {
            this.updateState({
                status: 'checking',
                error: undefined
            });
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$http$40$2$2e$5$2e$2$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$http$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetch"])(this.UPDATE_ENDPOINT, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Cache-Control': 'no-cache'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const updateInfo = await response.json();
            // Compare versions to determine if update is actually newer
            const versionComparison = compareVersions(updateInfo.version, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_VERSION"]);
            if (versionComparison > 0) {
                console.log(`Mobile update available: v${updateInfo.version} (current: v${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_VERSION"]})`);
                const currentPlatform = await getCurrentPlatform();
                const platformInfo = updateInfo.platforms[currentPlatform];
                if (!platformInfo) {
                    throw new Error(`No update available for platform: ${currentPlatform}`);
                }
                // Check if this version is already downloaded
                const downloadedVersion = this.getDownloadedVersion();
                const isAlreadyDownloaded = downloadedVersion === updateInfo.version;
                // Check if file exists on disk
                let downloadedFilePath;
                if (isAlreadyDownloaded) {
                    try {
                        const downloadDirectory = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$path$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["downloadDir"])();
                        const fileName = `Shop-Management-System-${updateInfo.version}.apk`;
                        const filePath = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$path$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["join"])(downloadDirectory, fileName);
                        const fileExists = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$fs$40$2$2e$4$2e$2$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$fs$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["exists"])(filePath);
                        if (fileExists) {
                            downloadedFilePath = filePath;
                        } else {
                            // File doesn't exist, clear the version tracking
                            this.clearDownloadedVersion();
                        }
                    } catch (error) {
                        console.warn('Error checking file existence:', error);
                        this.clearDownloadedVersion();
                    }
                }
                this.updateState({
                    status: isAlreadyDownloaded && downloadedFilePath ? 'downloaded' : 'available',
                    update: updateInfo,
                    downloadUrl: platformInfo.url,
                    downloadedVersion: isAlreadyDownloaded && downloadedFilePath ? updateInfo.version : undefined,
                    downloadedFilePath: downloadedFilePath,
                    error: undefined
                });
                return updateInfo;
            } else {
                console.log(`Mobile app is up to date. Current version (v${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_VERSION"]}) is same or newer than available version (v${updateInfo.version})`);
                this.updateState({
                    status: 'up-to-date',
                    update: updateInfo,
                    error: undefined
                });
                return null;
            }
        } catch (error) {
            console.log('Update check failed (offline or network issue):', error);
            // Don't show errors for offline mode - just silently fail
            // This allows the app to work offline without showing update errors
            this.updateState({
                status: 'idle',
                error: undefined
            });
            return null;
        }
    }
    async downloadUpdate() {
        if (this.currentState.status !== 'available' || !this.currentState.downloadUrl) {
            throw new Error('No update available to download');
        }
        let cumulativeBytes = 0;
        let totalBytes = 0;
        try {
            this.updateState({
                status: 'downloading',
                error: undefined,
                progress: 0
            });
            const downloadDirectory = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$path$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["downloadDir"])();
            const fileName = `Shop-Management-System-${this.currentState.update?.version || 'latest'}.apk`;
            const filePath = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$path$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["join"])(downloadDirectory, fileName);
            const fileExists = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$fs$40$2$2e$4$2e$2$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$fs$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["exists"])(filePath);
            if (fileExists) {
                const downloadedVersion = this.currentState.update?.version || 'unknown';
                this.setDownloadedVersion(downloadedVersion);
                this.updateState({
                    status: 'downloaded',
                    progress: 100,
                    downloadedVersion,
                    downloadedFilePath: filePath
                });
                return;
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$upload$40$2$2e$3$2e$1$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$upload$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["download"])(this.currentState.downloadUrl, filePath, (progressInfo)=>{
                const chunkSize = typeof progressInfo.progress === 'number' ? progressInfo.progress : 0;
                const total = typeof progressInfo.total === 'number' ? progressInfo.total : 0;
                if (total > 0) {
                    totalBytes = total;
                    cumulativeBytes += chunkSize;
                    const progressPercent = Math.min(99, Math.round(cumulativeBytes / totalBytes * 100));
                    this.updateState({
                        progress: progressPercent
                    });
                }
            }, new Map([
                [
                    'Accept',
                    'application/octet-stream'
                ],
                [
                    'User-Agent',
                    'Shop-Management-System-Updater'
                ]
            ]));
            const downloadedVersion = this.currentState.update?.version || 'unknown';
            this.setDownloadedVersion(downloadedVersion);
            this.updateState({
                status: 'downloaded',
                progress: 100,
                downloadedVersion,
                downloadedFilePath: filePath
            });
        } catch (error) {
            console.error('Download error:', error);
            let errorMessage = 'Failed to download update';
            if (error instanceof Error) {
                if (error.message.includes('network') || error.message.includes('fetch')) {
                    errorMessage = 'Network error. Please check your internet connection and try again.';
                } else if (error.message.includes('HTTP')) {
                    errorMessage = `Download failed: ${error.message}`;
                } else {
                    errorMessage = error.message;
                }
            }
            this.updateState({
                status: 'error',
                error: errorMessage
            });
            throw error;
        }
    }
    async installUpdate() {
        try {
            this.updateState({
                status: 'installing',
                error: undefined
            });
            const currentPlatform = await getCurrentPlatform();
            // const downloadedFilePath = this.currentState.downloadedFilePath
            if (currentPlatform === 'android-aarch64') {
                // Prefer installing from the already-downloaded APK using Opener's openPath
                const localPath = this.currentState.downloadedFilePath;
                console.log('localPath', localPath);
                if (localPath) {
                    try {
                        const fileExists = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$fs$40$2$2e$4$2e$2$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$fs$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["exists"])(localPath);
                        if (!fileExists) throw new Error('Downloaded file not found');
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$opener$40$2$2e$5$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$opener$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["openPath"])(localPath);
                        this.showInstallNotification();
                        setTimeout(()=>{
                            this.clearDownloadedState();
                        }, 2000);
                        return;
                    } catch (autoInstallError) {
                        console.warn('Local install failed, falling back to URL:', autoInstallError);
                    }
                }
                // Fallback: open the HTTPS download URL so the system package installer handles it.
                if (this.currentState.downloadUrl) {
                    try {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$opener$40$2$2e$5$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$opener$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["openUrl"])(this.currentState.downloadUrl);
                        this.showInstallNotification();
                        setTimeout(()=>{
                            this.clearDownloadedState();
                        }, 2000);
                    } catch (autoInstallError) {
                        console.error('Installation failed:', autoInstallError);
                        window.open(this.currentState.downloadUrl, '_blank');
                        this.updateState({
                            status: 'downloaded',
                            error: undefined
                        });
                    }
                }
            } else if (currentPlatform === 'darwin-aarch64') {
                // For iOS, redirect to App Store or show instructions
                if (this.currentState.downloadUrl) {
                    window.open(this.currentState.downloadUrl, '_blank');
                }
                this.updateState({
                    status: 'downloaded',
                    error: undefined
                });
                alert('Please update through the App Store to get the latest version.');
            } else {
                // For other platforms, open the download URL
                if (this.currentState.downloadUrl) {
                    window.open(this.currentState.downloadUrl, '_blank');
                }
                this.updateState({
                    status: 'downloaded',
                    error: undefined
                });
                alert('Please install the downloaded file to update the application.');
            }
        } catch (error) {
            console.error('Install error:', error);
            this.updateState({
                status: 'error',
                error: 'Failed to install update'
            });
            throw error;
        }
    }
    startPeriodicChecks() {
        const CHECK_INTERVAL = 24 * 60 * 60 * 1000 // 24 hours
        ;
        this.checkInterval = window.setInterval(()=>{
            this.checkForUpdates();
        }, CHECK_INTERVAL);
    }
    stopPeriodicChecks() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
    }
    getCurrentState() {
        return this.currentState;
    }
    clearDownloadedState() {
        // Clear the downloaded blob and reset to available state
        ;
        this.downloadedBlob = undefined;
        this.clearDownloadedVersion();
        this.updateState({
            status: 'available',
            progress: undefined,
            downloadedVersion: undefined,
            downloadedFilePath: undefined
        });
    }
    async cleanupDownloadedFiles() {
        try {
            const downloadedVersion = this.getDownloadedVersion();
            if (downloadedVersion) {
                const downloadDirectory = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$path$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["downloadDir"])();
                const fileName = `Shop-Management-System-${downloadedVersion}.apk`;
                const filePath = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$path$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["join"])(downloadDirectory, fileName);
                const fileExists = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$fs$40$2$2e$4$2e$2$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$fs$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["exists"])(filePath);
                if (fileExists) {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$plugin$2d$fs$40$2$2e$4$2e$2$2f$node_modules$2f40$tauri$2d$apps$2f$plugin$2d$fs$2f$dist$2d$js$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["remove"])(filePath);
                    console.log(`Cleaned up downloaded file: ${filePath}`);
                }
            }
        } catch (error) {
            console.warn('Error cleaning up downloaded files:', error);
        }
    }
    getDownloadedVersion() {
        return localStorage.getItem('downloadedAppVersion');
    }
    setDownloadedVersion(version) {
        localStorage.setItem('downloadedAppVersion', version);
    }
    clearDownloadedVersion() {
        localStorage.removeItem('downloadedAppVersion');
    }
    showInstallNotification() {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('App Update', {
                body: `Installation started for v${this.currentState.update?.version || 'latest'}. The APK file will open automatically.`,
                icon: '/favicon.ico'
            });
        }
    }
    checkIfAppWasUpdated() {
        // Check if the app version has changed since last check
        const lastKnownVersion = localStorage.getItem('lastKnownAppVersion');
        const currentVersion = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_VERSION"];
        if (lastKnownVersion && lastKnownVersion !== currentVersion) {
            // App was updated
            localStorage.setItem('lastKnownAppVersion', currentVersion);
            return true;
        } else if (!lastKnownVersion) {
            // First time running, store current version
            localStorage.setItem('lastKnownAppVersion', currentVersion);
        }
        return false;
    }
    showUpdateSuccessMessage() {
        const wasUpdated = this.checkIfAppWasUpdated();
        if (wasUpdated) {
            const successMessage = `
🎉 Update Successful!

✅ Your app has been updated successfully.
✅ All your data and settings have been preserved.
✅ You're now running the latest version.

Thank you for keeping your app up to date!
      `;
            alert(successMessage);
        }
    }
    destroy() {
        this.stopPeriodicChecks();
        this.isInitialized = false;
        this.listeners = [];
        this.currentState = {
            status: 'idle'
        };
    }
}
const mobileUpdater = MobileUpdaterService.getInstance();
}),
"[project]/src/app/providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.2_a6e7fe7b2107bfd5c9e45031e322c5c3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$errors$2f$app$2d$error$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/errors/app-error.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$error$2d$boundary$40$6$2e$0$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2d$error$2d$boundary$2f$dist$2f$react$2d$error$2d$boundary$2e$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-error-boundary@6.0.0_react@19.2.0/node_modules/react-error-boundary/dist/react-error-boundary.development.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/tooltip.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$theme$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/providers/theme-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sonner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/sonner.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$shop$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/shop/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$shop$2f$components$2f$shop$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/shop/components/shop-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$components$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/auth/components/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/components/auth-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$reactfire$40$4$2e$2$2e$3_firebase$40$12$2e$4$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$reactfire$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/reactfire@4.2.3_firebase@12.4.0_react@19.2.0/node_modules/reactfire/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/spinner.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firebase$40$12$2e$4$2e$0$2f$node_modules$2f$firebase$2f$storage$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/firebase@12.4.0/node_modules/firebase/storage/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$storage$40$0$2e$14$2e$0_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@firebase+storage@0.14.0_@firebase+app@0.14.4/node_modules/@firebase/storage/dist/node-esm/index.node.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$desktop$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/desktop/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$platform$2d$detection$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/platform-detection.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$updater$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/updater.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$mobile$2d$updater$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/providers/mobile-updater-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$safe$2d$area$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/providers/safe-area-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$firebase$40$12$2e$4$2e$0$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/firebase@12.4.0/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@firebase+firestore@4.9.2_@firebase+app@0.14.4/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nuqs$40$2$2e$7$2e$2_$40$tanstack$2b$react$2d$_2b28b7ee3b4fb772c54c79400c66375c$2f$node_modules$2f$nuqs$2f$dist$2f$adapters$2f$next$2f$app$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/nuqs@2.7.2_@tanstack+react-_2b28b7ee3b4fb772c54c79400c66375c/node_modules/nuqs/dist/adapters/next/app.js [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$shop$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$shop$2f$components$2f$shop$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$components$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$shop$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$shop$2f$components$2f$shop$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$components$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
;
;
;
;
;
function AppWithStorage({ children }) {
    const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$reactfire$40$4$2e$2$2e$3_firebase$40$12$2e$4$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$reactfire$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFirebaseApp"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$reactfire$40$4$2e$2$2e$3_firebase$40$12$2e$4$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$reactfire$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StorageProvider"], {
        sdk: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$storage$40$0$2e$14$2e$0_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStorage"])(app),
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/providers.tsx",
        lineNumber: 37,
        columnNumber: 12
    }, this);
}
function FirestoreWrapper({ children }) {
    const { data: firestoreInstance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$reactfire$40$4$2e$2$2e$3_firebase$40$12$2e$4$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$reactfire$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInitFirestore"])(async (firebaseApp)=>{
        try {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initializeFirestore"])(firebaseApp, {
                localCache: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persistentLocalCache"])({
                    tabManager: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persistentMultipleTabManager"])()
                })
            });
        } catch  {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$firebase$2b$firestore$40$4$2e$9$2e$2_$40$firebase$2b$app$40$0$2e$14$2e$4$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirestore"])(firebaseApp);
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$reactfire$40$4$2e$2$2e$3_firebase$40$12$2e$4$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$reactfire$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FirestoreProvider"], {
        sdk: firestoreInstance,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/providers.tsx",
        lineNumber: 56,
        columnNumber: 9
    }, this);
}
function PlatformInit({ children }) {
    const { isDesktop, isMobile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$platform$2d$detection$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPlatform"])(), []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isDesktop) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$updater$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["checkForAppUpdates"])(false);
        }
    }, [
        isDesktop
    ]);
    // Initialize desktop features once
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (("TURBOPACK compile-time value", "undefined") !== 'undefined' && '__TAURI__' in window) //TURBOPACK unreachable
        ;
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$safe$2d$area$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SafeAreaProvider"], {
        children: isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$mobile$2d$updater$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobileUpdaterProvider"], {
            children: children
        }, void 0, false, {
            fileName: "[project]/src/app/providers.tsx",
            lineNumber: 81,
            columnNumber: 17
        }, this) : children
    }, void 0, false, {
        fileName: "[project]/src/app/providers.tsx",
        lineNumber: 79,
        columnNumber: 9
    }, this);
}
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$reactfire$40$4$2e$2$2e$3_firebase$40$12$2e$4$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$reactfire$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FirebaseAppProvider"], {
        firebaseConfig: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["firebaseConfig"],
        suspense: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nuqs$40$2$2e$7$2e$2_$40$tanstack$2b$react$2d$_2b28b7ee3b4fb772c54c79400c66375c$2f$node_modules$2f$nuqs$2f$dist$2f$adapters$2f$next$2f$app$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NuqsAdapter"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$error$2d$boundary$40$6$2e$0$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$react$2d$error$2d$boundary$2f$dist$2f$react$2d$error$2d$boundary$2e$development$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ErrorBoundary"], {
                FallbackComponent: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$errors$2f$app$2d$error$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$theme$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
                        defaultTheme: "system",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$reactfire$40$4$2e$2$2e$3_firebase$40$12$2e$4$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$reactfire$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SuspenseWithPerf"], {
                            fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Spinner"], {
                                fullScreen: true,
                                className: "size-7"
                            }, void 0, false, {
                                fileName: "[project]/src/app/providers.tsx",
                                lineNumber: 98,
                                columnNumber: 37
                            }, void 0),
                            traceId: "app-init",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FirestoreWrapper, {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PlatformInit, {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$reactfire$40$4$2e$2$2e$3_firebase$40$12$2e$4$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$reactfire$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SuspenseWithPerf"], {
                                        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Spinner"], {
                                            fullScreen: true,
                                            className: "size-7"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/providers.tsx",
                                            lineNumber: 109,
                                            columnNumber: 49
                                        }, void 0),
                                        traceId: "auth-init",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthProvider"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$reactfire$40$4$2e$2$2e$3_firebase$40$12$2e$4$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$reactfire$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SuspenseWithPerf"], {
                                                fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spinner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Spinner"], {
                                                    fullScreen: true,
                                                    className: "size-7"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/providers.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 57
                                                }, void 0),
                                                traceId: "shop-init",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$shop$2f$components$2f$shop$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShopProvider"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppWithStorage, {
                                                        children: [
                                                            children,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$2_a6e7fe7b2107bfd5c9e45031e322c5c3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sonner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {
                                                                richColors: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/providers.tsx",
                                                                lineNumber: 129,
                                                                columnNumber: 61
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/providers.tsx",
                                                        lineNumber: 127,
                                                        columnNumber: 57
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/providers.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 53
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/providers.tsx",
                                                lineNumber: 117,
                                                columnNumber: 49
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/providers.tsx",
                                            lineNumber: 116,
                                            columnNumber: 45
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/providers.tsx",
                                        lineNumber: 107,
                                        columnNumber: 41
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/providers.tsx",
                                    lineNumber: 106,
                                    columnNumber: 37
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/providers.tsx",
                                lineNumber: 105,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/providers.tsx",
                            lineNumber: 96,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/providers.tsx",
                        lineNumber: 95,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/providers.tsx",
                    lineNumber: 94,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/providers.tsx",
                lineNumber: 93,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/providers.tsx",
            lineNumber: 92,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/providers.tsx",
        lineNumber: 91,
        columnNumber: 9
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=src_a35fbd8c._.js.map