import { hxc, specFile } from "./constants";
import { solver } from "../src/index";
import { postAnswer, readPuzzle } from "../src/libs";
import { describe, expect, test } from "vitest";

describe("AoC", () => {
  test("Spec #1", async () => {
    const input = readPuzzle(specFile(1)); // vérifier l'id de la spec à tester ! (inputs/year)
    expect(solver(input)).toEqual(142);

    if (hxc) {
      const data = readPuzzle();
      const candidate = solver(data);
      await postAnswer(candidate);
    }
  }, 333_333_333); // mes chiffres porte-bonheur, à la discrétion du développeur, mais c'est aussi un timeout :)
});
