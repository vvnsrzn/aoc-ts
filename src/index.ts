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
export type Tile = "." | "#" | Guard
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
  function addTiles(start: Position, end: Position): void {
    const { y: yStart, x: xStart } = start
    const { y: yEnd, x: xEnd } = end

    if (xStart === xEnd) {
      const michel = [start, end].toSorted((a, b) => {
        if (a.y < b.y) return -1
        if (a.y > b.y) return 1
        return 0
      })
      console.log(michel)
    }
    if (yStart === yEnd) {
    }
  }
  const res: Set<string> = new Set([])

  const matrix: Tile[][] = []
  for (const line of data) {
    const splittedLines = line.split('') as Tile[]
    matrix.push(splittedLines)
  }

  let iterator = 0
  for (let y = 0; y < matrix.length; y++) {
    const row = matrix[y];
    for (let x = 0; x < row.length; x++) {
      const pos = row[x];
      if (isGuard(pos)) {
        if (iterator === 152) debugger
        if (pos === "<" || pos === ">") {
          const currentRow = selectMatrixRow(matrix, y)
          const obstaclePosition = getObstacle(currentRow, pos, x, y)

          const startIdx = pos === "<" ? 0 : x
          const endIdx = pos === '<' ? x : undefined
          const frontGuardLine = currentRow.slice(startIdx, endIdx)
          const isEnd = !frontGuardLine.includes("#")

          if (isEnd) { // end
            debugger
            addTiles({ x, y }, { x: x + frontGuardLine.length, y })
            return res.size + 1
          }

          addTiles({ x, y }, obstaclePosition)

          const offSet = obstaclePosition.x > x ? -1 : 1
          const nextPos = nextGuard(pos)
          matrix[y][x] = "."
          matrix[y][obstaclePosition.x + offSet] = nextPos
          x = 0
        }
        if (pos === "^" || pos === "v") {
          const currentCol = selectMatrixColumn(matrix, x)
          const obstaclePosition = getObstacle(currentCol, pos, x, y)

          const startIdx = pos === "^" ? 0 : y
          const endIdx = pos === '^' ? y : undefined
          const frontGuardLine = currentCol.slice(startIdx, endIdx)
          const isEnd = !frontGuardLine.includes("#")

          if (isEnd) { // end
            debugger
            addTiles({ x, y }, { x, y: y + frontGuardLine.length })
            return res.size + 1
          }

          addTiles({ y, x }, obstaclePosition)

          const offSet = obstaclePosition.y > y ? -1 : 1
          const nextPos = nextGuard(pos)
          matrix[y][x] = "."
          matrix[obstaclePosition.y + offSet][x] = nextPos
          y = 0
        }
        writeFile(`yolo${iterator}.txt`, matrix.join('\n').replaceAll(',', ''), (err => err))
        iterator++
        if (iterator > 1000) process.exit(1)
      }
    }
  }
}

// main();
