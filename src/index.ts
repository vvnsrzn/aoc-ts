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

function descendant(value: number, sequences: number[][]): number {
  let i = sequences.length - 1;
  let counter = value;
  do {
    const lastElement = sequences[i].slice(-1)[0];
    counter += lastElement;
    if (i === 0) {
      return counter;
    }
    i--;
  } while (i >= 0);
}

function recursive(seq: number[], pastSequences: number[][] = []) {
  if (seq.every((el) => el === seq[0])) {
    return descendant(seq[0], pastSequences);
  }

  const value = seq.reduce((acc: number[], el, i, arr) => {
    if (i < arr.length - 1) {
      acc.push(arr[i + 1] - el);
    }
    return acc;
  }, []);

  pastSequences.push(seq);
  return recursive(value, pastSequences);
}

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]) {
  let temp = 0;
  for (const line of data) {
    const seq = line.split(" ").map(Number);
    temp += recursive(seq);
  }
  return temp;
}

// main();
