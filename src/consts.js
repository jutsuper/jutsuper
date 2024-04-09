/**
 * fuck this JSDoc verbosity,
 * no idea how to make it more compact
 * and preserve good annotations everywhere
 */


export {
  JutSuFunctions,
  JutSuDomIds,
  JutSuDomClasses,
  JutSuperBrowsers,
  JutSuperLogLevels,
  JutSuperLogDefaults,
  JutSuperAssetIds,
  JutSuperAssetPaths,
  JutSuperDomIds,
  JutSuperDomClasses,
  JutSuperInputNames,
  JutSuperDefaultFonts,
  JutSuperIpcDefaultNodeProps,
  JutSuperIpcJsDataTypes,
  JutSuperIpcJsDataTypesArray,
  JutSuperIpcIds,
  JutSuperIpcKeys,
  JutSuperIpcSettingsKeys,
  JutSuperIpcLoadingStates,
  JutSuperIpcAwaitStates,
  JutSuperIpcBoolRequestStates,
  JutSuperIpcValueDelims,
  JutSuperMessagingMessageKeys,
  JutSuperMessagingMessageActionsKeys,
  JutSuperMessagingMessageRequestsRequestKeys,
  JutSuperMessagingMessageRequestsResponseKeys,
  JutSuperKeyCodeLabelOverrides
}


/**
 * @typedef {import("/src/browser.js").BrowserWindowStatesKeys} BrowserWindowStatesKeys
 * @typedef {import("/src/settings.js").JutSuperSettingsObject} JutSuperSettingsObject
 */


/**
 * # Describes exposed function names on `jut.su`
 * 
 * These functions are part
 * of the `window` object
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
 * # Describes IDs of nodes on `jut.su`
 * 
 * @readonly
 * @enum {JutSuDomIdsType}
 */
const JutSuDomIds = {
  /** @type {"my-player"} */
  myPlayer: "my-player"
}
/**
 * @typedef JutSuDomIdsType
 * @property {"my-player"} myPlayer
 *
 * @typedef {(
*   "my-player"
* )} JutSuDomIdsKeys
*/


/**
 * # Describes classes of nodes on `jut.su`
 * 
 * @readonly
 * @enum {JutSuDomClassesType}
 */
const JutSuDomClasses = {
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
  vjsFullscreen: "vjs-fullscreen",
  /**
   * # Class name of a fullscreen button in a player
   * @type {"vjs-fullscreen-control"}
   */
  vjsFullscreenControl: "vjs-fullscreen-control",
  /**
   * # Class name of a subtitles button in a player
   * @type {"vjs-subtitles-button"}
   */
  vjsSubtitlesButton: "vjs-subtitles-button",
  /**
   * # Class name of a share button in a player
   * @type {"vjs-share-control"}
   */
  vjsShareControl: "vjs-share-control",
  /**
   * # Class name of a thumbnail holder in a player
   * @type {"vjs-thumbnail-holder"}
   */
  vjsThumbnailHolder: "vjs-thumbnail-holder",
  /**
   * # Class name of an icon placeholder
   * @type {"vjs-icon-placeholder"}
   */
  vjcIconPlaceholder: "vjs-icon-placeholder",
  /**
   * # Class name of a page header
   *
   * Used to get the page header and apply "display: none"
   * style to it (basically, hiding it)
   * so it won't overlap with a player
   * in a custom fullscreen mode
   * 
   * @type {"z_fix_header"}
   */
  zFixHeader: "z_fix_header",
  /**
   * # Class name of info panel with a search bar
   * 
   * Used to get the page info panel and apply "display: none"
   * style to it (basically, hiding it)
   * so it won't overlap with a player
   * in a custom fullscreen mode
   * 
   * @type {"info_panel"}
   */
  infoPanel: "info_panel",
  /**
   * # Class name of a footer
   * 
   * Used to get the page footer and apply "display: none"
   * style to it (basically, hiding it)
   * so it won't overlap with a player
   * in a custom fullscreen mode
   * 
   * @type {"footer"}
   */
  footer: "footer"
}
/**
 * @typedef JutSuDomClassesType
 * @property {"vjs-fullscreen"} vjsFullscreen
 * @property {"vjs-fullscreen-control"} vjsFullscreenControl
 * @property {"vjs-subtitles-button"} vjsSubtitlesButton
 * @property {"vjs-share-control"} vjsShareControl
 * @property {"vjs-thumbnail-holder"} vjsThumbnailHolder
 * @property {"vjs-icon-placeholder"} vjcIconPlaceholder
 * @property {"z_fix_header"} zFixHeader
 * @property {"info_panel"} infoPanel
 * @property {"footer"} footer
 *
 * @typedef {(
*   "vjs-fullscreen" |
*   "vjs-fullscreen-control" |
*   "vjs-subtitles-button" |
*   "vjs-share-control" |
*   "vjs-thumbnail-holder" |
*   "vjs-icon-placeholder" |
*   "z_fix_header" |
*   "info_panel" |
*   "footer"
* )} JutSuDomClassesKeys
*/


/**
 * # Browser engine names
 * 
 * Used for flow control
 * based on the current browser
 * 
 * @readonly
 * @enum {JutSuperBrowsersType}
 */
