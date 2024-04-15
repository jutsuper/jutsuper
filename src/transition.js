import { BrowserWindowStates as windowStates } from "/src/browser.js";
export {
  JutSuperTransition,
  JutSuperTransitionObjectKeys
};

/**
 * @typedef {import("/src/browser.js").BrowserWindowStatesKeys} BrowserWindowStatesKeys
 */

/**
 * @typedef JutSuperTransitionObject
 * @property {boolean} isFullscreen
 * @property {boolean} isSwitchingEpisode
 * @property {BrowserWindowStatesKeys} originalWindowState
 * @property {number} switchesCount
 */


/**
 * @readonly
 * @enum {JutSuperTransitionObjectKeysType}
 */
const JutSuperTransitionObjectKeys = {
  /** @type {"isFullscreen"} */
  isFullscreen: "isFullscreen",
  /** @type {"isSwitchingEpisode"} */
  isSwitchingEpisode: "isSwitchingEpisode",
  /** @type {"originalWindowState"} */
  originalWindowState: "originalWindowState",
  /** @type {"switchesCount"} */
  switchesCount: "switchesCount",
}
/**
 * @typedef JutSuperTransitionObjectKeysType
 * @property {"isFullscreen"} isFullscreen
 * @property {"isSwitchingEpisode"} isSwitchingEpisode
 * @property {"originalWindowState"} originalWindowState
 * @property {"switchesCount"} switchesCount
 *
 * @typedef {(
 *   "isFullscreen" |
 *   "isSwitchingEpisode" |
 *   "originalWindowState" |
 *   "switchesCount"
 * )} JutSuperTransitionObjectKeysKeys
 */


class JutSuperTransition {
  /** @type {JutSuperTransitionObject} */
  #object;

  constructor() {
    this.setUndefined();
  }

  /** @returns {JutSuperTransition} */
  setDefaults() {
    this.#object = {
      isFullscreen: false,
      isSwitchingEpisode: false,
      originalWindowState: windowStates.maximized,
      switchesCount: 0,
    };
    return this;
  }

  /** @returns {JutSuperTransition} */
  setUndefined() {
    this.#object = {
      isFullscreen: undefined,
      isSwitchingEpisode: undefined,
      originalWindowState: undefined,
      switchesCount: undefined,
    };
    return this;
  }

  /**
   * @param {JutSuperTransitionObject} value
   * @returns {JutSuperTransition}
   */
  set(value) {
    this.#object = value;
    return this;
  }

  /**
   * # Get the transition object
   * @returns {JutSuperTransitionObject}
   */
  get() {
    return this.#object;
  }

  /**
   * @param {boolean} value 
   * @returns {void}
   */
  setIsFullscreen(value) {
    this.#object.isFullscreen = value;
  }

  /**
   * @param {boolean} value 
   * @returns {void}
   */
  setIsSwitchingEpisode(value) {
    this.#object.isSwitchingEpisode = value;
  }

  /**
   * @param {BrowserWindowStatesKeys} value 
   * @returns {void}
   */
  setOriginalWindowState(value) {
    this.#object.originalWindowState = value;
  }

  /**
   * @param {number} value 
   * @returns {void}
   */
  setSwitchesCount(value) {
    this.#object.switchesCount = value;
  }
}