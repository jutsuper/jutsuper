import {
  JutSuperMessagingMessageKeys as msgKeys,
  JutSuperMessagingMessageActionsKeys as msgActKeys,
  JutSuperMessagingMessageRequestsRequestKeys as msgReqReqKeys,
  JutSuperMessagingMessageRequestsResponseKeys as msgReqRespKeys
} from "/src/consts.js";
export {
  JutSuperActionsMessageBuilder,
  JutSuperRequestsRequestMessageBuilder,
  JutSuperRequestsResponseMessageBuilder,
  JutSuperMessageBuilder
};


/** @typedef {import("/src/browser.js").BrowserWindowStatesKeys} BrowserWindowStatesKeys */


/**
 * @typedef JutSuperActionsMessage
 * @property {boolean} [fullscreenState]
 * @property {BrowserWindowStatesKeys} [originalWindowState]
 * 
 * @typedef JutSuperRequestsRequestMessage
 * @property {boolean} [getWindowState]
 * 
 * @typedef JutSuperRequestsResponseMessage
 * @property {BrowserWindowStatesKeys} [windowState]
 *
 * @typedef JutSuperMessage
 * @property {JutSuperActionsMessage} [actions]
 * @property {JutSuperRequestsRequestMessage} [requests]
 */


class JutSuperActionsMessageBuilder {
  /** @type {JutSuperActionsMessage} */
  #message
  
  constructor() {
    /** @type {JutSuperActionsMessage} */
    this.#message = {};
  }

  /**
   * @param {boolean} value 
   * @returns {JutSuperActionsMessageBuilder}
   */
  isFullscreenState(value) {
    this.#message[msgActKeys.fullscreenState] = value;
    return this;
  }

  /**
   * @param {BrowserWindowStatesKeys} value 
   * @returns {JutSuperActionsMessageBuilder}
   */
  originalWindowState(value) {
    this.#message[msgActKeys.originalWindowState] = value;
    return this;
  }

  /**
   * @returns {JutSuperActionsMessage}
   */
  build() {
    return this.#message
  }
}

class JutSuperRequestsRequestMessageBuilder {
  /** @type {JutSuperRequestsRequestMessage} */
  #message
  
  constructor() {
    /** @type {JutSuperRequestsRequestMessage} */
    this.#message = {};
  }

  /**
   * @returns {JutSuperRequestsRequestMessageBuilder}
   */
  getWindowState() {
    this.#message[msgReqReqKeys.getWindowState] = true;
    return this;
  }

  /**
   * @returns {JutSuperRequestsRequestMessage}
   */
  build() {
    return this.#message
  }
}

class JutSuperRequestsResponseMessageBuilder {
  /** @type {JutSuperRequestsResponseMessage} */
  #message
  
  constructor() {
    /** @type {JutSuperRequestsResponseMessage} */
    this.#message = {};
  }

  /**
   * @param {BrowserWindowStatesKeys} value 
   * @returns {JutSuperRequestsResponseMessageBuilder}
   */
  windowState(value) {
    this.#message[msgReqRespKeys.windowState] = value;
    return this;
  }

  /**
   * @returns {JutSuperRequestsResponseMessage}
   */
  build() {
    return this.#message
  }
}

class JutSuperMessageBuilder {
  /** @type {JutSuperMessage} */
  #message;

  constructor() {
    /** @type {JutSuperMessage} */
    this.#message = {};
  }

  /**
   * @param {JutSuperActionsMessage} value 
   * @returns {JutSuperMessageBuilder}
   */
  actions(value) {
    this.#message[msgKeys.actions] = value;
    return this;
  }

  /**
   * @param {JutSuperRequestsRequestMessage} value 
   * @returns {JutSuperMessageBuilder}
   */
  requests(value) {
    this.#message[msgKeys.requests] = value;
    return this;
  }

  /**
   * @returns {JutSuperMessage}
   */
  build() {
    return this.#message
  }
}