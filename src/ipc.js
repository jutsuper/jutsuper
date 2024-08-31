import { jsuperLog } from "/src/log.js";
import { ANY } from "/src/consts.js";
import { AsyncLock } from "/src/lock.js";
import { jsuperUtil } from "/src/util.js";
export {
  JutSuperIpcFlags,
  JutSuperIpcNamespaces,
  JutSuperIpcIds,
  JutSuperIpc,
  JutSuperIpcBuilder,
  JutSuperIpcRspParamsBuilder
};


console.debug("JutSuper: loading /src/ipc.js");


/**
 * @template Schema
 * @typedef {import("/src/types/ipc.d.ts").JutSuperIpcMessage<Schema>} JutSuperIpcMessage<Schema>
 */
/** 
 * @template Schema
 * @typedef {import("/src/types/ipc.d.ts").JutSuperIpcRspParams<Schema>} JutSuperIpcRspParams<Schema>
 */
/**
 * @template Schema
 * @typedef {import("/src/types/ipc.d.ts").JutSuperIpcInternalRspFilters<Schema>} JutSuperIpcInternalRspFilters<Schema>
 */
/**
 * @typedef {import("/src/types/ipc.d.ts").JutSuperIpcInternalRspFlags} JutSuperIpcInternalRspFlags
 * @typedef {import("/src/types/ipc.d.ts").JutSuperIpcCreationParams} JutSuperIpcCreationParams
 */


/**
 * @readonly
 * @enum {typeof JutSuperIpcFlags}
 */
const JutSuperIpcFlags = {
  /** @type {"req"} */
  req: "req",
  /** @type {"rsp"} */
  rsp: "rsp"
}
/** 
 * @typedef {(
 *   typeof JutSuperIpcFlags[keyof typeof JutSuperIpcFlags]
 * )} JutSuperIpcFlagsKeys
 */


/**
 * @readonly
 * @enum {typeof JutSuperIpcNamespaces}
 */
const JutSuperIpcNamespaces = {
  /** @type {"jutsuperIpc"} */
  general: "jutsuperIpc",
  /** @type {"jutsuperSettingsIpc"} */
  settings: "jutsuperSettingsIpc",
}
/** 
 * @typedef {(
 *   typeof JutSuperIpcNamespaces[keyof typeof JutSuperIpcNamespaces]
 * )} JutSuperIpcNamespacesKeys
 */


/**
 * # Describes IPC instances' ID's
 * 
 * IPC instances can have their own ID
 * so that they won't receive their own events
 * when listening.
 * 
 * @readonly
 * @enum {typeof JutSuperIpcIds}
 */
const JutSuperIpcIds = {
  /** @type {"pageMain"} */
  page: "pageMain",
  /** @type {"contentMain"} */
  content: "contentMain"
}
/** 
 * @typedef {(
 *   typeof JutSuperIpcIds[keyof typeof JutSuperIpcIds]
 * )} JutSuperIpcIdsKeys
 */


/**
 * @template {Record<string, any>} ReqMessageMap
 * @template {Record<string, any>} RspMessageMap
 * @template {Record<string, any>} RspMessageMapFilter
 */
class JutSuperIpc {
  /** @type {AsyncLock<JutSuperIpcMessage<RspMessageMap>>[]} */
  #locks;
  /** @type {RspMessageMap} */
  #rspMessageMap;

  /** @param {JutSuperIpcCreationParams} params */
  constructor(params) {
    const self = this;
    this.LOCATION = JutSuperIpc.name;

    this.namespace = params.namespace;
    this.senderId = params.senderId;
    this.flagsWhitelist = params.flagsWhitelist !== undefined ?
      params.flagsWhitelist : [];
    this.sendingFlags = params.sendingFlags !== undefined ?
      params.sendingFlags : [];

    this.ID_LOCATION = (
      `${this.LOCATION} ` +
      `(namespace=${this.namespace}, ` +
      `senderId=${this.senderId})`
    );

    if (this.sendingFlags.length > 0) {
      this.ID_LOCATION.substring(0, this.ID_LOCATION.length - 1);
      this.ID_LOCATION += `, sendingFlags=[${this.sendingFlags.join(",")}])`
    }

    jsuperLog.debug(`${this.ID_LOCATION}: constructing`);

    if (typeof this.senderId !== "string") {
      throw new Error(
        `${this.LOCATION}: senderId should be specified ` +
        `and should be a string`
      );
    }

    this.#locks = [];
    this.#rspMessageMap = /** @type {RspMessageMap} */ ({});

    window.addEventListener(
      "message",
      event => self.#handleEvent(event)
    );

    jsuperLog.debug(`${this.ID_LOCATION}: constructed`);
  }

