import { existsSync, mkdirSync, writeFile } from "fs";
import { NodeHtmlMarkdown } from "node-html-markdown";
import {
  puzzleFile,
  inputsFolder,
  year,
  instructionsFile,
} from "../../constants";

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
  writeFile(puzzleFile, data, (err) => {
    if (err) throw err;
    else {
      console.log("Puzzle écrit avec succès");
    }
  });
}

export function writeInstructions(data: string) {
  const markdown = NodeHtmlMarkdown.translate(data).split("##")[1];
  writeFile(instructionsFile, markdown, (err) => {
    if (err) throw err;
    else {
      console.log("Instructions écrites avec succès");
    }
  });
}
