import {
    JutSuperIpcKeys,
    JUTSUPER_IPC_DEFAULT_NODE_PROPS as ipcDefaultNodeProps,
    JUTSUPER_IPC_SUB_FILTERS as ipcFilters,
    JUTSUPER_IPC_JS_DATA_TYPES as ipcJsTypes,
    JUTSUPER_IPC_KEYS as ipcKeys,
    JUTSUPER_IPC_VALUE_DELIMS as ipcDelims,
} from "/src/consts.js";
export {
    BetterIpc,
    BetterIpcBuilder,
    JutSuperIpc
};


/** @typedef {import("/src/consts.js").IpcSupportedTypes} IpcSupportedTypes */
/** @typedef {import("/src/consts.js").IpcJsDataType} IpcJsDataType */

/** @typedef {{thisArg: any, fn: function(any)}} Subscriber */
/** @typedef {{value: string, type: IpcJsDataType, sender: string}} ValueDescriptor */

/** @typedef {{
 *   nodeTag: string,
 *   nodeId: string,
 *   doCreateNode: boolean,
 *   senderId: string
 * }} BetterIpcCreationParams */
/** @typedef {{
 *   key: string,
 *   value: any
 * }} BetterIpcSendParams */
/** @typedef {{
 *   fromId: string | null,
 *   key: string | null,
 *   value: string | null
 * }} BetterIpcRecvParams */


class BetterIpc {
    /** @type {HTMLElement} */
    #node;
    /** @type {{attributes: true}} */
    #defaultObserverOptions;

    /** @param {BetterIpcCreationParams} params */
    constructor(params) {
        this.nodeTag = params.nodeTag ?
            params.nodeTag : ipcDefaultNodeProps.tag;
        this.nodeId = params.nodeId ?
            params.nodeId : ipcDefaultNodeProps.id;
        this.doCreateNode = params.doCreateNode !== undefined ?
            params.doCreateNode : false;
        this.senderId = params.senderId;

        if (typeof this.senderId !== ipcJsTypes.string) {
            throw new Error(
                "JutSuper IPC: senderId should be specified " +
                "and should be a string"
            );
        }

        this.#defaultObserverOptions = { attributes: true };

        if (this.doCreateNode) {
            this.#node = this.#createNode();
        }
        else {
            this.#node = this.#getNode();
        }
    }

    /**
     * @param {BetterIpcSendParams} params
     * @returns {undefined}
     */
    send(params) {
        let encodedValue = BetterIpc.encodeValueWithType(params.value);
        encodedValue = this.addSender(encodedValue);

        this.#node.setAttribute(params.key, encodedValue);
    }

    /**
     * @param {BetterIpcRecvParams} params 
     * @returns {Promise<ValueDescriptor>}
     */
    async recv(params) {
        return new Promise((resolve) => {
            new MutationObserver((mutations, observer) => {
                for (const mutation of mutations) {
                    if (
                        params.key !== ipcFilters.any &&
                        mutation.attributeName !== params.key
                    ) {
                        continue;
                    }

                    const value = this.#getNodeKey(mutation.attributeName);

                    if (
                        params.value !== ipcFilters.any &&
                        value.value !== params.value
                    ) {
                        continue;
                    }

                    if (
                        params.value !== ipcFilters.any &&
                        value.sender !== params.fromId
                    ) {
                        continue;
                    }

                    return resolve(value);
                }
            }).observe(this.#node, this.#defaultObserverOptions);
        });
    }

    /**
     * @param {IpcJsDataType | string} type 
     * @returns {boolean}
     */
    static isTypeCompatible(type) {
        if (type === ipcJsTypes.null || ipcJsTypes[type] !== undefined) {
            return true;
        }

        return false;
    }

    /**
     * @param {IpcSupportedTypes} value 
     * @returns {string}
     */
    static encodeValueWithType(value) {
        let typeOfValue = typeof value;

        if (value === null) {
            typeOfValue = ipcJsTypes.null;
        }

        if (!BetterIpc.isTypeCompatible(typeOfValue)) {
            throw new Error(
                `JutSuper IPC: value of type ${typeOfValue} ` +
                `is not supported`
            )
        }

        if (value === null) {
            return `${value}${ipcDelims.type}${ipcJsTypes.null}`;
        }

        return `${value}${ipcDelims.type}${typeof value}`;
    }

    /**
     * 
     * @param {string} value 
     * @param {IpcJsDataType} type
     * @returns {IpcSupportedTypes}
     */
    static decodeValueWithType(value, type) {
        switch (type) {
            case ipcJsTypes.boolean: return BetterIpc.#decodeBoolean(value);
            case ipcJsTypes.number: return BetterIpc.#decodeNumber(value);
            case ipcJsTypes.string: return value;
            case ipcJsTypes.null: return null;
            case ipcJsTypes.undefined: return undefined;
        }

        return undefined;
    }

    /**
     * @param {string} value 
     * @returns {string}
     */
    addSender(value) {
        return `${value}${ipcDelims.sender}${this.senderId}`
    }

    /**
     * @param {string} value
     * @returns {ValueDescriptor}
     */
    static parseDescriptorValue(value) {
        const valueAndRest = value.split(ipcDelims.type);
        const typeAndSender = valueAndRest.split(ipcDelims.sender);

        return {
            value: valueAndRest[0],
            type: typeAndSender[0],
            sender: typeAndSender[1],
        }
    }

    /**
     * @returns {HTMLElement}
     */
    #createNode() {
        const node = document.createElement(this.nodeTag);
        node.id = this.nodeId;
        return node;
    }

    /**
     * @returns {HTMLElement}
     */
    #getNode() {
        return document.getElementById(this.nodeId);
    }

    /**
     * @param {string} key 
     * @return {ValueDescriptor}
     */
    #getNodeKey(key) {
        return BetterIpc.parseDescriptorValue(this.#node.getAttribute(key))
    }

    /**
     * @param {"true" | "false" | string} value
     * @returns {boolean | undefined}
     */
    static #decodeBoolean(value) {
        switch (value) {
            case "true": return true;
            case "false": return false;
        }

        return undefined
    }

    /**
     * @param {string} value
     * @returns {number | undefined}
     */
    static #decodeNumber(value) {
        const num = new Number(value);

        if (num !== NaN) {
            return num;
        }

        return undefined
    }
}

class BetterIpcBuilder {
    constructor() {
        /** @type {BetterIpcCreationParams} */
        this.params = {
            nodeTag: undefined,
            nodeId: undefined,
            doCreateNode: undefined,
            senderId: undefined,
        };
    }

    /**
     * @param {string} name
     * @returns {BetterIpcBuilder}
     */
    communicationNodeTagIs(name) {
        this.params.nodeTag = name;
        return this;
    }

    /**
     * @param {string} name
     * @returns {BetterIpcBuilder}
     */
    communicationNodeIdIs(name) {
        this.params.nodeId = name;
        return this;
    }

    /**
     * @returns {BetterIpcBuilder}
     */
    createCommunicationNode() {
        this.params.doCreateNode = true;
        return this;
    }

    /**
     * @param {string} name 
     * @returns {BetterIpcBuilder}
     */
    identifyAs(name) {
        this.params.senderId = name;
        return this;
    }

    /**
     * @returns {BetterIpc}
     */
    build() {
        return new BetterIpc(this.params);
    }
}

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
