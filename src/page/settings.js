import { jsuperLog } from "/src/log.js";
import { jsuperErrors } from "/src/error.js";
import {
  JutSuperDomClasses as domClasses,
  JutSuperDomIds as domIds,
  JutSuperInputNames as inputNames,
} from "/src/consts.js";
import {
  JutSuperIpcFlags as ipcFlags,
  JutSuperIpcNamespaces as ipcNamespaces,
  JutSuperIpcIds as ipcIds,
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


console.debug("JutSuper: loading /src/settings.js");


/**
 * @typedef {import("/src/types/settings.d.ts").JutSuperSettingsObject} JutSuperSettingsObject
 * @typedef {import("/src/types/settings.d.ts").JutSuperSettingsObjectPartial} JutSuperSettingsObjectPartial
 * @typedef {import("/src/types/settings.d.ts").JutSuperSettingsObjectFilter} JutSuperSettingsObjectFilter
 * @typedef {import("/src/settings.js").JutSuperSettingsSkipOrderKeys} JutSuperSettingsSkipOrderKeys
 */


class JutSuperSettingsPopup {
  /**
   * @param {HTMLDivElement} root 
   */
  constructor(root) {
    this.LOCATION = JutSuperSettingsPopup.name;

    this.root = root;
    this.numberRegex = /[0-9]+/;
    this.bars = /** @type {NodeListOf<HTMLInputElement>} */ (
      this.root.querySelectorAll(`input[name="${inputNames.settingsBar}"]`)
    );
    this.opSkipSwitch = /** @type {HTMLInputElement} */ (
      this.root.querySelector("#" + domIds.settingsOpeningsSwitch)
    );
    this.opSectionBar = /** @type {HTMLLabelElement} */ (
      this.root.querySelector("#" + domIds.settingsOpeningsBarLabel)
    );
    this.opClipSection = /** @type {HTMLDivElement} */ (
      this.root.querySelector("#" + domIds.settingsOpeningsSectionClip)
    );
    this.opSkipOrderSelector = /** @type {HTMLDivElement} */ (
      this.root.querySelector("#" + domIds.settingsOpeningsSkipOrderSelector)
    );
    this.opSkipOrderAnySelector = /** @type {HTMLInputElement} */ (
      this.root.querySelector("#" + domIds.settingsOpeningsSkipOrderAny)
    );
    this.opSkipOrderFirstSelector = /** @type {HTMLInputElement} */ (
      this.root.querySelector("#" + domIds.settingsOpeningsSkipOrderFirst)
    );
    this.opSkipOrderLastSelector = /** @type {HTMLInputElement} */ (
      this.root.querySelector("#" + domIds.settingsOpeningsSkipOrderLast)
    );
    this.edSkipSwitch = /** @type {HTMLInputElement} */ (
      this.root.querySelector("#" + domIds.settingsEndingsSwitch)
    );
    this.edSectionBar = /**  @type {HTMLLabelElement} */ (
      this.root.querySelector("#" + domIds.settingsEndingsBarLabel)
    );
    this.edClipSection = /** @type {HTMLDivElement} */ (
      this.root.querySelector("#" + domIds.settingsEndingsSectionClip)
    );
    this.edSkipOrderSelector = /** @type {HTMLDivElement} */ (
      this.root.querySelector("#" + domIds.settingsEndingsSkipOrderSelector)
    );
    this.edSkipOrderAnySelector = /** @type {HTMLInputElement} */ (
      this.root.querySelector("#" + domIds.settingsEndingsSkipOrderAny)
    );
    this.edSkipOrderFirstSelector = /** @type {HTMLInputElement} */ (
      this.root.querySelector("#" + domIds.settingsEndingsSkipOrderFirst)
    );
    this.edSkipOrderLastSelector = /** @type {HTMLInputElement} */ (
      this.root.querySelector("#" + domIds.settingsEndingsSkipOrderLast)
    );
    this.edSkipMaxNegativeButton = /** @type {HTMLButtonElement} */ (
      this.root.querySelector("#" + domIds.settingsEndingsMaxSkipsNegativeButton)
    );
    this.edSkipMaxField = /** @type {HTMLInputElement} */ (
      this.root.querySelector("#" + domIds.settingsEndingsMaxSkipsField)
    );
    this.edSkipMaxPositiveButton = /** @type {HTMLButtonElement} */ (
      this.root.querySelector("#" + domIds.settingsEndingsMaxSkipsPositiveButton)
    );
    this.edFullscreenSwitch = /** @type {HTMLInputElement} */ (
      this.root.querySelector("#" + domIds.settingsEndingsFullscreenSwitch)
    );
    this.delaySlider = /** @type {HTMLInputElement} */ (
      this.root.querySelector("#" + domIds.settingsDelaySlider)
    );
    this.delaySliderTimeoutId = undefined;
    this.delayNum = /** @type {HTMLDivElement} */ (
      this.root.querySelector("#" + domIds.settingsDelayNum)
    );
    this.cancelKeyListener = /** @type {HTMLInputElement} */ (
      this.root.querySelector("#" + domIds.settingsCancelKeyListener)
    );
    this.isListeningCancelKey = false;
    this.cancelKeyListenerRecCircle = /** @type {HTMLDivElement} */ (
      this.root.querySelector("#" + domIds.settingsCancelKeyListenerRecCircle)
    );
    this.achvSoundEnabledSlider = /** @type {HTMLInputElement} */ (
      this.root.querySelector("#" + domIds.settingsAchievementSoundSwitch)
    );

    this.bars.forEach(bar => bar.addEventListener("change", event => {
      const target = /** @type {HTMLInputElement} */ (event.target);
      this.closeOtherBars(target);
    }));

    this.opSkipSwitch.addEventListener("change", event => this.onOpeningsSwitchChange(event));
    this.opSkipOrderSelector.addEventListener("change", event => this.onOpeningsSkipOrderChange(event));
    this.edSkipSwitch.addEventListener("change", event => this.onEndingsSwitchChange(event));
    this.edSkipOrderSelector.addEventListener("change", event => this.onEndingsSkipOrderChange(event));
    this.edSkipMaxNegativeButton.addEventListener("click", event => this.onEndingsSkipMaxNegative(event));
    this.edSkipMaxPositiveButton.addEventListener("click", event => this.onEndingsSkipMaxPositive(event));
    this.edSkipMaxField.addEventListener("input", event => this.onEndingsSkipMaxFieldInput(event));
    this.edSkipMaxField.addEventListener("keydown", event => this.onEndingsSkipMaxFieldKeydown(event));
    this.edFullscreenSwitch.addEventListener("change", event => this.onEndingsFullscreenSliderChange(event));
    this.delaySlider.addEventListener("input", event => this.onDelayChange(event));
    this.cancelKeyListener.addEventListener("click", event => this.onCancelRecorderClick(event));
    this.cancelKeyListener.addEventListener("keydown", event => this.onCancelRecorderKeyDown(event));
    this.achvSoundEnabledSlider.addEventListener("change", event => this.onAchievementSoundSliderChange(event));

    this.root.ownerDocument.addEventListener("mousedown", event => {
      const boundaries = this.cancelKeyListener.getBoundingClientRect();
      const isInXRange = event.clientX >= boundaries.left && event.clientX <= boundaries.right;
      const isInYRange = event.clientY >= boundaries.top && event.clientY <= boundaries.bottom;
      const isInAreaRange = isInXRange && isInYRange;

      if (!isInAreaRange) {
        this.isListeningCancelKey = false;
        this.cancelKeyListener.classList.remove(domClasses.animateDarkToDarkerGreenHt);
        this.cancelKeyListenerRecCircle.classList.remove(domClasses.animateOpacity1To0);
      }
    });

    window.jsuperSettings = new JutSuperSettings().setUndefined().get();
    /** @type {JutSuperSettingsObject} */
    this.exposedSettings = window.jsuperSettings;

    this.root.addEventListener("animationend", event => {
      if (this.isActive()) {
        return;
      }
      this.root.classList.add(domClasses.displayHidden);
    });

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
      const preloadMessage = this.root.ownerDocument.querySelector("#" + domIds.devPreloadMessage);
      preloadMessage.classList.add(domClasses.devHidden);
    }
  }

  isActive() {
    return this.root.classList.contains("jutsuper-visible");
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
    if (schema.achievementSoundEnabled !== undefined && schema.achievementSoundEnabled !== this.exposedSettings.achievementSoundEnabled) {
      this.setAchievementSoundEnabled(schema.achievementSoundEnabled);
    }
    if (schema.notifications !== undefined && schema.notifications !== this.exposedSettings.notifications) {
      if (schema.notifications.autoplayUnavailable !== undefined && schema.notifications.autoplayUnavailable !== this.exposedSettings.notifications.autoplayUnavailable) {
        if (schema.notifications.autoplayUnavailable.doShow !== undefined && schema.notifications.autoplayUnavailable.doShow !== this.exposedSettings.notifications.autoplayUnavailable.doShow) {
          this.exposedSettings.notifications.autoplayUnavailable.doShow = schema.notifications.autoplayUnavailable.doShow;
        }
      }
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
    const target = /** @type {HTMLInputElement} */ (event.target);
    const value = target.checked;

    this.exposedSettings.openings.doSkip = value;

    if (!window.JUTSUPER_DEBUG) {
      this.reqIpc.send({ openings: { doSkip: value } });
    }
  }

  /**
   * @param {boolean} value 
   * @param {boolean} [fireEvent=true]
   */
  setDoSkipOpenings(value, fireEvent=true) {
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
   * @param {boolean} [fireEvent=true] 
   */
  setOpeningsSkipOrder(value, fireEvent=true) {
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
    const target = /** @type {HTMLInputElement} */ (event.target);
    const value = target.checked;

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

    this.exposedSettings.endings.maxSkips = asNumber;
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
    const target = /** @type {HTMLInputElement} */ (event.target);
    const value = target.checked;

    this.exposedSettings.endings.doPersistFullscreen = value;

    if (!window.JUTSUPER_DEBUG) {
      this.reqIpc.send({ endings: { doPersistFullscreen: value } });
    }
  }

  /**
   * @param {boolean} value 
   * @param {boolean} [fireEvent=true]
   */
  setEndingsPersistFullscreen(value, fireEvent=true) {
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
      const target = /** @type {HTMLInputElement} */ (event.target);
      newValue = new Number(target.value).valueOf();
      this.delayNum.innerText = target.value;
      this.delaySlider.setAttribute("value", `${target.value}`);
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
    this.exposedSettings.skipDelayS = (new Number(value)).valueOf();
    const val = value !== undefined ? value : 0;
    this.delaySlider.setAttribute("value", val.toString());
    this.delayNum.innerText = value.toString();
  }

  //////////////////////////
  // Shared cancel button //
  //////////////////////////

  /**
   * @param {Event} event 
   */
  onCancelRecorderClick(event) {
    this.isListeningCancelKey = !this.isListeningCancelKey;
    this.cancelKeyListener.classList.toggle(domClasses.animateDarkToDarkerGreenHt);
    this.cancelKeyListenerRecCircle.classList.toggle(domClasses.animateOpacity1To0);
  }

  /**
   * @param {KeyboardEvent} event 
   */
  onCancelRecorderKeyDown(event) {
    if (!this.isListeningCancelKey) {
      return
    }

    const keyLabel = util.getKeyLabelFromRawLabel(event.key);

    if (!window.JUTSUPER_DEBUG) {
      this.exposedSettings.skipCancelKey = keyLabel;
      this.reqIpc.send({ skipCancelKey: keyLabel });
    }

    this.cancelKeyListener.value = keyLabel;
    this.cancelKeyListener.classList.remove(domClasses.animateDarkToDarkerGreenHt);
    this.isListeningCancelKey = false;
    this.cancelKeyListenerRecCircle.classList.toggle(domClasses.animateOpacity1To0);
  }

  /**
   * @param {string} value 
   */
  setCancelKey(value) {
    this.exposedSettings.skipCancelKey = util.getKeyLabelFromRawLabel(value);
    this.cancelKeyListener.value = util.getKeyLabelFromRawLabel(value);
  }


  //////////////////////////////
  // Achievement sound slider //
  //////////////////////////////

  /**
   * @param {Event} event
   */
  onAchievementSoundSliderChange(event) {
    const target = /** @type {HTMLInputElement} */ (event.target);
    const value = target.checked;

    this.exposedSettings.achievementSoundEnabled = value;

    if (!window.JUTSUPER_DEBUG) {
      this.reqIpc.send({ achievementSoundEnabled: value });
    }
  }

  /**
   * @param {boolean} value 
   */
  setAchievementSoundEnabled(value) {
    this.exposedSettings.achievementSoundEnabled = value;
    this.achvSoundEnabledSlider.checked = value;
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

  hide() {
    this.root.classList.remove("jutsuper-visible");
  }

  show() {
    this.root.classList.remove(domClasses.displayHidden);
    this.root.offsetHeight; // flush
    this.root.classList.add("jutsuper-visible");
  }
}


if (window.JUTSUPER_DEBUG) {
  window.jsuperSettingsPopup = new JutSuperSettingsPopup(
    /** @type {HTMLDivElement} */ (document.getElementById(domIds.settingsRoot))
  );
}
