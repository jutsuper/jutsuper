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
  JutSuperCss,
  JutSuperIpcDefaultNodeProps,
  JutSuperIpcJsDataTypes,
  JutSuperIpcJsDataTypesArray,
  JutSuperIpcIds,
  JutSuperIpcKeys,
  JutSuperStorageKeys,
  JutSuperStorageTransitionKeys,
  JutSuperStorageSettingsKeys,
  JutSuperIpcLoadingStates,
  JutSuperIpcAwaitStates,
  JutSuperIpcBoolRequestStates,
  JutSuperIpcValueDelims,
  JutSuperMessagingMessageKeys,
  JutSuperMessagingMessageActionsKeys
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
   * @type {"vjs-fullscreen-control"}
   */
  playerFullscreenButtonClassName: "vjs-fullscreen-control",
  /**
   * # Class name of a page header
   *
   * Used to get the page header and apply "display: none"
   * style to it (basically, hiding it)
   * so it won't overlap with a fullscreen player
   * 
   * @type {"z_fix_header"}
   */
  headerClassName: "z_fix_header",
  /**
   * # Class name of info panel with a search bar
   * 
   * Used to get the page info panel and apply "display: none"
   * style to it (basically, hiding it)
   * so it won't overlap with a fullscreen player
   * 
   * @type {"info_panel"}
   */
  infoPanelClassName: "info_panel",
  /**
   * # Class name of a footer
   * 
   * Used to get the page footer and apply "display: none"
   * style to it (basically, hiding it)
   * so it won't overlap with a fullscreen player
   * 
   * @type {"footer"}
   */
  footerClassName: "footer"
}
/** 
 * @typedef JutsuDomAttributesType
 * @property {"my-player"} playerDivId
 * @property {"vjs-fullscreen"} playerFullscreenClassName
 * @property {"vjs-fullscreen-control"} playerFullscreenButtonClassName
 * @property {"z_fix_header"} headerClassName
 * @property {"info_panel"} infoPanelClassName
 * @property {"footer"} footerClassName
 * 
 * 
 * @typedef {(
 *   "my-player" |
 *   "vjs-fullscreen" |
 *   "vjs-fullscreen-control" |
 *   "z_fix_header" |
 *   "info_panel" |
 *   "footer"
 * )} JutsuDomAttributesKeys
 */


/**
 * # Browser names
 * 
 * Used for flow control
 * based on the current browser
 * 
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
  /** 
   * # If logs should be enabled
   * @type {boolean}
   */
  enabled: true,
  /**
   * # Only these levels are logged
   * @type {JutSuperLogLevelsKeys[]}
   */
  levels: [
    JutSuperLogLevels.error,
    JutSuperLogLevels.warn,
    JutSuperLogLevels.log,
    JutSuperLogLevels.info,
    JutSuperLogLevels.debug
  ],
  /**
   * # Path to log location is shown only on these levels
   * @type {JutSuperLogLevelsKeys[]}
   */
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
 * # CSS styles of this extension
 * 
 * @readonly
 * @enum {JutSuperCssType}
 */
