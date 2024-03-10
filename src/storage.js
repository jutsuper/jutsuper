export { JutSuperStorage, jsuperStorage };
import {
  JutSuperStorageKeys as storageKeys,
  JutSuperStorageTransitionKeys as transitionKeys,
  JutSuperStorageSettingsKeys as settingsKeys
} from "/src/consts.js";


/**
 * @typedef {import("/src/consts.js").JutSuperStorageKeysKeys} JutSuperStorageKeysKeys
 * @typedef {import("/src/consts.js").JutSuperStorageKeysTypes} JutSuperStorageKeysTypes
 * @typedef {import("/src/consts.js").JutSuperStorageTransitionKeysKeys} JutSuperStorageTransitionKeysKeys
 * @typedef {import("/src/consts.js").JutSuperStorageTransitionKeysTypes} JutSuperStorageTransitionKeysTypes
 * @typedef {import("/src/consts.js").JutSuperStorageSettingsKeysKeys} JutSuperStorageSettingsKeysKeys
 * @typedef {import("/src/consts.js").JutSuperStorageSettingsKeysTypes} JutSuperStorageSettingsKeysTypes
 */


class JutSuperStorage {
  /** @type {unknown} */
  #storage;

  constructor() {
    this.#storage = browser.storage.local;
  }

  ////////////////
  // transition //
  ////////////////

  /**
   * # Get `transition` object from storage
   * @returns {Promise<JutSuperStorageTransitionKeysTypes>}
   */
  async getTransition() {
    return (await this.#storage.get(storageKeys.transition))[storageKeys.transition];
  }
  /**
   * # Set `transition` object in storage
   * @param {JutSuperStorageTransitionKeysTypes} value 
   */
  async setTransition(value) {
    const map = {};
    map[storageKeys.transition] = value;
    await this.#storage.set(map);
  }
  /**
   * # Remove `transition` object from storage
   */
  async removeTransition() {
    await this.#storage.remove(storageKeys.transition);
  }

  //////////////
  // settings //
  //////////////

  /**
   * # Get `settings` object from storage
   * @returns {Promise<JutSuperStorageSettingsKeysTypes>}
   */
  async getSettings() {
    return (await this.#storage.get(storageKeys.settings))[storageKeys.settings];
  }
  /**
   * # Set `settings` object in storage
   * @param {JutSuperStorageSettingsKeysTypes} value 
   */
  async setSettings(value) {
    const map = {};
    map[storageKeys.settings] = value;
    await this.#storage.set(map);
  }
  /**
   * # Remove `settings` object from storage
   */
  async removeSettings() {
    await this.#storage.remove(storageKeys.settings);
  }

  /////////
  // all //
  /////////

  /**
   * # Get all keys from storage
   * @returns {Promise<JutSuperStorageKeysTypes>}
   */
  async getAll() {
    return await this.#storage.get();
  }
  /**
   * # Set all keys in storage
   * @param {JutSuperStorageKeysTypes} value 
   */
  async setAll(value) {
    await this.#storage.set(value);
  }
  /**
   * # Remove all keys from storage
   */
  async removeAll() {
    await this.#storage.clear();
  }

  /////////////////////////////
  // transition.isFullscreen //
  /////////////////////////////

  /**
   * @returns {Promise<boolean>}
   */
  async getIsFullscreen() {
    const transition = await this.getTransition();
    return transition[transitionKeys.isFullscreen];
  }
  /**
   * @param {boolean} value 
   */
  async setIsFullscreen(value) {
    const transition = await this.getTransition();
    transition[transitionKeys.isFullscreen] = value;
    return this.setTransition(transition);
  }

  ///////////////////////////////////
  // transition.isSwitchingEpisode //
  ///////////////////////////////////

  /**
   * @returns {Promise<boolean>}
   */
  async getIsSwitchingEpisode() {
    const transition = await this.getTransition();
    return transition[transitionKeys.isSwitchingEpisode];
  }
  /**
   * @param {boolean} value 
   */
  async setIsSwitchingEpisode(value) {
    const transition = await this.getTransition();
    transition[transitionKeys.isSwitchingEpisode] = value;
    return this.setTransition(transition);
  }

  ///////////////////////////////////////////////
  // settingsKeys.maxContinuousEpisodeSwitches //
  ///////////////////////////////////////////////

  /**
   * @returns {Promise<number>}
   */
  async getMaxContinuousEpisodeSwitches() {
    const settings = await this.getSettings();
    return settings[settingsKeys.maxContinuousEpisodeSwitches];
  }
  /**
   * @param {number} value 
   */
  async setMaxContinuousEpisodeSwitches(value) {
    const settings = await this.getSettings();
    settings[settingsKeys.maxContinuousEpisodeSwitches] = value;
    return this.setSettings(settings);
  }
}

const jsuperStorage = new JutSuperStorage();
