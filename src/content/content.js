// #if "@BROWSER" == "chrome"
var BROWSER = "chrome";
var browser = chrome;
// #elif "@BROWSER" == "firefox"
var BROWSER = "firefox";
// #else
// #error
// #endif

var startedPlaying = false;
var pressedFullscreen = false;

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
 * @typedef {import("/src/storage.js").JutSuperStorage} JutSuperStorage
 * @type {JutSuperStorage}
 */
var jsuperStorage;

/**
 * @typedef {import("/src/consts.js").JutSuperIpcIds} JutSuperIpcIds
 * @type {JutSuperIpcIds}
 */
var ipcIds;

/**
 * @typedef {import("/src/consts.js").JutSuperIpcKeys} JutSuperIpcKeys
 * @type {JutSuperIpcKeys}
 */
var ipcKeys;

/**
 * @typedef {import("/src/consts.js").JutSuDomAttributes} JutSuDomAttributes
 * @type {JutSuDomAttributes}
 */
var jutsuAttrs;

/**
 * @typedef {import("/src/consts.js").JutSuperIpcAwaitStates} JutSuperIpcAwaitStates
 * @type {JutSuperIpcAwaitStates}
 */
var ipcAwaits;

/**
 * @typedef {import("/src/consts.js").JutSuperIpcLoadingStates} JutSuperIpcLoadingStates
 * @type {JutSuperIpcLoadingStates}
 */
var ipcLoadingStates;

/**
 * @typedef {import("/src/consts.js").JutSuperStorageKeys} JutSuperStorageKeys
 * @type {JutSuperStorageKeys}
 */
var storageKeys;

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
 * @typedef {import("/src/ipc.js").JutSuperIpcBuilder} JutSuperIpcBuilder
 * @type {typeof import("/src/ipc.js").JutSuperIpcBuilder}
 */
var JutSuperIpcBuilder;

/**
 * @typedef {import("/src/ipc.js").JutSuperIpc} JutSuperIpc
 * @type {typeof import("/src/ipc.js").JutSuperIpc}
 */
var JutSuperIpc;

/**
 * @typedef {import("/src/ipc.js").JutSuperIpcRecvParamsBuilder} JutSuperIpcRecvParamsBuilder
 * @type {typeof import("/src/ipc.js").JutSuperIpcRecvParamsBuilder}
 */
var JutSuperIpcRecvParamsBuilder;

/**
 * @typedef {import("/src/ipc.js").JutSuperIpcValueDescriptor} JutSuperIpcValueDescriptor
 */

/** Import modules */
(async function() {
  /** @type {typeof import("/src/error.js")} */
  const errorModule = await import(browser.runtime.getURL("/src/error.js"))
  /** @type {typeof import("/src/log.js")} */
  const logModule = await import(browser.runtime.getURL("/src/log.js"))
  /** @type {typeof import("/src/consts.js")} */
  const constsModule = await import(browser.runtime.getURL("/src/consts.js"))
  /** @type {typeof import("/src/ipc.js")} */
  const ipcModule = await import(browser.runtime.getURL("/src/ipc.js"));
  /** @type {typeof import("/src/storage.js")} */
  const storageModule = await import(browser.runtime.getURL("/src/storage.js"));

  jsuperErrors = errorModule.jsuperErrors;
  jsuperLog = logModule.jsuperLog;
  ipcIds = constsModule.JutSuperIpcIds;
  ipcKeys = constsModule.JutSuperIpcKeys;
  jutsuAttrs = constsModule.JutSuDomAttributes;
  ipcAwaits = constsModule.JutSuperIpcAwaitStates;
  ipcLoadingStates = constsModule.JutSuperIpcLoadingStates;
  storageKeys = constsModule.JutSuperStorageKeys;
  assetPaths = constsModule.JutSuperAssetPaths;
  assetIds = constsModule.JutSuperAssetIds;
  JutSuperIpcBuilder = ipcModule.JutSuperIpcBuilder;
  JutSuperIpc = ipcModule.JutSuperIpc;
  JutSuperIpcRecvParamsBuilder = ipcModule.JutSuperIpcRecvParamsBuilder;
  jsuperStorage = storageModule.jsuperStorage;
})().then(() => {
  jutsuperContent = new JutSuperContent();
})


/** @type {JutSuperContent} */
var jutsuperContent;


