module.exports = [
"[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/external/tslib/tslib.es6.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol, Iterator */ __turbopack_context__.s([
    "__classPrivateFieldGet",
    ()=>__classPrivateFieldGet,
    "__classPrivateFieldSet",
    ()=>__classPrivateFieldSet
]);
function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
;
}),
"[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/core.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Channel",
    ()=>Channel,
    "PluginListener",
    ()=>PluginListener,
    "Resource",
    ()=>Resource,
    "SERIALIZE_TO_IPC_FN",
    ()=>SERIALIZE_TO_IPC_FN,
    "addPluginListener",
    ()=>addPluginListener,
    "checkPermissions",
    ()=>checkPermissions,
    "convertFileSrc",
    ()=>convertFileSrc,
    "invoke",
    ()=>invoke,
    "isTauri",
    ()=>isTauri,
    "requestPermissions",
    ()=>requestPermissions,
    "transformCallback",
    ()=>transformCallback
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/external/tslib/tslib.es6.js [app-ssr] (ecmascript)");
;
// Copyright 2019-2024 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT
var _Channel_onmessage, _Channel_nextMessageIndex, _Channel_pendingMessages, _Channel_messageEndIndex, _Resource_rid;
/**
 * Invoke your custom commands.
 *
 * This package is also accessible with `window.__TAURI__.core` when [`app.withGlobalTauri`](https://v2.tauri.app/reference/config/#withglobaltauri) in `tauri.conf.json` is set to `true`.
 * @module
 */ /**
 * A key to be used to implement a special function
 * on your types that define how your type should be serialized
 * when passing across the IPC.
 * @example
 * Given a type in Rust that looks like this
 * ```rs
 * #[derive(serde::Serialize, serde::Deserialize)
 * enum UserId {
 *   String(String),
 *   Number(u32),
 * }
 * ```
 * `UserId::String("id")` would be serialized into `{ String: "id" }`
 * and so we need to pass the same structure back to Rust
 * ```ts
 * import { SERIALIZE_TO_IPC_FN } from "@tauri-apps/api/core"
 *
 * class UserIdString {
 *   id
 *   constructor(id) {
 *     this.id = id
 *   }
 *
 *   [SERIALIZE_TO_IPC_FN]() {
 *     return { String: this.id }
 *   }
 * }
 *
 * class UserIdNumber {
 *   id
 *   constructor(id) {
 *     this.id = id
 *   }
 *
 *   [SERIALIZE_TO_IPC_FN]() {
 *     return { Number: this.id }
 *   }
 * }
 *
 * type UserId = UserIdString | UserIdNumber
 * ```
 *
 */ // if this value changes, make sure to update it in:
// 1. ipc.js
// 2. process-ipc-message-fn.js
const SERIALIZE_TO_IPC_FN = '__TAURI_TO_IPC_KEY__';
/**
 * Stores the callback in a known location, and returns an identifier that can be passed to the backend.
 * The backend uses the identifier to `eval()` the callback.
 *
 * @return An unique identifier associated with the callback function.
 *
 * @since 1.0.0
 */ function transformCallback(// TODO: Make this not optional in v3
callback, once = false) {
    return window.__TAURI_INTERNALS__.transformCallback(callback, once);
}
class Channel {
    constructor(onmessage){
        _Channel_onmessage.set(this, void 0);
        // the index is used as a mechanism to preserve message order
        _Channel_nextMessageIndex.set(this, 0);
        _Channel_pendingMessages.set(this, []);
        _Channel_messageEndIndex.set(this, void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _Channel_onmessage, onmessage || (()=>{}), "f");
        this.id = transformCallback((rawMessage)=>{
            const index = rawMessage.index;
            if ('end' in rawMessage) {
                if (index == (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Channel_nextMessageIndex, "f")) {
                    this.cleanupCallback();
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _Channel_messageEndIndex, index, "f");
                }
                return;
            }
            const message = rawMessage.message;
            // Process the message if we're at the right order
            if (index == (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Channel_nextMessageIndex, "f")) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Channel_onmessage, "f").call(this, message);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _Channel_nextMessageIndex, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Channel_nextMessageIndex, "f") + 1, "f");
                // process pending messages
                while((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Channel_nextMessageIndex, "f") in (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Channel_pendingMessages, "f")){
                    const message = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Channel_pendingMessages, "f")[(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Channel_nextMessageIndex, "f")];
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Channel_onmessage, "f").call(this, message);
                    // eslint-disable-next-line @typescript-eslint/no-array-delete
                    delete (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Channel_pendingMessages, "f")[(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Channel_nextMessageIndex, "f")];
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _Channel_nextMessageIndex, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Channel_nextMessageIndex, "f") + 1, "f");
                }
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Channel_nextMessageIndex, "f") === (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Channel_messageEndIndex, "f")) {
                    this.cleanupCallback();
                }
            } else {
                // eslint-disable-next-line security/detect-object-injection
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Channel_pendingMessages, "f")[index] = message;
            }
        });
    }
    cleanupCallback() {
        window.__TAURI_INTERNALS__.unregisterCallback(this.id);
    }
    set onmessage(handler) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _Channel_onmessage, handler, "f");
    }
    get onmessage() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Channel_onmessage, "f");
    }
    [(_Channel_onmessage = new WeakMap(), _Channel_nextMessageIndex = new WeakMap(), _Channel_pendingMessages = new WeakMap(), _Channel_messageEndIndex = new WeakMap(), SERIALIZE_TO_IPC_FN)]() {
        return `__CHANNEL__:${this.id}`;
    }
    toJSON() {
        // eslint-disable-next-line security/detect-object-injection
        return this[SERIALIZE_TO_IPC_FN]();
    }
}
class PluginListener {
    constructor(plugin, event, channelId){
        this.plugin = plugin;
        this.event = event;
        this.channelId = channelId;
    }
    async unregister() {
        return invoke(`plugin:${this.plugin}|remove_listener`, {
            event: this.event,
            channelId: this.channelId
        });
    }
}
/**
 * Adds a listener to a plugin event.
 *
 * @returns The listener object to stop listening to the events.
 *
 * @since 2.0.0
 */ async function addPluginListener(plugin, event, cb) {
    const handler = new Channel(cb);
    return invoke(`plugin:${plugin}|registerListener`, {
        event,
        handler
    }).then(()=>new PluginListener(plugin, event, handler.id));
}
/**
 * Get permission state for a plugin.
 *
 * This should be used by plugin authors to wrap their actual implementation.
 */ async function checkPermissions(plugin) {
    return invoke(`plugin:${plugin}|check_permissions`);
}
/**
 * Request permissions.
 *
 * This should be used by plugin authors to wrap their actual implementation.
 */ async function requestPermissions(plugin) {
    return invoke(`plugin:${plugin}|request_permissions`);
}
/**
 * Sends a message to the backend.
 * @example
 * ```typescript
 * import { invoke } from '@tauri-apps/api/core';
 * await invoke('login', { user: 'tauri', password: 'poiwe3h4r5ip3yrhtew9ty' });
 * ```
 *
 * @param cmd The command name.
 * @param args The optional arguments to pass to the command.
 * @param options The request options.
 * @return A promise resolving or rejecting to the backend response.
 *
 * @since 1.0.0
 */ async function invoke(cmd, args = {}, options) {
    return window.__TAURI_INTERNALS__.invoke(cmd, args, options);
}
/**
 * Convert a device file path to an URL that can be loaded by the webview.
 * Note that `asset:` and `http://asset.localhost` must be added to [`app.security.csp`](https://v2.tauri.app/reference/config/#csp-1) in `tauri.conf.json`.
 * Example CSP value: `"csp": "default-src 'self' ipc: http://ipc.localhost; img-src 'self' asset: http://asset.localhost"` to use the asset protocol on image sources.
 *
 * Additionally, `"enable" : "true"` must be added to [`app.security.assetProtocol`](https://v2.tauri.app/reference/config/#assetprotocolconfig)
 * in `tauri.conf.json` and its access scope must be defined on the `scope` array on the same `assetProtocol` object.
 *
 * @param  filePath The file path.
 * @param  protocol The protocol to use. Defaults to `asset`. You only need to set this when using a custom protocol.
 * @example
 * ```typescript
 * import { appDataDir, join } from '@tauri-apps/api/path';
 * import { convertFileSrc } from '@tauri-apps/api/core';
 * const appDataDirPath = await appDataDir();
 * const filePath = await join(appDataDirPath, 'assets/video.mp4');
 * const assetUrl = convertFileSrc(filePath);
 *
 * const video = document.getElementById('my-video');
 * const source = document.createElement('source');
 * source.type = 'video/mp4';
 * source.src = assetUrl;
 * video.appendChild(source);
 * video.load();
 * ```
 *
 * @return the URL that can be used as source on the webview.
 *
 * @since 1.0.0
 */ function convertFileSrc(filePath, protocol = 'asset') {
    return window.__TAURI_INTERNALS__.convertFileSrc(filePath, protocol);
}
/**
 * A rust-backed resource stored through `tauri::Manager::resources_table` API.
 *
 * The resource lives in the main process and does not exist
 * in the Javascript world, and thus will not be cleaned up automatiacally
 * except on application exit. If you want to clean it up early, call {@linkcode Resource.close}
 *
 * @example
 * ```typescript
 * import { Resource, invoke } from '@tauri-apps/api/core';
 * export class DatabaseHandle extends Resource {
 *   static async open(path: string): Promise<DatabaseHandle> {
 *     const rid: number = await invoke('open_db', { path });
 *     return new DatabaseHandle(rid);
 *   }
 *
 *   async execute(sql: string): Promise<void> {
 *     await invoke('execute_sql', { rid: this.rid, sql });
 *   }
 * }
 * ```
 */ class Resource {
    get rid() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Resource_rid, "f");
    }
    constructor(rid){
        _Resource_rid.set(this, void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _Resource_rid, rid, "f");
    }
    /**
     * Destroys and cleans up this resource from memory.
     * **You should not call any method on this object anymore and should drop any reference to it.**
     */ async close() {
        return invoke('plugin:resources|close', {
            rid: this.rid
        });
    }
}
_Resource_rid = new WeakMap();
function isTauri() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    return !!(globalThis || window).isTauri;
}
;
}),
"[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/event.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TauriEvent",
    ()=>TauriEvent,
    "emit",
    ()=>emit,
    "emitTo",
    ()=>emitTo,
    "listen",
    ()=>listen,
    "once",
    ()=>once
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/core.js [app-ssr] (ecmascript)");
;
// Copyright 2019-2024 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT
/**
 * The event system allows you to emit events to the backend and listen to events from it.
 *
 * This package is also accessible with `window.__TAURI__.event` when [`app.withGlobalTauri`](https://v2.tauri.app/reference/config/#withglobaltauri) in `tauri.conf.json` is set to `true`.
 * @module
 */ /**
 * @since 1.1.0
 */ var TauriEvent;
(function(TauriEvent) {
    TauriEvent["WINDOW_RESIZED"] = "tauri://resize";
    TauriEvent["WINDOW_MOVED"] = "tauri://move";
    TauriEvent["WINDOW_CLOSE_REQUESTED"] = "tauri://close-requested";
    TauriEvent["WINDOW_DESTROYED"] = "tauri://destroyed";
    TauriEvent["WINDOW_FOCUS"] = "tauri://focus";
    TauriEvent["WINDOW_BLUR"] = "tauri://blur";
    TauriEvent["WINDOW_SCALE_FACTOR_CHANGED"] = "tauri://scale-change";
    TauriEvent["WINDOW_THEME_CHANGED"] = "tauri://theme-changed";
    TauriEvent["WINDOW_CREATED"] = "tauri://window-created";
    TauriEvent["WEBVIEW_CREATED"] = "tauri://webview-created";
    TauriEvent["DRAG_ENTER"] = "tauri://drag-enter";
    TauriEvent["DRAG_OVER"] = "tauri://drag-over";
    TauriEvent["DRAG_DROP"] = "tauri://drag-drop";
    TauriEvent["DRAG_LEAVE"] = "tauri://drag-leave";
})(TauriEvent || (TauriEvent = {}));
/**
 * Unregister the event listener associated with the given name and id.
 *
 * @ignore
 * @param event The event name
 * @param eventId Event identifier
 * @returns
 */ async function _unlisten(event, eventId) {
    window.__TAURI_EVENT_PLUGIN_INTERNALS__.unregisterListener(event, eventId);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:event|unlisten', {
        event,
        eventId
    });
}
/**
 * Listen to an emitted event to any {@link EventTarget|target}.
 *
 * @example
 * ```typescript
 * import { listen } from '@tauri-apps/api/event';
 * const unlisten = await listen<string>('error', (event) => {
 *   console.log(`Got error, payload: ${event.payload}`);
 * });
 *
 * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
 * unlisten();
 * ```
 *
 * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
 * @param handler Event handler callback.
 * @param options Event listening options.
 * @returns A promise resolving to a function to unlisten to the event.
 * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
 *
 * @since 1.0.0
 */ async function listen(event, handler, options) {
    var _a;
    const target = typeof (options === null || options === void 0 ? void 0 : options.target) === 'string' ? {
        kind: 'AnyLabel',
        label: options.target
    } : (_a = options === null || options === void 0 ? void 0 : options.target) !== null && _a !== void 0 ? _a : {
        kind: 'Any'
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:event|listen', {
        event,
        target,
        handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformCallback"])(handler)
    }).then((eventId)=>{
        return async ()=>_unlisten(event, eventId);
    });
}
/**
 * Listens once to an emitted event to any {@link EventTarget|target}.
 *
 * @example
 * ```typescript
 * import { once } from '@tauri-apps/api/event';
 * interface LoadedPayload {
 *   loggedIn: boolean,
 *   token: string
 * }
 * const unlisten = await once<LoadedPayload>('loaded', (event) => {
 *   console.log(`App is loaded, loggedIn: ${event.payload.loggedIn}, token: ${event.payload.token}`);
 * });
 *
 * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
 * unlisten();
 * ```
 *
 * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
 * @param handler Event handler callback.
 * @param options Event listening options.
 * @returns A promise resolving to a function to unlisten to the event.
 * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
 *
 * @since 1.0.0
 */ async function once(event, handler, options) {
    return listen(event, (eventData)=>{
        void _unlisten(event, eventData.id);
        handler(eventData);
    }, options);
}
/**
 * Emits an event to all {@link EventTarget|targets}.
 *
 * @example
 * ```typescript
 * import { emit } from '@tauri-apps/api/event';
 * await emit('frontend-loaded', { loggedIn: true, token: 'authToken' });
 * ```
 *
 * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
 * @param payload Event payload.
 *
 * @since 1.0.0
 */ async function emit(event, payload) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:event|emit', {
        event,
        payload
    });
}
/**
 * Emits an event to all {@link EventTarget|targets} matching the given target.
 *
 * @example
 * ```typescript
 * import { emitTo } from '@tauri-apps/api/event';
 * await emitTo('main', 'frontend-loaded', { loggedIn: true, token: 'authToken' });
 * ```
 *
 * @param target Label of the target Window/Webview/WebviewWindow or raw {@link EventTarget} object.
 * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
 * @param payload Event payload.
 *
 * @since 2.0.0
 */ async function emitTo(target, event, payload) {
    const eventTarget = typeof target === 'string' ? {
        kind: 'AnyLabel',
        label: target
    } : target;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:event|emit_to', {
        target: eventTarget,
        event,
        payload
    });
}
;
}),
"[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/image.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Image",
    ()=>Image,
    "transformImage",
    ()=>transformImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/core.js [app-ssr] (ecmascript)");
