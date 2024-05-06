console.debug("JutSuper: loading /src/content/content.js");


// #if "@BROWSER" == "blink"
var BROWSER = "blink";
var browser = chrome;
// #elif "@BROWSER" == "gecko"
var BROWSER = "gecko";
// #else
// #error
// #endif


/**
 * @typedef {typeof import("/src/consts.js").ANY} ANY
 * @type {ANY}
 */
var ANY;

/**
 * @typedef {import("/src/error.js").JutSuperErrors} JutSuperErrors
 * @type {JutSuperErrors}
 */
var jsuperErrors;

/**
 * @typedef {import("/src/log.js").JutSuperLog} JutSuperLog
 * @type {JutSuperLog}
 */
var jsuperLog;

/**
 * @typedef {typeof import("/src/util.js").jsuperUtil} JutSuperUtil
 * @type {JutSuperUtil}
 */
var jsuperUtil;

/**
 * @typedef {import("/src/consts.js").JutSuperDomIds} JutSuperDomIds
 * @type {JutSuperDomIds}
 */
var domIds;

/**
 * @typedef {import("/src/consts.js").JutSuperDomClasses} JutSuperDomClasses
 * @type {JutSuperDomClasses}
 */
var domClasses;

/**
 * @typedef {import("/src/consts.js").FontDescriptor} FontDescriptor
 * @type {FontDescriptor[]}
 */
var defaultFonts;

/**
 * @typedef {import("/src/consts.js").JutSuDomIds} JutSuDomIds
 * @type {JutSuDomIds}
 */
var jutsuIds;

/**
 * @typedef {import("/src/consts.js").JutSuDomClasses} JutSuDomClasses
 * @type {JutSuDomClasses}
 */
var jutsuClasses;

/**
 * @typedef {import("/src/ipc.js").JutSuperIpcFlags} JutSuperIpcFlags
 * @type {JutSuperIpcFlags}
 */
var ipcFlags;

/**
 * @typedef {import("/src/ipc.js").JutSuperIpcNamespaces} JutSuperIpcNamespaces
 * @type {JutSuperIpcNamespaces}
 */
var ipcNamespaces;

/**
 * @typedef {import("/src/consts.js").JutSuperIpcIds} JutSuperIpcIds
 * @type {JutSuperIpcIds}
 */
var ipcIds;

/**
 * @typedef {import("/src/consts.js").JutSuperAssetPaths} JutSuperAssetPaths
 * @type {JutSuperAssetPaths}
 */
var assetPaths;

/**
 * @typedef {import("/src/consts.js").JutSuperAssetIds} JutSuperAssetIds
 * @type {JutSuperAssetIds}
 */
var assetIds;


/**
 * @typedef {import("/src/browser.js").BrowserWindowStates} BrowserWindowStates
 * @type {BrowserWindowStates}
 */
var windowStates;

/**
 * @typedef {import("/src/lock.js").AsyncLock} AsyncLock
 * @type {typeof import("/src/lock.js").AsyncLock}
 */
var AsyncLock;

/**
 * @typedef {import("/src/ipc.js").JutSuperIpcBuilder} JutSuperIpcBuilder
 * @type {typeof import("/src/ipc.js").JutSuperIpcBuilder}
 */
var JutSuperIpcBuilder;

/**
 * @template ReqSchema
 * @template RspSchema
 * @template RspFilter
 * @typedef {import("/src/ipc.js").JutSuperIpc<ReqSchema, RspSchema, RspFilter>} JutSuperIpc<ReqSchema, RspSchema, RspFilter>
 * @type {typeof import("/src/ipc.js").JutSuperIpc}
 */
var JutSuperIpc;

/**
 * @template Schema
 * @typedef {import("/src/ipc.js").JutSuperIpcRspParamsBuilder<Schema>} JutSuperIpcRspParamsBuilder<Schema>
 * @type {typeof import("/src/ipc.js").JutSuperIpcRspParamsBuilder}
 */
var JutSuperIpcRspParamsBuilder;

/**
 * @typedef {import("/src/browser.js").JutSuperBrowser} JutSuperBrowser
 * @type {typeof import("/src/browser.js").JutSuperBrowser}
 */
var JutSuperBrowser;

/**
 * @typedef {import("/src/messaging.js").JutSuperActionsMessageBuilder} JutSuperActionsMessageBuilder
 * @type {typeof import("/src/messaging.js").JutSuperActionsMessageBuilder}
 */
var JutSuperActionsMessageBuilder;

/**
 * @typedef {import("/src/messaging.js").JutSuperRequestsRequestMessageBuilder} JutSuperRequestsRequestMessageBuilder
 * @type {typeof import("/src/messaging.js").JutSuperRequestsRequestMessageBuilder}
 */
