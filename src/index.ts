import { fetchAndWriteChallenge, readPuzzle } from "./libs";

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
main();

export function hash(data: string): number {
  let res = 0;
  const line = data.split("");
  for (const item of line) {
    res += item.charCodeAt(0);
    res *= 17;
    res %= 256;
  }
  return res;
}
/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]): number {
  return data[0].split(",").reduce((acc, curr) => (acc += hash(curr)), 0);
}