  /**
   * @param {MessageEvent<JutSuperIpcMessage<RspMessageMap>>} rawEvent
   * @returns {void}
   */
  #handleEvent(rawEvent) {
    if (rawEvent.data === undefined) { return; }
    if (rawEvent.data.protocol !== "jutsuperIpc") { return; }
    if (rawEvent.data.namespace !== this.namespace) { return; }
    if (this.flagsWhitelist.length > 0 &&
      !this.flagsWhitelist.some(elm => rawEvent.data.flags.includes(elm))
    ) { return; }

    this.#mergeWithRspMap(rawEvent.data.data);
    this.#locks.forEach(desc => desc.resolve(rawEvent.data));
  }

  /**
   * @param {ReqMessageMap} schema
   * @returns {void}
   */
  send(schema) {
    /** @type {JutSuperIpcMessage<ReqMessageMap>} */
    const message = {
      protocol: "jutsuperIpc",
      namespace: this.namespace,
      sender: this.senderId,
      flags: this.sendingFlags,
      data: schema
    };

    window.postMessage(message);
    
    jsuperLog.debug(`${this.ID_LOCATION}: sent message:`, message.data);
  }

  /**
   * @param {JutSuperIpcInternalRspFilters<RspMessageMapFilter>} filters 
   * @param {JutSuperIpcInternalRspFlags} flags 
   * @param {AsyncLock<JutSuperIpcMessage<RspMessageMap>>} lock 
   * @returns {Promise<JutSuperIpcMessage<RspMessageMap>>}
   */
  async #recvOnceGeneric(filters, flags, lock) {
    const loc = `${this.ID_LOCATION}@${this.#recvOnceGeneric.name}`;

    /** @type {JutSuperIpcMessage<RspMessageMap>} */
    let event;

    while (true) {
      event = await lock.promise;

      // jsuperLog.debug(`${loc}: got event:`, event);

      if (!filters.fromSelf && event.sender === this.senderId) {
        // jsuperLog.debug(
        //   `${loc}: discarding this event ` +
        //   `because we cannot receive from ourselves`
        // );
        continue;
      }

      if (!flags.shouldRecvFromAnySenders && !filters.senders.includes(event.sender)) {
        // jsuperLog.debug(
        //   `${loc}: discarding this event ` +
        //   `because the sender was filtered out`
        // );
        continue;
      }

      if (!flags.shouldRecvAnySchema) {
        const intersection = jsuperUtil.objectIntersection(
          event.data,
          filters.schema,
          ANY
        );
        const isIntersectionEmpty = jsuperUtil.isEmptyObject(intersection);
  
        if (isIntersectionEmpty) {
          // jsuperLog.debug(
          //   `${loc}: discarding this event ` +
          //   `because no intersection was found with`, filters.schema
          // );
          continue;
        }
      }

      break;
    }

    return event;
  }

  /**
   * @param {JutSuperIpcRspParams<RspMessageMapFilter>} params 
   * @returns {Promise<RspMessageMap>}
   */
  async recvOnce(params) {
    const filters = this.#getFiltersFromRspParams(params);
    const flags = this.#getFlagsFromFilters(filters);
    const lock = this.#createLock();

    const event = await this.#recvOnceGeneric(filters, flags, lock);

    this.#removeLock(lock.id);

    return event.data;
  }

  /**
   * @async
   * @generator
   * @param {JutSuperIpcRspParams<RspMessageMapFilter>} params 
   * @yields {RspMessageMap}
   * @returns {AsyncGenerator<RspMessageMap, never, RspMessageMap>}
   */
  async *recv(params) {
    const filters = this.#getFiltersFromRspParams(params);
    const flags = this.#getFlagsFromFilters(filters);
    const lock = this.#createLock();

    while (true) {
      yield (await this.#recvOnceGeneric(filters, flags, lock)).data;
    }

    this.#removeLock(lock.id);
  }

  /**
   * @param {ReqMessageMap} txSchema
   * @param {JutSuperIpcRspParams<RspMessageMapFilter>} rspParams
   * @returns {Promise<RspMessageMap>}
   */
  async sendAndRecvOnce(txSchema, rspParams) {
    this.send(txSchema);
    return await this.recvOnce(rspParams);
  }

  /**
   * @returns {RspMessageMap}
   */
  getRsp() {
    return this.#rspMessageMap;
  }

  /**
   * @returns {AsyncLock}
   */
  #createLock() {
    const lock = new AsyncLock();
    this.#locks.push(lock);
    // jsuperLog.debug(`${this.ID_LOCATION}: created lock`, lock);
    return lock;
  }

  /**
   * @param {number} id 
   */
  async #removeLock(id) {
    this.#locks = this.#locks.filter(elm => elm.id !== id);
    // jsuperLog.debug(`${this.ID_LOCATION}: removed lock ${id}`);
  }

  /**
   * @param {RspMessageMap} data
   */
  #mergeWithRspMap(data) {
    this.#rspMessageMap = jsuperUtil.objectMergeDeep(this.#rspMessageMap, data);
    // jsuperLog.debug(
    //   `${this.ID_LOCATION}: merged`, data, `,`, 
    //   `current value:`, this.#rspMessageMap
    // );
  }

  /**
   * @param {JutSuperIpcRspParams<RspMessageMapFilter>} params 
   * @returns {JutSuperIpcInternalRspFilters<RspMessageMapFilter>}
   */
  #getFiltersFromRspParams(params) {
    /** @type {string[]} */
    let senders = [];

    if (![null, undefined].includes(params.senderId)) {
      senders.push(params.senderId);
    };
    if (![null, undefined].includes(params.senderIds)) {
      senders.push(...params.senderIds);
    };

    return {
      senders: senders,
      fromSelf: params.fromSelf,
      schema: params.schema,
    }
  }

  /**
   * @param {JutSuperIpcInternalRspFilters<RspMessageMapFilter>} filters 
   * @returns {JutSuperIpcInternalRspFlags}
   */
  #getFlagsFromFilters(filters) {
    return {
      shouldRecvFromAnySenders: filters.senders.length < 1,
      shouldRecvAnySchema: filters.schema === undefined
    }
  }
}

