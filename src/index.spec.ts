import { hxc, specFile } from "./constants";
import { solver } from "./index";
import { postAnswer, readPuzzle } from "./libs";
import { describe, expect, test } from "vitest";

describe("AoC", () => {
  test("Spec #1", async () => {
    const inputA = readPuzzle(specFile(5)); // vérifier l'id de la spec à tester ! (inputs/year)
    expect(solver(inputA)).toEqual(6);

    if (hxc) {
      const data = readPuzzle();
      console.time("solver");
      const candidate = solver(data);
      console.timeEnd("solver");
      // await postAnswer(candidate);
    }
  }, 333_333_333); // mes chiffres porte-bonheur, à la discrétion du développeur, mais c'est aussi un timeout :)
});
