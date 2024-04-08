export {
  JutSuperTransition,
  JutSuperTransitionObjectKeys
};


/**
 * @typedef JutSuperTransitionObject
 * @property {boolean} isFullscreen
 * @property {boolean} isSwitchingEpisode
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
  /** @type {"switchesCount"} */
  switchesCount: "switchesCount"
}
/**
 * @typedef JutSuperTransitionObjectKeysType
 * @property {"isFullscreen"} isFullscreen
 * @property {"isSwitchingEpisode"} isSwitchingEpisode
 * @property {"switchesCount"} switchesCount
 *
 * @typedef {(
 *   "isFullscreen" |
 *   "isSwitchingEpisode" |
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
      switchesCount: 0,
    };
    return this;
  }

  /** @returns {JutSuperTransition} */
  setUndefined() {
    this.#object = {
      isFullscreen: undefined,
      isSwitchingEpisode: undefined,
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
   * @param {number} value 
   * @returns {void}
   */
  setSwitchesCount(value) {
    this.#object.switchesCount = value;
  }
}