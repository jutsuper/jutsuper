import {
  JutSuperLogLevels as levels,
  JutSuperLogDefaults as defaults
} from "/src/consts.js";
export { JutSuperLog, jsuperLog as jsuperLog };


class JutSuperLog {
  constructor() {
    this.enabled = defaults.enabled;
    this.console = console;
  }

  /**
   * @param {Error} loc 
   * @param {...any} data 
   * @returns {void}
   */
  error(loc, ...data) {
    if (!this.enabled) { return; }
    if (!defaults.levels.includes(levels.error)) { return; }
    this.console.error(...data)
    if (defaults.locationLevels.includes(levels.error)) {
      this.#logLocation(loc, this.console.error);
    }
  }

  /**
   * @param {Error} loc
   * @param {...any} data 
   * @returns {void}
   */
  warn(loc, ...data) {
    if (!this.enabled) { return; }
    if (!defaults.levels.includes(levels.warn)) { return; }
    this.console.warn(...data)
    if (defaults.locationLevels.includes(levels.warn)) {
      this.#logLocation(loc, this.console.warn);
    }
  }

  /**
   * @param {Error} loc
   * @param {...any} data 
   * @returns {void}
   */
  log(loc, ...data) {
    if (!this.enabled) { return; }
    if (!defaults.levels.includes(levels.log)) { return; }
    this.console.log(...data)
    if (defaults.locationLevels.includes(levels.log)) {
      this.#logLocation(loc, this.console.log);
    }
  }

  /**
   * @param {Error} loc
   * @param {...any} data 
   * @returns {void}
   */
  info(loc, ...data) {
    if (!this.enabled) { return; }
    if (!defaults.levels.includes(levels.info)) { return; }
    this.console.info(...data)
    if (defaults.locationLevels.includes(levels.info)) {
      this.#logLocation(loc, this.console.info);
    }
  }

  /**
   * @param {Error} loc
   * @param {...any} data 
   * @returns {void}
   */
  debug(loc, ...data) {
    if (!this.enabled) { return; }
    if (!defaults.levels.includes(levels.debug)) { return; }
    this.console.debug(...data);
    if (defaults.locationLevels.includes(levels.debug)) {
      this.#logLocation(loc, this.console.debug);
    }
  }

  /**
   * @param {Error} loc
   * @param {function(...any)} logger
   * @returns {void}
   */
  #logLocation(loc, logger) {
    return logger(
      `%c^ (${loc.fileName}:${loc.lineNumber})`,
      "color:gray"
    )
  }
}

const jsuperLog = new JutSuperLog();
