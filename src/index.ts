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
 * @function absDifference
 * @param a number
 * @param b number
 * @returns The absolute difference between a and b
 * @example absDifference(1, 2) => 1
 * @example absDifference(2, 1) => 1
 */
export function absDifference(a: number, b: number) {
  return Math.abs(a - b);
}

/**
 * @function permutation
 * @param element number[]
 * @returns The permutation of the element
 * @example permutation([1, 2]) => [[2], [1]]
 * @example permutation([1, 2, 3]) => [[2, 3], [1, 3], [1, 2]]
 */
export function permutation(element: number[]): number[][] {
  const result = [];
  if (element.length === 0) return [[]];
  for (let i = 0; i < element.length; i++) {
    const remaining = element.slice(0, i).concat(element.slice(i + 1));
    result.push(remaining)
  }
  return result;
}

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]) {
  const matrix = []
  for (const line of data) {
    matrix.push(line.split(' ').map(Number));
  }
  let res = matrix.length;
  for (const element of matrix) {
    if (!permutation(element).map(check).some(Boolean)) res--;
  }
  return res;
}

main();

function check(element: number[]) {
  const lineSigns = [];
  for (let index = 0; index < element.length - 1; index++) {
    const current = element[index];
    const next = element[index + 1];

    const temp = absDifference(current, next);

    // Max diff
    if (temp > 3) return false

    // Equal
    if (temp === 0) return false

    // Check if asc or desc
    const sign = Math.sign(current - next);
    lineSigns.push(sign)
    const ascOrDesc = lineSigns.every(v => v >= 0) || lineSigns.every(v => v <= 0);
    if (!ascOrDesc) return false
  }
  return true
}