const JutSuperCss = {
  /** @type {"jutsuper-bottom-top-appear"} */
  keyframesBottomTopAppear: "jutsuper-bottom-top-appear",
  /** @type {"jutsuper-bottom-top-anim-025"} */
  bottomTopAnim025: "jutsuper-bottom-top-anim-025",
  /** @type {"jutsuper-bottom-margin-right-5"} */
  bottomMarginRight5: "jutsuper-bottom-margin-right-5",
  /** @type {"jutsuper-fullscreen"} */
  fullscreen: "jutsuper-fullscreen",
  /** @type {"jutsuper-top-index"} */
  topIndex: "jutsuper-top-index",
  /** @type {"jutsuper-hidden"} */
  hidden: "jutsuper-hidden",
}
/** 
 * @typedef JutSuperCssType
 * @property {"jutsuper-bottom-top-appear"} keyframesBottomTopAppear
 * @property {"jutsuper-bottom-top-anim-025"} bottomTopAnim025
 * @property {"jutsuper-bottom-margin-right-5"} bottomMarginRight5
 * @property {"jutsuper-fullscreen"} fullscreen
 * @property {"jutsuper-top-index"} topIndex
 * @property {"jutsuper-hidden"} hidden
 * 
 * @typedef {(
 *   "jutsuper-bottom-top-appear" |
 *   "jutsuper-bottom-top-anim-025" |
 *   "jutsuper-bottom-margin-right-5" |
 *   "jutsuper-fullscreen" |
 *   "jutsuper-top-index" |
 *   "jutsuper-hidden"
 * )} JutSuperCssKeys
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


/** @type {JutSuperIpcJsDataTypesKeys[]} */
const JutSuperIpcJsDataTypesArray = [
  JutSuperIpcJsDataTypes.boolean,
  JutSuperIpcJsDataTypes.number,
  JutSuperIpcJsDataTypes.string,
  JutSuperIpcJsDataTypes.null,
  JutSuperIpcJsDataTypes.undefined
]


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
   * # Request to enter/exit fullscreen
   * 
   * ## Possible values
   * @see {JutSuperIpcBoolRequestStatesKeys}
   *
   * @type {"data-fullscreen-control"}
   */
  fullscreenControl: "data-fullscreen-control",
  /**
   * # Control video playing (request `play` or `pause`)
   * 
   * ## Possible values
   * @see {JutSuperIpcBoolRequestStates}
   * @see {JutSuperIpcAwaitStates}
   * 
   * @type {"data-playing-control"}
   */
  playingControl: "data-playing-control",
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
   * # Request to inject a function to exit custom fullscreen
   * 
   * When the episode is switched and fullscreen is required,
   * the browser does not simply allow `fullscreenButton.click()`
   * because the `requestFullscreen()` function behind it will only
   * go into fullscreen if the call was made in a short period
   * of user activity (e.g. clicking).
   * 
   * So a workaround for this would be to enter the fullscreen mode
   * with a special request in a background script
   * (that would work like F11) and then applying CSS to the player
   * so it looks like fullscreen.
   * 
   * But when user decides to exit this "fake" fullscreen mode,
   * he encounters a huge disappointment when that doesn't work.
   * 
   * So a second workaround for this would be to inject
   * a function that prevents default behavior once and
   * does its thing of removing the CSS we applied earlier
   * and exiting the F11-like fullscreen.
   * 
   * ## Possible values
   * @see {JutSuperIpcBoolRequestStatesKeys}
   *
   * @type {"data-inject-custom-fullscreen-exit"}
   */
  injectCustomFullscreenExit: "data-inject-custom-fullscreen-exit",
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
 * @property {"data-fullscreen-control"} fullscreenControl
 * @property {"data-playing-control"} playingControl
 * @property {"data-episode-switch-prep"} episodeSwitchPrep
 * @property {"data-is-episode-switched-automatically"} isEpisodeSwitchedAutomatically
 * @property {"data-inject-custom-fullscreen-exit"} injectCustomFullscreenExit
 * @property {"data-max-continuous-episode-switches"} maxContinuousEpisodeSwitches
 * 
 * @typedef {(
 *   "data-essentials-loading-state" |
 *   "data-is-fullscreen" |
 *   "data-fullscreen-control" |
 *   "data-playing-control" |
 *   "data-episode-switch-prep" |
 *   "data-is-episode-switched-automatically" |
 *   "data-inject-custom-fullscreen-exit" |
 *   "data-max-continuous-episode-switches"
 * )} JutSuperIpcKeysKeys
 */


/**
 * # Object of a persistent extension storage
 * @readonly
 * @enum {JutSuperStorageKeysType}
 */
