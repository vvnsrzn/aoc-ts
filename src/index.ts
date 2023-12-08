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
  major: string;
  remaining?: string;
} {
  const map: Map<string, number> = hand
    .split("")
    .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

  const sortedMap = new Map([...map].sort((a, b) => b[1] - a[1]));
  const entries = sortedMap.entries();

  for (const [card, value] of entries) {
    if (value === 5) {
      return { score: 7, major: card, remaining: "" };
    }
    if (value === 4) {
      // carré
      return { score: 6, major: card, remaining: hand.replaceAll(card, "") };
    }
    if (value === 3) {
      let next;
      do {
        next = entries.next();
        if (next.value && next.value[1] === 2) {
          return {
            score: 5,
            major: card,
            remaining: hand.replaceAll(card, ""),
          }; // full-house
        }
      } while (next.done !== true);
      // brelan
      return { score: 4, major: card, remaining: hand.replaceAll(card, "") };
    }
    if (value === 2) {
      let next;
      do {
        next = entries.next();
        if (next.value && next.value[1] === 2) {
          const remaining = entries.next().value[0];
          // deux paires
          return {
            score: 3,
            major: hand.replace(remaining, ""),
            remaining,
          };
        }
      } while (next.done !== true);
      // une paire
      return { score: 2, major: card, remaining: hand.replaceAll(card, "") };
    }
  }
  // highest card
  return { score: 1, major: "0", remaining: hand };
}

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */

export function gameSorter(data: string[]) {
  return data.toSorted((a, b) => {
    const [handA] = splitter(a);
    const [handB] = splitter(b);
    const {
      score: scoreA,
      remaining: remainingA,
      major: majorA,
    } = getHand(handA);
    const {
      score: scoreB,
      remaining: remainingB,
      major: majorB,
    } = getHand(handB);

    const newLocalA = cardsSorter(remainingA);
    const newLocalB = cardsSorter(remainingB);
    const delta = newLocalA - newLocalB;

    if (scoreA < 3 && scoreB < 3) {
      console.log(handA, handB);
    }

    return (
      scoreA - scoreB ||
      cardsSorter(majorA) - cardsSorter(majorB) ||
      cardsSorter(remainingA) - cardsSorter(remainingB)
    );
  });
}

export function solver(data: string[]): number {
  const res = gameSorter(data);
  const file = [];
  for (const r of res) {
    file.push(r.split(" ")[0]);
  }
  writeFile("toto.json", JSON.stringify(file), () => {});

  const total = res.reduce((acc, curr, index) => {
    const [, score] = splitter(curr);
    return (acc += score * (index + 1));
  }, 0);
  return total;
}

const heads = [
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
    key: "J",
    value: 11,
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
  result.sort((a, b) => Number(b) - Number(a));
  return parseFloat(result.join(""));
}
