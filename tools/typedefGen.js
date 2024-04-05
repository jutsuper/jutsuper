const OBJ = {
  /** @type {"jutsuper-vjs-button"} */
  vjsButton: "jutsuper-vjs-button",
  /** @type {"jutsuper-vjs-button-icon"} */
  vjsButtonIcon: "jutsuper-vjs-button-icon",

  /** Dev */
  /** @type {"jutsuper-dev-preload-message"} */
  devPreloadMessage: "jutsuper-dev-preload-message",

  /** Settings */
  /** @type {"jutsuper-vjs-settings-container"} */
  vjsSettingsContainer: "jutsuper-vjs-settings-container",
  /** @type {"jutsuper-vjs-settings-area"} */
  vjsSettingsArea: "jutsuper-vjs-settings-area",
  /** @type {"jutsuper-vjs-settings-clip-area"} */
  vjsSettingsClipArea: "jutsuper-vjs-settings-clip-area",
  /** @type {"jutsuper-settings-root"} */
  settingsRoot: "jutsuper-settings-root",
  /** @type {"jutsuper-settings-skip-header-icon"} */
  settingsSkipHeaderIcon: "jutsuper-settings-skip-header-icon",
  /** @type {"jutsuper-settings-openings-bar-label"} */
  settingsOpeningsBarLabel: "jutsuper-settings-openings-bar-label",
  /** @type {"jutsuper-settings-openings-switch"} */
  settingsOpeningsSwitch: "jutsuper-settings-openings-switch",
  /** @type {"jutsuper-settings-openings-slider"} */
  settingsOpeningsSlider: "jutsuper-settings-openings-slider",
  /** @type {"jutsuper-settings-openings-bar-dropdown-icon"} */
  settingsOpeningsBarDropdownIcon: "jutsuper-settings-openings-bar-dropdown-icon",
  /** @type {"jutsuper-settings-openings-section-clip"} */
  settingsOpeningsSectionClip: "jutsuper-settings-openings-section-clip",
  /** @type {"jutsuper-settings-openings-section"} */
  settingsOpeningsSection: "jutsuper-settings-openings-section",
  /** @type {"jutsuper-settings-openings-skip-order-selector"} */
  settingsOpeningsSkipOrderSelector: "jutsuper-settings-openings-skip-order-selector",
  /** @type {"jutsuper-settings-openings-skip-order-first"} */
  settingsOpeningsSkipOrderFirst: "jutsuper-settings-openings-skip-order-first",
  /** @type {"jutsuper-settings-openings-skip-order-last"} */
  settingsOpeningsSkipOrderLast: "jutsuper-settings-openings-skip-order-last",
  /** @type {"jutsuper-settings-endings-bar-label"} */
  settingsEndingsBarLabel: "jutsuper-settings-endings-bar-label",
  /** @type {"jutsuper-settings-endings-switch"} */
  settingsEndingsSwitch: "jutsuper-settings-endings-switch",
  /** @type {"jutsuper-settings-endings-slider"} */
  settingsEndingsSlider: "jutsuper-settings-endings-slider",
  /** @type {"jutsuper-settings-endings-bar-dropdown-icon"} */
  settingsEndingsBarDropdownIcon: "jutsuper-settings-endings-bar-dropdown-icon",
  /** @type {"jutsuper-settings-endings-section-clip"} */
  settingsEndingsSectionClip: "jutsuper-settings-endings-section-clip",
  /** @type {"jutsuper-settings-endings-section"} */
  settingsEndingsSection: "jutsuper-settings-endings-section",
  /** @type {"jutsuper-settings-endings-skip-order-selector"} */
  settingsEndingsSkipOrderSelector: "jutsuper-settings-endings-skip-order-selector",
  /** @type {"jutsuper-settings-endings-skip-order-first"} */
  settingsEndingsSkipOrderFirst: "jutsuper-settings-endings-skip-order-first",
  /** @type {"jutsuper-settings-endings-skip-order-last"} */
  settingsEndingsSkipOrderLast: "jutsuper-settings-endings-skip-order-last",
  /** @type {"jutsuper-settings-endings-max-skips-positive-button"} */
  settingsEndingsMaxSkipsPositiveButton: "jutsuper-settings-endings-max-skips-positive-button",
  /** @type {"jutsuper-settings-endings-max-skips-field"} */
  settingsEndingsMaxSkipsField: "jutsuper-settings-endings-max-skips-field",
  /** @type {"jutsuper-settings-endings-max-skips-negative-button"} */
  settingsEndingsMaxSkipsNegativeButton: "jutsuper-settings-endings-max-skips-negative-button",
  /** @type {"jutsuper-settings-endings-fullscreen-switch"} */
  settingsEndingsFullscreenSwitch: "jutsuper-settings-endings-fullscreen-switch",
  /** @type {"jutsuper-settings-persist-fullscreen-slider"} */
  settingsPersistFullscreenSlider: "jutsuper-settings-persist-fullscreen-slider",
  /** @type {"jutsuper-settings-delay-slider"} */
  settingsDelaySlider: "jutsuper-settings-delay-slider",
  /** @type {"jutsuper-settings-delay-num"} */
  settingsDelayNum: "jutsuper-settings-delay-num",
  /** @type {"jutsuper-settings-cancel-key-listener"} */
  settingsCancelKeyListener: "jutsuper-settings-cancel-key-listener",
  /** @type {"jutsuper-settings-cancel-key-listener-rec-circle"} */
  settingsCancelKeyListenerRecCircle: "jutsuper-settings-cancel-key-listener-rec-circle",
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
  outLines.push(" * @typedef Type");
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