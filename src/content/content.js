// #if "@BROWSER" == "blink"
var BROWSER = "blink";
var browser = chrome;
// #elif "@BROWSER" == "gecko"
var BROWSER = "gecko";
// #else
// #error
// #endif


/**
 * @typedef {import("/src/consts.js").JutSuperBrowsers} JutSuperBrowsers
 * @type {JutSuperBrowsers}
 */
var browsers;

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
 * @typedef {import("/src/consts.js").JutSuperRegex} JutSuperRegex
 * @type {JutSuperRegex}
 */
var regexp;

/**
 * @typedef {import("/src/storage.js").JutSuperStorage} JutSuperStorage
 * @type {JutSuperStorage}
 */
var jsuperStorage;

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
 * @typedef {import("/src/consts.js").JutSuperIpcIds} JutSuperIpcIds
 * @type {JutSuperIpcIds}
 */
var ipcIds;


/**
 * @typedef {import("/src/consts.js").JutSuperIpcDefaultNodeProps} JutSuperIpcDefaultNodeProps
 * @type {JutSuperIpcDefaultNodeProps}
 */
var ipcDefaultNodeProps;

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

  browsers = constsModule.JutSuperBrowsers;
  jsuperErrors = errorModule.jsuperErrors;
  jsuperLog = logModule.jsuperLog;
  regexp = constsModule.JutSuperRegex;
  jsuperStorage = storageModule.jsuperStorage;
  domClasses = constsModule.JutSuperDomClasses;
  defaultFonts = constsModule.JutSuperDefaultFonts;
  jutsuIds = constsModule.JutSuDomIds;
  jutsuClasses = constsModule.JutSuDomClasses;
  ipcIds = constsModule.JutSuperIpcIds;
  ipcDefaultNodeProps = constsModule.JutSuperIpcDefaultNodeProps;
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
  JutSuperActionsMessageBuilder = messagingModule.JutSuperActionsMessageBuilder;
  JutSuperRequestsRequestMessageBuilder = messagingModule.JutSuperRequestsRequestMessageBuilder;
  JutSuperMessageBuilder = messagingModule.JutSuperMessageBuilder;
})().then(() => {
  jutsuperContent = new JutSuperContent();
})


/**
 * @typedef {import("/src/ipc.js").JutSuperIpcValueDescriptor} JutSuperIpcValueDescriptor
 * @typedef {import("/src/consts.js").JutSuperStorageTransitionKeysTypes} JutSuperStorageTransitionKeysTypes
 * @typedef {import("/src/messaging.js").JutSuperRequestsResponseMessage} JutSuperRequestsResponseMessage
 * @typedef {import("/src/browser.js").BrowserWindowStatesKeys} BrowserWindowStatesKeys
 */


/** @type {JutSuperContent} */
var jutsuperContent;


class JutSuperContent {
  constructor() {
    /** @type {string} */
    this.LOCATION = JutSuperContent.name;

    /** @type {boolean} */
    this.isFullscreen = undefined;
    /** @type {boolean} */
    this.isSwitchingEpisode = undefined;

    /** @type {JutSuperIpc} */
    this.ipc = new JutSuperIpcBuilder()
      .createCommunicationNode()
      .identifyAs(ipcIds.content)
      .build();
    
    /** @type {JutSuperIpc} */
    this.settingsIpc = new JutSuperIpcBuilder()
      .createCommunicationNode()
      .communicationNodeTagIs(ipcDefaultNodeProps.settingsTag)
      .communicationNodeIdIs(ipcDefaultNodeProps.settingsId)
      .identifyAs(ipcIds.content)
      .build();

    /** @type {string} */
    this.urlSquareGreenLogo48Svg = browser.runtime.getURL(assetPaths.squareGreenLogo48Svg);
    /** @type {string} */
    this.urlSquareWhiteLogo48Svg = browser.runtime.getURL(assetPaths.squareWhiteLogo48Svg);
    /** @type {string} */
    this.urlDropdownSvg = browser.runtime.getURL(assetPaths.dropdownSvg);
    /** @type {string} */
    this.urlSkipSvg = browser.runtime.getURL(assetPaths.skipSvg);
    /** @type {string} */
    this.urlJutSuperIpcJs = browser.runtime.getURL(assetPaths.ipcJs);
    /** @type {string} */
    this.urlJutSuperCss = browser.runtime.getURL(assetPaths.jutsuperCss);
    /** @type {string} */
    this.urlJutSuperJs = browser.runtime.getURL(assetPaths.jutsuperJs);
    /** @type {string} */
    this.urlSettingsJs = browser.runtime.getURL("/src/page/settings.js");
    /** @type {string} */
    this.urlSettingsHtml = browser.runtime.getURL(assetPaths.settingsHtml);

    const head = document.getElementsByTagName("head")[0];

    this.injectFonts(head, defaultFonts);
    this.injectImage(head, this.urlDropdownSvg, assetIds.dropdownSvg);
    this.injectImage(head, this.urlSkipSvg, assetIds.skipSvg);
    this.injectImage(head, this.urlSquareWhiteLogo48Svg, assetIds.squareWhiteLogo48Svg);
    this.injectImage(head, this.urlSquareWhiteLogo48Svg, assetIds.squareWhiteLogo48Svg);
    this.injectCss(head, this.urlJutSuperCss, assetIds.jutsuperCss);
    this.injectModule(head, this.urlJutSuperIpcJs, assetIds.jutsuperIpcJs);
    this.injectModule(head, this.urlJutSuperJs, assetIds.jutsuperJs);
    this.injectDocument(head, this.urlSettingsHtml, assetIds.settingsHtml);


    this.listenEssentialsLoadState();
    this.listenFullscreenChange();
    this.listenFullscreenControl();
    this.listenEpisodeSwitchPrepStates();
    this.listenWindowStatesRequests();
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
    JutSuperContent.applyAttrs(elm, attrs);

    node.appendChild(elm);
  }

