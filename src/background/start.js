// #if "@BROWSER" == "blink"
import { } from "/src/background/background.js";
// #elif "@BROWSER" == "gecko"
import(browser.runtime.getURL("/src/background/background.js"));
// #else
// #error
// #endif
