export {
    JutSuPage,
    JutSuperIds, 
    JutSuperPaths,
    JutSuperIpcKeys
}


/**
 * NOTE:
 * This file can be accessed from the page,
 * tokens and passwords shouldn't be here
 */


class JutSuPage {
    constructor() {
        /** @type {"skip_video_intro"} */
        this.skipOpeningFnName = "skip_video_intro";
        /** @type {"video_go_next_episode"} */
        this.skipEndingFnName = "video_go_next_episode";
        /** @type {"my-player"} */
        this.playerDivId = "my-player";
        /** @type {"vjs-fullscreen"} */
        this.playerFullscreenClassName = "vjs-fullscreen";
    }
}

class JutSuperIds {
    constructor() {
        /** @type {"jutsuper-gear-svg"} */
        this.gearSvg = "jutsuper-gear-svg";
        /** @type {"jutsuper-css"} */
        this.jutsuperCss = "jutsuper-css";
        /** @type {"jutsuper-ipc-js"} */
        this.jutsuperIpcJs = "jutsuper-ipc-js";
        /** @type {"jutsuper-js"} */
        this.jutsuperJs = "jutsuper-js";
    }
}

class JutSuperPaths {
    constructor() {
        /** @type {"/src/assets/gear.svg"} */
        this.gearSvg = "/src/assets/gear.svg";
        /** @type {"/src/consts.js"} */
        this.constsJs = "/src/consts.js";
        /** @type {"/src/ipc.js"} */
        this.ipcJs = "/src/ipc.js";
        /** @type {"/src/page/jutsuper.css"} */
        this.jutsuperCss = "/src/page/jutsuper.css";
        /** @type {"/src/page/jutsuper.js"} */
        this.jutsuperJs = "/src/page/jutsuper.js";
    }
}

class JutSuperIpcKeys {
    constructor() {
        /** @type {"pageEnv"} */
        this.pageCtxId = "pageEnv";
        /** @type {"contentEnv"} */
        this.contentCtxId = "contentEnv";
        /** @type {"jutsuper-ipc"} */
        this.defaultIpcId = "jutsuper-ipc";
        /** @type {"data-is-essentials-ready"} */
        this.isEssentialsReady = "data-is-essentials-ready";
        /** @type {"data-is-fullscreen"} */
        this.isFullscreen = "data-is-fullscreen";
        /** @type {"data-is-episode-switch-prep"} */
        this.isEpisodeSwitchPrep = "data-is-episode-switch-prep";
    }
}