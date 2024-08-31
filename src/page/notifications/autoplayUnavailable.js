import {
  JutSuperDomClasses as domClasses,
  JutSuperDomIds as domIds
} from "/src/consts.js";
export { JutSuperAutoplayUnavailablePopup as JutSuperAutoplayUnavailablePopup };


class JutSuperAutoplayUnavailablePopup {
  /**
   * @param {HTMLDivElement} root 
   */
  constructor(root) {
    this.LOCATION = JutSuperAutoplayUnavailablePopup.name;

    this.root = root;
    this.closeButton = /** @type {HTMLDivElement} */ (
      this.root.querySelector("#" + "jutsuper-notif-autoplay-unavailable-close-button")
    );

    this.closeButton.addEventListener("click", event => {
      this.hide();
    });
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

  hide() {
    this.root.classList.remove("jutsuper-visible");
  }

  show() {
    this.root.classList.remove(domClasses.displayHidden);
    this.root.offsetHeight; // flush
    this.root.classList.add("jutsuper-visible");
  }
}
