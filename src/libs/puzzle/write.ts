import {
  inputsFolder,
  instructionsFile,
  puzzleFile,
  specFile,
  year,
} from "../../constants";
import consola from "consola";
import { existsSync, mkdirSync, writeFile } from "fs";
import jsdom from "jsdom";
import { NodeHtmlMarkdown } from "node-html-markdown";

function createDirectoryIfNotExists(path: string) {
  if (!existsSync(path)) {
    mkdirSync(path);
  }
}

export function isChallengeFetched() {
  return existsSync(puzzleFile) && existsSync(instructionsFile);
}

export function createDirectories() {
  createDirectoryIfNotExists(`${inputsFolder}`);
  createDirectoryIfNotExists(`${inputsFolder}/${year}`);
}

export function writePuzzle(data: string) {
  writeFile(puzzleFile, data, () => {
    consola.success("Puzzle");
  });
}

export function writeInstructions(data: string) {
  const { document } = new jsdom.JSDOM(data).window;
  //  instructions
  const articles = document.getElementsByTagName("article");
  let instructions = "";
  for (const article of articles) {
    instructions += `\n\n\n${NodeHtmlMarkdown.translate(article.innerHTML)}`;
  }
  writeFile(instructionsFile, instructions, () => {
    consola.success("Instructions");
  });

  //  specs
  const specs = document.getElementsByTagName("code");
  for (let i = 0; i < specs.length; i++) {
    const spec = specs[i];
    if (spec.innerHTML.split("\n").length > 2) {
      writeFile(specFile(i + 1), spec.innerHTML, () => {
        consola.success(`Spec ${i + 1}`);
      });
    }
  }

  consola.box("🎄 Good Luck 🎅");
}
