import {
  JutSuperMessagingMessageKeys as msgKeys,
  JutSuperMessagingMessageActionsKeys as msgActKeys
} from "/src/consts.js";
export {
  JutSuperRequestMessageBuilder,
  JutSuperMessageBuilder
};


/**
 * @typedef JutSuperActionsMessage
 * @property {boolean?} fullscreenState
 */
/**
 * @typedef JutSuperMessage
 * @property {JutSuperActionsMessage?} actions
 */


class JutSuperRequestMessageBuilder {
  constructor() {
    /** @type {JutSuperActionsMessage} */
    this.message = {};
  }

  /**
   * @param {boolean} value 
   * @returns {JutSuperRequestMessageBuilder}
   */
  isFullscreenState(value) {
    this.message[msgActKeys.fullscreenState] = value;
    return this;
  }

  /**
   * @returns {JutSuperActionsMessage}
   */
  build() {
    return this.message
  }
}

class JutSuperMessageBuilder {
  constructor() {
    /** @type {JutSuperMessage} */
    this.message = {};
  }

  /**
   * @param {JutSuperActionsMessage} value 
   * @returns {JutSuperMessageBuilder}
   */
  request(value) {
    this.message[msgKeys.actions] = value;
    return this;
  }

  /**
   * @returns {JutSuperMessage}
   */
  build() {
    return this.message
  }
}