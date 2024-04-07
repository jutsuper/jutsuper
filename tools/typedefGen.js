const OBJ = {
  /** @type {"isFullscreen"} */
  isFullscreen: "isFullscreen",
  /** @type {"isSwitchingEpisode"} */
  isSwitchingEpisode: "isSwitchingEpisode"
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