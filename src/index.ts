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
type Coordinate = { x: number; y: number };
export function solver(data: string[]) {
  const map = new Map<number, Set<Coordinate>>();
  const lastPosition = { x: 0, y: 0 };
  for (const [, line] of data.entries()) {
    const { direction, meters } = parseInstructions(line);
    if (direction === "R") {
      const limit = lastPosition.x + meters;
      const start = lastPosition.x;
      const values: Coordinate[] = [];
      for (let i = start; i <= limit; i++) {
        values.push({ x: i, y: lastPosition.y });
      }
      if (map.has(lastPosition.y)) {
        const currentValues = map.get(lastPosition.y);
        if (currentValues)
          map.set(
            lastPosition.y,
            new Set([...currentValues, ...values].sort((a, b) => a.x - b.x))
          );
      } else {
        map.set(lastPosition.y, new Set([...values]));
      }
      lastPosition.x = limit;
    }
    if (direction === "L") {
      const limit = lastPosition.x - meters;
      const start = lastPosition.x;
      const values: Coordinate[] = [];
      for (let i = start; i >= limit; i--) {
        values.push({ x: i, y: lastPosition.y });
      }
      if (map.has(lastPosition.y)) {
        const currentValues = map.get(lastPosition.y);
        if (currentValues)
          map.set(
            lastPosition.y,
            new Set([...currentValues, ...values].sort((a, b) => a.x - b.x))
          );
      } else {
        map.set(lastPosition.y, new Set([...values]));
      }
      lastPosition.x = limit;
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
              new Set(
                [...currentValues, { x: lastPosition.x, y: i }].sort(
                  (a, b) => a.x - b.x
                )
              )
            );
        } else {
          map.set(lastPosition.y, new Set([{ x: lastPosition.x, y: i }]));
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
              new Set(
                [...currentValues, { x: lastPosition.x, y: i }].sort(
                  (a, b) => a.x - b.x
                )
              )
            );
        } else {
          map.set(lastPosition.y, new Set([{ x: lastPosition.x, y: i }]));
        }
      }
    }
  }
  let total = 0;
  // map.forEach((value) => {
  //   total += Math.max(...value) - Math.min(...value) + 1;
  // });
  const draw: string[][] = [];
  map.forEach((value, key) => {
    const temp: string[] = [];
    value.forEach((el) => {
      console.log(key, el);
    });
    total += countItems(temp);
    draw.push(temp);
  });
  writeFileSync("toto.json", JSON.stringify(draw));
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

function countItems(array: string[]) {
  let count = 0;

  const temp = array.slice(array.indexOf("#"));
  for (const _ of temp) {
    count++;
  }

  return count;
}
