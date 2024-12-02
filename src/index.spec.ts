import { describe, expect, test } from "vitest";
import { hxc, specFile } from "./constants.ts";
import { solver } from "./index.ts";
import { postAnswer, readPuzzle } from "./libs/puzzle/index.ts";

describe("AoC", () => {
  test.only("Spec #1", async () => {
    const input = readPuzzle(specFile(2)); // vérifier l'id de la spec à tester ! (inputs/year)
    expect(solver(input)).toEqual(4);
    if (hxc) {
      const data = readPuzzle();
      const candidate = solver(data);
      // await postAnswer(candidate);
    }
  }, 333_333_333); // mes chiffres porte-bonheur, à la discrétion du développeur, mais c'est aussi un timeout :)
});
