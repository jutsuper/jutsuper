/// <reference types="video.js/index.d.ts" />

// #if "@BROWSER" == "blink"
var BROWSER = "blink";
var browser = chrome;
// #elif "@BROWSER" == "gecko"
var BROWSER = "gecko";
// #else
// #error
// #endif

// #if "@MANIFEST" == "3"
// @ts-ignore
import { JutSuperBrowsers as browsers } from "/src/browser.js";
// @ts-ignore
import { BrowserWindowStates as windowStates } from "/src/browser.js";
// @ts-ignore
import { JutSuperRequestsResponseMessageBuilder } from "/src/messaging.js";
// #elif "@MANIFEST" == "2"
/**
 * @typedef {import("/src/browser.js").JutSuperBrowsers} JutSuperBrowsers
 * @type {typeof import("/src/browser.js").JutSuperBrowsers}
 */
var browsers;

/**
 * @typedef {import("/src/browser.js").BrowserWindowStates} BrowserWindowStates
 * @type {typeof import("/src/browser.js").BrowserWindowStates}
 */
var windowStates;

/**
 * @typedef {import("/src/messaging.js").JutSuperRequestsResponseMessageBuilder} JutSuperRequestsResponseMessageBuilder
 * @type {typeof import("/src/messaging.js").JutSuperRequestsResponseMessageBuilder}
 */
var JutSuperRequestsResponseMessageBuilder;


/** Import modules */
(async function() {
  /** @type {typeof import("/src/browser.js")} */
  const browserModule = await import(browser.runtime.getURL("/src/browser.js"));
  /** @type {typeof import("/src/messaging.js")} */
  const messagingModule = await import(browser.runtime.getURL("/src/messaging.js"));

  browsers = browserModule.JutSuperBrowsers;
  windowStates = browserModule.BrowserWindowStates;
  JutSuperRequestsResponseMessageBuilder = messagingModule.JutSuperRequestsResponseMessageBuilder;
})().then(() => {
  jutsuperBackground = new JutSuperBackground();
})
// #else
// #error
// #endif


/**
 * @typedef {import("/src/messaging.js").JutSuperActionsMessage} JutSuperActionsMessage
 * @typedef {import("/src/messaging.js").JutSuperRequestsRequestMessage} JutSuperRequestsRequestMessage
 * @typedef {import("/src/messaging.js").JutSuperRequestsResponseMessage} JutSuperRequestsResponseMessage
 * @typedef {import("/src/messaging.js").JutSuperMessage} JutSuperMessage
 * @typedef {import("/src/browser.js").BrowserWindowStatesKeys} BrowserWindowStatesKeys
 */


/** @type {JutSuperBackground} */
var jutsuperBackground;


class JutSuperBackground {
  constructor() {
    const self = this;
    this.LOCATION = JutSuperBackground.name;

    browser.runtime.onMessage.addListener(
      /**
       * @param {JutSuperMessage} message 
       * @returns {boolean}
       */
      function(message, sender, sendResponse) {
        (async () => {
          const resp = await self.messageCallback(message, sender);
          sendResponse(resp);
        })();

        // return `true` to indicate we want to
        // send a response asynchronously
        return true;
      }
    );
  }

  /**
   * 
   * @param {JutSuperMessage} message 
   * @param {chrome.runtime.MessageSender | browser.runtime.MessageSender} sender 
   * @returns {Promise<JutSuperRequestsResponseMessage | void>}
   */
  async messageCallback(message, sender) {
    if (message.actions) {
      this.handleActions(message.actions, sender);
    }
    if (message.requests) {
      return await this.handleRequests(message.requests, sender);
    }
  }

  /**
   * @param {JutSuperActionsMessage} actions
   * @param {chrome.runtime.MessageSender | browser.runtime.MessageSender} sender 
   * @returns {Promise<void>}
   */
  async handleActions(actions, sender) {
    if (actions.fullscreenState !== undefined) {
      await this.handleFullscreenRequest(
        actions.fullscreenState,
        actions.originalWindowState,
        sender
      )
    }
  }

  /**
   * @param {boolean} state
   * @param {BrowserWindowStatesKeys} originalState
   * @param {chrome.runtime.MessageSender | browser.runtime.MessageSender} sender
   * @returns {Promise<void>}
   */
  async handleFullscreenRequest(state, originalState, sender) {
    /** @type {chrome.windows.Window | browser.windows.Window} */
    const window = await browser.windows.get(sender.tab.windowId);

    switch (state) {
      case true:
        browser.windows.update(window.id, {
          state: windowStates.fullscreen
        });
        break;
      case false:
        if (originalState) {
          browser.windows.update(window.id, {
            state: originalState
          });
        } else {
          browser.windows.update(window.id, {
            state: windowStates.maximized
          });
        }
        break;
    }
  }

  /**
   * @param {JutSuperRequestsRequestMessage} requests
   * @param {chrome.runtime.MessageSender | browser.runtime.MessageSender} sender 
   * @returns {Promise<JutSuperRequestsResponseMessage | void>}
   */
  async handleRequests(requests, sender) {
    if (requests.getWindowState) {
      /** @type {chrome.windows.Window | browser.windows.Window} */
      const window = await browser.windows.get(sender.tab.windowId);
      return (new JutSuperRequestsResponseMessageBuilder())
        .windowState(window.state)
        .build();
    }
  }
}

// #if "@MANIFEST" == "3"
jutsuperBackground = new JutSuperBackground();
// #endif