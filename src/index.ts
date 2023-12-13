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
    const line = data[y].split("") as unknown as Tile[];

    if (data[y] === "") {
      mainMatrix.push(matrix);
      matrix = [];
    }

    const sub = [];
    for (let x = 0; x < line.length; x++) {
      const tile = line[x];
      sub.push({ x, y, tile });
    }
    matrix.push(sub);
  }

  let grandResult = 0;
  for (const matrix of mainMatrix) {
    let horizontalScore = 0;
    for (let i = 0; i < matrix.length; i++) {
      const currentRow = selectMatrixRow(matrix, i);
      const nextRow = selectMatrixRow(matrix, i + 1);
      if (nextRow) {
        const currentRowString = mapper(currentRow);
        const nextRowString = mapper(nextRow);
        if (currentRowString === nextRowString) {
          horizontalScore++;
          for (let h = i; h >= 0; h--) {
            const currentRow = matrix[h];
            const nextRow = matrix[i + i - h + 1];
            if (nextRow) {
              const currentRowString = mapper(currentRow);
              const nextRowString = mapper(nextRow);
              if (currentRowString === nextRowString) {
                horizontalScore++;
              }
            }
          }
        }
      }
    }
    let verticalScore = 0;
    const columns = matrix.length;
    for (let j = 0; j <= columns; j++) {
      const currentColumn = selectMatrixColumn(matrix, j);
      const nextColumn = selectMatrixColumn(matrix, j + 1);
      if (nextColumn[0] !== undefined) {
        const currentColumnString = mapper(currentColumn);
        const nextColumnString = mapper(nextColumn);
        if (currentColumnString === nextColumnString) {
          verticalScore++;
          for (let h = j; h >= 0; h--) {
            const currentColumn = selectMatrixColumn(matrix, h);
            const nextColumn = selectMatrixColumn(matrix, j + j - h + 1);
            if (nextColumn[0] !== undefined) {
              const currentColumnString = mapper(currentColumn);
              const nextColumnString = mapper(nextColumn);
              if (currentColumnString === nextColumnString) {
                verticalScore++;
              }
            }
          }
        }
      }
    }

    const result =
      verticalScore > horizontalScore ? verticalScore : horizontalScore * 100;

    grandResult += result;
  }
  console.log({ grandResult });
  return grandResult;
}

function mapper(coordinate: Coordinate[]): string {
  return coordinate.map((el) => el.tile).join("");
}