const JutSuperBrowsers = {
  /**
   * # Chrome, Opera, Yandex Browser, etc.
   * @type {"blink"}
   */
  blink: "blink",
  /**
   * # Firefox
   * @type {"gecko"}
   */
  gecko: "gecko",
}
/** 
 * @typedef JutSuperBrowsersType
 * @property {"blink"} blink
 * @property {"gecko"} gecko
 * 
 * @typedef {(
 *   "blink" |
 *   "gecko"
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
  /** @type {"jutsuper-square-green-logo-48-svg"} */
  squareGreenLogo48Svg: "jutsuper-square-green-logo-48-svg",
  /** @type {"jutsuper-square-white-logo-48-svg"} */
  squareWhiteLogo48Svg: "jutsuper-square-white-logo-48-svg",
  /** @type {"jutsuper-square-black-logo-48-svg"} */
  squareBlackLogo48Svg: "jutsuper-square-black-logo-48-svg",
  /** @type {"jutsuper-dropdown-svg"} */
  dropdownSvg: "jutsuper-dropdown-svg",
  /** @type {"jutsuper-skip-svg"} */
  skipSvg: "jutsuper-skip-svg",
  /** @type {"jutsuper-css"} */
  jutsuperCss: "jutsuper-css",
  /** @type {"jutsuper-ipc-js"} */
  jutsuperIpcJs: "jutsuper-ipc-js",
  /** @type {"jutsuper-js"} */
  jutsuperJs: "jutsuper-js",
  /** @type {"jutsuper-settings-html"} */
  settingsHtml: "jutsuper-settings-html",
  /** @type {"jutsuper-skip-html"} */
  skipHtml: "jutsuper-skip-html",
}
/** 
 * @typedef JutSuperAssetIdsType
 * @property {"jutsuper-square-green-logo-48-svg"} squareGreenLogo48Svg
 * @property {"jutsuper-square-white-logo-48-svg"} squareWhiteLogo48Svg
 * @property {"jutsuper-square-black-logo-48-svg"} squareBlackLogo48Svg
 * @property {"jutsuper-dropdown-svg"} dropdownSvg
 * @property {"jutsuper-skip-svg"} skipSvg
 * @property {"jutsuper-css"} jutsuperCss
 * @property {"jutsuper-ipc-js"} jutsuperIpcJs
 * @property {"jutsuper-js"} jutsuperJs
 * @property {"jutsuper-settings-html"} settingsHtml
 * @property {"jutsuper-skip-html"} skipHtml
 * 
 * @typedef {(
 *   "jutsuper-square-green-logo-48-svg" |
 *   "jutsuper-square-white-logo-48-svg" |
 *   "jutsuper-square-black-logo-48-svg" |
 *   "jutsuper-dropdown-svg" |
 *   "jutsuper-skip-svg" |
 *   "jutsuper-css" |
 *   "jutsuper-ipc-js" |
 *   "jutsuper-js" |
 *   "jutsuper-settings-html" |
 *   "jutsuper-skip-html"
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
  /** @type {"/src/assets/logo/square-green-48.svg"} */
  squareGreenLogo48Svg: "/src/assets/logo/square-green-48.svg",
  /** @type {"/src/assets/logo/square-white-48.svg"} */
  squareWhiteLogo48Svg: "/src/assets/logo/square-white-48.svg",
  /** @type {"/src/assets/logo/square-black-48.svg"} */
  squareBlackLogo48Svg: "/src/assets/logo/square-black-48.svg",
  /** @type {"/src/assets/icon/dropdown.svg"} */
  dropdownSvg: "/src/assets/icon/dropdown.svg",
  /** @type {"/src/assets/icon/skip.svg"} */
  skipSvg: "/src/assets/icon/skip.svg",
  /** @type {"/src/consts.js"} */
  constsJs: "/src/consts.js",
  /** @type {"/src/ipc.js"} */
  ipcJs: "/src/ipc.js",
  /** @type {"/src/page/jutsuper.css"} */
  jutsuperCss: "/src/page/jutsuper.css",
  /** @type {"/src/page/jutsuper.js"} */
  jutsuperJs: "/src/page/jutsuper.js",
  /** @type {"/src/page/settings.js"} */
  settingsJs: "/src/page/settings.js",
  /** @type {"/src/page/settings.html"} */
  settingsHtml: "/src/page/settings.html",
  /** @type {"/src/page/skip.js"} */
  skipJs: "/src/page/skip.js",
  /** @type {"/src/page/skip.html"} */
  skipHtml: "/src/page/skip.html",
}
/** 
 * @typedef JutSuperAssetPathsType
 * @property {"/src/assets/logo/square-green-48.svg"} squareGreenLogo48Svg
 * @property {"/src/assets/logo/square-white-48.svg"} squareWhiteLogo48Svg
 * @property {"/src/assets/logo/square-black-48.svg"} squareBlackLogo48Svg
 * @property {"/src/assets/icon/dropdown.svg"} dropdownSvg
 * @property {"/src/assets/icon/skip.svg"} skipSvg
 * @property {"/src/consts.js"} constsJs
 * @property {"/src/ipc.js"} ipcJs
 * @property {"/src/page/jutsuper.css"} jutsuperCss
 * @property {"/src/page/jutsuper.js"} jutsuperJs
 * @property {"/src/page/settings.js"} settingsJs
 * @property {"/src/page/settings.html"} settingsHtml
 * @property {"/src/page/skip.js"} skipJs
 * @property {"/src/page/skip.html"} skipHtml
 * 
 * @typedef {(
 *   "/src/assets/logo/square-green-48.svg" |
 *   "/src/assets/logo/square-white-48.svg" |
 *   "/src/assets/logo/square-black-48.svg" |
 *   "/src/assets/icon/dropdown.svg" |
 *   "/src/assets/icon/skip.svg" |
 *   "/src/consts.js" |
 *   "/src/ipc.js" |
 *   "/src/page/jutsuper.css" |
 *   "/src/page/jutsuper.js" |
 *   "/src/page/settings.js" |
 *   "/src/page/settings.html" |
 *   "/src/page/skip.js" |
 *   "/src/page/skip.html"
 * )} JutSuperAssetPathsKeys
 */


/**
 * # Describes IDs of DOM elements created and accessed by this extension
 * 
 * Used for easier DOM queries in the code.
 * 
 * @readonly
 * @enum {JutSuperDomIdsType}
 */
