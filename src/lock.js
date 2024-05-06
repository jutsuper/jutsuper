import { jsuperLog } from "/src/log.js";
import { jsuperUtil } from "/src/util.js";
export { AsyncLock };


/**
 * @typedef {import("/src/types/lock.d.ts").AsyncLockOptions} AsyncLockOptions
 */


/**
 * # Message awaiter
 * 
 * @template T
 */
class AsyncLock {
  /**
   * @param {AsyncLockOptions} [params] 
   */
  constructor(params) {
    this.LOCATION = AsyncLock.name;

    this.id = jsuperUtil.getRandomInt(0, 4_294_967_295);

    this.ID_LOCATION = `${this.LOCATION} (id=${this.id})`

    if (params === undefined) {
      this.params = this.#defaultParams();
    }
    else {
      this.params = jsuperUtil.objectMergeDeep(this.#defaultParams(), params);
    }

    this.promise = undefined;
    this.resolve = undefined;
    this.#renewPromise();
  }

  /**
   * @returns {AsyncLockOptions}
   */
  #defaultParams() {
    return { oneTime: false };
  }

  #renewPromise() {
    /** @type {function(T): void} */
    let resolve = undefined;
    /** @type {Promise<T>} */
    const promise = new Promise(res => resolve = data => {
      res(data);
      if (!this.params.oneTime) {
        this.#renewPromise();
      }
    });

    this.resolve = resolve;
    this.promise = promise;

    //jsuperLog.debug(`${this.ID_LOCATION}: promise renewed`);
  }
}
