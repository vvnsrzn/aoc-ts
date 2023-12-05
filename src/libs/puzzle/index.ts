import { cookie, day, puzzleFile, year } from "../../constants";
import { fetchInstructions, fetchPuzzle } from "../../libs/puzzle/fetch";
import consola from "consola";
import { readFileSync } from "fs";
import { chromium } from "playwright";
import {
  createDirectories,
  isChallengeFetched,
  writeInstructions,
  writePuzzle,
} from "./write";

export function readPuzzle(path = puzzleFile) {
  const file = readFileSync(path, "utf-8");
  return file.split("\n").slice(0, -1);
}

export async function fetchAndWriteChallenge() {
  if (isChallengeFetched()) {
    return;
  }
  createDirectories();
  try {
    consola.start("Récupération du challenge en cours...");
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

export async function postAnswer(candidate: number) {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.addInitScript((cookie: string) => {
    document.cookie = cookie;
  }, cookie);

  await page.goto(`https://adventofcode.com/`);
  await page.goto(`https://adventofcode.com/${year}/day/${day}`);

  await page.getByRole("textbox").fill(String(candidate));
  await page.getByRole("button", { name: "[Submit]" }).click();

  const isSuccess = page.getByText("That's the right answer!");
  const errorMessage = await page.getByRole("article").textContent();

  if (!isSuccess) {
    await page.pause();
    throw new Error(errorMessage!);
  }
}
