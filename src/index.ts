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

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]) {
  const games = [];
  for (const line of data) {
    const [cardId, game] = line.split(":");
    const [a, b] = game.split("|");

    const left = a
      .trim()
      .split(" ")
      .filter((v) => v);
    const right = b
      .trim()
      .split(" ")
      .filter((v) => v);

    const points = left.filter((el) => right.includes(el));

    function toto(points) {
      if (points.length === 0) return 0;
      if (points.length === 1) return 1;
      let res = 1;
      for (let i = 0; i < points.length - 1; i++) {
        res = res * 2;
      }
      return res;
    }

    const temp = {
      cardId: cardId.replace("Card ", ""),
      left,
      right,
      points: toto(points),
    };
    games.push(temp);
  }
  return games.map((el) => el.points).reduce((prev, curr) => prev + curr);
}

// main();
