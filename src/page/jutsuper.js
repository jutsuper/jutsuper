import { jsuperLog } from "/src/log.js";
import { jsuperErrors } from "/src/error.js";
import {
  JutSuperIpcBuilder,
  JutSuperIpcRecvParamsBuilder,
  JutSuperIpc
} from "/src/ipc.js";
import {
  JutSuFunctions as jutsuFns,
  JutSuDomAttributes as jutsuAttrs,
  JutSuperAssetIds as assetIds,
  JutSuperCss as jsuperCss,
  JutSuperIpcIds as ipcIds,
  JutSuperIpcKeys as ipcKeys,
  JutSuperIpcLoadingStates as ipcLoadings,
  JutSuperIpcAwaitStates as ipcAwaits,
  JutSuperIpcBoolRequestStates as ipcBoolRequests
} from "/src/consts.js";


/** @type {JutSuper} */
var jutsuper;


/**
 * @param {MouseEvent} event 
 */
function customFullscreenExit(event) {
  event.stopImmediatePropagation();

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

  removeCustomFullscreenExit();
}

function removeCustomFullscreenExit() {
  /** @type {HTMLButtonElement} */
  const fullscreenButton = document.getElementsByClassName(
    jutsuAttrs.playerFullscreenButtonClassName
  )[0];

  fullscreenButton.removeEventListener(
    "click",
    customFullscreenExit,
    false
  );
}

class JutSuper {
  /**
   * @param {unknown} player Jut.su's player on a page
   */
  constructor(player) {
    this.LOCATION = JutSuper.name;

    if (!player || !player.overlays_ || !player.on) {
      throw new Error(
        "JutSuper: player not yet initialized, " +
        "unable to construct JutSuper"
      );
    }

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
    /** @type {number[]} something like `[ 83, 98 ]` */
    this.openingSkipperRng = this.getOverlayRngByFunctionName(
      jutsuFns.skipOpeningFnName
    );
    /** @type {number[]} someting like `[ 1405, 1425 ]` */
    this.endingSkipperRng = this.getOverlayRngByFunctionName(
      jutsuFns.skipEndingFnName
    );

    this.listenPlayRequests();
    this.listenCustomFullscreenExitInjectRequest();

    this.#initPage().then(() => {
      jsuperLog.debug(new Error, "JutSuper: constructed");
    });
  }

  async #initPage() {
    await this.initializeIpcValues();
    this.injectFullscreenChangeListener();
    this.injectTimeupdateListener();
    this.injectSettingsTab();
  }

  /**
   * # Check if `value` is in the `range`, exclusive (not including the last)
   * 
   * @param {number} value number value to check in the range 
   * @param {number[]} range where to check, should be like `[ 83, 98 ]`
   * @returns {boolean}
   */
  static isInRangeExclusive(value, range) {
    const start = range[0]
    const end = range[1]

    return value >= start && value < end
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
   * # Example
   * - `getOverlayRngByFunctionName("skip_video_intro") ->  [ 83, 98 ]`
   * - `getOverlayRngByFunctionName("video_go_next_episode") -> [ 1405, 1425 ]`
   * @param {string} fn_name
   * @returns {number[] | null}
   */
  getOverlayRngByFunctionName(fn_name) {
    for (const overlay of this.player.overlays_) {
      if (overlay.options_.the_function === fn_name) {
        return [overlay.options_.start, overlay.options_.end]
      }
    }

    return null;
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
      this.openingSkipperRng &&
      // is current time in the opening skipper region
      JutSuper.isInRangeExclusive(time, this.openingSkipperRng) &&
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
      this.endingSkipperRng &&
      // is current time in the ending skipper region
      JutSuper.isInRangeExclusive(time, this.endingSkipperRng) &&
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
  generateSettingsTab() {
    const gearIconUri = document
      .getElementById(assetIds.gearSvg)
      .getAttribute("href");

    const gearImage = document.createElement("img");
    gearImage.setAttribute("src", gearIconUri)
    gearImage.classList.add("jutsuper-bottom-margin-right-5");
    gearImage.style.width = "15px";
    gearImage.style.height = "15px";

    const div = document.createElement("div");
    div.classList.add("achiv_switcher_in");
    div.classList.add("jutsuper-bottom-top-anim-025");
    div.style.marginRight = "5px";

    div.append(gearImage);
    div.append("JutSuper");

    return div;
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
   * @returns {void}
   */
  injectSettingsTab() {
    const topPlayerLane = document.getElementsByClassName("achiv_switcher");

    if (topPlayerLane.length > 1) {
      jsuperLog.warn(new Error, "JutSuper: there are several achiv_switcher elements");
    }

    for (const lane of topPlayerLane) {
      lane.insertBefore(this.generateSettingsTab(), lane.firstChild);
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
          case ipcBoolRequests.requestFalse:
            this.handleCustomFullscreenExitUninject();
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
  handleCustomFullscreenExitInject() {
    /** @type {HTMLButtonElement} */
    const fullscreenButton = document.getElementsByClassName(
      jutsuAttrs.playerFullscreenButtonClassName
    )[0];

    fullscreenButton.onclick = customFullscreenExit;
  }

  /**
   * @returns {void}
   */
  handleCustomFullscreenExitUninject() {
    removeCustomFullscreenExit()
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
