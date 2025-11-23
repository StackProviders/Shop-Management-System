module.exports = [
"[project]/src/lib/db/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Repository",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$repositories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Repository"],
    "devicesCollection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["devicesCollection"],
    "devicesRepo",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["devicesRepo"],
    "getDatabase",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDatabase"],
    "getShopMemberQuery",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$queries$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getShopMemberQuery"],
    "getShopMembersQuery",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$queries$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getShopMembersQuery"],
    "getShopsByStatusQuery",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$queries$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getShopsByStatusQuery"],
    "getStorageInstance",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getStorageInstance"],
    "getUserActiveShopsQuery",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$queries$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserActiveShopsQuery"],
    "getUserDevicesQuery",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$queries$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserDevicesQuery"],
    "getUserShopsQuery",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$queries$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserShopsQuery"],
    "otpRequestsCollection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["otpRequestsCollection"],
    "otpsRepo",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["otpsRepo"],
    "partiesCollection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["partiesCollection"],
    "shopMembersCollection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shopMembersCollection"],
    "shopMembersRepo",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["shopMembersRepo"],
    "shopsCollection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shopsCollection"],
    "shopsRepo",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["shopsRepo"],
    "trustedDevicesCollection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trustedDevicesCollection"],
    "userIdentifiersCollection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userIdentifiersCollection"],
    "usersCollection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usersCollection"],
    "usersRepo",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["usersRepo"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/db/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/schema.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$queries$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/queries.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$repositories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/repositories.ts [app-ssr] (ecmascript)");
}),
];