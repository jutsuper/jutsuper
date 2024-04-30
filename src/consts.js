/**
 * fuck this JSDoc verbosity,
 * no idea how to make it more compact
 * and preserve good annotations everywhere
 */


export {
  ANY,
  JutSuFunctions,
  JutSuDomIds,
  JutSuDomClasses,
  JutSuperLogLevels,
  JutSuperLogDefaults,
  JutSuperAssetIds,
  JutSuperAssetPaths,
  JutSuperDomIds,
  JutSuperDomClasses,
  JutSuperInputNames,
  JutSuperDefaultFonts,
  JutSuperIpcJsDataTypes,
  JutSuperIpcJsDataTypesArray,
  JutSuperIpcIds,
  JutSuperIpcKeys,
  JutSuperIpcSettingsKeys,
  JutSuperIpcLoadingStates,
  JutSuperIpcAwaitStates,
  JutSuperIpcBoolRequestStates,
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
 * # A wildcard for matching any value
 * 
 * @type {"*"}
 */
const ANY = "*";


/**
 * # Describes exposed function names on `jut.su`
 * 
 * These functions are part
 * of the `window` object
 * 
 * @readonly
 * @enum {typeof JutSuFunctions}
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
 * @typedef {(
 *   typeof JutSuFunctions[keyof typeof JutSuFunctions]
 * )} JutSuFunctionsKeys
 */


/**
 * # Describes IDs of nodes on `jut.su`
 * 
 * @readonly
 * @enum {typeof JutSuDomIds}
 */
const JutSuDomIds = {
  /** @type {"my-player"} */
  myPlayer: "my-player"
}
/**
 * @typedef {(
 *   typeof JutSuDomIds[keyof typeof JutSuDomIds]
 * )} JutSuDomIdsKeys
 */


/**
 * # Describes classes of nodes on `jut.su`
 * 
 * @readonly
 * @enum {typeof JutSuDomClasses}
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
 * @typedef {(
 *   typeof JutSuDomClasses[keyof typeof JutSuDomClasses]
 * )} JutSuDomClassesKeys
 */


/**
 * # Describes available logging levels
 * @readonly
 * @enum {typeof JutSuperLogLevels}
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
 * @typedef {(
 *   typeof JutSuperLogLevels[keyof typeof JutSuperLogLevels]
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
 * @enum {typeof JutSuperLogDefaults}
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
 * # Describes IDs of public assets used by this extension
 * 
 * Content script injects this extension's
 * assets into the page and gives these
 * IDs to them.
 * 
 * Used for easier DOM queries in the code.
 * 
 * @readonly
 * @enum {typeof JutSuperAssetIds}
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
 * @typedef {(
 *   typeof JutSuperAssetIds[keyof typeof JutSuperAssetIds]
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
 * @enum {typeof JutSuperAssetPaths}
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
  /** @type {"/src/jutsuper.css"} */
  jutsuperCss: "/src/jutsuper.css",
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
 * @typedef {(
 *   typeof JutSuperAssetPaths[keyof typeof JutSuperAssetPaths]
 * )} JutSuperAssetPathsKeys
 */


/**
 * # Describes IDs of DOM elements created and accessed by this extension
 * 
 * Used for easier DOM queries in the code.
 * 
 * @readonly
 * @enum {typeof JutSuperDomIds}
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
 * @typedef {(
 *   typeof JutSuperDomIds[keyof typeof JutSuperDomIds]
 * )} JutSuperDomIdsKeys
 */


/**
 * # CSS styles of this extension
 * 
 * @readonly
 * @enum {typeof JutSuperDomClasses}
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
  /** @type {"jutsuper-animate-dark-to-darker-green-ht"} */
  animateDarkToDarkerGreenHt: "jutsuper-animate-dark-to-darker-green-ht",
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

  /** Tooltips */
  /** @type {"jutsuper-tooltip-openings-settings"} */
  tooltipOpeningsSettings: "jutsuper-tooltip-openings-settings",
  /** @type {"jutsuper-tooltip-toggle-openings-skip"} */
  tooltipToggleOpeningsSkip: "jutsuper-tooltip-toggle-openings-skip",
  /** @type {"jutsuper-tooltip-which-region-to-skip"} */
  tooltipWhichRegionToSkip: "jutsuper-tooltip-which-region-to-skip",
  /** @type {"jutsuper-tooltip-skip-any-region"} */
  tooltipSkipAnyRegion: "jutsuper-tooltip-skip-any-region",
  /** @type {"jutsuper-tooltip-skip-first-region"} */
  tooltipSkipFirstRegion: "jutsuper-tooltip-skip-first-region",
  /** @type {"jutsuper-tooltip-skip-last-region"} */
  tooltipSkipLastRegion: "jutsuper-tooltip-skip-last-region",
  /** @type {"jutsuper-tooltip-endings-settings"} */
  tooltipEndingsSettings: "jutsuper-tooltip-endings-settings",
  /** @type {"jutsuper-tooltip-toggle-endings-skip"} */
  tooltipToggleEndingsSkip: "jutsuper-tooltip-toggle-endings-skip",
  /** @type {"jutsuper-tooltip-max-episode-switches"} */
  tooltipMaxEpisodeSwitches: "jutsuper-tooltip-max-episode-switches",
  /** @type {"jutsuper-tooltip-persist-fullscreen"} */
  tooltipPersistFullscreen: "jutsuper-tooltip-persist-fullscreen",
  /** @type {"jutsuper-tooltip-toggle-fullscreen-persistency"} */
  tooltipToggleFullscreenPersistency: "jutsuper-tooltip-toggle-fullscreen-persistency",
  /** @type {"jutsuper-tooltip-delay-before-skipping"} */
  tooltipDelayBeforeSkipping: "jutsuper-tooltip-delay-before-skipping",
  /** @type {"jutsuper-tooltip-key-to-cancel-skipping"} */
  tooltipKeyToCancelSkipping: "jutsuper-tooltip-key-to-cancel-skipping",
  /** @type {"jutsuper-tooltip-set-cancel-key"} */
  tooltipSetCancelKey: "jutsuper-tooltip-set-cancel-key"
}
/**
 * @typedef {(
 *   typeof JutSuperDomClasses[keyof typeof JutSuperDomClasses]
 * )} JutSuperDomClassesKeys
 */


