import {
  JutSuperDomClasses as domClasses,
  JutSuperDomIds as domIds
} from "/src/consts.js";
import { AsyncSleep, AsyncSleepReason } from "/src/sleep.js";
export { JutSuperSkippingPopup };


/**
 * @typedef {import("/src/sleep.js").AsyncSleepReasonKeys} AsyncSleepReasonKeys
 */


class JutSuperSkippingPopup {
  #sleep;

  /**
   * @param {HTMLDivElement} root 
   */
  constructor(root) {
    this.LOCATION = JutSuperSkippingPopup.name;

    this.root = root;
    this.cancelKeyLabel = /** @type {HTMLDivElement} */ (
      this.root.querySelector("#" + domIds.skippingKeyLabel)
    );
    this.countdownTimeline = /** @type {HTMLDivElement} */ (
      this.root.querySelector("#" + domIds.skippingCountdownLine)
    );
    this.#sleep = new AsyncSleep();
    this.delayS = 0;

    this.root.addEventListener("click", event => this.onCancelButtonClick(event));
    this.root.addEventListener("animationend", event => {
      if (this.isActive()) {
        return;
      }
      this.root.classList.add(domClasses.displayHidden);
    });
  }

  isActive() {
    return this.root.classList.contains("jutsuper-visible");
  }

  /**
   * @returns {number}
   */
  delayMs() {
    return this.delayS * 1000;
  }

  /**
   * @param {Event} event 
   */
  onCancelButtonClick(event) {
    this.end();
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
    this.countdownTimeline.style.width = `${percent}%`;
  }

  /**
   * @param {string | number} secs
   */
  setTimelineTransitionDuration(secs) {
    this.countdownTimeline.style.transition = `width ${secs}s linear`;
  }

  /**
   * @param {number} secs
   */
  setDelay(secs) {
    this.delayS = secs;
    this.setTimelineTransitionDuration(this.delayS);
  }

  hide() {
    this.root.classList.remove("jutsuper-visible");
    this.setTimelineTransitionDuration(0);
    this.countdownTimeline.offsetHeight; // flush
    this.setCountdownTimelineWidth(100);
    this.countdownTimeline.offsetHeight; // flush
    this.setTimelineTransitionDuration(this.delayS);
    this.countdownTimeline.offsetHeight; // flush
  }

  show() {
    this.root.classList.remove(domClasses.displayHidden);
    this.root.offsetHeight; // flush
    this.root.classList.add("jutsuper-visible");
    this.setCountdownTimelineWidth(0);
  }

  /**
   * @returns {Promise<AsyncSleepReasonKeys>}
   */
  async start() {
    if (this.isActive()) {
      return (await this.#sleep.promise()).reason;
    }

    this.show();
    this.#sleep.start(this.delayMs());
    let result = await this.#sleep.promise();
    if (result.reason === AsyncSleepReason.cancelled) {
      return result.reason;
    }

    this.hide();
    return result.reason;
  }

  end() {
    if (!this.isActive()) {
      return;
    }

    this.hide();
    this.#sleep.cancel();
  }
}