class JutSuperContent {
  constructor() {
    this.LOCATION = JutSuperContent.name;

    this.isFullscreen = undefined;
    this.isSwitchingEpisode = undefined;

    /** @type {JutSuperIpc} */
    this.ipc = new JutSuperIpcBuilder()
      .createCommunicationNode()
      .identifyAs(ipcIds.content)
      .build();

    /** @type {string} */
    this.urlGearSvg = browser.runtime.getURL(assetPaths.gearSvg);
    /** @type {string} */
    this.urlJutSuperIpcJs = browser.runtime.getURL(assetPaths.ipcJs);
    /** @type {string} */
    this.urlJutSuperCss = browser.runtime.getURL(assetPaths.jutsuperCss);
    /** @type {string} */
    this.urlJutSuperJs = browser.runtime.getURL(assetPaths.jutsuperJs);

    const head = document.getElementsByTagName("head")[0];

    this.injectImage(head, this.urlGearSvg, assetIds.gearSvg);
    this.injectCss(head, this.urlJutSuperCss, assetIds.jutsuperCss);
    this.injectModule(head, this.urlJutSuperIpcJs, assetIds.jutsuperIpcJs);
    this.injectModule(head, this.urlJutSuperJs, assetIds.jutsuperJs);

    this.listenEssentialsLoadState();
    this.listenFullscreenChange();
    this.listenEpisodeSwitchPrepStates();
  }

  /**
   * @param {HTMLElement} node
   * @param {string} url
   * @param {string} id
   * @returns {null}
   */
  injectModule(node, url, id) {
    const attrs = {
      id: id,
      src: url,
      type: "module",
    };

    const elm = document.createElement("script");
    JutSuperContent.applyAttrs(elm, attrs);

    node.appendChild(elm);

    return null;
  }

  /**
   * @param {HTMLElement} node
   * @param {string} url
   * @param {string} id
   * @returns {null}
   */
  injectCss(node, url, id) {
    const attrs = {
      id: id,
      href: url,
      rel: "stylesheet",
    };

    const elm = document.createElement("link");
    JutSuperContent.applyAttrs(elm, attrs);

    node.appendChild(elm);

    return null;
  }

  /**
   * @param {HTMLElement} node
   * @param {string} url
   * @param {string} id
   * @returns {null}
   */
  injectImage(node, url, id) {
    const attrs = {
      id: id,
      href: url,
      rel: "preload",
      as: "image",
    };

    const elm = document.createElement("link");
    JutSuperContent.applyAttrs(elm, attrs);

    node.appendChild(elm);

    return null;
  }

  async listenEssentialsLoadState() {
    const cfg = new JutSuperIpcRecvParamsBuilder()
      .recvOnlyTheseKeys(ipcKeys.essentialsLoadingState)
      .build()

    for await (const evt of this.ipc.recv(cfg)) {
      jsuperLog.debug(new Error, evt)

      switch (evt.value) {
        case ipcLoadingStates.loaded:
          await this.handleEssentialsLoaded()
          break;
        default:
          jsuperLog.error(new Error, jsuperErrors.unhandledCaseError({
            location: this.LOCATION,
            target: `${evt.key}=${evt.value}`
          }).message)
      }
    }

    throw jsuperErrors.unexpectedEndError({
      location: this.LOCATION,
      target: `${this.listenEssentialsLoadState.name}()`
    })
  }

  async listenFullscreenChange() {
    const cfg = new JutSuperIpcRecvParamsBuilder()
      .recvOnlyTheseKeys(ipcKeys.isFullscreen)
      .build()

    for await (const evt of this.ipc.recv(cfg)) {
      jsuperLog.debug(new Error, evt)
      await this.handleFullscreenChange(evt.value);
    }

    throw jsuperErrors.unexpectedEndError({
      location: this.LOCATION,
      target: `${this.listenFullscreenChange.name}()`
    })
  }

  /**
   * @param {boolean} routeExisting 
   */
  async listenEpisodeSwitchPrepStates(routeExisting = false) {
    const cfg = new JutSuperIpcRecvParamsBuilder()
      .recvOnlyTheseKeys(ipcKeys.episodeSwitchPrep)
      .build()

    /**
     * 
     * @param {JutSuperContent} thisArg 
     * @param {JutSuperIpcValueDescriptor} evt 
     */
    async function route(thisArg, evt) {
      switch (evt.value) {
        case ipcAwaits.idle:
          await thisArg.handleEpisodeSwitchIdle();
          break;
        case ipcAwaits.request:
          await thisArg.handleEpisodeSwitchRequest();
          break;
        case ipcAwaits.continuation:
          await thisArg.handleEpisodeSwitchContinuation();
          break;
        default:
          jsuperLog.error(new Error, jsuperErrors.unhandledCaseError({
            location: thisArg.LOCATION,
            target: `${evt.key}=${evt.value}`
          }).message)
      }
    }

    if (routeExisting) {
      await route(this, this.ipc.get(ipcKeys.episodeSwitchPrep))
    }

    for await (const evt of this.ipc.recv(cfg)) {
      jsuperLog.debug(new Error, evt)
      await route(this, evt)
    }

    throw jsuperErrors.unexpectedEndError({
      location: this.LOCATION,
      target: `${this.listenEpisodeSwitchPrepStates.name}()`
    })
  }

