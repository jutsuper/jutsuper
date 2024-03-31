const OBJ = {
  /** Common */
  /** @type {"jutsuper-fullscreen"} */
  fullscreen: "jutsuper-fullscreen",
  /** @type {"jutsuper-inset-icon"} */
  insetIcon: "jutsuper-inset-icon",
  /** @type {"jutsuper-top-index"} */
  topIndex: "jutsuper-top-index",
  /** @type {"jutsuper-visibility-hidden"} */
  visibilityHidden: "jutsuper-visibility-hidden",
  /** @type {"jutsuper-display-hidden"} */
  displayHidden: "jutsuper-display-hidden",
  /** @type {"jutsuper-no-pointer-events"} */
  noPointerEvents: "jutsuper-no-pointer-events",
  /** @type {"jutsuper-no-select"} */
  noSelect: "jutsuper-no-select",
  /** @type {"jutsuper-flex-float-to-right"} */
  flexFloatToRight: "jutsuper-flex-float-to-right",

  /** Animations */
  /** @type {"jutsuper-animate-bottom-to-top"} */
  animateBottomToTop: "jutsuper-animate-bottom-to-top",
  /** @type {"jutsuper-animate-small-top-to-bottom"} */
  animateSmallTopToBottom: "jutsuper-animate-small-top-to-bottom",
  /** @type {"jutsuper-animate-darker-to-dark-green-ht"} */
  animateDarkerToDarkGreenHt: "jutsuper-animate-darker-to-dark-green-ht",
  /** @type {"jutsuper-animate-opacity-1-to-0"} */
  animateOpacity1To0: "jutsuper-animate-opacity-1-to-0",

  /** VideoJS related */
  /** @type {"jutsuper-vjs-icon"} */
  vjsIcon: "jutsuper-vjs-icon",
  /** @type {"jutsuper-vjs-settings-container"} */
  vjsSettingsContainer: "jutsuper-vjs-settings-container",
  /** @type {"jutsuper-vjs-settings-area-sized"} */
  vjsSettingsAreaSized: "jutsuper-vjs-settings-area-sized",
  /** @type {"jutsuper-vjs-settings-area"} */
  vjsSettingsArea: "jutsuper-vjs-settings-area",
  /** @type {"jutsuper-vjs-settings-clip-area"} */
  vjsSettingsClipArea: "jutsuper-vjs-settings-clip-area",

  /** Settings popup */
  /** @type {"jutsuper-settings-frame"} */
  settingsFrame: "jutsuper-settings-frame",
  /** @type {"jutsuper-settings-heading"} */
  settingsHeading: "jutsuper-settings-heading",
  /** @type {"jutsuper-settings-section-bar"} */
  settingsSectionBar: "jutsuper-settings-section-bar",
  /** @type {"jutsuper-settings-section-clip-area"} */
  settingsSectionClipArea: "jutsuper-settings-section-clip-area",
  /** @type {"jutsuper-settings-section-area"} */
  settingsSectionArea: "jutsuper-settings-section-area",
  /** @type {"jutsuper-settings-outer-section-area"} */
  settingsOuterSectionArea: "jutsuper-settings-outer-section-area",
  /** @type {"jutsuper-settings-dropdown-icon"} */
  settingsDropdownIcon: "jutsuper-settings-dropdown-icon",
  /** @type {"jutsuper-settings-grid-container"} */
  settingsGridContainer: "jutsuper-settings-grid-container",
  /** @type {"jutsuper-settings-grid-1-row"} */
  settingsGrid1Row: "jutsuper-settings-grid-1-row",
  /** @type {"jutsuper-settings-grid-2-rows"} */
  settingsGrid2Rows: "jutsuper-settings-grid-2-rows",
  /** @type {"jutsuper-settings-grid-3-rows"} */
  settingsGrid3Rows: "jutsuper-settings-grid-3-rows",
  /** @type {"jutsuper-settings-grid-2-cols"} */
  settingsGrid2Cols: "jutsuper-settings-grid-2-cols",
  /** @type {"jutsuper-settings-grid-4-cols"} */
  settingsGrid4Cols: "jutsuper-settings-grid-4-cols",
  /** @type {"jutsuper-settings-order-first-icon"} */
  settingsOrderFirstIcon: "jutsuper-settings-order-first-icon",
  /** @type {"jutsuper-settings-order-last-icon"} */
  settingsOrderLastIcon: "jutsuper-settings-order-last-icon",

  /** Toggle slider */
  /** @type {"jutsuper-slider-switch"} */
  sliderSwitch: "jutsuper-slider-switch",
  /** @type {"jutsuper-slider-bg-area"} */
  sliderBgArea: "jutsuper-slider-bg-area",

  /** Range slider */
  /** @type {"jutsuper-range"} */
  range: "jutsuper-range",

  /** Radio buttons */
  /** @type {"jutsuper-radio-container"} */
  radioContainer: "jutsuper-radio-container",
  /** @type {"jutsuper-radio"} */
  radio: "jutsuper-radio",

  /** Basic button */
  /** @type {"jutsuper-button"} */
  button: "jutsuper-button",

  /** REC icon */
  /** @type {"jutsuper-record-icon"} */
  recordIcon: "jutsuper-record-icon"
}

function main() {
  const entries = Object.entries(OBJ);

  let outLines = [];

  const objProperties = [];
  const objValues = [];

  let i = 0;
  for (const [key, value] of entries) {
    const isLast = (entries.length - 1) === i;
    objProperties.push(` * @property {"${value}"} ${key}`);
    if (isLast) {
      objValues.push(` *   "${value}"`)
    }
    else {
      objValues.push(` *   "${value}" |`)
    }
    
    i+=1;
  }

  outLines.push("/**");
  outLines.push(" * @typedef Obj");
  outLines.push(...objProperties);
  outLines.push(" *");
  outLines.push(" * @typedef {(");
  outLines.push(...objValues);
  outLines.push(" * )} Keys");
  outLines.push(" */");

  const outText = outLines.join("\n");
  console.log(outText);
}

main();