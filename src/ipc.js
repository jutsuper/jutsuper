import { jsuperLog } from "/src/log.js";
import {
  JutSuperIpcDefaultNodeProps as ipcDefaultNodeProps,
  JutSuperIpcJsDataTypes as ipcJsTypes,
  JutSuperIpcJsDataTypesArray as ipcJsTypesArr,
  JutSuperIpcValueDelims as ipcDelims
} from "/src/consts.js";
export {
  JutSuperIpc,
  JutSuperIpcBuilder,
  JutSuperIpcRecvParamsBuilder
};


/**
 * @typedef {import("/src/consts.js").JutSuperIpcSupportedDataTypes} JutSuperIpcSupportedDataTypes
 * @typedef {import("/src/consts.js").JutSuperIpcJsDataTypes} JutSuperIpcJsDataTypes
 * @typedef {import("/src/consts.js").JutSuperIpcJsDataTypesKeys} JutSuperIpcJsDataTypesKeys
 * @typedef {import("/src/consts.js").JutSuperIpcKeys} JutSuperIpcKeys
 * @typedef {import("/src/consts.js").JutSuperIpcKeysKeys} JutSuperIpcKeysKeys
 * @typedef {import("/src/consts.js").JutSuperIpcSettingsKeysKeys} JutSuperIpcSettingsKeysKeys
 */
/**
 * @typedef JutSuperIpcUnparsedValueDescriptor
 * @property {string | undefined} value
 * @property {JutSuperIpcJsDataTypesKeys | undefined} type
 * @property {string | undefined} sender
 */
/**
 * @typedef JutSuperIpcValueDescriptor
 * @property {string} [key]
 * @property {JutSuperIpcSupportedDataTypes} value
 * @property {string} sender
 */
/**
 * @typedef JutSuperIpcCreationParams
 * @property {string} nodeTag
 * @property {string} nodeId
 * @property {boolean} doCreateNode
 * @property {string} senderId
 */
/**
 * @typedef JutSuperIpcSendParams
 * @property {string} key
 * @property {JutSuperIpcSupportedDataTypes} value
 */
/**
 * @typedef JutSuperIpcRecvParams
 * @property {string} [senderId]
 * @property {string[]} [senderIds]
 * @property {string} [key]
 * @property {string[]} [keys]
 * @property {string} [value]
 * @property {string[]} [values]
 * @property {boolean} [acceptFromMyself]
 */


class JutSuperIpc {
  /** @type {HTMLElement} */
  #node;
  /** @type {{attributes: true}} */
  #defaultObserverOptions;

