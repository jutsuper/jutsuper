import { JutSuperIpcKeys } from "/src/consts.js";
export { JutSuperIpc };


/** @typedef {{thisArg: any, fn: function(any)}} Subscriber */
/** @typedef {{value: string, sender: string}} ValueDescriptor */


/**
 * # Inter-process communication
 * Used for communications between page and content scripts
 */
class JutSuperIpc {
    /**
     * @param {string} ctxId
     * @param {string | null} ipcId 
     * @param {boolean} doCreateNode
     * @returns {JutSuperIpc}
     */
    constructor(ctxId, ipcId = null, doCreateNode = false) {
        /** @type {attributes: boolean} */
        this.defaultObserverOptions = { attributes: true };
        /** @type {JutSuperIpcKeys} */
        this.keys = new JutSuperIpcKeys();

        /** @type {Subscriber[]} */
        this._onEssentialsReadyEvents = [];
        /** @type {Subscriber[]} */
        this._onFullscreenChangeEvents = [];
        /** @type {Subscriber[]} */
        this._onEpisodeSwitchPrepEvents = [];

        /** @type {string} */
        this._ctxId = ctxId;
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
     * @param {string} rawValue
     * @returns {ValueDescriptor}
     */
    static _parseValue(rawValue) {
        const splits = rawValue.split(";sender=");
        return { value: splits[0], sender: splits[1] }
    }

    /**
     * 
     * @param {Subscriber[]} fnMaps 
     * @param {any} value
     * @returns {null}
     */
    _broadcast(fnMaps, value) {
        for (const fnMap of fnMaps) {
            console.debug(`IPC:${this._ctxId} broadcasts`, fnMap);

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
                case this.keys.isEssentialsReady:
                    if (this.rawIsEssentialsReady.sender !== this._ctxId) {
                        this.broadcastEssentialsReady();
                    }
                    break;
                case this.keys.isFullscreen:
                    if (this.rawIsFullscreen.sender !== this._ctxId) {
                        this.broadcastFullscreenChange();
                    }
                    break;
                case this.keys.isEpisodeSwitchPrep:
                    if (this.rawIsEpisodeSwitchPrep.sender !== this._ctxId) {
                        this.broadcastEpisodeSwitchPrep();
                    }
                    break;
            }
        }

        return null;
    }

    /**
     * @returns {null}
     */
    listen() {
        this._mutationObserver = new MutationObserver((mutations, observer) => {
            this._mutationObserverCallback(mutations, observer);
        });
        this._mutationObserver.observe(this._ipcNode, this.defaultObserverOptions);

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


    //////////////////////////
    /** IS ESSENTIALS READY */
    //////////////////////////

    /**
     * @returns {boolean | null}
     */
    get isEssentialsReady() {
        const state = this._ipcNode.getAttribute(
            this.keys.isEssentialsReady
        );
        return JutSuperIpc._parseStrBool(
            JutSuperIpc._parseValue(state).value
        );
    }
    /**
     * @returns {ValueDescriptor}
     */
    get rawIsEssentialsReady() {
        const state = this._ipcNode.getAttribute(
            this.keys.isEssentialsReady
        );
        return JutSuperIpc._parseValue(state);
    }
    /**
     * @param {boolean} value
     * @returns {null}
     */
    set isEssentialsReady(value) {
        this._ipcNode.setAttribute(
            this.keys.isEssentialsReady,
            `${value};sender=${this._ctxId}`
        );
        return null;
    }
    /**
     * @param {any} thisArg
     * @param {Function} fn
     * @return {null}
     */
    onEssentialsReady(thisArg, fn) {
        this._onEssentialsReadyEvents.push(
            {thisArg: thisArg, fn: fn}
        );
        return null;
    }
    /**
     * @returns {Promise<boolean>}
     */
    async essentialsReadyPromise() {
        return new Promise((resolve) => {
            new MutationObserver((mutations, observer) => {
                for (const mutation of mutations) {
                    if (mutation.attributeName !== this.keys.isEssentialsReady) {
                        continue;
                    }

                    if (this.rawIsEssentialsReady.sender === this._ctxId) {
                        continue;
                    }

                    return resolve(this.isEssentialsReady)
                }
            }).observe(this._ipcNode, this.defaultObserverOptions);
        });
    }
    /**
     * @returns {null}
     */
    broadcastEssentialsReady() {
        this._broadcast(
            this._onEssentialsReadyEvents,
            this.isEssentialsReady
        );
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
        return JutSuperIpc._parseStrBool(
            JutSuperIpc._parseValue(state).value
        );
    }
    /**
     * @returns {ValueDescriptor}
     */
    get rawIsFullscreen() {
        const state = this._ipcNode.getAttribute(
            this.keys.isFullscreen
        );
        return JutSuperIpc._parseValue(state);
    }
    /**
     * @param {boolean} value
     * @returns {null}
     */
    set isFullscreen(value) {
        this._ipcNode.setAttribute(
            this.keys.isFullscreen,
            `${value};sender=${this._ctxId}`
        );
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
     * @returns {Promise<boolean>}
     */
    async fullscreenChangePromise() {
        return new Promise((resolve) => {
            new MutationObserver((mutations, observer) => {
                for (const mutation of mutations) {
                    if (mutation.attributeName !== this.keys.isFullscreen) {
                        continue;
                    }

                    if (this.rawIsFullscreen.sender === this._ctxId) {
                        continue;
                    }

                    return resolve(this.isFullscreen)
                }
            }).observe(this._ipcNode, this.defaultObserverOptions);
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
        return JutSuperIpc._parseStrBool(
            JutSuperIpc._parseValue(state).value
        );
    }
    /**
     * @returns {ValueDescriptor}
     */
    get rawIsEpisodeSwitchPrep() {
        const state = this._ipcNode.getAttribute(
            this.keys.isEpisodeSwitchPrep
        );
        return JutSuperIpc._parseValue(state);
    }
    /**
     * @param {boolean} value
     * @returns {null}
    */
    set isEpisodeSwitchPrep(value) {
        this._ipcNode.setAttribute(
            this.keys.isEpisodeSwitchPrep,
            `${value};sender=${this._ctxId}`
        );
        return null;
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
     * @returns {Promise<boolean>}
     */
    async episodeSwitchPrepPromise() {
        return new Promise((resolve) => {
            new MutationObserver((mutations, observer) => {
                for (const mutation of mutations) {
                    if (mutation.attributeName !== this.keys.isEpisodeSwitchPrep) {
                        continue;
                    }

                    if (this.rawIsEpisodeSwitchPrep.sender === this._ctxId) {
                        continue;
                    }

                    return resolve(this.isEpisodeSwitchPrep)
                }
            }).observe(this._ipcNode, this.defaultObserverOptions);
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
