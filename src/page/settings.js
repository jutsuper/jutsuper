import { jsuperLog } from "/src/log.js";
import { jsuperErrors } from "/src/error.js";
import {
  JutSuperDomClasses as domClasses,
  JutSuperDomIds as domIds,
  JutSuperInputNames as inputNames,
  JutSuperIpcIds as ipcIds
} from "/src/consts.js";
import {
  JutSuperIpcFlags as ipcFlags,
  JutSuperIpcNamespaces as ipcNamespaces,
  JutSuperIpc,
  JutSuperIpcBuilder,
  JutSuperIpcRspParamsBuilder
} from "/src/ipc.js";
import {
  JutSuperSettings,
  JutSuperSettingsSkipOrder as skipOrder
} from "/src/settings.js";
import { AsyncLock } from "/src/lock.js";
import { jsuperUtil as util } from "/src/util.js";
export { JutSuperSettingsPopup };


/**
 * @typedef {import("/src/types/settings.d.ts").JutSuperSettingsObject} JutSuperSettingsObject
 * @typedef {import("/src/types/settings.d.ts").JutSuperSettingsObjectPartial} JutSuperSettingsObjectPartial
 * @typedef {import("/src/types/settings.d.ts").JutSuperSettingsObjectFilter} JutSuperSettingsObjectFilter
 * @typedef {import("/src/settings.js").JutSuperSettingsSkipOrderKeys} JutSuperSettingsSkipOrderKeys
 */

class JutSuperSettingsPopup {
  /**
   * @param {Document} doc 
   */
  constructor(doc) {
    this.LOCATION = JutSuperSettingsPopup.name;
    const self = this;

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
    this.opSkipOrderAnySelector = this.document.getElementById(domIds.settingsOpeningsSkipOrderAny);
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
    this.edSkipOrderAnySelector = this.document.getElementById(domIds.settingsEndingsSkipOrderAny);
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
    this.delaySliderTimeoutId = undefined;
    /** @type {HTMLDivElement} */
    this.delayNum = this.document.getElementById(domIds.settingsDelayNum);
    /** @type {HTMLInputElement} */
    this.cancelKeyListener = this.document.getElementById(domIds.settingsCancelKeyListener);
    this.cancelKeyListener.isListening = false;
    /** @type {HTMLDivElement} */
    this.cancelKeyListenerRecCircle = this.document.getElementById(domIds.settingsCancelKeyListenerRecCircle);

    this.bars.forEach(bar => bar.addEventListener("change", event => self.closeOtherBars(event.target)))

    this.opSkipSwitch.addEventListener("change", event => this.onOpeningsSwitchChange(event));
    this.opSkipOrderSelector.addEventListener("change", event => this.onOpeningsSkipOrderChange(event));
    this.edSkipSwitch.addEventListener("change", event => this.onEndingsSwitchChange(event));
    this.edSkipOrderSelector.addEventListener("change", event => this.onEndingsSkipOrderChange(event));
    this.edSkipMaxNegativeButton.addEventListener("click", event => self.onEndingsSkipMaxNegative(event));
    this.edSkipMaxPositiveButton.addEventListener("click", event => self.onEndingsSkipMaxPositive(event));
    this.edSkipMaxField.addEventListener("input", event => this.onEndingsSkipMaxFieldInput(event));
    this.edSkipMaxField.addEventListener("keydown", event => this.onEndingsSkipMaxFieldKeydown(event));
    this.edFullscreenSwitch.addEventListener("change", event => this.onEndingsFullscreenSliderChange(event));
    this.delaySlider.addEventListener("input", event => self.onDelayChange(event));
    this.cancelKeyListener.addEventListener("click", event => self.onCancelRecorderClick(event));
    this.cancelKeyListener.addEventListener("keydown", event => this.onCancelRecorderKeyDown(event));

    this.document.addEventListener("mousedown", event => {
      const boundaries = self.cancelKeyListener.getBoundingClientRect();
      const isInXRange = event.clientX >= boundaries.left && event.clientX <= boundaries.right;
      const isInYRange = event.clientY >= boundaries.top && event.clientY <= boundaries.bottom;
      const isInAreaRange = isInXRange && isInYRange;

      if (!isInAreaRange) {
        self.cancelKeyListener.isListening = false;
        self.cancelKeyListener.classList.remove(domClasses.animateDarkToDarkerGreenHt);
        self.cancelKeyListenerRecCircle.classList.remove(domClasses.animateOpacity1To0);
      }
    });

    window.jsuperSettings = new JutSuperSettings().setUndefined().get();
    /** @type {JutSuperSettingsObject} */
    this.exposedSettings = window.jsuperSettings;

    if (!window.JUTSUPER_DEBUG) {
      /**
       * # Requesting IPC
       * @type {JutSuperIpc<
       *   JutSuperSettingsObjectPartial,
       *   JutSuperSettingsObjectPartial,
       *   JutSuperSettingsObjectFilter
       * >}
       */
      this.reqIpc = new JutSuperIpcBuilder()
        .namespaceIs(ipcNamespaces.settings)
        .identifyAs(ipcIds.page)
        .ignoreWithoutAnyOfTheseFlags([ipcFlags.rsp])
        .sendWithTheseFlags([ipcFlags.req])
        .build();
      /**
       * # Responding IPC
       * @type {JutSuperIpc<
       *   JutSuperSettingsObjectPartial,
       *   JutSuperSettingsObjectPartial,
       *   JutSuperSettingsObjectFilter
       * >}
       */
      this.rspIpc = new JutSuperIpcBuilder()
        .namespaceIs(ipcNamespaces.settings)
        .identifyAs(ipcIds.page)
        .ignoreWithoutAnyOfTheseFlags([ipcFlags.req])
        .sendWithTheseFlags([ipcFlags.rsp])
        .build();
      
      this.ipcRecvReady = new AsyncLock({ oneTime: true });
      
      this.listenIpcChanges();
    }

    // if in dev environment, hide the preload message
    if (window.JUTSUPER_DEBUG) {
      const preloadMessage = this.document.getElementById(domIds.devPreloadMessage);
      preloadMessage.classList.add(domClasses.devHidden);
    }
  }

