// #if "@BROWSER" == "blink"
var BROWSER = "blink";
var browser = chrome;
// #elif "@BROWSER" == "gecko"
var BROWSER = "gecko";
// #else
// #error
// #endif

// #if "@MANIFEST" == "3"
import { JutSuperRequestsResponseMessageBuilder } from "/src/messaging.js";
// #elif "@MANIFEST" == "2"
/**
 * @typedef {import("/src/messaging.js").JutSuperRequestsResponseMessageBuilder} JutSuperRequestsResponseMessageBuilder
 * @type {typeof import("/src/messaging.js").JutSuperRequestsResponseMessageBuilder}
 */
var JutSuperRequestsResponseMessageBuilder;


/** Import modules */
(async function() {
  /** @type {typeof import("/src/messaging.js")} */
  const messagingModule = await import(browser.runtime.getURL("/src/messaging.js"))

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
 * @typedef {import("/src/browser.js").BrowserMessageSenderDescriptor} BrowserMessageSenderDescriptor
 * @typedef {import("/src/browser.js").BrowserWindowDescriptor} BrowserWindowDescriptor
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
       * @param {JutSuperMessage} message 
       * @param {BrowserMessageSenderDescriptor} sender 
       * @param {function(any): any} sendResponse 
       */
      function(message, sender, sendResponse) {
        (async () => {
          const resp = await thisArg.messageCallback(message, sender);
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
   * @param {BrowserMessageSenderDescriptor} sender 
   * @returns {Promise<JutSuperRequestsResponseMessage> | Promise<void>}
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
   * @param {BrowserMessageSenderDescriptor} sender 
   * @returns {Promise<void>}
   */
  async handleActions(actions, sender) {
    if (actions.fullscreenState !== undefined) {
      await this.handleFullscreenRequest(
        actions.fullscreenState,
        sender
      )
    }
  }

  /**
   * @param {boolean} state
   * @param {BrowserMessageSenderDescriptor} sender
   * @returns {Promise<void>}
   */
  async handleFullscreenRequest(state, sender) {
    /** @type {BrowserWindowDescriptor} */
    const window = await browser.windows.get(sender.tab.windowId);

    console.log(window);

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

  /**
   * @param {JutSuperRequestsRequestMessage} requests
   * @param {BrowserMessageSenderDescriptor} sender 
   * @returns {Promise<JutSuperRequestsResponseMessage> | Promise<void>}
   */
  async handleRequests(requests, sender) {
    if (requests.getWindowState) {
      /** @type {BrowserWindowDescriptor} */
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