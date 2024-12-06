import { fetchAndWriteChallenge, readPuzzle } from "./libs/puzzle/index.ts";
import { type Directions, selectMatrixColumn, selectMatrixRow } from "./libs/matrix/index.ts";
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
type Tile = "." | "#" | Guard
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



export function solver(data: string[]) {
  function addTiles(start: Position, end: Position): void {
    const { y: yStart, x: xStart } = start
    const { y: yEnd, x: xEnd } = end
    if (xStart === xEnd) {
      let y = absDifference(yStart, yEnd)
      do {
        y--
        res.add(`${xStart}-${y}`)
      } while (y > 1);
    }
    if (yStart === yEnd) {
      let x = absDifference(xStart, xEnd)
      do {
        x--
        res.add(`${x}-${yStart}`)
      } while (x > 1);
    }
  }
  const res: Set<string> = new Set([])

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
          const currentRow = selectMatrixRow(matrix, y)
          const obstacle = currentRow.indexOf("#")

          const startIdx = pos === "<" ? 0 : x
          const endIdx = pos === '<' ? x : undefined
          const frontGuardLine = currentRow.slice(startIdx, endIdx)
          const isEnd = !frontGuardLine.includes("#")

          if (isEnd) { // end
            addTiles({ x, y }, { x: x + frontGuardLine.length, y })
            return res.size + 1
          }

          addTiles({ x, y }, { x: obstacle, y })

          const offSet = obstacle > x ? -1 : 1
          const nextPos = nextGuard(pos)
          matrix[y][x] = "."
          matrix[y][obstacle + offSet] = nextPos
          x = 0
        }
        if (pos === "^" || pos === "v") {
          const currentCol = selectMatrixColumn(matrix, x)
          const obstacle = currentCol.indexOf("#")

          const startIdx = pos === "^" ? 0 : y
          const endIdx = pos === '^' ? y : undefined
          const frontGuardLine = currentCol.slice(startIdx, endIdx)
          const isEnd = !frontGuardLine.includes("#")

          if (isEnd) { // end
            addTiles({ x, y }, { x, y: y + frontGuardLine.length })
            return res.size + 1
          }

          addTiles({ y, x }, { y: obstacle, x })

          const offSet = obstacle > y ? -1 : 1
          const nextPos = nextGuard(pos)
          matrix[y][x] = "."
          matrix[obstacle + offSet][x] = nextPos
          y = 0
        }
      }
    }
  }
}

// main();
