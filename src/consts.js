/**
 * fuck this JSDoc verbosity,
 * no idea how to make it more compact
 * and preserve good annotations everywhere
 * 
 * NOTE:
 * This file can be accessed from the page,
 * tokens and passwords shouldn't be here
 */


export {
    JutsuFunctions,
    JutsuDomAttributes,
    JutSuperAssetIds,
    JutSuperAssetPaths,
    JutSuperIpcDefaultNodeProps,
    JutSuperIpcSubFilters,
    JutSuperIpcJsDataTypes,
    JutSuperIpcIds,
    JutSuperIpcKeys,
    JutSuperIpcLoadingStates,
    JutSuperIpcAwaitStates,
    JutSuperIpcValueDelims
}


/**
 * # Describes exposed function names on `jut.su`
 * @readonly
 * @enum {JutsuFunctionsType}
 */
const JutsuFunctions = {
    /** @type {"skip_video_intro"} */
    skipOpeningFnName: "skip_video_intro",
    /** @type {"video_go_next_episode"} */
    skipEndingFnName: "video_go_next_episode",
}
/** 
 * @typedef JutsuFunctionsType
 * @property {"skip_video_intro"} skipOpeningFnName
 * @property {"video_go_next_episode"} skipEndingFnName
 * 
 * @typedef {(
 *   "skip_video_intro" |
 *   "video_go_next_episode"
 * )} JutsuFunctionsKeys
 */


/**
 * # Describes DOM attributes on `jut.su`
 * @readonly
 * @enum {JutsuDomAttributesType}
 */
const JutsuDomAttributes = {
    /** @type {"my-player"} */
    playerDivId: "my-player",
    /** @type {"vjs-fullscreen"} */
    playerFullscreenClassName: "vjs-fullscreen",
}
/** 
 * @typedef JutsuDomAttributesType
 * @property {"my-player"} playerDivId
 * @property {"vjs-fullscreen"} playerFullscreenClassName
 * 
 * @typedef {(
 *   "my-player" |
 *   "vjs-fullscreen"
 * )} JutsuDomAttributesKeys
 */


/**
 * # Describes IDs of public assets used by this extension
 * @readonly
 * @enum {JutSuperAssetIdsType}
 */
