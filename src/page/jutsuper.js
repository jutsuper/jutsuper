import { jsuperLog } from "/src/log.js";
import { jsuperErrors } from "/src/error.js";
import {
  JutSuperIpcBuilder,
  JutSuperIpcRecvParamsBuilder,
  JutSuperIpc
} from "/src/ipc.js";
import {
  BrowserWindowStates as windowStates
} from "/src/browser.js"
import {
  JutSuFunctions as jutsuFns,
  JutSuDomAttributes as jutsuAttrs,
  JutSuperAssetIds as assetIds,
  JutSuperDomIds as domIds,
  JutSuperCss as jsuperCss,
  JutSuperIpcIds as ipcIds,
  JutSuperIpcKeys as ipcKeys,
  JutSuperIpcLoadingStates as ipcLoadings,
  JutSuperIpcAwaitStates as ipcAwaits,
  JutSuperIpcBoolRequestStates as ipcBoolRequests
} from "/src/consts.js";


/** @type {JutSuper} */
var jutsuper;


class JutSuper {
  /**
   * @param {unknown} player Jut.su's player
   */
  constructor(player) {
    this.LOCATION = JutSuper.name;
    console.log(`${this.LOCATION}: constructing`);

    if (!player || !player.overlays_ || !player.on) {
      throw new Error(
        `${this.LOCATION}: player not yet initialized, ` +
        `unable to construct ${this.LOCATION}`
      );
    }

    /** @type {boolean} */
    this.isCustomFullscreen = false;
    /** @type {number | undefined} */
    this.peakScreenHeight = undefined;

    /** @type {HTMLDivElement} */
    this.settingsContainer = document.createElement("div");
    /** @type {HTMLDivElement} */
    this.settingsArea = document.createElement("div");
    /** @type {HTMLDivElement} */
    this.settingsClipArea = document.createElement("div");
    /** @type {HTMLButtonElement} */
    this.vjsButton = undefined;

    /** @type {JutSuperIpc} */
    this.ipc = new JutSuperIpcBuilder().identifyAs(ipcIds.page).build()
    /** @type {unknown} */
    this.player = player;
    /** @type {HTMLElement} */
    this.playerDiv = document.getElementById(jutsuAttrs.playerDivId);
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
     * [ 83, 98 ]
     * // if there are multiple skippers, it may be
     * [[ 83, 98 ], [ 100, 115 ]]
     * ```
     * @type {number[][]} 
     */
    this.openingSkipperRngs = this.getOverlayRngsByFunctionName(
      jutsuFns.skipOpeningFnName
    );
    /**
     * # Time ranges when it's possible to skip the ending
     * (in seconds)
     * 
     * @example
     * ```
     * // if there is one skipper, it may be
     * [ 1205, 1225 ]
     * // if there are multiple skippers, it may be
     * [[ 1205, 1225 ], [ 1405, 1425 ]]
     * ```
     * @type {number[][]} 
     */
    this.endingSkipperRngs = this.getOverlayRngsByFunctionName(
      jutsuFns.skipEndingFnName
    );

    jsuperLog.debug(new Error, "openingSkipperRngs is", this.openingSkipperRngs);
    jsuperLog.debug(new Error, "endingSkipperRngs is", this.endingSkipperRngs);

    this.listenPlayRequests();
    this.listenCustomFullscreenExitInjectRequest();

    this.#initPage().then(() => {
      jsuperLog.debug(new Error, `${this.LOCATION}: constructed`);
    });
  }

  async #initPage() {
    const thisArg = this;

    await this.initializeIpcValues();
    document.addEventListener("mousedown", function(event) {
      const clickedOnVjsButton = event.target.id === domIds.vjsButton;
      if (clickedOnVjsButton) {
        return;
      }

      const boundaries = thisArg.settingsArea.getBoundingClientRect();
      const isInXRange = event.clientX >= boundaries.left && event.clientX <= boundaries.right;
      const isInYRange = event.clientY >= boundaries.top && event.clientY <= boundaries.bottom;
      const isInAreaRange = isInXRange && isInYRange;

      if (!isInAreaRange) {
        thisArg.settingsArea.classList.add(jsuperCss.hidden);
      }
    });
    this.injectFullscreenChangeListener();
    this.injectTimeupdateListener();
    await this.injectSettings();
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

    if (typeof range[0] === "number") {
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
   * // openingRng === [ 83, 98 ] ||
   * // openingRng === [[ 83, 98 ], [ 100, 115 ]]
   * const endingRng = getOverlayRngsByFunctionName("video_go_next_episode");
   * // example values:
   * // endingRng === [ 1205, 1225 ] ||
   * // endingRng === [[ 1205, 1225 ], [ 1405, 1425 ]]
   * ```
   * - `getOverlayRngsByFunctionName("skip_video_intro") ->  [ 83, 98 ]`
   * - `getOverlayRngsByFunctionName("video_go_next_episode") -> [ 1405, 1425 ]`
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
   * # Start opening skip countdown
   * @returns {void}
   */
  startSkippingOpening() {
    if (!cur_time_cookie) {
      jsuperLog.error(new Error,
        "JutSuper: cannot start skipping opening, " +
        "video wasn't played yet " +
        `(cur_time_cookie is ${cur_time_cookie})`
      );

      return undefined;
    }

    jsuperLog.debug(new Error, "JutSuper: able to skip opening");

    window[jutsuFns.skipOpeningFnName]();
  }

  /**
   * # Stop opening skip countdown
   * @returns {void}
   */
  stopSkippingOpening() {
    jsuperLog.debug(new Error, "JutSuper: not skipping opening anymore");
  }
  
  /**
   * # Start ending skip countdown
   * @returns {Promise<undefined>}
   */
  async startSkippingEnding() {
    if (!cur_time_cookie) {
      jsuperLog.debug(new Error,
        "JutSuper: cannot start skipping ending, " +
        "video wasn't played yet " +
        `(cur_time_cookie is ${cur_time_cookie})`
      );
      return;
    }

    jsuperLog.debug(new Error, "JutSuper: able to skip ending");

    this.ipc.send({
      key: ipcKeys.episodeSwitchPrep,
      value: ipcAwaits.request
    });
    
    jsuperLog.log(new Error, "o next episode prep promise awaiting");

    await this.ipc.recvOnce({
      key: ipcKeys.episodeSwitchPrep,
      value: ipcAwaits.completed
    })

    jsuperLog.log(new Error, "+ next episode prep promise fulfulled");
    window[jutsuFns.skipEndingFnName]();
  }
  
  /**
   * # Stop ending skip countdown
   * @returns {void}
   */
  stopSkippingEnding() {
    jsuperLog.debug(new Error, "JutSuper: not skipping ending anymore");
  }

  /**
   * # Check if we are either in opening or ending time ranges
   * @returns {void}
   */
  checkForKeyTimestamps() {
    const time = this.player.currentTime();

    if (
      // does the opening range exists
      this.openingSkipperRngs.length > 0 &&
      // is current time in the opening skipper region
      JutSuper.isInRangeExclusive(time, this.openingSkipperRngs) &&
      // is currently playing
      !this.player.paused()
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
      // does the ending range exists
      this.endingSkipperRngs.length > 0 &&
      // is current time in the ending skipper region
      JutSuper.isInRangeExclusive(time, this.endingSkipperRngs) &&
      // is currently playing
      !this.player.paused()
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
   * @returns {HTMLDivElement}
   */
  generateSettingsButton() {
    const Button = videojs.getComponent("Button");
    const button = new Button(this.player, {
      clickHandler: function(event) {
        console.log("clicked");
      }
    });
    return button;
  }

  /**
   * @returns {Promise<void>}
  */
  async initializeIpcValues() {
    this.ipc.send({
      key: ipcKeys.essentialsLoadingState,
      value: ipcLoadings.loaded
    });

    this.ipc.send({
      key: ipcKeys.episodeSwitchPrep,
      value: ipcAwaits.continuation
    });

    await this.ipc.recvOnce({
      key: ipcKeys.episodeSwitchPrep,
      value: ipcAwaits.completed
    });

    const isEpSwitchedAutoDescriptor = this.ipc.get(
      ipcKeys.isEpisodeSwitchedAutomatically
    );

    if (isEpSwitchedAutoDescriptor.value === false) {
      this.ipc.send({
        key: ipcKeys.isFullscreen,
        value: this.playerDiv.classList.contains(
          jutsuAttrs.playerFullscreenClassName
        )
      });
    }

    this.ipc.send({
      key: ipcKeys.playingControl,
      value: ipcAwaits.idle
    });

    this.ipc.send({
      key: ipcKeys.episodeSwitchPrep,
      value: ipcAwaits.idle
    });
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
      jutsuAttrs.playerFullscreenClassName
    );

    if (this.ipc.get(ipcKeys.isFullscreen).value !== isFullscreen) {
      this.ipc.send({
        key: ipcKeys.isFullscreen,
        value: isFullscreen
      });
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
  injectFullscreenChangeListener() {
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
   * @returns {Promise<void>}
   */
  async injectSettings() {
    const thisArg = this;
    const Button = this.player.constructor.getComponent("Button");
    const iconUrl = document.getElementById(assetIds.squareWhiteLogo48Svg).getAttribute("href");
    const buttonOptions = {
      name: "JutSuperButton"
    };

    this.vjsButton = new Button(this.player, buttonOptions);
    this.vjsButton.addClass(jsuperCss.vjsIcon);
    this.vjsButton.el().id = domIds.vjsButton;
    this.vjsButton.el().title = "JutSuper";
    this.vjsButton.el().style.backgroundImage = `url(${iconUrl})`;
    this.vjsButton.el().style.backgroundRepeat = "no-repeat";
    this.vjsButton.el().style.backgroundSize = "20px";
    this.vjsButton.el().style.backgroundPosition = "center";

    this.vjsButton.on("click", function() {
      thisArg.settingsArea.classList.toggle(jsuperCss.hidden);
    });
    this.player.on("userinactive", function(event) {
      if (event.target.player.paused()) {
        return;
      }
      if (!thisArg.settingsArea.classList.contains(jsuperCss.hidden)) {
        thisArg.settingsArea.classList.add(jsuperCss.hidden);
      }
    })

    this.player.controlBar.addChild(this.vjsButton);
    /** to make quality selector list overlap jutsuper settings */
    this.player.controlBar.qualitySelector.el().style.zIndex = "2" 
    /** to make thumbnail holder overlap jutsuper settings */
    player.el().getElementsByClassName("vjs-thumbnail-holder")[0].style.zIndex = 2;

    const insertedButton = this.player.el()
      .getElementsByClassName(jsuperCss.vjsIcon)[0];

    let anchorElement;
    const shareButtons = this.player.el()
      .getElementsByClassName(jutsuAttrs.playerShareButtonClassName);

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

    const settingsAreaHtmlTemplate = document.createElement("template");
    const settingsAreaHtmlString = await (await fetch(
      document.getElementById(assetIds.settingsHtml).href
    )).text();
    settingsAreaHtmlTemplate.innerHTML = settingsAreaHtmlString;
    const settingsContent = settingsAreaHtmlTemplate
      .content
      .getElementById(domIds.settingsRoot);
    settingsContent.removeAttribute("class");
    settingsContent.classList.add("jutsuper-settings-frame");

    const settingsScripts = settingsContent.getElementsByTagName("script");
    console.log("settingsScripts", settingsScripts);
    for (const script of settingsScripts) {
      document.body.append(script)
    }
    window.jutsuperSettingsCloseOtherBars = (thisArg) => {
      const bars = document.getElementsByName("bars");
      for (const bar of bars) {
        if (bar.id !== thisArg.id) {
          bar.checked = false;
        }
      }
    }

    this.settingsContainer.id = domIds.vjsSettingsContainer;
    this.settingsContainer.classList.add(jsuperCss.vjsSettingsContainer);

    this.settingsArea.id = domIds.vjsSettingsArea;
    this.settingsArea.classList.add("jutsuper-vjs-settings-area-sized");
    this.settingsArea.classList.add(jsuperCss.vjsSettingsArea);
    this.settingsArea.classList.add(jsuperCss.bottomTopAnim);
    this.settingsArea.classList.add(jsuperCss.hidden);

    this.settingsClipArea.id = domIds.vjsSettingsClipArea;
    this.settingsClipArea.classList.add("jutsuper-vjs-settings-area-sized");
    this.settingsClipArea.classList.add(jsuperCss.vjsSettingsClipArea);
    this.settingsClipArea.append(settingsContent);
    this.settingsArea.append(this.settingsClipArea);

    this.player.el().insertBefore(
      this.settingsContainer,
      this.player.el().firstChild
    )

    document.getElementById(domIds.vjsSettingsContainer).append(this.settingsArea);
    for (const icon of document.getElementsByClassName("jutsuper-settings-dropdown-icon")) {
      icon.setAttribute(
        "src", document.getElementById(assetIds.dropdownSvg).href
      )
    }
    for (const icon of document.getElementsByClassName("jutsuper-settings-skip-icon")) {
      icon.setAttribute(
        "src", document.getElementById(assetIds.skipSvg).href
      )
    }
  }

  /**
   * @returns {Promise<never>}
   */
  async listenPlayRequests() {
    const cfg = new JutSuperIpcRecvParamsBuilder()
      .recvOnlyTheseKeys(ipcKeys.playingControl)
      .build();
    
    for await (const evt of this.ipc.recv(cfg)) {
      jsuperLog.debug(new Error, evt);

      try {
        switch (evt.value) {
          case ipcBoolRequests.requestTrue:
            this.handlePlayRequest();
            break;
          case ipcBoolRequests.requestFalse:
            this.handlePauseRequest();
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
    this.player().pause();
  }

  /**
   * @returns {Promise<never>}
   */
  async listenCustomFullscreenExitInjectRequest() {
    const cfg = new JutSuperIpcRecvParamsBuilder()
      .recvOnlyTheseKeys(ipcKeys.injectCustomFullscreenExit)
      .build();
    
    for await (const evt of this.ipc.recv(cfg)) {
      jsuperLog.debug(new Error, evt);

      try {
        switch (evt.value) {
          case ipcBoolRequests.requestTrue:
            this.handleCustomFullscreenExitInject();
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
  }

  /**
   * @param {MouseEvent} [event] 
   * @returns {void}
   */
  customFullscreenExit(event = undefined) {
    if (event && this.isCustomFullscreen) {
      event.stopImmediatePropagation();
    } else if (!this.isCustomFullscreen) {
      return;
    }

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

    // enable scrolling
    body.style.overflow = null;
    // show header
    header.style.display = null;
    // show info panel
    infoPanel.style.display = null;
    // show footer
    footer.style.display = null;

    // remove fullscreen styling from the player
    playerDiv.classList.remove(jutsuAttrs.playerFullscreenClassName);
    // make the player regular size
    playerDiv.classList.remove(jsuperCss.fullscreen);
    // put the player in a normal position
    playerDiv.classList.remove(jsuperCss.topIndex);

    this.player.isFullscreen(false);
    this.isCustomFullscreen = false;

    this.ipc.send({
      key: ipcKeys.fullscreenControl,
      value: ipcBoolRequests.requestFalse
    });
  }

  /**
   * @returns {void}
   */
  listenResolutionChange() {
    const thisArg = this;
    window.addEventListener("resize", function(event) {
      console.log(window.innerWidth, "x", window.innerHeight);
      thisArg.handleResolutionChange(event);
    }, true);
  }

  /**
   * @param {UIEvent} event 
   * @returns {void}
   */
  async handleResolutionChange(event) {
    const wasPeakScreenHeightDefined = typeof this.peakScreenHeight === "number";

    if (!wasPeakScreenHeightDefined || this.peakScreenHeight < window.innerHeight) {
      this.peakScreenHeight = window.innerHeight;
      return;
    } else if (this.peakScreenHeight > window.innerHeight) {
      this.ipc.send({
        key: ipcKeys.windowState,
        value: ipcAwaits.request
      });
      const windowState = (await this.ipc.recvOnce({
        key: ipcKeys.windowState
      })).value;
  
      if (windowState !== windowStates.fullscreen) {
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

    /** @type {HTMLButtonElement} */
    const fullscreenButton = document.getElementsByClassName(
      jutsuAttrs.playerFullscreenButtonClassName
    )[0];

    const thisArg = this;

    fullscreenButton.addEventListener(
      "click",
      function (event) {
        return thisArg.customFullscreenExit(event);
      },
      { capture: true, once: true }
    );

    // send callback that the injection was completed
    this.ipc.send({
      key: ipcKeys.injectCustomFullscreenExit,
      value: ipcAwaits.completed
    });

    this.listenResolutionChange();
  }
}

/**
 * # Init `JutSuper` class into a `jutsuper` global variable
 * @returns {void}
 */
function jutsuperLoad() {
  if (!jutsuper) {
    jsuperLog.debug(new Error, "JutSuper: now loading");
    jutsuper = new JutSuper(player, undefined);
  }
  else {
    throw new Error("JutSuper: already loaded");
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
    if (typeof jutsu_new_player === "undefined") {
      clearInterval(playerPollIntervalId);
      jsuperLog.log(new Error,
        "JutSuper: either old player is enabled or " +
        "this page contains no player, loading aborted"
      );
    }
    else if (player && player.overlays_ && player.on) {
      clearInterval(playerPollIntervalId);
      jutsuperLoad();
    }
  }, 100);
})();
