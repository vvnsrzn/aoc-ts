import {
  computeSum,
  fetchAndWriteChallenge,
  readPuzzle,
  isAdjacent,
  type Coordinates,
  type NumbersMap,
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
main();

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]) {
  const numbersMap: NumbersMap[][] = [];
  const symbolsMap: Coordinates[] = [];

  for (let y = 0; y < data.length; y++) {
    const line = data[y];
    const values = line.split("");
    let temp = [];
    for (let x = 0; x <= values.length; x++) {
      const point = values[x];
      if (Number.isInteger(parseFloat(point))) {
        temp.push({ x, y, value: parseFloat(point) });
        if (x === values.length) {
          numbersMap.push(temp);
          temp = [];
        }
      } else {
        if (point === "*") {
          symbolsMap.push({ x, y });
        }
        numbersMap.push(temp);
        temp = [];
      }
    }
  }

  const result: NumbersMap[][][] = symbolsMap.map((symbol) =>
    numbersMap.filter((numbers) => isAdjacent(numbers, symbol))
  );

  const filteredResult = result.filter((el) => el.length > 1);

  const flattenedResult = filteredResult.map((el) =>
    el.map((el) => el.map((el) => el.value).join("")).map(Number)
  );

  return computeSum(
    flattenedResult.map((el) => el.reduce((prev, curr) => prev * curr))
  );
}
