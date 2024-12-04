/**
 * @file Project builder
 */

import fs from "fs";
import { emptyDirSync } from "fs-extra";
import { globSync } from "glob";
import path from "path";
import { program } from "commander";
import { compile } from "c-preprocessor";
import archiver from "archiver";


const BLINK = "blink";
const GECKO = "gecko";
const ALL = "all";
const SUPPORTED_BROWSERS = [
  BLINK,
  GECKO
];
const SUPPORTED_BROWSERS_COMMA_SEP = (
  SUPPORTED_BROWSERS.join(",")
);
const SUPPORTED_BROWSERS_WITH_ALL_COMMA_SEP = (
  SUPPORTED_BROWSERS_COMMA_SEP + ",all"
);

const MANIFEST_FILE_NAME = "manifest.json";
const MANIFEST2_FILE_NAME = "manifestV2.json";
const MANIFEST3_FILE_NAME = "manifestV3.json";
const MANIFEST_VER_MAP = {};
MANIFEST_VER_MAP[BLINK] = 3;
MANIFEST_VER_MAP[GECKO] = 2;
const MANIFEST_FILE_MAP = {};
MANIFEST_FILE_MAP[3] = MANIFEST3_FILE_NAME;
MANIFEST_FILE_MAP[2] = MANIFEST2_FILE_NAME;

const IGNORED_EXTENSIONS = [
  ".fig"
];

/**
 * # Where extension locales are stored
 */
const LOCALES_DIR_NAME = "_locales";
/**
 * # Where to put compiled files
 */
const DIST_DIR_NAME = "dist";
/**
 * # What files to match when compiling
 */
const SRC_GLOB = "src/**/*.*";

// because any variables that share
// the same names as these const keys
// get replaced by the compiler,
// I decided to prefix them with a
// symbol that is not allowed in JS vars
const COMPILER_BROWSER_KEY = "@BROWSER";
const COMPILER_MANIFEST_KEY = "@MANIFEST";


program
  .option(
    "-b, --browser <string>",
    `Specify target browsers comma separated, no space (${SUPPORTED_BROWSERS_WITH_ALL_COMMA_SEP})`
  )
  .parse();


/**
 * # Replace `//#` or `// #` with `#`
 * 
 * Because the compiler we're using
 * does not work with `//#` and `// #`,
 * we have to replace these with just `#`.
 * 
 * Unfortunately, we can't directly
 * use `#` in code because of
 * syntax highlighting issues.
 * 
 * @param {string} code
 * @returns {string}
 */
