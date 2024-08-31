import {
  JutSuperDomClasses as domClasses,
  JutSuperDomIds as domIds
} from "/src/consts.js";
import { JutSuperSkippingPopup } from "/src/page/notifications/skipping.js";
import { JutSuperAutoplayUnavailablePopup } from "./notifications/autoplayUnavailable.js";
export { JutSuperNotificationPopup };


/**
 * @typedef {import("/src/types/notification.d.ts").JutSuperNotificationUrls} JutSuperNotificationUrls
 */


class JutSuperNotificationPopup {
  /**
   * @param {HTMLDivElement} root
   * @param {JutSuperNotificationUrls} notifUrls
   */
  constructor(root, notifUrls) {
    this.LOCATION = JutSuperNotificationPopup.name;

    this.notifUrls = notifUrls;
    this.root = root;

    // if in dev environment, hide the preload message
    if (window.JUTSUPER_DEBUG) {
      const preloadMessage = document.getElementById(domIds.devPreloadMessage);
      preloadMessage.classList.add(domClasses.devHidden);
      this.setAutoplayUnavailableContent();
    }
  }

  /**
   * @returns {Promise<JutSuperSkippingPopup>}
   */
  async setSkippingContent() {
    const text = await (await fetch(this.notifUrls.skipping)).text();
    this.root.innerHTML = text;
    return new JutSuperSkippingPopup(this.root);
  }

  /**
   * @returns {Promise<JutSuperAutoplayUnavailablePopup>}
   */
  async setAutoplayUnavailableContent() {
    const text = await (await fetch(this.notifUrls.autoplayUnavailable)).text();
    this.root.innerHTML = text;
    return new JutSuperAutoplayUnavailablePopup(this.root);
  }
}


if (window.JUTSUPER_DEBUG) {
  /** @type {JutSuperNotificationUrls} */
  const notifUrls = {
    skipping: "notifications/skipping.html",
    autoplayUnavailable: "notifications/autoplayUnavailable.html"
  };
  window.jsuperNotifPopup = new JutSuperNotificationPopup(
    /** @type {HTMLDivElement} */ (document.getElementById(domIds.notifRoot)),
    notifUrls
  );
}
