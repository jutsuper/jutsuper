export { JutSuperIpc };


/** @typedef {{thisArg: any, fn: function(boolean)}} Subscriber */
/** @typedef {{onFullscreenChange: Subscriber[]}} SubscriberMap */


/**
 * # Inter-process communication
 * Used for communications between page and content scripts
 */
class JutSuperIpc {
    /**
     * @param {string | null} ipcId 
     * @param {boolean} doCreateNode
     */
    constructor(ipcId = null, doCreateNode = false) {
        this.KEY_DEFAULT_IPC_ID = "jutsuper-ipc";
        this.KEY_IS_FULLSCREEN = "is-fullscreen";

        /** @type {Subscriber[]} */
        this._onFullscreenChangeEvents = [];

        /** @type {string} */
        this._ipcId = ipcId ? ipcId : this.KEY_DEFAULT_IPC_ID;

        const body = document.getElementsByTagName("body")[0];
        const ipcNode = doCreateNode ?
            document.createElement(this._ipcId) :
            document.getElementById(this._ipcId);

        if (!ipcNode) {
            throw new Error(
                `JutSuperIpc(): doCreateNode is ${doCreateNode}, ` +
                `but the node does not exist.`
            );
        }
        
        body.append(ipcNode);

        ipcNode.setAttribute("id", this._ipcId);

        this._ipcNode = ipcNode;
    }

    /**
     * @param {MutationRecord[]} mutationList
     * @param {MutationObserver} observer
     */
    _mutationObserverCallback(mutations, observer) {
        for (const mutation of mutations) {
            switch (mutation.attributeName) {
                case this.KEY_IS_FULLSCREEN:
                    this.broadcastFullscreenChange();
                    break;
            }
        }
    }

    listen() {
        const options = { attributes: true };
        this._mutationObserver = new MutationObserver((mutations, observer) => {
            this._mutationObserverCallback(mutations, observer);
        });
        this._mutationObserver.observe(this._ipcNode, options);
    }

    stopListen() {
        if (!this._mutationObserver) {
            throw new Error(
                "JutSuper IPC: can't stop listening, " +
                "no active listener"
            )
        }
    
        this._mutationObserver.disconnect()
        this._mutationObserver = undefined;
    }

    /**
     * @returns {boolean | undefined}
     */
    get isFullscreen() {
        const state = this._ipcNode.getAttribute(this.KEY_IS_FULLSCREEN);
        switch (state) {
            case "true": return true;
            case "false": return false;
            default: undefined
        }
    }
    /**
     * @param {boolean} value
    */
    set isFullscreen(value) {
        this._ipcNode.setAttribute(this.KEY_IS_FULLSCREEN, String(value));
        this.broadcastFullscreenChange();
    }
    /**
     * @param {any} thisArg
     * @param {Function} fn 
     */
    onFullscreenChange(thisArg, fn) {
        this._onFullscreenChangeEvents.push({thisArg: thisArg, fn: fn});
    }
    broadcastFullscreenChange() {
        for (const fnMap of this._onFullscreenChangeEvents) {
            try {
                fnMap.fn.call(fnMap.thisArg, this.isFullscreen);
            } catch (error) {
                console.error("JutSuper IPC: error broadcasting", error);
            }
            
        }
    }
}
