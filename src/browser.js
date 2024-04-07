export { BrowserWindowStates };


/**
 * @typedef BrowserSharingStateDescriptor
 * @property {boolean} camera
 * @property {boolean} microphone
 * @property {unknown} screen
 *
 * @typedef BrowserMutedDescriptor
 * @property {boolean} muted
 *
 * @typedef BrowserTabDescriptor
 * @property {boolean} active
 * @property {boolean} attention
 * @property {boolean} audible
 * @property {boolean} autoDiscardable
 * @property {string} cookieStoreId
 * @property {boolean} discarded
 * @property {string} favIconUrl
 * @property {number} height
 * @property {boolean} hidden
 * @property {boolean} highlighted
 * @property {number} id
 * @property {boolean} incognito
 * @property {number} index
 * @property {boolean} isArticle
 * @property {boolean} isInReaderMode
 * @property {number} lastAccessed
 * @property {BrowserMutedDescriptor} mutedInfo
 * @property {boolean} pinned
 * @property {BrowserSharingStateDescriptor} sharingState
 * @property {string} status
 * @property {number} successorTabId
 * @property {string} title
 * @property {string} url
 * @property {number} width
 * @property {number} windowId
 *
 * @typedef BrowserMessageSenderDescriptor
 * @property {number} contextId
 * @property {string} envType
 * @property {number} frameId
 * @property {string} id
 * @property {BrowserTabDescriptor} tab
 * @property {string} url
 * 
 * @typedef BrowserWindowDescriptor
 * @property {boolean} alwaysOnTop
 * @property {boolean} focused
 * @property {number} height
 * @property {number} id
 * @property {boolean} incognito
 * @property {number} left
 * @property {BrowserWindowStatesKeys} state
 * @property {string} title
 * @property {number} top
 * @property {string} type
 * @property {number} width
 * 
 * @typedef BrowserStorage
 * @property {function(Record<string, any> | string=): Promise<Record<string, any>>} get
 * @property {function(Record<string, any> | string=): Promise<void>} set
 * @property {function(Record<string, any> | string=): Promise<void>} remove
 * @property {function(): Promise<void>} clear
 */


/**
 * # Describes possible browser window states
 * @readonly
 * @enum {BrowserWindowStatesType}
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
  /** @type {"docked"} */
  docked: "docked"
}
/**
 * @typedef BrowserWindowStatesType
 * @property {"normal"} normal
 * @property {"minimized"} minimized
 * @property {"maximized"} maximized
 * @property {"fullscreen"} fullscreen
 * @property {"docked"} docked
 * 
 * @typedef {(
 *   "normal" |
 *   "minimized" |
 *   "maximized" |
 *   "fullscreen" |
 *   "docked"
 * )} BrowserWindowStatesKeys
 */