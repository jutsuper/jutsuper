/// <reference types="video.js/index.d.ts" />

import { JutSuperBrowsers as browsers } from "/src/browser.js";
import { BrowserWindowStates as windowStates } from "/src/browser.js";
import { JutSuperRequestsResponseMessageBuilder } from "/src/messaging.js";


console.debug("JutSuper: loading /src/background/background.js");


// #if "@BROWSER" == "blink"
var BROWSER = "blink";
var browser = chrome;
// #elif "@BROWSER" == "gecko"
var BROWSER = "gecko";
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


class JutSuperBackground {
  constructor() {
    this.LOCATION = JutSuperBackground.name;
    
    browser.runtime.onMessage.addListener(
      /**
       * @param {JutSuperMessage} message 
       * @returns {boolean}
       */
      (message, sender, sendResponse) => {
        (async () => {
          const resp = await this.messageCallback(message, sender);
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

const jutsuperBackground = new JutSuperBackground();
