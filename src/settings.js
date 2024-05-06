import { jsuperUtil } from "/src/util.js";
export {
  JutSuperSettings,
  JutSuperSettingsEndingsObjectKeys,
  JutSuperSettingsOpeningsObjectKeys,
  JutSuperSettingsObjectKeys,
  JutSuperSettingsSkipOrder
};


/**
 * @typedef {import("/src/types/settings.d.ts").JutSuperSettingsObject} JutSuperSettingsObject
 * @typedef {import("/src/types/settings.d.ts").JutSuperSettingsObjectPartial} JutSuperSettingsObjectPartial
 */


/**
 * @readonly
 * @enum {typeof JutSuperSettingsEndingsObjectKeys}
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
 * @typedef {(
 *   typeof JutSuperSettingsEndingsObjectKeys[keyof typeof JutSuperSettingsEndingsObjectKeys]
 * )} JutSuperSettingsEndingsObjectKeysKeys
 */

/**
 * @readonly
 * @enum {typeof JutSuperSettingsOpeningsObjectKeys}
 */
const JutSuperSettingsOpeningsObjectKeys = {
  /** @type {"doSkip"} */
  doSkip: "doSkip",
  /** @type {"skipOrder"} */
  skipOrder: "skipOrder"
}
/**
 * @typedef {(
 *   typeof JutSuperSettingsOpeningsObjectKeys[keyof typeof JutSuperSettingsOpeningsObjectKeys]
 * )} JutSuperSettingsOpeningsObjectKeysKeys
 */


/**
 * @readonly
 * @enum {typeof JutSuperSettingsObjectKeys}
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
 * @typedef {(
 *   typeof JutSuperSettingsObjectKeys[keyof typeof JutSuperSettingsObjectKeys]
 * )} JutSuperSettingsObjectKeysKeys
 */


/**
 * @readonly
 * @enum {typeof JutSuperSettingsSkipOrder}
 */
const JutSuperSettingsSkipOrder = {
  /** @type {"anyOccurrence"} */
  anyOccurrence: "anyOccurrence",
  /** @type {"firstOccurrence"} */
  firstOccurrence: "firstOccurrence",
  /** @type {"lastOccurrence"} */
  lastOccurrence: "lastOccurrence"
}
/**
 * @typedef {(
 *   typeof JutSuperSettingsSkipOrder[keyof typeof JutSuperSettingsSkipOrder]
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
        skipOrder: JutSuperSettingsSkipOrder.anyOccurrence
      },
      endings: {
        doSkip: true,
        skipOrder: JutSuperSettingsSkipOrder.anyOccurrence,
        doPersistFullscreen: true,
        maxSkips: 0
      },
      skipDelayS: 3,
      skipCancelKey: "Shift",
      achievementSoundEnabled: true
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
      skipCancelKey: undefined,
      achievementSoundEnabled: undefined
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

  /**
   * @param {JutSuperSettingsObjectPartial} obj
   * @returns {void}
   */
  mergeWith(obj) {
    jsuperUtil.objectMergeDeep(this.#object, obj);
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
  setSkipDelayS(value) {
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