const JutSuperDomIds = {
  /** @type {"jutsuper-vjs-button"} */
  vjsButton: "jutsuper-vjs-button",
  /** @type {"jutsuper-vjs-button-icon"} */
  vjsButtonIcon: "jutsuper-vjs-button-icon",

  /** Dev */
  /** @type {"jutsuper-dev-preload-message"} */
  devPreloadMessage: "jutsuper-dev-preload-message",

  /** VideoJS */
  /** @type {"jutsuper-vjs-container"} */
  vjsContainer: "jutsuper-vjs-container",

  /** Settings */
  /** @type {"jutsuper-vjs-settings-area"} */
  vjsSettingsArea: "jutsuper-vjs-settings-area",
  /** @type {"jutsuper-vjs-settings-clip-area"} */
  vjsSettingsClipArea: "jutsuper-vjs-settings-clip-area",
  /** @type {"jutsuper-settings-root"} */
  settingsRoot: "jutsuper-settings-root",
  /** @type {"jutsuper-settings-skip-header-icon"} */
  settingsSkipHeaderIcon: "jutsuper-settings-skip-header-icon",
  /** @type {"jutsuper-settings-openings-bar-label"} */
  settingsOpeningsBarLabel: "jutsuper-settings-openings-bar-label",
  /** @type {"jutsuper-settings-openings-switch"} */
  settingsOpeningsSwitch: "jutsuper-settings-openings-switch",
  /** @type {"jutsuper-settings-openings-slider"} */
  settingsOpeningsSlider: "jutsuper-settings-openings-slider",
  /** @type {"jutsuper-settings-openings-bar-dropdown-icon"} */
  settingsOpeningsBarDropdownIcon: "jutsuper-settings-openings-bar-dropdown-icon",
  /** @type {"jutsuper-settings-openings-section-clip"} */
  settingsOpeningsSectionClip: "jutsuper-settings-openings-section-clip",
  /** @type {"jutsuper-settings-openings-section"} */
  settingsOpeningsSection: "jutsuper-settings-openings-section",
  /** @type {"jutsuper-settings-openings-skip-order-selector"} */
  settingsOpeningsSkipOrderSelector: "jutsuper-settings-openings-skip-order-selector",
  /** @type {"jutsuper-settings-openings-skip-order-any"} */
  settingsOpeningsSkipOrderAny: "jutsuper-settings-openings-skip-order-any",
  /** @type {"jutsuper-settings-openings-skip-order-first"} */
  settingsOpeningsSkipOrderFirst: "jutsuper-settings-openings-skip-order-first",
  /** @type {"jutsuper-settings-openings-skip-order-last"} */
  settingsOpeningsSkipOrderLast: "jutsuper-settings-openings-skip-order-last",
  /** @type {"jutsuper-settings-endings-bar-label"} */
  settingsEndingsBarLabel: "jutsuper-settings-endings-bar-label",
  /** @type {"jutsuper-settings-endings-switch"} */
  settingsEndingsSwitch: "jutsuper-settings-endings-switch",
  /** @type {"jutsuper-settings-endings-slider"} */
  settingsEndingsSlider: "jutsuper-settings-endings-slider",
  /** @type {"jutsuper-settings-endings-bar-dropdown-icon"} */
  settingsEndingsBarDropdownIcon: "jutsuper-settings-endings-bar-dropdown-icon",
  /** @type {"jutsuper-settings-endings-section-clip"} */
  settingsEndingsSectionClip: "jutsuper-settings-endings-section-clip",
  /** @type {"jutsuper-settings-endings-section"} */
  settingsEndingsSection: "jutsuper-settings-endings-section",
  /** @type {"jutsuper-settings-endings-skip-order-selector"} */
  settingsEndingsSkipOrderSelector: "jutsuper-settings-endings-skip-order-selector",
  /** @type {"jutsuper-settings-endings-skip-order-any"} */
  settingsEndingsSkipOrderAny: "jutsuper-settings-endings-skip-order-any",
  /** @type {"jutsuper-settings-endings-skip-order-first"} */
  settingsEndingsSkipOrderFirst: "jutsuper-settings-endings-skip-order-first",
  /** @type {"jutsuper-settings-endings-skip-order-last"} */
  settingsEndingsSkipOrderLast: "jutsuper-settings-endings-skip-order-last",
  /** @type {"jutsuper-settings-endings-max-skips-positive-button"} */
  settingsEndingsMaxSkipsPositiveButton: "jutsuper-settings-endings-max-skips-positive-button",
  /** @type {"jutsuper-settings-endings-max-skips-field"} */
  settingsEndingsMaxSkipsField: "jutsuper-settings-endings-max-skips-field",
  /** @type {"jutsuper-settings-endings-max-skips-negative-button"} */
  settingsEndingsMaxSkipsNegativeButton: "jutsuper-settings-endings-max-skips-negative-button",
  /** @type {"jutsuper-settings-endings-fullscreen-switch"} */
  settingsEndingsFullscreenSwitch: "jutsuper-settings-endings-fullscreen-switch",
  /** @type {"jutsuper-settings-persist-fullscreen-slider"} */
  settingsPersistFullscreenSlider: "jutsuper-settings-persist-fullscreen-slider",
  /** @type {"jutsuper-settings-delay-slider"} */
  settingsDelaySlider: "jutsuper-settings-delay-slider",
  /** @type {"jutsuper-settings-delay-num"} */
  settingsDelayNum: "jutsuper-settings-delay-num",
  /** @type {"jutsuper-settings-cancel-key-listener"} */
  settingsCancelKeyListener: "jutsuper-settings-cancel-key-listener",
  /** @type {"jutsuper-settings-cancel-key-listener-rec-circle"} */
  settingsCancelKeyListenerRecCircle: "jutsuper-settings-cancel-key-listener-rec-circle",

  /** Skip */
  /** @type {"jutsuper-vjs-skip-area"} */
  vjsSkipArea: "jutsuper-vjs-skip-area",
  /** @type {"jutsuper-vjs-skip-clip-area"} */
  vjsSkipClipArea: "jutsuper-vjs-skip-clip-area",
  /** @type {"jutsuper-skip-root"} */
  skipRoot: "jutsuper-skip-root",
  /** @type {"jutsuper-skip-cancel-button"} */
  skipCancelButton: "jutsuper-skip-cancel-button",
  /** @type {"jutsuper-skip-key-label"} */
  skipKeyLabel: "jutsuper-skip-key-label",
  /** @type {"jutsuper-skip-countdown-line"} */
  skipCountdownLine: "jutsuper-skip-countdown-line"
}
/**
 * @typedef JutSuperDomIdsType
 * @property {"jutsuper-vjs-button"} vjsButton
 * @property {"jutsuper-vjs-button-icon"} vjsButtonIcon
 * @property {"jutsuper-dev-preload-message"} devPreloadMessage
 * @property {"jutsuper-vjs-container"} vjsContainer
 * @property {"jutsuper-vjs-settings-area"} vjsSettingsArea
 * @property {"jutsuper-vjs-settings-clip-area"} vjsSettingsClipArea
 * @property {"jutsuper-settings-root"} settingsRoot
 * @property {"jutsuper-settings-skip-header-icon"} settingsSkipHeaderIcon
 * @property {"jutsuper-settings-openings-bar-label"} settingsOpeningsBarLabel
 * @property {"jutsuper-settings-openings-switch"} settingsOpeningsSwitch
 * @property {"jutsuper-settings-openings-slider"} settingsOpeningsSlider
 * @property {"jutsuper-settings-openings-bar-dropdown-icon"} settingsOpeningsBarDropdownIcon
 * @property {"jutsuper-settings-openings-section-clip"} settingsOpeningsSectionClip
 * @property {"jutsuper-settings-openings-section"} settingsOpeningsSection
 * @property {"jutsuper-settings-openings-skip-order-selector"} settingsOpeningsSkipOrderSelector
 * @property {"jutsuper-settings-openings-skip-order-any"} settingsOpeningsSkipOrderAny
 * @property {"jutsuper-settings-openings-skip-order-first"} settingsOpeningsSkipOrderFirst
 * @property {"jutsuper-settings-openings-skip-order-last"} settingsOpeningsSkipOrderLast
 * @property {"jutsuper-settings-endings-bar-label"} settingsEndingsBarLabel
 * @property {"jutsuper-settings-endings-switch"} settingsEndingsSwitch
 * @property {"jutsuper-settings-endings-slider"} settingsEndingsSlider
 * @property {"jutsuper-settings-endings-bar-dropdown-icon"} settingsEndingsBarDropdownIcon
 * @property {"jutsuper-settings-endings-section-clip"} settingsEndingsSectionClip
 * @property {"jutsuper-settings-endings-section"} settingsEndingsSection
 * @property {"jutsuper-settings-endings-skip-order-selector"} settingsEndingsSkipOrderSelector
 * @property {"jutsuper-settings-endings-skip-order-any"} settingsEndingsSkipOrderAny
 * @property {"jutsuper-settings-endings-skip-order-first"} settingsEndingsSkipOrderFirst
 * @property {"jutsuper-settings-endings-skip-order-last"} settingsEndingsSkipOrderLast
 * @property {"jutsuper-settings-endings-max-skips-positive-button"} settingsEndingsMaxSkipsPositiveButton
 * @property {"jutsuper-settings-endings-max-skips-field"} settingsEndingsMaxSkipsField
 * @property {"jutsuper-settings-endings-max-skips-negative-button"} settingsEndingsMaxSkipsNegativeButton
 * @property {"jutsuper-settings-endings-fullscreen-switch"} settingsEndingsFullscreenSwitch
 * @property {"jutsuper-settings-persist-fullscreen-slider"} settingsPersistFullscreenSlider
 * @property {"jutsuper-settings-delay-slider"} settingsDelaySlider
 * @property {"jutsuper-settings-delay-num"} settingsDelayNum
 * @property {"jutsuper-settings-cancel-key-listener"} settingsCancelKeyListener
 * @property {"jutsuper-settings-cancel-key-listener-rec-circle"} settingsCancelKeyListenerRecCircle
 * @property {"jutsuper-vjs-skip-area"} vjsSkipArea
 * @property {"jutsuper-vjs-skip-clip-area"} vjsSkipClipArea
 * @property {"jutsuper-skip-root"} skipRoot
 * @property {"jutsuper-skip-cancel-button"} skipCancelButton
 * @property {"jutsuper-skip-key-label"} skipKeyLabel
 * @property {"jutsuper-skip-countdown-line"} skipCountdownLine
 *
 * @typedef {(
 *   "jutsuper-vjs-button" |
 *   "jutsuper-vjs-button-icon" |
 *   "jutsuper-dev-preload-message" |
 *   "jutsuper-vjs-container" |
 *   "jutsuper-vjs-settings-area" |
 *   "jutsuper-vjs-settings-clip-area" |
 *   "jutsuper-settings-root" |
 *   "jutsuper-settings-skip-header-icon" |
 *   "jutsuper-settings-openings-bar-label" |
 *   "jutsuper-settings-openings-switch" |
 *   "jutsuper-settings-openings-slider" |
 *   "jutsuper-settings-openings-bar-dropdown-icon" |
 *   "jutsuper-settings-openings-section-clip" |
 *   "jutsuper-settings-openings-section" |
 *   "jutsuper-settings-openings-skip-order-selector" |
 *   "jutsuper-settings-openings-skip-order-first" |
 *   "jutsuper-settings-openings-skip-order-last" |
 *   "jutsuper-settings-endings-bar-label" |
 *   "jutsuper-settings-endings-switch" |
 *   "jutsuper-settings-endings-slider" |
 *   "jutsuper-settings-endings-bar-dropdown-icon" |
 *   "jutsuper-settings-endings-section-clip" |
 *   "jutsuper-settings-endings-section" |
 *   "jutsuper-settings-endings-skip-order-selector" |
 *   "jutsuper-settings-endings-skip-order-first" |
 *   "jutsuper-settings-endings-skip-order-last" |
 *   "jutsuper-settings-endings-max-skips-positive-button" |
 *   "jutsuper-settings-endings-max-skips-field" |
 *   "jutsuper-settings-endings-max-skips-negative-button" |
 *   "jutsuper-settings-endings-fullscreen-switch" |
 *   "jutsuper-settings-persist-fullscreen-slider" |
 *   "jutsuper-settings-delay-slider" |
 *   "jutsuper-settings-delay-num" |
 *   "jutsuper-settings-cancel-key-listener" |
 *   "jutsuper-settings-cancel-key-listener-rec-circle" |
 *   "jutsuper-vjs-skip-area" |
 *   "jutsuper-vjs-skip-clip-area" |
 *   "jutsuper-skip-root" |
 *   "jutsuper-skip-cancel-button" |
 *   "jutsuper-skip-key-label" |
 *   "jutsuper-skip-countdown-line"
 * )} JutSuperDomIdsKeys
 */


