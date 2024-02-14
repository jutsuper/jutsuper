import { JutSuperIpc } from "/src/ipc";


class JutSuperContent {
    constructor() {
        this.currentlyFullscreen = false;
        this.ipc = new JutSuperIpc(null, false);
    }

    /**
     * @param {HTMLElement} node
     * @param {Object.<string, string>} attrs 
     * @returns {null}
     */
    static applyAttrs(node, attrs) {
        for (const key in attrs) {
            value = attrs[key];
            node.setAttribute(key, value);
        }

        return null;
    }
}
/**
 * # Inject JutSuper into the page
 * @param {string} file 
 * @param {string} id
 * @param {HTMLBodyElement} node 
   @param {boolean} isModule
 * @returns {null}
 */
function injectScript(file, id, node, isModule) {
    let elm = document.createElement("script");
    elm.setAttribute("id", id);
    if (isModule) {
        elm.setAttribute("type", "module");
    }
    else {
        elm.setAttribute("type", "text/javascript");
    }
    elm.setAttribute("src", file);
    node.appendChild(elm);

    return null;
}

/**
 * # Inject JutSuper into the page
 * @param {string} file 
 * @param {string} id
 * @param {HTMLBodyElement} node 
 * @returns {null}
 */
function injectCss(file, id, node) {
    let elm = document.createElement("link");
    elm.setAttribute("id", id)
    elm.setAttribute("rel", "stylesheet")
    elm.setAttribute("href", file);
    node.appendChild(elm);

    return null;
}

/**
 * # Inject JutSuper into the page
 * @param {string} file 
 * @param {string} id
 * @param {HTMLBodyElement} node 
 * @returns {null}
 */
function injectIconBefore(file, id, node) {
    let elm = document.createElement("link");
    elm.setAttribute("id", id)
    elm.setAttribute("rel", "preload")
    elm.setAttribute("href", file);
    elm.setAttribute("as", "image");
    node.insertBefore(elm, node.firstChild)

    return null;
}

const body = document.getElementsByTagName("body")[0];

injectScript(browser.runtime.getURL("/src/ipc.js"), "jutsuper-ipc-js", body, true);
injectScript(browser.runtime.getURL("/src/page/jutsuper.js"), "jutsuper-js", body, true);
injectCss(browser.runtime.getURL("/src/page/jutsuper.css"), "jutsuper-css", body)
injectIconBefore(browser.runtime.getURL("/src/assets/gear.svg"), "jutsuper-gear-svg", body)
