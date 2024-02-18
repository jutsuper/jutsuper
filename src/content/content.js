/**
 * @type {import("/src/consts.js").JutSuperIds}
 * @typedef {import("/src/consts.js").JutSuperIds} JutSuperIds
 */
var JutSuperIds;

/**
 * @type {import("/src/consts.js").JutSuperPaths}
 * @typedef {import("/src/consts.js").JutSuperPaths} JutSuperPaths
 */
var JutSuperPaths;

/**
 * @type {typeof import("/src/ipc.js").JutSuperIpc}
 * @typedef {import("/src/ipc.js").JutSuperIpc} JutSuperIpc
 */
var JutSuperIpc;


/** @type {JutSuperContent} */
var jutsuperContent;


/** Import modules */
(async function() {
    /** @type {typeof import("/src/consts.js")} */
    const constsModule = await import(browser.runtime.getURL("/src/consts.js"))
    /** @type {typeof import("/src/ipc.js")} */
    const ipcModule = await import(browser.runtime.getURL("/src/ipc.js"));

    JutSuperIds = constsModule.JutSuperIds;
    JutSuperPaths = constsModule.JutSuperPaths;
    JutSuperIpc = ipcModule.JutSuperIpc;
})().then(() => {
    jutsuperContent = new JutSuperContent();
})


class JutSuperContent {
    constructor() {
        /** @type {boolean} */
        this.currentlyFullscreen = false;
        /** @type {boolean} */
        this.currentlySwitchingEpisode = false;

        /** @type {JutSuperIpc} */
        this.ipc = new JutSuperIpc(null, true);
        this.ipc.onFullscreenChange(
            this, this.handleOnFullscreenChange
        );
        this.ipc.onEpisodeSwitchPrep(
            this, this.handleOnCurrentlySwitchingEpisode
        );
        this.ipc.listen();

        /** @type {JutSuperIds} */
        this.ids = new JutSuperIds();
        /** @type {JutSuperPaths} */
        this.paths = new JutSuperPaths();

        this.urlGearSvg = browser.runtime.getURL(this.paths.gearSvg);
        this.urlJutsuperIpcJs = browser.runtime.getURL(this.paths.ipcJs);
        this.urlJutsuperCss = browser.runtime.getURL(this.paths.jutsuperCss);
        this.urlJutsuperJs = browser.runtime.getURL(this.paths.jutsuperJs);

        const body = document.getElementsByTagName("body")[0];

        this.injectImage(body, this.urlGearSvg, this.ids.gearSvg);
        this.injectCss(body, this.urlJutsuperCss, this.ids.jutsuperCss);
        this.injectModule(body, this.urlJutsuperIpcJs, this.ids.jutsuperIpcJs);
        this.injectModule(body, this.urlJutsuperJs, this.ids.jutsuperJs);
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
     * @param {boolean} state 
     */
    handleOnFullscreenChange(state) {
        console.debug("content script caught fullscreenchange! isFullscreen:", state);
        this.currentlyFullscreen = state;

        browser.storage.local.set({ isFullscreen: state }).then(
            () => { console.debug("set isFullscreen state") }
        );
    }

    handleOnCurrentlySwitchingEpisode(state) {
        console.debug(
            "content script caught currentlyswitchingepisode! isCurrentlySwitchingEpisode:", state
        );
        this.currentlySwitchingEpisode = state;

        browser.storage.local.set({ isCurrentlySwitchingEpisode: state }).then(
            () => { console.debug("set isCurrentlySwitchingEpisode state") }
        );
    }

    requestPlay() {

    }

    requestFullscreen() {

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
