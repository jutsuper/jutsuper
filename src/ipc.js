export { JutSuperIpc };


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

    get isFullscreen() {
        return this._ipcNode.getAttribute(this.KEY_IS_FULLSCREEN);
    }
    set isFullscreen(value) {
        this._ipcNode.setAttribute(this.KEY_IS_FULLSCREEN, value);
    }
}
