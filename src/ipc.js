import { JutSuperIpcKeys } from "/src/consts.js";
export { JutSuperIpc };


/** @typedef {{thisArg: any, fn: function(any)}} Subscriber */


/**
 * # Inter-process communication
 * Used for communications between page and content scripts
 */
class JutSuperIpc {
    /**
     * @param {string | null} ipcId 
     * @param {boolean} doCreateNode
     * @returns {JutSuperIpc}
     */
    constructor(ipcId = null, doCreateNode = false) {
        /** @type {JutSuperIpcKeys} */
        this.keys = new JutSuperIpcKeys();

        /** @type {Subscriber[]} */
        this._onFullscreenChangeEvents = [];
        /** @type {Subscriber[]} */
        this._onEpisodeSwitchPrepEvents = [];

        /** @type {string} */
        this._ipcId = ipcId ? ipcId : this.keys.defaultIpcId;

        const body = document.getElementsByTagName("body")[0];
        const ipcNode = doCreateNode ?
            document.createElement(this._ipcId) :
            document.getElementById(this._ipcId);

        if (!ipcNode) {
            throw new Error(
                `JutSuperIpc(): doCreateNode is ${doCreateNode}, ` +
                `but the node does not exist.`
            );
        }
        
        body.append(ipcNode);

        ipcNode.setAttribute("id", this._ipcId);

        this._ipcNode = ipcNode;
    }

    /**
     * @param {string} strBool 
     * @return {boolean | null}
     */
    static _parseStrBool(strBool) {
        switch (strBool) {
            case "true": return true;
            case "false": return false;
            default: return null;
        }
    }

    /**
     * 
     * @param {Subscriber[]} fnMaps 
     * @param {any} value
     * @returns {null}
     */
    _broadcast(fnMaps, value) {
        for (const fnMap of fnMaps) {
            try {
                fnMap.fn.call(fnMap.thisArg, value);
            } catch (error) {
                console.error(
                    "JutSuper IPC: exception during subscriber call",
                    error
                );
            }
        }

        return null;
    }

    /**
     * @param {MutationRecord[]} mutationList
     * @param {MutationObserver} observer
     * @returns {null}
     */
    _mutationObserverCallback(mutations, observer) {
        for (const mutation of mutations) {
            switch (mutation.attributeName) {
                case this.keys.isFullscreen:
                    this.broadcastFullscreenChange();
                    break;
                case this.keys.isEpisodeSwitchPrep:
                    this.broadcastEpisodeSwitchPrep();
                    break;
            }
        }

        return null;
    }

    /**
     * @returns {null}
     */
    listen() {
        const options = { attributes: true };
        this._mutationObserver = new MutationObserver((mutations, observer) => {
            this._mutationObserverCallback(mutations, observer);
        });
        this._mutationObserver.observe(this._ipcNode, options);

        return null;
    }

    /**
     * @returns {null}
     */
    stopListen() {
        if (!this._mutationObserver) {
            throw new Error(
                "JutSuper IPC: can't stop listening, " +
                "no active listener"
            )
        }
    
        this._mutationObserver.disconnect()
        this._mutationObserver = undefined;

        return null;
    }

    ////////////////////
    /** IS FULLSCREEN */
    ////////////////////

    /**
     * @returns {boolean | null}
     */
    get isFullscreen() {
        const state = this._ipcNode.getAttribute(
            this.keys.isFullscreen
        );
        return JutSuperIpc._parseStrBool(state);
    }
    /**
     * @param {boolean} value
     * @returns {null}
     */
    set isFullscreen(value) {
        this._ipcNode.setAttribute(
            this.keys.isFullscreen,
            String(value)
        );
        this.broadcastFullscreenChange();
        return null;
    }
    /**
     * @param {any} thisArg
     * @param {Function} fn
     * @return {null}
     */
    onFullscreenChange(thisArg, fn) {
        this._onFullscreenChangeEvents.push(
            {thisArg: thisArg, fn: fn}
        );
        return null;
    }
    /**
     * @returns {boolean | null}
     */
    async fullscreenChangePromise() {
        return new Promise((resolve) => {
            
        });
    }
    /**
     * @returns {null}
     */
    broadcastFullscreenChange() {
        this._broadcast(
            this._onFullscreenChangeEvents,
            this.isFullscreen
        );
        return null;
    }

    /////////////////////////////////////
    /** IS EPISODE SWITCH PREPARATIONS */
    /////////////////////////////////////

    /**
     * @returns {boolean | undefined}
     */
    get isEpisodeSwitchPrep() {
        const state = this._ipcNode.getAttribute(
            this.keys.isEpisodeSwitchPrep
        );
        return JutSuperIpc._parseStrBool(state);
    }
    /**
     * @param {boolean} value
     * @returns {null}
    */
    set isEpisodeSwitchPrep(value) {
        this._ipcNode.setAttribute(
            this.keys.isEpisodeSwitchPrep,
            String(value)
        );
        this.broadcastEpisodeSwitchPrep();
    }
    /**
     * @param {any} thisArg
     * @param {Function} fn
     * @returns {null}
     */
    onEpisodeSwitchPrep(thisArg, fn) {
        this._onEpisodeSwitchPrepEvents.push(
            {thisArg: thisArg, fn: fn}
        );
    }
    /**
     * @returns {boolean | null}
     */
    async episodeSwitchPrepPromise() {
        return new Promise((resolve) => {
            
        });
    }
    /**
     * @returns {null}
     */
    broadcastEpisodeSwitchPrep() {
        this._broadcast(
            this._onEpisodeSwitchPrepEvents,
            this.isEpisodeSwitchPrep
        );
        return null;
    }
}
