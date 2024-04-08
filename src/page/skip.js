import {
  JutSuperDomClasses as domClasses,
  JutSuperDomIds as domIds
} from "/src/consts.js";
export { JutSuperSkipPopup };


class JutSuperSkipPopup {
  /**
   * @param {Document} doc 
   */
  constructor(doc) {
    this.LOCATION = JutSuperSkipPopup.name;

    this.document = doc ? doc : document;

    this.popup = this.document.getElementById(domIds.skipRoot);
    this.cancelKeyLabel = this.document.getElementById(domIds.skipKeyLabel);
    this.countdownTimeline = this.document.getElementById(domIds.skipCountdownLine);


    this.popup.addEventListener("click", event => this.onCancelButtonClick(event));

    // if in dev environment, hide the preload message
    if (window.JUTSUPER_DEBUG) {
      const preloadMessage = this.document.getElementById(domIds.devPreloadMessage);
      preloadMessage.classList.add(domClasses.devHidden);
    }
  }

  /**
   * @param {Event} event 
   */
  onCancelButtonClick(event) {
    this.setCountdownTimelineWidth(100);
  }

  /**
   * @param {string} key 
   */
  setCancelKey(key) {
    this.cancelKeyLabel.innerText = key;
  }

  /**
   * @param {string | number} percent 
   */
  setCountdownTimelineWidth(percent) {
    this.countdownTimeline.style.width = `${percent}%`
  }
}

if (window.JUTSUPER_DEBUG) {
  window.jsuperSkipPopup = new JutSuperSkipPopup(document);
}