/**
 * # CSS styles of this extension
 * 
 * @readonly
 * @enum {JutSuperDomClassesType}
 */
const JutSuperDomClasses = {
  /** Common */
  /** @type {"jutsuper-fullscreen"} */
  fullscreen: "jutsuper-fullscreen",
  /** @type {"jutsuper-top-index"} */
  topIndex: "jutsuper-top-index",
  /** @type {"jutsuper-visibility-hidden"} */
  visibilityHidden: "jutsuper-visibility-hidden",
  /** @type {"jutsuper-display-hidden"} */
  displayHidden: "jutsuper-display-hidden",
  /** @type {"jutsuper-no-pointer-events"} */
  noPointerEvents: "jutsuper-no-pointer-events",
  /** @type {"jutsuper-no-select"} */
  noSelect: "jutsuper-no-select",
  /** @type {"jutsuper-flex-float-to-right"} */
  flexFloatToRight: "jutsuper-flex-float-to-right",

  /** Dev */
  /** @type {"jutsuper-dev-black-bg"} */
  devBlackBg: "jutsuper-dev-black-bg",
  /** @type {"jutsuper-dev-hidden"} */
  devHidden: "jutsuper-dev-hidden",
  /** @type {"jutsuper-dev-settings-area"} */
  devSettingsArea: "jutsuper-dev-settings-area",
  /** @type {"jutsuper-dev-skip-area"} */
  devSkipArea: "jutsuper-dev-skip-area",

  /** Icons */
  /** @type {"jutsuper-icon-inset"} */
  iconInset: "jutsuper-icon-inset",
  /** @type {"jutsuper-icon-skip"} */
  iconSkip: "jutsuper-icon-skip",
  /** @type {"jutsuper-icon-dropdown"} */
  iconDropdown: "jutsuper-icon-dropdown",
  /** @type {"jutsuper-icon-order-any"} */
  iconOrderAny: "jutsuper-icon-order-any",
  /** @type {"jutsuper-icon-order-first"} */
  iconOrderFirst: "jutsuper-icon-order-first",
  /** @type {"jutsuper-icon-order-last"} */
  iconOrderLast: "jutsuper-icon-order-last",

  /** Animations */
  /** @type {"jutsuper-animate-y-appear"} */
  animateYAppear: "jutsuper-animate-y-appear",
  /** @type {"jutsuper-animate-bottom-to-top"} */
  animateBottomToTop: "jutsuper-animate-bottom-to-top",
  /** @type {"jutsuper-animate-top-to-bottom"} */
  animateTopToBottom: "jutsuper-animate-top-to-bottom",
  /** @type {"jutsuper-animate-small-top-to-bottom"} */
  animateSmallTopToBottom: "jutsuper-animate-small-top-to-bottom",
  /** @type {"jutsuper-animate-darker-to-dark-green-ht"} */
  animateDarkerToDarkGreenHt: "jutsuper-animate-darker-to-dark-green-ht",
  /** @type {"jutsuper-animate-opacity-1-to-0"} */
  animateOpacity1To0: "jutsuper-animate-opacity-1-to-0",

  /** VideoJS related */
  /** @type {"jutsuper-vjs-button"} */
  vjsButton: "jutsuper-vjs-button",
  /** @type {"jutsuper-vjs-container"} */
  vjsContainer: "jutsuper-vjs-container",
  /** @type {"jutsuper-vjs-popup-area"} */
  vjsPopupArea: "jutsuper-vjs-popup-area",
  /** @type {"jutsuper-vjs-popup-clip-area"} */
  vjsPopupClipArea: "jutsuper-vjs-popup-clip-area",
  /** @type {"jutsuper-vjs-skip-popup-area-sized"} */
  vjsSkipPopupAreaSized: "jutsuper-vjs-skip-popup-area-sized",
  /** @type {"jutsuper-vjs-skip-popup-area"} */
  vjsSkipPopupArea: "jutsuper-vjs-skip-popup-area",
  /** @type {"jutsuper-vjs-settings-popup-area-sized"} */
  vjsSettingsPopupAreaSized: "jutsuper-vjs-settings-popup-area-sized",
  /** @type {"jutsuper-vjs-settings-popup-area"} */
  vjsSettingsPopupArea: "jutsuper-vjs-settings-popup-area",

  /** Settings popup */
  /** @type {"jutsuper-settings-frame"} */
  settingsFrame: "jutsuper-settings-frame",
  /** @type {"jutsuper-settings-heading"} */
  settingsHeading: "jutsuper-settings-heading",
  /** @type {"jutsuper-settings-section-bar"} */
  settingsSectionBar: "jutsuper-settings-section-bar",
  /** @type {"jutsuper-settings-section-clip-area"} */
  settingsSectionClipArea: "jutsuper-settings-section-clip-area",
  /** @type {"jutsuper-settings-section-area"} */
  settingsSectionArea: "jutsuper-settings-section-area",
  /** @type {"jutsuper-settings-outer-section-area"} */
  settingsOuterSectionArea: "jutsuper-settings-outer-section-area",
  /** @type {"jutsuper-settings-dropdown-icon"} */
  settingsDropdownIcon: "jutsuper-settings-dropdown-icon",
  /** @type {"jutsuper-settings-grid-container"} */
  settingsGridContainer: "jutsuper-settings-grid-container",
  /** @type {"jutsuper-settings-grid-1-row"} */
  settingsGrid1Row: "jutsuper-settings-grid-1-row",
  /** @type {"jutsuper-settings-grid-2-rows"} */
  settingsGrid2Rows: "jutsuper-settings-grid-2-rows",
  /** @type {"jutsuper-settings-grid-3-rows"} */
  settingsGrid3Rows: "jutsuper-settings-grid-3-rows",
  /** @type {"jutsuper-settings-grid-2-cols"} */
  settingsGrid2Cols: "jutsuper-settings-grid-2-cols",
  /** @type {"jutsuper-settings-grid-3-cols"} */
  settingsGrid3Cols: "jutsuper-settings-grid-3-cols",
  /** @type {"jutsuper-settings-grid-4-cols"} */
  settingsGrid4Cols: "jutsuper-settings-grid-4-cols",

  /** Skip popup */
  /** @type {"jutsuper-skip-frame"} */
  skipFrame: "jutsuper-skip-frame",
  /** @type {"jutsuper-skip-frame-content"} */
  skipFrameContent: "jutsuper-skip-frame-content",
  /** @type {"jutsuper-skip-header"} */
  skipHeader: "jutsuper-skip-header",
  /** @type {"jutsuper-skip-options-container"} */
  skipOptionsContainer: "jutsuper-skip-options-container",
  /** @type {"jutsuper-skip-countdown-line"} */
  skipCountdownLine: "jutsuper-skip-countdown-line",

  /** Toggle slider */
  /** @type {"jutsuper-slider-switch"} */
  sliderSwitch: "jutsuper-slider-switch",
  /** @type {"jutsuper-slider-bg-area"} */
  sliderBgArea: "jutsuper-slider-bg-area",

  /** Range slider */
  /** @type {"jutsuper-range"} */
  range: "jutsuper-range",

  /** Radio buttons */
  /** @type {"jutsuper-radio-container"} */
  radioContainer: "jutsuper-radio-container",
  /** @type {"jutsuper-radio"} */
  radio: "jutsuper-radio",

  /** Basic button */
  /** @type {"jutsuper-button"} */
  button: "jutsuper-button",

  /** REC icon */
  /** @type {"jutsuper-record-icon"} */
  recordIcon: "jutsuper-record-icon",

  /** Key label */
  /** @type {"jutsuper-key-label"} */
  keyLabel: "jutsuper-key-label",

  /** Text */
  /** @type {"jutsuper-text-skip-options"} */
  textSkipOptions: "jutsuper-text-skip-options",
  /** @type {"jutsuper-text-openings"} */
  textOpenings: "jutsuper-text-openings",
  /** @type {"jutsuper-text-endings"} */
  textEndings: "jutsuper-text-endings",
  /** @type {"jutsuper-text-order"} */
  textOrder: "jutsuper-text-order",
  /** @type {"jutsuper-text-max"} */
  textMax: "jutsuper-text-max",
  /** @type {"jutsuper-text-fullscreen"} */
  textFullscreen: "jutsuper-text-fullscreen",
  /** @type {"jutsuper-text-delay"} */
  textDelay: "jutsuper-text-delay",
  /** @type {"jutsuper-text-seconds-short"} */
  textSecondsShort: "jutsuper-text-seconds-short",
  /** @type {"jutsuper-text-cancel"} */
  textCancel: "jutsuper-text-cancel",
  /** @type {"jutsuper-text-to-cancel"} */
  textToCancel: "jutsuper-text-to-cancel",
  /** @type {"jutsuper-text-skipping"} */
  textSkipping: "jutsuper-text-skipping",
}
/**
 * @typedef JutSuperDomClassesType
 * @property {"jutsuper-fullscreen"} fullscreen
 * @property {"jutsuper-top-index"} topIndex
 * @property {"jutsuper-visibility-hidden"} visibilityHidden
 * @property {"jutsuper-display-hidden"} displayHidden
 * @property {"jutsuper-no-pointer-events"} noPointerEvents
 * @property {"jutsuper-no-select"} noSelect
 * @property {"jutsuper-flex-float-to-right"} flexFloatToRight
 * @property {"jutsuper-dev-black-bg"} devBlackBg
 * @property {"jutsuper-dev-hidden"} devHidden
 * @property {"jutsuper-dev-settings-area"} devSettingsArea
 * @property {"jutsuper-dev-skip-area"} devSkipArea
 * @property {"jutsuper-icon-inset"} iconInset
 * @property {"jutsuper-icon-skip"} iconSkip
 * @property {"jutsuper-icon-dropdown"} iconDropdown
 * @property {"jutsuper-icon-order-any"} iconOrderAny
 * @property {"jutsuper-icon-order-first"} iconOrderFirst
 * @property {"jutsuper-icon-order-last"} iconOrderLast
 * @property {"jutsuper-animate-y-appear"} animateYAppear
 * @property {"jutsuper-animate-bottom-to-top"} animateBottomToTop
 * @property {"jutsuper-animate-top-to-bottom"} animateTopToBottom
 * @property {"jutsuper-animate-small-top-to-bottom"} animateSmallTopToBottom
 * @property {"jutsuper-animate-darker-to-dark-green-ht"} animateDarkerToDarkGreenHt
 * @property {"jutsuper-animate-opacity-1-to-0"} animateOpacity1To0
 * @property {"jutsuper-vjs-button"} vjsButton
 * @property {"jutsuper-vjs-container"} vjsContainer
 * @property {"jutsuper-vjs-popup-area"} vjsPopupArea
 * @property {"jutsuper-vjs-popup-clip-area"} vjsPopupClipArea
 * @property {"jutsuper-vjs-skip-popup-area-sized"} vjsSkipPopupAreaSized
 * @property {"jutsuper-vjs-skip-popup-area"} vjsSkipPopupArea
 * @property {"jutsuper-vjs-settings-popup-area-sized"} vjsSettingsPopupAreaSized
 * @property {"jutsuper-vjs-settings-popup-area"} vjsSettingsPopupArea
 * @property {"jutsuper-settings-frame"} settingsFrame
 * @property {"jutsuper-settings-heading"} settingsHeading
 * @property {"jutsuper-settings-section-bar"} settingsSectionBar
 * @property {"jutsuper-settings-section-clip-area"} settingsSectionClipArea
 * @property {"jutsuper-settings-section-area"} settingsSectionArea
 * @property {"jutsuper-settings-outer-section-area"} settingsOuterSectionArea
 * @property {"jutsuper-settings-dropdown-icon"} settingsDropdownIcon
 * @property {"jutsuper-settings-grid-container"} settingsGridContainer
 * @property {"jutsuper-settings-grid-1-row"} settingsGrid1Row
 * @property {"jutsuper-settings-grid-2-rows"} settingsGrid2Rows
 * @property {"jutsuper-settings-grid-3-rows"} settingsGrid3Rows
 * @property {"jutsuper-settings-grid-2-cols"} settingsGrid2Cols
 * @property {"jutsuper-settings-grid-3-cols"} settingsGrid3Cols
 * @property {"jutsuper-settings-grid-4-cols"} settingsGrid4Cols
 * @property {"jutsuper-skip-frame"} skipFrame
 * @property {"jutsuper-skip-frame-content"} skipFrameContent
 * @property {"jutsuper-skip-header"} skipHeader
 * @property {"jutsuper-skip-options-container"} skipOptionsContainer
 * @property {"jutsuper-skip-countdown-line"} skipCountdownLine
 * @property {"jutsuper-slider-switch"} sliderSwitch
 * @property {"jutsuper-slider-bg-area"} sliderBgArea
 * @property {"jutsuper-range"} range
 * @property {"jutsuper-radio-container"} radioContainer
 * @property {"jutsuper-radio"} radio
 * @property {"jutsuper-button"} button
 * @property {"jutsuper-record-icon"} recordIcon
 * @property {"jutsuper-key-label"} keyLabel
 * @property {"jutsuper-text-skip-options"} textSkipOptions
 * @property {"jutsuper-text-openings"} textOpenings
 * @property {"jutsuper-text-endings"} textEndings
 * @property {"jutsuper-text-order"} textOrder
 * @property {"jutsuper-text-max"} textMax
 * @property {"jutsuper-text-fullscreen"} textFullscreen
 * @property {"jutsuper-text-delay"} textDelay
 * @property {"jutsuper-text-seconds-short"} textSecondsShort
 * @property {"jutsuper-text-cancel"} textCancel
 * @property {"jutsuper-text-to-cancel"} textToCancel
 * @property {"jutsuper-text-skipping"} textSkipping
 *
 * @typedef {(
 *   "jutsuper-fullscreen" |
 *   "jutsuper-top-index" |
 *   "jutsuper-visibility-hidden" |
 *   "jutsuper-display-hidden" |
 *   "jutsuper-no-pointer-events" |
 *   "jutsuper-no-select" |
 *   "jutsuper-flex-float-to-right" |
 *   "jutsuper-dev-black-bg" |
 *   "jutsuper-dev-hidden" |
 *   "jutsuper-dev-settings-area" |
 *   "jutsuper-dev-skip-area" |
 *   "jutsuper-icon-inset" |
 *   "jutsuper-icon-skip" |
 *   "jutsuper-icon-dropdown" |
 *   "jutsuper-icon-order-any" |
 *   "jutsuper-icon-order-first" |
 *   "jutsuper-icon-order-last" |
 *   "jutsuper-animate-y-appear" |
 *   "jutsuper-animate-bottom-to-top" |
 *   "jutsuper-animate-top-to-bottom" |
 *   "jutsuper-animate-small-top-to-bottom" |
 *   "jutsuper-animate-darker-to-dark-green-ht" |
 *   "jutsuper-animate-opacity-1-to-0" |
 *   "jutsuper-vjs-button" |
 *   "jutsuper-vjs-container" |
 *   "jutsuper-vjs-popup-area" |
 *   "jutsuper-vjs-popup-clip-area" |
 *   "jutsuper-vjs-skip-popup-area-sized" |
 *   "jutsuper-vjs-skip-popup-area" |
 *   "jutsuper-vjs-settings-popup-area-sized" |
 *   "jutsuper-vjs-settings-popup-area" |
 *   "jutsuper-settings-frame" |
 *   "jutsuper-settings-heading" |
 *   "jutsuper-settings-section-bar" |
 *   "jutsuper-settings-section-clip-area" |
 *   "jutsuper-settings-section-area" |
 *   "jutsuper-settings-outer-section-area" |
 *   "jutsuper-settings-dropdown-icon" |
 *   "jutsuper-settings-grid-container" |
 *   "jutsuper-settings-grid-1-row" |
 *   "jutsuper-settings-grid-2-rows" |
 *   "jutsuper-settings-grid-3-rows" |
 *   "jutsuper-settings-grid-2-cols" |
 *   "jutsuper-settings-grid-3-cols" |
 *   "jutsuper-settings-grid-4-cols" |
 *   "jutsuper-skip-frame" |
 *   "jutsuper-skip-frame-content" |
 *   "jutsuper-skip-header" |
 *   "jutsuper-skip-options-container" |
 *   "jutsuper-skip-countdown-line" |
 *   "jutsuper-slider-switch" |
 *   "jutsuper-slider-bg-area" |
 *   "jutsuper-range" |
 *   "jutsuper-radio-container" |
 *   "jutsuper-radio" |
 *   "jutsuper-button" |
 *   "jutsuper-record-icon" |
 *   "jutsuper-key-label" |
 *   "jutsuper-text-skip-options" |
 *   "jutsuper-text-openings" |
 *   "jutsuper-text-endings" |
 *   "jutsuper-text-order" |
 *   "jutsuper-text-max" |
 *   "jutsuper-text-fullscreen" |
 *   "jutsuper-text-delay" |
 *   "jutsuper-text-seconds-short" |
 *   "jutsuper-text-cancel" |
 *   "jutsuper-text-to-cancel" |
 *   "jutsuper-text-skipping"
 * )} JutSuperDomClassesKeys
 */