/**
 * # Names used by <input> elements in the extension's HTML
 * 
 * @readonly
 * @enum {typeof JutSuperInputNames}
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
 * @typedef {(
 *   typeof JutSuperInputNames[keyof typeof JutSuperInputNames]
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
 * # Describes data types of values in IPC
 * @readonly
 * @enum {typeof JutSuperIpcJsDataTypes}
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
 * @typedef {(
 *   typeof JutSuperIpcJsDataTypes[keyof typeof JutSuperIpcJsDataTypes]
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
 * @enum {typeof JutSuperIpcIds}
 */
const JutSuperIpcIds = {
  /** @type {"pageMain"} */
  page: "pageMain",
  /** @type {"contentMain"} */
  content: "contentMain"
}
/** 
 * @typedef {(
 *   typeof JutSuperIpcIds[keyof typeof JutSuperIpcIds]
 * )} JutSuperIpcIdsKeys
 */


/**
 * # Describes keys used in IPC
 * @readonly
 * @enum {typeof JutSuperIpcKeys}
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
 * @typedef {(
 *   typeof JutSuperIpcKeys[keyof typeof JutSuperIpcKeys]
 * )} JutSuperIpcKeysKeys
 */


/**
 * # Describes keys used in settings' IPC
 * @readonly
 * @enum {typeof JutSuperIpcSettingsKeys}
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
 * @typedef {(
 *   typeof JutSuperIpcSettingsKeys[keyof typeof JutSuperIpcSettingsKeys]
 * )} JutSuperIpcSettingsKeysKeys
 */


/**
 * # Describes states of loading in IPC
 * @readonly
 * @enum {typeof JutSuperIpcLoadingStates}
 */
const JutSuperIpcLoadingStates = {
  /** @type {"loading"} */
  loading: "loading",
  /** @type {"loaded"} */
  loaded: "loaded",
}
/** 
 * @typedef {(
 *   typeof JutSuperIpcLoadingStates[keyof typeof JutSuperIpcLoadingStates]
 * )} JutSuperIpcLoadingStatesKeys
 */


/**
 * # Describes states of awaiting in IPC
 * @readonly
 * @enum {typeof JutSuperIpcAwaitStates}
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
 * @typedef {(
 *   typeof JutSuperIpcAwaitStates[keyof typeof JutSuperIpcAwaitStates]
 * )} JutSuperIpcAwaitStatesKeys
 */


/**
 * # Describes states of awaiting in IPC
 * @readonly
 * @enum {typeof JutSuperIpcBoolRequestStates}
 */
const JutSuperIpcBoolRequestStates = {
  /** @type {"requestTrue"} */
  requestTrue: "requestTrue",
  /** @type {"requestFalse"} */
  requestFalse: "requestFalse"
}
/** 
 * @typedef {(
 *   typeof JutSuperIpcBoolRequestStates[keyof typeof JutSuperIpcBoolRequestStates]
 * )} JutSuperIpcBoolRequestStatesKeys
 */


/**
 * # Describes message keys in internal messaging
 * @readonly
 * @enum {typeof JutSuperMessagingMessageKeys}
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
 * @typedef {(
 *   typeof JutSuperMessagingMessageKeys[keyof typeof JutSuperMessagingMessageKeys]
 * )} JutSuperMessagingMessageKeysKeys
 */


/**
 * # Describes `actions` keys in internal messaging
 * @readonly
 * @enum {typeof JutSuperMessagingMessageActionsKeys}
 */
const JutSuperMessagingMessageActionsKeys = {
  /**
   * # Denotes the fullscreen state
   * @type {"fullscreenState"}
   */
  fullscreenState: "fullscreenState",
  /**
   * # Denotes the original window state to restore it
   * @type {"originalWindowState"}
   */
  originalWindowState: "originalWindowState"
}
/** 
 * @typedef {(
 *   typeof JutSuperMessagingMessageActionsKeys[keyof typeof JutSuperMessagingMessageActionsKeys]
 * )} JutSuperMessagingMessageActionsKeysKeys
 */


/**
 * # Describes `requests` keys in a request message in internal messaging
 * @readonly
 * @enum {typeof JutSuperMessagingMessageRequestsRequestKeys}
 */
const JutSuperMessagingMessageRequestsRequestKeys = {
  /**
   * # Gets the current window state
   * @type {"getWindowState"}
   */
  getWindowState: "getWindowState",
}
/** 
 * @typedef {(
 *   typeof JutSuperMessagingMessageRequestsRequestKeys[keyof typeof JutSuperMessagingMessageRequestsRequestKeys]
 * )} JutSuperMessagingMessageRequestsRequestKeysKeys
 */


/**
 * # Describes `requests` keys in a response message in internal messaging
 * @readonly
 * @enum {typeof JutSuperMessagingMessageRequestsResponseKeys}
 */
const JutSuperMessagingMessageRequestsResponseKeys = {
  /**
   * # Denotes the current window state
   * @type {"windowState"}
   */
  windowState: "windowState",
}
/** 
 * @typedef {(
 *   typeof JutSuperMessagingMessageRequestsResponseKeys[keyof typeof JutSuperMessagingMessageRequestsResponseKeys]
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
