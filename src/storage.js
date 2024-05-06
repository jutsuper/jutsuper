/// <reference types="chrome/index.d.ts" />
/// <reference types="firefox-webext-browser/index.d.ts" />


import { JutSuperTransition } from "/src/transition.js";
import { JutSuperSettings } from "/src/settings.js";
export {
  JutSuperStorage,
  JutSuperStorageKeys
};


/**
 * @typedef {import("/src/transition.js").JutSuperTransitionObject} JutSuperTransitionObject
 * @typedef {import("/src/transition.js").JutSuperTransitionObjectKeys} JutSuperTransitionObjectKeys
 * @typedef {import("/src/settings.js").JutSuperSettingsObject} JutSuperSettingsObject
 * @typedef {import("/src/settings.js").JutSuperSettingsObjectKeys} JutSuperSettingsObjectKeys
 * @typedef {import("/src/settings.js").JutSuperSettingsOpeningsObjectKeys} JutSuperSettingsOpeningsObjectKeys
 * @typedef {import("/src/settings.js").JutSuperSettingsEndingsObjectKeys} JutSuperSettingsEndingsObjectKeys
 */


/**
 * # Keys of a persistent extension storage
 * 
 * @readonly
 * @enum {typeof JutSuperStorageKeys}
 */
const JutSuperStorageKeys = {
  /** @type {"transition"} */
  transition: "transition",
  /** @type {"settings"} */
  settings: "settings"
}
/**
 * @typedef {(
 *   typeof JutSuperStorageKeys[keyof typeof JutSuperStorageKeys]
 * )} JutSuperStorageKeysKeys
 * 
 * @typedef JutSuperStorageKeysTypes
 * @property {JutSuperTransitionObject} [transition]
 * @property {JutSuperSettingsObject} [settings]
 */


var storageKeys = JutSuperStorageKeys;


class JutSuperStorage {
  /** @type {chrome.storage.local | browser.storage.local} */
  #storage;

  /**
   * @param {chrome.storage.local | browser.storage.local} storage 
   */
  constructor(storage) {
    this.#storage = storage;
  }

  ////////////////
  // transition //
  ////////////////

  /**
   * # Get `transition` object from storage
   * 
   * @returns {Promise<JutSuperTransitionObject>}
   */
  async getTransition() {
    return (await this.#storage.get(storageKeys.transition))[storageKeys.transition];
  }
  /**
   * # Set `transition` object in storage
   * 
   * @param {JutSuperTransitionObject} value 
   */
  async setTransition(value) {
    const map = {};
    map[storageKeys.transition] = value;
    await this.#storage.set(map);
  }
  /**
   * # Set default `transition` object in storage
   * 
   * @returns {Promise<JutSuperTransitionObject>}
   */
  async setDefaultTransition() {
    const transition = new JutSuperTransition().setDefaults().get();
    const map = {};
    map[storageKeys.transition] = transition;
    await this.#storage.set(map);
    return transition;
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
   * 
   * @returns {Promise<JutSuperSettingsObject>}
   */
  async getSettings() {
    return (await this.#storage.get(storageKeys.settings))[storageKeys.settings];
  }
  /**
   * # Set `settings` object in storage
   * 
   * @param {JutSuperSettingsObject} value 
   */
  async setSettings(value) {
    const map = {};
    map[storageKeys.settings] = value;
    await this.#storage.set(map);
  }
  /**
   * # Set default `settings` object in storage
   * 
   * @returns {Promise<JutSuperSettingsObject>}
   */
  async setDefaultSettings() {
    const settings = new JutSuperSettings().setDefaults().get();
    const map = {};
    map[storageKeys.settings] = settings;
    await this.#storage.set(map);
    return settings;
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
   * 
   * @returns {Promise<JutSuperStorageKeysTypes>}
   */
  async getAll() {
    return await this.#storage.get();
  }
  /**
   * # Set all keys in storage
   * 
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
}
