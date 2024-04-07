import {
  JutSuperDomClasses as domClasses,
  JutSuperDomIds as domIds,
  JutSuperInputNames as inputNames,
  JutSuperIpcDefaultNodeProps as ipcDefaultNodeProps,
  JutSuperIpcIds as ipcIds,
  JutSuperIpcSettingsKeys as ipcSettingsKeys
} from "/src/consts.js";
import {
  JutSuperIpc,
  JutSuperIpcBuilder,
  JutSuperIpcRecvParamsBuilder
} from "/src/ipc.js";
import { JutSuperSettingsSkipOrder as skipOrder } from "/src/settings.js";
import { jsuperUtil as util } from "/src/util.js";
export { JutSuperSettingsPopup };


/**
 * @typedef {import("/src/settings.js").JutSuperSettingsObject} JutSuperSettingsObject
 * @typedef {import("/src/settings.js").JutSuperSettingsSkipOrderKeys} JutSuperSettingsSkipOrderKeys
 */

class JutSuperSettingsPopup {
  /**
   * @param {Document} doc 
   */
  constructor(doc) {
    this.LOCATION = JutSuperSettingsPopup.name;
    const thisArg = this;

    this.document = doc ? doc : document;

    this.numberRegex = /[0-9]+/;

    /** @type {HTMLInputElement[]} */
    this.bars = this.document.getElementsByName(inputNames.settingsBar);
    /** @type {HTMLInputElement} */
    this.opSkipSwitch = this.document.getElementById(domIds.settingsOpeningsSwitch);
    /** @type {HTMLLabelElement} */
    this.opSectionBar = this.document.getElementById(domIds.settingsOpeningsBarLabel);
    /** @type {HTMLDivElement} */
    this.opClipSection = this.document.getElementById(domIds.settingsOpeningsSectionClip);
    /** @type {HTMLDivElement} */
    this.opSkipOrderSelector = this.document.getElementById(domIds.settingsOpeningsSkipOrderSelector);
    /** @type {HTMLInputElement} */
    this.opSkipOrderFirstSelector = this.document.getElementById(domIds.settingsOpeningsSkipOrderFirst);
    /** @type {HTMLInputElement} */
    this.opSkipOrderLastSelector = this.document.getElementById(domIds.settingsOpeningsSkipOrderLast);
    /** @type {HTMLInputElement} */
    this.edSkipSwitch = this.document.getElementById(domIds.settingsEndingsSwitch);
    /** @type {HTMLLabelElement} */
    this.edSectionBar = this.document.getElementById(domIds.settingsEndingsBarLabel);
    /** @type {HTMLDivElement} */
    this.edClipSection = this.document.getElementById(domIds.settingsEndingsSectionClip);
    /** @type {HTMLDivElement} */
    this.edSkipOrderSelector = this.document.getElementById(domIds.settingsEndingsSkipOrderSelector);
    /** @type {HTMLInputElement} */
    this.edSkipOrderFirstSelector = this.document.getElementById(domIds.settingsEndingsSkipOrderFirst);
    /** @type {HTMLInputElement} */
    this.edSkipOrderLastSelector = this.document.getElementById(domIds.settingsEndingsSkipOrderLast);
    /** @type {HTMLButtonElement} */
    this.edSkipMaxNegativeButton = this.document.getElementById(domIds.settingsEndingsMaxSkipsNegativeButton);
    /** @type {HTMLInputElement} */
    this.edSkipMaxField = this.document.getElementById(domIds.settingsEndingsMaxSkipsField);
    /** @type {HTMLButtonElement} */
    this.edSkipMaxPositiveButton = this.document.getElementById(domIds.settingsEndingsMaxSkipsPositiveButton);
    /** @type {HTMLInputElement} */
    this.edFullscreenSwitch = this.document.getElementById(domIds.settingsEndingsFullscreenSwitch);
    /** @type {HTMLInputElement} */
    this.delaySlider = this.document.getElementById(domIds.settingsDelaySlider);
    /** @type {HTMLDivElement} */
    this.delayNum = this.document.getElementById(domIds.settingsDelayNum);
    /** @type {HTMLInputElement} */
    this.cancelKeyListener = this.document.getElementById(domIds.settingsCancelKeyListener);
    this.cancelKeyListener.isListening = false;
    this.cancelKeyListener.addEventListener("keydown", event => {
      if (!thisArg.cancelKeyListener.isListening) {
        return
      }

      const keyLabel = util.getKeyLabelFromRawLabel(event.key);

      thisArg.cancelKeyListener.value = keyLabel;
      thisArg.cancelKeyListener.classList.remove(domClasses.animateDarkerToDarkGreenHt);
      thisArg.cancelKeyListener.isListening = false;
      thisArg.cancelKeyListenerRecCircle.classList.toggle(domClasses.animateOpacity1To0);
    });
    /** @type {HTMLDivElement} */
    this.cancelKeyListenerRecCircle = this.document.getElementById(domIds.settingsCancelKeyListenerRecCircle);

    this.bars.forEach(bar => bar.addEventListener("change", event => thisArg.closeOtherBars(event.target)))

    this.opSkipSwitch.addEventListener("change", event => this.onOpeningsSwitchChange(event));
    this.opSkipOrderSelector.addEventListener("change", this.onOpeningsSkipOrderChange);
    this.edSkipSwitch.addEventListener("change", event => this.onEndingsSwitchChange(event));
    this.edSkipOrderSelector.addEventListener("change", this.onEndingsSkipOrderChange);
    this.edSkipMaxNegativeButton.addEventListener("click", event => thisArg.onEndingsSkipMaxNegative(event));
    this.edSkipMaxPositiveButton.addEventListener("click", event => thisArg.onEndingsSkipMaxPositive(event));
    this.edSkipMaxField.addEventListener("input", event => this.onEndingsSkipMaxFieldInput(event));
    this.edSkipMaxField.addEventListener("keydown", event => this.onEndingsSkipMaxFieldKeydown(event));
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
        thisArg.cancelKeyListener.classList.remove(domClasses.animateDarkerToDarkGreenHt);
        thisArg.cancelKeyListenerRecCircle.classList.remove(domClasses.animateOpacity1To0);
      }
    });

    if (!window.JUTSUPER_DEBUG) {
      /** @type {JutSuperIpc} */
      this.ipc = new JutSuperIpcBuilder()
        .communicationNodeTagIs(ipcDefaultNodeProps.settingsTag)
        .communicationNodeIdIs(ipcDefaultNodeProps.settingsId)
        .identifyAs(ipcIds.page)
        .build();
      this.listenIpcChanges(true);
    }

    // if in dev environment, hide the preload message
    if (window.JUTSUPER_DEBUG) {
      const preloadMessage = this.document.getElementById(domIds.devPreloadMessage);
      preloadMessage.classList.add(domClasses.devHidden);
    }
  }

  /**
   * # Set parameters according to the object
   * @param {JutSuperSettingsObject} obj
   */
  setFromObject(obj) {
    this.setDoSkipOpenings(obj.openings.doSkip);
    this.setOpeningsSkipOrder(obj.openings.skipOrder);
    this.setDoSkipEndings(obj.endings.doSkip);
    this.setEndingsSkipOrder(obj.endings.skipOrder);
    this.setEndingsSkipMax(obj.endings.maxSkips);
    this.setEndingsPersistFullscreen(obj.endings.doPersistFullscreen);
    this.setDelay(obj.skipDelayS);
    this.setCancelKey(obj.skipCancelKey);
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

  }

  /**
   * @param {boolean} value 
   */
  setDoSkipOpenings(value) {
    console.log("setDoSkipOpenings.this", this);
    this.opSkipSwitch.checked = value;
  }

  /////////////////////////
  // Openings skip order //
  /////////////////////////

  onOpeningsSkipOrderChange() {
    
  }

  /**
   * @param {JutSuperSettingsSkipOrderKeys} value 
   */
  setOpeningsSkipOrder(value) {
    switch (value) {
      case skipOrder.firstOccurrence:
        this.opSkipOrderFirstSelector.checked = true;
        break;
      case skipOrder.lastOccurrence:
        this.opSkipOrderLastSelector.checked = true;
        break
      case null:
        this.opSkipOrderFirstSelector.checked = false;
        this.opSkipOrderLastSelector.checked = false;
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

  }

  /**
   * @param {boolean} value 
   */
  setDoSkipEndings(value) {
    this.edSkipSwitch.checked = value;
  }

  ////////////////////////
  // Endings skip order //
  ////////////////////////

  onEndingsSkipOrderChange() {
    
  }

  /**
   * @param {JutSuperSettingsSkipOrderKeys} value 
   */
  setEndingsSkipOrder(value) {
    switch (value) {
      case skipOrder.firstOccurrence:
        this.edSkipOrderFirstSelector.checked = true;
        break;
      case skipOrder.lastOccurrence:
        this.edSkipOrderLastSelector.checked = true;
        break
      case null:
        this.edSkipOrderFirstSelector.checked = false;
        this.edSkipOrderLastSelector.checked = false;
        break
    }
  }

  ///////////////////////
  // Endings max skips //
  ///////////////////////

  /**
   * @param {number | string} value 
   */
  setEndingsSkipMax(value) {
    /** @type {number} */
    let asNumber;
    /** @type {string} */
    let asString;

    if (value.constructor === Number) {
      asNumber = value;
      asString = value.toString();
    }
    else if (value.constructor === String) {
      asNumber = new Number(value).valueOf();
      asString = value;
    }

    if (Number.isNaN(asNumber) || asNumber < 0 || !asString) {
      this.edSkipMaxField.value = "0";
    }
    else {
      this.edSkipMaxField.value = asString;
    }
  }

  /**
   * @param {Event} event 
   */
  onEndingsSkipMaxNegative(event) {
    const value = new Number(this.edSkipMaxField.value).valueOf();

    if (value < 1) {
      return;
    }

    if (Number.isNaN(value)) {
      this.edSkipMaxField.value = "0";
      return;
    }

    this.edSkipMaxField.value = `${value - 1}`;

    console.log(this.edSkipMaxField.value);
  }

  /**
   * @param {Event} event 
   */
  onEndingsSkipMaxPositive(event) {
    const value = new Number(this.edSkipMaxField.value).valueOf();

    if (Number.isNaN(value)) {
      this.edSkipMaxField.value = "1";
      return;
    }

    this.edSkipMaxField.value = `${value + 1}`;

    console.log(this.edSkipMaxField.value);
  }

  /**
   * @param {Event} event 
   */
  onEndingsSkipMaxFieldInput(event) {
    /** @type {string} */
    let stringValue = this.edSkipMaxField.value;

    while (stringValue.startsWith("0")) {
      stringValue = stringValue.slice(1);
    }

    let numberMatches = stringValue.match(this.numberRegex);

    if (!numberMatches || numberMatches.length < 1) {
      this.edSkipMaxField.value = "0"
    } else {
      this.edSkipMaxField.value = numberMatches[0]
    }
  }

  /**
   * @param {KeyboardEvent} event 
   */
  onEndingsSkipMaxFieldKeydown(event) {
    if (event.key === "Enter") {
      this.edSkipMaxField.blur();
    }
  }

  onEndingsFullscreenSliderChange() {
    
  }

  ////////////////////////////////
  // Endings persist fullscreen //
  ////////////////////////////////

  /**
   * @param {boolean} value 
   */
  setEndingsPersistFullscreen(value) {
    this.edFullscreenSwitch.checked = value;
  }

  ///////////////////////
  // Shared skip delay //
  ///////////////////////

  /**
   * @param {Event | number} event 
   */
  onDelayChange(event) {
    if (typeof event === "number" || typeof event === "string") {
      this.delayNum.innerText = event.toString();
      this.delaySlider.setAttribute("value", `${event}`);
    }
    else {
      this.delayNum.innerText = event.target.value;
      this.delaySlider.setAttribute("value", `${event.target.value}`);
    }
    
    this.delayNum.classList.add(domClasses.displayHidden);
    setTimeout(() => {
      this.delayNum.classList.remove(domClasses.displayHidden);
    }, 1);
  }

  /**
   * 
   * @param {number | string} value 
   */
  setDelay(value) {
    this.delaySlider.value = value.toString();
    this.onDelayChange(value);
  }

  //////////////////////////
  // Shared cancel button //
  //////////////////////////

  /**
   * @param {Event} event 
   */
  onCancelRecorderClick(event) {
    this.cancelKeyListener.isListening = !this.cancelKeyListener.isListening;
    this.cancelKeyListener.classList.toggle(domClasses.animateDarkerToDarkGreenHt);
    this.cancelKeyListenerRecCircle.classList.toggle(domClasses.animateOpacity1To0);
  }

  /**
   * @param {string} value 
   */
  setCancelKey(value) {
    this.cancelKeyListener.value = util.getKeyLabelFromRawLabel(value);
  }

  /////////////////////////
  // IPC change listener //
  /////////////////////////

  /**
   * @param {boolean} doReadInitial
   * @returns {Promise<never>}
   */
  async listenIpcChanges(doReadInitial) {
    if (doReadInitial) {
      this.loadInitialIpcSettings();
    }

    const cfg = new JutSuperIpcRecvParamsBuilder()
      .build();
    
    for await (const evt of this.ipc.recv(cfg)) {
      jsuperLog.debug(new Error, evt);

      try {
        switch (evt.key) {
          case ipcSettingsKeys.openingsDoSkip:
            this.setDoSkipOpenings(evt.value);
            break;
          case ipcSettingsKeys.openingsSkipOrder:
            this.setOpeningsSkipOrder(evt.value);
            break;
          case ipcSettingsKeys.endingsDoSkip:
            this.setDoSkipEndings(evt.value);
            break;
          case ipcSettingsKeys.endingsSkipOrder:
            this.setEndingsSkipOrder(evt.value);
            break;
          case ipcSettingsKeys.endingsMaxSkips:
            this.setEndingsSkipMax(evt.value);
            break;
          case ipcSettingsKeys.endingsDoPersistFullscreen:
            this.setEndingsPersistFullscreen(evt.value);
            break;
          case ipcSettingsKeys.skipDelayS:
            this.setDelay(evt.value);
            break;
          case ipcSettingsKeys.skipCancelKey:
            this.setCancelKey(evt.value);
            break;
          default:
            throw jsuperErrors.unhandledCaseError({
              location: this.LOCATION,
              target: `${evt.key}=${evt.value}`
            });
        }
      } catch (e) {
        jsuperLog.error(new Error, e);
      }
    }
  }

  loadInitialIpcSettings() {
    this.setDoSkipOpenings(this.ipc.get(ipcSettingsKeys.openingsDoSkip).value);
    this.setOpeningsSkipOrder(this.ipc.get(ipcSettingsKeys.openingsSkipOrder).value);
    this.setDoSkipEndings(this.ipc.get(ipcSettingsKeys.endingsDoSkip).value);
    this.setEndingsSkipOrder(this.ipc.get(ipcSettingsKeys.endingsSkipOrder).value);
    this.setEndingsSkipMax(this.ipc.get(ipcSettingsKeys.endingsMaxSkips).value);
    this.setEndingsPersistFullscreen(this.ipc.get(ipcSettingsKeys.endingsDoPersistFullscreen).value);
    this.setDelay(this.ipc.get(ipcSettingsKeys.skipDelayS).value);
    this.setCancelKey(this.ipc.get(ipcSettingsKeys.skipCancelKey).value);
  }
}

if (window.JUTSUPER_DEBUG) {
  window.jsuperSettingsPopup = new JutSuperSettingsPopup(document);
}
