/// <reference types="video.js/index.d.ts" />

import { jsuperLog } from "/src/log.js";
import { jsuperErrors } from "/src/error.js";
import {
  JutSuperIpcFlags as ipcFlags,
  JutSuperIpcNamespaces as ipcNamespaces,
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
  JutSuperIpcIds as ipcIds,
} from "/src/consts.js";
import {
  JutSuperSettingsSkipOrder as skipOrder
} from "/src/settings.js";
import {
  JutSuperSkipPopup
} from "/src/page/skip.js";
import {
  JutSuperSettingsPopup
} from "/src/page/settings.js";
import {
  jsuperUtil
} from "/src/util.js";


console.debug("JutSuper: loading /src/page/jutsuper.js");


/**
 * @typedef {import("/src/types/ipc.d.ts").JutSuperIpcReqSchema} JutSuperIpcReqSchema
 * @typedef {import("/src/types/ipc.d.ts").JutSuperIpcRspSchema} JutSuperIpcRspSchema
 * @typedef {import("/src/types/ipc.d.ts").JutSuperIpcReqSchemaFilter} JutSuperIpcReqSchemaFilter
 * @typedef {import("/src/types/ipc.d.ts").JutSuperIpcRspSchemaFilter} JutSuperIpcRspSchemaFilter
 * @typedef {import("/src/types/settings.d.ts").JutSuperSettingsObject} JutSuperSettingsObject
 * @typedef {import("/src/types/settings.d.ts").JutSuperSettingsObjectPartial} JutSuperSettingsObjectPartial
 * @typedef {import("/src/types/settings.d.ts").JutSuperSettingsObjectFilter} JutSuperSettingsObjectFilter
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
    this.rspSettingsIpc = new JutSuperIpcBuilder()
      .namespaceIs(ipcNamespaces.settings)
      .identifyAs(ipcIds.page)
      .ignoreWithoutAnyOfTheseFlags([ipcFlags.req])
      .sendWithTheseFlags([ipcFlags.rsp])
      .build();
    
    this.reqIpc.send({ loadingAllowed: { tell: { state: true } } });

    this.isFullscreen = false;
    this.isCustomFullscreen = false;
    /** @type {number | undefined} */
    this.peakScreenHeight = undefined;
    this.regionSkipCancelled = false;
    this.awaitingSkipCancel = false;

    /** @type {HTMLDivElement} */
    this.vjsContainer = document.createElement("div");
    /** @type {HTMLDivElement} */
    this.skipArea = document.createElement("div");
    /** @type {HTMLDivElement} */
    this.skipClipArea = document.createElement("div");
    /** @type {HTMLDivElement} */
    this.settingsArea = document.createElement("div");
    /** @type {HTMLDivElement} */
    this.settingsClipArea = document.createElement("div");
    /** @type {videojs.default.Button} */
    this.vjsButton = undefined;
  
    /** @type {videojs.VideoJsPlayer} */
    this.player = player;
    /** @type {HTMLElement} */
    this.playerDiv = document.getElementById(jutsuIds.myPlayer);
    /** @type {boolean} */
    this.openingTriggered = false;
    /** @type {boolean} */
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

      this.regionSkipCancelled = true;
    });

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
        this.settingsArea.classList.add(domClasses.visibilityHidden);
      }
    });
    
    this.injectPlayerClassChangeListener();
    this.injectTimeupdateListener();
    await this.injectOverlays();

    await this.tellEssentialsLoaded();
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

    window[jutsuFns.skipOpeningFnName]();
  }

  /**
   * # Stop opening skip countdown
   * @returns {void}
   */
  stopSkippingOpening() {
    if (this.awaitingSkipCancel) {
      this.regionSkipCancelled = true;
    }

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

    if (actionResult === "cancelled") {
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

    window[jutsuFns.skipEndingFnName]();
  }
  
  /**
   * # Stop ending skip countdown
   * @returns {void}
   */
  stopSkippingEnding() {
    if (this.awaitingSkipCancel) {
      this.regionSkipCancelled = true;
    }

    jsuperLog.debug(`${this.LOCATION}: not skipping ending anymore`);
  }

  /**
   * @returns {Promise<"timeout" | "cancelled">}
   */
  async startSkipAction() {
    this.awaitingSkipCancel = true;

    const delay = typeof window.jsuperSettings.skipDelayS !== "undefined" ?
      window.jsuperSettings.skipDelayS : 0;

    if (delay < 1) {
      return "timeout";
    }

    this.showSkipPopup();

    const delayArray = Array.from({length: delay * 10}, (_, i) => i + 1).reverse();

    for (let i = 0; i <= delayArray.length; i++) {
      const percentage = 100 * i / delayArray.length;
      this.skipPopup.setCountdownTimelineWidth(100 - percentage);

      if (this.regionSkipCancelled) {
        this.regionSkipCancelled = false;
        this.awaitingSkipCancel = false;
        this.hideSkipPopup();
        return "cancelled";
      }

      await jsuperUtil.asyncSleep(100);
    }

    this.regionSkipCancelled = false;
    this.awaitingSkipCancel = false;
    this.hideSkipPopup();
    return "timeout";
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

  showSkipPopup() {
    this.skipArea.classList.remove(domClasses.visibilityHidden);
  }

  hideSkipPopup() {
    this.skipArea.classList.add(domClasses.visibilityHidden);
    this.skipPopup.setCountdownTimelineWidth(100);
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
    if (this.rspIpc.getRsp().assetsInjected === undefined) {
      await this.rspIpc.recvOnce({ schema: { assetsInjected: { tell: { state: true } } } });
    }

    jsuperLog.debug(`${this.LOCATION}: injecting overlays`);

    const Button = this.player.constructor.getComponent("Button");
    const iconUrl = document.getElementById(assetIds.squareWhiteLogo48Svg).getAttribute("href");
    const buttonOptions = /** @type {videojs.default.ComponentOptions} */ ({
      name: "JutSuperButton"
    });

    this.vjsButton = new Button(this.player, buttonOptions);
    this.vjsButton.addClass(domClasses.vjsButton);

    const iconPlaceholder = /** @type {HTMLElement} */ (
      this.vjsButton.el().getElementsByClassName(
        jutsuClasses.vjcIconPlaceholder
      )[0]
    );
    
    iconPlaceholder.id = domIds.vjsButtonIcon;
    iconPlaceholder.title = "JutSuper";
    iconPlaceholder.style.content = `url(${iconUrl})`;
    iconPlaceholder.style.width = "20px";

    this.vjsButton.on("click", event => {
      this.settingsArea.classList.toggle(domClasses.visibilityHidden);
    });
    this.player.on("userinactive", event => {
      if (this.player.paused()) {
        return;
      }
      if (!this.settingsArea.classList.contains(domClasses.visibilityHidden)) {
        this.settingsArea.classList.add(domClasses.visibilityHidden);
      }
    })

    ///////////////
    // Skip area //
    ///////////////

    const skipAreaHtmlUrl = /** @type {HTMLAnchorElement} */ (
      document.getElementById(assetIds.skipHtml)
    ).href;

    const skipAreaHtmlTemplate = document.createElement("template");
    const skipAreaHtmlString = await (await fetch(skipAreaHtmlUrl)).text();
    skipAreaHtmlTemplate.innerHTML = skipAreaHtmlString;
    const skipContent = skipAreaHtmlTemplate
      .content
      .getElementById(domIds.skipRoot);

    ///////////////////
    // Settings area //
    ///////////////////

    const settingsAreaHtmlUrl = /** @type {HTMLAnchorElement} */ (
      document.getElementById(assetIds.settingsHtml)
    ).href;

    const settingsAreaHtmlTemplate = document.createElement("template");
    const settingsAreaHtmlString = await (await fetch(settingsAreaHtmlUrl)).text();
    settingsAreaHtmlTemplate.innerHTML = settingsAreaHtmlString;
    const settingsContent = settingsAreaHtmlTemplate
      .content
      .getElementById(domIds.settingsRoot);

    ///////////////////

    this.vjsContainer.id = domIds.vjsContainer;
    this.vjsContainer.classList.add(domClasses.vjsContainer);

    this.skipArea.id = domIds.vjsSkipArea;
    this.skipArea.classList.add(domClasses.vjsSkipPopupAreaSized);
    this.skipArea.classList.add(domClasses.vjsPopupArea);
    this.skipArea.classList.add(domClasses.vjsSkipPopupArea);
    this.skipArea.classList.add(domClasses.animateYAppear);
    this.skipArea.classList.add(domClasses.animateTopToBottom);
    this.skipArea.classList.add(domClasses.visibilityHidden);
    this.skipArea.style.scrollbarWidth = "none";

    this.skipClipArea.id = domIds.vjsSkipClipArea;
    this.skipClipArea.classList.add(domClasses.vjsSkipPopupAreaSized);
    this.skipClipArea.classList.add(domClasses.vjsPopupClipArea);
    this.skipClipArea.style.height = "max-content";
    this.skipClipArea.style.width = "max-content";
    this.skipClipArea.append(skipContent);
    this.skipArea.append(this.skipClipArea);

    this.settingsArea.id = domIds.vjsSettingsArea;
    this.settingsArea.classList.add(domClasses.vjsSettingsPopupAreaSized);
    this.settingsArea.classList.add(domClasses.vjsPopupArea);
    this.settingsArea.classList.add(domClasses.vjsSettingsPopupArea);
    this.settingsArea.classList.add(domClasses.animateYAppear);
    this.settingsArea.classList.add(domClasses.animateBottomToTop);
    this.settingsArea.classList.add(domClasses.visibilityHidden);
    this.settingsArea.style.height = "auto";
    this.settingsArea.style.maxHeight = "100%";
    this.settingsArea.style.overflowY = "auto";
    this.settingsArea.style.scrollbarWidth = "none";

    this.settingsClipArea.id = domIds.vjsSettingsClipArea;
    this.settingsClipArea.classList.add(domClasses.vjsSettingsPopupAreaSized);
    this.settingsClipArea.classList.add(domClasses.vjsPopupClipArea);
    this.settingsClipArea.style.height = "auto";
    this.settingsClipArea.style.maxHeight = "inherit";
    this.settingsClipArea.style.overflowY = "auto";
    this.settingsClipArea.append(settingsContent);
    this.settingsArea.append(this.settingsClipArea);

    this.player.el().insertBefore(
      this.vjsContainer,
      this.player.el().firstChild
    )

    const vjsContainer = document.getElementById(domIds.vjsContainer);
    vjsContainer.append(this.skipArea);
    vjsContainer.append(this.settingsArea);

    document.getElementById(domIds.skipRoot).addEventListener(
      "click", event => this.onSkipPopupCancelClick(event)
    );

    for (const icon of document.getElementsByClassName(domClasses.iconDropdown)) {
      const url = /** @type {HTMLAnchorElement} */ (
        document.getElementById(assetIds.dropdownSvg)
      ).href;
      icon.setAttribute("src", url);
    }

    for (const icon of document.getElementsByClassName(domClasses.iconSkip)) {
      const url = /** @type {HTMLAnchorElement} */ (
        document.getElementById(assetIds.skipSvg)
      ).href;
      icon.setAttribute("src", url);
    }

    for (const icon of document.getElementsByClassName(domClasses.iconPlay)) {
      const url = /** @type {HTMLAnchorElement} */ (
        document.getElementById(assetIds.playSvg)
      ).href;
      icon.setAttribute("src", url);
    }

    this.settingsPopup = new JutSuperSettingsPopup(document);
    jsuperLog.debug(`${this.LOCATION}: awaiting settingsPopup.ipcRecvReady lock`);
    await this.settingsPopup.ipcRecvReady.promise;
    jsuperLog.debug(`${this.LOCATION}: settingsPopup.ipcRecvReady lock awaited`);

    this.skipPopup = new JutSuperSkipPopup(document);
    this.skipPopup.setCancelKey(window.jsuperSettings.skipCancelKey);

    (async () => {
      await this.reqIpc.sendAndRecvOnce(
        { localization: { reqLocalize: true } },
        { schema: { localization: { rspLocalize: { isFulfilled: true } } } }
      );
  
      const controlBar = /** @type {videojs.ControlBar} */ (this.player.controlBar);
      const qualitySelectorEl = /** @type {HTMLElement} */ (controlBar.qualitySelector.el());
  
      controlBar.addChild(this.vjsButton);
      /** to make quality selector list overlap jutsuper settings */
      qualitySelectorEl.style.zIndex = "2";
      /** to make thumbnail holder overlap jutsuper settings */
      const thumbnailHolder = /** @type {HTMLElement} */ (
        this.player.el().getElementsByClassName(jutsuClasses.vjsThumbnailHolder)[0]
      );
      thumbnailHolder.style.zIndex = "2";
  
      const insertedButton = this.player.el()
        .getElementsByClassName(domClasses.vjsButton)[0];
  
      let anchorElement;
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
            this.handlePlayRequest();
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
      }

      this.rspIpc.send(response);
    }

    throw jsuperErrors.unexpectedEndError({
      location: loc
    });
  }

  /**
   * @returns {void}
   */
  handlePlayRequest() {
    this.player.play();
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
      this.rspIpc.send({fullscreen: { rspPlayerFullscreenExit: {
        isFulfilled: false,
        reason: new Error("not in fullscreen")
      }}});
      return;
    }

    // using this instead of `this.player.exitFullscreen()`
    // because `this.player.exitFullscreen()` returns
    // immediately
    await document.exitFullscreen();

    this.rspIpc.send({fullscreen: { rspPlayerFullscreenExit: {
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
    const infoPanel = /** @type {HTMLElement} */ (
      document.getElementsByClassName(jutsuClasses.infoPanel)[0]
    );
    const footer = /** @type {HTMLElement} */ (
      document.getElementsByClassName(jutsuClasses.footer)[0]
    );

    // enable scrolling
    body.style.overflow = null;
    // show header
    header.style.display = null;
    // show info panel
    infoPanel.style.display = null;
    // show footer
    footer.style.display = null;

    // remove fullscreen styling from the player
    playerDiv.classList.remove(jutsuClasses.vjsFullscreen);
    // make the player regular size
    playerDiv.classList.remove(domClasses.fullscreen);
    // put the player in a normal position
    playerDiv.classList.remove(domClasses.topIndex);

    this.player.isFullscreen(false);
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
    this.isCustomFullscreen = true;
    this.player.isFullscreen(true);

    const fullscreenButton = /** @type {HTMLButtonElement} */ (
      document.getElementsByClassName(jutsuClasses.vjsFullscreenControl)[0]
    );

    fullscreenButton.addEventListener(
      "click",
      event => this.customFullscreenExit(event),
      { capture: true, once: true }
    );

    this.listenResolutionChange();
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
      
      if (evt.endings) {
        if (evt.endings.maxSkips) {
          this.handleEndingsMaxSkipsChange(evt.endings.maxSkips);
        }
      }
      if (evt.skipCancelKey) {
        this.handleSkipCancelKeyChange(evt.skipCancelKey);
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
   * @param {string} cancelKey 
   */
  handleSkipCancelKeyChange(cancelKey) {
    this.skipPopup.setCancelKey(cancelKey);
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
 * we are currently in either opening or ending time region
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
