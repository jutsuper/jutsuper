import { jsuperUtil as util } from "/src/util.js";
export { JutSuperSettings };


class JutSuperSettings {
  /**
   * @param {Document} doc 
   */
  constructor(doc) {
    const thisArg = this;

    this.document = doc ? doc : document;

    this.bars = this.document.getElementsByName("jutsuper-settings-bar");
    this.opSkipSwitch = this.document.getElementById("jutsuper-settings-openings-switch");
    this.opSkipOrderSelector = this.document.getElementById("jutsuper-settings-openings-skip-order-selector");
    this.opSkipOrderFirstSelector = this.document.getElementById("jutsuper-settings-openings-skip-order-first");
    this.opSkipOrderLastSelector = this.document.getElementById("jutsuper-settings-openings-skip-order-last");
    this.edSkipSwitch = this.document.getElementById("jutsuper-settings-endings-switch");
    this.edSkipOrderSelector = this.document.getElementById("jutsuper-settings-endings-skip-order-selector");
    this.edSkipOrderFirstSelector = this.document.getElementById("jutsuper-settings-endings-skip-order-first");
    this.edSkipOrderLastSelector = this.document.getElementById("jutsuper-settings-endings-skip-order-last");
    this.edFullscreenSwitch = this.document.getElementById("jutsuper-settings-endings-fullscreen-switch");
    this.delaySlider = this.document.getElementById("jutsuper-settings-delay-slider");
    this.delayNum = this.document.getElementById("jutsuper-settings-delay-num");
    this.cancelKeyListener = this.document.getElementById("jutsuper-settings-cancel-key-listener");
    this.cancelKeyListener.isListening = false;
    this.cancelKeyListener.addEventListener("keydown", event => {
      if (!thisArg.cancelKeyListener.isListening) {
        return
      }

      const keyLabel = util.getKeyLabelFromRawLabel(event.key);

      thisArg.cancelKeyListener.value = keyLabel;
      thisArg.cancelKeyListener.classList.remove("jutsuper-animate-darker-to-dark-green-ht-animation");
      thisArg.cancelKeyListener.isListening = false;
      thisArg.cancelKeyListenerRecCircle.classList.toggle("jutsuper-animate-opacity-1-to-0");
    });
    this.cancelKeyListenerRecCircle = this.document.getElementById("jutsuper-settings-cancel-key-listener-rec-circle");

    this.bars.forEach(bar => bar.addEventListener("change", event => thisArg.closeOtherBars(event.target)))

    this.opSkipSwitch.addEventListener("change", this.onOpeningsSwitchChange);
    this.opSkipOrderSelector.addEventListener("change", this.onOpeningsSkipOrderChange);
    this.edSkipSwitch.addEventListener("change", this.onEndingsSwitchChange);
    this.edSkipOrderSelector.addEventListener("change", this.onEndingsSkipOrderChange);
    this.edFullscreenSwitch.addEventListener("change", this.onEndingsFullscreenSliderChange);
    this.delaySlider.addEventListener("input", event => thisArg.onDelayChange(event));
    this.cancelKeyListener.addEventListener("click", event => thisArg.onCancelRecorderClick(event));

    this.document.addEventListener("mousedown", event => {
      const boundaries = thisArg.cancelKeyListener.getBoundingClientRect();
      const isInXRange = event.clientX >= boundaries.left && event.clientX <= boundaries.right;
      const isInYRange = event.clientY >= boundaries.top && event.clientY <= boundaries.bottom;
      const isInAreaRange = isInXRange && isInYRange;

      if (!isInAreaRange) {
        thisArg.cancelKeyListener.isListening = false;
        thisArg.cancelKeyListener.classList.remove("jutsuper-animate-darker-to-dark-green-ht-animation");
        thisArg.cancelKeyListenerRecCircle.classList.remove("jutsuper-animate-opacity-1-to-0");
      }
    });

    // if in dev environment, show the dev area
    if (window.JUTSUPER_DEBUG) {
      const preloadMessage = this.document.getElementById("jutsuper-settings-dev-page-preload-message");
      preloadMessage.classList.add("hidden");
      const devArea = this.document.getElementsByClassName("jutsuper-settings-dev-area");
      devArea[0].classList.remove("hidden");
    }
  }

  /**
   * @param {HTMLInputElement} sourceBar 
   * @returns {void}
   */
  closeOtherBars(sourceBar) {
    for (const bar of this.bars) {
      if (bar.id === sourceBar.id) {
        continue;
      }
      bar.checked = false
    }
  }

  //////////////
  // Openings //
  //////////////

  /**
   * @param {Event} event 
   */
  onOpeningsSwitchChange(event) {
    const state = event.target.checked
    console.log("skipOpenings =", state)
  }

  /**
   * @param {boolean} value 
   */
  setDoSkipOpenings(value) {
    this.opSkipSwitch.checked = value;
  }

  onOpeningsSkipOrderChange() {
    
  }

  /**
   * @param {boolean} value 
   */
  setOpeningsSkipOrder(value) {
    switch (value) {
      case "first":
        this.opSkipOrderFirstSelector.checked = true;
        break;
      case "last":
        this.opSkipOrderLastSelector.checked = true;
        break
    }
  }

  /////////////
  // Endings //
  /////////////

  /**
   * @param {Event} event 
   */
  onEndingsSwitchChange(event) {
    const state = event.target.checked
    console.log("skipEndings =", state)
  }

  /**
   * @param {boolean} value 
   */
  setDoSkipEndings(value) {
    this.edSkipSwitch.checked = value;
  }

  onEndingsSkipOrderChange() {
    
  }

  /**
   * @param {boolean} value 
   */
  setEndingsSkipOrder(value) {
    switch (value) {
      case "first":
        this.edSkipOrderFirstSelector.checked = true;
        break;
      case "last":
        this.edSkipOrderLastSelector.checked = true;
        break
    }
  }

  onEndingsFullscreenSliderChange() {
    
  }

  /**
   * @param {boolean} value 
   */
  setEndingsPersistFullscreen(value) {
    this.edFullscreenSwitch.checked = value;
  }

  ////////////
  // Shared //
  ////////////

  /**
   * @param {Event | number} event 
   */
  onDelayChange(event) {
    if (typeof event === "number" || typeof event === "string") {
      this.delayNum.innerText = event;
    }
    else {
      this.delayNum.innerText = event.target.value;
    }
    
    this.delayNum.classList.add("jutsuper-display-hidden");
    setTimeout(() => {
      this.delayNum.classList.remove("jutsuper-display-hidden");
    }, 1);
  }

  setDelay(value) {
    this.delaySlider.value = value;
    this.onDelayChange(value);
  }

  /**
   * @param {Event} event 
   */
  onCancelRecorderClick(event) {
    this.cancelKeyListener.isListening = !this.cancelKeyListener.isListening;
    this.cancelKeyListener.classList.toggle("jutsuper-animate-darker-to-dark-green-ht-animation");
    this.cancelKeyListenerRecCircle.classList.toggle("jutsuper-animate-opacity-1-to-0");
  }

  /**
   * @param {string} value 
   */
  setCancelKey(value) {
    this.cancelKeyListener.value = util.getKeyLabelFromRawLabel(value);
  }
}

if (window.JUTSUPER_DEBUG) {
  window.jsuperSettings = new JutSuperSettings(document);
}
