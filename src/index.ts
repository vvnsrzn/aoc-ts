import { computeSum, fetchAndWriteChallenge, readPuzzle } from "./libs";

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
export function solver(data: string[]): number {
  const result: number[] = [];
  for (const dataElement of data) {
    const element = dataElement
      .split("")
      .filter((e) => {
        return parseFloat(e);
      })
      .map(Number);

    const temp = Number([element[0], element[element.length - 1]].join(""));

    result.push(temp);
  }
  console.log(computeSum(result));
  return computeSum(result);
}

main();
