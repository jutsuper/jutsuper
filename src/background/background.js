// #if "@BROWSER" == "blink"
var BROWSER = "blink";
var browser = chrome;
// #elif "@BROWSER" == "gecko"
var BROWSER = "gecko";
// #else
// #error
// #endif

// #if "@MANIFEST" == "3"
import {
  JutSuperBrowsers as browsers,
  JutSuperStorageKeys as storageKeys
} from "/src/consts.js";
import { jsuperLog } from "/src/log.js";
// #elif "@MANIFEST" == "2"
/**
 * @typedef {import("/src/consts.js").JutSuperBrowsers} JutSuperBrowsers
 * @type {JutSuperBrowsers}
 */
var browsers;

/**
 * @typedef {import("/src/log.js").JutSuperLog} JutSuperLog
 * @type {JutSuperLog}
 */
var jsuperLog;

/**
 * @typedef {import("/src/consts.js").JutSuperStorageKeys} JutSuperStorageKeys
 * @type {JutSuperStorageKeys}
 */
var storageKeys;


/** Import modules */
(async function() {
  /** @type {typeof import("/src/log.js")} */
  const logModule = await import(browser.runtime.getURL("/src/log.js"))
  /** @type {typeof import("/src/consts.js")} */
  const constsModule = await import(browser.runtime.getURL("/src/consts.js"))

  browsers = constsModule.JutSuperBrowsers;
  jsuperLog = logModule.jsuperLog;
  storageKeys = constsModule.JutSuperStorageKeys;
})().then(() => {
  jutsuperBackground = new JutSuperBackground();
})
// #else
// #error
// #endif


/**
 * @typedef {import("/src/messaging.js").JutSuperActionsMessage} JutSuperActionsMessage
 * @typedef {import("/src/messaging.js").JutSuperMessage} JutSuperMessage
 * @typedef {import("/src/browser.js").BrowserMessageSenderDescriptor} BrowserMessageSenderDescriptor
 */


/** @type {JutSuperBackground} */
var jutsuperBackground;

console.log(this);

class JutSuperBackground {
  constructor() {
    const thisArg = this;
    this.LOCATION = JutSuperBackground.name;

    this.prevWindowState = undefined;

    browser.runtime.onMessage.addListener(
      /**
       * @param {JutSuperMessage} request 
       * @param {BrowserMessageSenderDescriptor} sender 
       * @param {function(unknown): any} sendResponse 
       */
      function(request, sender, sendResponse) {
        thisArg.messageCallback(request, sender, sendResponse)
      }
    );
  }

  /**
   * 
   * @param {JutSuperMessage} request 
   * @param {BrowserMessageSenderDescriptor} sender 
   * @param {function(unknown): any} sendResponse 
   */
  messageCallback(request, sender, sendResponse) {
    if (request.actions) {
      this.handleActions(request.actions, sender, sendResponse);
    }
  }

  /**
   * @param {JutSuperActionsMessage} actions
   * @param {BrowserMessageSenderDescriptor} sender 
   * @param {function(unknown): any} sendResponse 
   */
  async handleActions(actions, sender, sendResponse) {
    if (actions.fullscreenState !== undefined) {
      await this.handleFullscreenRequest(
        actions.fullscreenState,
        sender,
        sendResponse
      )
    }
  }

  /**
   * @param {boolean} state
   * @param {BrowserMessageSenderDescriptor} sender 
   * @param {function(unknown): any} sendResponse 
   */
  async handleFullscreenRequest(state, sender, sendResponse) {
    const window = await browser.windows.get(sender.tab.windowId);

    switch (state) {
      case true:
        if (this.prevWindowState === undefined) {
          this.prevWindowState = window.state;
        }
        browser.windows.update(window.id, { state: "fullscreen" });
        break;
      case false:
        if (this.prevWindowState) {
          browser.windows.update(window.id, { state: this.prevWindowState });
          this.prevWindowState = undefined;
        } else {
          browser.windows.update(window.id, { state: "maximized" });
        }
        break;
    }
  }
}

// #if "@MANIFEST" == "3"
jutsuperBackground = new JutSuperBackground();
// #endif