class JutSuperIpcBuilder {
  constructor() {
    /** @type {JutSuperIpcCreationParams} */
    this.params = {
      namespace: JutSuperIpcNamespaces.general,
      senderId: undefined,
      flagsWhitelist: [],
      sendingFlags: [],
    };
  }

  /**
   * @param {string} name
   * @returns {JutSuperIpcBuilder}
   */
  namespaceIs(name) {
    this.params.namespace = name;
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
   * @param {string[]} flags
   * @returns {JutSuperIpcBuilder}
   */
  ignoreWithoutAnyOfTheseFlags(flags) {
    this.params.flagsWhitelist = flags;
    return this;
  }

  /**
   * @param {string[]} flags
   * @returns {JutSuperIpcBuilder}
   */
  sendWithTheseFlags(flags) {
    this.params.sendingFlags = flags;
    return this;
  }

  /**
   * @returns {JutSuperIpc}
   */
  build() {
    return new JutSuperIpc(this.params);
  }
}

/**
 * @template {Record<string, any>} Schema
 */
class JutSuperIpcRspParamsBuilder {
  constructor() {
    /** @type {JutSuperIpcRspParams<Schema>} */
    this.params = {
      senderId: undefined,
      senderIds: [],
      fromSelf: false,
      schema: undefined
    };
  }

  /**
   * @param {string | string[]} ids
   * @returns {JutSuperIpcRspParamsBuilder}
   */
  recvOnlyFrom(ids) {
    this.#append(
      id => this.params.senderId = id,
      ids => this.params.senderIds.push(...ids),
      ids
    )
    return this;
  }

  /**
   * @returns {JutSuperIpcRspParamsBuilder}
   */
  recvFromSelf() {
    this.params.fromSelf = true;
    return this;
  }

  /**
   * @param {Schema} schema 
   * @returns {JutSuperIpcRspParamsBuilder}
   */
  recvOnlyThisIntersection(schema) {
    this.params.schema = schema;
    return this;
  }

  /**
   * @returns {JutSuperIpcRspParams<Schema>}
   */
  build() {
    return this.params;
  }

  /**
   * @param {function(string): any} valueSingleSetter 
   * @param {function(string[]): any} valueArraySetter 
   * @param {string | string[]} value 
   */
  #append(valueSingleSetter, valueArraySetter, value) {
    if (Array.isArray(value)) {
      valueArraySetter(value);
    }
    else {
      valueSingleSetter(value)
    }
  }
}