  async handleEssentialsLoaded() {
    await this.loadTransitionStorageAndClear();
  }

  async handleEpisodeSwitchIdle() {

  }

  async handleEpisodeSwitchRequest() {
    this.isSwitchingEpisode = true;
    await this.commitTransitionStorage();

    // send callback that
    // episode switch preparations
    // are completed
    this.ipc.send({
      key: ipcKeys.episodeSwitchPrep,
      value: ipcAwaits.completed
    });
  }

  async handleEpisodeSwitchContinuation() {
    const transitionKeys = await jsuperStorage.getTransitionKeys();
    const isSwitchedAutomatically = (
      transitionKeys.isSwitchingEpisode !== undefined ?
      transitionKeys.isSwitchingEpisode : false
    );
  
    this.ipc.send({
      key: ipcKeys.isEpisodeSwitchedAutomatically,
      value: isSwitchedAutomatically,
    })
    this.ipc.send({
      key: ipcKeys.episodeSwitchPrep,
      value: ipcAwaits.completed,
    })

    if (transitionKeys.isSwitchingEpisode) {
      jsuperLog.log(new Error, "episode was switched automatically")

      const player = document.getElementById(
        "my-player_html5_api"//jutsuAttrs.playerDivId
      );
      player.play();

      if (transitionKeys.isFullscreen) {
        await browser.runtime.sendMessage({
          request: "fullscreenOn"
        });
      }
    }
    else {
      jsuperLog.log(new Error, "episode was not switched automatically")
    }

    await jsuperStorage.removeTransitionKeys();
  }

  async handleFullscreenChange(state) {
    this.isFullscreen = state;
  }

  /**
   * # Save fullscreen and episode switch states
   * @returns {Promise<void>}
   */
  async commitTransitionStorage() {
    const values = {};
    values[storageKeys.isFullscreen] = this.isFullscreen;
    values[storageKeys.isSwitchingEpisode] = this.isSwitchingEpisode;

    await jsuperStorage.setKeys(values);
  }

  /**
   * # Load fullscreen and episode switch states
   * @returns {Promise<void>}
   */
  async loadTransitionStorage() {
    const values = await jsuperStorage.getTransitionKeys();

    this.isFullscreen = values[storageKeys.isFullscreen];
    this.isSwitchingEpisode = values[storageKeys.isSwitchingEpisode];
  }

  /**
   * # Load fullscreen and episode switch states, then clear
   * @returns {Promise<void>}
   */
  async loadTransitionStorageAndClear() {
    await this.loadTransitionStorage();
    await jsuperStorage.removeTransitionKeys();
  }

  /**
   * @param {boolean} state 
   */
  async handleOnEssentialsReady(state) {
    jsuperLog.debug(new Error, "content script caught essentialsready! isEssentialsReady:", state);

    /** @type {{isFullscreen: boolean, isCurrentlySwitchingEpisode: boolean}} */
    const keys = await browser.storage.local.get(
      ["isFullscreen", "isCurrentlySwitchingEpisode"]
    );

    if (keys.isCurrentlySwitchingEpisode) {
      jsuperLog.log(new Error, "CURRENTLY SWITCHING EPISODE!!!");
    }
    if (keys.isFullscreen) {
      jsuperLog.log(new Error, "DON'T FORGET FULLSCREEN!!!");
    }
  }

  /**
   * @param {boolean} state 
   */
  handleOnFullscreenChange(state) {
    jsuperLog.debug(new Error, "content script caught fullscreenchange! isFullscreen:", state);

    browser.storage.local.set({ isFullscreen: state }).then(
      () => {
        jsuperLog.debug(new Error, "set isFullscreen state")
      }
    );
  }

  async handleOnCurrentlySwitchingEpisode(state) {
    jsuperLog.debug(new Error,
      "content script caught currentlyswitchingepisode! isCurrentlySwitchingEpisode:", state
    );
    
    
    await browser.storage.local.set(
      { isCurrentlySwitchingEpisode: state }
    );

    jsuperLog.debug(new Error, "set isCurrentlySwitchingEpisode state");
    this.ipc.isEpisodeSwitchPrep = false;
  }

  requestPlay() {

  }

  requestFullscreen() {

  }

  /**
   * @param {HTMLElement} node
   * @param {Object.<string, string>} attrs 
   * @returns {null}
   */
  static applyAttrs(node, attrs) {
    for (const key in attrs) {
      const value = attrs[key];
      node.setAttribute(key, value);
    }

    return null;
  }
}
