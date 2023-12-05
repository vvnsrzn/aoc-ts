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
// main();

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]) {
  const seeds = data[0]!.split("seeds:")[1].trimStart().split(" ").map(Number);
  const result = [];

  const converter = [];
  for (const line of data.slice(1)) {
    const str = line.split(" ").filter((v) => v);
    if (str[1] !== "map:") {
      converter.push(str);
    }
  }
  const converted = converter.map((el) => (el.length === 0 ? "*" : el));
  for (const seed of seeds) {
    let res = seed;
    let categoryTemp = 0;
    for (const [index, step] of converted.entries()) {
      let stepTemp = 0;
      if (step === "*") {
        res += categoryTemp;
        categoryTemp = 0;
      } else {
        const [start, from, values] = step.map(Number);
        const to = from + values;
        if (res > from && res < to) {
          stepTemp += start - from;
        }
      }
      categoryTemp += stepTemp;
      if (index === converted.length - 1) {
        res += categoryTemp;
        categoryTemp = 0;
      }
    }
    result.push(res);
  }

  return Math.min(...result);
}
