import { JutSuperIpc } from "/src/ipc.js";
import { JutSuPage, JutSuperIds, JutSuperIpcKeys } from "/src/consts.js";


/** @type {JutSuper} */
var jutsuper;


class JutSuper {
    /**
     * @param {unknown} player Jut.su's player on a page
     * @returns {JutSuper}
     */
    constructor(player) {
        if (!player || !player.overlays_ || !player.on) {
            throw new Error(
                "JutSuper: player not yet initialized, " +
                "unable to construct JutSuper"
            );
        }

        /** @type {JutSuperIpcKeys} */
        let ipcKeys = new JutSuperIpcKeys();

        /** @type {JutSuperIds} */
        this.ids = new JutSuperIds();
        /** @type {JutSuPage} */
        this.jutsu = new JutSuPage();

        /** @type {JutSuperIpc} */
        this.ipc = new JutSuperIpc(ipcKeys.pageSenderId, null, false);
        /** @type {unknown} */
        this.player = player;
        /** @type {HTMLDivElement} */
        this.playerDiv = document.getElementById(this.jutsu.playerDivId);
        /** @type {boolean} */
        this.openingTriggered = false;
        /** @type {boolean} */
        this.endingTriggered = false;
        /** @type {number[]} something like `[ 83, 98 ]` */
        this.openingSkipperRng = this.getOverlayRngByFunctionName(
            this.jutsu.skipOpeningFnName
        );
        /** @type {number[]} someting like `[ 1405, 1425 ]` */
        this.endingSkipperRng = this.getOverlayRngByFunctionName(
            this.jutsu.skipEndingFnName
        );
        
        this.ipc.listen();
        this.initializeIpcValues();
        this.injectFullscreenChangeListener();
        this.injectTimeupdateListener();
        this.injectSettingsTab();

        this.ipc.listen();
        
        console.debug("JutSuper: constructed");
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
     * @param {unknown} player 
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
     */
    startSkippingOpening() {
        if (!cur_time_cookie) {
            console.error(
                "JutSuper: cannot start skipping opening, " +
                "video wasn't played yet " +
                `(cur_time_cookie is ${cur_time_cookie})`
            );

            return null;
        }

        console.debug("JutSuper: able to skip opening");

        window[this.jutsu.skipOpeningFnName]();

        return null;
    }

    /**
     * # Stop opening skip countdown
     * @returns {null}
     */
    stopSkippingOpening() {
        console.debug("JutSuper: not skipping opening anymore");
        return null;
    }
    
    /**
     * # Start ending skip countdown
     * @returns {null}
     */
    async startSkippingEnding() {
        if (!cur_time_cookie) {
            console.debug(
                "JutSuper: cannot start skipping ending, " +
                "video wasn't played yet " +
                `(cur_time_cookie is ${cur_time_cookie})`
            );

            return null;
        }

        console.debug("JutSuper: able to skip ending");

        this.ipc.isEpisodeSwitchPrep = true;
        
        console.log("o next episode prep promise awaiting");
        const result = await this.ipc.episodeSwitchPrepPromise();

        if (result === false) {
            console.log("+ next episode prep promise fulfulled, value", result);
            window[this.jutsu.skipEndingFnName]();
        }

        return null;
    }
    
    /**
     * # Stop ending skip countdown
     * @returns {null}
     */
    stopSkippingEnding() {
        console.debug("JutSuper: not skipping ending anymore");
        return null;
    }

    /**
     * # Check if we are either in opening or ending time ranges
     * @returns {null}
     */
    checkForKeyTimestamps() {
        const time = this.player.currentTime();

        if (
            this.openingSkipperRng &&
            JutSuper.isInRangeExclusive(time, this.openingSkipperRng) &&
            !this.player.paused()
        ) {
            // then we currently see the opening skip button
    
            if (this.openingTriggered) {
                // then we have already recorded button's appearance,
                // no need for more triggers
                return null;
            }

            this.openingTriggered = true;
            this.startSkippingOpening();
        }
        else if (
            this.endingSkipperRng &&
            JutSuper.isInRangeExclusive(time, this.endingSkipperRng) &&
            !this.player.paused()
        ) {
            // then we currently see the ending skip button

            if (this.endingTriggered) {
                // then we have already recorded button's appearance,
                // no need for more triggers
                return null;
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

        return null;
    }

    /**
     * @returns {HTMLDivElement}
     */
    generateSettingsTab() {
        const gearIconUri = document
            .getElementById(this.ids.gearSvg)
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
     * @returns {null}
    */
    initializeIpcValues() {
        this.ipc.isEssentialsReady = true;
        this.ipc.isFullscreen = this.playerDiv.classList.contains(
            this.jutsu.playerFullscreenClassName
        );
        this.ipc.isEpisodeSwitchPrep = false;
        return null;
    }

    /**
     * @returns {null}
     */
    handlePlayerClassChange() {
        /**
         * `classList.contains("vjs-fullscreen")` is better
         * than `player.isFullscreen()`,
         * because when pressing F11 (going out of fullscreen),
         * the `fullscreenchange` event will be fired,
         * but the value returned by `isFullscreen()`
         * would still be `true`
         */
        const isFullscreen = this.playerDiv.classList.contains(
            this.jutsu.playerFullscreenClassName
        );

        if (this.ipc.isFullscreen !== isFullscreen) {
            this.ipc.isFullscreen = isFullscreen;
        }

        return null;
    }

    /**
     * @returns {null}
     */
    injectTimeupdateListener() {
        // on each time update, call `this.checkForKeyTimestamps`
        this.player.on("timeupdate", () => {
            JutSuper.prototype["checkForKeyTimestamps"].call(this, []);
        });
    }

    /**
     * @returns {null}
     */
    injectFullscreenChangeListener() {
        const options = { attributes: true };

        this._fullscreenMutationObserver = new MutationObserver(
            (mutations, observer) => {
                for (const record of mutations) {
                    if (record.attributeName !== "class") {
                        return null;
                    }

                    this.handlePlayerClassChange();
                }
            }
        );

        this._fullscreenMutationObserver.observe(
            this.playerDiv, options
        );
        
        return null;
    }

    /**
     * @returns {null}
     */
    injectSettingsTab() {
        const topPlayerLane = document.getElementsByClassName("achiv_switcher");

        if (topPlayerLane.length > 1) {
            console.warn("JutSuper: there are several achiv_switcher elements");
        }

        for (const lane of topPlayerLane) {
            lane.insertBefore(this.generateSettingsTab(), lane.firstChild);
        }

        return null;
    }
}

/**
 * # Init `JutSuper` class into a `jutsuper` global variable
 * @returns {null}
 */
function jutsuperLoad() {
    if (!jutsuper) {
        console.debug("JutSuper: now loading");
        jutsuper = new JutSuper(player, undefined);
    }
    else {
        throw new Error("JutSuper: already loaded");
    }

    return null;
}

/**
 * # Wait for necessary variables to be initialized
 * - `player`: the **jut.su**'s player on any
 * anime page
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
            console.log(
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
