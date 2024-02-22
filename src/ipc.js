import {
    JutSuperIpcKeys,
    JutSuperIpcDefaultNodeProps as ipcDefaultNodeProps,
    JutSuperIpcJsDataTypes as ipcJsTypes,
    JutSuperIpcValueDelims as ipcDelims
} from "/src/consts.js";
export {
    JutSuperIpc,
    JutSuperIpcBuilder,
    JutSuperIpcRecvParamsBuilder
};


/** @typedef {import("/src/consts.js").IpcSupportedTypes} IpcSupportedTypes */
/** @typedef {import("/src/consts.js").IpcJsDataType} IpcJsDataType */
/** @typedef {import("/src/consts.js").IpcKeys} IpcKeys */

/** @typedef {{thisArg: any, fn: function(any)}} Subscriber */
/** @typedef {{value: string, type: IpcJsDataType, sender: string}} UnparsedValueDescriptor */
/** @typedef {{value: IpcSupportedTypes, sender: string}} ValueDescriptor */

/** @typedef {{
 *   nodeTag: string,
 *   nodeId: string,
 *   doCreateNode: boolean,
 *   senderId: string
 * }} JutSuperIpcCreationParams */
/** @typedef {{
 *   key: string,
 *   value: any
 * }} JutSuperIpcSendParams */
/** @typedef {{
 *   senderId: string,
 *   senderIds: string[],
 *   key: string,
 *   keys: string[],
 *   value: string,
 *   values: string[],
 *   acceptFromMyself: boolean
 * }} JutSuperIpcRecvParams */


class JutSuperIpc {
    /** @type {HTMLElement} */
    #node;
    /** @type {{attributes: true}} */
    #defaultObserverOptions;

    /** @param {JutSuperIpcCreationParams} params */
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
     * @param {JutSuperIpcSendParams} params
     * @returns {undefined}
     */
    send(params) {
        let encodedValue = JutSuperIpc.encodeValueWithType(params.value);
        encodedValue = this.addSender(encodedValue);

        this.#node.setAttribute(params.key, encodedValue);
    }

    /**
     * @param {JutSuperIpcRecvParams} params 
     * @returns {Promise<ValueDescriptor>}
     */
    async recv(params) {
        /** @type {string[]} */
        const senderIds = [];
        /** @type {string[]} */
        const keys = [];
        /** @type {string[]} */
        const values = [];

        if (![null, undefined].contains(params.senderId)) {
            senderIds.push(params.senderId)
        };
        if (![null, undefined].contains(params.senderIds)) {
            senderIds.push(...params.senderIds)
        };
        if (params.acceptFromMyself) {
            senderIds.push(this.senderId);
        }
        if (![null, undefined].contains(params.key)) {
            keys.push(params.key)
        };
        if (![null, undefined].contains(params.keys)) {
            keys.push(...params.keys)
        };
        if (![null, undefined].contains(params.value)) {
            values.push(params.value)
        };
        if (![null, undefined].contains(params.values)) {
            values.push(...params.values)
        };

        const isAnySenders = senderIds.length < 1;
        const isAnyKeys = keys.length < 1;
        const isAnyValues = values.length < 1;

        return new Promise((resolve) => {
            new MutationObserver((mutations, observer) => {
                for (const mutation of mutations) {
                    if (
                        !isAnyKeys ||
                        !keys.includes(mutation.attributeName)
                    ) {
                        continue;
                    }

                    const descriptor = this.#getNodeKey(mutation.attributeName);

                    if (
                        !isAnyValues ||
                        !values.includes(descriptor.value)
                    ) {
                        continue;
                    }

                    if (
                        !isAnySenders ||
                        !senderIds.includes(descriptor.sender)
                    ) {
                        continue;
                    }

                    const parsedValue = JutSuperIpc.decodeValueWithType(
                        descriptor.value,
                        descriptor.type
                    )

                    yield resolve({
                        value: parsedValue,
                        sender: descriptor.sender
                    });
                }
            }).observe(this.#node, this.#defaultObserverOptions);
        });
    }

    /**
     * @param {IpcKeys} key
     * @returns {ValueDescriptor}
     */
    get(key) {
        const raw = this.#getNodeKey(key);
        const parsedValue = JutSuperIpc.decodeValueWithType(raw.value, raw.type);
        return { value: parsedValue, sender: raw.sender }
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

        if (!JutSuperIpc.isTypeCompatible(typeOfValue)) {
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
            case ipcJsTypes.boolean: return JutSuperIpc.#decodeBoolean(value);
            case ipcJsTypes.number: return JutSuperIpc.#decodeNumber(value);
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
     * @returns {UnparsedValueDescriptor}
     */
    static splitDescriptorValue(value) {
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
     * @return {UnparsedValueDescriptor}
     */
    #getNodeKey(key) {
        return JutSuperIpc.splitDescriptorValue(this.#node.getAttribute(key))
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

class JutSuperIpcBuilder {
    constructor() {
        /** @type {JutSuperIpcCreationParams} */
        this.params = {
            nodeTag: undefined,
            nodeId: undefined,
            doCreateNode: undefined,
            senderId: undefined,
        };
    }

    /**
     * @param {string} name
     * @returns {JutSuperIpcBuilder}
     */
    communicationNodeTagIs(name) {
        this.params.nodeTag = name;
        return this;
    }

    /**
     * @param {string} name
     * @returns {JutSuperIpcBuilder}
     */
    communicationNodeIdIs(name) {
        this.params.nodeId = name;
        return this;
    }

    /**
     * @returns {JutSuperIpcBuilder}
     */
    createCommunicationNode() {
        this.params.doCreateNode = true;
        return this;
    }

    /**
     * @param {string} name 
     * @returns {JutSuperIpcBuilder}
     */
    identifyAs(name) {
        this.params.senderId = name;
        return this;
    }

    /**
     * @returns {JutSuperIpc}
     */
    build() {
        return new JutSuperIpc(this.params);
    }
}

class JutSuperIpcRecvParamsBuilder {
    constructor() {
        /** @type {JutSuperIpcRecvParams} */
        this.params = {
            senderId: undefined,
            senderIds: [],
            key: undefined,
            keys: [],
            value: undefined,
            values: [],
            acceptFromMyself: false,
        };
    }

    /**
     * @param {string | string[]} id 
     * @returns {JutSuperIpcRecvParamsBuilder}
     */
    recvOnlyFrom(ids) {
        this.#append(this.params.senderId, this.params.senderIds, ids)
        return this;
    }

    /**
     * @param {string | string[]} id 
     * @returns {JutSuperIpcRecvParamsBuilder}
     */
    recvOnlyTheseKeys(keys) {
        this.#append(this.params.key, this.params.keys, keys)
        return this;
    }

    /**
     * @param {string | string[]} id 
     * @returns {JutSuperIpcRecvParamsBuilder}
     */
    recvOnlyTheseValues(values) {
        this.#append(this.params.value, this.params.values, values)
        return this;
    }

    /**
     * @returns {JutSuperIpcRecvParamsBuilder}
     */
    recvFromMyself() {
        this.params.acceptFromMyself = true;
        return this;
    }

    /**
     * @returns {JutSuperIpcRecvParams}
     */
    build() {
        return this.params;
    }

    #append(valueSingle, valueArray, value) {
        if (Array.isArray(value)) {
            valueArray.push(...value);
        }
        else {
            valueSingle = ids;
        }
    }
}
