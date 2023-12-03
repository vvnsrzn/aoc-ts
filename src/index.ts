import { computeSum, fetchAndWriteChallenge, readPuzzle } from "./libs";

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

type Color = {
  blue: number;
  red: number;
  green: number;
};

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]) {
  const result = [];
  for (const str of data) {
    const gamePoints = {
      blue: 0,
      red: 0,
      green: 0,
    } satisfies Color;
    const [, right] = str.split(":");
    const sets = right.split(";").map((el) => el.split(","));
    for (const set of sets) {
      const data: {
        [x: keyof Color]: number;
      }[] = set.map((el) => {
        const [count, color] = el.trimStart().split(" ");
        return { [color]: Number(count) };
      });
      for (const element of data) {
        const [[color, value]] = Object.entries(element);
        if (gamePoints[color] < value) {
          gamePoints[color] = value;
        }
      }
    }
    result.push(Object.values(gamePoints).reduce((prev, curr) => prev * curr));
  }
  return computeSum(result);
}

// main();
