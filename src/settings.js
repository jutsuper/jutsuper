export {
  JutSuperSettings,
  JutSuperSettingsEndingsObjectKeys,
  JutSuperSettingsOpeningsObjectKeys,
  JutSuperSettingsObjectKeys,
  JutSuperSettingsSkipOrder
};


/**
 * @typedef JutSuperSettingsOpeningsObject
 * @property {boolean} doSkip
 * @property {JutSuperSettingsSkipOrderKeys} skipOrder
 * 
 * @typedef JutSuperSettingsEndingsObject
 * @property {boolean} doSkip
 * @property {JutSuperSettingsSkipOrderKeys} skipOrder
 * @property {boolean} doPersistFullscreen
 * @property {number} maxSkips
 * 
 * @typedef JutSuperSettingsObject
 * @property {JutSuperSettingsOpeningsObject} openings
 * @property {JutSuperSettingsEndingsObject} endings
 * @property {number} skipDelayS
 * @property {string} skipCancelKey
 */


/**
 * @readonly
 * @enum {JutSuperSettingsEndingsObjectKeysType}
 */
const JutSuperSettingsEndingsObjectKeys = {
  /** @type {"doSkip"} */
  doSkip: "doSkip",
  /** @type {"skipOrder"} */
  skipOrder: "skipOrder",
  /** @type {"doPersistFullscreen"} */
  doPersistFullscreen: "doPersistFullscreen",
  /** @type {"maxSkips"} */
  maxSkips: "maxSkips"
}
/**
 * @typedef JutSuperSettingsEndingsObjectKeysType
 * @property {"doSkip"} doSkip
 * @property {"skipOrder"} skipOrder
 * @property {"doPersistFullscreen"} doPersistFullscreen
 * @property {"maxSkips"} maxSkips
 *
 * @typedef {(
 *   "doSkip" |
 *   "skipOrder" |
 *   "doPersistFullscreen" |
 *   "maxSkips"
 * )} JutSuperSettingsEndingsObjectKeysKeys
 */

/**
 * @readonly
 * @enum {JutSuperSettingsObjectKeysType}
 */
const JutSuperSettingsOpeningsObjectKeys = {
  /** @type {"doSkip"} */
  doSkip: "doSkip",
  /** @type {"skipOrder"} */
  skipOrder: "skipOrder"
}
/**
 * @typedef JutSuperSettingsOpeningsObjectKeysType
 * @property {"doSkip"} doSkip
 * @property {"skipOrder"} skipOrder
 *
 * @typedef {(
 *   "doSkip" |
 *   "skipOrder"
 * )} JutSuperSettingsOpeningsObjectKeysKeys
 */


/**
 * @readonly
 * @enum {JutSuperSettingsObjectKeysType}
 */
const JutSuperSettingsObjectKeys = {
  /** @type {"openings"} */
  openings: "openings",
  /** @type {"endings"} */
  endings: "endings",
  /** @type {"skipDelayS"} */
  skipDelayS: "skipDelayS",
  /** @type {"skipCancelKey"} */
  skipCancelKey: "skipCancelKey"
}
/**
 * @typedef JutSuperSettingsObjectKeysType
 * @property {"openings"} openings
 * @property {"endings"} endings
 * @property {"skipDelayS"} skipDelayS
 * @property {"skipCancelKey"} skipCancelKey
 *
 * @typedef {(
*   "openings" |
*   "endings" |
*   "skipDelayS" |
*   "skipCancelKey"
* )} JutSuperSettingsObjectKeysKeys
*/


/**
 * @readonly
 * @enum {JutSuperSettingsSkipOrderType}
 */
const JutSuperSettingsSkipOrder = {
  /** @type {"firstOccurrence"} */
  firstOccurrence: "firstOccurrence",
  /** @type {"lastOccurrence"} */
  lastOccurrence: "lastOccurrence"
}
/**
 * @typedef JutSuperSettingsSkipOrderType
 * @property {"firstOccurrence"} firstOccurrence
 * @property {"lastOccurrence"} lastOccurrence
 * 
 * @typedef {(
 *   "firstOccurrence" |
 *   "lastOccurrence"
 * )} JutSuperSettingsSkipOrderKeys
 */


class JutSuperSettings {
  /** @type {JutSuperSettingsObject} */
  #object;

  constructor() {
    this.setUndefined();
  }

  /** @returns {JutSuperSettings} */
  setDefaults() {
    this.#object = {
      openings: {
        doSkip: true,
        skipOrder: JutSuperSettingsSkipOrder.firstOccurrence
      },
      endings: {
        doSkip: true,
        skipOrder: JutSuperSettingsSkipOrder.firstOccurrence,
        doPersistFullscreen: true,
        maxSkips: 0
      },
      skipDelayS: 3,
      skipCancelKey: "Shift"
    };
    return this;
  }

  /** @returns {JutSuperSettings} */
  setUndefined() {
    this.#object = {
      openings: {
        doSkip: undefined,
        skipOrder: undefined
      },
      endings: {
        doSkip: undefined,
        skipOrder: undefined,
        doPersistFullscreen: undefined,
        maxSkips: undefined
      },
      skipDelayS: undefined,
      skipCancelKey: undefined
    };
    return this;
  }

  /**
   * @param {JutSuperSettingsObject} value
   * @returns {JutSuperSettings}
   */
  set(value) {
    this.#object = value;
    return this;
  }

  /**
   * # Get the settings object
   * @returns {JutSuperSettingsObject}
   */
  get() {
    return this.#object;
  }

  //////////////
  // Openings //
  //////////////

  /**
   * @param {boolean} value 
   * @returns {void}
   */
  setDoSkipOpenings(value) {
    this.#object.openings.doSkip = value;
  }

  /**
   * @param {JutSuperSettingsSkipOrderKeys} value 
   * @returns {void}
   */
  setOpeningsSkipOrder(value) {
    this.#object.openings.skipOrder = value;
  }

  /////////////
  // Endings //
  /////////////

  /**
   * @param {boolean} value 
   * @returns {void}
   */
  setDoSkipEndings(value) {
    this.#object.endings.doSkip = value;
  }

  /**
   * @param {JutSuperSettingsSkipOrderKeys} value 
   * @returns {void}
   */
  setEndingsSkipOrder(value) {
    this.#object.endings.skipOrder = value;
  }

  /**
   * @param {boolean} value 
   * @returns {void}
   */
  setEndingsPersistFullscreen(value) {
    this.#object.endings.doPersistFullscreen = value;
  }

  /**
   * @param {number} value 
   * @returns {void}
   */
  setEndingsMaxSkips(value) {
    this.#object.endings.maxSkips = value;
  }

  ////////////
  // Shared //
  ////////////

  /**
   * @param {number} value 
   * @returns {void}
   */
  setSkipDelayMs(value) {
    this.#object.skipDelayS = value;
  }

  /**
   * @param {string} value 
   * @returns {void}
   */
  setSkipCancelKey(value) {
    this.#object.skipCancelKey = value;
  }
}