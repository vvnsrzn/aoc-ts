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
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]) {
  const instructions = []
  const sequences = []
  for (const line of data) {
    if (line.includes('|')) instructions.push(line.split('|').map(Number));
    if (line.includes(',')) sequences.push(line.split(',').map(Number));
  }

  console.log("before:", sequences.length)
  for (let i = 0; i < sequences.length; i++) {
    const sequence = sequences[i]
    for (const instruction of instructions) {
      for (let index = 0; index < sequences.length; index++) {
        const page = sequence[index];
        if (page === instruction[0]) {
          const sequenceToCheck = sequence.slice(0, index)
          if (sequenceToCheck.includes(instruction[1])) {
            sequences.splice(sequences.indexOf(sequence), 1)
          }
        }
      }
    }
  }
  console.log("after:", sequences.length)
  return sequences.map(el => el[el.length / 2 | 0]).reduce((acc, curr) => acc + curr, 0)
}

main();
