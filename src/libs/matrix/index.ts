import { computeSum } from "../math";

export function selectMatrixRow<T>(matrix: Array<T[]>, row: number) {
  return matrix[row];
}
export function selectMatrixColumn<T>(matrix: Array<T[]>, column: number) {
  return matrix.map((row) => row[column]);
}

export function computeMatrixSum(matrix: Array<number[]>): number {
  let res = 0;
  for (const row of matrix) {
    res += computeSum(row);
  }
  return res;
}

/**
 * @deprecated Since it's 5x slower rather than computeMatrixSum
 * @param matrix
 * @returns The matrix's sum
 */
export function computeMatrixSumBis(matrix: Array<number[]>) {
  return computeSum(matrix.flatMap(computeSum));
}
