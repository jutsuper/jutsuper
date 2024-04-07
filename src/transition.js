export {
  JutSuperTransition,
  JutSuperTransitionObjectKeys
};


/**
 * @typedef JutSuperTransitionObject
 * @property {boolean} isFullscreen
 * @property {boolean} isSwitchingEpisode
 */


/**
 * @readonly
 * @enum {JutSuperTransitionObjectKeysType}
 */
const JutSuperTransitionObjectKeys = {
  /** @type {"isFullscreen"} */
  isFullscreen: "isFullscreen",
  /** @type {"isSwitchingEpisode"} */
  isSwitchingEpisode: "isSwitchingEpisode"
}
/**
 * @typedef JutSuperTransitionObjectKeysType
 * @property {"isFullscreen"} isFullscreen
 * @property {"isSwitchingEpisode"} isSwitchingEpisode
 *
 * @typedef {(
 *   "isFullscreen" |
 *   "isSwitchingEpisode"
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
      isSwitchingEpisode: false
    };
    return this;
  }

  /** @returns {JutSuperTransition} */
  setUndefined() {
    this.#object = {
      isFullscreen: undefined,
      isSwitchingEpisode: undefined
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
}