const JutSuperStorageKeys = {
  /** @type {"transition"} */
  transition: "transition",
  /** @type {"settings"} */
  settings: "settings"
}
/**
 * @typedef JutSuperStorageKeysType
 * @property {"transition"} transition
 * @property {"settings"} settings
 *
 * @typedef JutSuperStorageKeysTypes
 * @property {JutSuperStorageTransitionKeysType} [transition]
 * @property {JutSuperStorageSettingsKeysType} [settings]
 * 
 * @typedef {(
*   "transition" |
*   "settings"
* )} JutSuperStorageKeysKeys
 */


/**
 * # Episode switch temporary values
 * @readonly
 * @enum {JutSuperStorageTransitionKeysType}
 */
const JutSuperStorageTransitionKeys = {
  /** @type {"isFullscreen"} */
  isFullscreen: "isFullscreen",
  /** @type {"isSwitchingEpisode"} */
  isSwitchingEpisode: "isSwitchingEpisode"
}
/**
 * @typedef JutSuperStorageTransitionKeysType
 * @property {"isFullscreen"} isFullscreen
 * @property {"isSwitchingEpisode"} isSwitchingEpisode
 *
 * @typedef JutSuperStorageTransitionKeysTypes
 * @property {boolean} [isFullscreen]
 * @property {boolean} [isSwitchingEpisode]
 * 
 * @typedef {(
 *   "isFullscreen" |
 *   "isSwitchingEpisode"
 * )} JutSuperStorageTransitionKeysKeys
 */


/**
 * # Extension settings
 * @readonly
 * @enum {JutSuperStorageSettingsKeysType}
 */
const JutSuperStorageSettingsKeys = {
  /** @type {"maxContinuousEpisodeSwitches"} */
  maxContinuousEpisodeSwitches: "maxContinuousEpisodeSwitches",
}
/**
 * @typedef JutSuperStorageSettingsKeysType
 * @property {"maxContinuousEpisodeSwitches"} maxContinuousEpisodeSwitches
 *
 * @typedef JutSuperStorageSettingsKeysTypes
 * @property {number} [maxContinuousEpisodeSwitches]
 * 
 * @typedef {(
 *   "maxContinuousEpisodeSwitches" 
 * )} JutSuperStorageSettingsKeysKeys
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
 * # Describes states of awaiting in IPC
 * @readonly
 * @enum {JutSuperIpcBoolRequestStatesType}
 */
const JutSuperIpcBoolRequestStates = {
  /** @type {"requestTrue"} */
  requestTrue: "requestTrue",
  /** @type {"requestFalse"} */
  requestFalse: "requestFalse"
}
/** 
 * @typedef JutSuperIpcBoolRequestStatesType
 * @property {"requestTrue"} requestTrue
 * @property {"requestFalse"} requestFalse
 * 
 * @typedef {(
 *   "requestTrue" |
 *   "requestFalse"
 * )} JutSuperIpcBoolRequestStatesKeys
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


/**
 * # Describes message keys in internal messaging
 * @readonly
 * @enum {JutSuperMessagingMessageKeysType}
 */
const JutSuperMessagingMessageKeys = {
  /**
   * # Denotes what actions to perform
   * @type {"actions"}
   */
  actions: "actions",
}
/** 
 * @typedef JutSuperMessagingMessageKeysType
 * @property {"actions"} actions
 * 
 * @typedef {(
 *   "actions"
 * )} JutSuperMessagingMessageKeysKeys
 */


/**
 * # Describes `actions` keys in internal messaging
 * @readonly
 * @enum {JutSuperMessagingMessageActionsKeysType}
 */
const JutSuperMessagingMessageActionsKeys = {
  /**
   * # Denotes the fullscreen state
   * @type {"fullscreenState"}
   */
  fullscreenState: "fullscreenState",
}
/** 
 * @typedef JutSuperMessagingMessageActionsKeysType
 * @property {"fullscreenState"} fullscreenState
 * 
 * @typedef {(
 *   "fullscreenState"
 * )} JutSuperMessagingMessageActionsKeysKeys
 */