var JutSuperRequestsRequestMessageBuilder;

/**
 * @typedef {import("/src/messaging.js").JutSuperMessageBuilder} JutSuperMessageBuilder
 * @type {typeof import("/src/messaging.js").JutSuperMessageBuilder}
 */
var JutSuperMessageBuilder;

/**
 * @typedef {import("/src/transition.js").JutSuperTransition} JutSuperTransition
 * @type {typeof import("/src/transition.js").JutSuperTransition}
 */
var JutSuperTransition;

/**
 * @typedef {import("/src/settings.js").JutSuperSettings} JutSuperSettings
 * @type {typeof import("/src/settings.js").JutSuperSettings}
 */
var JutSuperSettings;

/**
 * @typedef {typeof import("/src/storage.js").JutSuperStorage} JutSuperStorage
 * @type {typeof import("/src/storage.js").JutSuperStorage}
 */
var JutSuperStorage;


/** Import modules */
(async function() {
  /** @type {typeof import("/src/error.js")} */
  const errorModule = await import(browser.runtime.getURL("/src/error.js"))
  /** @type {typeof import("/src/log.js")} */
  const logModule = await import(browser.runtime.getURL("/src/log.js"))
  /** @type {typeof import("/src/util.js")} */
  const utilModule = await import(browser.runtime.getURL("/src/util.js"))
  /** @type {typeof import("/src/consts.js")} */
  const constsModule = await import(browser.runtime.getURL("/src/consts.js"))
  /** @type {typeof import("/src/browser.js")} */
  const browserModule = await import(browser.runtime.getURL("/src/browser.js"))
  /** @type {typeof import("/src/ipc.js")} */
  const ipcModule = await import(browser.runtime.getURL("/src/ipc.js"));
  /** @type {typeof import("/src/storage.js")} */
  const storageModule = await import(browser.runtime.getURL("/src/storage.js"));
  /** @type {typeof import("/src/messaging.js")} */
  const messagingModule = await import(browser.runtime.getURL("/src/messaging.js"));
  /** @type {typeof import("/src/transition.js")} */
  const transitionModule = await import(browser.runtime.getURL("/src/transition.js"));
  /** @type {typeof import("/src/settings.js")} */
  const settingsModule = await import(browser.runtime.getURL("/src/settings.js"));
  /** @type {typeof import("/src/lock.js")} */
  const lockModule = await import(browser.runtime.getURL("/src/lock.js"));

  ANY = constsModule.ANY;
  jsuperErrors = errorModule.jsuperErrors;
  jsuperLog = logModule.jsuperLog;
  jsuperUtil = utilModule.jsuperUtil;
  domIds = constsModule.JutSuperDomIds;
  domClasses = constsModule.JutSuperDomClasses;
  defaultFonts = constsModule.JutSuperDefaultFonts;
  jutsuIds = constsModule.JutSuDomIds;
  jutsuClasses = constsModule.JutSuDomClasses;
  ipcFlags = ipcModule.JutSuperIpcFlags;
  ipcNamespaces = ipcModule.JutSuperIpcNamespaces;
  ipcIds = constsModule.JutSuperIpcIds;
  assetPaths = constsModule.JutSuperAssetPaths;
  assetIds = constsModule.JutSuperAssetIds;
  windowStates = browserModule.BrowserWindowStates;
  AsyncLock = lockModule.AsyncLock;
  JutSuperIpcBuilder = ipcModule.JutSuperIpcBuilder;
  JutSuperIpc = ipcModule.JutSuperIpc;
  JutSuperIpcRspParamsBuilder = ipcModule.JutSuperIpcRspParamsBuilder;
  JutSuperBrowser = browserModule.JutSuperBrowser;
  JutSuperActionsMessageBuilder = messagingModule.JutSuperActionsMessageBuilder;
  JutSuperRequestsRequestMessageBuilder = messagingModule.JutSuperRequestsRequestMessageBuilder;
  JutSuperMessageBuilder = messagingModule.JutSuperMessageBuilder;
  JutSuperTransition = transitionModule.JutSuperTransition;
  JutSuperSettings = settingsModule.JutSuperSettings;
  JutSuperStorage = storageModule.JutSuperStorage;

  LOCALE_TEXT[domClasses.textSkipOptions] = browser.i18n.getMessage("skipOptions");
  LOCALE_TEXT[domClasses.textOpenings] = browser.i18n.getMessage("openings");
  LOCALE_TEXT[domClasses.textEndings] = browser.i18n.getMessage("endings");
  LOCALE_TEXT[domClasses.textOrder] = browser.i18n.getMessage("order");
  LOCALE_TEXT[domClasses.textMax] = browser.i18n.getMessage("max");
  LOCALE_TEXT[domClasses.textFullscreen] = browser.i18n.getMessage("fullscreen");
  LOCALE_TEXT[domClasses.textDelay] = browser.i18n.getMessage("delay");
  LOCALE_TEXT[domClasses.textSecondsShort] = browser.i18n.getMessage("secondsShort");
  LOCALE_TEXT[domClasses.textCancel] = browser.i18n.getMessage("cancel");
  LOCALE_TEXT[domClasses.textToCancel] = browser.i18n.getMessage("toCancel");
  LOCALE_TEXT[domClasses.textPlaybackOptions] = browser.i18n.getMessage("playbackOptions");
  LOCALE_TEXT[domClasses.textAchievementSound] = browser.i18n.getMessage("achievementSound");
  LOCALE_TEXT[domClasses.textSkipping] = browser.i18n.getMessage("skipping");

  LOCALE_TOOLTIPS[domClasses.tooltipOpeningsSettings] = browser.i18n.getMessage("openingsSettings");
  LOCALE_TOOLTIPS[domClasses.tooltipToggleOpeningsSkip] = browser.i18n.getMessage("toggleOpeningsSkip");
  LOCALE_TOOLTIPS[domClasses.tooltipWhichRegionToSkip] = browser.i18n.getMessage("whichRegionToSkip");
  LOCALE_TOOLTIPS[domClasses.tooltipSkipAnyRegion] = browser.i18n.getMessage("skipAnyRegion");
  LOCALE_TOOLTIPS[domClasses.tooltipSkipFirstRegion] = browser.i18n.getMessage("skipFirstRegion");
  LOCALE_TOOLTIPS[domClasses.tooltipSkipLastRegion] = browser.i18n.getMessage("skipLastRegion");
  LOCALE_TOOLTIPS[domClasses.tooltipEndingsSettings] = browser.i18n.getMessage("endingsSettings");
  LOCALE_TOOLTIPS[domClasses.tooltipToggleEndingsSkip] = browser.i18n.getMessage("toggleEndingsSkip");
  LOCALE_TOOLTIPS[domClasses.tooltipMaxEpisodeSwitches] = browser.i18n.getMessage("maxEpisodeSwitches");
  LOCALE_TOOLTIPS[domClasses.tooltipPersistFullscreen] = browser.i18n.getMessage("persistFullscreen");
  LOCALE_TOOLTIPS[domClasses.tooltipToggleFullscreenPersistency] = browser.i18n.getMessage("toggleFullscreenPersistency");
  LOCALE_TOOLTIPS[domClasses.tooltipDelayBeforeSkipping] = browser.i18n.getMessage("delayBeforeSkipping");
  LOCALE_TOOLTIPS[domClasses.tooltipKeyToCancelSkipping] = browser.i18n.getMessage("keyToCancelSkipping");
  LOCALE_TOOLTIPS[domClasses.tooltipSetCancelKey] = browser.i18n.getMessage("setCancelKey");
  LOCALE_TOOLTIPS[domClasses.tooltipAchievementSound] = browser.i18n.getMessage("enableOrDisableAchievementSound");
  LOCALE_TOOLTIPS[domClasses.tooltipToggleAchievementSound] = browser.i18n.getMessage("toggleAchievementSound");
})().then(() => {
  jutsuperContent = new JutSuperContent();
})


