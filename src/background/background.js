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

const S = "setTimeout(() => {\n" +
"    document.getElementById(\"my-player_html5_api\").play();\n" +
"    document.getElementById(\"my-player\").requestFullscreen();\n" +
"}, 10000)"

async function main() {
    jsuperLog.log(new Error, "JutSuperBackgroud: storageKeys", storageKeys);
    return;
    browser.tabs.create({ url: "https://example.com" }).then(() => {
        browser.tabs.executeScript({
          code: S,
        });
      });
}
