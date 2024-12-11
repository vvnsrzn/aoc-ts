import { fetchAndWriteChallenge, readPuzzle } from "./libs/puzzle/index.ts";
import { type Directions, isAdjacent, selectMatrixColumn, selectMatrixRow } from "./libs/matrix/index.ts";
import { absDifference } from "./libs/math/index.ts";
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

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export type Tile = "." | "#" | Guard | "@"
type Guard = ">" | "<" | "^" | "v"

function isGuard(pos: Tile): boolean {
  return [">", "<", "^", "v"].includes(pos)
}

function nextGuard(guard: Guard): Guard {
  switch (guard) {
    case "^":
      return ">"
    case "<":
      return "^"
    case ">":
      return "v"
    case "v":
      return "<"
  }
}

type Position = { x: number, y: number }

export function getObstacle(current: Tile[], pos: Tile, x: number, y: number): Position {
  let obstacle = { x: NaN, y: NaN };
  for (const element of current.join('').matchAll(/#/gm)) {
    if (pos === ">" && element.index > x) {
      obstacle = { x: element.index, y }
      break
    }
    if (pos === "<" && element.index < x) {
      obstacle = { x: element.index, y }
    }
    if (pos === "^" && element.index < y) {
      obstacle = { x, y: element.index }
    }
    if (pos === "v" && element.index > y) {
      obstacle = { x, y: element.index }
      break
    }
  }
  return obstacle
}

export function solver(data: string[]) {
  const matrix: Tile[][] = []
  for (const line of data) {
    const splittedLines = line.split('') as Tile[]
    matrix.push(splittedLines)
  }
  let writer = 0
  for (let y = 0; y < matrix.length; y++) {
    const row = matrix[y];
    for (let x = 0; x < row.length; x++) {
      const pos = row[x];
      if (isGuard(pos)) {
        writer += 1;
        try {
          ({ y, x } = newFunction(pos, matrix, y, x))
        } catch (error) {
          console.log({ error })
          // throw new Error("Error")
          return 42
        }
        writeFile(`yolo-${writer}`, matrix.join('\n').replaceAll(',', ''), err => err)
      }
    }
  }
  return 1
}

function newFunction(pos: string, matrix: Tile[][], y: number, x: number) {
  if (pos === "^") {
    matrix[y][x] = "@";
    let iterator = y;
    let currentPosition: Tile;
    do {
      iterator--;
      currentPosition = matrix[iterator][x];
      if (currentPosition === "#") {
        matrix[iterator + 1][x] = nextGuard(pos);
        y = 0;
        break;
      }
      matrix[iterator][x] = "@";
    } while (currentPosition !== "#");
  }
  // repeat for other guards
  if (pos === ">") {
    matrix[y][x] = "@";
    let iterator = x;
    let currentPosition: Tile;
    do {
      iterator++;
      currentPosition = matrix[y][iterator];
      if (currentPosition === "#") {
        matrix[y][iterator - 1] = nextGuard(pos);
        x = 0;
        break;
      }
      matrix[y][iterator] = "@";
    } while (currentPosition !== "#");
  }

  // // repeat for other guards
  if (pos === "<") {
    matrix[y][x] = "@";
    let iterator = x;
    let currentPosition: Tile;
    do {
      iterator--;
      currentPosition = matrix[y][iterator];
      if (currentPosition === "#") {
        matrix[y][iterator + 1] = nextGuard(pos);
        x = 0;
        break;
      }
      matrix[y][iterator] = "@";
    } while (currentPosition !== "#");
  }

  // // repeat for other guards
  if (pos === "v") {
    matrix[y][x] = "@";
    let iterator = y;
    let currentPosition: Tile;
    do {
      iterator++;
      currentPosition = matrix[iterator][x];
      if (currentPosition === "#") {
        matrix[iterator - 1][x] = nextGuard(pos);
        y = 0;
        break;
      }
      matrix[iterator][x] = "@";
    } while (currentPosition !== "#");
  }
  return { y, x };
}
// main();
