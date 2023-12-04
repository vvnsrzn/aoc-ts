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
  const res = [];
  const games = [];
  for (const line of data) {
    const [cardIdRaw, gameRaw] = line.split(":");
    const [a, b] = gameRaw.split("|");
    const cardId = Number(cardIdRaw.replace("Card ", ""));
    const left = splitter(a);
    const right = splitter(b);
    const points = left
      .filter((el) => right.includes(el))
      .map((_, i) => cardId + i + 1);

    const game = { cardId, points };
    games.push(game);
  }

  const firstWinningCard = games.find((el) => el.points.length > 0);
  if (!firstWinningCard) {
    return;
  }
  for (const game of games) {
    for (let j = firstWinningCard.cardId; j <= game.points.length; j++) {
      const currentCard = game.cardId + j;
      for (const element of res) {
        if (element === game.cardId) {
          res.push(currentCard);
        }
      }
      res.push(currentCard);
    }
    res.push(game.cardId);
  }
  return res.length;
}

function splitter(a: string) {
  return a
    .trim()
    .split(" ")
    .filter((v) => v);
}
// main();
