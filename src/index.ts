import consola from "consola";
import {
  computeMatrixSum,
  computeSum,
  fetchAndWriteChallenge,
  readPuzzle,
} from "./libs";

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

const letters = [
  {
    digits: ["one", "1"],
    number: 1,
  },
  {
    digits: ["two", "2"],
    number: 2,
  },
  {
    digits: ["three", "3"],
    number: 3,
  },
  {
    digits: ["four", "4"],
    number: 4,
  },
  {
    digits: ["five", "5"],
    number: 5,
  },
  {
    digits: ["six", "6"],
    number: 6,
  },
  {
    digits: ["seven", "7"],
    number: 7,
  },
  {
    digits: ["eight", "8"],
    number: 8,
  },
  {
    digits: ["nine", "9"],
    number: 9,
  },
];

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]): number {
  const result: number[] = [];
  for (const str of data) {
    const res = [];
    const leftCandidate = [];
    const rightCandidate = [];
    const array = str.split("");
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      leftCandidate.push(element);
      const substring = leftCandidate.join("");
      const left = newFunction(substring)!;
      if (left) {
        res.push(left);
        break;
      }
    }

    for (let j = array.length - 1; j >= 0; j--) {
      const element = array[j];
      rightCandidate.push(element);
      const substring = rightCandidate.join("").split("").reverse().join("");
      const right = newFunction(substring)!;
      if (right) {
        res.push(right);
        break;
      }
    }

    result.push(Number(res.join("")));
  }

  return computeSum(result);
}

function newFunction(substring: string) {
  for (const { digits, number } of letters) {
    for (const digit of digits) {
      if (substring.includes(digit)) {
        return number;
      }
    }
  }
}
// main();
