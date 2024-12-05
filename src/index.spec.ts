import { describe, expect, test } from "vitest";
import { hxc, specFile } from "./constants.ts";
import { solver } from "./index.ts";
import { postAnswer, readPuzzle } from "./libs/puzzle/index.ts";

describe("AoC", () => {
  test("Spec #1", async () => {
    const input = readPuzzle(specFile(6)); // vérifier l'id de la spec à tester ! (inputs/year)
    const michel = solver(input)
    expect(michel).toEqual(123);

    if (hxc) {
      // const data = readPuzzle();
      // const candidate = solver(data);
      // console.log(`Candidate: ${candidate}`);
      // if (candidate > 5708 && candidate < 5906 && candidate !== 5878) await postAnswer(candidate);
    }
  }); // mes chiffres porte-bonheur, à la discrétion du développeur, mais c'est aussi un timeout :)
});