function replaceCommentDirectives(code) {
  let output = "";
  const lines = code.split("\n");

  for (const line of lines) {
    let processedLine;
    const trimmed = line.trim();

    if (trimmed.startsWith("//#")) {
      processedLine = line.replace(/^(\/\/#)/, "#");
    }
    else if (trimmed.startsWith("// #")) {
      processedLine = line.replace(/^(\/\/ #)/, "#");
    }
    else {
      processedLine = line;
    }

    if (output) {
      output += "\n";
    }

    output += processedLine;
  }

  return output;
}

function build() {
  const args = program.opts();

  if (!args.browser) {
    return program.help();
  }

  /** @type {string} */
  const rawBrowsers = args.browser;
  /** @type {string[]} */
  let browsers = rawBrowsers.split(",");

  if (browsers.includes(ALL)) {
    browsers = SUPPORTED_BROWSERS;
  } else {
    // check if all browsers in the list are supported
    for (const browser of browsers) {
      if (!SUPPORTED_BROWSERS.includes(browser)) {
        throw new Error(
          `--browser flag should only contain ${SUPPORTED_BROWSERS_COMMA_SEP}`
        );
      }
    }
  }
  
  const srcFilePathsUnfiltered = globSync(SRC_GLOB);
  const srcFilePaths = [];

  for (const filePath of srcFilePathsUnfiltered) {
    const filePathParsed = path.parse(filePath);
    if (IGNORED_EXTENSIONS.includes(filePathParsed.ext)) {
      continue;
    }

    srcFilePaths.push(filePath);
  }

  for (const browser of browsers) {
    /**
     * Get manifest version for the current browser
     * @type {number}
     */
    const manifestVer = MANIFEST_VER_MAP[browser];
    /**
     * Get manifest file for the manifest version
     * @type {string}
     */
    const manifestFile = MANIFEST_FILE_MAP[manifestVer];

    const compilerOptions = {
      constants: {},
      commentEscape: false
    };
    compilerOptions.constants[COMPILER_BROWSER_KEY] = browser;
    compilerOptions.constants[COMPILER_MANIFEST_KEY] = manifestVer.toString();
  
    // DIST_DIR_NAME/targetBrowser
    const targetDirPath = path.join(DIST_DIR_NAME, browser);
    const targetPackedPath = path.join(DIST_DIR_NAME, `${browser}.zip`);

    if (fs.existsSync(targetPackedPath)) {
      fs.unlinkSync(targetPackedPath);
    }
  
    if (!fs.existsSync(targetDirPath)) {
      fs.mkdirSync(targetDirPath, { recursive: true });
    }
    else {
      emptyDirSync(targetDirPath);
    }
  
    for (const rawSrcFilePath of srcFilePaths) {
      /**
       * # Parse the path, get an object
       * 
       * @example
       * if (rawSrcFilePath === "src/storage.js") {
       *   const obj = {
       *     base: "storage.js",
       *     dir: "src",
       *     ext: ".js",
       *     name: "storage",
       *     root: ""
       *   };
       *   console.assert(parsedSrcPath === obj)
       * }
       */
      const parsedSrcPath = path.parse(rawSrcFilePath);
      /**
       * # Get path to the directory containing the file
       * 
       * @example
       * if (rawSrcFilePath === "src/storage.js") {
       *   console.assert(pathToParentDirOfFile === "src")
       * }
       * 
       * if (rawSrcFilePath === "src/background/background.js") {
       *   console.assert(pathToParentDirOfFile === "src/background")
       * }
       */
      const pathToParentDirOfFile = path.dirname(rawSrcFilePath);
      /**
       * # Get target dist path for the current folder path
       * 
       * @example
       * if (
       *   targetDirPath === "dist/gecko" &&
       *   pathToParentDirOfFile === "src"
       * ) {
       *   console.assert(distParentPath === "dist/gecko/src")
       * }
       * 
       * if (
       *   targetDirPath === "dist/blink" &&
       *   pathToParentDirOfFile === "src/background"
       * ) {
       *   console.assert(distParentPath === "dist/blink/src/background")
       * }
       */
      const distParentPath = path.join(targetDirPath, pathToParentDirOfFile);
      /**
       * # Get the final dist file path
       * 
       * @example
       * if (
       *   distParentPath === "dist/gecko/src" &&
       *   parsedSrcPath.name === "storage" &&
       *   parsedSrcPath.ext === ".js"
       * ) {
       *   console.assert(distPath === "dist/gecko/src/storage.js")
       * }
       * 
       * if (
       *   distParentPath === "dist/blink/src/background" &&
       *   parsedSrcPath.name === "background" &&
       *   parsedSrcPath.ext === ".js"
       * ) {
       *   console.assert(distPath === "dist/blink/src/background/background.js")
       * }
       */
      const distPath = path.join(distParentPath, parsedSrcPath.name + parsedSrcPath.ext);
  
      fs.mkdirSync(distParentPath, { recursive: true });
  
      // if current file extension is not ".js"
      if (parsedSrcPath.ext !== ".js") {
        // we just copy it to the target directory,
        // nothing we can process in it
        fs.cpSync(rawSrcFilePath, distPath);
        continue;
      }
  
      // read code in the file
      const rawCode = fs.readFileSync(rawSrcFilePath, { encoding: "utf-8" }).toString();
      // replace commented directives (`//#`, `// #`)
      // with regular directives (`#`)
      const code = replaceCommentDirectives(rawCode);
  
      compile(code, compilerOptions, function (err, result) {
        if (err) {
          throw new Error(`compile err: ${err}`);
        }
  
        fs.writeFileSync(distPath, result);
  
        console.log("compiled:", distPath);
      })
    }
  
    fs.cpSync(LOCALES_DIR_NAME, path.join(targetDirPath, LOCALES_DIR_NAME), { recursive: true });
    fs.cpSync(manifestFile, path.join(targetDirPath, MANIFEST_FILE_NAME));

    const archiveOutput = fs.createWriteStream(targetPackedPath);
    const archive = archiver("zip", {
      zlib: { level: 9 }
    });

    archive.pipe(archiveOutput);
    archive.directory(targetDirPath, false);
    archive.finalize();
  }
}

build();
