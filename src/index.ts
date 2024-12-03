import { fetchAndWriteChallenge, readPuzzle } from "./libs/puzzle/index.ts";

/**
 * Fonction principale
 * Vérifie si le puzzle est bien chargé
 * Dans le cas contraire, téléchargement et écriture du puzzle
 */
async function main() {
  await fetchAndWriteChallenge();
  const data = readPuzzle();
  // solver(data);
}

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]) {

  const string = data[0];
  const regex = /mul\((\d+,\d+)\)/gm;
  const array = [...string.matchAll(regex)];
  const res = array.map(el => el[1])
    .map(el => el.split(","))
    .map(el => el.map(Number))
    .reduce((acc, [a, b]) => acc += a * b, 0)



  return res;
}

main();