;
// Copyright 2019-2024 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT
/** An RGBA Image in row-major order from top to bottom. */ class Image extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Resource"] {
    /**
     * Creates an Image from a resource ID. For internal use only.
     *
     * @ignore
     */ constructor(rid){
        super(rid);
    }
    /** Creates a new Image using RGBA data, in row-major order from top to bottom, and with specified width and height. */ static async new(rgba, width, height) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:image|new', {
            rgba: transformImage(rgba),
            width,
            height
        }).then((rid)=>new Image(rid));
    }
    /**
     * Creates a new image using the provided bytes by inferring the file format.
     * If the format is known, prefer [@link Image.fromPngBytes] or [@link Image.fromIcoBytes].
     *
     * Only `ico` and `png` are supported (based on activated feature flag).
     *
     * Note that you need the `image-ico` or `image-png` Cargo features to use this API.
     * To enable it, change your Cargo.toml file:
     * ```toml
     * [dependencies]
     * tauri = { version = "...", features = ["...", "image-png"] }
     * ```
     */ static async fromBytes(bytes) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:image|from_bytes', {
            bytes: transformImage(bytes)
        }).then((rid)=>new Image(rid));
    }
    /**
     * Creates a new image using the provided path.
     *
     * Only `ico` and `png` are supported (based on activated feature flag).
     *
     * Note that you need the `image-ico` or `image-png` Cargo features to use this API.
     * To enable it, change your Cargo.toml file:
     * ```toml
     * [dependencies]
     * tauri = { version = "...", features = ["...", "image-png"] }
     * ```
     */ static async fromPath(path) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:image|from_path', {
            path
        }).then((rid)=>new Image(rid));
    }
    /** Returns the RGBA data for this image, in row-major order from top to bottom.  */ async rgba() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:image|rgba', {
            rid: this.rid
        }).then((buffer)=>new Uint8Array(buffer));
    }
    /** Returns the size of this image.  */ async size() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:image|size', {
            rid: this.rid
        });
    }
}
/**
 * Transforms image from various types into a type acceptable by Rust.
 *
 * See [tauri::image::JsImage](https://docs.rs/tauri/2/tauri/image/enum.JsImage.html) for more information.
 * Note the API signature is not stable and might change.
 */ function transformImage(image) {
    const ret = image == null ? null : typeof image === 'string' ? image : image instanceof Image ? image.rid : image;
    return ret;
}
;
}),
"[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/base.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MenuItemBase",
    ()=>MenuItemBase,
    "newMenu",
    ()=>newMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/external/tslib/tslib.es6.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/image.js [app-ssr] (ecmascript)");
;
;
;
// Copyright 2019-2024 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT
var _MenuItemBase_id, _MenuItemBase_kind;
function injectChannel(i) {
    var _a;
    if ('items' in i) {
        i.items = (_a = i.items) === null || _a === void 0 ? void 0 : _a.map((item)=>'rid' in item ? item : injectChannel(item));
    } else if ('action' in i && i.action) {
        const handler = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Channel"]();
        handler.onmessage = i.action;
        delete i.action;
        return {
            ...i,
            handler
        };
    }
    return i;
}
async function newMenu(kind, opts) {
    const handler = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Channel"]();
    if (opts && typeof opts === 'object') {
        if ('action' in opts && opts.action) {
            handler.onmessage = opts.action;
            delete opts.action;
        }
        // about predefined menu item icon
        if ('item' in opts && opts.item && typeof opts.item === 'object' && 'About' in opts.item && opts.item.About && typeof opts.item.About === 'object' && 'icon' in opts.item.About && opts.item.About.icon) {
            opts.item.About.icon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformImage"])(opts.item.About.icon);
        }
        // icon menu item icon
        if ('icon' in opts && opts.icon) {
            opts.icon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformImage"])(opts.icon);
        }
        // submenu items
        if ('items' in opts && opts.items) {
            function prepareItem(i) {
                var _a;
                if ('rid' in i) {
                    return [
                        i.rid,
                        i.kind
                    ];
                }
                if ('item' in i && typeof i.item === 'object' && ((_a = i.item.About) === null || _a === void 0 ? void 0 : _a.icon)) {
                    i.item.About.icon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformImage"])(i.item.About.icon);
                }
                if ('icon' in i && i.icon) {
                    i.icon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformImage"])(i.icon);
                }
                if ('items' in i && i.items) {
                    // @ts-expect-error the `prepareItem` return doesn't exactly match
                    // this is fine, because the difference is in `[number, string]` variant
                    i.items = i.items.map(prepareItem);
                }
                return injectChannel(i);
            }
            // @ts-expect-error the `prepareItem` return doesn't exactly match
            // this is fine, because the difference is in `[number, string]` variant
            opts.items = opts.items.map(prepareItem);
        }
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|new', {
        kind,
        options: opts,
        handler
    });
}
class MenuItemBase extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Resource"] {
    /** The id of this item. */ get id() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _MenuItemBase_id, "f");
    }
    /** @ignore */ get kind() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _MenuItemBase_kind, "f");
    }
    /** @ignore */ constructor(rid, id, kind){
        super(rid);
        /** @ignore */ _MenuItemBase_id.set(this, void 0);
        /** @ignore */ _MenuItemBase_kind.set(this, void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _MenuItemBase_id, id, "f");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$external$2f$tslib$2f$tslib$2e$es6$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _MenuItemBase_kind, kind, "f");
    }
}
_MenuItemBase_id = new WeakMap(), _MenuItemBase_kind = new WeakMap();
;
}),
"[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/menuItem.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MenuItem",
    ()=>MenuItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/base.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/core.js [app-ssr] (ecmascript)");
;
;
// Copyright 2019-2024 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT
/** A menu item inside a {@linkcode Menu} or {@linkcode Submenu} and contains only text. */ class MenuItem extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItemBase"] {
    /** @ignore */ constructor(rid, id){
        super(rid, id, 'MenuItem');
    }
    /** Create a new menu item. */ static async new(opts) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["newMenu"])('MenuItem', opts).then(([rid, id])=>new MenuItem(rid, id));
    }
    /** Returns the text of this menu item. */ async text() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|text', {
            rid: this.rid,
            kind: this.kind
        });
    }
    /** Sets the text for this menu item. */ async setText(text) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|set_text', {
            rid: this.rid,
            kind: this.kind,
            text
        });
    }
    /** Returns whether this menu item is enabled or not. */ async isEnabled() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|is_enabled', {
            rid: this.rid,
            kind: this.kind
        });
    }
    /** Sets whether this menu item is enabled or not. */ async setEnabled(enabled) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|set_enabled', {
            rid: this.rid,
            kind: this.kind,
            enabled
        });
    }
    /** Sets the accelerator for this menu item. */ async setAccelerator(accelerator) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|set_accelerator', {
            rid: this.rid,
            kind: this.kind,
            accelerator
        });
    }
}
;
}),
"[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/checkMenuItem.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckMenuItem",
    ()=>CheckMenuItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/base.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/core.js [app-ssr] (ecmascript)");
;
;
// Copyright 2019-2024 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT
/**
 * A check menu item inside a {@linkcode Menu} or {@linkcode Submenu}
 * and usually contains a text and a check mark or a similar toggle
 * that corresponds to a checked and unchecked states.
 */ class CheckMenuItem extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItemBase"] {
    /** @ignore */ constructor(rid, id){
        super(rid, id, 'Check');
    }
    /** Create a new check menu item. */ static async new(opts) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["newMenu"])('Check', opts).then(([rid, id])=>new CheckMenuItem(rid, id));
    }
    /** Returns the text of this check menu item. */ async text() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|text', {
            rid: this.rid,
            kind: this.kind
        });
    }
    /** Sets the text for this check menu item. */ async setText(text) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|set_text', {
            rid: this.rid,
            kind: this.kind,
            text
        });
    }
    /** Returns whether this check menu item is enabled or not. */ async isEnabled() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|is_enabled', {
            rid: this.rid,
            kind: this.kind
        });
    }
    /** Sets whether this check menu item is enabled or not. */ async setEnabled(enabled) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|set_enabled', {
            rid: this.rid,
            kind: this.kind,
            enabled
        });
    }
    /** Sets the accelerator for this check menu item. */ async setAccelerator(accelerator) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|set_accelerator', {
            rid: this.rid,
            kind: this.kind,
            accelerator
        });
    }
    /** Returns whether this check menu item is checked or not. */ async isChecked() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|is_checked', {
            rid: this.rid
        });
    }
    /** Sets whether this check menu item is checked or not. */ async setChecked(checked) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|set_checked', {
            rid: this.rid,
            checked
        });
    }
}
;
}),
"[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/iconMenuItem.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IconMenuItem",
    ()=>IconMenuItem,
    "NativeIcon",
    ()=>NativeIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/base.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/image.js [app-ssr] (ecmascript)");
;
;
;
// Copyright 2019-2024 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT
/**
 * A native Icon to be used for the menu item
 *
 * #### Platform-specific:
 *
 * - **Windows / Linux**: Unsupported.
 */ var NativeIcon;
(function(NativeIcon) {
    /** An add item template image. */ NativeIcon["Add"] = "Add";
    /** Advanced preferences toolbar icon for the preferences window. */ NativeIcon["Advanced"] = "Advanced";
    /** A Bluetooth template image. */ NativeIcon["Bluetooth"] = "Bluetooth";
    /** Bookmarks image suitable for a template. */ NativeIcon["Bookmarks"] = "Bookmarks";
    /** A caution image. */ NativeIcon["Caution"] = "Caution";
    /** A color panel toolbar icon. */ NativeIcon["ColorPanel"] = "ColorPanel";
    /** A column view mode template image. */ NativeIcon["ColumnView"] = "ColumnView";
    /** A computer icon. */ NativeIcon["Computer"] = "Computer";
    /** An enter full-screen mode template image. */ NativeIcon["EnterFullScreen"] = "EnterFullScreen";
    /** Permissions for all users. */ NativeIcon["Everyone"] = "Everyone";
    /** An exit full-screen mode template image. */ NativeIcon["ExitFullScreen"] = "ExitFullScreen";
    /** A cover flow view mode template image. */ NativeIcon["FlowView"] = "FlowView";
    /** A folder image. */ NativeIcon["Folder"] = "Folder";
    /** A burnable folder icon. */ NativeIcon["FolderBurnable"] = "FolderBurnable";
    /** A smart folder icon. */ NativeIcon["FolderSmart"] = "FolderSmart";
    /** A link template image. */ NativeIcon["FollowLinkFreestanding"] = "FollowLinkFreestanding";
    /** A font panel toolbar icon. */ NativeIcon["FontPanel"] = "FontPanel";
    /** A `go back` template image. */ NativeIcon["GoLeft"] = "GoLeft";
    /** A `go forward` template image. */ NativeIcon["GoRight"] = "GoRight";
    /** Home image suitable for a template. */ NativeIcon["Home"] = "Home";
    /** An iChat Theater template image. */ NativeIcon["IChatTheater"] = "IChatTheater";
    /** An icon view mode template image. */ NativeIcon["IconView"] = "IconView";
    /** An information toolbar icon. */ NativeIcon["Info"] = "Info";
    /** A template image used to denote invalid data. */ NativeIcon["InvalidDataFreestanding"] = "InvalidDataFreestanding";
    /** A generic left-facing triangle template image. */ NativeIcon["LeftFacingTriangle"] = "LeftFacingTriangle";
    /** A list view mode template image. */ NativeIcon["ListView"] = "ListView";
    /** A locked padlock template image. */ NativeIcon["LockLocked"] = "LockLocked";
    /** An unlocked padlock template image. */ NativeIcon["LockUnlocked"] = "LockUnlocked";
    /** A horizontal dash, for use in menus. */ NativeIcon["MenuMixedState"] = "MenuMixedState";
    /** A check mark template image, for use in menus. */ NativeIcon["MenuOnState"] = "MenuOnState";
    /** A MobileMe icon. */ NativeIcon["MobileMe"] = "MobileMe";
    /** A drag image for multiple items. */ NativeIcon["MultipleDocuments"] = "MultipleDocuments";
    /** A network icon. */ NativeIcon["Network"] = "Network";
    /** A path button template image. */ NativeIcon["Path"] = "Path";
    /** General preferences toolbar icon for the preferences window. */ NativeIcon["PreferencesGeneral"] = "PreferencesGeneral";
    /** A Quick Look template image. */ NativeIcon["QuickLook"] = "QuickLook";
    /** A refresh template image. */ NativeIcon["RefreshFreestanding"] = "RefreshFreestanding";
    /** A refresh template image. */ NativeIcon["Refresh"] = "Refresh";
    /** A remove item template image. */ NativeIcon["Remove"] = "Remove";
    /** A reveal contents template image. */ NativeIcon["RevealFreestanding"] = "RevealFreestanding";
    /** A generic right-facing triangle template image. */ NativeIcon["RightFacingTriangle"] = "RightFacingTriangle";
    /** A share view template image. */ NativeIcon["Share"] = "Share";
    /** A slideshow template image. */ NativeIcon["Slideshow"] = "Slideshow";
    /** A badge for a `smart` item. */ NativeIcon["SmartBadge"] = "SmartBadge";
    /** Small green indicator, similar to iChat's available image. */ NativeIcon["StatusAvailable"] = "StatusAvailable";
    /** Small clear indicator. */ NativeIcon["StatusNone"] = "StatusNone";
    /** Small yellow indicator, similar to iChat's idle image. */ NativeIcon["StatusPartiallyAvailable"] = "StatusPartiallyAvailable";
    /** Small red indicator, similar to iChat's unavailable image. */ NativeIcon["StatusUnavailable"] = "StatusUnavailable";
    /** A stop progress template image. */ NativeIcon["StopProgressFreestanding"] = "StopProgressFreestanding";
    /** A stop progress button template image. */ NativeIcon["StopProgress"] = "StopProgress";
    /** An image of the empty trash can. */ NativeIcon["TrashEmpty"] = "TrashEmpty";
    /** An image of the full trash can. */ NativeIcon["TrashFull"] = "TrashFull";
    /** Permissions for a single user. */ NativeIcon["User"] = "User";
    /** User account toolbar icon for the preferences window. */ NativeIcon["UserAccounts"] = "UserAccounts";
    /** Permissions for a group of users. */ NativeIcon["UserGroup"] = "UserGroup";
    /** Permissions for guests. */ NativeIcon["UserGuest"] = "UserGuest";
})(NativeIcon || (NativeIcon = {}));
/**
 * An icon menu item inside a {@linkcode Menu} or {@linkcode Submenu}
 * and usually contains an icon and a text.
 */ class IconMenuItem extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItemBase"] {
    /** @ignore */ constructor(rid, id){
        super(rid, id, 'Icon');
    }
    /** Create a new icon menu item. */ static async new(opts) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["newMenu"])('Icon', opts).then(([rid, id])=>new IconMenuItem(rid, id));
    }
    /** Returns the text of this icon menu item. */ async text() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|text', {
            rid: this.rid,
            kind: this.kind
        });
    }
    /** Sets the text for this icon menu item. */ async setText(text) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|set_text', {
            rid: this.rid,
            kind: this.kind,
            text
        });
    }
    /** Returns whether this icon menu item is enabled or not. */ async isEnabled() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|is_enabled', {
            rid: this.rid,
            kind: this.kind
        });
    }
    /** Sets whether this icon menu item is enabled or not. */ async setEnabled(enabled) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|set_enabled', {
            rid: this.rid,
            kind: this.kind,
            enabled
        });
    }
    /** Sets the accelerator for this icon menu item. */ async setAccelerator(accelerator) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|set_accelerator', {
            rid: this.rid,
            kind: this.kind,
            accelerator
        });
    }
    /** Sets an icon for this icon menu item */ async setIcon(icon) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|set_icon', {
            rid: this.rid,
            kind: this.kind,
            icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformImage"])(icon)
        });
    }
}
;
}),
"[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/predefinedMenuItem.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PredefinedMenuItem",
    ()=>PredefinedMenuItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/base.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/core.js [app-ssr] (ecmascript)");
