import fs from "fs";
import { emptyDirSync } from "fs-extra";
import { globSync } from "glob";
import path from "path";
import { program } from "commander";
import { compile } from "c-preprocessor";


program
    .option("-m, --manifest <number>", "Specify manifest version (\"2\", \"3\" or \"all\")")
    .parse();


/**
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
            processedLine = line.replace("//#", "#");
        }
        else if (trimmed.startsWith("// #")) {
            processedLine = line.replace("// #", "#");
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

    if (!args.manifest) {
        return program.help();
    }

    /** @type {string} */
    const manifestVer = args.manifest;

    if (!["2", "3", "all"].includes(manifestVer)) {
        throw new Error("Only --manifest=\"2\", \"3\" or \"all\" is supported");
    }

    const manifests = [];
    if (["2", "3"].includes(manifestVer)) {
        manifests.push(manifestVer);
    }
    else if (manifestVer === "all") {
        manifests.push(...["2", "3"]);
    }

    
    const filePaths = globSync("src/**/*.*");


    for (const manVer of manifests) {
        const compilerOptions = {
            constants: {
                "MANIFEST_VER": manVer
            },
            commentEscape: false
        }
    
        const distDirName = "dist";
        const manifestTargetDirName = `manifest${manVer}`;
        const targetDirPath = path.join(distDirName, manifestTargetDirName);
    
        const devManifestFileName = `manifestV${manVer}.json`;
        const manifestFileName = "manifest.json";
    
        const localesDirName = "_locales";
    
        if (!fs.existsSync(targetDirPath)) {
            fs.mkdirSync(targetDirPath, { recursive: true });
        }
        else {
            emptyDirSync(targetDirPath);
        }
    
        for (const rawPath of filePaths) {
            const parsedPath = path.parse(rawPath);
            const parentPath = path.dirname(rawPath);
            const distParentPath = path.join(targetDirPath, parentPath);
            const distPath = path.join(distParentPath, parsedPath.name + parsedPath.ext);
    
            fs.mkdirSync(distParentPath, { recursive: true });
    
            if (parsedPath.ext !== ".js") {
                fs.cpSync(rawPath, distPath);
                continue;
            }
    
            const rawCode = fs.readFileSync(rawPath, { encoding: "utf-8" }).toString();
            const code = replaceCommentDirectives(rawCode);
    
            compile(code, compilerOptions, function (err, result) {
                if (err) {
                    throw new Error(`compile err: ${err}`);
                }
    
                fs.writeFileSync(distPath, result);
    
                console.log("compiled:", distPath)
            })
        }
    
        fs.cpSync(localesDirName, path.join(targetDirPath, localesDirName), { recursive: true });
        fs.cpSync(devManifestFileName, path.join(targetDirPath, manifestFileName));
    }
}

build();
