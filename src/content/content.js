/** @type {typeof import("/src/ipc.js").JutSuperIpc} */
var JutSuperIpc;
/** @type {JutSuperContent} */
var jutsuperContent;


async function importModules() {
    const ipcModule = await import(browser.runtime.getURL("/src/ipc.js"));
    JutSuperIpc = ipcModule.JutSuperIpc;
}
importModules().then(() => {
    jutsuperContent = new JutSuperContent();
});


class JutSuperContent {
    constructor() {
        this.currentlyFullscreen = false;
        this.ipc = new JutSuperIpc(null, true);

        this.idGearSvg = "jutsuper-gear-svg";
        this.idJutsuperCss = "jutsuper-css";
        this.idJutsuperIpcJs = "jutsuper-ipc-js";
        this.idJutsuperJs = "jutsuper-js";

        this.urlGearSvg = browser.runtime.getURL("/src/assets/gear.svg");
        this.urlJutsuperCss = browser.runtime.getURL("/src/page/jutsuper.css");
        this.urlJutsuperIpcJs = browser.runtime.getURL("/src/ipc.js");
        this.urlJutsuperJs = browser.runtime.getURL("/src/page/jutsuper.js");

        const body = document.getElementsByTagName("body")[0];

        this.injectImage(body, this.urlGearSvg, this.idGearSvg);
        this.injectCss(body, this.urlJutsuperCss, this.idJutsuperCss);
        this.injectModule(body, this.urlJutsuperIpcJs, this.idJutsuperIpcJs);
        this.injectModule(body, this.urlJutsuperJs, this.idJutsuperJs);
    }

    /**
     * @param {HTMLElement} node
     * @param {string} url
     * @param {string} id
     * @returns {null}
     */
    injectModule(node, url, id) {
        const attrs = {
            id: id,
            src: url,
            type: "module",
        };

        const elm = document.createElement("script");
        JutSuperContent.applyAttrs(elm, attrs);

        node.appendChild(elm);

        return null;
    }

    /**
     * @param {HTMLElement} node
     * @param {string} url
     * @param {string} id
     * @returns {null}
     */
    injectCss(node, url, id) {
        const attrs = {
            id: id,
            href: url,
            rel: "stylesheet",
        };

        const elm = document.createElement("link");
        JutSuperContent.applyAttrs(elm, attrs);

        node.appendChild(elm);

        return null;
    }

    /**
     * @param {HTMLElement} node
     * @param {string} url
     * @param {string} id
     * @returns {null}
     */
    injectImage(node, url, id) {
        const attrs = {
            id: id,
            href: url,
            rel: "preload",
            as: "image",
        };

        const elm = document.createElement("link");
        JutSuperContent.applyAttrs(elm, attrs);

        node.appendChild(elm);

        return null;
    }

    /**
     * @param {HTMLElement} node
     * @param {Object.<string, string>} attrs 
     * @returns {null}
     */
    static applyAttrs(node, attrs) {
        for (const key in attrs) {
            const value = attrs[key];
            node.setAttribute(key, value);
        }

        return null;
    }
}
