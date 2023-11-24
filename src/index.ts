import { computeSum, fetchAndWriteChallenge, readPuzzle } from "./libs";

/**
 * Fonction principale
 * Vérifie si le puzzle est bien chargé
 * Dans le cas contraire, téléchargement et écriture du puzzle
 */
async function main() {
  await fetchAndWriteChallenge();
  const data = await readPuzzle();
  solver(data);
}

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]): number {
  // écris ton code ici !
  const res: number[] = [];
  let temp: number[] = [];
  for (const el of data) {
    if (el === "") {
      res.push(computeSum(temp));
      temp = [];
    } else {
      temp.push(Number(el));
    }
  }
  // Réponse A
  // return Math.max(...res);

  // Réponse B
  return new Int32Array(res)
    .sort()
    .slice(res.length - 3, res.length)
    .reduce((prev, curr) => prev + curr);
}

main();
