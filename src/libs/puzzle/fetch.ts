import { cookie, day, year } from "../../constants";

export async function fetchPuzzle() {
  const res = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
    headers: { cookie },
  });
  return await res.text();
}

export async function fetchInstructions() {
  const res = await fetch(`https://adventofcode.com/${year}/day/${day}`, {
    headers: { cookie },
  });
  return await res.text();
}
