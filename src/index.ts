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
  const sequenceInstructions = []
  const numberSequenceCollection = []
  for (const line of data) {
    if (line.includes('|')) sequenceInstructions.push(line.split('|').map(Number));
    if (line.includes(',')) numberSequenceCollection.push(line.split(',').map(Number));
  }

  const invalidSequencesMap = new Map<number[], number[][]>()

  for (const sequence of numberSequenceCollection) {
    for (const [leftPage, rightPage] of sequenceInstructions) {
      for (let index = 0; index < sequence.length; index++) {
        const page = sequence[index];
        if (page === leftPage) {
          const sequenceToCheck = sequence.slice(0, index)
          if (sequenceToCheck.includes(rightPage)) {
            if (invalidSequencesMap.has(sequence)) {
              invalidSequencesMap.get(sequence)?.push([leftPage, rightPage])
            } else {
              invalidSequencesMap.set(sequence, [[leftPage, rightPage]])
            }
          }
        }
      }
    }
  }

  const intermediaire = new Set([]) as Set<number[]>
  for (const [key, values] of invalidSequencesMap) {
    console.log('---------------------')
    for (const [leftPage, rightPage] of values) {
      for (let index = 0; index < key.length; index++) {
        const element = key[index]
        if (element === rightPage) {
          console.log({ key, element, leftPage, rightPage })
          key.splice(index, 1)
          const leftPageIndex = key.indexOf(leftPage)
          /** && element is not present to the right of key */;
          key.splice(leftPageIndex + 1, 0, rightPage)
        }
      }
      intermediaire.add(key)
    }
  }
  console.log({ intermediaire })
  const result = [...intermediaire].map(el => el[el.length / 2 | 0]).reduce((acc, curr) => acc + curr, 0)
  return result
}

main();