const JutSuperAssetIds = {
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
 * @typedef JutSuperAssetIdsType
 * @property {"jutsuper-gear-svg"} gearSvg
 * @property {"jutsuper-css"} jutsuperCss
 * @property {"jutsuper-ipc-js"} jutsuperIpcJs
 * @property {"jutsuper-js"} jutsuperJs
 * 
 * @typedef {(
 *   "jutsuper-gear-svg" |
 *   "jutsuper-css" |
 *   "jutsuper-ipc-js" |
 *   "jutsuper-js"
 * )} JutSuperAssetIdsKeys
 */


/**
 * # Describes paths to public assets used by this extension
 * @readonly
 * @enum {JutSuperAssetPathsType}
 */
const JutSuperAssetPaths = {
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
 * @typedef JutSuperAssetPathsType
 * @property {"/src/assets/gear.svg"} gearSvg
 * @property {"/src/consts.js"} constsJs
 * @property {"/src/ipc.js"} ipcJs
 * @property {"/src/page/jutsuper.css"} jutsuperCss
 * @property {"/src/page/jutsuper.js"} jutsuperJs
 * 
 * @typedef {(
 *   "/src/assets/gear.svg" |
 *   "/src/consts.js" |
 *   "/src/ipc.js" |
 *   "/src/page/jutsuper.css" |
 *   "/src/page/jutsuper.js"
 * )} JutSuperAssetPathsKeys
 */


/**
 * # Describes default DOM node for IPC
 * @readonly
 * @enum {JutSuperIpcDefaultNodePropsType}
 */
const JutSuperIpcDefaultNodeProps = {
    /** @type {"jutsuper-ipc"} */
    tag: "jutsuper-ipc",
    /** @type {"jutsuper-ipc"} */
    id: "jutsuper-ipc",
}
/** 
 * @typedef JutSuperIpcDefaultNodePropsType
 * @property {"jutsuper-ipc"} tag
 * @property {"jutsuper-ipc"} id
 * 
 * @typedef {(
 *   "jutsuper-ipc"
 * )} JutSuperIpcDefaultNodePropsKeys
 */


/**
 * # Describes data types of values in IPC
 * @readonly
 * @enum {JutSuperIpcJsDataTypesType}
 */
const JutSuperIpcJsDataTypes = {
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
/** 
 * @typedef JutSuperIpcJsDataTypesType
 * @property {"boolean"} boolean
 * @property {"number"} number
 * @property {"string"} string
 * @property {"null"} null
 * @property {"undefined"} undefined
 * 
 * @typedef {(
 *   "boolean" |
 *   "number" |
 *   "string" |
 *   "null" |
 *   "undefined"
 * )} JutSuperIpcJsDataTypesKeys
 * @typedef {(
 *   boolean |
 *   number |
 *   string |
 *   null |
 *   undefined
 * )} JutSuperIpcSupportedDataTypes
 */


/**
 * # Describes IPC instances' ID's
 * @readonly
 * @enum {JutSuperIpcIdsType}
 */
const JutSuperIpcIds = {
    /** @type {"pageMain"} */
    page: "pageMain",
    /** @type {"contentMain"} */
    content: "contentMain"
}
/** 
 * @typedef JutSuperIpcIdsType
 * @property {"pageMain"} page
 * @property {"contentMain"} content
 * 
 * @typedef {(
 *   "pageMain" |
 *   "contentMain"
 * )} JutSuperIpcIdsKeys
 */


/**
 * # Describes keys used in IPC
 * @readonly
 * @enum {JutSuperIpcKeysType}
 */
const JutSuperIpcKeys = {
    /** @type {data-essentials-loading-state} */
    essentialsLoadingState: "data-essentials-loading-state",
    /** @type {data-is-fullscreen} */
    isFullscreen: "data-is-fullscreen",
    /** @type {data-episode-switch-prep-state} */
    episodeSwitchPrepState: "data-episode-switch-prep-state",
    /** @type {max-continuous-episode-switches} */
    maxContinuousEpisodeSwitches: "max-continuous-episode-switches"
}
/** 
 * @typedef JutSuperIpcKeysType
 * @property {"data-essentials-loading-state"} essentialsLoadingState
 * @property {"data-is-fullscreen"} isFullscreen
 * @property {"data-episode-switch-prep-state"} episodeSwitchPrepState
 * @property {"max-continuous-episode-switches"} maxContinuousEpisodeSwitches
 * 
 * @typedef {(
 *   "data-essentials-loading-state" |
 *   "data-is-fullscreen" |
 *   "data-episode-switch-prep-state" |
 *   "max-continuous-episode-switches"
 * )} JutSuperIpcKeysKeys
 */


/**
 * # Describes states of loading in IPC
 * @readonly
 * @enum {JutSuperIpcLoadingStatesType}
 */
const JutSuperIpcLoadingStates = {
    /** @type {"loading"} */
    loading: "loading",
    /** @type {"loaded"} */
    loaded: "loaded",
}
/** 
 * @typedef JutSuperIpcLoadingStatesType
 * @property {"loading"} loading
 * @property {"loaded"} loaded
 * 
 * @typedef {(
 *   "loading" |
 *   "loaded"
 * )} JutSuperIpcLoadingStatesKeys
 */


/**
 * # Describes states of awaiting in IPC
 * @readonly
 * @enum {JutSuperIpcAwaitStatesType}
 */
const JutSuperIpcAwaitStates = {
    /** @type {"idle"} */
    idle: "idle",
    /** @type {"request"} */
    request: "request",
    /** @type {"awaiting"} */
    awaiting: "awaiting",
    /** @type {"completed"} */
    completed: "completed",
}
/** 
 * @typedef JutSuperIpcAwaitStatesType
 * @property {"idle"} idle
 * @property {"request"} request
 * @property {"awaiting"} awaiting
 * @property {"completed"} completed
 * 
 * @typedef {(
 *   "idle" |
 *   "request" |
 *   "awaiting" |
 *   "completed"
 * )} JutSuperIpcAwaitStatesKeys
 */


/**
 * # Describes value delimiters in IPC
 * @readonly
 * @enum {JutSuperIpcValueDelimsType}
 */
const JutSuperIpcValueDelims = {
    /** @type {";type="} */
    type: ";type=",
    /** @type {";sender="} */
    sender: ";sender=",
}
/** 
 * @typedef JutSuperIpcValueDelimsType
 * @property {";type="} type
 * @property {";sender="} sender
 * 
 * @typedef {(
 *   ";type=" |
 *   ";sender="
 * )} JutSuperIpcValueDelimsKeys
 */