;
;
// Copyright 2019-2024 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT
/** A predefined (native) menu item which has a predefined behavior by the OS or by tauri.  */ class PredefinedMenuItem extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItemBase"] {
    /** @ignore */ constructor(rid, id){
        super(rid, id, 'Predefined');
    }
    /** Create a new predefined menu item. */ static async new(opts) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["newMenu"])('Predefined', opts).then(([rid, id])=>new PredefinedMenuItem(rid, id));
    }
    /** Returns the text of this predefined menu item. */ async text() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|text', {
            rid: this.rid,
            kind: this.kind
        });
    }
    /** Sets the text for this predefined menu item. */ async setText(text) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|set_text', {
            rid: this.rid,
            kind: this.kind,
            text
        });
    }
}
;
}),
"[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/dpi.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LogicalPosition",
    ()=>LogicalPosition,
    "LogicalSize",
    ()=>LogicalSize,
    "PhysicalPosition",
    ()=>PhysicalPosition,
    "PhysicalSize",
    ()=>PhysicalSize,
    "Position",
    ()=>Position,
    "Size",
    ()=>Size
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/core.js [app-ssr] (ecmascript)");
;
// Copyright 2019-2024 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT
/**
 * A size represented in logical pixels.
 * Logical pixels are scaled according to the window's DPI scale.
 * Most browser APIs (i.e. `MouseEvent`'s `clientX`) will return logical pixels.
 *
 * For logical-pixel-based position, see {@linkcode LogicalPosition}.
 *
 * @since 2.0.0
 */ class LogicalSize {
    constructor(...args){
        this.type = 'Logical';
        if (args.length === 1) {
            if ('Logical' in args[0]) {
                this.width = args[0].Logical.width;
                this.height = args[0].Logical.height;
            } else {
                this.width = args[0].width;
                this.height = args[0].height;
            }
        } else {
            this.width = args[0];
            this.height = args[1];
        }
    }
    /**
     * Converts the logical size to a physical one.
     * @example
     * ```typescript
     * import { LogicalSize } from '@tauri-apps/api/dpi';
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     *
     * const appWindow = getCurrentWindow();
     * const factor = await appWindow.scaleFactor();
     * const size = new LogicalSize(400, 500);
     * const physical = size.toPhysical(factor);
     * ```
     *
     * @since 2.0.0
     */ toPhysical(scaleFactor) {
        return new PhysicalSize(this.width * scaleFactor, this.height * scaleFactor);
    }
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERIALIZE_TO_IPC_FN"]]() {
        return {
            width: this.width,
            height: this.height
        };
    }
    toJSON() {
        // eslint-disable-next-line security/detect-object-injection
        return this[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERIALIZE_TO_IPC_FN"]]();
    }
}
/**
 * A size represented in physical pixels.
 *
 * Physical pixels represent actual screen pixels, and are DPI-independent.
 * For high-DPI windows, this means that any point in the window on the screen
 * will have a different position in logical pixels (@linkcode LogicalSize).
 *
 * For physical-pixel-based position, see {@linkcode PhysicalPosition}.
 *
 * @since 2.0.0
 */ class PhysicalSize {
    constructor(...args){
        this.type = 'Physical';
        if (args.length === 1) {
            if ('Physical' in args[0]) {
                this.width = args[0].Physical.width;
                this.height = args[0].Physical.height;
            } else {
                this.width = args[0].width;
                this.height = args[0].height;
            }
        } else {
            this.width = args[0];
            this.height = args[1];
        }
    }
    /**
     * Converts the physical size to a logical one.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const appWindow = getCurrentWindow();
     * const factor = await appWindow.scaleFactor();
     * const size = await appWindow.innerSize(); // PhysicalSize
     * const logical = size.toLogical(factor);
     * ```
     */ toLogical(scaleFactor) {
        return new LogicalSize(this.width / scaleFactor, this.height / scaleFactor);
    }
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERIALIZE_TO_IPC_FN"]]() {
        return {
            width: this.width,
            height: this.height
        };
    }
    toJSON() {
        // eslint-disable-next-line security/detect-object-injection
        return this[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERIALIZE_TO_IPC_FN"]]();
    }
}
/**
 * A size represented either in physical or in logical pixels.
 *
 * This type is basically a union type of {@linkcode LogicalSize} and {@linkcode PhysicalSize}
 * but comes in handy when using `tauri::Size` in Rust as an argument to a command, as this class
 * automatically serializes into a valid format so it can be deserialized correctly into `tauri::Size`
 *
 * So instead of
 * ```typescript
 * import { invoke } from '@tauri-apps/api/core';
 * import { LogicalSize, PhysicalSize } from '@tauri-apps/api/dpi';
 *
 * const size: LogicalSize | PhysicalSize = someFunction(); // where someFunction returns either LogicalSize or PhysicalSize
 * const validSize = size instanceof LogicalSize
 *   ? { Logical: { width: size.width, height: size.height } }
 *   : { Physical: { width: size.width, height: size.height } }
 * await invoke("do_something_with_size", { size: validSize });
 * ```
 *
 * You can just use {@linkcode Size}
 * ```typescript
 * import { invoke } from '@tauri-apps/api/core';
 * import { LogicalSize, PhysicalSize, Size } from '@tauri-apps/api/dpi';
 *
 * const size: LogicalSize | PhysicalSize = someFunction(); // where someFunction returns either LogicalSize or PhysicalSize
 * const validSize = new Size(size);
 * await invoke("do_something_with_size", { size: validSize });
 * ```
 *
 * @since 2.1.0
 */ class Size {
    constructor(size){
        this.size = size;
    }
    toLogical(scaleFactor) {
        return this.size instanceof LogicalSize ? this.size : this.size.toLogical(scaleFactor);
    }
    toPhysical(scaleFactor) {
        return this.size instanceof PhysicalSize ? this.size : this.size.toPhysical(scaleFactor);
    }
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERIALIZE_TO_IPC_FN"]]() {
        return {
            [`${this.size.type}`]: {
                width: this.size.width,
                height: this.size.height
            }
        };
    }
    toJSON() {
        // eslint-disable-next-line security/detect-object-injection
        return this[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERIALIZE_TO_IPC_FN"]]();
    }
}
/**
 * A position represented in logical pixels.
 * For an explanation of what logical pixels are, see description of {@linkcode LogicalSize}.
 *
 * @since 2.0.0
 */ class LogicalPosition {
    constructor(...args){
        this.type = 'Logical';
        if (args.length === 1) {
            if ('Logical' in args[0]) {
                this.x = args[0].Logical.x;
                this.y = args[0].Logical.y;
            } else {
                this.x = args[0].x;
                this.y = args[0].y;
            }
        } else {
            this.x = args[0];
            this.y = args[1];
        }
    }
    /**
     * Converts the logical position to a physical one.
     * @example
     * ```typescript
     * import { LogicalPosition } from '@tauri-apps/api/dpi';
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     *
     * const appWindow = getCurrentWindow();
     * const factor = await appWindow.scaleFactor();
     * const position = new LogicalPosition(400, 500);
     * const physical = position.toPhysical(factor);
     * ```
     *
     * @since 2.0.0
     */ toPhysical(scaleFactor) {
        return new PhysicalPosition(this.x * scaleFactor, this.y * scaleFactor);
    }
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERIALIZE_TO_IPC_FN"]]() {
        return {
            x: this.x,
            y: this.y
        };
    }
    toJSON() {
        // eslint-disable-next-line security/detect-object-injection
        return this[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERIALIZE_TO_IPC_FN"]]();
    }
}
/**
 * A position represented in physical pixels.
 *
 * For an explanation of what physical pixels are, see description of {@linkcode PhysicalSize}.
 *
 * @since 2.0.0
 */ class PhysicalPosition {
    constructor(...args){
        this.type = 'Physical';
        if (args.length === 1) {
            if ('Physical' in args[0]) {
                this.x = args[0].Physical.x;
                this.y = args[0].Physical.y;
            } else {
                this.x = args[0].x;
                this.y = args[0].y;
            }
        } else {
            this.x = args[0];
            this.y = args[1];
        }
    }
    /**
     * Converts the physical position to a logical one.
     * @example
     * ```typescript
     * import { PhysicalPosition } from '@tauri-apps/api/dpi';
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     *
     * const appWindow = getCurrentWindow();
     * const factor = await appWindow.scaleFactor();
     * const position = new PhysicalPosition(400, 500);
     * const physical = position.toLogical(factor);
     * ```
     *
     * @since 2.0.0
     */ toLogical(scaleFactor) {
        return new LogicalPosition(this.x / scaleFactor, this.y / scaleFactor);
    }
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERIALIZE_TO_IPC_FN"]]() {
        return {
            x: this.x,
            y: this.y
        };
    }
    toJSON() {
        // eslint-disable-next-line security/detect-object-injection
        return this[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERIALIZE_TO_IPC_FN"]]();
    }
}
/**
 * A position represented either in physical or in logical pixels.
 *
 * This type is basically a union type of {@linkcode LogicalSize} and {@linkcode PhysicalSize}
 * but comes in handy when using `tauri::Position` in Rust as an argument to a command, as this class
 * automatically serializes into a valid format so it can be deserialized correctly into `tauri::Position`
 *
 * So instead of
 * ```typescript
 * import { invoke } from '@tauri-apps/api/core';
 * import { LogicalPosition, PhysicalPosition } from '@tauri-apps/api/dpi';
 *
 * const position: LogicalPosition | PhysicalPosition = someFunction(); // where someFunction returns either LogicalPosition or PhysicalPosition
 * const validPosition = position instanceof LogicalPosition
 *   ? { Logical: { x: position.x, y: position.y } }
 *   : { Physical: { x: position.x, y: position.y } }
 * await invoke("do_something_with_position", { position: validPosition });
 * ```
 *
 * You can just use {@linkcode Position}
 * ```typescript
 * import { invoke } from '@tauri-apps/api/core';
 * import { LogicalPosition, PhysicalPosition, Position } from '@tauri-apps/api/dpi';
 *
 * const position: LogicalPosition | PhysicalPosition = someFunction(); // where someFunction returns either LogicalPosition or PhysicalPosition
 * const validPosition = new Position(position);
 * await invoke("do_something_with_position", { position: validPosition });
 * ```
 *
 * @since 2.1.0
 */ class Position {
    constructor(position){
        this.position = position;
    }
    toLogical(scaleFactor) {
        return this.position instanceof LogicalPosition ? this.position : this.position.toLogical(scaleFactor);
    }
    toPhysical(scaleFactor) {
        return this.position instanceof PhysicalPosition ? this.position : this.position.toPhysical(scaleFactor);
    }
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERIALIZE_TO_IPC_FN"]]() {
        return {
            [`${this.position.type}`]: {
                x: this.position.x,
                y: this.position.y
            }
        };
    }
    toJSON() {
        // eslint-disable-next-line security/detect-object-injection
        return this[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERIALIZE_TO_IPC_FN"]]();
    }
}
;
}),
"[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/submenu.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Submenu",
    ()=>Submenu,
    "itemFromKind",
    ()=>itemFromKind
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/menuItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$checkMenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/checkMenuItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$iconMenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/iconMenuItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$predefinedMenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/predefinedMenuItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/base.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/dpi.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/image.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
// Copyright 2019-2024 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT
/** @ignore */ function itemFromKind([rid, id, kind]) {
    /* eslint-disable @typescript-eslint/no-unsafe-return */ switch(kind){
        case 'Submenu':
            // @ts-expect-error constructor is protected for external usage only, safe for us to use
            return new Submenu(rid, id);
        case 'Predefined':
            // @ts-expect-error constructor is protected for external usage only, safe for us to use
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$predefinedMenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PredefinedMenuItem"](rid, id);
        case 'Check':
            // @ts-expect-error constructor is protected for external usage only, safe for us to use
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$checkMenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CheckMenuItem"](rid, id);
        case 'Icon':
            // @ts-expect-error constructor is protected for external usage only, safe for us to use
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$iconMenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IconMenuItem"](rid, id);
        case 'MenuItem':
        default:
            // @ts-expect-error constructor is protected for external usage only, safe for us to use
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItem"](rid, id);
    }
/* eslint-enable @typescript-eslint/no-unsafe-return */ }
/** A type that is a submenu inside a {@linkcode Menu} or {@linkcode Submenu}. */ class Submenu extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItemBase"] {
    /** @ignore */ constructor(rid, id){
        super(rid, id, 'Submenu');
    }
    /** Create a new submenu. */ static async new(opts) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["newMenu"])('Submenu', opts).then(([rid, id])=>new Submenu(rid, id));
    }
    /** Returns the text of this submenu. */ async text() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|text', {
            rid: this.rid,
            kind: this.kind
        });
    }
    /** Sets the text for this submenu. */ async setText(text) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|set_text', {
            rid: this.rid,
            kind: this.kind,
            text
        });
    }
    /** Returns whether this submenu is enabled or not. */ async isEnabled() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|is_enabled', {
            rid: this.rid,
            kind: this.kind
        });
    }
    /** Sets whether this submenu is enabled or not. */ async setEnabled(enabled) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|set_enabled', {
            rid: this.rid,
            kind: this.kind,
            enabled
        });
    }
    /**
     * Add a menu item to the end of this submenu.
     *
     * #### Platform-specific:
     *
     * - **macOS:** Only {@linkcode Submenu}s can be added to a {@linkcode Menu}.
     */ async append(items) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|append', {
            rid: this.rid,
            kind: this.kind,
            items: (Array.isArray(items) ? items : [
                items
            ]).map((i)=>'rid' in i ? [
                    i.rid,
                    i.kind
                ] : i)
        });
    }
    /**
     * Add a menu item to the beginning of this submenu.
     *
     * #### Platform-specific:
     *
     * - **macOS:** Only {@linkcode Submenu}s can be added to a {@linkcode Menu}.
     */ async prepend(items) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|prepend', {
            rid: this.rid,
            kind: this.kind,
            items: (Array.isArray(items) ? items : [
                items
            ]).map((i)=>'rid' in i ? [
                    i.rid,
                    i.kind
                ] : i)
        });
    }
    /**
     * Add a menu item to the specified position in this submenu.
     *
     * #### Platform-specific:
     *
     * - **macOS:** Only {@linkcode Submenu}s can be added to a {@linkcode Menu}.
     */ async insert(items, position) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|insert', {
            rid: this.rid,
            kind: this.kind,
            items: (Array.isArray(items) ? items : [
                items
            ]).map((i)=>'rid' in i ? [
                    i.rid,
                    i.kind
                ] : i),
            position
        });
    }
    /** Remove a menu item from this submenu. */ async remove(item) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|remove', {
            rid: this.rid,
            kind: this.kind,
            item: [
                item.rid,
                item.kind
            ]
        });
    }
    /** Remove a menu item from this submenu at the specified position. */ async removeAt(position) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|remove_at', {
            rid: this.rid,
            kind: this.kind,
            position
        }).then(itemFromKind);
    }
    /** Returns a list of menu items that has been added to this submenu. */ async items() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|items', {
            rid: this.rid,
            kind: this.kind
        }).then((i)=>i.map(itemFromKind));
    }
    /** Retrieves the menu item matching the given identifier. */ async get(id) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|get', {
            rid: this.rid,
            kind: this.kind,
            id
        }).then((r)=>r ? itemFromKind(r) : null);
    }
    /**
     * Popup this submenu as a context menu on the specified window.
     *
     * If the position, is provided, it is relative to the window's top-left corner.
     */ async popup(at, window) {
        var _a;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|popup', {
            rid: this.rid,
            kind: this.kind,
            window: (_a = window === null || window === void 0 ? void 0 : window.label) !== null && _a !== void 0 ? _a : null,
            at: at instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Position"] ? at : at ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Position"](at) : null
        });
    }
    /**
     * Set this submenu as the Window menu for the application on macOS.
     *
     * This will cause macOS to automatically add window-switching items and
     * certain other items to the menu.
     *
     * #### Platform-specific:
     *
     * - **Windows / Linux**: Unsupported.
     */ async setAsWindowsMenuForNSApp() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|set_as_windows_menu_for_nsapp', {
            rid: this.rid
        });
    }
    /**
     * Set this submenu as the Help menu for the application on macOS.
     *
     * This will cause macOS to automatically add a search box to the menu.
     *
     * If no menu is set as the Help menu, macOS will automatically use any menu
     * which has a title matching the localized word "Help".
     *
     * #### Platform-specific:
     *
     * - **Windows / Linux**: Unsupported.
     */ async setAsHelpMenuForNSApp() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|set_as_help_menu_for_nsapp', {
            rid: this.rid
        });
    }
    /** Sets an icon for this submenu */ async setIcon(icon) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|set_icon', {
            rid: this.rid,
            kind: this.kind,
            icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformImage"])(icon)
        });
    }
}
;
}),
"[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/menu.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Menu",
    ()=>Menu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$submenu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/submenu.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/dpi.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/base.js [app-ssr] (ecmascript)");
