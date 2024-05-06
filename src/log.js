import {
  JutSuperLogLevels as levels,
  JutSuperLogDefaults as defaults
} from "/src/consts.js";
export { JutSuperLog, jsuperLog as jsuperLog };


/**
 * @typedef {import("/src/consts.js").JutSuperLogLevelsKeys} JutSuperLogLevelsKeys
 */

class JutSuperLog {
  constructor() {
    this.enabled = defaults.enabled;
    this.console = console;
  }

  /**
   * @param {...any} data 
   * @returns {void}
   */
  error(...data) {
    this.#log(levels.error, console.error, ...data);
  }

  /**
   * @param {...any} data 
   * @returns {void}
   */
  warn(...data) {
    this.#log(levels.warn, console.warn, ...data);
  }

  /**
   * @param {...any} data 
   * @returns {void}
   */
  log(...data) {
    this.#log(levels.log, console.log, ...data);
  }

  /**
   * @param {...any} data 
   * @returns {void}
   */
  info(...data) {
    this.#log(levels.info, console.info, ...data);
  }

  /**
   * @param {...any} data 
   * @returns {void}
   */
  debug(...data) {
    this.#log(levels.debug, console.debug, ...data);
  }

  /**
   * @param {JutSuperLogLevelsKeys} level 
   * @param {function(...any): void} fn 
   * @param  {...any} data 
   */
  #log(level, fn, ...data) {
    if (!this.enabled) { return; }
    if (!defaults.levels.includes(level)) { return; }
    fn("J▶", ...data);
  }
}

const jsuperLog = new JutSuperLog();