  /**
   * @param {HTMLElement} node
   * @param {string} url
   * @param {string} id
   * @returns {void}
   */
  async injectCss(node, url, id) {
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
    JutSuperContent.applyAttrs(elm, attrs);

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
    JutSuperContent.applyAttrs(elm, attrs);

    node.appendChild(elm);
  }

  /////////////////////////////
  // Essentials loading wait //
  /////////////////////////////

  /**
   * @returns {Promise<never>}
   */
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

  /**
   * @returns {Promise<never>}
   */
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
  // Window state requests handling //
  ////////////////////////////////////

  /**
   * @returns {Promise<never>}
   */
  async listenWindowStatesRequests() {
    const cfg = new JutSuperIpcRecvParamsBuilder()
      .recvOnlyTheseKeys(ipcKeys.windowState)
      .build();

    for await (const evt of this.ipc.recv(cfg)) {
      jsuperLog.debug(new Error, evt);

      try {
        switch (evt.value) {
          case ipcAwaits.request:
            await this.handleWindowStateRequest();
            break;
          default:
            throw jsuperErrors.unhandledCaseError({
              location: this.LOCATION,
              target: `${evt.key}=${evt.value}`
            });
        }
      } catch (e) {
        jsuperLog.error(new Error, e);
      }
    }

    throw jsuperErrors.unexpectedEndError({
      location: this.LOCATION,
      target: `${this.listenWindowStatesRequests.name}()`
    });
  }

  /**
   * @returns {Promise<void>}
   */
  async handleWindowStateRequest() {
    /** @type {BrowserWindowStatesKeys} */
    let windowState;
    let message = (new JutSuperMessageBuilder())
      .requests(
        (new JutSuperRequestsRequestMessageBuilder())
          .getWindowState()
          .build()
      )
      .build()

    
    if (BROWSER === browsers.blink) {
      /** @type {JutSuperRequestsResponseMessage} */
      const resp = await new Promise(resolve => {
        browser.runtime.sendMessage(message,
          /** @param {JutSuperRequestsResponseMessage} response */
          (response) => {
            resolve(response);
          }
        );
      });
      windowState = resp.windowState;
    }
    else if (BROWSER === browsers.gecko) {
      /** @type {Promise<JutSuperRequestsResponseMessage>} */
      const sendResult = await browser.runtime.sendMessage(message);
      const resp = await sendResult;
      windowState = resp.windowState;
    }

    console.log("windowState =", windowState);

    this.ipc.send({
      key: ipcKeys.windowState,
      value: windowState
    })
  }

  ////////////////////////
  // Fullscreen control //
  ////////////////////////

  async listenFullscreenControl() {
    const cfg = new JutSuperIpcRecvParamsBuilder()
      .recvOnlyTheseKeys(ipcKeys.fullscreenControl)
      .build();

    for await (const evt of this.ipc.recv(cfg)) {
      jsuperLog.debug(new Error, evt);

      try {
        switch (evt.value) {
          case ipcBoolRequests.requestFalse:
            await this.handleFullscreenExitRequest();
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

    throw jsuperErrors.unexpectedEndError({
      location: this.LOCATION,
      target: `${this.listenFullscreenControl.name}()`
    });
  }

  async handleFullscreenExitRequest() {
    await browser.runtime.sendMessage(
      (new JutSuperMessageBuilder())
        .actions(
          (new JutSuperActionsMessageBuilder())
            .isFullscreenState(false)
            .build()
        )
        .build()
    );
  }

  ////////////////////////////////////
  // Episode switch states handling //
  ////////////////////////////////////

  /**
   * @param {boolean} routeExisting 
   * @returns {Promise<never>}
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

      this.requestPlay();

      if (transition.isFullscreen) {
        const body = document.getElementsByTagName(
          "body"
        )[0];
        const playerDiv = document.getElementById(
          jutsuIds.myPlayer
        );
        const header = document.getElementsByClassName(
          jutsuClasses.zFixHeader
        )[0];
        const infoPanel = document.getElementsByClassName(
          jutsuClasses.infoPanel
        )[0];
        const footer = document.getElementsByClassName(
          jutsuClasses.footer
        )[0];

        // disable scrolling
        body.style.overflow = "hidden";
        // hide header
        header.style.display = "none";
        // hide info panel
        infoPanel.style.display = "none";
        // hide footer
        footer.style.display = "none";

        // add fullscreen styling to the player
        playerDiv.classList.add(jutsuClasses.vjsFullscreen);
        // make the player full window size
        playerDiv.classList.add(domClasses.fullscreen);
        // put the player above everything
        playerDiv.classList.add(domClasses.topIndex);

        // inject function to be able to exit
        // this custom fullscreen mode
        this.ipc.send({
          key: ipcKeys.injectCustomFullscreenExit,
          value: ipcBoolRequests.requestTrue
        });

        // wait for injection to complete
        await this.ipc.recvOnce({
          key: ipcKeys.injectCustomFullscreenExit,
          value: ipcAwaits.completed
        });

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
   * @returns {void}
   */
  static applyAttrs(node, attrs) {
    for (const key in attrs) {
      const value = attrs[key];
      node.setAttribute(key, value);
    }
  }
}