;
;
;
;
// Copyright 2019-2024 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT
/** A type that is either a menu bar on the window
 * on Windows and Linux or as a global menu in the menubar on macOS.
 *
 * #### Platform-specific:
 *
 * - **macOS**: if using {@linkcode Menu} for the global menubar, it can only contain {@linkcode Submenu}s.
 */ class Menu extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItemBase"] {
    /** @ignore */ constructor(rid, id){
        super(rid, id, 'Menu');
    }
    /** Create a new menu. */ static async new(opts) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$base$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["newMenu"])('Menu', opts).then(([rid, id])=>new Menu(rid, id));
    }
    /** Create a default menu. */ static async default() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|create_default').then(([rid, id])=>new Menu(rid, id));
    }
    /**
     * Add a menu item to the end of this menu.
     *
     * #### Platform-specific:
     *
     * - **macOS:** Only {@linkcode Submenu}s can be added to a {@linkcode Menu}.
     */ async append(items) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|append', {
            rid: this.rid,
            kind: this.kind,
            items: (Array.isArray(items) ? items : [
                items
            ]).map((i)=>'rid' in i ? [
                    i.rid,
                    i.kind
                ] : i)
        });
    }
    /**
     * Add a menu item to the beginning of this menu.
     *
     * #### Platform-specific:
     *
     * - **macOS:** Only {@linkcode Submenu}s can be added to a {@linkcode Menu}.
     */ async prepend(items) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|prepend', {
            rid: this.rid,
            kind: this.kind,
            items: (Array.isArray(items) ? items : [
                items
            ]).map((i)=>'rid' in i ? [
                    i.rid,
                    i.kind
                ] : i)
        });
    }
    /**
     * Add a menu item to the specified position in this menu.
     *
     * #### Platform-specific:
     *
     * - **macOS:** Only {@linkcode Submenu}s can be added to a {@linkcode Menu}.
     */ async insert(items, position) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|insert', {
            rid: this.rid,
            kind: this.kind,
            items: (Array.isArray(items) ? items : [
                items
            ]).map((i)=>'rid' in i ? [
                    i.rid,
                    i.kind
                ] : i),
            position
        });
    }
    /** Remove a menu item from this menu. */ async remove(item) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|remove', {
            rid: this.rid,
            kind: this.kind,
            item: [
                item.rid,
                item.kind
            ]
        });
    }
    /** Remove a menu item from this menu at the specified position. */ async removeAt(position) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|remove_at', {
            rid: this.rid,
            kind: this.kind,
            position
        }).then(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$submenu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["itemFromKind"]);
    }
    /** Returns a list of menu items that has been added to this menu. */ async items() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|items', {
            rid: this.rid,
            kind: this.kind
        }).then((i)=>i.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$submenu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["itemFromKind"]));
    }
    /** Retrieves the menu item matching the given identifier. */ async get(id) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|get', {
            rid: this.rid,
            kind: this.kind,
            id
        }).then((r)=>r ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$submenu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["itemFromKind"])(r) : null);
    }
    /**
     * Popup this menu as a context menu on the specified window.
     *
     * @param at If a position is provided, it is relative to the window's top-left corner.
     * If there isn't one provided, the menu will pop up at the current location of the mouse.
     */ async popup(at, window) {
        var _a;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|popup', {
            rid: this.rid,
            kind: this.kind,
            window: (_a = window === null || window === void 0 ? void 0 : window.label) !== null && _a !== void 0 ? _a : null,
            at: at instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Position"] ? at : at ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Position"](at) : null
        });
    }
    /**
     * Sets the app-wide menu and returns the previous one.
     *
     * If a window was not created with an explicit menu or had one set explicitly,
     * this menu will be assigned to it.
     */ async setAsAppMenu() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|set_as_app_menu', {
            rid: this.rid
        }).then((r)=>r ? new Menu(r[0], r[1]) : null);
    }
    /**
     * Sets the window menu and returns the previous one.
     *
     * #### Platform-specific:
     *
     * - **macOS:** Unsupported. The menu on macOS is app-wide and not specific to one
     * window, if you need to set it, use {@linkcode Menu.setAsAppMenu} instead.
     */ async setAsWindowMenu(window) {
        var _a;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:menu|set_as_window_menu', {
            rid: this.rid,
            window: (_a = window === null || window === void 0 ? void 0 : window.label) !== null && _a !== void 0 ? _a : null
        }).then((r)=>r ? new Menu(r[0], r[1]) : null);
    }
}
;
}),
"[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$submenu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/submenu.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/menuItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/menu.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$checkMenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/checkMenuItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$iconMenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/iconMenuItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$menu$2f$predefinedMenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/menu/predefinedMenuItem.js [app-ssr] (ecmascript)"); // Copyright 2019-2024 Tauri Programme within The Commons Conservancy
 // SPDX-License-Identifier: Apache-2.0
 // SPDX-License-Identifier: MIT
 /**
 * Menu types and utilities.
 *
 * This package is also accessible with `window.__TAURI__.menu` when [`app.withGlobalTauri`](https://v2.tauri.app/reference/config/#withglobaltauri) in `tauri.conf.json` is set to `true`.
 * @module
 */ 
;
;
;
;
;
;
}),
"[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/tray.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrayIcon",
    ()=>TrayIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/dpi.js [app-ssr] (ecmascript)");
;
;
;
// Copyright 2019-2024 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT
/**
 * Tray icon class and associated methods. This type constructor is private,
 * instead, you should use the static method {@linkcode TrayIcon.new}.
 *
 * #### Warning
 *
 * Unlike Rust, javascript does not have any way to run cleanup code
 * when an object is being removed by garbage collection, but this tray icon
 * will be cleaned up when the tauri app exists, however if you want to cleanup
 * this object early, you need to call {@linkcode TrayIcon.close}.
 *
 * @example
 * ```ts
 * import { TrayIcon } from '@tauri-apps/api/tray';
 * const tray = await TrayIcon.new({ tooltip: 'awesome tray tooltip' });
 * tray.set_tooltip('new tooltip');
 * ```
 */ class TrayIcon extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Resource"] {
    constructor(rid, id){
        super(rid);
        this.id = id;
    }
    /** Gets a tray icon using the provided id. */ static async getById(id) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:tray|get_by_id', {
            id
        }).then((rid)=>rid ? new TrayIcon(rid, id) : null);
    }
    /**
     * Removes a tray icon using the provided id from tauri's internal state.
     *
     * Note that this may cause the tray icon to disappear
     * if it wasn't cloned somewhere else or referenced by JS.
     */ static async removeById(id) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:tray|remove_by_id', {
            id
        });
    }
    /**
     * Creates a new {@linkcode TrayIcon}
     *
     * #### Platform-specific:
     *
     * - **Linux:** Sometimes the icon won't be visible unless a menu is set.
     * Setting an empty {@linkcode Menu} is enough.
     */ static async new(options) {
        if (options === null || options === void 0 ? void 0 : options.menu) {
            // @ts-expect-error we only need the rid and kind
            options.menu = [
                options.menu.rid,
                options.menu.kind
            ];
        }
        if (options === null || options === void 0 ? void 0 : options.icon) {
            options.icon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformImage"])(options.icon);
        }
        const handler = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Channel"]();
        if (options === null || options === void 0 ? void 0 : options.action) {
            const action = options.action;
            handler.onmessage = (e)=>action(mapEvent(e));
            delete options.action;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:tray|new', {
            options: options !== null && options !== void 0 ? options : {},
            handler
        }).then(([rid, id])=>new TrayIcon(rid, id));
    }
    /**
     *  Sets a new tray icon. If `null` is provided, it will remove the icon.
     *
     * Note that you may need the `image-ico` or `image-png` Cargo features to use this API.
     * To enable it, change your Cargo.toml file:
     * ```toml
     * [dependencies]
     * tauri = { version = "...", features = ["...", "image-png"] }
     * ```
     */ async setIcon(icon) {
        let trayIcon = null;
        if (icon) {
            trayIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformImage"])(icon);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:tray|set_icon', {
            rid: this.rid,
            icon: trayIcon
        });
    }
    /**
     * Sets a new tray menu.
     *
     * #### Platform-specific:
     *
     * - **Linux**: once a menu is set it cannot be removed so `null` has no effect
     */ async setMenu(menu) {
        if (menu) {
            // @ts-expect-error we only need the rid and kind
            menu = [
                menu.rid,
                menu.kind
            ];
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:tray|set_menu', {
            rid: this.rid,
            menu
        });
    }
    /**
     * Sets the tooltip for this tray icon.
     *
     * #### Platform-specific:
     *
     * - **Linux:** Unsupported
     */ async setTooltip(tooltip) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:tray|set_tooltip', {
            rid: this.rid,
            tooltip
        });
    }
    /**
     * Sets the tooltip for this tray icon.
     *
     * #### Platform-specific:
     *
     * - **Linux:** The title will not be shown unless there is an icon
     * as well.  The title is useful for numerical and other frequently
     * updated information.  In general, it shouldn't be shown unless a
     * user requests it as it can take up a significant amount of space
     * on the user's panel.  This may not be shown in all visualizations.
     * - **Windows:** Unsupported
     */ async setTitle(title) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:tray|set_title', {
            rid: this.rid,
            title
        });
    }
    /** Show or hide this tray icon. */ async setVisible(visible) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:tray|set_visible', {
            rid: this.rid,
            visible
        });
    }
    /**
     * Sets the tray icon temp dir path. **Linux only**.
     *
     * On Linux, we need to write the icon to the disk and usually it will
     * be `$XDG_RUNTIME_DIR/tray-icon` or `$TEMP/tray-icon`.
     */ async setTempDirPath(path) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:tray|set_temp_dir_path', {
            rid: this.rid,
            path
        });
    }
    /** Sets the current icon as a [template](https://developer.apple.com/documentation/appkit/nsimage/1520017-template?language=objc). **macOS only** */ async setIconAsTemplate(asTemplate) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:tray|set_icon_as_template', {
            rid: this.rid,
            asTemplate
        });
    }
    /**
     *  Disable or enable showing the tray menu on left click.
     *
     * #### Platform-specific:
     *
     * - **Linux**: Unsupported.
     *
     * @deprecated use {@linkcode TrayIcon.setShowMenuOnLeftClick} instead.
     */ async setMenuOnLeftClick(onLeft) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:tray|set_show_menu_on_left_click', {
            rid: this.rid,
            onLeft
        });
    }
    /**
     *  Disable or enable showing the tray menu on left click.
     *
     * #### Platform-specific:
     *
     * - **Linux**: Unsupported.
     *
     * @since 2.2.0
     */ async setShowMenuOnLeftClick(onLeft) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:tray|set_show_menu_on_left_click', {
            rid: this.rid,
            onLeft
        });
    }
}
function mapEvent(e) {
    const out = e;
    out.position = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PhysicalPosition"](e.position);
    out.rect.position = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PhysicalPosition"](e.rect.position);
    out.rect.size = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PhysicalSize"](e.rect.size);
    return out;
}
;
}),
"[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/app.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BundleType",
    ()=>BundleType,
    "defaultWindowIcon",
    ()=>defaultWindowIcon,
    "fetchDataStoreIdentifiers",
    ()=>fetchDataStoreIdentifiers,
    "getBundleType",
    ()=>getBundleType,
    "getIdentifier",
    ()=>getIdentifier,
    "getName",
    ()=>getName,
    "getTauriVersion",
    ()=>getTauriVersion,
    "getVersion",
    ()=>getVersion,
    "hide",
    ()=>hide,
    "removeDataStore",
    ()=>removeDataStore,
    "setDockVisibility",
    ()=>setDockVisibility,
    "setTheme",
    ()=>setTheme,
    "show",
    ()=>show
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/image.js [app-ssr] (ecmascript)");
;
;
// Copyright 2019-2024 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT
/**
 * Bundle type of the current application.
 */ var BundleType;
(function(BundleType) {
    /** Windows NSIS */ BundleType["Nsis"] = "nsis";
    /** Windows MSI */ BundleType["Msi"] = "msi";
    /** Linux Debian package */ BundleType["Deb"] = "deb";
    /** Linux RPM */ BundleType["Rpm"] = "rpm";
    /** Linux AppImage */ BundleType["AppImage"] = "appimage";
    /** macOS app bundle */ BundleType["App"] = "app";
})(BundleType || (BundleType = {}));
/**
 * Application metadata and related APIs.
 *
 * @module
 */ /**
 * Gets the application version.
 * @example
 * ```typescript
 * import { getVersion } from '@tauri-apps/api/app';
 * const appVersion = await getVersion();
 * ```
 *
 * @since 1.0.0
 */ async function getVersion() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:app|version');
}
/**
 * Gets the application name.
 * @example
 * ```typescript
 * import { getName } from '@tauri-apps/api/app';
 * const appName = await getName();
 * ```
 *
 * @since 1.0.0
 */ async function getName() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:app|name');
}
/**
 * Gets the Tauri version.
 *
 * @example
 * ```typescript
 * import { getTauriVersion } from '@tauri-apps/api/app';
 * const tauriVersion = await getTauriVersion();
 * ```
 *
 * @since 1.0.0
 */ async function getTauriVersion() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:app|tauri_version');
}
/**
 * Gets the application identifier.
 * @example
 * ```typescript
 * import { getIdentifier } from '@tauri-apps/api/app';
 * const identifier = await getIdentifier();
 * ```
 *
 * @returns The application identifier as configured in `tauri.conf.json`.
 *
 * @since 2.4.0
 */ async function getIdentifier() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:app|identifier');
}
/**
 * Shows the application on macOS. This function does not automatically focus any specific app window.
 *
 * @example
 * ```typescript
 * import { show } from '@tauri-apps/api/app';
 * await show();
 * ```
 *
 * @since 1.2.0
 */ async function show() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:app|app_show');
}
/**
 * Hides the application on macOS.
 *
 * @example
 * ```typescript
 * import { hide } from '@tauri-apps/api/app';
 * await hide();
 * ```
 *
 * @since 1.2.0
 */ async function hide() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:app|app_hide');
}
/**
 * Fetches the data store identifiers on macOS and iOS.
 *
 * See https://developer.apple.com/documentation/webkit/wkwebsitedatastore for more information.
 *
 * @example
 * ```typescript
 * import { fetchDataStoreIdentifiers } from '@tauri-apps/api/app';
 * const ids = await fetchDataStoreIdentifiers();
 * ```
 *
 * @since 2.4.0
 */ async function fetchDataStoreIdentifiers() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:app|fetch_data_store_identifiers');
}
/**
 * Removes the data store with the given identifier.
 *
 * Note that any webview using this data store should be closed before running this API.
 *
 * See https://developer.apple.com/documentation/webkit/wkwebsitedatastore for more information.
 *
 * @example
 * ```typescript
 * import { fetchDataStoreIdentifiers, removeDataStore } from '@tauri-apps/api/app';
 * for (const id of (await fetchDataStoreIdentifiers())) {
 *  await removeDataStore(id);
 * }
 * ```
 *
 * @since 2.4.0
 */ async function removeDataStore(uuid) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:app|remove_data_store', {
        uuid
    });
}
/**
 * Get the default window icon.
 *
 * @example
 * ```typescript
 * import { defaultWindowIcon } from '@tauri-apps/api/app';
 * await defaultWindowIcon();
 * ```
 *
 * @since 2.0.0
 */ async function defaultWindowIcon() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:app|default_window_icon').then((rid)=>rid ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Image"](rid) : null);
}
/**
 * Set app's theme, pass in `null` or `undefined` to follow system theme
 *
 * @example
 * ```typescript
 * import { setTheme } from '@tauri-apps/api/app';
 * await setTheme('dark');
 * ```
 *
 * #### Platform-specific
 *
 * - **iOS / Android:** Unsupported.
 *
 * @since 2.0.0
 */ async function setTheme(theme) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:app|set_app_theme', {
        theme
    });
}
/**
 * Sets the dock visibility for the application on macOS.
 *
 * @param visible whether the dock should be visible or not
 * @since 2.5.0
 */ async function setDockVisibility(visible) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:app|set_dock_visibility', {
        visible
    });
}
async function getBundleType() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:app|bundle_type');
}
;
}),
"[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/window.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CloseRequestedEvent",
    ()=>CloseRequestedEvent,
    "Effect",
    ()=>Effect,
    "EffectState",
    ()=>EffectState,
    "ProgressBarStatus",
    ()=>ProgressBarStatus,
    "UserAttentionType",
    ()=>UserAttentionType,
    "Window",
    ()=>Window,
    "availableMonitors",
    ()=>availableMonitors,
    "currentMonitor",
    ()=>currentMonitor,
    "cursorPosition",
    ()=>cursorPosition,
    "getAllWindows",
    ()=>getAllWindows,
    "getCurrentWindow",
    ()=>getCurrentWindow,
    "monitorFromPoint",
    ()=>monitorFromPoint,
    "primaryMonitor",
    ()=>primaryMonitor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/dpi.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/event.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/image.js [app-ssr] (ecmascript)");
