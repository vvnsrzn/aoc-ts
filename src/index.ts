import { fetchAndWriteChallenge, readPuzzle } from "./libs/puzzle/index.ts";

/**
 * Fonction principale
 * Vérifie si le puzzle est bien chargé
 * Dans le cas contraire, téléchargement et écriture du puzzle
 */
async function main() {
  await fetchAndWriteChallenge();
  const data = readPuzzle();
  solver(data);
}

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]) {
  const string = data[0];

  const numRegex = /mul\((\d+,\d+)\)/gm;
  const doNotRegex = /don't\(\)/gm;
  const doRegex = /do\(\)/gm;

  const numArray = [...string.matchAll(numRegex)];

  const doArray = [...string.matchAll(doRegex)].map(el => {
    return { index: el.index, instruction: "do" }
  });

  const doNotArray = [...string.matchAll(doNotRegex)].map(el => {
    return { index: el.index, instruction: "dont" }
  });

  const combinedSortedArray = [{ index: 0, instruction: "do" }, ...doArray, ...doNotArray].sort((a, b) => a.index - b.index);
  for (let i = 0; i < combinedSortedArray.length - 1; i++) {
    const current = combinedSortedArray[i];
    const next = combinedSortedArray[i + 1];
    if (current.instruction === next.instruction) {
      combinedSortedArray.splice(i + 1, 1)
      i--
    }
  }

  const mappedIndices = [...combinedSortedArray.map(el => el.index), string.length];

  const range: number[][] = [];
  for (let i = 0; i < mappedIndices.length; i += 2) {
    const chunk = mappedIndices.slice(i, i + 2);
    range.push(chunk);
  }

  function inRange(value: number): boolean {
    for (const [start, end] of range) {
      if (value > start && value < end) return true;
    }
    return false
  }

  return numArray
    .filter(el => inRange(el.index))
    .map(el => el[1])
    .map(el => el.split(","))
    .map(el => el.map(Number))
    .reduce((acc, [a, b]) => acc += a * b, 0);
}

main();

