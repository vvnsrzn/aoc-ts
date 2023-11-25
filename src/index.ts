import { fetchAndWriteChallenge, readPuzzle } from "./libs";

/**
 * Fonction principale
 * Vérifie si le puzzle est bien chargé
 * Dans le cas contraire, téléchargement et écriture du puzzle
 */
async function main() {
  await fetchAndWriteChallenge();
  const data = await readPuzzle();
  solver(data);
}

function splitter(el: string): { left: string; right: string } {
  const [left, right] = el.split(" ");
  return { left, right };
}

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]): number {
  // écris ton code ici !
  let res = 0;
  for (const el of data) {
    const { left, right } = splitter(el);
    if (left === "A") {
      // *** Rock ***
      if (right === "Y") {
        // DRAW
        // Rock
        res += 1;
        res += 3;
      } else if (right === "X") {
        // LOSE
        // Scissors
        res += 3;
      } else if (right === "Z") {
        // WIN
        // Paper
        res += 2;
        res += 6;
      }
    } else if (left === "B") {
      // *** Paper ***
      if (right === "Y") {
        // DRAW
        // Paper
        res += 2;
        res += 3;
      } else if (right === "X") {
        // LOSE
        // Rock
        res += 1;
      } else if (right === "Z") {
        // WIN
        // Scissors
        res += 3;
        res += 6;
      }
    } else if (left === "C") {
      // *** Scissors ***
      if (right === "Y") {
        // DRAW
        // Scissors
        res += 3;
        res += 3;
      } else if (right === "X") {
        // LOSE
        // Paper
        res += 2;
      } else if (right === "Z") {
        // WIN
        // Rock
        res += 1;
        res += 6;
      }
    }
  }
  return res;
}

main();
