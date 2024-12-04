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
type Matrix = "X" | "M" | "A" | "S" | ".";
function generateValidCoordinates(x: number, y: number, matrix: Matrix[][]): number {
  let result = 0
  const limit = matrix.length;
  const res = [
    [[x, y], [x + 1, y], [x + 2, y], [x + 3, y]], // right
    [[x, y], [x - 1, y], [x - 2, y], [x - 3, y]], // left
    [[x, y], [x, y - 1], [x, y - 2], [x, y - 3]], // top
    [[x, y], [x, y + 1], [x, y + 2], [x, y + 3]], // bottom
    [[x, y], [x + 1, y - 1], [x + 2, y - 2], [x + 3, y - 3]], // diagonal top right
    [[x, y], [x - 1, y + 1], [x - 2, y + 2], [x - 3, y + 3]], // diagonal bottom left
    [[x, y], [x - 1, y - 1], [x - 2, y - 2], [x - 3, y - 3]], // diagonal top left
    [[x, y], [x + 1, y + 1], [x + 2, y + 2], [x + 3, y + 3]], // diagonal bottom right
  ].filter((line) => {
    return line.every((coordinates) => coordinates[0] >= 0 && coordinates[1] >= 0 && coordinates[0] < limit && coordinates[1] < limit)
  })

  for (const line of res) {
    const [a, b, c, d] = line;
    const word = [matrix[a[1]][a[0]], matrix[b[1]][b[0]], matrix[c[1]][c[0]], matrix[d[1]][d[0]]]
    if (word.join('') === 'XMAS') {
      result++
    }
  }
  return result
}

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]) {
  const matrix = []
  let result = 0;
  for (const line of data) {
    matrix.push(line.split(''));
  }
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      if (matrix[x][y] === 'X') {
        console.log('X', x, y);
        result += generateValidCoordinates(y, x, matrix as Matrix[][]);
      }
    }
  }
  return result;
}

main();
