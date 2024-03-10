// #if "@BROWSER" == "chrome"
var BROWSER = "chrome";
var browser = chrome;
// #elif "@BROWSER" == "firefox"
var BROWSER = "firefox";
// #else
// #error
// #endif

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
 * @typedef {import("/src/consts.js").JutSuperCss} JutSuperCss
 * @type {JutSuperCss}
 */
var jsuperCss;

/**
 * @typedef {import("/src/consts.js").JutSuDomAttributes} JutSuDomAttributes
 * @type {JutSuDomAttributes}
 */
var jutsuAttrs;

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
 * @typedef {import("/src/consts.js").JutSuperIpcAwaitStates} JutSuperIpcAwaitStates
 * @type {JutSuperIpcAwaitStates}
 */
var ipcAwaits;

/**
 * @typedef {import("/src/consts.js").JutSuperIpcBoolRequestStates} JutSuperIpcBoolRequestStates
 * @type {JutSuperIpcBoolRequestStates}
 */
var ipcBoolRequests;

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
 * @typedef {import("/src/consts.js").JutSuperStorageTransitionKeys} JutSuperStorageTransitionKeys
 * @type {JutSuperStorageTransitionKeys}
 */
var transitionKeys;

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
 * @typedef {import("/src/messaging.js").JutSuperRequestMessageBuilder} JutSuperRequestMessageBuilder
 * @type {typeof import("/src/messaging.js").JutSuperRequestMessageBuilder}
 */
var JutSuperRequestMessageBuilder;

/**
 * @typedef {import("/src/messaging.js").JutSuperMessageBuilder} JutSuperMessageBuilder
 * @type {typeof import("/src/messaging.js").JutSuperMessageBuilder}
 */
var JutSuperMessageBuilder;

