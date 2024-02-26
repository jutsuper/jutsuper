// #if "MANIFEST_VER" == "3"
import { JutSuperStorageKeys as storageKeys } from "/src/consts.js";
import { jsuperLog } from "/src/log.js";
// #elif "MANIFEST_VER" == "2"
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

    jsuperLog = logModule.jsuperLog;
    storageKeys = constsModule.JutSuperStorageKeys;
})().then(() => {
    main();
})
// #else
// #error
// #endif


if (browser === undefined) {
  var browser = chrome
}


const S = "setTimeout(() => {\n" +
"    document.getElementById(\"my-player_html5_api\").play();\n" +
"    document.getElementById(\"my-player\").requestFullscreen();\n" +
"}, 10000)"

function onError(error) {
  console.log(`Error: ${error}`);
}

function updateWindow(window) {
  browser.windows.update(window.id, {state: "fullscreen"});
}

async function main() {
    jsuperLog.log(new Error, "JutSuperBackgroud: storageKeys", storageKeys);

    const tabs = await browser.tabs.query({ url: "https://*.jut.su/*" });
    console.log(tabs);

    browser.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
      console.log("TAB onRemoved, id:", tabId);
      console.log("TAB onRemoved, removeInfo:", removeInfo);
      //await chrome.scripting.executeScript({
      //  target: { tabId: tab.id, allFrames: true },
      //  files: ["content.js"],
      //});
      // Do other stuff...
    });

    browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
      console.log("TAB onUpdated, id:", tabId);
      console.log("TAB onUpdated, changeInfo:", changeInfo);
      console.log("TAB onUpdated, tab:", tab);
      //await chrome.scripting.executeScript({
      //  target: { tabId: tab.id, allFrames: true },
      //  files: ["content.js"],
      //});
      // Do other stuff...
    });
    

    browser.windows.getAll().then((windowInfoArray) => {
      for (const currentWindow of windowInfoArray) {
          //updateWindow(currentWindow)
      }
    }, onError);

    return;
  
    browser.tabs.create({ url: "https://example.com" }).then(() => {
        browser.tabs.executeScript({
          code: S,
        });
      });
}

main();