;
;
;
;
;
// Copyright 2019-2024 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT
/**
 * Provides APIs to create windows, communicate with other windows and manipulate the current window.
 *
 * #### Window events
 *
 * Events can be listened to using {@link Window.listen}:
 * ```typescript
 * import { getCurrentWindow } from "@tauri-apps/api/window";
 * getCurrentWindow().listen("my-window-event", ({ event, payload }) => { });
 * ```
 *
 * @module
 */ /**
 * Attention type to request on a window.
 *
 * @since 1.0.0
 */ var UserAttentionType;
(function(UserAttentionType) {
    /**
     * #### Platform-specific
     * - **macOS:** Bounces the dock icon until the application is in focus.
     * - **Windows:** Flashes both the window and the taskbar button until the application is in focus.
     */ UserAttentionType[UserAttentionType["Critical"] = 1] = "Critical";
    /**
     * #### Platform-specific
     * - **macOS:** Bounces the dock icon once.
     * - **Windows:** Flashes the taskbar button until the application is in focus.
     */ UserAttentionType[UserAttentionType["Informational"] = 2] = "Informational";
})(UserAttentionType || (UserAttentionType = {}));
class CloseRequestedEvent {
    constructor(event){
        this._preventDefault = false;
        this.event = event.event;
        this.id = event.id;
    }
    preventDefault() {
        this._preventDefault = true;
    }
    isPreventDefault() {
        return this._preventDefault;
    }
}
var ProgressBarStatus;
(function(ProgressBarStatus) {
    /**
     * Hide progress bar.
     */ ProgressBarStatus["None"] = "none";
    /**
     * Normal state.
     */ ProgressBarStatus["Normal"] = "normal";
    /**
     * Indeterminate state. **Treated as Normal on Linux and macOS**
     */ ProgressBarStatus["Indeterminate"] = "indeterminate";
    /**
     * Paused state. **Treated as Normal on Linux**
     */ ProgressBarStatus["Paused"] = "paused";
    /**
     * Error state. **Treated as Normal on linux**
     */ ProgressBarStatus["Error"] = "error";
})(ProgressBarStatus || (ProgressBarStatus = {}));
/**
 * Get an instance of `Window` for the current window.
 *
 * @since 1.0.0
 */ function getCurrentWindow() {
    return new Window(window.__TAURI_INTERNALS__.metadata.currentWindow.label, {
        // @ts-expect-error `skip` is not defined in the public API but it is handled by the constructor
        skip: true
    });
}
/**
 * Gets a list of instances of `Window` for all available windows.
 *
 * @since 1.0.0
 */ async function getAllWindows() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|get_all_windows').then((windows)=>windows.map((w)=>new Window(w, {
                // @ts-expect-error `skip` is not defined in the public API but it is handled by the constructor
                skip: true
            })));
}
/** @ignore */ // events that are emitted right here instead of by the created window
const localTauriEvents = [
    'tauri://created',
    'tauri://error'
];
/**
 * Create new window or get a handle to an existing one.
 *
 * Windows are identified by a *label*  a unique identifier that can be used to reference it later.
 * It may only contain alphanumeric characters `a-zA-Z` plus the following special characters `-`, `/`, `:` and `_`.
 *
 * @example
 * ```typescript
 * import { Window } from "@tauri-apps/api/window"
 *
 * const appWindow = new Window('theUniqueLabel');
 *
 * appWindow.once('tauri://created', function () {
 *  // window successfully created
 * });
 * appWindow.once('tauri://error', function (e) {
 *  // an error happened creating the window
 * });
 *
 * // emit an event to the backend
 * await appWindow.emit("some-event", "data");
 * // listen to an event from the backend
 * const unlisten = await appWindow.listen("event-name", e => {});
 * unlisten();
 * ```
 *
 * @since 2.0.0
 */ class Window {
    /**
     * Creates a new Window.
     * @example
     * ```typescript
     * import { Window } from '@tauri-apps/api/window';
     * const appWindow = new Window('my-label');
     * appWindow.once('tauri://created', function () {
     *  // window successfully created
     * });
     * appWindow.once('tauri://error', function (e) {
     *  // an error happened creating the window
     * });
     * ```
     *
     * @param label The unique window label. Must be alphanumeric: `a-zA-Z-/:_`.
     * @returns The {@link Window} instance to communicate with the window.
     */ constructor(label, options = {}){
        var _a;
        this.label = label;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.listeners = Object.create(null);
        // @ts-expect-error `skip` is not a public API so it is not defined in WindowOptions
        if (!(options === null || options === void 0 ? void 0 : options.skip)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|create', {
                options: {
                    ...options,
                    parent: typeof options.parent === 'string' ? options.parent : (_a = options.parent) === null || _a === void 0 ? void 0 : _a.label,
                    label
                }
            }).then(async ()=>this.emit('tauri://created')).catch(async (e)=>this.emit('tauri://error', e));
        }
    }
    /**
     * Gets the Window associated with the given label.
     * @example
     * ```typescript
     * import { Window } from '@tauri-apps/api/window';
     * const mainWindow = Window.getByLabel('main');
     * ```
     *
     * @param label The window label.
     * @returns The Window instance to communicate with the window or null if the window doesn't exist.
     */ static async getByLabel(label) {
        var _a;
        return (_a = (await getAllWindows()).find((w)=>w.label === label)) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Get an instance of `Window` for the current window.
     */ static getCurrent() {
        return getCurrentWindow();
    }
    /**
     * Gets a list of instances of `Window` for all available windows.
     */ static async getAll() {
        return getAllWindows();
    }
    /**
     *  Gets the focused window.
     * @example
     * ```typescript
     * import { Window } from '@tauri-apps/api/window';
     * const focusedWindow = Window.getFocusedWindow();
     * ```
     *
     * @returns The Window instance or `undefined` if there is not any focused window.
     */ static async getFocusedWindow() {
        for (const w of (await getAllWindows())){
            if (await w.isFocused()) {
                return w;
            }
        }
        return null;
    }
    /**
     * Listen to an emitted event on this window.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const unlisten = await getCurrentWindow().listen<string>('state-changed', (event) => {
     *   console.log(`Got error: ${payload}`);
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
     * @param handler Event handler.
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */ async listen(event, handler) {
        if (this._handleTauriEvent(event, handler)) {
            return ()=>{
                // eslint-disable-next-line security/detect-object-injection
                const listeners = this.listeners[event];
                listeners.splice(listeners.indexOf(handler), 1);
            };
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["listen"])(event, handler, {
            target: {
                kind: 'Window',
                label: this.label
            }
        });
    }
    /**
     * Listen to an emitted event on this window only once.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const unlisten = await getCurrentWindow().once<null>('initialized', (event) => {
     *   console.log(`Window initialized!`);
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
     * @param handler Event handler.
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */ async once(event, handler) {
        if (this._handleTauriEvent(event, handler)) {
            return ()=>{
                // eslint-disable-next-line security/detect-object-injection
                const listeners = this.listeners[event];
                listeners.splice(listeners.indexOf(handler), 1);
            };
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["once"])(event, handler, {
            target: {
                kind: 'Window',
                label: this.label
            }
        });
    }
    /**
     * Emits an event to all {@link EventTarget|targets}.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().emit('window-loaded', { loggedIn: true, token: 'authToken' });
     * ```
     *
     * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
     * @param payload Event payload.
     */ async emit(event, payload) {
        if (localTauriEvents.includes(event)) {
            // eslint-disable-next-line
            for (const handler of this.listeners[event] || []){
                handler({
                    event,
                    id: -1,
                    payload
                });
            }
            return;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["emit"])(event, payload);
    }
    /**
     * Emits an event to all {@link EventTarget|targets} matching the given target.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().emit('main', 'window-loaded', { loggedIn: true, token: 'authToken' });
     * ```
     * @param target Label of the target Window/Webview/WebviewWindow or raw {@link EventTarget} object.
     * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
     * @param payload Event payload.
     */ async emitTo(target, event, payload) {
        if (localTauriEvents.includes(event)) {
            // eslint-disable-next-line security/detect-object-injection
            for (const handler of this.listeners[event] || []){
                handler({
                    event,
                    id: -1,
                    payload
                });
            }
            return;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["emitTo"])(target, event, payload);
    }
    /** @ignore */ _handleTauriEvent(event, handler) {
        if (localTauriEvents.includes(event)) {
            if (!(event in this.listeners)) {
                // eslint-disable-next-line
                this.listeners[event] = [
                    handler
                ];
            } else {
                // eslint-disable-next-line
                this.listeners[event].push(handler);
            }
            return true;
        }
        return false;
    }
    // Getters
    /**
     * The scale factor that can be used to map physical pixels to logical pixels.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const factor = await getCurrentWindow().scaleFactor();
     * ```
     *
     * @returns The window's monitor scale factor.
     */ async scaleFactor() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|scale_factor', {
            label: this.label
        });
    }
    /**
     * The position of the top-left hand corner of the window's client area relative to the top-left hand corner of the desktop.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const position = await getCurrentWindow().innerPosition();
     * ```
     *
     * @returns The window's inner position.
     */ async innerPosition() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|inner_position', {
            label: this.label
        }).then((p)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PhysicalPosition"](p));
    }
    /**
     * The position of the top-left hand corner of the window relative to the top-left hand corner of the desktop.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const position = await getCurrentWindow().outerPosition();
     * ```
     *
     * @returns The window's outer position.
     */ async outerPosition() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|outer_position', {
            label: this.label
        }).then((p)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PhysicalPosition"](p));
    }
    /**
     * The physical size of the window's client area.
     * The client area is the content of the window, excluding the title bar and borders.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const size = await getCurrentWindow().innerSize();
     * ```
     *
     * @returns The window's inner size.
     */ async innerSize() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|inner_size', {
            label: this.label
        }).then((s)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PhysicalSize"](s));
    }
    /**
     * The physical size of the entire window.
     * These dimensions include the title bar and borders. If you don't want that (and you usually don't), use inner_size instead.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const size = await getCurrentWindow().outerSize();
     * ```
     *
     * @returns The window's outer size.
     */ async outerSize() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|outer_size', {
            label: this.label
        }).then((s)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PhysicalSize"](s));
    }
    /**
     * Gets the window's current fullscreen state.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const fullscreen = await getCurrentWindow().isFullscreen();
     * ```
     *
     * @returns Whether the window is in fullscreen mode or not.
     */ async isFullscreen() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|is_fullscreen', {
            label: this.label
        });
    }
    /**
     * Gets the window's current minimized state.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const minimized = await getCurrentWindow().isMinimized();
     * ```
     */ async isMinimized() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|is_minimized', {
            label: this.label
        });
    }
    /**
     * Gets the window's current maximized state.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const maximized = await getCurrentWindow().isMaximized();
     * ```
     *
     * @returns Whether the window is maximized or not.
     */ async isMaximized() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|is_maximized', {
            label: this.label
        });
    }
    /**
     * Gets the window's current focus state.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const focused = await getCurrentWindow().isFocused();
     * ```
     *
     * @returns Whether the window is focused or not.
     */ async isFocused() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|is_focused', {
            label: this.label
        });
    }
    /**
     * Gets the window's current decorated state.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const decorated = await getCurrentWindow().isDecorated();
     * ```
     *
     * @returns Whether the window is decorated or not.
     */ async isDecorated() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|is_decorated', {
            label: this.label
        });
    }
    /**
     * Gets the window's current resizable state.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const resizable = await getCurrentWindow().isResizable();
     * ```
     *
     * @returns Whether the window is resizable or not.
     */ async isResizable() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|is_resizable', {
            label: this.label
        });
    }
    /**
     * Gets the window's native maximize button state.
     *
     * #### Platform-specific
     *
     * - **Linux / iOS / Android:** Unsupported.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const maximizable = await getCurrentWindow().isMaximizable();
     * ```
     *
     * @returns Whether the window's native maximize button is enabled or not.
     */ async isMaximizable() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|is_maximizable', {
            label: this.label
        });
    }
    /**
     * Gets the window's native minimize button state.
     *
     * #### Platform-specific
     *
     * - **Linux / iOS / Android:** Unsupported.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const minimizable = await getCurrentWindow().isMinimizable();
     * ```
     *
     * @returns Whether the window's native minimize button is enabled or not.
     */ async isMinimizable() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|is_minimizable', {
            label: this.label
        });
    }
    /**
     * Gets the window's native close button state.
     *
     * #### Platform-specific
     *
     * - **iOS / Android:** Unsupported.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const closable = await getCurrentWindow().isClosable();
     * ```
     *
     * @returns Whether the window's native close button is enabled or not.
     */ async isClosable() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|is_closable', {
            label: this.label
        });
    }
    /**
     * Gets the window's current visible state.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const visible = await getCurrentWindow().isVisible();
     * ```
     *
     * @returns Whether the window is visible or not.
     */ async isVisible() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|is_visible', {
            label: this.label
        });
    }
    /**
     * Gets the window's current title.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const title = await getCurrentWindow().title();
     * ```
     */ async title() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|title', {
            label: this.label
        });
    }
    /**
     * Gets the window's current theme.
     *
     * #### Platform-specific
     *
     * - **macOS:** Theme was introduced on macOS 10.14. Returns `light` on macOS 10.13 and below.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const theme = await getCurrentWindow().theme();
     * ```
     *
     * @returns The window theme.
     */ async theme() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|theme', {
            label: this.label
        });
    }
    /**
     * Whether the window is configured to be always on top of other windows or not.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const alwaysOnTop = await getCurrentWindow().isAlwaysOnTop();
     * ```
     *
     * @returns Whether the window is visible or not.
     */ async isAlwaysOnTop() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|is_always_on_top', {
            label: this.label
        });
    }
    // Setters
    /**
     * Centers the window.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().center();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */ async center() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|center', {
            label: this.label
        });
    }
    /**
     *  Requests user attention to the window, this has no effect if the application
     * is already focused. How requesting for user attention manifests is platform dependent,
     * see `UserAttentionType` for details.
     *
     * Providing `null` will unset the request for user attention. Unsetting the request for
     * user attention might not be done automatically by the WM when the window receives input.
     *
     * #### Platform-specific
     *
     * - **macOS:** `null` has no effect.
     * - **Linux:** Urgency levels have the same effect.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().requestUserAttention();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */ async requestUserAttention(requestType) {
        let requestType_ = null;
        if (requestType) {
            if (requestType === UserAttentionType.Critical) {
                requestType_ = {
                    type: 'Critical'
                };
            } else {
                requestType_ = {
                    type: 'Informational'
                };
            }
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|request_user_attention', {
            label: this.label,
            value: requestType_
        });
    }
    /**
     * Updates the window resizable flag.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setResizable(false);
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */ async setResizable(resizable) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_resizable', {
            label: this.label,
            value: resizable
        });
    }
    /**
     * Enable or disable the window.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setEnabled(false);
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     *
     * @since 2.0.0
     */ async setEnabled(enabled) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_enabled', {
            label: this.label,
            value: enabled
        });
    }
    /**
     * Whether the window is enabled or disabled.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setEnabled(false);
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     *
     * @since 2.0.0
     */ async isEnabled() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|is_enabled', {
            label: this.label
        });
    }
    /**
     * Sets whether the window's native maximize button is enabled or not.
     * If resizable is set to false, this setting is ignored.
     *
     * #### Platform-specific
     *
     * - **macOS:** Disables the "zoom" button in the window titlebar, which is also used to enter fullscreen mode.
     * - **Linux / iOS / Android:** Unsupported.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setMaximizable(false);
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */ async setMaximizable(maximizable) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_maximizable', {
            label: this.label,
            value: maximizable
        });
    }
    /**
     * Sets whether the window's native minimize button is enabled or not.
     *
     * #### Platform-specific
     *
     * - **Linux / iOS / Android:** Unsupported.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setMinimizable(false);
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */ async setMinimizable(minimizable) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_minimizable', {
            label: this.label,
            value: minimizable
        });
    }
    /**
     * Sets whether the window's native close button is enabled or not.
     *
     * #### Platform-specific
     *
     * - **Linux:** GTK+ will do its best to convince the window manager not to show a close button. Depending on the system, this function may not have any effect when called on a window that is already visible
     * - **iOS / Android:** Unsupported.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setClosable(false);
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */ async setClosable(closable) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_closable', {
            label: this.label,
            value: closable
        });
    }
    /**
     * Sets the window title.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setTitle('Tauri');
     * ```
     *
     * @param title The new title
     * @returns A promise indicating the success or failure of the operation.
     */ async setTitle(title) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_title', {
            label: this.label,
            value: title
        });
    }
    /**
     * Maximizes the window.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().maximize();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */ async maximize() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|maximize', {
            label: this.label
        });
    }
    /**
     * Unmaximizes the window.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().unmaximize();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */ async unmaximize() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|unmaximize', {
            label: this.label
        });
    }
    /**
     * Toggles the window maximized state.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().toggleMaximize();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */ async toggleMaximize() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|toggle_maximize', {
            label: this.label
        });
    }
    /**
     * Minimizes the window.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().minimize();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */ async minimize() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|minimize', {
            label: this.label
        });
    }
    /**
     * Unminimizes the window.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().unminimize();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */ async unminimize() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|unminimize', {
            label: this.label
        });
    }
    /**
     * Sets the window visibility to true.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().show();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */ async show() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|show', {
            label: this.label
        });
    }
    /**
     * Sets the window visibility to false.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().hide();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */ async hide() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|hide', {
            label: this.label
        });
    }
    /**
     * Closes the window.
     *
     * Note this emits a closeRequested event so you can intercept it. To force window close, use {@link Window.destroy}.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().close();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */ async close() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|close', {
            label: this.label
        });
    }
    /**
     * Destroys the window. Behaves like {@link Window.close} but forces the window close instead of emitting a closeRequested event.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().destroy();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */ async destroy() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|destroy', {
            label: this.label
        });
    }
    /**
     * Whether the window should have borders and bars.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setDecorations(false);
     * ```
     *
     * @param decorations Whether the window should have borders and bars.
     * @returns A promise indicating the success or failure of the operation.
     */ async setDecorations(decorations) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_decorations', {
            label: this.label,
            value: decorations
        });
    }
    /**
     * Whether or not the window should have shadow.
     *
     * #### Platform-specific
     *
     * - **Windows:**
     *   - `false` has no effect on decorated window, shadows are always ON.
     *   - `true` will make undecorated window have a 1px white border,
     * and on Windows 11, it will have a rounded corners.
     * - **Linux:** Unsupported.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setShadow(false);
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */ async setShadow(enable) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_shadow', {
            label: this.label,
            value: enable
        });
    }
    /**
     * Set window effects.
     */ async setEffects(effects) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_effects', {
            label: this.label,
            value: effects
        });
    }
    /**
     * Clear any applied effects if possible.
     */ async clearEffects() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_effects', {
            label: this.label,
            value: null
        });
    }
    /**
     * Whether the window should always be on top of other windows.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setAlwaysOnTop(true);
     * ```
     *
     * @param alwaysOnTop Whether the window should always be on top of other windows or not.
     * @returns A promise indicating the success or failure of the operation.
     */ async setAlwaysOnTop(alwaysOnTop) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_always_on_top', {
            label: this.label,
            value: alwaysOnTop
        });
    }
    /**
     * Whether the window should always be below other windows.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setAlwaysOnBottom(true);
     * ```
     *
     * @param alwaysOnBottom Whether the window should always be below other windows or not.
     * @returns A promise indicating the success or failure of the operation.
     */ async setAlwaysOnBottom(alwaysOnBottom) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_always_on_bottom', {
            label: this.label,
            value: alwaysOnBottom
        });
    }
    /**
     * Prevents the window contents from being captured by other apps.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setContentProtected(true);
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */ async setContentProtected(protected_) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_content_protected', {
            label: this.label,
            value: protected_
        });
    }
    /**
     * Resizes the window with a new inner size.
     * @example
     * ```typescript
     * import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window';
     * await getCurrentWindow().setSize(new LogicalSize(600, 500));
     * ```
     *
     * @param size The logical or physical inner size.
     * @returns A promise indicating the success or failure of the operation.
     */ async setSize(size) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_size', {
            label: this.label,
            value: size instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Size"] ? size : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Size"](size)
        });
    }
    /**
     * Sets the window minimum inner size. If the `size` argument is not provided, the constraint is unset.
     * @example
     * ```typescript
     * import { getCurrentWindow, PhysicalSize } from '@tauri-apps/api/window';
     * await getCurrentWindow().setMinSize(new PhysicalSize(600, 500));
     * ```
     *
     * @param size The logical or physical inner size, or `null` to unset the constraint.
     * @returns A promise indicating the success or failure of the operation.
     */ async setMinSize(size) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_min_size', {
            label: this.label,
            value: size instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Size"] ? size : size ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Size"](size) : null
        });
    }
    /**
     * Sets the window maximum inner size. If the `size` argument is undefined, the constraint is unset.
     * @example
     * ```typescript
     * import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window';
     * await getCurrentWindow().setMaxSize(new LogicalSize(600, 500));
     * ```
     *
     * @param size The logical or physical inner size, or `null` to unset the constraint.
     * @returns A promise indicating the success or failure of the operation.
     */ async setMaxSize(size) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_max_size', {
            label: this.label,
            value: size instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Size"] ? size : size ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Size"](size) : null
        });
    }
    /**
     * Sets the window inner size constraints.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setSizeConstraints({ minWidth: 300 });
     * ```
     *
     * @param constraints The logical or physical inner size, or `null` to unset the constraint.
     * @returns A promise indicating the success or failure of the operation.
     */ async setSizeConstraints(constraints) {
        function logical(pixel) {
            return pixel ? {
                Logical: pixel
            } : null;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_size_constraints', {
            label: this.label,
            value: {
                minWidth: logical(constraints === null || constraints === void 0 ? void 0 : constraints.minWidth),
                minHeight: logical(constraints === null || constraints === void 0 ? void 0 : constraints.minHeight),
                maxWidth: logical(constraints === null || constraints === void 0 ? void 0 : constraints.maxWidth),
                maxHeight: logical(constraints === null || constraints === void 0 ? void 0 : constraints.maxHeight)
            }
        });
    }
    /**
     * Sets the window outer position.
     * @example
     * ```typescript
     * import { getCurrentWindow, LogicalPosition } from '@tauri-apps/api/window';
     * await getCurrentWindow().setPosition(new LogicalPosition(600, 500));
     * ```
     *
     * @param position The new position, in logical or physical pixels.
     * @returns A promise indicating the success or failure of the operation.
     */ async setPosition(position) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_position', {
            label: this.label,
            value: position instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Position"] ? position : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Position"](position)
        });
    }
    /**
     * Sets the window fullscreen state.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setFullscreen(true);
     * ```
     *
     * @param fullscreen Whether the window should go to fullscreen or not.
     * @returns A promise indicating the success or failure of the operation.
     */ async setFullscreen(fullscreen) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_fullscreen', {
            label: this.label,
            value: fullscreen
        });
    }
    /**
     * On macOS, Toggles a fullscreen mode that doesn’t require a new macOS space. Returns a boolean indicating whether the transition was successful (this won’t work if the window was already in the native fullscreen).
     * This is how fullscreen used to work on macOS in versions before Lion. And allows the user to have a fullscreen window without using another space or taking control over the entire monitor.
     *
     * On other platforms, this is the same as {@link Window.setFullscreen}.
     *
     * @param fullscreen Whether the window should go to simple fullscreen or not.
     * @returns A promise indicating the success or failure of the operation.
     */ async setSimpleFullscreen(fullscreen) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_simple_fullscreen', {
            label: this.label,
            value: fullscreen
        });
    }
    /**
     * Bring the window to front and focus.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setFocus();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */ async setFocus() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_focus', {
            label: this.label
        });
    }
    /**
     * Sets whether the window can be focused.
     *
     * #### Platform-specific
     *
     * - **macOS**: If the window is already focused, it is not possible to unfocus it after calling `set_focusable(false)`.
     *   In this case, you might consider calling {@link Window.setFocus} but it will move the window to the back i.e. at the bottom in terms of z-order.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setFocusable(true);
     * ```
     *
     * @param focusable Whether the window can be focused.
     * @returns A promise indicating the success or failure of the operation.
     */ async setFocusable(focusable) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_focusable', {
            label: this.label,
            value: focusable
        });
    }
    /**
     * Sets the window icon.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setIcon('/tauri/awesome.png');
     * ```
     *
     * Note that you may need the `image-ico` or `image-png` Cargo features to use this API.
     * To enable it, change your Cargo.toml file:
     * ```toml
     * [dependencies]
     * tauri = { version = "...", features = ["...", "image-png"] }
     * ```
     *
     * @param icon Icon bytes or path to the icon file.
     * @returns A promise indicating the success or failure of the operation.
     */ async setIcon(icon) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_icon', {
            label: this.label,
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformImage"])(icon)
        });
    }
    /**
     * Whether the window icon should be hidden from the taskbar or not.
     *
     * #### Platform-specific
     *
     * - **macOS:** Unsupported.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setSkipTaskbar(true);
     * ```
     *
     * @param skip true to hide window icon, false to show it.
     * @returns A promise indicating the success or failure of the operation.
     */ async setSkipTaskbar(skip) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_skip_taskbar', {
            label: this.label,
            value: skip
        });
    }
    /**
     * Grabs the cursor, preventing it from leaving the window.
     *
     * There's no guarantee that the cursor will be hidden. You should
     * hide it by yourself if you want so.
     *
     * #### Platform-specific
     *
     * - **Linux:** Unsupported.
     * - **macOS:** This locks the cursor in a fixed location, which looks visually awkward.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setCursorGrab(true);
     * ```
     *
     * @param grab `true` to grab the cursor icon, `false` to release it.
     * @returns A promise indicating the success or failure of the operation.
     */ async setCursorGrab(grab) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_cursor_grab', {
            label: this.label,
            value: grab
        });
    }
    /**
     * Modifies the cursor's visibility.
     *
     * #### Platform-specific
     *
     * - **Windows:** The cursor is only hidden within the confines of the window.
     * - **macOS:** The cursor is hidden as long as the window has input focus, even if the cursor is
     *   outside of the window.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setCursorVisible(false);
     * ```
     *
     * @param visible If `false`, this will hide the cursor. If `true`, this will show the cursor.
     * @returns A promise indicating the success or failure of the operation.
     */ async setCursorVisible(visible) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_cursor_visible', {
            label: this.label,
            value: visible
        });
    }
    /**
     * Modifies the cursor icon of the window.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setCursorIcon('help');
     * ```
     *
     * @param icon The new cursor icon.
     * @returns A promise indicating the success or failure of the operation.
     */ async setCursorIcon(icon) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_cursor_icon', {
            label: this.label,
            value: icon
        });
    }
    /**
     * Sets the window background color.
     *
     * #### Platform-specific:
     *
     * - **Windows:** alpha channel is ignored.
     * - **iOS / Android:** Unsupported.
     *
     * @returns A promise indicating the success or failure of the operation.
     *
     * @since 2.1.0
     */ async setBackgroundColor(color) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_background_color', {
            color
        });
    }
    /**
     * Changes the position of the cursor in window coordinates.
     * @example
     * ```typescript
     * import { getCurrentWindow, LogicalPosition } from '@tauri-apps/api/window';
     * await getCurrentWindow().setCursorPosition(new LogicalPosition(600, 300));
     * ```
     *
     * @param position The new cursor position.
     * @returns A promise indicating the success or failure of the operation.
     */ async setCursorPosition(position) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_cursor_position', {
            label: this.label,
            value: position instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Position"] ? position : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Position"](position)
        });
    }
    /**
     * Changes the cursor events behavior.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setIgnoreCursorEvents(true);
     * ```
     *
     * @param ignore `true` to ignore the cursor events; `false` to process them as usual.
     * @returns A promise indicating the success or failure of the operation.
     */ async setIgnoreCursorEvents(ignore) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_ignore_cursor_events', {
            label: this.label,
            value: ignore
        });
    }
    /**
     * Starts dragging the window.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().startDragging();
     * ```
     *
     * @return A promise indicating the success or failure of the operation.
     */ async startDragging() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|start_dragging', {
            label: this.label
        });
    }
    /**
     * Starts resize-dragging the window.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().startResizeDragging();
     * ```
     *
     * @return A promise indicating the success or failure of the operation.
     */ async startResizeDragging(direction) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|start_resize_dragging', {
            label: this.label,
            value: direction
        });
    }
    /**
     * Sets the badge count. It is app wide and not specific to this window.
     *
     * #### Platform-specific
     *
     * - **Windows**: Unsupported. Use @{linkcode Window.setOverlayIcon} instead.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setBadgeCount(5);
     * ```
     *
     * @param count The badge count. Use `undefined` to remove the badge.
     * @return A promise indicating the success or failure of the operation.
     */ async setBadgeCount(count) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_badge_count', {
            label: this.label,
            value: count
        });
    }
    /**
     * Sets the badge cont **macOS only**.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setBadgeLabel("Hello");
     * ```
     *
     * @param label The badge label. Use `undefined` to remove the badge.
     * @return A promise indicating the success or failure of the operation.
     */ async setBadgeLabel(label) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_badge_label', {
            label: this.label,
            value: label
        });
    }
    /**
     * Sets the overlay icon. **Windows only**
     * The overlay icon can be set for every window.
     *
     *
     * Note that you may need the `image-ico` or `image-png` Cargo features to use this API.
     * To enable it, change your Cargo.toml file:
     *
     * ```toml
     * [dependencies]
     * tauri = { version = "...", features = ["...", "image-png"] }
     * ```
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setOverlayIcon("/tauri/awesome.png");
     * ```
     *
     * @param icon Icon bytes or path to the icon file. Use `undefined` to remove the overlay icon.
     * @return A promise indicating the success or failure of the operation.
     */ async setOverlayIcon(icon) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_overlay_icon', {
            label: this.label,
            value: icon ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformImage"])(icon) : undefined
        });
    }
    /**
     * Sets the taskbar progress state.
     *
     * #### Platform-specific
     *
     * - **Linux / macOS**: Progress bar is app-wide and not specific to this window.
     * - **Linux**: Only supported desktop environments with `libunity` (e.g. GNOME).
     *
     * @example
     * ```typescript
     * import { getCurrentWindow, ProgressBarStatus } from '@tauri-apps/api/window';
     * await getCurrentWindow().setProgressBar({
     *   status: ProgressBarStatus.Normal,
     *   progress: 50,
     * });
     * ```
     *
     * @return A promise indicating the success or failure of the operation.
     */ async setProgressBar(state) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_progress_bar', {
            label: this.label,
            value: state
        });
    }
    /**
     * Sets whether the window should be visible on all workspaces or virtual desktops.
     *
     * #### Platform-specific
     *
     * - **Windows / iOS / Android:** Unsupported.
     *
     * @since 2.0.0
     */ async setVisibleOnAllWorkspaces(visible) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_visible_on_all_workspaces', {
            label: this.label,
            value: visible
        });
    }
    /**
     * Sets the title bar style. **macOS only**.
     *
     * @since 2.0.0
     */ async setTitleBarStyle(style) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_title_bar_style', {
            label: this.label,
            value: style
        });
    }
    /**
     * Set window theme, pass in `null` or `undefined` to follow system theme
     *
     * #### Platform-specific
     *
     * - **Linux / macOS**: Theme is app-wide and not specific to this window.
     * - **iOS / Android:** Unsupported.
     *
     * @since 2.0.0
     */ async setTheme(theme) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|set_theme', {
            label: this.label,
            value: theme
        });
    }
    // Listeners
    /**
     * Listen to window resize.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from "@tauri-apps/api/window";
     * const unlisten = await getCurrentWindow().onResized(({ payload: size }) => {
     *  console.log('Window resized', size);
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */ async onResized(handler) {
        return this.listen(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TauriEvent"].WINDOW_RESIZED, (e)=>{
            e.payload = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PhysicalSize"](e.payload);
            handler(e);
        });
    }
    /**
     * Listen to window move.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from "@tauri-apps/api/window";
     * const unlisten = await getCurrentWindow().onMoved(({ payload: position }) => {
     *  console.log('Window moved', position);
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */ async onMoved(handler) {
        return this.listen(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TauriEvent"].WINDOW_MOVED, (e)=>{
            e.payload = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PhysicalPosition"](e.payload);
            handler(e);
        });
    }
    /**
     * Listen to window close requested. Emitted when the user requests to closes the window.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from "@tauri-apps/api/window";
     * import { confirm } from '@tauri-apps/api/dialog';
     * const unlisten = await getCurrentWindow().onCloseRequested(async (event) => {
     *   const confirmed = await confirm('Are you sure?');
     *   if (!confirmed) {
     *     // user did not confirm closing the window; let's prevent it
     *     event.preventDefault();
     *   }
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */ async onCloseRequested(handler) {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        return this.listen(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TauriEvent"].WINDOW_CLOSE_REQUESTED, async (event)=>{
            const evt = new CloseRequestedEvent(event);
            await handler(evt);
            if (!evt.isPreventDefault()) {
                await this.destroy();
            }
        });
    }
    /**
     * Listen to a file drop event.
     * The listener is triggered when the user hovers the selected files on the webview,
     * drops the files or cancels the operation.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from "@tauri-apps/api/webview";
     * const unlisten = await getCurrentWindow().onDragDropEvent((event) => {
     *  if (event.payload.type === 'over') {
     *    console.log('User hovering', event.payload.position);
     *  } else if (event.payload.type === 'drop') {
     *    console.log('User dropped', event.payload.paths);
     *  } else {
     *    console.log('File drop cancelled');
     *  }
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */ async onDragDropEvent(handler) {
        const unlistenDrag = await this.listen(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TauriEvent"].DRAG_ENTER, (event)=>{
            handler({
                ...event,
                payload: {
                    type: 'enter',
                    paths: event.payload.paths,
                    position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PhysicalPosition"](event.payload.position)
                }
            });
        });
        const unlistenDragOver = await this.listen(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TauriEvent"].DRAG_OVER, (event)=>{
            handler({
                ...event,
                payload: {
                    type: 'over',
                    position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PhysicalPosition"](event.payload.position)
                }
            });
        });
        const unlistenDrop = await this.listen(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TauriEvent"].DRAG_DROP, (event)=>{
            handler({
                ...event,
                payload: {
                    type: 'drop',
                    paths: event.payload.paths,
                    position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PhysicalPosition"](event.payload.position)
                }
            });
        });
        const unlistenCancel = await this.listen(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TauriEvent"].DRAG_LEAVE, (event)=>{
            handler({
                ...event,
                payload: {
                    type: 'leave'
                }
            });
        });
        return ()=>{
            unlistenDrag();
            unlistenDrop();
            unlistenDragOver();
            unlistenCancel();
        };
    }
    /**
     * Listen to window focus change.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from "@tauri-apps/api/window";
     * const unlisten = await getCurrentWindow().onFocusChanged(({ payload: focused }) => {
     *  console.log('Focus changed, window is focused? ' + focused);
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */ async onFocusChanged(handler) {
        const unlistenFocus = await this.listen(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TauriEvent"].WINDOW_FOCUS, (event)=>{
            handler({
                ...event,
                payload: true
            });
        });
        const unlistenBlur = await this.listen(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TauriEvent"].WINDOW_BLUR, (event)=>{
            handler({
                ...event,
                payload: false
            });
        });
        return ()=>{
            unlistenFocus();
            unlistenBlur();
        };
    }
    /**
     * Listen to window scale change. Emitted when the window's scale factor has changed.
     * The following user actions can cause DPI changes:
     * - Changing the display's resolution.
     * - Changing the display's scale factor (e.g. in Control Panel on Windows).
     * - Moving the window to a display with a different scale factor.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from "@tauri-apps/api/window";
     * const unlisten = await getCurrentWindow().onScaleChanged(({ payload }) => {
     *  console.log('Scale changed', payload.scaleFactor, payload.size);
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */ async onScaleChanged(handler) {
        return this.listen(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TauriEvent"].WINDOW_SCALE_FACTOR_CHANGED, handler);
    }
    /**
     * Listen to the system theme change.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from "@tauri-apps/api/window";
     * const unlisten = await getCurrentWindow().onThemeChanged(({ payload: theme }) => {
     *  console.log('New theme: ' + theme);
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */ async onThemeChanged(handler) {
        return this.listen(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TauriEvent"].WINDOW_THEME_CHANGED, handler);
    }
}
/**
 * Background throttling policy
 *
 * @since 2.0.0
 */ var BackgroundThrottlingPolicy;
(function(BackgroundThrottlingPolicy) {
    BackgroundThrottlingPolicy["Disabled"] = "disabled";
    BackgroundThrottlingPolicy["Throttle"] = "throttle";
    BackgroundThrottlingPolicy["Suspend"] = "suspend";
})(BackgroundThrottlingPolicy || (BackgroundThrottlingPolicy = {}));
/**
 * Platform-specific window effects
 *
 * @since 2.0.0
 */ var Effect;
(function(Effect) {
    /**
     * A default material appropriate for the view's effectiveAppearance.  **macOS 10.14-**
     *
     * @deprecated since macOS 10.14. You should instead choose an appropriate semantic material.
     */ Effect["AppearanceBased"] = "appearanceBased";
    /**
     *  **macOS 10.14-**
     *
     * @deprecated since macOS 10.14. Use a semantic material instead.
     */ Effect["Light"] = "light";
    /**
     *  **macOS 10.14-**
     *
     * @deprecated since macOS 10.14. Use a semantic material instead.
     */ Effect["Dark"] = "dark";
    /**
     *  **macOS 10.14-**
     *
     * @deprecated since macOS 10.14. Use a semantic material instead.
     */ Effect["MediumLight"] = "mediumLight";
    /**
     *  **macOS 10.14-**
     *
     * @deprecated since macOS 10.14. Use a semantic material instead.
     */ Effect["UltraDark"] = "ultraDark";
    /**
     *  **macOS 10.10+**
     */ Effect["Titlebar"] = "titlebar";
    /**
     *  **macOS 10.10+**
     */ Effect["Selection"] = "selection";
    /**
     *  **macOS 10.11+**
     */ Effect["Menu"] = "menu";
    /**
     *  **macOS 10.11+**
     */ Effect["Popover"] = "popover";
    /**
     *  **macOS 10.11+**
     */ Effect["Sidebar"] = "sidebar";
    /**
     *  **macOS 10.14+**
     */ Effect["HeaderView"] = "headerView";
    /**
     *  **macOS 10.14+**
     */ Effect["Sheet"] = "sheet";
    /**
     *  **macOS 10.14+**
     */ Effect["WindowBackground"] = "windowBackground";
    /**
     *  **macOS 10.14+**
     */ Effect["HudWindow"] = "hudWindow";
    /**
     *  **macOS 10.14+**
     */ Effect["FullScreenUI"] = "fullScreenUI";
    /**
     *  **macOS 10.14+**
     */ Effect["Tooltip"] = "tooltip";
    /**
     *  **macOS 10.14+**
     */ Effect["ContentBackground"] = "contentBackground";
    /**
     *  **macOS 10.14+**
     */ Effect["UnderWindowBackground"] = "underWindowBackground";
    /**
     *  **macOS 10.14+**
     */ Effect["UnderPageBackground"] = "underPageBackground";
    /**
     *  **Windows 11 Only**
     */ Effect["Mica"] = "mica";
    /**
     * **Windows 7/10/11(22H1) Only**
     *
     * #### Notes
     *
     * This effect has bad performance when resizing/dragging the window on Windows 11 build 22621.
     */ Effect["Blur"] = "blur";
    /**
     * **Windows 10/11**
     *
     * #### Notes
     *
     * This effect has bad performance when resizing/dragging the window on Windows 10 v1903+ and Windows 11 build 22000.
     */ Effect["Acrylic"] = "acrylic";
    /**
     * Tabbed effect that matches the system dark perefence **Windows 11 Only**
     */ Effect["Tabbed"] = "tabbed";
    /**
     * Tabbed effect with dark mode but only if dark mode is enabled on the system **Windows 11 Only**
     */ Effect["TabbedDark"] = "tabbedDark";
    /**
     * Tabbed effect with light mode **Windows 11 Only**
     */ Effect["TabbedLight"] = "tabbedLight";
})(Effect || (Effect = {}));
/**
 * Window effect state **macOS only**
 *
 * @see https://developer.apple.com/documentation/appkit/nsvisualeffectview/state
 *
 * @since 2.0.0
 */ var EffectState;
(function(EffectState) {
    /**
     *  Make window effect state follow the window's active state **macOS only**
     */ EffectState["FollowsWindowActiveState"] = "followsWindowActiveState";
    /**
     *  Make window effect state always active **macOS only**
     */ EffectState["Active"] = "active";
    /**
     *  Make window effect state always inactive **macOS only**
     */ EffectState["Inactive"] = "inactive";
})(EffectState || (EffectState = {}));
function mapMonitor(m) {
    return m === null ? null : {
        name: m.name,
        scaleFactor: m.scaleFactor,
        position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PhysicalPosition"](m.position),
        size: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PhysicalSize"](m.size),
        workArea: {
            position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PhysicalPosition"](m.workArea.position),
            size: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PhysicalSize"](m.workArea.size)
        }
    };
}
/**
 * Returns the monitor on which the window currently resides.
 * Returns `null` if current monitor can't be detected.
 * @example
 * ```typescript
 * import { currentMonitor } from '@tauri-apps/api/window';
 * const monitor = await currentMonitor();
 * ```
 *
 * @since 1.0.0
 */ async function currentMonitor() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|current_monitor').then(mapMonitor);
}
/**
 * Returns the primary monitor of the system.
 * Returns `null` if it can't identify any monitor as a primary one.
 * @example
 * ```typescript
 * import { primaryMonitor } from '@tauri-apps/api/window';
 * const monitor = await primaryMonitor();
 * ```
 *
 * @since 1.0.0
 */ async function primaryMonitor() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|primary_monitor').then(mapMonitor);
}
/**
 * Returns the monitor that contains the given point. Returns `null` if can't find any.
 * @example
 * ```typescript
 * import { monitorFromPoint } from '@tauri-apps/api/window';
 * const monitor = await monitorFromPoint(100.0, 200.0);
 * ```
 *
 * @since 1.0.0
 */ async function monitorFromPoint(x, y) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|monitor_from_point', {
        x,
        y
    }).then(mapMonitor);
}
/**
 * Returns the list of all the monitors available on the system.
 * @example
 * ```typescript
 * import { availableMonitors } from '@tauri-apps/api/window';
 * const monitors = await availableMonitors();
 * ```
 *
 * @since 1.0.0
 */ async function availableMonitors() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|available_monitors').then((ms)=>ms.map(mapMonitor));
}
/**
 * Get the cursor position relative to the top-left hand corner of the desktop.
 *
 * Note that the top-left hand corner of the desktop is not necessarily the same as the screen.
 * If the user uses a desktop with multiple monitors,
 * the top-left hand corner of the desktop is the top-left hand corner of the main monitor on Windows and macOS
 * or the top-left of the leftmost monitor on X11.
 *
 * The coordinates can be negative if the top-left hand corner of the window is outside of the visible screen region.
 */ async function cursorPosition() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:window|cursor_position').then((v)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$dpi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PhysicalPosition"](v));
}
;
}),
"[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/path.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseDirectory",
    ()=>BaseDirectory,
    "appCacheDir",
    ()=>appCacheDir,
    "appConfigDir",
    ()=>appConfigDir,
    "appDataDir",
    ()=>appDataDir,
    "appLocalDataDir",
    ()=>appLocalDataDir,
    "appLogDir",
    ()=>appLogDir,
    "audioDir",
    ()=>audioDir,
    "basename",
    ()=>basename,
    "cacheDir",
    ()=>cacheDir,
    "configDir",
    ()=>configDir,
    "dataDir",
    ()=>dataDir,
    "delimiter",
    ()=>delimiter,
    "desktopDir",
    ()=>desktopDir,
    "dirname",
    ()=>dirname,
    "documentDir",
    ()=>documentDir,
    "downloadDir",
    ()=>downloadDir,
    "executableDir",
    ()=>executableDir,
    "extname",
    ()=>extname,
    "fontDir",
    ()=>fontDir,
    "homeDir",
    ()=>homeDir,
    "isAbsolute",
    ()=>isAbsolute,
    "join",
    ()=>join,
    "localDataDir",
    ()=>localDataDir,
    "normalize",
    ()=>normalize,
    "pictureDir",
    ()=>pictureDir,
    "publicDir",
    ()=>publicDir,
    "resolve",
    ()=>resolve,
    "resolveResource",
    ()=>resolveResource,
    "resourceDir",
    ()=>resourceDir,
    "runtimeDir",
    ()=>runtimeDir,
    "sep",
    ()=>sep,
    "tempDir",
    ()=>tempDir,
    "templateDir",
    ()=>templateDir,
    "videoDir",
    ()=>videoDir
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tauri-apps+api@2.8.0/node_modules/@tauri-apps/api/core.js [app-ssr] (ecmascript)");
;
// Copyright 2019-2024 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT
/**
 * The path module provides utilities for working with file and directory paths.
 *
 * This package is also accessible with `window.__TAURI__.path` when [`app.withGlobalTauri`](https://v2.tauri.app/reference/config/#withglobaltauri) in `tauri.conf.json` is set to `true`.
 *
 * It is recommended to allowlist only the APIs you use for optimal bundle size and security.
 * @module
 */ /**
 * @since 2.0.0
 */ var BaseDirectory;
