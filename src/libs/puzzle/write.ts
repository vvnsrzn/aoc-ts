import { existsSync, mkdirSync, writeFile } from "fs";
import { filePath, inputsFolder, year } from "../../constants";

function createDirectoryIfNotExists(path: string) {
  if (!existsSync(path)) {
    mkdirSync(path);
  }
}

export function isPuzzleFetched() {
  return existsSync(filePath);
}

export function writePuzzle(data: string) {
  createDirectoryIfNotExists(`${inputsFolder}`);
  createDirectoryIfNotExists(`${inputsFolder}/${year}`);
  writeFile(filePath, data, (err) => {
    if (err) throw err;
    else {
      console.log("Fichier écrit avec succès");
      console.log("GL&HF");
    }
  });
}