/**
 * # Names used by <input> elements in the extension's HTML
 * 
 * @readonly
 * @enum {JutSuperInputNamesType}
 */
const JutSuperInputNames = {
  /** @type {"jutsuper-settings-bar"} */
  settingsBar: "jutsuper-settings-bar",
  /** @type {"jutsuper-settings-op-skip-order"} */
  settingsOpSkipOrder: "jutsuper-settings-op-skip-order",
  /** @type {"jutsuper-settings-ed-skip-order"} */
  settingsEdSkipOrder: "jutsuper-settings-ed-skip-order",
}
/**
 * @typedef JutSuperInputNamesType
 * @property {"jutsuper-settings-bar"} settingsBar
 * @property {"jutsuper-settings-op-skip-order"} settingsOpSkipOrder
 * @property {"jutsuper-settings-ed-skip-order"} settingsEdSkipOrder
 * 
 * @typedef {(
 *   "jutsuper-settings-bar" |
 *   "jutsuper-settings-op-skip-order" |
 *   "jutsuper-settings-ed-skip-order"
 * )} JutSuperInputNamesKeys
*/


/**
 * # Fonts to be injected into the page
 * 
 * @readonly
 * @type {FontDescriptor[]}
 */
const JutSuperDefaultFonts = [
  {
    family: "Roboto",
    path: "/src/assets/font/Roboto-Regular.ttf",
    format: "truetype",
    weight: "normal"
  },
  {
    family: "Roboto",
    path: "/src/assets/font/Roboto-Bold.ttf",
    format: "truetype",
    weight: "bold"
  }
]
/**
 * @typedef FontDescriptor
 * @property {string} family
 * @property {string} path
 * @property {(
 *   "collection" | "embedded-opentype" |
 *   "opentype" | "svg" |
 *   "truetype" | "woff" |
 *   "woff2"
 * )} format
 * @property {(
 *   "normal" | "bold" |
 *   "100" | "200" |
 *   "300" | "400" |
 *   "500" | "600" |
 *   "700" | "800" |
 *   "900"
 * )} weight
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
  /** @type {"jutsuper-settings-ipc"} */
  settingsTag: "jutsuper-settings-ipc",
  /** @type {"jutsuper-settings-ipc"} */
  settingsId: "jutsuper-settings-ipc"
}
/** 
 * @typedef JutSuperIpcDefaultNodePropsType
 * @property {"jutsuper-ipc"} tag
 * @property {"jutsuper-ipc"} id
 * @property {"jutsuper-settings-ipc"} settingsTag
 * @property {"jutsuper-settings-ipc"} settingsId
 * 
 * @typedef {(
 *   "jutsuper-ipc" |
 *   "jutsuper-settings-ipc"
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
   * # Request window state from a background script
   * 
   * ## Possible values
   * @see {JutSuperIpcAwaitStatesKeys}
   * @see {BrowserWindowStatesKeys}
   *
   * @type {"data-window-state"}
   */
  windowState: "data-window-state",
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
   * @see {JutSuperIpcAwaitStatesKeys}
   *
   * @type {"data-inject-custom-fullscreen-exit"}
   */
  injectCustomFullscreenExit: "data-inject-custom-fullscreen-exit",
  /**
   * # Is episode switch allowed (is is limited by `endings.maxSkips`)
   * 
   * ## Possible values
   * @see {JutSuperIpcAwaitStates}
   * @see {boolean}
   * 
   * @type {"data-is-episode-switch-allowed"}
   */
  isEpisodeSwitchAllowed: "data-is-episode-switch-allowed",
  /**
   * # Invoke initialization of extension content locale
   * 
   * ## Possible values
   * @see {JutSuperIpcAwaitStates}
   * 
   * @type {"data-locale-initialization-control"}
   */
  localeInitializationControl: "data-locale-initialization-control"
}
/** 
 * @typedef JutSuperIpcKeysType
 * @property {"data-essentials-loading-state"} essentialsLoadingState
 * @property {"data-is-fullscreen"} isFullscreen
 * @property {"data-window-state"} windowState
 * @property {"data-fullscreen-control"} fullscreenControl
 * @property {"data-playing-control"} playingControl
 * @property {"data-episode-switch-prep"} episodeSwitchPrep
 * @property {"data-is-episode-switched-automatically"} isEpisodeSwitchedAutomatically
 * @property {"data-inject-custom-fullscreen-exit"} injectCustomFullscreenExit
 * @property {"data-is-episode-switch-allowed"} isEpisodeSwitchAllowed
 * @property {"data-locale-initialization-control"} localeInitializationControl
 * 
 * @typedef {(
 *   "data-essentials-loading-state" |
 *   "data-is-fullscreen" |
 *   "data-fullscreen-control" |
 *   "data-playing-control" |
 *   "data-episode-switch-prep" |
 *   "data-is-episode-switched-automatically" |
 *   "data-inject-custom-fullscreen-exit" |
 *   "data-max-continuous-episode-switches" |
 *   "data-is-episode-switch-allowed" |
 *   "data-locale-initialization-control"
 * )} JutSuperIpcKeysKeys
 */


