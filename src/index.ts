import { computeMul, computeSum } from "./libs/math/index.ts";
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

function seq(array: string[], length: number): string[][] {
  // Recursive function to generate combinations
  function generate(current: number[], depth: number) {
    if (depth === length) {
      result.push(current);
      return;
    }

    for (const element of array) {
      generate([...current, element], depth + 1);
    }
  }

  const result: string[][] = [];
  generate([], 0);
  return result;
}

function interleave(arr, arr2) {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(`${arr[i]})`, arr2[i]);
  }
  const begin = Array(arr2.length + 1).fill('(').join('')
  return eval(begin + newArr.splice(0, newArr.length - 1).map(String).join(""))
};

const operators = ["+", "*"];

function compute(numberToReach: number, challenges: number[]): number {
  if (computeSum(challenges) === numberToReach) return numberToReach
  if (computeMul(challenges) === numberToReach) return numberToReach
  const interleaveOperators = seq(operators, challenges.length - 1)
  for (const michel of interleaveOperators) {
    const res = interleave(challenges, michel)
    if (res === numberToReach) return res
  }
  return 0
}

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]) {
  let res = 0
  for (const line of data) {
    const [numberToReach, value] = line.split(': ');
    const challenges = value.split(' ').map(Number)
    res += compute(+numberToReach, challenges)
  }
  return res;
}

// main();
