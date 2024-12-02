import { describe, expect, it } from "vitest";
import { permutation } from "./index.ts";

describe("Permutation", () => {
    it.each([
        { input: [1, 2], expected: [[2], [1]] },
        { input: [1, 2, 3], expected: [[2, 3], [1, 3], [1, 2]] },
        { input: [1, 2, 3, 4], expected: [[2, 3, 4], [1, 3, 4], [1, 2, 4], [1, 2, 3]] }
    ])("Should return $expected for $input", ({ input, expected }) => {
        const result = permutation(input);
        expect(result).toEqual(expected);
    });
});