(function(BaseDirectory) {
    /**
     * @see {@link audioDir} for more information.
     */ BaseDirectory[BaseDirectory["Audio"] = 1] = "Audio";
    /**
     * @see {@link cacheDir} for more information.
     */ BaseDirectory[BaseDirectory["Cache"] = 2] = "Cache";
    /**
     * @see {@link configDir} for more information.
     */ BaseDirectory[BaseDirectory["Config"] = 3] = "Config";
    /**
     * @see {@link dataDir} for more information.
     */ BaseDirectory[BaseDirectory["Data"] = 4] = "Data";
    /**
     * @see {@link localDataDir} for more information.
     */ BaseDirectory[BaseDirectory["LocalData"] = 5] = "LocalData";
    /**
     * @see {@link documentDir} for more information.
     */ BaseDirectory[BaseDirectory["Document"] = 6] = "Document";
    /**
     * @see {@link downloadDir} for more information.
     */ BaseDirectory[BaseDirectory["Download"] = 7] = "Download";
    /**
     * @see {@link pictureDir} for more information.
     */ BaseDirectory[BaseDirectory["Picture"] = 8] = "Picture";
    /**
     * @see {@link publicDir} for more information.
     */ BaseDirectory[BaseDirectory["Public"] = 9] = "Public";
    /**
     * @see {@link videoDir} for more information.
     */ BaseDirectory[BaseDirectory["Video"] = 10] = "Video";
    /**
     * @see {@link resourceDir} for more information.
     */ BaseDirectory[BaseDirectory["Resource"] = 11] = "Resource";
    /**
     * @see {@link tempDir} for more information.
     */ BaseDirectory[BaseDirectory["Temp"] = 12] = "Temp";
    /**
     * @see {@link appConfigDir} for more information.
     */ BaseDirectory[BaseDirectory["AppConfig"] = 13] = "AppConfig";
    /**
     * @see {@link appDataDir} for more information.
     */ BaseDirectory[BaseDirectory["AppData"] = 14] = "AppData";
    /**
     * @see {@link appLocalDataDir} for more information.
     */ BaseDirectory[BaseDirectory["AppLocalData"] = 15] = "AppLocalData";
    /**
     * @see {@link appCacheDir} for more information.
     */ BaseDirectory[BaseDirectory["AppCache"] = 16] = "AppCache";
    /**
     * @see {@link appLogDir} for more information.
     */ BaseDirectory[BaseDirectory["AppLog"] = 17] = "AppLog";
    /**
     * @see {@link desktopDir} for more information.
     */ BaseDirectory[BaseDirectory["Desktop"] = 18] = "Desktop";
    /**
     * @see {@link executableDir} for more information.
     */ BaseDirectory[BaseDirectory["Executable"] = 19] = "Executable";
    /**
     * @see {@link fontDir} for more information.
     */ BaseDirectory[BaseDirectory["Font"] = 20] = "Font";
    /**
     * @see {@link homeDir} for more information.
     */ BaseDirectory[BaseDirectory["Home"] = 21] = "Home";
    /**
     * @see {@link runtimeDir} for more information.
     */ BaseDirectory[BaseDirectory["Runtime"] = 22] = "Runtime";
    /**
     * @see {@link templateDir} for more information.
     */ BaseDirectory[BaseDirectory["Template"] = 23] = "Template";
})(BaseDirectory || (BaseDirectory = {}));
/**
 * Returns the path to the suggested directory for your app's config files.
 * Resolves to `${configDir}/${bundleIdentifier}`, where `bundleIdentifier` is the [`identifier`](https://v2.tauri.app/reference/config/#identifier) value configured in `tauri.conf.json`.
 * @example
 * ```typescript
 * import { appConfigDir } from '@tauri-apps/api/path';
 * const appConfigDirPath = await appConfigDir();
 * ```
 *
 * @since 1.2.0
 */ async function appConfigDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.AppConfig
    });
}
/**
 * Returns the path to the suggested directory for your app's data files.
 * Resolves to `${dataDir}/${bundleIdentifier}`, where `bundleIdentifier` is the [`identifier`](https://v2.tauri.app/reference/config/#identifier) value configured in `tauri.conf.json`.
 * @example
 * ```typescript
 * import { appDataDir } from '@tauri-apps/api/path';
 * const appDataDirPath = await appDataDir();
 * ```
 *
 * @since 1.2.0
 */ async function appDataDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.AppData
    });
}
/**
 * Returns the path to the suggested directory for your app's local data files.
 * Resolves to `${localDataDir}/${bundleIdentifier}`, where `bundleIdentifier` is the [`identifier`](https://v2.tauri.app/reference/config/#identifier) value configured in `tauri.conf.json`.
 * @example
 * ```typescript
 * import { appLocalDataDir } from '@tauri-apps/api/path';
 * const appLocalDataDirPath = await appLocalDataDir();
 * ```
 *
 * @since 1.2.0
 */ async function appLocalDataDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.AppLocalData
    });
}
/**
 * Returns the path to the suggested directory for your app's cache files.
 * Resolves to `${cacheDir}/${bundleIdentifier}`, where `bundleIdentifier` is the [`identifier`](https://v2.tauri.app/reference/config/#identifier) value configured in `tauri.conf.json`.
 * @example
 * ```typescript
 * import { appCacheDir } from '@tauri-apps/api/path';
 * const appCacheDirPath = await appCacheDir();
 * ```
 *
 * @since 1.2.0
 */ async function appCacheDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.AppCache
    });
}
/**
 * Returns the path to the user's audio directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)' `XDG_MUSIC_DIR`.
 * - **macOS:** Resolves to `$HOME/Music`.
 * - **Windows:** Resolves to `{FOLDERID_Music}`.
 * @example
 * ```typescript
 * import { audioDir } from '@tauri-apps/api/path';
 * const audioDirPath = await audioDir();
 * ```
 *
 * @since 1.0.0
 */ async function audioDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.Audio
    });
}
/**
 * Returns the path to the user's cache directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to `$XDG_CACHE_HOME` or `$HOME/.cache`.
 * - **macOS:** Resolves to `$HOME/Library/Caches`.
 * - **Windows:** Resolves to `{FOLDERID_LocalAppData}`.
 * @example
 * ```typescript
 * import { cacheDir } from '@tauri-apps/api/path';
 * const cacheDirPath = await cacheDir();
 * ```
 *
 * @since 1.0.0
 */ async function cacheDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.Cache
    });
}
/**
 * Returns the path to the user's config directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to `$XDG_CONFIG_HOME` or `$HOME/.config`.
 * - **macOS:** Resolves to `$HOME/Library/Application Support`.
 * - **Windows:** Resolves to `{FOLDERID_RoamingAppData}`.
 * @example
 * ```typescript
 * import { configDir } from '@tauri-apps/api/path';
 * const configDirPath = await configDir();
 * ```
 *
 * @since 1.0.0
 */ async function configDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.Config
    });
}
/**
 * Returns the path to the user's data directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to `$XDG_DATA_HOME` or `$HOME/.local/share`.
 * - **macOS:** Resolves to `$HOME/Library/Application Support`.
 * - **Windows:** Resolves to `{FOLDERID_RoamingAppData}`.
 * @example
 * ```typescript
 * import { dataDir } from '@tauri-apps/api/path';
 * const dataDirPath = await dataDir();
 * ```
 *
 * @since 1.0.0
 */ async function dataDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.Data
    });
}
/**
 * Returns the path to the user's desktop directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)' `XDG_DESKTOP_DIR`.
 * - **macOS:** Resolves to `$HOME/Desktop`.
 * - **Windows:** Resolves to `{FOLDERID_Desktop}`.
 * @example
 * ```typescript
 * import { desktopDir } from '@tauri-apps/api/path';
 * const desktopPath = await desktopDir();
 * ```
 *
 * @since 1.0.0
 */ async function desktopDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.Desktop
    });
}
/**
 * Returns the path to the user's document directory.
 * @example
 * ```typescript
 * import { documentDir } from '@tauri-apps/api/path';
 * const documentDirPath = await documentDir();
 * ```
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)' `XDG_DOCUMENTS_DIR`.
 * - **macOS:** Resolves to `$HOME/Documents`.
 * - **Windows:** Resolves to `{FOLDERID_Documents}`.
 *
 * @since 1.0.0
 */ async function documentDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.Document
    });
}
/**
 * Returns the path to the user's download directory.
 *
 * #### Platform-specific
 *
 * - **Linux**: Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)' `XDG_DOWNLOAD_DIR`.
 * - **macOS**: Resolves to `$HOME/Downloads`.
 * - **Windows**: Resolves to `{FOLDERID_Downloads}`.
 * @example
 * ```typescript
 * import { downloadDir } from '@tauri-apps/api/path';
 * const downloadDirPath = await downloadDir();
 * ```
 *
 * @since 1.0.0
 */ async function downloadDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.Download
    });
}
/**
 * Returns the path to the user's executable directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to `$XDG_BIN_HOME/../bin` or `$XDG_DATA_HOME/../bin` or `$HOME/.local/bin`.
 * - **macOS:** Not supported.
 * - **Windows:** Not supported.
 * @example
 * ```typescript
 * import { executableDir } from '@tauri-apps/api/path';
 * const executableDirPath = await executableDir();
 * ```
 *
 * @since 1.0.0
 */ async function executableDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.Executable
    });
}
/**
 * Returns the path to the user's font directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to `$XDG_DATA_HOME/fonts` or `$HOME/.local/share/fonts`.
 * - **macOS:** Resolves to `$HOME/Library/Fonts`.
 * - **Windows:** Not supported.
 * @example
 * ```typescript
 * import { fontDir } from '@tauri-apps/api/path';
 * const fontDirPath = await fontDir();
 * ```
 *
 * @since 1.0.0
 */ async function fontDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.Font
    });
}
/**
 * Returns the path to the user's home directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to `$HOME`.
 * - **macOS:** Resolves to `$HOME`.
 * - **Windows:** Resolves to `{FOLDERID_Profile}`.
 * @example
 * ```typescript
 * import { homeDir } from '@tauri-apps/api/path';
 * const homeDirPath = await homeDir();
 * ```
 *
 * @since 1.0.0
 */ async function homeDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.Home
    });
}
/**
 * Returns the path to the user's local data directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to `$XDG_DATA_HOME` or `$HOME/.local/share`.
 * - **macOS:** Resolves to `$HOME/Library/Application Support`.
 * - **Windows:** Resolves to `{FOLDERID_LocalAppData}`.
 * @example
 * ```typescript
 * import { localDataDir } from '@tauri-apps/api/path';
 * const localDataDirPath = await localDataDir();
 * ```
 *
 * @since 1.0.0
 */ async function localDataDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.LocalData
    });
}
/**
 * Returns the path to the user's picture directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)' `XDG_PICTURES_DIR`.
 * - **macOS:** Resolves to `$HOME/Pictures`.
 * - **Windows:** Resolves to `{FOLDERID_Pictures}`.
 * @example
 * ```typescript
 * import { pictureDir } from '@tauri-apps/api/path';
 * const pictureDirPath = await pictureDir();
 * ```
 *
 * @since 1.0.0
 */ async function pictureDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.Picture
    });
}
/**
 * Returns the path to the user's public directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)' `XDG_PUBLICSHARE_DIR`.
 * - **macOS:** Resolves to `$HOME/Public`.
 * - **Windows:** Resolves to `{FOLDERID_Public}`.
 * @example
 * ```typescript
 * import { publicDir } from '@tauri-apps/api/path';
 * const publicDirPath = await publicDir();
 * ```
 *
 * @since 1.0.0
 */ async function publicDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.Public
    });
}
/**
 * Returns the path to the application's resource directory.
 * To resolve a resource path, see {@linkcode resolveResource}.
 *
 * ## Platform-specific
 *
 * Although we provide the exact path where this function resolves to,
 * this is not a contract and things might change in the future
 *
 * - **Windows:** Resolves to the directory that contains the main executable.
 * - **Linux:** When running in an AppImage, the `APPDIR` variable will be set to
 *   the mounted location of the app, and the resource dir will be `${APPDIR}/usr/lib/${exe_name}`.
 *   If not running in an AppImage, the path is `/usr/lib/${exe_name}`.
 *   When running the app from `src-tauri/target/(debug|release)/`, the path is `${exe_dir}/../lib/${exe_name}`.
 * - **macOS:** Resolves to `${exe_dir}/../Resources` (inside .app).
 * - **iOS:** Resolves to `${exe_dir}/assets`.
 * - **Android:** Currently the resources are stored in the APK as assets so it's not a normal file system path,
 *   we return a special URI prefix `asset://localhost/` here that can be used with the [file system plugin](https://tauri.app/plugin/file-system/),
 *
 * @example
 * ```typescript
 * import { resourceDir } from '@tauri-apps/api/path';
 * const resourceDirPath = await resourceDir();
 * ```
 *
 * @since 1.0.0
 */ async function resourceDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.Resource
    });
}
/**
 * Resolve the path to a resource file.
 * @example
 * ```typescript
 * import { resolveResource } from '@tauri-apps/api/path';
 * const resourcePath = await resolveResource('script.sh');
 * ```
 *
 * @param resourcePath The path to the resource.
 * Must follow the same syntax as defined in `tauri.conf.json > bundle > resources`, i.e. keeping subfolders and parent dir components (`../`).
 * @returns The full path to the resource.
 *
 * @since 1.0.0
 */ async function resolveResource(resourcePath) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.Resource,
        path: resourcePath
    });
}
/**
 * Returns the path to the user's runtime directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to `$XDG_RUNTIME_DIR`.
 * - **macOS:** Not supported.
 * - **Windows:** Not supported.
 * @example
 * ```typescript
 * import { runtimeDir } from '@tauri-apps/api/path';
 * const runtimeDirPath = await runtimeDir();
 * ```
 *
 * @since 1.0.0
 */ async function runtimeDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.Runtime
    });
}
/**
 * Returns the path to the user's template directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)' `XDG_TEMPLATES_DIR`.
 * - **macOS:** Not supported.
 * - **Windows:** Resolves to `{FOLDERID_Templates}`.
 * @example
 * ```typescript
 * import { templateDir } from '@tauri-apps/api/path';
 * const templateDirPath = await templateDir();
 * ```
 *
 * @since 1.0.0
 */ async function templateDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.Template
    });
}
/**
 * Returns the path to the user's video directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)' `XDG_VIDEOS_DIR`.
 * - **macOS:** Resolves to `$HOME/Movies`.
 * - **Windows:** Resolves to `{FOLDERID_Videos}`.
 * @example
 * ```typescript
 * import { videoDir } from '@tauri-apps/api/path';
 * const videoDirPath = await videoDir();
 * ```
 *
 * @since 1.0.0
 */ async function videoDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.Video
    });
}
/**
 * Returns the path to the suggested directory for your app's log files.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to `${configDir}/${bundleIdentifier}/logs`.
 * - **macOS:** Resolves to `${homeDir}/Library/Logs/{bundleIdentifier}`
 * - **Windows:** Resolves to `${configDir}/${bundleIdentifier}/logs`.
 * @example
 * ```typescript
 * import { appLogDir } from '@tauri-apps/api/path';
 * const appLogDirPath = await appLogDir();
 * ```
 *
 * @since 1.2.0
 */ async function appLogDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.AppLog
    });
}
/**
 * Returns a temporary directory.
 * @example
 * ```typescript
 * import { tempDir } from '@tauri-apps/api/path';
 * const temp = await tempDir();
 * ```
 *
 * @since 2.0.0
 */ async function tempDir() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve_directory', {
        directory: BaseDirectory.Temp
    });
}
/**
 * Returns the platform-specific path segment separator:
 * - `\` on Windows
 * - `/` on POSIX
 *
 * @since 2.0.0
 */ function sep() {
    return window.__TAURI_INTERNALS__.plugins.path.sep;
}
/**
 * Returns the platform-specific path segment delimiter:
 * - `;` on Windows
 * - `:` on POSIX
 *
 * @since 2.0.0
 */ function delimiter() {
    return window.__TAURI_INTERNALS__.plugins.path.delimiter;
}
/**
 * Resolves a sequence of `paths` or `path` segments into an absolute path.
 * @example
 * ```typescript
 * import { resolve, appDataDir } from '@tauri-apps/api/path';
 * const appDataDirPath = await appDataDir();
 * const path = await resolve(appDataDirPath, '..', 'users', 'tauri', 'avatar.png');
 * ```
 *
 * @since 1.0.0
 */ async function resolve(...paths) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|resolve', {
        paths
    });
}
/**
 * Normalizes the given `path`, resolving `'..'` and `'.'` segments and resolve symbolic links.
 * @example
 * ```typescript
 * import { normalize, appDataDir } from '@tauri-apps/api/path';
 * const appDataDirPath = await appDataDir();
 * const path = await normalize(`${appDataDirPath}/../users/tauri/avatar.png`);
 * ```
 *
 * @since 1.0.0
 */ async function normalize(path) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|normalize', {
        path
    });
}
/**
 *  Joins all given `path` segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.
 * @example
 * ```typescript
 * import { join, appDataDir } from '@tauri-apps/api/path';
 * const appDataDirPath = await appDataDir();
 * const path = await join(appDataDirPath, 'users', 'tauri', 'avatar.png');
 * ```
 *
 * @since 1.0.0
 */ async function join(...paths) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|join', {
        paths
    });
}
/**
 * Returns the parent directory of a given `path`. Trailing directory separators are ignored.
 * @example
 * ```typescript
 * import { dirname } from '@tauri-apps/api/path';
 * const dir = await dirname('/path/to/somedir/');
 * assert(dir === '/path/to');
 * ```
 *
 * @since 1.0.0
 */ async function dirname(path) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|dirname', {
        path
    });
}
/**
 * Returns the extension of the `path`.
 * @example
 * ```typescript
 * import { extname } from '@tauri-apps/api/path';
 * const ext = await extname('/path/to/file.html');
 * assert(ext === 'html');
 * ```
 *
 * @since 1.0.0
 */ async function extname(path) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|extname', {
        path
    });
}
/**
 * Returns the last portion of a `path`. Trailing directory separators are ignored.
 * @example
 * ```typescript
 * import { basename } from '@tauri-apps/api/path';
 * const base = await basename('path/to/app.conf');
 * assert(base === 'app.conf');
 * ```
 * @param ext An optional file extension to be removed from the returned path.
 *
 * @since 1.0.0
 */ async function basename(path, ext) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|basename', {
        path,
        ext
    });
}
/**
 * Returns whether the path is absolute or not.
 * @example
 * ```typescript
 * import { isAbsolute } from '@tauri-apps/api/path';
 * assert(await isAbsolute('/home/tauri'));
 * ```
 *
 * @since 1.0.0
 */ async function isAbsolute(path) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tauri$2d$apps$2b$api$40$2$2e$8$2e$0$2f$node_modules$2f40$tauri$2d$apps$2f$api$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invoke"])('plugin:path|is_absolute', {
        path
    });
}
;
}),
];

//# sourceMappingURL=83036_%40tauri-apps_api_9a12cc76._.js.map