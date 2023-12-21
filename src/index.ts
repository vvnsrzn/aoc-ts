import { writeFile, writeFileSync } from "fs";
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
  const map = new Map<number, Set<number>>();
  const lastPosition = { x: 0, y: 0 };
  for (const [, line] of data.entries()) {
    const { direction, meters } = parseInstructions(line);
    if (direction === "R") {
      const limit = lastPosition.x + meters;
      const start = lastPosition.x;
      const values = [];
      for (let i = start; i <= limit; i++) {
        values.push(i);
      }
      if (map.has(lastPosition.y)) {
        const currentValues = map.get(lastPosition.y);
        if (currentValues)
          map.set(lastPosition.y, new Set([...currentValues, ...values]));
      } else {
        map.set(lastPosition.y, new Set([...values]));
      }
      lastPosition.x = Math.max(...values);
    }
    if (direction === "L") {
      const limit = lastPosition.x - meters;
      const start = lastPosition.x;
      const values = [];
      for (let i = start; i >= limit; i--) {
        values.push(i);
      }
      if (map.has(lastPosition.y)) {
        const currentValues = map.get(lastPosition.y);
        if (currentValues)
          map.set(lastPosition.y, new Set([...currentValues, ...values]));
      } else {
        map.set(lastPosition.y, new Set([...values]));
      }
      lastPosition.x = Math.min(...values);
    }
    if (direction === "U") {
      const limit = lastPosition.y - meters;
      const start = lastPosition.y;
      for (let i = start; i >= limit; i--) {
        lastPosition.y = i;
        if (map.has(lastPosition.y)) {
          const currentValues = map.get(lastPosition.y);
          if (currentValues)
            map.set(
              lastPosition.y,
              new Set([...currentValues, lastPosition.x])
            );
        } else {
          map.set(lastPosition.y, new Set([lastPosition.x]));
        }
      }
    }
    if (direction === "D") {
      const limit = meters + lastPosition.y;
      const start = lastPosition.y;
      for (let i = start; i <= limit; i++) {
        lastPosition.y = i;
        if (map.has(lastPosition.y)) {
          const currentValues = map.get(lastPosition.y);
          if (currentValues)
            map.set(
              lastPosition.y,
              new Set([...currentValues, lastPosition.x])
            );
        } else {
          map.set(lastPosition.y, new Set([lastPosition.x]));
        }
      }
    }
  }
  let total = 0;
  map.forEach((value, key) => {
    console.log(key, value);
    total += Math.max(...value) - Math.min(...value) + 1;
  });
  return total;
}

type Direction = "U" | "D" | "L" | "R";
function parseInstructions(line: string): {
  direction: Direction;
  meters: number;
} {
  const [direction, meters] = line.split(" ") as [Direction, string];
  return { direction, meters: Number(meters) };
}
