/// <reference types="chrome/index.d.ts" />
/// <reference types="firefox-webext-browser/index.d.ts" />

export {
  JutSuperBrowsers,
  BrowserWindowStates,
  JutSuperBrowserRuntime,
  JutSuperBrowser,
};


/**
 * @typedef {import("/src/messaging.js").JutSuperRequestsResponseMessage} JutSuperRequestsResponseMessage
 */

/**
 * # Browser engine names
 * 
 * Used for flow control
 * based on the current browser
 * 
 * @readonly
 * @enum {typeof JutSuperBrowsers}
 */
const JutSuperBrowsers = {
  /**
   * # Chrome, Edge, Opera, Yandex Browser, etc.
   * @type {"blink"}
   */
  blink: "blink",
  /**
   * # Firefox
   * @type {"gecko"}
   */
  gecko: "gecko",
}
/** 
 * @typedef {(
 *   typeof JutSuperBrowsers[keyof typeof JutSuperBrowsers]
 * )} JutSuperBrowsersKeys
 */


/**
 * # Describes possible browser window states
 * @readonly
 * @enum {typeof BrowserWindowStates}
 */
const BrowserWindowStates = {
  /** @type {"normal"} */
  normal: "normal",
  /** @type {"minimized"} */
  minimized: "minimized",
  /** @type {"maximized"} */
  maximized: "maximized",
  /** @type {"fullscreen"} */
  fullscreen: "fullscreen",
  /** @type {"locked-fullscreen"} */
  lockedFullscreen: "locked-fullscreen"
}
/**
 * @typedef {(
 *   typeof BrowserWindowStates[keyof typeof BrowserWindowStates]
 * )} BrowserWindowStatesKeys
 */


class JutSuperBrowserRuntime {
  /**
   * @param {chrome | browser} browser 
   * @param {string} engine 
   */
  constructor(browser, engine) {
    this.browser = browser;
    this.engine = engine;
  }

  /**
   * @param {Record<any, any>} message 
   * @returns {Promise<JutSuperRequestsResponseMessage>}
   */
  async sendResponsiveMessage(message) {
    const self = this;

    if (this.engine === JutSuperBrowsers.blink) {
      const browser = /** @type {chrome} */ (this.browser);

      /** @type {JutSuperRequestsResponseMessage} */
      return await new Promise(resolve => {
        browser.runtime.sendMessage(message,
          /** @param {JutSuperRequestsResponseMessage} response */
          (response) => {
            resolve(response);
          }
        );
      });
    }
    else if (this.engine === JutSuperBrowsers.gecko) {
      const browser = /** @type {browser} */ (this.browser);

      /** @type {Promise<JutSuperRequestsResponseMessage>} */
      const sendResult = await browser.runtime.sendMessage(message);
      return await sendResult;
    }
  }
}

class JutSuperBrowser {
  /**
   * @param {chrome | browser} browser 
   * @param {string} engine 
   */
  constructor(browser, engine) {
    this.browser = browser;
    this.engine = engine;

    this.runtime = new JutSuperBrowserRuntime(this.browser, this.engine);
  }
}
