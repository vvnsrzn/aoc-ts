import { fetchAndWriteChallenge, readPuzzle } from "./libs/puzzle/index.ts";

/**
 * Fonction principale
 * Vérifie si le puzzle est bien chargé
 * Dans le cas contraire, téléchargement et écriture du puzzle
 */
async function main() {
  await fetchAndWriteChallenge();
  const data = readPuzzle();
  const res = solver(data);
  console.log({ res })
}

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.tsr
 */
export function solver(data: string[]) {
  const decoded = decipher(data[0])
  const michel = replacer(decoded)
  const patrick = counter(michel)
  return patrick
}

main();

export function decipher(input: string) {
  return input.split('').map((el, i) => {
    return i % 2 === 0 ? Array.from({ length: +el }, () => [i / 2]) : Array.from({ length: +el }, () => ["."]);
  }).flat()
}

export function replacer(list: string[][]) {
  do {
    const val = list.pop()!
    const idx = list.findIndex((el) => el[0] === ".")
    if (idx === -1) {
      if (val[0] !== ".")
        list.push(val)
      break
    }
    list[idx] = val
  } while (true);
  return list
}

export function counter(input: number[][]): number {
  let res = 0
  console.log(input[0].length)
  for (let index = 0; index < input.length; index++) {
    const element = input[index];
    res += element[0] * index
  }
  return res
}