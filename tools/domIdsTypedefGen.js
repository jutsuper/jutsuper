(function() {
  /** @type {string[]} */
  const ids = [];

  function getIds(node) {
    if (node.id && !ids.includes(node.id)) {
      ids.push(node.id)
    }
    for (const child of node.children) {
      if (child.id && !ids.includes(node.id)) {
        ids.push(child.id)
      }
      if (child.hasChildNodes()) {
        for (const innerChild of child.children) {
          getIds(innerChild)
        }
      }
    }
  }

  /**
   * @param {[string]} remPrefix 
   */
  function genObjFromIds(remPrefix) {
    /** @type {string[]} */
    const objLines = [];
    /** @type {string[]} */
    const typedefLines = [];
    /** @type {string[]} */
    const possibleValuesTypedefLines = [];

    const seps = ["-", "_"];

    for (const id of ids) {
      let varNameNoPrefix = id;
      /** @type {string[]} */
      let casedCharsNoPrefix = [];
      if (remPrefix && id.startsWith(remPrefix)) {
        varNameNoPrefix = id.slice(remPrefix.length);
      }

      let prevVarNameChar = undefined;
      for (const varNameChar of varNameNoPrefix) {
        if (seps.includes(varNameChar)) {
          prevVarNameChar = varNameChar;
          continue;
        }

        if (seps.includes(prevVarNameChar)) {
          casedCharsNoPrefix.push(varNameChar.toUpperCase());
          prevVarNameChar = varNameChar;
          continue;
        }

        casedCharsNoPrefix.push(varNameChar);
        prevVarNameChar = varNameChar;
      }

      let varName = casedCharsNoPrefix.join("");

      objLines.push(`/** @type {"${id}"} */`);
      objLines.push(`${varName}: "${id}",`);

      typedefLines.push(` * @property {"${id}"} ${varName}`)

      possibleValuesTypedefLines.push(` *   "${id}" |`);
    }

    console.log(objLines.join("\n"));
    console.log(typedefLines.join("\n"));
    console.log(possibleValuesTypedefLines.join("\n"));
  }

  getIds(document.getElementById("jutsuper-settings-root"));
  genObjFromIds("jutsuper-");
})()