/**
 * @typedef {import("/src/messaging.js").JutSuperRequestsResponseMessage} JutSuperRequestsResponseMessage
 * @typedef {import("/src/browser.js").BrowserWindowStatesKeys} BrowserWindowStatesKeys
 * @typedef {import("/src/transition.js").JutSuperTransitionObject} JutSuperTransitionObject
 * @typedef {import("/src/types/settings.d.ts").JutSuperSettingsObject} JutSuperSettingsObject
 * @typedef {import("/src/types/settings.d.ts").JutSuperSettingsObjectPartial} JutSuperSettingsObjectPartial
 * @typedef {import("/src/types/settings.d.ts").JutSuperSettingsObjectFilter} JutSuperSettingsObjectFilter
 * @typedef {import("/src/types/ipc.d.ts").JutSuperIpcReqSchema} JutSuperIpcReqSchema
 * @typedef {import("/src/types/ipc.d.ts").JutSuperIpcRspSchema} JutSuperIpcRspSchema
 * @typedef {import("/src/types/ipc.d.ts").JutSuperIpcReqSchemaFilter} JutSuperIpcReqSchemaFilter
 * @typedef {import("/src/types/ipc.d.ts").JutSuperIpcRspSchemaFilter} JutSuperIpcRspSchemaFilter
 */


/** @type {Record<string, string>} */
const LOCALE_TEXT = {};
/** @type {Record<string, string>} */
const LOCALE_TOOLTIPS = {};


