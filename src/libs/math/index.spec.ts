import { describe, expect, it } from "vitest";
import { absDifference, computeAverage, computeMedian, computeSum } from "./index.ts";

describe("*** Math Module ***", () => {
  describe("--- Sum ---", () => {
    it("Should return 25 for an array [1, 3, 5, 7, 9]", () => {
      const numbers = [1, 3, 5, 7, 9];
      const res = computeSum(numbers);
      expect(res).toEqual(25);
    });

    it("Should return 0 for an empty array", () => {
      const numbers: number[] = [];
      const res = computeSum(numbers);
      expect(res).toEqual(0);
    });

    it("Should return the same value for an array with a single element", () => {
      const numbers = [42];
      const res = computeSum(numbers);
      expect(res).toEqual(42);
    });
  });

  describe("--- Average ---", () => {
    it("Should return 5 for an array [1, 3, 5, 7, 9]", () => {
      const numbers = [1, 3, 5, 7, 9];
      const res = computeAverage(numbers);
      expect(res).toEqual(5);
    });

    it("Should return NaN for an empty array", () => {
      const numbers: number[] = [];
      const res = computeAverage(numbers);
      expect(res).toBeNaN();
    });

    it("Should return the same value for an array with a single element", () => {
      const numbers = [42];
      const res = computeAverage(numbers);
      expect(res).toEqual(42);
    });
  });

  describe("--- Median ---", () => {
    it("Should return 5 for an array [1, 3, 5, 7, 9]", () => {
      const numbers = [1, 3, 5, 7, 9];
      const res = computeMedian(numbers);
      expect(res).toEqual(5);
    });

    it("Should return NaN for an empty array", () => {
      const numbers: number[] = [];
      const res = computeAverage(numbers);
      expect(res).toBeNaN();
    });

    it("Should return 4.5 for an array [2, 3, 4, 5, 6, 7]", () => {
      const numbers = [2, 3, 4, 5, 6, 7];
      const res = computeMedian(numbers);
      expect(res).toEqual(4.5);
    });
  });

  describe("--- Absolute Difference ---", () => {
    it.each([
      [1, 2, 1],
      [2, 1, 1],
      [1, 1, 0],
    ])("Should return %d for %d and %d", (a, b, expected) => {
      const res = absDifference(a, b);
      expect(res).toEqual(expected);
    });
  });
});
