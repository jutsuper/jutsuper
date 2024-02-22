/**
 * @typedef {import("/src/consts.js").JutSuperIpcIds} JutSuperIpcIds
 * @type {JutSuperIpcIds}
 */
var ipcIds;

/**
 * @typedef {import("/src/consts.js").JutSuperIpcKeys} JutSuperIpcKeys
 * @type {JutSuperIpcKeys}
 */
var ipcKeys;

/**
 * @typedef {import("/src/consts.js").JutSuperAssetPaths} JutSuperAssetPaths
 * @type {JutSuperAssetPaths}
 */
var assetPaths;

/**
 * @typedef {import("/src/ipc.js").JutSuperIpcBuilder} JutSuperIpcBuilder
 * @type {typeof import("/src/ipc.js").JutSuperIpcBuilder}
 */
var JutSuperIpcBuilder;

/**
 * @typedef {import("/src/ipc.js").JutSuperIpc} JutSuperIpc
 * @type {typeof import("/src/ipc.js").JutSuperIpc}
 */
var JutSuperIpc;

/**
 * @typedef {import("/src/ipc.js").JutSuperIpcRecvParamsBuilder} JutSuperIpcRecvParamsBuilder
 * @type {typeof import("/src/ipc.js").JutSuperIpcRecvParamsBuilder}
 */
var JutSuperIpcRecvParamsBuilder



/** @type {JutSuperContent} */
var jutsuperContent;


/** Import modules */
(async function() {
    /** @type {typeof import("/src/consts.js")} */
    const constsModule = await import(browser.runtime.getURL("/src/consts.js"))
    /** @type {typeof import("/src/ipc.js")} */
    const ipcModule = await import(browser.runtime.getURL("/src/ipc.js"));

    ipcIds = constsModule.JutSuperIpcIds;
    ipcKeys = constsModule.JutSuperIpcKeys;
    assetPaths = constsModule.JutSuperAssetPaths;
    JutSuperIpcBuilder = ipcModule.JutSuperIpcBuilder;
    JutSuperIpc = ipcModule.JutSuperIpc;
    JutSuperIpcRecvParamsBuilder = ipcModule.JutSuperIpcRecvParamsBuilder;
})().then(() => {
    jutsuperContent = new JutSuperContent();
})


class JutSuperContent {
    constructor() {
        /** @type {JutSuperIpc} */
        this.ipc = new JutSuperIpcBuilder()
            .createCommunicationNode()
            .identifyAs(ipcIds.content)
            .build();

        /** @type {string} */
        this.urlGearSvg = browser.runtime.getURL(paths.gearSvg);
        /** @type {string} */
        this.urlJutSuperIpcJs = browser.runtime.getURL(paths.ipcJs);
        /** @type {string} */
        this.urlJutSuperCss = browser.runtime.getURL(paths.jutsuperCss);
        /** @type {string} */
        this.urlJutSuperJs = browser.runtime.getURL(paths.jutsuperJs);

        const body = document.getElementsByTagName("body")[0];

        this.injectImage(body, this.urlGearSvg, ids.gearSvg);
        this.injectCss(body, this.urlJutSuperCss, ids.jutsuperCss);
        this.injectModule(body, this.urlJutSuperIpcJs, ids.jutsuperIpcJs);
        this.injectModule(body, this.urlJutSuperJs, ids.jutsuperJs);
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

    async listenEssentialsLoadState() {
        const cfg = new JutSuperIpcRecvParamsBuilder()
            .recvOnlyTheseKeys(ipcKeys.essentialsLoadingState)
            .build()

        for (const evt of await this.ipc.recv(cfg)) {
            console.log(evt)
        }
    }

    async listenFullscreenChange() {
        const cfg = new JutSuperIpcRecvParamsBuilder()
            .recvOnlyTheseKeys(ipcKeys.isFullscreen)
            .build()

        for (const evt of await this.ipc.recv(cfg)) {
            console.log(evt)
        }
    }

    async listenEpisodeSwitchPrepStates() {
        const cfg = new JutSuperIpcRecvParamsBuilder()
            .recvOnlyTheseKeys(ipcKeys.episodeSwitchPrepState)
            .build()

        for (const evt of await this.ipc.recv(cfg)) {
            console.log(evt)
        }
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
