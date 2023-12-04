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
  for (const line of data) {
    const [cardIdRaw, gameRaw] = line.split(":");
    const cardId = Number(cardIdRaw.replace("Card ", ""));

    const [left, right] = gameRaw.split("|").map(splitter);
    const points = left.reduce((result: number[], el) => {
      if (right.includes(el)) {
        result.push(cardId + result.length + 1);
      }
      return result;
    }, []);

    for (let j = 1; j <= points.length; j++) {
      const currentCard = cardId + j;
      for (const element of res) {
        if (element === cardId) {
          res.push(currentCard); // copied cards
        }
      }
      res.push(currentCard); // winning card
    }
    res.push(cardId); // original card
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
