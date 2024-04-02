const OBJ = {
  /**
   * # Class name that the player has when in fullscreen
   * 
   * Used to determine if player is currently
   * in fullscreen, so when changing episodes
   * the fullscreen mode could be set
   * to the same state.
   * 
   * @type {"vjs-fullscreen"}
   */
  vjsFullscreen: "vjs-fullscreen",
  /**
   * # Class name of a fullscreen button in a player
   * @type {"vjs-fullscreen-control"}
   */
  vjsFullscreenControl: "vjs-fullscreen-control",
  /**
   * # Class name of a subtitles button in a player
   * @type {"vjs-subtitles-button"}
   */
  vjsSubtitlesButton: "vjs-subtitles-button",
  /**
   * # Class name of a share button in a player
   * @type {"vjs-share-control"}
   */
  vjsShareControl: "vjs-share-control",
  /**
   * # Class name of a thumbnail holder in a player
   * @type {"vjs-thumbnail-holder"}
   */
  vjsThumbnailHolder: "vjs-thumbnail-holder",
  /**
   * # Class name of an icon placeholder
   * @type {"vjs-icon-placeholder"}
   */
  vjcIconPlaceholder: "vjs-icon-placeholder",
  /**
   * # Class name of a page header
   *
   * Used to get the page header and apply "display: none"
   * style to it (basically, hiding it)
   * so it won't overlap with a player
   * in a custom fullscreen mode
   * 
   * @type {"z_fix_header"}
   */
  zFixHeader: "z_fix_header",
  /**
   * # Class name of info panel with a search bar
   * 
   * Used to get the page info panel and apply "display: none"
   * style to it (basically, hiding it)
   * so it won't overlap with a player
   * in a custom fullscreen mode
   * 
   * @type {"info_panel"}
   */
  infoPanel: "info_panel",
  /**
   * # Class name of a footer
   * 
   * Used to get the page footer and apply "display: none"
   * style to it (basically, hiding it)
   * so it won't overlap with a player
   * in a custom fullscreen mode
   * 
   * @type {"footer"}
   */
  footer: "footer"
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