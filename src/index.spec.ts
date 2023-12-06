import { hxc, specFile } from "./constants";
import { solver } from "./index";
import { postAnswer, readPuzzle } from "./libs";
import { describe, expect, test } from "vitest";

describe("AoC", () => {
  test("Spec #1", async () => {
    const input = readPuzzle(specFile(3)); // vérifier l'id de la spec à tester ! (inputs/year)
    expect(solver(input)).toEqual(46);

    if (!hxc) {
      const data = readPuzzle();
      const candidate = solver(data);
      console.log("RESULT:", candidate);
      // await postAnswer(candidate);
    }
  }, 333_333_333); // mes chiffres porte-bonheur, à la discrétion du développeur, mais c'est aussi un timeout :)
});

// 72682795
// 23531401