/** @type {JutSuperContent} */
var jutsuperContent;


class JutSuperContent {
  constructor() {
    /** @type {string} */
    this.LOCATION = JutSuperContent.name;

    const head = document.getElementsByTagName("head")[0];
    const urlJutSuperJs = browser.runtime.getURL(assetPaths.jutsuperJs);
    this.injectModule(head, urlJutSuperJs, assetIds.jutsuperJs);

    /**
     * # Responding IPC
     * @type {JutSuperIpc<
     *   JutSuperIpcRspSchema,
     *   JutSuperIpcReqSchema,
     *   JutSuperIpcReqSchemaFilter
     * >}
     */
    this.rspIpc = new JutSuperIpcBuilder()
      .identifyAs(ipcIds.content)
      .ignoreWithoutAnyOfTheseFlags([ipcFlags.req])
      .sendWithTheseFlags([ipcFlags.rsp])
      .build();

    this.rspIpc.recvOnce({ schema: { loadingAllowed: { tell: { state: true } } } }).then(() => {
      jsuperLog.debug(`${this.LOCATION}: received loadingAllowed, constructing`);

      /**
       * # Requesting IPC
       * @type {JutSuperIpc<
       *   JutSuperIpcReqSchema,
       *   JutSuperIpcRspSchema,
       *   JutSuperIpcRspSchemaFilter
       * >}
       */
      this.reqIpc = new JutSuperIpcBuilder()
        .identifyAs(ipcIds.content)
        .ignoreWithoutAnyOfTheseFlags([ipcFlags.rsp])
        .sendWithTheseFlags([ipcFlags.req])
        .build();

      /**
       * # Requesting settings IPC
       * @type {JutSuperIpc<
       *   JutSuperSettingsObjectPartial,
       *   JutSuperSettingsObjectPartial,
       *   JutSuperSettingsObjectFilter
       * >}
       */
      this.reqSettingsIpc = new JutSuperIpcBuilder()
        .namespaceIs(ipcNamespaces.settings)
        .identifyAs(ipcIds.content)
        .ignoreWithoutAnyOfTheseFlags([ipcFlags.rsp])
        .sendWithTheseFlags([ipcFlags.req])
        .build();
      /**
       * # Responding settings IPC
       * @type {JutSuperIpc<
       *   JutSuperSettingsObjectPartial,
       *   JutSuperSettingsObjectPartial,
       *   JutSuperSettingsObjectFilter
       * >}
       */
      this.rspSettingsIpc = new JutSuperIpcBuilder()
        .namespaceIs(ipcNamespaces.settings)
        .identifyAs(ipcIds.content)
        .ignoreWithoutAnyOfTheseFlags([ipcFlags.req])
        .sendWithTheseFlags([ipcFlags.rsp])
        .build();

      this.browser = new JutSuperBrowser(browser, BROWSER);
      this.storage = new JutSuperStorage(browser.storage.local);
      this.transition = new JutSuperTransition().setUndefined();
      this.settings = new JutSuperSettings().setUndefined();

      this.initLock = new AsyncLock({ oneTime: true });

      this.initListeners();
      
      const urlSquareWhiteLogo48Svg = browser.runtime.getURL(assetPaths.squareWhiteLogo48Svg);
      const urlDropdownSvg = browser.runtime.getURL(assetPaths.dropdownSvg);
      const urlSkipSvg = browser.runtime.getURL(assetPaths.skipSvg);
      const urlPlaySvg = browser.runtime.getURL(assetPaths.playSvg);
      const urlJutSuperCss = browser.runtime.getURL(assetPaths.jutsuperCss);
      const urlSettingsHtml = browser.runtime.getURL(assetPaths.settingsHtml);
      const urlSkipHtml = browser.runtime.getURL(assetPaths.skipHtml);

      this.injectFonts(head, defaultFonts);
      this.injectImage(head, urlSquareWhiteLogo48Svg, assetIds.squareWhiteLogo48Svg);
      this.injectImage(head, urlDropdownSvg, assetIds.dropdownSvg);
      this.injectImage(head, urlSkipSvg, assetIds.skipSvg);
      this.injectImage(head, urlPlaySvg, assetIds.playSvg);
      this.injectCss(head, urlJutSuperCss, assetIds.jutsuperCss);
      this.injectDocument(head, urlSettingsHtml, assetIds.settingsHtml);
      this.injectDocument(head, urlSkipHtml, assetIds.skipHtml);

      this.reqIpc.send({ assetsInjected: { tell: { state: true } } });
      jsuperLog.debug(`${this.LOCATION}: all assets injected`);

      this.#asyncInit().then(() => {
        jsuperLog.debug(`${this.LOCATION}: constructed`);
      });
    })
  }

  async #asyncInit() {
    await this.loadData();
    this.initLock.resolve();
  }

  /////////////////////////////
  // Injecting into the page //
  /////////////////////////////

  /**
   * 
   * @param {HTMLElement} node 
   * @param {FontDescriptor[]} fonts 
   */
  injectFonts(node, fonts) {
    const style = document.createElement("style");

    for (const font of fonts) {
      const extensionUrl = browser.runtime.getURL(font.path);
      let ff = "";
      ff += "@font-face {\n";
      ff += "  font-family: \"" + font.family + "\";";
      ff += "  font-weight: " + font.weight + ";";
      ff += "  src: url(\"" + extensionUrl + "\") format(\"" + font.format + "\");";
      ff += "}";

      style.appendChild(document.createTextNode(ff))
    }

    node.appendChild(style);
  }

  /**
   * @param {HTMLElement} node
   * @param {string} url
   * @param {string} id
   * @returns {void}
   */
  injectModule(node, url, id) {
    const attrs = {
      id: id,
      src: url,
      type: "module",
    };

    const elm = document.createElement("script");
    jsuperUtil.applyAttrs(elm, attrs);

    node.appendChild(elm);
  }

  /**
   * @param {HTMLElement} node
   * @param {string} url
   * @param {string} id
   * @returns {Promise<void>}
   */
  async injectCss(node, url, id) {
    const attrs = {
      id: id,
      href: url,
      rel: "stylesheet",
    };

    const elm = document.createElement("link");
    jsuperUtil.applyAttrs(elm, attrs);

    node.appendChild(elm);
  }

  /**
   * @param {HTMLElement} node
   * @param {string} url
   * @param {string} id
   * @returns {void}
   */
  injectImage(node, url, id) {
    const attrs = {
      id: id,
      href: url,
      rel: "preload",
      as: "image",
    };

    const elm = document.createElement("link");
    jsuperUtil.applyAttrs(elm, attrs);

    node.appendChild(elm);
  }

  /**
   * @param {HTMLElement} node
   * @param {string} url
   * @param {string} id
   * @returns {void}
   */
  injectDocument(node, url, id) {
    const attrs = {
      id: id,
      href: url
    };

    const elm = document.createElement("link");
    jsuperUtil.applyAttrs(elm, attrs);

    node.appendChild(elm);
  }

  async loadData() {
    await Promise.all([
      this.loadSettingsStorage(),
      this.loadTransitionStorageAndClear(),
    ]);
  }

  initListeners() {
    this.listenSettingsChange();
    this.listenEssentialsLoadState();
    this.listenFullscreenControl();
    this.listenEpisodeSwitchAllowanceRequests();
    this.listenPreEpisodeSwitchRequests();
    this.listenIsWindowFullscreenRequests();
    this.listenLocalizationRequests();
  }

  ////////////////////////////
  // Settings change listen //
  ////////////////////////////

  /**
   * @returns {Promise<never>}
   */
  async listenSettingsChange() {
    const loc = `${this.LOCATION}@${this.listenSettingsChange.name}`;
    const builder = /** @type {JutSuperIpcRspParamsBuilder<JutSuperSettingsObjectPartial>} */ (
      new JutSuperIpcRspParamsBuilder()
    );
    const cfg = builder
      .build();
    
    for await (const evt of this.rspSettingsIpc.recv(cfg)) {
      await this.initLock.promise;

      jsuperLog.debug(`${loc} got event:`, evt);

      if (evt === undefined || jsuperUtil.isEmptyObject(evt)) {
        continue
      }

      this.settings.mergeWith(evt);
      await this.commitSettingsStorage();
    }

    throw jsuperErrors.unexpectedEndError({
      location: loc
    });
  }

  /////////////////////////////
  // Essentials loading wait //
  /////////////////////////////

  /**
   * @returns {Promise<void>}
   */
  async listenEssentialsLoadState() {
    const loc = `${this.LOCATION}@${this.listenEssentialsLoadState.name}`;
    const builder = /** @type {JutSuperIpcRspParamsBuilder<JutSuperIpcReqSchemaFilter>} */ (
      new JutSuperIpcRspParamsBuilder()
    );
    const cfg = builder
      .recvOnlyThisIntersection({ essentialsLoaded: { tell: { state: true } } })
      .build();

    const evt = await this.rspIpc.recvOnce(cfg);
    await this.initLock.promise;
    jsuperLog.debug(`${loc} got event:`, evt);
    this.handleEssentialsLoaded();
  }

  /**
   * @returns {Promise<void>}
   */
  async handleEssentialsLoaded() {
    this.sendSettings();
    this.handleEpisodeSwitchContinuation();
  }

  ////////////////////////////////////
  // Window state requests handling //
  ////////////////////////////////////

  /**
   * @returns {Promise<never>}
   */
  async listenIsWindowFullscreenRequests() {
    const loc = `${this.LOCATION}@${this.listenIsWindowFullscreenRequests.name}`;
    const builder = /** @type {JutSuperIpcRspParamsBuilder<JutSuperIpcReqSchemaFilter>} */ (
      new JutSuperIpcRspParamsBuilder()
    );
    const cfg = builder
      .recvOnlyThisIntersection({ fullscreen: { askIsWindowFullscreen: true } })
      .build();

    for await (const evt of this.rspIpc.recv(cfg)) {
      await this.initLock.promise;
      jsuperLog.debug(`${loc} got event:`, evt);
      await this.handleIsWindowFullscreenRequest();
    }

    throw jsuperErrors.unexpectedEndError({
      location: loc
    });
  }

  /**
   * @returns {Promise<void>}
   */
  async handleIsWindowFullscreenRequest() {
    const resp = await this.browser.runtime.sendResponsiveMessage(
      (new JutSuperMessageBuilder())
        .requests(
          (new JutSuperRequestsRequestMessageBuilder())
            .getWindowState()
            .build()
        )
        .build()
    );

    const isFullscreen = resp.windowState === windowStates.fullscreen;

    this.rspIpc.send({
      fullscreen: { rspIsWindowFullscreen: isFullscreen }
    });
  }

  ////////////////////////
  // Fullscreen control //
  ////////////////////////

  /**
   * @returns {Promise<never>}
   */
  async listenFullscreenControl() {
    const loc = `${this.LOCATION}@${this.listenFullscreenControl.name}`;
    const builder = /** @type {JutSuperIpcRspParamsBuilder<JutSuperIpcReqSchemaFilter>} */ (
      new JutSuperIpcRspParamsBuilder()
    );
    const cfg = builder
      .recvOnlyThisIntersection({ fullscreen: { reqExit: true } })
      .build();

    for await (const evt of this.rspIpc.recv(cfg)) {
      await this.initLock.promise;
      jsuperLog.debug(`${loc} got event:`, evt);
      await this.handleFullscreenExitRequest();
    }

    throw jsuperErrors.unexpectedEndError({
      location: loc
    });
  }

  /**
   * @returns {Promise<void>}
   */
  async handleFullscreenExitRequest() {
    const loc = `${this.LOCATION}@${this.handleFullscreenExitRequest.name}`;

    const originalWindowState = this.transition.get().originalWindowState;

    jsuperLog.debug(
      `${loc}: exiting window fullscreen, originalWindowState=${originalWindowState}`
    );

    const resp = await this.browser.runtime.sendResponsiveMessage(
      (new JutSuperMessageBuilder())
        .actions(
          (new JutSuperActionsMessageBuilder())
            .isFullscreenState(false)
            .originalWindowState(originalWindowState)
            .build()
        )
        .build()
    );

    this.rspIpc.send({fullscreen: {rspExit: {
      isFulfilled: true
    }}});
  }

  ////////////////////////////////////////////////
  // Episode switch allowance requests handling //
  ////////////////////////////////////////////////

  /**
   * @returns {Promise<void>}
   */
  async listenEpisodeSwitchAllowanceRequests() {
    const loc = `${this.LOCATION}@${this.listenEpisodeSwitchAllowanceRequests.name}`;
    const builder = /** @type {JutSuperIpcRspParamsBuilder<JutSuperIpcReqSchemaFilter>} */ (
      new JutSuperIpcRspParamsBuilder()
    );
    const cfg = builder
      .recvOnlyThisIntersection({ preEpisodeSwitch: { askIsAllowed: true } })
      .build();

    for await (const evt of this.rspIpc.recv(cfg)) {
      await this.initLock.promise;
      jsuperLog.debug(`${loc} got event:`, evt);
      await this.handleEpisodeSwitchAllowanceRequest();
    }

    throw jsuperErrors.unexpectedEndError({
      location: loc
    });
  }

  /**
   * @returns {boolean}
   */
  isEpisodeSwitchAllowed() {
    const switchesCount = typeof this.transition.get().switchesCount !== "undefined" ?
      this.transition.get().switchesCount : 0;
    const maxSkips = this.settings.get().endings.maxSkips;

    if (
      maxSkips > 0 &&
      switchesCount >= maxSkips
    ) {
      return false;
    }
    
    return true;
  }

  /**
   * @returns {Promise<void>}
   */
  async handleEpisodeSwitchAllowanceRequest() {
    this.rspIpc.send({
      preEpisodeSwitch: { rspIsAllowed: this.isEpisodeSwitchAllowed() }
    });
  }

  ////////////////////////////////////
  // Episode switch states handling //
  ////////////////////////////////////

  /**
   * @returns {Promise<never>}
   */
  async listenPreEpisodeSwitchRequests() {
    const loc = `${this.LOCATION}@${this.listenPreEpisodeSwitchRequests.name}`;
    const builder = /** @type {JutSuperIpcRspParamsBuilder<JutSuperIpcReqSchemaFilter>} */ (
      new JutSuperIpcRspParamsBuilder()
    );
    const cfg = builder
      .recvOnlyThisIntersection({ preEpisodeSwitch: { req: ANY } })
      .build();

    for await (const evt of this.rspIpc.recv(cfg)) {
      await this.initLock.promise;

      jsuperLog.debug(`${loc} got event:`, evt);

      if (jsuperUtil.isEmptyObject(evt.preEpisodeSwitch.req)) {
        continue;
      }
      if (evt.preEpisodeSwitch.req.state !== true) {
        continue;
      }

      await this.handleEpisodeSwitchRequest(
        evt.preEpisodeSwitch.req.isFullscreen
      );
    }

    throw jsuperErrors.unexpectedEndError({
      location: loc
    });
  }

  /**
   * @param {boolean} isFullscreen
   * @returns {Promise<void>}
   */
  async handleEpisodeSwitchRequest(isFullscreen) {
    if (!this.isEpisodeSwitchAllowed()) {
      // send rejection, since
      // we have exceeded max allowed skips
      this.rspIpc.send({preEpisodeSwitch: {rsp: {
        isFulfilled: false,
        reason: new Error("reached max skips")
      }}});

      return;
    }

    const switchesCount = typeof this.transition.get().switchesCount !== "undefined" ?
      this.transition.get().switchesCount : 0;

    this.transition.setIsSwitchingEpisode(true);
    this.transition.setIsFullscreen(isFullscreen);
    this.transition.setSwitchesCount(switchesCount + 1);

    if (!this.transition.get().originalWindowState) {
      await this.reqIpc.sendAndRecvOnce(
        { fullscreen: { reqPlayerFullscreenExit: true } },
        { schema: { fullscreen: { rspPlayerFullscreenExit: ANY } } }
      );

      const resp = await this.browser.runtime.sendResponsiveMessage(
        (new JutSuperMessageBuilder())
          .requests(
            (new JutSuperRequestsRequestMessageBuilder())
              .getWindowState()
              .build()
          )
          .build()
      );

      this.transition.setOriginalWindowState(resp.windowState);
    }
    
    await this.commitTransitionStorage();

    // send callback that
    // episode switch preparations
    // are completed
    this.rspIpc.send({preEpisodeSwitch: {rsp: {
      isFulfilled: true
    }}});
  }

  async handleEpisodeSwitchContinuation() {
    const loc = `${this.LOCATION}@${this.handleEpisodeSwitchContinuation.name}`;
    const transition = this.transition.get();

    if (transition === undefined || !transition.isSwitchingEpisode) {
      jsuperLog.debug(`${loc}: episode was not switched automatically`);
      return;
    }

    jsuperLog.debug(`${loc}: episode was switched automatically`);

    this.requestPlay();

    if (this.settings.get().endings.doPersistFullscreen && transition.isFullscreen) {
      jsuperLog.debug(`${loc}: setting up custom fullscreen`);

      const body = /** @type {HTMLBodyElement} */ (
        document.getElementsByTagName("body")[0]
      );
      const playerDiv = /** @type {HTMLDivElement} */ (
        document.getElementById(jutsuIds.myPlayer)
      );
      const header = /** @type {HTMLDivElement} */ (
        document.getElementsByClassName(jutsuClasses.zFixHeader)[0]
      );
      const infoPanel = /** @type {HTMLDivElement} */ (
        document.getElementsByClassName(jutsuClasses.infoPanel)[0]
      );
      const footer = /** @type {HTMLDivElement} */ (
        document.getElementsByClassName(jutsuClasses.footer)[0]
      );

      // disable scrolling
      body.style.overflow = "hidden";
      jsuperLog.debug(`${loc}: disabled scrolling`);
      // hide header
      header.style.display = "none";
      jsuperLog.debug(`${loc}: hide header`);
      // hide info panel
      infoPanel.style.display = "none";
      jsuperLog.debug(`${loc}: hide info panel`);
      // hide footer
      footer.style.display = "none";
      jsuperLog.debug(`${loc}: hide footer`);

      // add fullscreen styling to the player
      playerDiv.classList.add(jutsuClasses.vjsFullscreen);
      jsuperLog.debug(`${loc}: added fullscreen class to the player`);
      // make the player full window size
      playerDiv.classList.add(domClasses.fullscreen);
      jsuperLog.debug(`${loc}: added fullscreen styling to the player`);
      // put the player above everything
      playerDiv.classList.add(domClasses.topIndex);
      jsuperLog.debug(`${loc}: added top Z-index to the player`);

      // inject a function to be able to exit
      // this custom fullscreen mode
      this.reqIpc.sendAndRecvOnce(
        { fullscreen: { reqExitInjection: true } },
        { schema: { fullscreen: { rspExitInjection: ANY } } }
      )

      await browser.runtime.sendMessage(
        (new JutSuperMessageBuilder())
          .actions(
            (new JutSuperActionsMessageBuilder())
              .isFullscreenState(true)
              .build()
          )
          .build()
      );
    }
  }

  //////////////////////////////////
  // Localization requests handle //
  //////////////////////////////////

  /**
   * @returns {Promise<void>}
   */
  async listenLocalizationRequests() {
    const loc = `${this.LOCATION}@${this.listenLocalizationRequests.name}`;
    const builder = /** @type {JutSuperIpcRspParamsBuilder<JutSuperIpcReqSchemaFilter>} */ (
      new JutSuperIpcRspParamsBuilder()
    );
    const cfg = builder
      .recvOnlyThisIntersection({ localization: { reqLocalize: true } })
      .build();

    const evt = await this.rspIpc.recvOnce(cfg);
    await this.initLock.promise;
    jsuperLog.debug(`${loc} got event:`, evt);
    await this.handleLocalizationRequest();
  }

  async handleLocalizationRequest() {
    const loc = `${this.LOCATION}@${this.handleLocalizationRequest.name}`;

    let textCounter = 0;
    for (const [cls, message] of Object.entries(LOCALE_TEXT)) {
      [...document.getElementsByClassName(cls)].forEach(
        (value, index, array) => { value.innerHTML = message; textCounter++; }
      );
    }

    let tooltipCounter = 0;
    for (const [cls, tooltip] of Object.entries(LOCALE_TOOLTIPS)) {
      [...document.getElementsByClassName(cls)].forEach(
        (value, index, array) => { value.setAttribute("title", tooltip); tooltipCounter++; }
      );
    }

    this.rspIpc.send({ localization: { rspLocalize: { isFulfilled: true } } });

    jsuperLog.debug(
      `${loc}: localization complete: ` +
      `textCounter=${textCounter}, ` +
      `tooltipCounter=${tooltipCounter}`
    );
  }

  ////////////////////////////
  // Browser storage handle //
  ////////////////////////////

  /**
   * # Save fullscreen and episode switch states
   * @returns {Promise<void>}
   */
  async commitTransitionStorage() {
    const loc = `${this.LOCATION}@${this.commitTransitionStorage.name}`;
    await this.storage.setTransition(this.transition.get());
    jsuperLog.debug(`${loc}: commited transition storage`, this.transition.get());
  }

  /**
   * # Load fullscreen and episode switch states
   * @returns {Promise<void>}
   */
  async loadTransitionStorage() {
    const loc = `${this.LOCATION}@${this.loadTransitionStorage.name}`;
    let transition = await this.storage.getTransition();

    if (transition === undefined) {
      this.transition.setUndefined();
      jsuperLog.debug(`${loc}: initialized transition`, this.transition.get());
    }
    else {
      this.transition.set(transition);
      jsuperLog.debug(`${loc}: loaded transition`, this.transition.get());
    }
  }

  /**
   * # Load fullscreen and episode switch states, then clear
   * @returns {Promise<void>}
   */
  async loadTransitionStorageAndClear() {
    await this.loadTransitionStorage();
    await this.storage.removeTransition();
  }

  /**
   * # Save settings
   * @returns {Promise<void>}
   */
  async commitSettingsStorage() {
    const loc = `${this.LOCATION}@${this.commitSettingsStorage.name}`;
    await this.storage.setSettings(this.settings.get());
    jsuperLog.debug(`${loc}: commited settings storage`, this.settings.get());
  }

  /**
   * # Load settings
   * @returns {Promise<void>}
   */
  async loadSettingsStorage() {
    const loc = `${this.LOCATION}@${this.loadSettingsStorage.name}`;
    let settings = await this.storage.getSettings();

    if (settings === undefined) {
      this.settings.setDefaults();
      await this.storage.setSettings(this.settings.get());
      jsuperLog.debug(`${loc}: initialized settings`, this.settings.get());
    }
    else {
      this.settings.set(settings);
      jsuperLog.debug(`${loc}: loaded settings`, this.settings.get());
    }
  }

  requestPlay() {
    const loc = `${this.LOCATION}@${this.requestPlay.name}`;
    this.reqIpc.send({ playing: { reqPlay: true } });
  }

  sendSettings() {
    const loc = `${this.LOCATION}@${this.sendSettings.name}`;
    this.reqSettingsIpc.send(this.settings.get());
  }
}
