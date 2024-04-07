import { JutSuperKeyCodeLabelOverrides as keyLabels } from "/src/consts.js";
export { jsuperUtil };


class JutSuperUtil {
  constructor() {}

  /**
   * @param {number} ms
   * @returns {Promise<void>}
   */
  async asyncSleep(ms) {
    return await new Promise(r => setTimeout(r, ms));
  }

  /**
   * @param {string} rawLabel
   * @returns {string}
   */
  getKeyLabelFromRawLabel(rawLabel) {
    const overrideValue = keyLabels[rawLabel];
    return overrideValue ? overrideValue : rawLabel
  }
}


var jsuperUtil = new JutSuperUtil();
