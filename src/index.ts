import {
  fetchAndWriteChallenge,
  readPuzzle,
  selectMatrixColumn,
  selectMatrixRow,
} from "./libs";

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
type Tile = "#" | ".";
type Coordinate = {
  x: number;
  y: number;
  tile: Tile;
};

export function solver(data: string[]) {
  const mainMatrix: Coordinate[][][] = [];
  let matrix: Coordinate[][] = [];
  for (let y = 0; y < data.length; y++) {
    if (data[y] === "") {
      mainMatrix.push(matrix);
      matrix = [];
    }

    const sub = [];
    const line = data[y].split("") as unknown as Tile[];
    for (let x = 0; x < line.length; x++) {
      const tile = line[x];
      sub.push({ x, y, tile });
    }
    if (sub.length > 0) matrix.push(sub);
  }

  let grandResult = 0;
  for (const [matrixIndex, matrix] of mainMatrix.entries()) {
    let horizontalSymetryIndex = 0;
    let verticalSymetryIndex = 0;
    for (let i = 0; i <= matrix.length; i++) {
      const currentRow = selectMatrixRow(matrix, i);
      const nextRow = selectMatrixRow(matrix, i + 1);
      if (nextRow) {
        const currentRowString = mapper(currentRow);
        const nextRowString = mapper(nextRow);
        if (currentRowString === nextRowString) {
          for (let h = i; h >= 0; h--) {
            const currentRow = matrix[h];
            const nextRow = matrix[i + i - h + 1];
            if (nextRow) {
              const currentRowString = mapper(currentRow);
              const nextRowString = mapper(nextRow);
              if (currentRowString !== nextRowString) {
                break;
              }
            }
            if (h === 0) horizontalSymetryIndex = i + 1;
          }
        }
      }
    }
    const columns = matrix[0].length;
    for (let j = 0; j <= columns; j++) {
      const currentColumn = selectMatrixColumn(matrix, j);
      const nextColumn = selectMatrixColumn(matrix, j + 1);
      if (nextColumn[0] !== undefined) {
        const currentColumnString = mapper(currentColumn);
        const nextColumnString = mapper(nextColumn);
        if (currentColumnString === nextColumnString) {
          for (let h = j; h >= 0; h--) {
            const currentColumn = selectMatrixColumn(matrix, h);
            const nextColumn = selectMatrixColumn(matrix, j + j - h + 1);
            if (nextColumn[0] !== undefined) {
              const currentColumnString = mapper(currentColumn);
              const nextColumnString = mapper(nextColumn);
              if (currentColumnString !== nextColumnString) {
                break;
              }
            }
            if (h === 0) verticalSymetryIndex = j + 1;
          }
        }
      }
    }

    const result = verticalSymetryIndex + horizontalSymetryIndex * 100;
    grandResult += result;
  }
  return grandResult;
}

function mapper(coordinate: Coordinate[]): string {
  return coordinate.map((el) => el.tile).join("");
}
