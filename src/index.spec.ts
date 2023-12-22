import { hxc, specFile } from "./constants";
import { solver, sorter } from "./index";
import { postAnswer, readPuzzle } from "./libs";
import { describe, expect, test } from "vitest";

describe("Row", () => {
  test.each([
    {
      input: ["O", "O", ".", "O", ".", "O", ".", ".", "#", "#"],
      expected: ["O", "O", "O", "O", ".", ".", ".", ".", "#", "#"],
    },
    {
      input: [".", ".", ".", "O", "O", ".", ".", ".", ".", "O"],
      expected: ["O", "O", "O", ".", ".", ".", ".", ".", ".", "."],
    },
    {
      input: [".", "#", ".", "O", ".", "#", "O", ".", ".", "."],
      expected: [".", "#", "O", ".", ".", "#", "O", ".", ".", "."],
    },
  ])("sorter(%p) returns %s", ({ input, expected }) => {
    const given = sorter(input);
    expect(given).toStrictEqual(expected);
  });
});

describe("AoC", () => {
  test("Spec #1", async () => {
    const input = readPuzzle(specFile(4)); // vérifier l'id de la spec à tester ! (inputs/year)
    expect(solver(input)).toEqual(136);

    if (hxc) {
      const data = readPuzzle();
      const candidate = solver(data);
      expect(candidate).toBe(110274);
      // await postAnswer(candidate);
    }
  }, 333_333_333); // mes chiffres porte-bonheur, à la discrétion du développeur, mais c'est aussi un timeout :)
});
