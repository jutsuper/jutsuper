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
  JutSuFunctions,
  JutSuDomAttributes,
  JutSuperBrowsers,
  JutSuperLogLevels,
  JutSuperLogDefaults,
  JutSuperAssetIds,
  JutSuperAssetPaths,
  JutSuperIpcDefaultNodeProps,
  JutSuperIpcJsDataTypes,
  JutSuperIpcIds,
  JutSuperIpcKeys,
  JutSuperStorageKeys,
  JutSuperStorageTransitionKeys,
  JutSuperStorageDataKeys,
  JutSuperStorageAllKeys,
  JutSuperIpcLoadingStates,
  JutSuperIpcAwaitStates,
  JutSuperIpcValueDelims
}


/**
 * # Describes exposed function names on `jut.su`
 * 
 * These functions are located
 * in the `window` object and called
 * by the names specified here.
 * 
 * @readonly
 * @enum {JutsuFunctionsType}
 */
const JutSuFunctions = {
  /**
   * # Name of a function that skips the opening
   * Location is `window.skip_video_intro()`
   * @type {"skip_video_intro"}
   */
  skipOpeningFnName: "skip_video_intro",
  /**
   * # Name of a function that skips the ending
   * Location is `window.video_go_next_episode()`
   * @type {"video_go_next_episode"}
   */
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
const JutSuDomAttributes = {
  /**
   * # An ID of a `div` containing the player
   * @type {"my-player"}
   */
  playerDivId: "my-player",
  /**
   * # Class name that the player has when in fullscreen
   * 
   * Used to determine if player is currently
   * in fullscreen, so when changing episodes
   * the fullscreen mode could be set
   * to the same state.
   * 
   * @type {"vjs-fullscreen"}
   */
  playerFullscreenClassName: "vjs-fullscreen",
  /**
   * # Class name of a fullscreen button in a player
   * @type {"vjs-fullscreen"}
   */
  playerFullscreenButtonClassName: "vjs-fullscreen-control",
}
/** 
 * @typedef JutsuDomAttributesType
 * @property {"my-player"} playerDivId
 * @property {"vjs-fullscreen"} playerFullscreenClassName
 * @property {"vjs-fullscreen-control"} playerFullscreenButtonClassName
 * 
 * @typedef {(
 *   "my-player" |
 *   "vjs-fullscreen" |
 *   "vjs-fullscreen-control"
 * )} JutsuDomAttributesKeys
 */


/**
 * # Browser names
 * @readonly
 * @enum {JutSuperBrowsersType}
 */
const JutSuperBrowsers = {
  /**
   * @type {"chrome"}
   */
  chrome: "chrome",
  /**
   * @type {"firefox"}
   */
  firefox: "firefox",
}
/** 
 * @typedef JutSuperBrowsersType
 * @property {"chrome"} chrome
 * @property {"firefox"} firefox
 * 
 * @typedef {(
 *   "chrome" |
 *   "firefox"
 * )} JutSuperBrowsersKeys
 */


/**
 * # Describes available logging levels
 * @readonly
 * @enum {JutSuperLogLevelsType}
 */
const JutSuperLogLevels = {
  /** @type {"ERROR"} */
  error: "ERROR",
  /** @type {"WARN"} */
  warn: "WARN",
  /** @type {"LOG"} */
  log: "LOG",
  /** @type {"INFO"} */
  info: "INFO",
  /** @type {"DEBUG"} */
  debug: "DEBUG"
}
/** 
 * @typedef JutSuperLogLevelsType
 * @property {"ERROR"} error
 * @property {"WARN"} warn
 * @property {"LOG"} log
 * @property {"INFO"} info
 * @property {"DEBUG"} debug
 * 
 * @typedef {(
 *   "ERROR" |
 *   "WARN" |
 *   "LOG" |
 *   "INFO" |
 *   "DEBUG"
 * )} JutSuperLogLevelsKeys
 */


/**
 * # Describes default logging settings
 * 
 * Logging is handled by `/src/log.js`.
 * 
 * Change these settings to
 * enable/disable logging or
 * to include/exclude logging levels.
 * 
 * Production builds should not have
 * the debug level enabled.
 * 
 * @readonly
 * @enum {JutSuperLogDefaultsType}
 */
const JutSuperLogDefaults = {
  /** # If logs should be enabled */
  enabled: true,
  /** # Only these levels are logged */
  levels: [
    JutSuperLogLevels.error,
    JutSuperLogLevels.warn,
    JutSuperLogLevels.log,
    JutSuperLogLevels.info,
    JutSuperLogLevels.debug
  ],
  /** # Path to log location is shown only on these levels */
  locationLevels: [
    JutSuperLogLevels.error,
    JutSuperLogLevels.warn,
    JutSuperLogLevels.log,
    JutSuperLogLevels.info,
    JutSuperLogLevels.debug
  ]
}
/** 
 * @typedef JutSuperLogDefaultsType
 * @property {boolean} enabled
 * @property {JutSuperLogLevelsKeys[]} levels
 * @property {JutSuperLogLevelsKeys[]} pathLevels
 */


/**
 * # Describes IDs of public assets used by this extension
 * 
 * Content script injects this extension's
 * assets into the page and gives these
 * IDs to them.
 * 
 * Used for easier DOM queries in the code.
 * 
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
 * 
 * These paths are only used in content script
 * when injecting stuff into the page.
 * 
 * For importing, content script uses hardcoded paths,
 * since the `import {...} from "..."` syntax
 * is not supported there.
 * 
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
 * 
 * IPC node is an element in the DOM,
 * is a children of `<body>` and stores
 * information in form of attributes.
 * 
 * This node will be named as `tag`
 * and will have an ID of `id`
 * 
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
 * 
 * IPC instances can have their own ID
 * so that they won't receive their own events
 * when listening.
 * 
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
  /**
   * # State of loading the player and other essentials
   * 
   * ## Possible values
   * @see {JutSuperIpcLoadingStates}
   * 
   * @type {"data-essentials-loading-state"}
   */
  essentialsLoadingState: "data-essentials-loading-state",
  /**
   * # Is the player is in fullscreen
   * 
   * ## Possible values
   * @see {boolean}
   * 
   * @type {"data-is-fullscreen"}
   */
  isFullscreen: "data-is-fullscreen",
  /**
   * # Current state of episode switching preparations
   * 
   * ## Possible values
   * @see {JutSuperIpcAwaitStates}
   * 
   * @type {"data-episode-switch-prep"}
   */
  episodeSwitchPrep: "data-episode-switch-prep",
  /**
   * # Was the episode switched automatically
   * 
   * ## Possible values
   * @see {boolean}
   * 
   * @type {"data-is-episode-switched-automatically"}
   */
  isEpisodeSwitchedAutomatically: "data-is-episode-switched-automatically",
  /**
   * # How many times the extension should skip endings
   * 
   * @see {number} for possible values
   * @type {"data-max-continuous-episode-switches"}
   */
  maxContinuousEpisodeSwitches: "data-max-continuous-episode-switches"
}
/** 
 * @typedef JutSuperIpcKeysType
 * @property {"data-essentials-loading-state"} essentialsLoadingState
 * @property {"data-is-fullscreen"} isFullscreen
 * @property {"data-episode-switch-prep"} episodeSwitchPrep
 * @property {"data-is-episode-switched-automatically"} isEpisodeSwitchedAutomatically
 * @property {"data-max-continuous-episode-switches"} maxContinuousEpisodeSwitches
 * 
 * @typedef {(
 *   "data-essentials-loading-state" |
 *   "data-is-fullscreen" |
 *   "data-episode-switch-prep" |
 *   "data-is-episode-switched-automatically" |
 *   "data-max-continuous-episode-switches"
 * )} JutSuperIpcKeysKeys
 */


