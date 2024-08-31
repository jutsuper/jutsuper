import { AsyncLock } from "/src/lock.js";
export { AsyncSleep, AsyncSleepReason };


/**
 * @typedef {import("/src/types/sleep.d.ts").AsyncSleepResult} AsyncSleepResult
 */


/**
 * @readonly
 * @enum {typeof AsyncSleepReason}
 */
const AsyncSleepReason = {
  /** @type {"timeout"} */
  timeout: "timeout",
  /** @type {"cancelled"} */
  cancelled: "cancelled"
}
/**
 * @typedef {(
 *   typeof AsyncSleepReason[keyof typeof AsyncSleepReason]
 * )} AsyncSleepReasonKeys
 */


class AsyncSleep {
  #lock;

  constructor() {
    this.LOCATION = AsyncSleep.name;

    this.#lock = /** @type {AsyncLock<AsyncSleepResult>} */ (new AsyncLock());
    this.timeoutId = undefined;
  }

  /**
   * @param {number} ms 
   */
  start(ms) {
    /** @type {AsyncSleepResult} */
    let callback = {
      reason: AsyncSleepReason.timeout,
      data: undefined
    };

    this.timeoutId = setTimeout(
      () => this.#lock.resolve(callback),
      ms
    );
  }

  /**
   * @param {number} ms 
   */
  reset(ms) {
    clearTimeout(this.timeoutId);
    this.start(ms);
  }

  /**
   * @param {any} [data] 
   */
  cancel(data) {
    /** @type {AsyncSleepResult} */
    let callback = {
      reason: AsyncSleepReason.cancelled,
      data: data
    };
  
    clearTimeout(this.timeoutId);
    this.#lock.resolve(callback);
  }

  /**
   * @returns {Promise<AsyncSleepResult>}
   */
  promise() {
    return this.#lock.promise;
  }
}