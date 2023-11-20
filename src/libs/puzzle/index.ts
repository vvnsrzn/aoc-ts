import { promises } from "fs";
import { filePath } from "../../constants";
import { fetchPuzzle } from "./fetch";
import { isPuzzleFetched, writePuzzle } from "./write";

export async function readPuzzle() {
  const file = await promises.readFile(filePath, "utf-8");
  return file.split("\n").slice(0, -1);
}

export async function fetchAndWritePuzzle() {
  if (!isPuzzleFetched()) {
    const puzzle = await fetchPuzzle();
    if (puzzle) writePuzzle(puzzle);
  }
}
