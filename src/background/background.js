// #if "@BROWSER" == "chrome"
var BROWSER = "chrome";
var browser = chrome;
// #elif "@BROWSER" == "firefox"
var BROWSER = "firefox";
// #else
// #error
// #endif

// #if "@MANIFEST" == "3"
import {
  JutSuperBrowsers as browsers,
  JutSuperStorageKeys as storageKeys
} from "/src/consts.js";
import {jsuperLog } from "/src/log.js";
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


/** @type {JutSuperBackground} */
var jutsuperBackground;


class JutSuperBackground {
  constructor() {
    const thisArg = this;
    this.LOCATION = JutSuperBackground.name;

    browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      thisArg.messageCallback(request, sender, sendResponse)
    });
  }

  messageCallback(request, sender, sendResponse) {
    console.log("request", request);
    console.log("sender", sender);
    console.log("sendResponse", sendResponse);

    const req = request["request"];

    if (req && ["fullscreenOn", "fullscreenOff"].contains(req)) {
      if (req === "fullscreenOn") {
        this.handleFullscreenRequest(true)
      }
      else if (req === "fullscreenOff") {
        this.handleFullscreenRequest(false)
      }
    }
  }

  async handleFullscreenRequest(state) {
    const windows = await browser.windows.getAll();
    console.log("windows=", windows);
    if (state === true) {
      browser.windows.update(windows[0].id, {state: "fullscreen"});
    }
    else if (state === false) {
      browser.windows.update(windows[0].id, {state: undefined});
    }
    
  }
}

// #if "@MANIFEST" == "3"
jutsuperBackground = new JutSuperBackground();
// #endif