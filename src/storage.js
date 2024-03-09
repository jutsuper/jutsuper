export { JutSuperStorage, jsuperStorage };
import {
  JutSuperStorageKeys as storageKeys,
  JutSuperStorageTransitionKeys as transitionKeys,
  JutSuperStorageDataKeys as dataKeys,
  JutSuperStorageAllKeys as allKeys
} from "/src/consts.js";


/**
 * @typedef {import("/src/consts.js").JutSuperStorageTransitionKeysKeys} JutSuperStorageTransitionKeysKeys
 * @typedef {import("/src/consts.js").JutSuperStorageDataKeysKeys} JutSuperStorageDataKeysKeys
 * @typedef {import("/src/consts.js").JutSuperStorageAllKeysKeys} JutSuperStorageAllKeysKeys
 * @typedef {import("/src/consts.js").JutSuperStorageAllKeysTypes} JutSuperStorageAllKeysTypes
 */


class JutSuperStorage {
  /** @type {unknown} */
  #storage;

  constructor() {
    this.#storage = browser.storage.local;
  }

  /**
   * @returns {Promise<boolean>}
   */
  async getIsFullscreen() {
    return this.#storage.get(storageKeys.isSwitchingEpisode);
  }
  async setIsFullscreen(value) {
    const map = {}
    map[storageKeys.isFullscreen] = value;
    return this.#storage.set(map);
  }

  /**
   * @returns {Promise<boolean>}
   */
  async getIsSwitchingEpisode() {
    return this.#storage.get(storageKeys.isSwitchingEpisode);
  }
  async setIsSwitchingEpisode(value) {
    const map = {}
    map[storageKeys.isSwitchingEpisode] = value;
    return this.#storage.set(map);
  }

  /**
   * @param {JutSuperStorageAllKeysKeys[]} list
   * @returns {Promise<JutSuperStorageAllKeysTypes>}
   */
  async getKeys(list) {
    return await this.#storage.get(list);
  }

  /**
   * @returns {Promise<JutSuperStorageAllKeysTypes>}
   */
  async getTransitionKeys() {
    return await this.getKeys(transitionKeys);
  }

  /**
   * @returns {Promise<JutSuperStorageAllKeysTypes>}
   */
  async getDataKeys() {
    return await this.getKeys(dataKeys);
  }

  /**
   * @returns {Promise<JutSuperStorageAllKeysTypes>}
   */
  async getAllKeys() {
    return await this.getKeys(allKeys);
  }

  /**
   * @param {JutSuperStorageAllKeysTypes} keys 
   */
  async setKeys(keys) {
    this.#storage.set(keys);
  }

  /**
   * @param {JutSuperStorageAllKeysKeys[]} list
   * @returns {Promise<void>}
   */
  async removeKeys(list) {
    await this.#storage.remove(list);
  }

  /**
   * @returns {Promise<void>}
   */
  async removeTransitionKeys() {
    await this.removeKeys(transitionKeys);
  }

  /**
   * @returns {Promise<void>}
   */
  async removeDataKeys() {
    await this.removeKeys(dataKeys);
  }

  /**
   * @returns {Promise<void>}
   */
  async removeAllKeys() {
    await this.removeKeys(allKeys);
  }
}

const jsuperStorage = new JutSuperStorage();