/**
 * # Describes keys used in IPC
 * @readonly
 * @enum {JutSuperStorageAllKeysType}
 */
const JutSuperStorageKeys = {
  isFullscreen: "isFullscreen",
  isSwitchingEpisode: "isSwitchingEpisode"
}
/**
 * @typedef JutSuperStorageAllKeysType
 * @property {"isFullscreen"} isFullscreen
 * @property {"isSwitchingEpisode"} isSwitchingEpisode
 * 
 * @typedef {(
 *   JutSuperStorageTransitionKeysKeys |
 *   JutSuperStorageDataKeysKeys
 * )} JutSuperStorageAllKeysKeys
 *
 * @typedef JutSuperStorageAllKeysTypes
 * @property {boolean} isFullscreen
 * @property {boolean} isSwitchingEpisode
 */


/**
 * @readonly
 * @type {JutSuperStorageTransitionKeysKeys[]}
 */
const JutSuperStorageTransitionKeys = [];
JutSuperStorageTransitionKeys.push(JutSuperStorageKeys.isFullscreen);
JutSuperStorageTransitionKeys.push(JutSuperStorageKeys.isSwitchingEpisode);
/**
 * @typedef {(
 *   "isFullscreen" |
 *   "isSwitchingEpisode"
 * )} JutSuperStorageTransitionKeysKeys
 */


/**
 * @readonly
 * @type {JutSuperStorageDataKeysKeys[]}
 */
const JutSuperStorageDataKeys = [];
/**
 * @typedef {(
 *   
 * )} JutSuperStorageDataKeysKeys
 */


/**
 * @readonly
 * @type {JutSuperStorageAllKeysKeys[]}
 */
const JutSuperStorageAllKeys = [];
JutSuperStorageAllKeys.push(...JutSuperStorageTransitionKeys);
JutSuperStorageAllKeys.push(...JutSuperStorageDataKeys);


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
  /** @type {"aborted"} */
  aborted: "aborted",
  /** @type {"paused"} */
  paused: "paused",
  /** @type {"continuation"} */
  continuation: "continuation",
  /** @type {"completed"} */
  completed: "completed",
}
/** 
 * @typedef JutSuperIpcAwaitStatesType
 * @property {"idle"} idle
 * @property {"request"} request
 * @property {"awaiting"} awaiting
 * @property {"aborted"} aborted
 * @property {"paused"} paused
 * @property {"continuation"} continuation
 * @property {"completed"} completed
 * 
 * @typedef {(
 *   "idle" |
 *   "request" |
 *   "awaiting" |
 *   "aborted" |
 *   "paused" |
 *   "continuation" |
 *   "completed"
 * )} JutSuperIpcAwaitStatesKeys
 */


/**
 * # Describes value delimiters in IPC
 * @readonly
 * @enum {JutSuperIpcValueDelimsType}
 */
const JutSuperIpcValueDelims = {
  /**
   * # Denotes the data type
   * @type {";type="}
   */
  type: ";type=",
  /**
   * # Denotes the sender ID
   * @type {";sender="}
   */
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
