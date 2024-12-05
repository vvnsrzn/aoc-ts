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
    [[x - 1, y - 1]], // diagonal top left - M
    [[x + 1, y - 1]], // diagonal top right - S
    [[x - 1, y + 1]], // diagonal bottom left - M
    [[x + 1, y + 1]], // diagonal bottom right - S
  ].filter((line) => {
    return line.every((coordinates) => coordinates[0] >= 0 && coordinates[1] >= 0 && coordinates[0] < limit && coordinates[1] < limit)
  })

  const michel = res.flat().filter(el => el)
  if (michel.length === 4) {
    try {
      const [a, b, c, d] = michel;
      const word = [matrix[a[1]][a[0]], matrix[b[1]][b[0]], matrix[c[1]][c[0]], matrix[d[1]][d[0]]].join('')
      console.log({ word });
      if (word === 'MSMS' || word === 'SSMM' || word === 'MMSS' || word === 'SSMM' || word === 'SMSM') {
        result++
      }
      console.log({ result });
      return result
    } catch (error) {
      console.log({ error });
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
      if (matrix[x][y] === 'A') {
        result += generateValidCoordinates(y, x, matrix as Matrix[][]);
      }
    }
  }
  return result;
}

main();
