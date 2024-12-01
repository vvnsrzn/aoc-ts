import { fetchAndWriteChallenge, readPuzzle } from "./libs/puzzle/index.ts";
import { selectMatrixColumn } from "./libs/matrix/index.ts";
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
  const matrix = []
  for (const line of data) {
    matrix.push(line.split("   "));
  }
  const leftList = selectMatrixColumn(matrix, 0).map(Number).toSorted((a, b) => a - b)
  const rightList = selectMatrixColumn(matrix, 1).map(Number).toSorted((a, b) => a - b)
  const res = [];
  for (const leftItem of leftList) {
    res.push([leftItem, rightList.filter(el => el === leftItem).length]);
  }
  return res.reduce((prev, curr) => prev + curr[0] * curr[1], 0);
}

main();
