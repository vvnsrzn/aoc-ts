import { fetchAndWriteChallenge, readPuzzle } from "./libs/puzzle/index.ts";

/**
 * Fonction principale
 * Vérifie si le puzzle est bien chargé
 * Dans le cas contraire, téléchargement et écriture du puzzle
 */
async function main() {
  await fetchAndWriteChallenge();
  const data = readPuzzle();
  // solver(data);
}

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]) {
  const matrix: string[][] = []
  for (const line of data) {
    matrix.push(line.split(""))
  }
  const nodes = new Map<string, { y: number, x: number }[]>()
  for (let y = 0; y < matrix.length; y++) {
    const row = matrix[y];
    for (let x = 0; x < row.length; x++) {
      const element = row[x];
      if (element !== ".") {
        if (nodes.has(element)) {
          const prevCoordinates = nodes.get(element)
          prevCoordinates?.push({ y, x })
          nodes.set(element, prevCoordinates)
        } else {
          nodes.set(element, [{ y, x }])
        }
      }
    }
  }

  const res = new Set<string>()
  function countDiagonals(target: { y: number; x: number; }, coordinates: { y: number; x: number; }[], limit: number): string {
    for (const coordinate of coordinates) {
      const { y, x } = coordinate;
      const opposite = { y: target.y - y + target.y, x: target.x - x + target.x }
      if (opposite.y >= 0 && opposite.x >= 0 && opposite.y <= limit && opposite.x <= limit) {
        res.add(`${opposite.y.toString()}-${opposite.x.toString()}`)
      }
    }
  }
  nodes.forEach((el) => {
    for (let i = 0; i < el.length; i++) {
      const element = el[i];
      const newArr = [...el]
      newArr.splice(i, 1)
      countDiagonals(element, newArr, matrix[0].length - 1)
    }
  })
  return res.size;
}

main();