  /** @param {JutSuperIpcCreationParams} params */
  constructor(params) {
    this.LOCATION = JutSuperIpc.name;

    console.log(`${this.LOCATION}: constructing`);

    this.nodeTag = params.nodeTag ?
      params.nodeTag : ipcDefaultNodeProps.tag;
    this.nodeId = params.nodeId ?
      params.nodeId : ipcDefaultNodeProps.id;
    this.doCreateNode = params.doCreateNode !== undefined ?
      params.doCreateNode : false;
    this.senderId = params.senderId;

    if (typeof this.senderId !== ipcJsTypes.string) {
      throw new Error(
        `${this.LOCATION}: senderId should be specified ` +
        `and should be a string`
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
   * @returns {void}
   */
  send(params) {
    let encodedValue = this.encodeValueWithType(params.value);
    encodedValue = this.addSender(encodedValue);

    this.#node.setAttribute(params.key, encodedValue);
  }

  /**
   * @param {JutSuperIpcRecvParams} params 
   * @returns {Promise<JutSuperIpcValueDescriptor>}
   */
  async recvOnce(params) {
    /** @type {string[]} */
    let senderIds = [];
    /** @type {string[]} */
    let keys = [];
    /** @type {string[]} */
    let values = [];

    if (![null, undefined].includes(params.senderId)) {
      senderIds.push(params.senderId);
    };
    if (![null, undefined].includes(params.senderIds)) {
      senderIds.push(...params.senderIds);
    };
    if (params.acceptFromMyself) {
      senderIds.push(this.senderId);
    }
    if (![null, undefined].includes(params.key)) {
      keys.push(params.key);
    };
    if (![null, undefined].includes(params.keys)) {
      keys.push(...params.keys);
    };
    if (![null, undefined].includes(params.value)) {
      values.push(params.value);
    };
    if (![null, undefined].includes(params.values)) {
      values.push(...params.values);
    };

    const shouldRecvFromAnySenders = senderIds.length < 1;
    const shouldRecvAnyKeys = keys.length < 1;
    const shouldRecvAnyValues = values.length < 1;

    const getNodeKeyUnparsed = this.#getNodeKeyUnparsed;
    const thisArg = this;

    return new Promise((resolve) => {
      new MutationObserver(function (mutations, _observer) {
        for (const mutation of mutations) {
          if (!shouldRecvAnyKeys && !keys.includes(mutation.attributeName)) {
            continue;
          }

          /** @type {JutSuperIpcUnparsedValueDescriptor} */
          const descriptor = getNodeKeyUnparsed.call(
            thisArg,
            mutation.attributeName
          );

          if (descriptor.sender == thisArg.senderId && !params.acceptFromMyself) {
            continue;
          }

          if (!shouldRecvFromAnySenders && !senderIds.includes(descriptor.sender)) {
            continue;
          }

          const parsedValue = JutSuperIpc.decodeValueWithType(
            descriptor.value,
            descriptor.type
          );

          if (!shouldRecvAnyValues && !values.includes(descriptor.value)) {
            continue;
          }

          resolve({
            key: mutation.attributeName,
            value: parsedValue,
            sender: descriptor.sender
          });
        }
      }).observe(thisArg.#node, thisArg.#defaultObserverOptions);
    });
  }

  /**
   * @async
   * @param {JutSuperIpcRecvParams} params 
   * @returns {[JutSuperIpcValueDescriptor]}
   */
  async *recv(params) {
    while (true) {
      yield await this.recvOnce(params);
    }
  }

  /**
   * @param {JutSuperIpcKeysKeys | JutSuperIpcSettingsKeysKeys} key
   * @returns {JutSuperIpcValueDescriptor}
   */
  get(key) {
    const raw = this.#getNodeKeyUnparsed(key);
    if (raw) {
      const parsedValue = JutSuperIpc.decodeValueWithType(
        raw.value,
        raw.type
      );

      return {
        key: undefined,
        value: parsedValue,
        sender: raw.sender
      }
    }

    return {
      key: undefined,
      value: undefined,
      sender: undefined
    }
  }

  /**
   * @param {JutSuperIpcJsDataTypesKeys | string} type 
   * @returns {boolean}
   */
  static isTypeCompatible(type) {
    if (type === ipcJsTypes.null || ipcJsTypes[type] !== undefined) {
      return true;
    }

    return false;
  }

  /**
   * @param {JutSuperIpcSupportedDataTypes} value 
   * @returns {string}
   */
  encodeValueWithType(value) {
    /** @type {JutSuperIpcJsDataTypesKeys | string} */
    let typeOfValue = typeof value;

    if (value === null) {
      typeOfValue = ipcJsTypes.null;
    }

    if (!JutSuperIpc.isTypeCompatible(typeOfValue)) {
      throw new Error(
        `${this.LOCATION}: value of type ${typeOfValue} ` +
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
   * @param {JutSuperIpcJsDataTypesKeys} type
   * @returns {JutSuperIpcSupportedDataTypes | undefined}
   */
  static decodeValueWithType(value, type) {
    switch (type) {
      case ipcJsTypes.boolean: return JutSuperIpc.#decodeBoolean(value);
      case ipcJsTypes.number: return JutSuperIpc.#decodeNumber(value);
      case ipcJsTypes.string: return value;
      case ipcJsTypes.null: return null;
      case ipcJsTypes.undefined: return undefined;
    }
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
   * @returns {JutSuperIpcUnparsedValueDescriptor}
   */
  static splitDescriptorValue(value) {
    /** @type {string[]} */
    const valueAndRest = value.split(ipcDelims.type);
    /** @type {string[]} */
    const typeAndSender = valueAndRest[1].split(ipcDelims.sender);

    if (!ipcJsTypesArr.includes(typeAndSender[0])) {
      return;
    }

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
    document.getElementsByTagName("body")[0].appendChild(node);
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
   * @return {JutSuperIpcUnparsedValueDescriptor}
   */
  #getNodeKeyUnparsed(key) {
    const rawValue = this.#node.getAttribute(key);
    if (rawValue) {
      return JutSuperIpc.splitDescriptorValue(rawValue)
    }
    
    return {
      value: undefined,
      type: undefined,
      sender: undefined
    }
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
  }

  /**
   * @param {string} value
   * @returns {number | undefined}
   */
  static #decodeNumber(value) {
    const num = (new Number(value)).valueOf();

    if (!Number.isNaN(num)) {
      return num;
    }
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
   * @param {string | string[]} ids
   * @returns {JutSuperIpcRecvParamsBuilder}
   */
  recvOnlyFrom(ids) {
    this.#append(
      (id) => {this.params.senderId = id},
      (ids) => {this.params.senderIds.push(...ids)},
      ids
    )
    return this;
  }

  /**
   * @param {string | string[]} keys
   * @returns {JutSuperIpcRecvParamsBuilder}
   */
  recvOnlyTheseKeys(keys) {
    this.#append(
      (key) => {this.params.key = key},
      (keys) => {this.params.keys.push(...keys)},
      keys
    )
    return this;
  }

  /**
   * @param {string | string[]} values
   * @returns {JutSuperIpcRecvParamsBuilder}
   */
  recvOnlyTheseValues(values) {
    this.#append(
      (val) => {this.params.value = val},
      (vals) => {this.params.values.push(...vals)},
      values
    )
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

  #append(valueSingleSetter, valueArraySetter, value) {
    if (Array.isArray(value)) {
      valueArraySetter(value);
    }
    else {
      valueSingleSetter(value)
    }
  }
}
