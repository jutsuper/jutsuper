/// <reference types="video.js/index.d.ts" />

import { jsuperLog } from "/src/log.js";
import { jsuperErrors } from "/src/error.js";
import {
  JutSuperIpcFlags as ipcFlags,
  JutSuperIpcNamespaces as ipcNamespaces,
  JutSuperIpcIds as ipcIds,
  JutSuperIpc,
  JutSuperIpcBuilder,
  JutSuperIpcRspParamsBuilder,
} from "/src/ipc.js";
import {
  ANY,
  JutSuFunctions as jutsuFns,
  JutSuDomIds as jutsuIds,
  JutSuDomClasses as jutsuClasses,
  JutSuperAssetIds as assetIds,
  JutSuperDomIds as domIds,
  JutSuperDomClasses as domClasses,
} from "/src/consts.js";
import { JutSuperSettingsSkipOrder as skipOrder } from "/src/settings.js";
import { JutSuperSkippingPopup } from "/src/page/notifications/skipping.js";
import { JutSuperAutoplayUnavailablePopup } from "/src/page/notifications/autoplayUnavailable.js";
import { JutSuperSettingsPopup } from "/src/page/settings.js";
import { JutSuperNotificationPopup } from "/src/page/notification.js";
import { AsyncLock } from "/src/lock.js";
import { AsyncSleepReason } from "/src/sleep.js";
import { jsuperUtil } from "/src/util.js";


console.debug("JutSuper: loading /src/page/jutsuper.js");


/**
 * @typedef {import("/src/types/ipc.d.ts").JutSuperIpcReqSchema} JutSuperIpcReqSchema
 * @typedef {import("/src/types/ipc.d.ts").JutSuperIpcRspSchema} JutSuperIpcRspSchema
 * @typedef {import("/src/types/ipc.d.ts").JutSuperIpcReqSchemaFilter} JutSuperIpcReqSchemaFilter
 * @typedef {import("/src/types/ipc.d.ts").JutSuperIpcRspSchemaFilter} JutSuperIpcRspSchemaFilter
 * @typedef {import("/src/types/settings.d.ts").JutSuperSettingsObject} JutSuperSettingsObject
 * @typedef {import("/src/types/settings.d.ts").JutSuperSettingsObjectPartial} JutSuperSettingsObjectPartial
 * @typedef {import("/src/types/settings.d.ts").JutSuperSettingsObjectFilter} JutSuperSettingsObjectFilter
 * @typedef {import("/src/types/notification.d.ts").JutSuperNotificationUrls} JutSuperNotificationUrls
 * @typedef {import("/src/sleep.js").AsyncSleepReasonKeys} AsyncSleepReasonKeys
 */


/** @type {JutSuper} */
var jutsuper;