/**
 * @typedef {import("/src/ipc.js").JutSuperIpcValueDescriptor} JutSuperIpcValueDescriptor
 * @typedef {import("/src/consts.js").JutSuperStorageTransitionKeysTypes} JutSuperStorageTransitionKeysTypes
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
  /** @type {typeof import("/src/messaging.js")} */
  const messagingModule = await import(browser.runtime.getURL("/src/messaging.js"));

  jsuperErrors = errorModule.jsuperErrors;
  jsuperLog = logModule.jsuperLog;
  jsuperStorage = storageModule.jsuperStorage;
  jsuperCss = constsModule.JutSuperCss;
  jutsuAttrs = constsModule.JutSuDomAttributes;
  ipcIds = constsModule.JutSuperIpcIds;
  ipcKeys = constsModule.JutSuperIpcKeys;
  ipcAwaits = constsModule.JutSuperIpcAwaitStates;
  ipcBoolRequests = constsModule.JutSuperIpcBoolRequestStates;
  ipcLoadingStates = constsModule.JutSuperIpcLoadingStates;
  storageKeys = constsModule.JutSuperStorageKeys;
  transitionKeys = constsModule.JutSuperStorageTransitionKeys;
  assetPaths = constsModule.JutSuperAssetPaths;
  assetIds = constsModule.JutSuperAssetIds;
  JutSuperIpcBuilder = ipcModule.JutSuperIpcBuilder;
  JutSuperIpc = ipcModule.JutSuperIpc;
  JutSuperIpcRecvParamsBuilder = ipcModule.JutSuperIpcRecvParamsBuilder;
  JutSuperRequestMessageBuilder = messagingModule.JutSuperRequestMessageBuilder;
  JutSuperMessageBuilder = messagingModule.JutSuperMessageBuilder;
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

  /////////////////////////////
  // Injecting into the page //
  /////////////////////////////

  /**
   * @param {HTMLElement} node
   * @param {string} url
   * @param {string} id
   * @returns {undefined}
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
  }

  /**
   * @param {HTMLElement} node
   * @param {string} url
   * @param {string} id
   * @returns {undefined}
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
  }

  /**
   * @param {HTMLElement} node
   * @param {string} url
   * @param {string} id
   * @returns {undefined}
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
  }

  /////////////////////////////
  // Essentials loading wait //
  /////////////////////////////

  async listenEssentialsLoadState() {
    const cfg = new JutSuperIpcRecvParamsBuilder()
      .recvOnlyTheseKeys(ipcKeys.essentialsLoadingState)
      .build();

    for await (const evt of this.ipc.recv(cfg)) {
      jsuperLog.debug(new Error, evt);

      switch (evt.value) {
        case ipcLoadingStates.loaded:
          await this.handleEssentialsLoaded();
          break;
        default:
          jsuperLog.error(new Error, jsuperErrors.unhandledCaseError({
            location: this.LOCATION,
            target: `${evt.key}=${evt.value}`
          }).message);
      }
    }

    throw jsuperErrors.unexpectedEndError({
      location: this.LOCATION,
      target: `${this.listenEssentialsLoadState.name}()`
    });
  }

  async handleEssentialsLoaded() {
    await this.loadTransitionStorageAndClear();
  }

  ////////////////////////////////
  // Fullscreen change handling //
  ////////////////////////////////

  async listenFullscreenChange() {
    const cfg = new JutSuperIpcRecvParamsBuilder()
      .recvOnlyTheseKeys(ipcKeys.isFullscreen)
      .build();

    for await (const evt of this.ipc.recv(cfg)) {
      jsuperLog.debug(new Error, evt);
      await this.handleFullscreenChange(evt.value);
    }

    throw jsuperErrors.unexpectedEndError({
      location: this.LOCATION,
      target: `${this.listenFullscreenChange.name}()`
    });
  }

  /**
   * @param {boolean} state 
   */
  async handleFullscreenChange(state) {
    this.isFullscreen = state;
  }

  ////////////////////////////////////
  // Episode switch states handling //
  ////////////////////////////////////

  /**
   * @param {boolean} routeExisting 
   */
  async listenEpisodeSwitchPrepStates(routeExisting = false) {
    const cfg = new JutSuperIpcRecvParamsBuilder()
      .recvOnlyTheseKeys(ipcKeys.episodeSwitchPrep)
      .build();

    /**
     * 
     * @param {JutSuperContent} thisArg 
     * @param {JutSuperIpcValueDescriptor} evt 
     */
    async function route(thisArg, evt) {
      try {
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
            throw jsuperErrors.unhandledCaseError({
              location: thisArg.LOCATION,
              target: `${evt.key}=${evt.value}`
            });
        }
      } catch (e) {
        jsuperLog.error(new Error, e);
      }
    }

    if (routeExisting) {
      await route(this, this.ipc.get(ipcKeys.episodeSwitchPrep));
    }

    for await (const evt of this.ipc.recv(cfg)) {
      jsuperLog.debug(new Error, evt);
      await route(this, evt);
    }

    throw jsuperErrors.unexpectedEndError({
      location: this.LOCATION,
      target: `${this.listenEpisodeSwitchPrepStates.name}()`
    });
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
    let transition = await jsuperStorage.getTransition();

    if (transition === undefined) {
      transition = {}
    }

    const isSwitchedAutomatically = (
      transition.isSwitchingEpisode !== undefined ?
      transition.isSwitchingEpisode : false
    );
  
    this.ipc.send({
      key: ipcKeys.isEpisodeSwitchedAutomatically,
      value: isSwitchedAutomatically,
    });
    this.ipc.send({
      key: ipcKeys.episodeSwitchPrep,
      value: ipcAwaits.completed,
    });

    if (isSwitchedAutomatically) {
      jsuperLog.log(new Error, "episode was switched automatically");

      const body = document.getElementsByTagName(
        "body"
      )[0];
      const playerDiv = document.getElementById(
        jutsuAttrs.playerDivId
      );
      const header = document.getElementsByClassName(
        jutsuAttrs.headerClassName
      )[0];
      const infoPanel = document.getElementsByClassName(
        jutsuAttrs.infoPanelClassName
      )[0];
      const footer = document.getElementsByClassName(
        jutsuAttrs.footerClassName
      )[0];

      this.requestPlay();

      if (transitionKeys.isFullscreen) {
        await browser.runtime.sendMessage(
          (new JutSuperMessageBuilder())
            .request(
              (new JutSuperRequestMessageBuilder)
                .isFullscreenState(true)
                .build()
            )
            .build()
        );

        // disable scrolling
        body.style.overflow = "hidden";
        // hide header
        header.style.display = "none";
        // hide info panel
        infoPanel.style.display = "none";
        // hide footer
        footer.style.display = "none";

        // add fullscreen styling to the player
        playerDiv.classList.add(jutsuAttrs.playerFullscreenClassName);
        // make the player full window size
        playerDiv.classList.add(jsuperCss.fullscreen);
        // put the player above everything
        playerDiv.classList.add(jsuperCss.topIndex);
      }
    }
    else {
      jsuperLog.log(new Error, "episode was not switched automatically");
    }

    await jsuperStorage.removeTransition();
  }

  ////////////////////////////
  // Browser storage handle //
  ////////////////////////////

  /**
   * # Save fullscreen and episode switch states
   * @returns {Promise<void>}
   */
  async commitTransitionStorage() {
    /** @type {JutSuperStorageTransitionKeysTypes} */
    const transition = {};
    transition[transitionKeys.isFullscreen] = this.isFullscreen;
    transition[transitionKeys.isSwitchingEpisode] = this.isSwitchingEpisode;

    await jsuperStorage.setTransition(transition);
  }

  /**
   * # Load fullscreen and episode switch states
   * @returns {Promise<void>}
   */
  async loadTransitionStorage() {
    let transition = await jsuperStorage.getTransition();

    if (transition === undefined) {
      transition = {}
    }

    this.isFullscreen = transition[transitionKeys.isFullscreen];
    this.isSwitchingEpisode = transition[transitionKeys.isSwitchingEpisode];
  }

  /**
   * # Load fullscreen and episode switch states, then clear
   * @returns {Promise<void>}
   */
  async loadTransitionStorageAndClear() {
    await this.loadTransitionStorage();
    await jsuperStorage.removeTransition();
  }

  requestPlay() {
    this.ipc.send({
      key: ipcKeys.playingControl,
      value: ipcBoolRequests.requestTrue
    });
  }

  /**
   * @param {HTMLElement} node
   * @param {Object.<string, string>} attrs 
   * @returns {undefined}
   */
  static applyAttrs(node, attrs) {
    for (const key in attrs) {
      const value = attrs[key];
      node.setAttribute(key, value);
    }
  }
}
