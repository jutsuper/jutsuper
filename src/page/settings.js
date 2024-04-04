import { jsuperUtil as util } from "/src/util.js";
import { JutSuperClasses as jsuperCss } from "/src/consts.js";
import { JutSuperDomIds as domIds } from "/src/consts.js";
import { JutSuperInputNames as inputNames } from "/src/consts.js";
export { JutSuperSettings };


class JutSuperSettings {
  /**
   * @param {Document} doc 
   */
  constructor(doc) {
    const thisArg = this;

    this.document = doc ? doc : document;

    this.bars = this.document.getElementsByName(inputNames.settingsBar);
    this.opSkipSwitch = this.document.getElementById(domIds.settingsOpeningsSwitch);
    this.opSkipOrderSelector = this.document.getElementById(domIds.settingsOpeningsSkipOrderSelector);
    this.opSkipOrderFirstSelector = this.document.getElementById(domIds.settingsOpeningsSkipOrderFirst);
    this.opSkipOrderLastSelector = this.document.getElementById(domIds.settingsOpeningsSkipOrderLast);
    this.edSkipSwitch = this.document.getElementById(domIds.settingsEndingsSwitch);
    this.edSkipOrderSelector = this.document.getElementById(domIds.settingsEndingsSkipOrderSelector);
    this.edSkipOrderFirstSelector = this.document.getElementById(domIds.settingsEndingsSkipOrderFirst);
    this.edSkipOrderLastSelector = this.document.getElementById(domIds.settingsEndingsSkipOrderLast);
    this.edSkipMaxNegativeButton = this.document.getElementById(domIds.settingsEndingsMaxSkipsNegativeButton);
    this.edSkipMaxField = this.document.getElementById(domIds.settingsEndingsMaxSkipsField);
    this.edSkipMaxPositiveButton = this.document.getElementById(domIds.settingsEndingsMaxSkipsPositiveButton);
    this.edFullscreenSwitch = this.document.getElementById(domIds.settingsEndingsFullscreenSwitch);
    this.delaySlider = this.document.getElementById(domIds.settingsDelaySlider);
    this.delayNum = this.document.getElementById(domIds.settingsDelayNum);
    this.cancelKeyListener = this.document.getElementById(domIds.settingsCancelKeyListener);
    this.cancelKeyListener.isListening = false;
    this.cancelKeyListener.addEventListener("keydown", event => {
      if (!thisArg.cancelKeyListener.isListening) {
        return
      }

      const keyLabel = util.getKeyLabelFromRawLabel(event.key);

      thisArg.cancelKeyListener.value = keyLabel;
      thisArg.cancelKeyListener.classList.remove(jsuperCss.animateDarkerToDarkGreenHt);
      thisArg.cancelKeyListener.isListening = false;
      thisArg.cancelKeyListenerRecCircle.classList.toggle(jsuperCss.animateOpacity1To0);
    });
    this.cancelKeyListenerRecCircle = this.document.getElementById(domIds.settingsCancelKeyListenerRecCircle);

    this.bars.forEach(bar => bar.addEventListener("change", event => thisArg.closeOtherBars(event.target)))

    this.opSkipSwitch.addEventListener("change", this.onOpeningsSwitchChange);
    this.opSkipOrderSelector.addEventListener("change", this.onOpeningsSkipOrderChange);
    this.edSkipSwitch.addEventListener("change", this.onEndingsSwitchChange);
    this.edSkipOrderSelector.addEventListener("change", this.onEndingsSkipOrderChange);
    this.edSkipMaxNegativeButton.addEventListener("click", event => thisArg.onEndingsSkipMaxNegative(event));
    this.edSkipMaxPositiveButton.addEventListener("click", event => thisArg.onEndingsSkipMaxPositive(event));
    this.edSkipMaxField.addEventListener("click", event => thisArg.onEndingsSkipMaxFieldClick(event));
    this.edSkipMaxField.addEventListener("input", this.onEndingsSkipMaxFieldChange());
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
        thisArg.cancelKeyListener.classList.remove(jsuperCss.animateDarkerToDarkGreenHt);
        thisArg.cancelKeyListenerRecCircle.classList.remove(jsuperCss.animateOpacity1To0);
      }
    });

    // if in dev environment, hide the preload message
    if (window.JUTSUPER_DEBUG) {
      const preloadMessage = this.document.getElementById(domIds.devPreloadMessage);
      preloadMessage.classList.add(jsuperCss.devHidden);
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
   * @param {number} value 
   */
  setEndingsSkipMax(value) {
    this.edSkipMaxField.value = value;
  }

  /**
   * @param {Event} event 
   */
  onEndingsSkipMaxNegative(event) {
    if (this.edSkipMaxField.valueAsNumber < 1) {
      return;
    }

    if (Number.isNaN(this.edSkipMaxField.valueAsNumber)) {
      this.edSkipMaxField.valueAsNumber = 0;
      return;
    }

    this.edSkipMaxField.valueAsNumber -= 1;

    if (this.edSkipMaxField.valueAsNumber === 0) {
      this.edSkipMaxField.classList.add("jutsuper-hide-text");
      this.edSkipMaxField.classList.add("jutsuper-no-select");
      this.edSkipMaxField.classList.add("jutsuper-icon-infinity");
    }
    else {
      this.edSkipMaxField.classList.remove("jutsuper-hide-text");
      this.edSkipMaxField.classList.remove("jutsuper-no-select");
      this.edSkipMaxField.classList.remove("jutsuper-icon-infinity");
    }
  }

  /**
   * @param {Event} event 
   */
  onEndingsSkipMaxPositive(event) {
    if (Number.isNaN(this.edSkipMaxField.valueAsNumber)) {
      this.edSkipMaxField.valueAsNumber = 1;
      return;
    }

    this.edSkipMaxField.valueAsNumber += 1;

    if (this.edSkipMaxField.valueAsNumber === 0) {
      this.edSkipMaxField.classList.add("jutsuper-hide-text");
      this.edSkipMaxField.classList.add("jutsuper-no-select");
      this.edSkipMaxField.classList.add("jutsuper-icon-infinity");
    }
    else {
      this.edSkipMaxField.classList.remove("jutsuper-hide-text");
      this.edSkipMaxField.classList.remove("jutsuper-no-select");
      this.edSkipMaxField.classList.remove("jutsuper-icon-infinity");
    }
  }

  /**
   * @param {Event} event 
   */
  onEndingsSkipMaxFieldClick(event) {
    if (this.edSkipMaxField.valueAsNumber === 0) {
      this.edSkipMaxField.valueAsNumber = NaN;
    }
  }

  onEndingsSkipMaxFieldChange() {
    console.log("onEndingsSkipMaxFieldChange")
    if (this.edSkipMaxField.valueAsNumber > 0) {
      this.edSkipMaxField.classList.remove("jutsuper-hide-text");
      this.edSkipMaxField.classList.remove("jutsuper-no-select");
      this.edSkipMaxField.classList.remove("jutsuper-icon-infinity");
    }
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
    this.cancelKeyListener.classList.toggle(jsuperCss.animateDarkerToDarkGreenHt);
    this.cancelKeyListenerRecCircle.classList.toggle(jsuperCss.animateOpacity1To0);
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
