import { describe, expect, it } from "vitest";
import { computeMatrixSum, selectMatrixColumn, selectMatrixRow } from "./index.ts";

describe("*** Matrix Module ***", () => {
  describe("--- Row ---", () => {
    it("Should return [4, 5, 6]", () => {
      const matrix: number[][] = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      const selectedRow = selectMatrixRow(matrix, 1);
      expect(selectedRow).toEqual([4, 5, 6]);
    });
  });

  describe("--- Column ---", () => {
    it("Should return [2, 5, 8]", () => {
      const matrix: number[][] = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      const selectedColumn = selectMatrixColumn(matrix, 1);
      expect(selectedColumn).toEqual([2, 5, 8]);
    });
  });

  describe("--- Sum ---", () => {
    it("Should return 45", () => {
      const matrix: number[][] = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      const sum = computeMatrixSum(matrix);
      expect(sum).toEqual(45);
    });
  });
});
