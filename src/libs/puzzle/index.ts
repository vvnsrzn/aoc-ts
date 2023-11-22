import { promises } from "fs";
import { puzzleFile } from "../../constants";
import { fetchInstructions, fetchPuzzle } from "./fetch";
import {
  createDirectories,
  isChallengeFetched,
  writeInstructions,
  writePuzzle,
} from "./write";

export async function readPuzzle() {
  const file = await promises.readFile(puzzleFile, "utf-8");
  return file.split("\n").slice(0, -1);
}

export async function fetchAndWriteChallenge() {
  if (isChallengeFetched()) {
    return;
  }
  createDirectories();
  try {
    const [puzzle, instructions] = await Promise.all([
      fetchPuzzle(),
      fetchInstructions(),
    ]);
    if (puzzle) writePuzzle(puzzle);
    if (instructions) writeInstructions(instructions);
  } catch (error) {
    console.error(error);
  }
}