class JutSuper {
  /**
   * @param {videojs.VideoJsPlayer} player Jut.su's player
   */
  constructor(player) {
    this.LOCATION = JutSuper.name;

    jsuperLog.debug(`${this.LOCATION}: constructing`);
    
    if (!player || !player.overlays_ || !player.on) {
      throw new Error(
        `${this.LOCATION}: player not yet initialized, ` +
        `unable to construct ${this.LOCATION}`
      );
    }

    /**
     * # Requesting IPC
     * @type {JutSuperIpc<
     *   JutSuperIpcReqSchema,
     *   JutSuperIpcRspSchema,
     *   JutSuperIpcRspSchemaFilter
     * >}
     */
    this.reqIpc = new JutSuperIpcBuilder()
      .identifyAs(ipcIds.page)
      .ignoreWithoutAnyOfTheseFlags([ipcFlags.rsp])
      .sendWithTheseFlags([ipcFlags.req])
      .build();
    
    /**
     * # Responding IPC
     * @type {JutSuperIpc<
     *   JutSuperIpcRspSchema,
     *   JutSuperIpcReqSchema,
     *   JutSuperIpcReqSchemaFilter
     * >}
     */
    this.rspIpc = new JutSuperIpcBuilder()
      .identifyAs(ipcIds.page)
      .ignoreWithoutAnyOfTheseFlags([ipcFlags.req])
      .sendWithTheseFlags([ipcFlags.rsp])
      .build();
  
    /**
     * # Responding settings IPC
     * @type {JutSuperIpc<
     *   JutSuperSettingsObjectPartial,
     *   JutSuperSettingsObjectPartial,
     *   JutSuperSettingsObjectFilter
     * >}
     */
    this.reqSettingsIpc = new JutSuperIpcBuilder()
      .namespaceIs(ipcNamespaces.settings)
      .identifyAs(ipcIds.page)
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
      .identifyAs(ipcIds.page)
      .ignoreWithoutAnyOfTheseFlags([ipcFlags.req])
      .sendWithTheseFlags([ipcFlags.rsp])
      .build();
    
    this.reqIpc.send({ loadingAllowed: { tell: { state: true } } });

    this.assetsInjectedLock = new AsyncLock({ oneTime: true });
    /** @type {string | undefined} */
    this.extensionUrl = undefined;

    this.isFullscreen = false;
    this.isCustomFullscreen = false;
    /** @type {number | undefined} */
    this.peakScreenHeight = undefined;
    this.regionSkipCancelled = false;
    this.awaitingSkipCancel = false;

    /** @type {HTMLDivElement} */
    this.vjsContainer = null;
    this.testVideo = document.createElement("video");
    /** @type {boolean | undefined} */
    this.isAutoplayAvailable = undefined;

    /** @type {JutSuperSkippingPopup} */
    this.skippingNotif = undefined;
    /** @type {JutSuperAutoplayUnavailablePopup} */
    this.autoplayUnavailableNotif = undefined;

    /** @type {HTMLDivElement} */
    this.settingsArea = null;
    /** @type {HTMLDivElement} */
    this.settingsClipArea = document.createElement("div");
    /** @type {videojs.default.Button} */
    this.vjsButton = undefined;
  
    this.player = player;
    this.playerDiv = /** @type {HTMLElement} */ (
      document.getElementById(jutsuIds.myPlayer)
    );
    this.openingTriggered = false;
    this.endingTriggered = false;
    /**
     * # Time ranges when it's possible to skip the opening
     * (in seconds)
     * 
     * @example
     * ```
     * // if there is one skipper, it may be
     * [[ 83, 98 ]]
     * // if there are multiple skippers, it may be
     * [[ 83, 98 ], [ 100, 115 ]]
     * ```
     * @type {number[][]} 
     */
    this.openingSkipperRngs = this.sortOverlayRngs(this.getOverlayRngsByFunctionName(
      jutsuFns.skipOpeningFnName
    ));
    /**
     * # Time ranges when it's possible to skip the ending
     * (in seconds)
     * 
     * @example
     * ```
     * // if there is one skipper, it may be
     * [[ 1205, 1225 ]]
     * // if there are multiple skippers, it may be
     * [[ 1205, 1225 ], [ 1405, 1425 ]]
     * ```
     * @type {number[][]} 
     */
    this.endingSkipperRngs = this.sortOverlayRngs(this.getOverlayRngsByFunctionName(
      jutsuFns.skipEndingFnName
    ));
    this.seekedAutomatically = false;

    jsuperLog.debug(`${this.LOCATION}: opening skipper ranges:`, this.openingSkipperRngs);
    jsuperLog.debug(`${this.LOCATION}: ending skipper ranges:`, this.endingSkipperRngs);

    document.addEventListener("keydown", event => {
      if (!this.awaitingSkipCancel) {
        return;
      }

      const keyLabel = jsuperUtil.getKeyLabelFromRawLabel(event.key);
      if (keyLabel !== window.jsuperSettings.skipCancelKey) {
        return;
      }

      this.skippingNotif.end();
    });

    this.listenAssetsInjected();
    this.listenPlayingRequests();
    this.listenPlayerFullscreenExitRequests();
    this.listenFullscreenExitInjectionRequest();
    this.listenSettingsChange();

    this.#initPage().then(() => {
      jsuperLog.debug(`${this.LOCATION}: constructed`);
    });
  }

  async #initPage() {
    document.addEventListener("mousedown", event => {
      if (!this.vjsButton || !this.settingsArea) {
        return;
      }

      const vjsButtonBoundaries = this.vjsButton.el().getBoundingClientRect();
      const isInVjsButtonXRange = (
        event.clientX >= vjsButtonBoundaries.left &&
        event.clientX <= vjsButtonBoundaries.right
      );
      const isInVjsButtonYRange = (
        event.clientY >= vjsButtonBoundaries.top &&
        event.clientY <= vjsButtonBoundaries.bottom
      );
      const isInVjsButtonAreaRange = (
        isInVjsButtonXRange &&
        isInVjsButtonYRange
      );
      
      if (isInVjsButtonAreaRange) {
        // event gets handled by the button itself
        return;
      }

      const settingsAreaBoundaries = this.settingsArea.getBoundingClientRect();
      const isInSettingsXRange = (
        event.clientX >= settingsAreaBoundaries.left &&
        event.clientX <= settingsAreaBoundaries.right
      );
      const isInSettingsYRange = (
        event.clientY >= settingsAreaBoundaries.top &&
        event.clientY <= settingsAreaBoundaries.bottom
      );
      const isInSettingsAreaRange = (
        isInSettingsXRange &&
        isInSettingsYRange
      );

      if (!isInSettingsAreaRange) {
        // hide settings area
        this.settingsArea.classList.remove("jutsuper-visible");
      }
    });
    this.player.on("seeking", () => {
      if (this.settingsPopup.isActive() && !this.seekedAutomatically) {
        this.settingsPopup.hide();
      }

      this.seekedAutomatically = false;

      if (this.skippingNotif && this.skippingNotif.isActive()) {
        this.openingTriggered = false;
        this.endingTriggered = false;
        this.skippingNotif.end();
      }
    });
    this.player.on("play", () => {
      if (this.autoplayUnavailableNotif && this.autoplayUnavailableNotif.isActive()) {
        this.autoplayUnavailableNotif.hide();
      }
    });
    
    this.injectPlayerClassChangeListener();
    this.injectTimeupdateListener();
    await this.injectOverlays();

    this.autoplayUnavailableNotif.dontShowButton.addEventListener("click", event => {
      this.reqSettingsIpc.send({
        notifications: { autoplayUnavailable: { doShow: false } }
      })
    });

    await this.tellEssentialsLoaded();
  }

  /**
   * @param {boolean} doShowNotif
   * @returns {Promise<boolean>}
   */
  async testAutoplay(doShowNotif) {
    try {
      await this.testVideo.play();
    }
    catch (e) {
      this.isAutoplayAvailable = false;
      if (
        doShowNotif &&
        !this.autoplayUnavailableNotif.isActive()
      ) {
        this.autoplayUnavailableNotif.show();
      }
      return this.isAutoplayAvailable;
    }
  }

  /**
   * # Check if `value` is in the `range`, exclusive (not including the last)
   * 
   * @param {number} value number value to check in the range 
   * @param {number[] | number[][]} range where to check
   * example values: `[ 83, 98 ]` || `[[ 83, 98 ], [ 100, 115 ]]`
   * @returns {boolean}
   */
  static isInRangeExclusive(value, range) {
    if (range.length < 1) {
      return false;
    }

    if (typeof range[0] === "number" && typeof range[1] === "number") {
      /** @type {number[]} */
      range;

      const start = range[0]
      const end = range[1]
      return value >= start && value < end
    }
    else if (range[0].constructor === Array) {
      /** @type {number[][]} */
      range;

      for (const rng of range) {
        const start = rng[0]
        const end = rng[1]

        if (value >= start && value < end) {
          return true
        }
      }
    }

    return false;
  }

  /** 
   * # Get overlay range (start, end) in seconds by function name.
   * 
   * **jut.su** uses `https://github.com/videojs/videojs-overlay`
   * for skippers and achievements overlay.
   * 
   * **videojs-overlay** structure contains all added overlays
   * in `player.overlays_` (array).
   * 
   * Each overlay has a key `options_` with attributes like
   * `start`, `end` and `the_function` to specify when
   * to show this overlay, when to end, what to do on click, etc.
   * 
   * We'll read the boundaries of these overlays to determine
   * when to skip openings and endings.
   * 
   * @example
   * ```
   * const openingRng = getOverlayRngsByFunctionName("skip_video_intro");
   * // example values:
   * // openingRng === [[ 83, 98 ]] ||
   * // openingRng === [[ 83, 98 ], [ 100, 115 ]]
   * const endingRng = getOverlayRngsByFunctionName("video_go_next_episode");
   * // example values:
   * // endingRng === [[ 1205, 1225 ]] ||
   * // endingRng === [[ 1205, 1225 ], [ 1405, 1425 ]]
   * ```
   * @param {string} fn_name
   * @returns {number[][]}
   */
  getOverlayRngsByFunctionName(fn_name) {
    /** @type {number[][]} */
    const ranges = [];
    for (const overlay of this.player.overlays_) {
      if (overlay.options_.the_function === fn_name) {
        ranges.push([overlay.options_.start, overlay.options_.end]);
      }
    }

    return ranges;
  }

  /**
   * # Sort ranges by the first number in the range
   * 
   * @example
   * ```
   * const sorted = sortOverlayRngs([[ 1405, 1425 ], [ 1205, 1225 ]])
   * // console.assert(sorted === [[ 1205, 1225 ], [ 1405, 1425 ]])
   * ```
   * @param {number[][]} rngs
   * @return {number[][]}
   */
  sortOverlayRngs(rngs) {
    return rngs.sort((a, b) => a[0] - b[0]);
  }

  /**
   * # Start opening skip countdown
   * @returns {Promise<void>}
   */
  async startSkippingOpening() {
    if (!window.cur_time_cookie) {
      jsuperLog.error(
        `${this.LOCATION}: cannot start skipping opening, ` +
        `video wasn't played yet ` +
        `(cur_time_cookie is ${window.cur_time_cookie})`
      );

      return undefined;
    }

    jsuperLog.debug(`${this.LOCATION}: able to skip opening`);

    const actionResult = await this.startSkipAction();
    if (actionResult === "cancelled") {
      return;
    }

    this.seekedAutomatically = true;

    window[jutsuFns.skipOpeningFnName]();
  }

  /**
   * # Stop opening skip countdown
   * @returns {void}
   */
  stopSkippingOpening() {
    this.skippingNotif.end();
    jsuperLog.debug(`${this.LOCATION}: not skipping opening anymore`);
  }
  
  /**
   * # Start ending skip countdown
   * @returns {Promise<undefined>}
   */
  async startSkippingEnding() {
    if (!window.cur_time_cookie) {
      jsuperLog.debug(
        `${this.LOCATION}: cannot start skipping ending, ` +
        `video wasn't played yet ` +
        `(cur_time_cookie is ${window.cur_time_cookie})`
      );
      return;
    }

    const isAllowed = (await this.reqIpc.sendAndRecvOnce(
      { preEpisodeSwitch: { askIsAllowed: true } },
      { schema: { preEpisodeSwitch: { rspIsAllowed: ANY } } }
    )).preEpisodeSwitch.rspIsAllowed;

    if (!isAllowed) {
      return;
    }

    jsuperLog.debug(`${this.LOCATION}: able to skip ending`);

    const actionResult = await this.startSkipAction();

    if (actionResult === AsyncSleepReason.cancelled) {
      return;
    }

    jsuperLog.debug(`${this.LOCATION}: sending episode switch request and awaiting response`);

    const preSwitchResponse = (await this.reqIpc.sendAndRecvOnce(
      { preEpisodeSwitch: { req: { state: true, isFullscreen: this.isFullscreen } } },
      { schema: { preEpisodeSwitch: { rsp: ANY } } }
    )).preEpisodeSwitch.rsp;

    if (!preSwitchResponse.isFulfilled) {
      // then switching episode is forbidden
      return;
    }

    jsuperLog.debug(`${this.LOCATION}: episode switching request fulfilled`);

    if (!window.jsuperSettings.endings.doPersistFullscreen) {
      this.reqIpc.send(
        { fullscreen: { reqExit: true } }
      );
    }

    this.seekedAutomatically = true;

    window[jutsuFns.skipEndingFnName]();
  }
  
  /**
   * # Stop ending skip countdown
   * @returns {void}
   */
  stopSkippingEnding() {
    this.skippingNotif.end();
    jsuperLog.debug(`${this.LOCATION}: not skipping ending anymore`);
  }

  /**
   * @returns {Promise<AsyncSleepReasonKeys>}
   */
  async startSkipAction() {
    this.awaitingSkipCancel = true;

    const delay = typeof window.jsuperSettings.skipDelayS !== "undefined" ?
      window.jsuperSettings.skipDelayS : 0;

    if (delay < 1) {
      return AsyncSleepReason.timeout;
    }

    let result = await this.skippingNotif.start();
    jsuperLog.debug(`${this.LOCATION}: skipping action returns`, result);
    return result
  }

  /**
   * # Check if we are either in opening or ending time ranges
   * @returns {void}
   */
  checkForKeyTimestamps() {
    const isPlaying = !this.player.paused();
    const time = this.player.currentTime();

    let selectedOpeningsRange = undefined;
    let selectedEndingsRange = undefined;

    const desiredOpeningSkipOrder = window.jsuperSettings.openings.skipOrder;
    const desiredEndingSkipOrder = window.jsuperSettings.endings.skipOrder;

    if (desiredOpeningSkipOrder === skipOrder.anyOccurrence) {
      selectedOpeningsRange = this.openingSkipperRngs;
    }
    else if (desiredOpeningSkipOrder === skipOrder.firstOccurrence) {
      selectedOpeningsRange = this.openingSkipperRngs[0];
    }
    else if (desiredOpeningSkipOrder === skipOrder.lastOccurrence) {
      selectedOpeningsRange = this.openingSkipperRngs[this.openingSkipperRngs.length - 1];
    }

    if (desiredEndingSkipOrder === skipOrder.anyOccurrence) {
      selectedEndingsRange = this.endingSkipperRngs;
    }
    else if (desiredEndingSkipOrder === skipOrder.firstOccurrence) {
      selectedEndingsRange = this.endingSkipperRngs[0];
    }
    else if (desiredEndingSkipOrder === skipOrder.lastOccurrence) {
      selectedEndingsRange = this.endingSkipperRngs[this.endingSkipperRngs.length - 1];
    }

    /** Opening flags */
    const doSkipOpenings = window.jsuperSettings.openings.doSkip;
    const selectedOpeningRangeExists = (
      typeof selectedOpeningsRange !== "undefined" &&
      selectedOpeningsRange.length > 0
    );
    const inSelectedOpeningRange = selectedOpeningRangeExists ?
      JutSuper.isInRangeExclusive(time, selectedOpeningsRange) : false;

    /** Ending flags */
    const doSkipEndings = window.jsuperSettings.endings.doSkip;
    const selectedEndingRangeExists = (
      typeof selectedEndingsRange !== "undefined" &&
      selectedEndingsRange.length > 0
    );
    const inSelectedEndingRange = selectedEndingRangeExists ?
      JutSuper.isInRangeExclusive(time, selectedEndingsRange) : false;

    if (
      doSkipOpenings &&
      selectedOpeningRangeExists &&
      inSelectedOpeningRange &&
      isPlaying
    ) {
      // then we currently see the opening skip button
  
      if (this.openingTriggered) {
        // then we have already recorded button's appearance,
        // no need for more triggers
        return;
      }

      this.openingTriggered = true;
      this.startSkippingOpening();
    }
    else if (
      doSkipEndings &&
      selectedEndingRangeExists &&
      inSelectedEndingRange &&
      isPlaying
    ) {
      // then we currently see the ending skip button

      if (this.endingTriggered) {
        // then we have already recorded button's appearance,
        // no need for more triggers
        return;
      }

      this.endingTriggered = true;
      this.startSkippingEnding();
    }
    else {
      if (this.openingTriggered) {
        this.openingTriggered = false;
        this.stopSkippingOpening();
      }
      
      if (this.endingTriggered) {
        this.endingTriggered = false;
        this.stopSkippingEnding();
      }
    }
  }

  /**
   * @returns {Promise<void>}
  */
  async tellEssentialsLoaded() {
    // tell that essentials are loaded
    this.reqIpc.send(
      { essentialsLoaded: { tell: { state: true } } }
    );
  }

  /**
   * @returns {void}
   */
  handlePlayerClassChange() {
    /**
     * `classList.contains("vjs-fullscreen")` is better
     * than `player.isFullscreen()`,
     * because when pressing F11 (going out of fullscreen),
     * the `fullscreenchange` event will be fired,
     * but the value returned by `isFullscreen()`
     * will still be `true`
     */
    const isFullscreen = this.playerDiv.classList.contains(
      jutsuClasses.vjsFullscreen
    );

    if (isFullscreen !== this.isFullscreen) {
      this.isFullscreen = isFullscreen;
      jsuperLog.debug(`${this.LOCATION}: vjs fullscreen changed, state:`, this.isFullscreen);
    }
  }

  /**
   * @returns {void}
   */
  injectTimeupdateListener() {
    // on each time update, call `this.checkForKeyTimestamps`
    this.player.on("timeupdate", () => {
      JutSuper.prototype["checkForKeyTimestamps"].call(this, []);
    });
  }

  /**
   * @returns {void}
   */
  injectPlayerClassChangeListener() {
    const options = { attributes: true };

    new MutationObserver(
      (mutations, _observer) => {
        for (const record of mutations) {
          if (record.attributeName !== "class") {
            return null;
          }

          this.handlePlayerClassChange();
        }
      }
    ).observe(
      this.playerDiv, options
    );
  }

  /**
   * @param {Event} event 
   */
  onSkipPopupCancelClick(event) {
    this.regionSkipCancelled = true;
  }

  /**
   * @returns {Promise<void>}
   */
  async injectOverlays() {
    await this.assetsInjectedLock.promise;

    jsuperLog.debug(`${this.LOCATION}: injecting overlays`);

    this.notifUrls = /** @type {JutSuperNotificationUrls} */ ({
      skipping: this.extensionUrl + "/src/page/notifications/skipping.html",
      autoplayUnavailable: this.extensionUrl + "/src/page/notifications/autoplayUnavailable.html"
    });

    const vjsContainer = new DOMParser().parseFromString(
      await (await fetch(`${this.extensionUrl}/src/page/vjsContainer.html`)).text(), "text/html"
    );

    this.vjsNotifArea = /** @type {HTMLDivElement} */ (
      vjsContainer.getElementById(domIds.vjsNotifArea)
    );
    const vjsSettingsArea = /** @type {HTMLDivElement} */ (
      vjsContainer.getElementById(domIds.vjsSettingsArea)
    );

    ////// settings //////

    const settingsDoc = new DOMParser().parseFromString(
      await (await fetch(`${this.extensionUrl}/src/page/settings.html`)).text(), "text/html"
    );
    this.settingsArea = /** @type {HTMLDivElement} */ (
      settingsDoc.getElementById(domIds.settingsRoot)
    );
    this.settingsArea.classList.remove("jutsuper-visible");
    this.settingsArea.classList.add(domClasses.displayHidden);
    this.settingsPopup = new JutSuperSettingsPopup(this.settingsArea);
    await this.settingsPopup.ipcRecvReady.promise;
    vjsSettingsArea.append(this.settingsArea);

    const skippingNotifDoc = new DOMParser().parseFromString(
      await (await fetch(`${this.extensionUrl}/src/page/notification.html`)).text(), "text/html"
    );
    const skippingNotifRoot = /** @type {HTMLDivElement} */ (
      skippingNotifDoc.getElementById(domIds.notifRoot)
    );
    skippingNotifRoot.classList.remove("jutsuper-visible");
    skippingNotifRoot.classList.add(domClasses.displayHidden);
    this.skippingNotif = await new JutSuperNotificationPopup(
      skippingNotifRoot,
      this.notifUrls
    ).setSkippingContent();
    this.vjsNotifArea.append(skippingNotifRoot);

    ////// autoplay unavailable //////

    const autoplayUnavailableNotifDoc = new DOMParser().parseFromString(
      await (await fetch(`${this.extensionUrl}/src/page/notification.html`)).text(), "text/html"
    );
    const autoplayUnavailableNotifRoot = /** @type {HTMLDivElement} */ (
      autoplayUnavailableNotifDoc.getElementById(domIds.notifRoot)
    );
    autoplayUnavailableNotifRoot.classList.remove("jutsuper-visible");
    autoplayUnavailableNotifRoot.classList.add(domClasses.displayHidden);
    this.autoplayUnavailableNotif = await new JutSuperNotificationPopup(
      autoplayUnavailableNotifRoot,
      this.notifUrls
    ).setAutoplayUnavailableContent();
    this.vjsNotifArea.append(autoplayUnavailableNotifRoot);

    this.replaceImgSources(vjsContainer);
    jsuperUtil.insertNodesFirst(this.player.el(), vjsContainer.body.children);

    this.player.on("userinactive", event => {
      if (this.player.paused()) {
        return;
      }
      this.settingsArea.classList.remove("jutsuper-visible");
    });

    (async () => {
      // request localization and wait
      await this.reqIpc.sendAndRecvOnce(
        { localization: { reqLocalize: true } },
        { schema: { localization: { rspLocalize: { isFulfilled: true } } } }
      );
  
      const controlBar = /** @type {videojs.ControlBar} */ (
        this.player.controlBar
      );
      const qualitySelectorEl = /** @type {HTMLElement} */ (
        controlBar.qualitySelector.el()
      );
      const thumbnailHolder = /** @type {HTMLElement} */ (
        this.player.el().getElementsByClassName(jutsuClasses.vjsThumbnailHolder)[0]
      );
      
      this.vjsButton = this.constructVjsButton();

      /** add jutsuper button to the control bar */
      controlBar.addChild(this.vjsButton);
      /** to make quality selector list overlap jutsuper settings */
      qualitySelectorEl.style.zIndex = "2";
      /** to make thumbnail holder overlap jutsuper settings */
      thumbnailHolder.style.zIndex = "2";
  
      const insertedButton = this.player.el()
        .getElementsByClassName(domClasses.vjsButton)[0];
  
      let anchorElement = undefined;
      const shareButtons = this.player.el()
        .getElementsByClassName(jutsuClasses.vjsShareControl);
  
      if (shareButtons.length > 0) {
        anchorElement = shareButtons[0]
      }
  
      if (anchorElement && anchorElement.nextSibling) {
        this.player.controlBar.el().insertBefore(
          insertedButton,
          anchorElement.nextSibling
        );
      }
      else if (anchorElement && !anchorElement.nextSibling) {
        this.player.controlBar.el().insertBefore(
          insertedButton,
          anchorElement.nextSibling
        );
      }
    })();
  }

  /**
   * @return {videojs.default.Button}
   */
  constructVjsButton() {
    const Button = this.player.constructor.getComponent("Button");
    const buttonOptions = /** @type {videojs.default.ComponentOptions} */ ({
      name: "JutSuperButton"
    });

    const button = new Button(this.player, buttonOptions);
    button.addClass(domClasses.vjsButton);

    const iconPlaceholder = /** @type {HTMLElement} */ (
      button.el().getElementsByClassName(
        jutsuClasses.vjcIconPlaceholder
      )[0]
    );
    
    const iconUrl = `${this.extensionUrl}/src/assets/logo/square-white-48.svg`;

    iconPlaceholder.id = domIds.vjsButtonIcon;
    iconPlaceholder.title = "JutSuper";
    iconPlaceholder.style.content = `url(${iconUrl})`;
    iconPlaceholder.style.width = "20px";

    button.on("click", event => {
      if (this.settingsPopup.isActive()) {
        this.settingsPopup.hide();
      }
      else {
        this.settingsPopup.show();
      }
    });

    return button;
  }

  /**
   * @param {string} domClass 
   * @param {string} attr
   * @param {string} value 
   */
  replaceAttrForClasses(domClass, attr, value) {
    for (const img of document.getElementsByClassName(domClass)) {
      img.setAttribute(attr, value);
    }
  }

  /**
   * @param {Document} doc 
   */
  replaceImgSources(doc) {
    const icons = /** @type {NodeListOf<HTMLImageElement>} */ (
      doc.querySelectorAll("[class^='jutsuper-icon']")
    );

    for (const iconElm of icons) {
      const originalSrc = iconElm.getAttribute("src");
      const cleanSrc = originalSrc.startsWith("/") ?
        originalSrc.substring(1) : originalSrc;

      iconElm.setAttribute("src", `${this.extensionUrl}/${cleanSrc}`);
    }
  }

  /**
   * @param {string} id
   * @returns {string}
   */
  getHrefOfNodeById(id) {
    return /** @type {HTMLAnchorElement} */ (document.getElementById(id)).href;
  }

  async listenAssetsInjected() {
    const loc = `${this.LOCATION}@${this.listenAssetsInjected.name}`;
    const builder = /** @type {JutSuperIpcRspParamsBuilder<JutSuperIpcReqSchemaFilter>} */ (
      new JutSuperIpcRspParamsBuilder()
    );
    const cfg = builder
      .recvOnlyThisIntersection({ assetsInjected: { tell: { state: true, extensionUrl: ANY } } })
      .build();

    const evt = await this.rspIpc.recvOnce(cfg);
    jsuperLog.debug(`${loc} got event:`, evt);

    this.extensionUrl = evt.assetsInjected.tell.extensionUrl;
    this.assetsInjectedLock.resolve();
  }

  /**
   * @returns {Promise<never>}
   */
  async listenPlayingRequests() {
    const loc = `${this.LOCATION}@${this.listenPlayingRequests.name}`;
    const builder = /** @type {JutSuperIpcRspParamsBuilder<JutSuperIpcReqSchemaFilter>} */ (
      new JutSuperIpcRspParamsBuilder()
    );
    const cfg = builder
      .recvOnlyThisIntersection({ playing: { reqPlay: ANY } })
      .build();
    
    for await (const evt of this.rspIpc.recv(cfg)) {
      jsuperLog.debug(`${loc} got event:`, evt);

      const request = evt.playing;
      /** @type {JutSuperIpcRspSchema} */
      let response = { playing: {} };

      if (request.reqPlay.constructor.name !== "Boolean") {
        response.playing.rspPlay = {
          isFulfilled: false,
          reason: new Error("invalid request")
        };
        this.rspIpc.send(response);
        continue;
      }

      response.playing.rspPlay = { isFulfilled: undefined };

      try {
        switch (request.reqPlay) {
          case true:
            await this.handlePlayRequest();
            break;
          default:
            const unhandled = jsuperErrors.unhandledCaseError({
              location: loc,
              target: new String(request).toString()
            });
            jsuperLog.error(unhandled.message);
        }

        response.playing.rspPlay.isFulfilled = true;
      }
      catch (e) {
        response.playing.rspPlay.isFulfilled = false;
        response.playing.rspPlay.reason = e;
        if (
          window.jsuperSettings.notifications.autoplayUnavailable.doShow &&
          !this.autoplayUnavailableNotif.isActive()
        ) {
          this.autoplayUnavailableNotif.show();
        }
      }

      this.rspIpc.send(response);
    }

    throw jsuperErrors.unexpectedEndError({
      location: loc
    });
  }

  /**
   * @returns {Promise<void>}
   */
  async handlePlayRequest() {
    await this.player.play();
  }

  /**
   * @returns {void}
   */
  handlePauseRequest() {
    this.player.pause();
  }

  /**
   * @returns {Promise<never>}
   */
  async listenPlayerFullscreenExitRequests() {
    const loc = `${this.LOCATION}@${this.listenPlayingRequests.name}`;
    const builder = /** @type {JutSuperIpcRspParamsBuilder<JutSuperIpcReqSchemaFilter>} */ (
      new JutSuperIpcRspParamsBuilder()
    );
    const cfg = builder
      .recvOnlyThisIntersection({ fullscreen: { reqPlayerFullscreenExit: true } })
      .build();
    
    for await (const evt of this.rspIpc.recv(cfg)) {
      jsuperLog.debug(`${loc} got event:`, evt);
      await this.handlePlayerFullscreenExitRequest();
    }

    throw jsuperErrors.unexpectedEndError({
      location: loc
    });
  }

  /**
   * @returns {Promise<void>}
   */
  async handlePlayerFullscreenExitRequest() {
    if (!this.isFullscreen) {
      this.rspIpc.send({ fullscreen: { rspPlayerFullscreenExit: {
        isFulfilled: false,
        reason: new Error("not in fullscreen")
      }}});
      return;
    }

    // using this instead of `this.player.exitFullscreen()`
    // because `this.player.exitFullscreen()` returns
    // immediately
    await document.exitFullscreen();

    this.rspIpc.send({ fullscreen: { rspPlayerFullscreenExit: {
      isFulfilled: true
    }}});
  }

  /**
   * @returns {Promise<never>}
   */
  async listenFullscreenExitInjectionRequest() {
    const loc = `${this.LOCATION}@${this.listenFullscreenExitInjectionRequest.name}`;
    const builder = /** @type {JutSuperIpcRspParamsBuilder<JutSuperIpcReqSchemaFilter>} */ (
      new JutSuperIpcRspParamsBuilder()
    );
    const cfg = builder
      .recvOnlyThisIntersection({ fullscreen: { reqExitInjection: true } })
      .build();
    
    for await (const evt of this.rspIpc.recv(cfg)) {
      jsuperLog.debug(`${loc} got event:`, evt);

      /** @type {JutSuperIpcRspSchema} */
      let response = { fullscreen: { rspExitInjection: { isFulfilled: undefined } } };

      try {
        this.handleCustomFullscreenExitInject();
        response.fullscreen.rspExitInjection.isFulfilled = true;
      } catch (e) {
        response.fullscreen.rspExitInjection.isFulfilled = false;
        response.fullscreen.rspExitInjection.reason = e;
      }

      this.rspIpc.send(response);
    }

    throw jsuperErrors.unexpectedEndError({
      location: loc
    });
  }

  /**
   * @param {MouseEvent} [event] 
   * @returns {void}
   */
  customFullscreenExit(event = undefined) {
    const loc = `${this.LOCATION}@${this.customFullscreenExit.name}`;

    if (event && this.isCustomFullscreen) {
      event.stopImmediatePropagation();
    }
    else if (!this.isCustomFullscreen) {
      return;
    }

    const body = /** @type {HTMLElement} */ (
      document.getElementsByTagName("body")[0]
    );
    const playerDiv = /** @type {HTMLElement} */ (
      document.getElementById(jutsuIds.myPlayer)
    );
    const header = /** @type {HTMLElement} */ (
      document.getElementsByClassName(jutsuClasses.zFixHeader)[0]
    );
    const logoB = /** @type {HTMLElement} */ (
      document.getElementsByClassName(jutsuClasses.logoB)[0]
    );
    const infoPanel = /** @type {HTMLElement} */ (
      document.getElementsByClassName(jutsuClasses.infoPanel)[0]
    );
    const footer = /** @type {HTMLElement} */ (
      document.getElementsByClassName(jutsuClasses.footer)[0]
    );

    // enable scrolling
    body.style.overflow = null;
    jsuperLog.debug(`${loc}: enabled scrolling`);
    // show header
    header.style.display = null;
    jsuperLog.debug(`${loc}: shown header`);
    // show logo b
    logoB.style.display = null;
    jsuperLog.debug(`${loc}: shown logo b`);
    // show info panel
    infoPanel.style.display = null;
    jsuperLog.debug(`${loc}: shown info panel`);
    // show footer
    footer.style.display = null;
    jsuperLog.debug(`${loc}: shown footer`);

    // remove fullscreen styling from the player
    playerDiv.classList.remove(jutsuClasses.vjsFullscreen);
    jsuperLog.debug(`${loc}: removed fullscreen class from the player`);
    // make the player regular size
    playerDiv.classList.remove(domClasses.fullscreen);
    jsuperLog.debug(`${loc}: removed fullscreen styling from the player`);
    // put the player in a normal position
    playerDiv.classList.remove(domClasses.topIndex);
    jsuperLog.debug(`${loc}: removed top Z-index from the player`);

    this.player.isFullscreen(false);
    jsuperLog.debug(`${loc}: set player fullscreen flag to false`);
    this.isCustomFullscreen = false;

    this.reqIpc.send(
      { fullscreen: { reqExit: true } }
    );
  }

  /**
   * @returns {void}
   */
  listenResolutionChange() {
    window.addEventListener("resize", (event) => {
      const X = window.innerWidth;
      const Y = window.innerHeight;

      jsuperLog.debug(
        `${this.LOCATION}: window resize: ${X}x${Y}`
      );

      this.handleResolutionChange(event);
    }, true);
  }

  /**
   * @param {UIEvent} event 
   * @returns {Promise<void>}
   */
  async handleResolutionChange(event) {
    const wasPeakScreenHeightDefined = typeof this.peakScreenHeight === "number";

    if (!wasPeakScreenHeightDefined || this.peakScreenHeight < window.innerHeight) {
      this.peakScreenHeight = window.innerHeight;
      return;
    } else if (this.peakScreenHeight > window.innerHeight) {

      const isWindowFullscreen = (await this.reqIpc.sendAndRecvOnce(
        { fullscreen: { askIsWindowFullscreen: true } },
        { schema: { fullscreen: { rspIsWindowFullscreen: ANY } } }
      )).fullscreen.rspIsWindowFullscreen;
  
      if (!isWindowFullscreen) {
        this.customFullscreenExit();
      }
    }
  }

  /**
   * @returns {void}
   */
  handleCustomFullscreenExitInject() {
    const loc = `${this.LOCATION}@${this.handleCustomFullscreenExitInject.name}`;

    this.isCustomFullscreen = true;
    this.player.isFullscreen(true);
    jsuperLog.debug(`${loc}: set player fullscreen flag to true`);

    const fullscreenButton = /** @type {HTMLButtonElement} */ (
      document.getElementsByClassName(jutsuClasses.vjsFullscreenControl)[0]
    );

    fullscreenButton.addEventListener(
      "click",
      event => this.customFullscreenExit(event),
      { capture: true, once: true }
    );

    this.listenResolutionChange();

    jsuperLog.debug(`${this.LOCATION}: custom fullscreen exit injection completed`);
  }

  /**
   * @returns {Promise<never>}
   */
  async listenSettingsChange() {
    const loc = `${this.LOCATION}@${this.listenSettingsChange.name}`;
    const builder = /** @type {JutSuperIpcRspParamsBuilder<JutSuperSettingsObjectFilter>} */ (
      new JutSuperIpcRspParamsBuilder()
    );
    const cfg = builder
      .recvFromSelf()
      .build();
    
    for await (const evt of this.rspSettingsIpc.recv(cfg)) {
      jsuperLog.debug(`${loc} got event:`, evt);

      if (
        typeof this.isAutoplayAvailable === "undefined" &&
        evt.notifications &&
        evt.notifications.autoplayUnavailable.doShow
      ) {
        this.testAutoplay(evt.notifications.autoplayUnavailable.doShow);
      }

      if (evt.endings) {
        if (evt.endings.maxSkips) {
          this.handleEndingsMaxSkipsChange(evt.endings.maxSkips);
        }
      }
      if (evt.skipDelayS) {
        this.handleSkipDelayChange(evt.skipDelayS);
      }
      if (evt.skipCancelKey) {
        this.handleSkipCancelKeyChange(evt.skipCancelKey);
      }
      if (typeof evt.achievementSoundEnabled === "boolean") {
        this.handleAchievementSoundEnabledChange(evt.achievementSoundEnabled);
      }
    }

    throw jsuperErrors.unexpectedEndError({
      location: loc
    });
  }

  /**
   * @param {number} maxSkips 
   */
  handleEndingsMaxSkipsChange(maxSkips) {
    this.endingTriggered = false;
    jsuperLog.debug(`${this.LOCATION}: retriggered ending`);
  }

  /**
   * @param {number} delayS 
   */
  handleSkipDelayChange(delayS) {
    this.skippingNotif.setDelay(delayS);
  }

  /**
   * @param {string} cancelKey 
   */
  handleSkipCancelKeyChange(cancelKey) {
    this.skippingNotif.setCancelKey(cancelKey);
  }

  /**
   * @param {boolean} state 
   */
  handleAchievementSoundEnabledChange(state) {
    if (window.plus_settings === undefined) {
      window.plus_settings = {};
    }

    window.plus_settings.sound = state;
  }
}

/**
 * # Wait for necessary variables to be initialized
 * - `player`: the **jut.su**'s player video player
 * - `player.overlays_`: overlays of that player
 * (opening and ending skippers, achievements, etc.),
 * required to parse opening and ending time regions
 * - `player.on`: event registrar, required for us to
 * subscribe for `timeupdate` events and check if
 * we are currently in either opening or ending time fragment
 */
(function() {
  const playerPollIntervalId = setInterval(() => {
    if (window.jutsu_new_player === undefined) {
      clearInterval(playerPollIntervalId);
      jsuperLog.log(
        "JutSuper: either old player is enabled or " +
        "this page contains no player, loading aborted"
      );
    }
    else if (window.player && window.player.overlays_ && window.player.on) {
      clearInterval(playerPollIntervalId);
      jutsuper = new JutSuper(window.player);
    }
  }, 100);
})();