/**
 * # Describes keys used in settings' IPC
 * @readonly
 * @enum {JutSuperIpcSettingsKeysType}
 */
const JutSuperIpcSettingsKeys = {
  /** @type {"data-openings-do-skip"} */
  openingsDoSkip: "data-openings-do-skip",
  /** @type {"data-openings-skip-order"} */
  openingsSkipOrder: "data-openings-skip-order",
  /** @type {"data-endings-do-skip"} */
  endingsDoSkip: "data-endings-do-skip",
  /** @type {"data-endings-skip-order"} */
  endingsSkipOrder: "data-endings-skip-order",
  /** @type {"data-endings-max-skips"} */
  endingsMaxSkips: "data-endings-max-skips",
  /** @type {"data-endings-do-persist-fullscreen"} */
  endingsDoPersistFullscreen: "data-endings-do-persist-fullscreen",
  /** @type {"data-skip-delay-s"} */
  skipDelayS: "data-skip-delay-s",
  /** @type {"data-skip-cancel-key"} */
  skipCancelKey: "data-skip-cancel-key"
}
/**
 * @typedef JutSuperIpcSettingsKeysType
 * @property {"data-openings-do-skip"} openingsDoSkip
 * @property {"data-openings-skip-order"} openingsSkipOrder
 * @property {"data-endings-do-skip"} endingsDoSkip
 * @property {"data-endings-skip-order"} endingsSkipOrder
 * @property {"data-endings-max-skips"} endingsMaxSkips
 * @property {"data-endings-do-persist-fullscreen"} endingsDoPersistFullscreen
 * @property {"data-skip-delay-s"} skipDelayS
 * @property {"data-skip-cancel-key"} skipCancelKey
 *
 * @typedef {(
 *   "data-openings-do-skip" |
 *   "data-openings-skip-order" |
 *   "data-endings-do-skip" |
 *   "data-endings-skip-order" |
 *   "data-endings-max-skips" |
 *   "data-endings-do-persist-fullscreen" |
 *   "data-skip-delay-s" |
 *   "data-skip-cancel-key"
 * )} JutSuperIpcSettingsKeysKeys
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
  /** @type {"rejected"} */
  rejected: "rejected",
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
 * @property {"rejected"} rejected
 * @property {"paused"} paused
 * @property {"continuation"} continuation
 * @property {"completed"} completed
 * 
 * @typedef {(
 *   "idle" |
 *   "request" |
 *   "awaiting" |
 *   "aborted" |
 *   "rejected" |
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
  /**
   * # Denotes value requests
   * @type {"requests"}
   */
  requests: "requests",
}
/** 
 * @typedef JutSuperMessagingMessageKeysType
 * @property {"actions"} actions
 * @property {"requests"} requests
 * 
 * @typedef {(
 *   "actions" |
 *   "requests"
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


/**
 * # Describes `requests` keys in a request message in internal messaging
 * @readonly
 * @enum {JutSuperMessagingMessageRequestsRequestKeysType}
 */
const JutSuperMessagingMessageRequestsRequestKeys = {
  /**
   * # Gets the current window state
   * @type {"getWindowState"}
   */
  getWindowState: "getWindowState",
}
/** 
 * @typedef JutSuperMessagingMessageRequestsRequestKeysType
 * @property {"getWindowState"} getWindowState
 * 
 * @typedef {(
 *   "getWindowState"
 * )} JutSuperMessagingMessageRequestsRequestKeysKeys
 */


/**
 * # Describes `requests` keys in a response message in internal messaging
 * @readonly
 * @enum {JutSuperMessagingMessageRequestsResponseKeysType}
 */
const JutSuperMessagingMessageRequestsResponseKeys = {
  /**
   * # Denotes the current window state
   * @type {"windowState"}
   */
  windowState: "windowState",
}
/** 
 * @typedef JutSuperMessagingMessageRequestsResponseKeysType
 * @property {"windowState"} windowState
 * 
 * @typedef {(
 *   "windowState"
 * )} JutSuperMessagingMessageRequestsResponseKeysKeys
 */


/**
 * # Names for key codes
 * @readonly
 * @enum {JutSuperKeyCodeLabelOverridesType}
 */
const JutSuperKeyCodeLabelOverrides = {}
JutSuperKeyCodeLabelOverrides["Escape"] = "Esc";
JutSuperKeyCodeLabelOverrides["ScrollLock"] = "ScrLock";
JutSuperKeyCodeLabelOverrides["Backspace"] = "Bksp";
JutSuperKeyCodeLabelOverrides["PageUp"] = "PgUp";
JutSuperKeyCodeLabelOverrides["PageDown"] = "PgDown";
JutSuperKeyCodeLabelOverrides[" "] = "Space";
JutSuperKeyCodeLabelOverrides["Control"] = "Ctrl";
JutSuperKeyCodeLabelOverrides["CapsLock"] = "Caps";
JutSuperKeyCodeLabelOverrides["ArrowLeft"] = "Left";
JutSuperKeyCodeLabelOverrides["ArrowRight"] = "Right";
JutSuperKeyCodeLabelOverrides["ArrowUp"] = "Up";
JutSuperKeyCodeLabelOverrides["ArrowDown"] = "Down";
JutSuperKeyCodeLabelOverrides["ContextMenu"] = "Ctx";
JutSuperKeyCodeLabelOverrides["Unidentified"] = "Null";
/** 
 * @typedef {Record<string, string>} JutSuperKeyCodeLabelOverridesType
 * @typedef {string} JutSuperKeyCodeLabelOverridesKeys
*/
