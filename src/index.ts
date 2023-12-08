import { fetchAndWriteChallenge, readPuzzle } from "./libs";
import { writeFile } from "fs";

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

function splitter(data: string): [hand: string, score: number] {
  const [hand, score] = data.split(" ");
  return [hand, Number(score)];
}

export function getHand(hand: string): {
  score: number;
  remaining?: string;
} {
  const map: Map<string, number> = hand
    .split("")
    .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

  const sortedMap = new Map([...map].sort((a, b) => b[1] - a[1]));
  const entries = sortedMap.entries();

  for (const [card, value] of entries) {
    if (value === 5) {
      return { score: 7, remaining: hand };
    }
    if (value === 4) {
      // carré
      return { score: 6, remaining: hand };
    }
    if (value === 3) {
      let next;
      do {
        next = entries.next();
        if (next.value && next.value[1] === 2) {
          return {
            score: 5,
            remaining: hand,
          }; // full-house
        }
      } while (next.done !== true);
      // brelan
      return { score: 4, remaining: hand };
    }
    if (value === 2) {
      let next;
      do {
        next = entries.next();
        if (next.value && next.value[1] === 2) {
          // deux paires
          return {
            score: 3,
            remaining: hand,
          };
        }
      } while (next.done !== true);
      // une paire
      return { score: 2, remaining: hand };
    }
  }
  // highest card
  return { score: 1, remaining: hand };
}

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */

export function gameSorter(data: string[]) {
  return data.toSorted((a, b) => {
    const [handA] = splitter(a);
    const [handB] = splitter(b);
    const { score: scoreA, remaining: remainingA } = getHand(handA);
    const { score: scoreB, remaining: remainingB } = getHand(handB);
    const cardsA = cardsSorter(remainingA);
    const cardsB = cardsSorter(remainingB);
    return scoreA - scoreB || cardsA - cardsB;
  });
}

export function solver(data: string[]): number {
  const res = gameSorter(data);
  return res.reduce((acc, curr, index) => {
    const [, score] = splitter(curr);
    return (acc += score * (index + 1));
  }, 0);
}

const heads = [
  {
    key: "J",
    value: 1,
  },
  {
    key: "A",
    value: 14,
  },
  {
    key: "K",
    value: 13,
  },
  {
    key: "Q",
    value: 12,
  },
  {
    key: "T",
    value: 10,
  },
] as const;

export function parseCard(card: string): string {
  const toto = parseFloat(card);
  const tutu = heads.find((el) => el.key === card)?.value;
  const res = tutu ? tutu : toto;
  return res.toLocaleString("fr-FR", { minimumIntegerDigits: 2 });
}

export function cardsSorter(cards: string | undefined): number {
  if (!cards) {
    return 0;
  }
  const array = cards.split("");
  if (array.length === 1) {
    return Number(parseCard(cards));
  }
  const result = [];
  for (const card of array) {
    result.push(parseCard(card));
  }
  return parseFloat(result.join(""));
}
