/**
 * @type {import("/src/consts.js").JutSuperIds}
 * @typedef {import("/src/consts.js").JutSuperIds} JutSuperIds
 */
var JutSuperIds;

/**
 * @type {typeof import("/src/consts.js").JutSuperIpcKeys}
 * @typedef {import("/src/consts.js").JutSuperIpcKeys} JutSuperIpcKeys
 */
var JutSuperIpcKeys;

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
    JutSuperIpcKeys = constsModule.JutSuperIpcKeys;
    JutSuperPaths = constsModule.JutSuperPaths;
    JutSuperIpc = ipcModule.JutSuperIpc;
})().then(() => {
    jutsuperContent = new JutSuperContent();
})


class JutSuperContent {
    constructor() {
        /** @type {JutSuperIpcKeys} */
        let ipcKeys = new JutSuperIpcKeys();

        /** @type {JutSuperIpc} */
        this.ipc = new JutSuperIpc(ipcKeys.contentSenderId, null, true);
        this.ipc.onEssentialsReady(
            this, this.handleOnEssentialsReady
        )
        this.ipc.onFullscreenChange(
            this, this.handleOnFullscreenChange
        );
        this.ipc.onEpisodeSwitchPrep(
            this, this.handleOnCurrentlySwitchingEpisode
        );
        this.ipc.listen();

        /** @type {JutSuperIds} */
        let ids = new JutSuperIds();
        /** @type {JutSuperPaths} */
        let paths = new JutSuperPaths();

        this.urlGearSvg = browser.runtime.getURL(paths.gearSvg);
        this.urlJutsuperIpcJs = browser.runtime.getURL(paths.ipcJs);
        this.urlJutsuperCss = browser.runtime.getURL(paths.jutsuperCss);
        this.urlJutsuperJs = browser.runtime.getURL(paths.jutsuperJs);

        const body = document.getElementsByTagName("body")[0];

        this.injectImage(body, this.urlGearSvg, ids.gearSvg);
        this.injectCss(body, this.urlJutsuperCss, ids.jutsuperCss);
        this.injectModule(body, this.urlJutsuperIpcJs, ids.jutsuperIpcJs);
        this.injectModule(body, this.urlJutsuperJs, ids.jutsuperJs);
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
    async handleOnEssentialsReady(state) {
        console.debug("content script caught essentialsready! isEssentialsReady:", state);

        /** @type {{isFullscreen: boolean, isCurrentlySwitchingEpisode: boolean}} */
        const keys = await browser.storage.local.get(
            ["isFullscreen", "isCurrentlySwitchingEpisode"]
        );

        if (keys.isCurrentlySwitchingEpisode) {
            console.log("CURRENTLY SWITCHING EPISODE!!!");
        }
        if (keys.isFullscreen) {
            console.log("DON'T FORGET FULLSCREEN!!!");
        }
    }

    /**
     * @param {boolean} state 
     */
    handleOnFullscreenChange(state) {
        console.debug("content script caught fullscreenchange! isFullscreen:", state);

        browser.storage.local.set({ isFullscreen: state }).then(
            () => {
                console.debug("set isFullscreen state")
            }
        );
    }

    async handleOnCurrentlySwitchingEpisode(state) {
        console.debug(
            "content script caught currentlyswitchingepisode! isCurrentlySwitchingEpisode:", state
        );

        await browser.storage.local.set({ isCurrentlySwitchingEpisode: state });

        console.debug("set isCurrentlySwitchingEpisode state");
        this.ipc.isEpisodeSwitchPrep = false;
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
