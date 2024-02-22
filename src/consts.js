/**
 * NOTE:
 * This file can be accessed from the page,
 * tokens and passwords shouldn't be here
 */


export {
    JUTSU_FUNCTIONS,
    JUTSU_DOM_ATTRIBUTES,
    JUTSUPER_ASSET_IDS,
    JUTSUPER_ASSET_PATHS,
    JUTSUPER_IPC_DEFAULT_NODE_PROPS,
    JUTSUPER_IPC_SUB_FILTERS,
    JUTSUPER_IPC_JS_DATA_TYPES,
    JUTSUPER_IPC_IDS,
    JUTSUPER_IPC_KEYS,
    JUTSUPER_IPC_LOADING_STATES,
    JUTSUPER_IPC_AWAIT_STATES,
    JUTSUPER_IPC_VALUE_DELIMS
}


/**
 * # Describes exposed function names on `jut.su`
 * @readonly
 * @enum {string}
 */
const JUTSU_FUNCTIONS = {
    /** @type {"skip_video_intro"} */
    skipOpeningFnName: "skip_video_intro",
    /** @type {"video_go_next_episode"} */
    skipEndingFnName: "video_go_next_episode",
}


/**
 * # Describes DOM attributes on `jut.su`
 * @readonly
 * @enum {string}
 */
const JUTSU_DOM_ATTRIBUTES = {
    /** @type {"my-player"} */
    playerDivId: "my-player",
    /** @type {"vjs-fullscreen"} */
    playerFullscreenClassName: "vjs-fullscreen",
}


/**
 * # Describes IDs of public assets used by this extension
 * @readonly
 * @enum {string}
 */
const JUTSUPER_ASSET_IDS = {
    /** @type {"jutsuper-gear-svg"} */
    gearSvg: "jutsuper-gear-svg",
    /** @type {"jutsuper-css"} */
    jutsuperCss: "jutsuper-css",
    /** @type {"jutsuper-ipc-js"} */
    jutsuperIpcJs: "jutsuper-ipc-js",
    /** @type {"jutsuper-js"} */
    jutsuperJs: "jutsuper-js",
}


/**
 * # Describes paths to public assets used by this extension
 * @readonly
 * @enum {string}
 */
const JUTSUPER_ASSET_PATHS = {
    /** @type {"/src/assets/gear.svg"} */
    gearSvg: "/src/assets/gear.svg",
    /** @type {"/src/consts.js"} */
    constsJs: "/src/consts.js",
    /** @type {"/src/ipc.js"} */
    ipcJs: "/src/ipc.js",
    /** @type {"/src/page/jutsuper.css"} */
    jutsuperCss: "/src/page/jutsuper.css",
    /** @type {"/src/page/jutsuper.js"} */
    jutsuperJs: "/src/page/jutsuper.js",
}


/**
 * # Describes default DOM node for IPC
 * @readonly
 * @enum {string}
 */
const JUTSUPER_IPC_DEFAULT_NODE_PROPS = {
    /** @type {"jutsuper-ipc"} */
    tag: "jutsuper-ipc",
    /** @type {"jutsuper-ipc"} */
    id: "jutsuper-ipc",
}
/** @typedef {
      "jutsuper-ipc"
    } IpcDefaultNodeProps
*/


/**
 * # Describes filters for IPC event subscribers
 * @readonly
 * @enum {string}
 */
const JUTSUPER_IPC_SUB_FILTERS = {
    /** @type {"@FILTER:ANY@"} */
    any: "@FILTER:ANY@",
}
/** @typedef {
      "@FILTER:ANY@"
    } IpcSubFilter 
*/


/**
 * # Describes data types of values in IPC
 * @readonly
 * @enum {string}
 */
const JUTSUPER_IPC_JS_DATA_TYPES = {
    /** @type {"boolean"} */
    boolean: "boolean",
    /** @type {"number"} */
    number: "number",
    /** @type {"string"} */
    string: "string",
    /** @type {"null"} */
    null: "null",
    /** @type {"undefined"} */
    undefined: "undefined",
}
/** @typedef {
      "boolean" |
      "number" |
      "string" |
      "null" |
      "undefined"
    } IpcJsDataType 
*/
/** @typedef {
      boolean |
      number |
      string |
      null |
      undefined
    } IpcSupportedTypes
*/


/**
 * # Describes IPC instances' ID's
 * @readonly
 * @enum {string}
 */
const JUTSUPER_IPC_IDS = {
    /** @type {"pageMain"} */
    page: "pageMain",
    /** @type {"contentMain"} */
    content: "contentMain"
}
/** @typedef {
      "pageMain" |
      "contentMain"
    } IpcIds 
*/


/**
 * # Describes keys used in IPC
 * @readonly
 * @enum {string}
 */
const JUTSUPER_IPC_KEYS = {
    /** @type {"data-essentials-loading-state"} */
    essentialsLoadingState: "data-essentials-loading-state",
    /** @type {"data-is-fullscreen"} */
    isFullscreen: "data-is-fullscreen",
    /** @type {"data-episode-switch-prep-state"} */
    episodeSwitchPrepState: "data-episode-switch-prep-state",
    /** @type {"max-continuous-episode-switches"} */
    maxContinuousEpisodeSwitches: "max-continuous-episode-switches"
}
/** @typedef {
      "data-essentials-loading-state" |
      "data-is-fullscreen" |
      "data-episode-switch-prep-state"
    } IpcKeys
*/


/**
 * # Describes states of loading in IPC
 * @readonly
 * @enum {string}
 */
const JUTSUPER_IPC_LOADING_STATES = {
    loading: "loading",
    loaded: "loaded",
}
/** @typedef {
      "loading" |
      "loaded"
    } IpcDataEssentialsLoadingStates
*/


/**
 * # Describes states of awaiting in IPC
 * @readonly
 * @enum {string}
 */
const JUTSUPER_IPC_AWAIT_STATES = {
    request: "request",
    awaiting: "awaiting",
    completed: "completed",
}
/** @typedef {
      "request" |
      "awaiting" |
      "completed"
    } IpcAwaitingStates
*/


/**
 * # Describes value delimiters in IPC
 * @readonly
 * @enum {string}
 */
const JUTSUPER_IPC_VALUE_DELIMS = {
    /** @type {";type="} */
    type: ";type=",
    /** @type {";sender="} */
    sender: ";sender=",
}
/** @typedef {
      ";type=" |
      ";sender="
    } IpcValueDelims
*/
