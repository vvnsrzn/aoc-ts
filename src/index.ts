import { fetchAndWriteChallenge, readPuzzle, selectMatrixColumn } from "./libs";

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

// main();

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]) {
  let result = 0;
  for (let index = 0; index < data.length; index++) {
    const col = selectMatrixColumn(data, index);
    const sorted = sorter(col);
    const res = counter(sorted);
    result += res;
  }
  return result;
}

export function sorter(data: string[]): string[] {
  return data
    .join("")
    .split("#")
    .flatMap((item) => [item, "#"])
    .slice(0, -1)
    .filter((el) => el)
    .flatMap((el) => {
      if (el.length === 0) return ["#"];
      return el.split("").sort().reverse();
    });
}

function counter(sorted: string[]): number {
  const length = sorted.length;
  return sorted.reduce((acc, curr, index) => {
    if (curr === "O") {
      acc += length - index;
    }
    return acc;
  }, 0);
}
