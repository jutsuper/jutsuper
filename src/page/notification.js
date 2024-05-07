import {
  JutSuperDomClasses as domClasses,
  JutSuperDomIds as domIds
} from "/src/consts.js";
export { JutSuperNotificationPopup };


/**
 * @typedef {import("/src/types/notification.d.ts").JutSuperNotificationUrls} JutSuperNotificationUrls
 */


class JutSuperNotificationPopup {
  /**
   * @param {Document} doc
   * @param {JutSuperNotificationUrls} notifUrls
   */
  constructor(doc, notifUrls) {
    this.LOCATION = JutSuperNotificationPopup.name;

    this.document = doc ? doc : document;
    this.notifUrls = notifUrls;

    this.popup = this.document.getElementById(domIds.notificationRoot);
    this.content = this.document.getElementById(domIds.notificationContent);

    // if in dev environment, hide the preload message
    if (window.JUTSUPER_DEBUG) {
      const preloadMessage = this.document.getElementById(domIds.devPreloadMessage);
      preloadMessage.classList.add(domClasses.devHidden);
      this.setAutoplayErrorContent();
    }
  }

  /**
   * @returns {Promise<void>}
   */
  async setAutoplayErrorContent() {
    const text = await (await fetch(this.notifUrls.autoplayError)).text();
    this.content.innerHTML = text;
  }
}


if (window.JUTSUPER_DEBUG) {
  /** @type {JutSuperNotificationUrls} */
  const notifUrls = {
    autoplayError: "notifications/autoplayError.html"
  };
  window.jsuperNotificationPopup = new JutSuperNotificationPopup(document, notifUrls);
}
