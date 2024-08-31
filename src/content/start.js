// #if "@BROWSER" == "blink"
var browser = chrome;
// #endif

import(browser.runtime.getURL("/src/content/content.js"));