  /**
   * @param {JutSuperSettingsObjectPartial} schema 
   * @returns {void}
   */
  setFromSchema(schema) {
    if (schema.openings !== undefined && schema.openings !== this.exposedSettings.openings) {
      if (schema.openings.doSkip !== undefined && schema.openings.doSkip !== this.exposedSettings.openings.doSkip) {
        this.setDoSkipOpenings(schema.openings.doSkip);
      }
      if (schema.openings.skipOrder !== undefined && schema.openings.skipOrder !== this.exposedSettings.openings.skipOrder) {
        this.setOpeningsSkipOrder(schema.openings.skipOrder);
      }
    }
    if (schema.endings !== undefined && schema.endings !== this.exposedSettings.endings) {
      if (schema.endings.doSkip !== undefined && schema.endings.doSkip !== this.exposedSettings.endings.doSkip) {
        this.setDoSkipEndings(schema.endings.doSkip);
      }
      if (schema.endings.skipOrder !== undefined && schema.endings.skipOrder !== this.exposedSettings.endings.skipOrder) {
        this.setEndingsSkipOrder(schema.endings.skipOrder);
      }
      if (schema.endings.maxSkips !== undefined && schema.endings.maxSkips !== this.exposedSettings.endings.maxSkips) {
        this.setEndingsSkipMax(schema.endings.maxSkips);
      }
      if (schema.endings.doPersistFullscreen !== undefined && schema.endings.doPersistFullscreen !== this.exposedSettings.endings.doPersistFullscreen) {
        this.setEndingsPersistFullscreen(schema.endings.doPersistFullscreen);
      }
    }
    if (schema.skipDelayS !== undefined && schema.skipDelayS !== this.exposedSettings.skipDelayS) {
      this.setDelay(schema.skipDelayS);
    }
    if (schema.skipCancelKey !== undefined && schema.skipCancelKey !== this.exposedSettings.skipCancelKey) {
      this.setCancelKey(schema.skipCancelKey);
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
    const value = event.target.checked;

    this.exposedSettings.openings.doSkip = value;

    if (!window.JUTSUPER_DEBUG) {
      this.reqIpc.send({ openings: { doSkip: value } });
    }
  }

  /**
   * @param {boolean} value 
   */
  setDoSkipOpenings(value) {
    this.exposedSettings.openings.doSkip = value;
    this.opSkipSwitch.checked = value;
  }

  /////////////////////////
  // Openings skip order //
  /////////////////////////

  /**
   * @param {Event} event 
   */
  onOpeningsSkipOrderChange(event) {
    const value = this.getSelectedOpeningsSkipOrder();

    this.exposedSettings.openings.skipOrder = value;

    if (!window.JUTSUPER_DEBUG) {
      this.reqIpc.send({ openings: { skipOrder: value } });
    }
  }

  /**
   * @param {JutSuperSettingsSkipOrderKeys} value 
   */
  setOpeningsSkipOrder(value) {
    this.exposedSettings.openings.skipOrder = value;

    switch (value) {
      case skipOrder.anyOccurrence:
        this.opSkipOrderAnySelector.checked = true;
        break;
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

  getSelectedOpeningsSkipOrder() {
    if (this.opSkipOrderAnySelector.checked) {
      return skipOrder.anyOccurrence
    }
    else if (this.opSkipOrderFirstSelector.checked) {
      return skipOrder.firstOccurrence
    }
    else if (this.opSkipOrderLastSelector.checked) {
      return skipOrder.lastOccurrence
    }
  }

  /////////////
  // Endings //
  /////////////

  /**
   * @param {Event} event 
   */
  onEndingsSwitchChange(event) {
    const value = event.target.checked;

    this.exposedSettings.endings.doSkip = value;

    if (!window.JUTSUPER_DEBUG) {
      this.reqIpc.send({ endings: { doSkip: value } });
    }
  }

  /**
   * @param {boolean} value 
   */
  setDoSkipEndings(value) {
    this.exposedSettings.endings.doSkip = value;
    this.edSkipSwitch.checked = value;
  }

  ////////////////////////
  // Endings skip order //
  ////////////////////////

  /**
   * @param {Event} event 
   */
  onEndingsSkipOrderChange(event) {
    const value = this.getSelectedEndingsSkipOrder();

    this.exposedSettings.endings.skipOrder = value;

    if (!window.JUTSUPER_DEBUG) {
      this.reqIpc.send({ endings: { skipOrder: value } });
    }
  }

  /**
   * @param {JutSuperSettingsSkipOrderKeys} value 
   */
  setEndingsSkipOrder(value) {
    this.exposedSettings.endings.skipOrder = value;

    switch (value) {
      case skipOrder.anyOccurrence:
        this.edSkipOrderAnySelector.checked = true;
        break;
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

  getSelectedEndingsSkipOrder() {
    if (this.edSkipOrderAnySelector.checked) {
      return skipOrder.anyOccurrence
    }
    else if (this.edSkipOrderFirstSelector.checked) {
      return skipOrder.firstOccurrence
    }
    else if (this.edSkipOrderLastSelector.checked) {
      return skipOrder.lastOccurrence
    }
  }

  ///////////////////////
  // Endings max skips //
  ///////////////////////

  /**
   * @param {number} value 
   */
  onEndingsSkipMaxChange(value) {
    this.exposedSettings.endings.maxSkips = value;

    if (!window.JUTSUPER_DEBUG) {
      this.reqIpc.send({ endings: { maxSkips: value } });
    }
  }

  /**
   * @param {number | string} value 
   */
  setEndingsSkipMax(value) {
    if (["undefined", "null"].includes(typeof value)) {
      return;
    }

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
      asString = "0"
      asNumber = 0;
    }
    else {
      this.edSkipMaxField.value = asString;
    }

    this.onEndingsSkipMaxChange(asNumber);
  }

  /**
   * @param {Event} event 
   */
  onEndingsSkipMaxNegative(event) {
    const curValue = new Number(this.edSkipMaxField.value).valueOf();

    if (curValue < 1) {
      return;
    }

    if (Number.isNaN(curValue)) {
      this.edSkipMaxField.value = "0";
      return;
    }

    const newValue = curValue - 1;
    this.edSkipMaxField.value = `${newValue}`;

    this.onEndingsSkipMaxChange(newValue);
  }

  /**
   * @param {Event} event 
   */
  onEndingsSkipMaxPositive(event) {
    const curValue = new Number(this.edSkipMaxField.value).valueOf();

    if (Number.isNaN(curValue)) {
      this.edSkipMaxField.value = "1";
      return;
    }

    const newValue = curValue + 1;
    this.edSkipMaxField.value = `${newValue}`;

    this.onEndingsSkipMaxChange(newValue);
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

    let newValue;
    let numberMatches = stringValue.match(this.numberRegex);

    if (!numberMatches || numberMatches.length < 1) {
      this.edSkipMaxField.value = "0";
      newValue = 0;
    } else {
      this.edSkipMaxField.value = numberMatches[0];
      newValue = new Number(numberMatches[0]).valueOf();
    }

    this.onEndingsSkipMaxChange(newValue);
  }

  /**
   * @param {KeyboardEvent} event 
   */
  onEndingsSkipMaxFieldKeydown(event) {
    if (event.key === "Enter") {
      this.edSkipMaxField.blur();
    }
  }

  ////////////////////////////////
  // Endings persist fullscreen //
  ////////////////////////////////

  /**
   * @param {Event} event
   */
  onEndingsFullscreenSliderChange(event) {
    const value = event.target.checked;

    this.exposedSettings.endings.doPersistFullscreen = value;

    if (!window.JUTSUPER_DEBUG) {
      this.reqIpc.send({ endings: { doPersistFullscreen: value } });
    }
  }

  /**
   * @param {boolean} value 
   */
  setEndingsPersistFullscreen(value) {
    this.exposedSettings.endings.doPersistFullscreen = value;
    this.edFullscreenSwitch.checked = value;
  }

  ///////////////////////
  // Shared skip delay //
  ///////////////////////

  /**
   * @param {Event | number | string} event 
   */
  onDelayChange(event) {
    if (["undefined", "null"].includes(typeof event)) {
      return;
    }

    let newValue;

    if (typeof event === "number" || typeof event === "string") {
      newValue = new Number(event).valueOf();
      this.delayNum.innerText = event.toString();
      this.delaySlider.setAttribute("value", `${event}`);
    }
    else {
      newValue = new Number(event.target.value).valueOf();
      this.delayNum.innerText = event.target.value;
      this.delaySlider.setAttribute("value", `${event.target.value}`);
    }
    
    if (!window.JUTSUPER_DEBUG) {
      // send this setting to backend with a delay
      // of 0.5s, because user may play with the slider
      // really quickly, which will impact performance
      // if sending immediately
      if (typeof this.delaySliderTimeoutId !== "undefined") {
        clearTimeout(this.delaySliderTimeoutId);
      }
      
      this.delaySliderTimeoutId = setTimeout(() => {
        this.exposedSettings.skipDelayS = newValue;
        this.reqIpc.send({ skipDelayS: newValue });
      }, 500);
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
    const val = value !== undefined ? value : 0;
    this.delaySlider.value = val.toString();
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
    this.cancelKeyListener.classList.toggle(domClasses.animateDarkToDarkerGreenHt);
    this.cancelKeyListenerRecCircle.classList.toggle(domClasses.animateOpacity1To0);
  }

  /**
   * @param {Event} event 
   */
  onCancelRecorderKeyDown(event) {
    if (!this.cancelKeyListener.isListening) {
      return
    }

    const keyLabel = util.getKeyLabelFromRawLabel(event.key);

    if (!window.JUTSUPER_DEBUG) {
      this.exposedSettings.skipCancelKey = keyLabel;
      this.reqIpc.send({ skipCancelKey: keyLabel });
    }

    this.cancelKeyListener.value = keyLabel;
    this.cancelKeyListener.classList.remove(domClasses.animateDarkToDarkerGreenHt);
    this.cancelKeyListener.isListening = false;
    this.cancelKeyListenerRecCircle.classList.toggle(domClasses.animateOpacity1To0);
  }

  /**
   * @param {string} value 
   */
  setCancelKey(value) {
    this.exposedSettings.skipCancelKey = util.getKeyLabelFromRawLabel(value);
    this.cancelKeyListener.value = util.getKeyLabelFromRawLabel(value);
  }

  /////////////////////////
  // IPC change listener //
  /////////////////////////

  /**
   * @returns {Promise<never>}
   */
  async listenIpcChanges() {
    const loc = `${this.LOCATION}@${this.listenIpcChanges.name}`;
    const builder = /** @type {JutSuperIpcRspParamsBuilder<JutSuperSettingsObjectFilter>} */ (
      new JutSuperIpcRspParamsBuilder()
    );
    const cfg = builder
      .build();

    this.ipcRecvReady.resolve();
    jsuperLog.debug(`${loc}: ipcRecvReady lock resolved`);
    
    for await (const evt of this.rspIpc.recv(cfg)) {
      jsuperLog.debug(`${loc} got event:`, evt);
      this.setFromSchema(evt);
    }

    throw jsuperErrors.unexpectedEndError({
      location: loc
    });
  }
}


if (window.JUTSUPER_DEBUG) {
  window.jsuperSettingsPopup = new JutSuperSettingsPopup(document);
}
