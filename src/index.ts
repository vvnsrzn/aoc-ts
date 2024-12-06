import { fetchAndWriteChallenge, readPuzzle } from "./libs/puzzle/index.ts";
import { Directions, selectMatrixColumn, selectMatrixRow } from "./libs/matrix/index.ts";
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
type Tile = "." | "#" | Guard
type Guard = ">" | "<" | "^" | "v"

function guardDirection(guard: Guard): Directions {
  switch (guard) {
    case "<":
      return "west"
    case ">":
      return "east"
    case "^":
      return "north"
    case "v":
      return "south"
  }
}

function isGuard(pos: Tile): boolean {
  return [">", "<", "^", "v"].includes(pos)
}

export function solver(data: string[]) {
  const matrix: Tile[][] = []
  for (const line of data) {
    const splittedLines = line.split('') as Tile[]
    matrix.push(splittedLines)
  }

  for (let y = 0; y < matrix.length; y++) {
    const row = matrix[y];
    for (let x = 0; x < row.length; x++) {
      const pos = row[x];
      if (isGuard(pos)) {
        if (pos === "<" || pos === ">") {
          // const currentRow = selectMatrixRow(matrix, y)
        }
        if (pos === "^" || pos === "v") {
          const currentCol = selectMatrixColumn(matrix, x)
          const obstacle = currentCol.indexOf("#")
          console.log(pos, { x, y }, obstacle)
        }
      }
    }

  }
  return 1;
}

// main();
