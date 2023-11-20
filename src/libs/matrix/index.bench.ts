import { describe, bench } from "vitest";
import { computeMatrixSum, computeMatrixSumBis } from "./index";

function generateMatrix(rows: number, cols: number) {
  const matrix: number[][] = [];
  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = Math.floor(Math.random() * 1_000);
    }
  }
  return matrix;
}

describe("Bench", () => {
  describe("1000x1000 matrix", () => {
    const matrix = generateMatrix(1_000, 1_000);

    bench("Version A", () => {
      computeMatrixSum(matrix);
    });

    bench("Version B", () => {
      computeMatrixSumBis(matrix);
    });
  });

  describe("100x100 matrix", () => {
    const matrix = generateMatrix(100, 100);

    bench("Version A", () => {
      computeMatrixSum(matrix);
    });

    bench("Version B", () => {
      computeMatrixSumBis(matrix);
    });
  });

  describe("10x10 matrix", () => {
    const matrix = generateMatrix(10, 10);

    bench("Version A", () => {
      computeMatrixSum(matrix);
    });

    bench("Version B", () => {
      computeMatrixSumBis(matrix);
    });
  });
});
