import { hxc, specFile } from "./constants";
import { solver } from "./index";
import { postAnswer, readPuzzle } from "./libs";
import { describe, expect, test } from "vitest";

describe("AoC", () => {
  test("Spec #1", async () => {
    const input = readPuzzle(specFile(18));
    expect(solver(input)).toEqual(4);
  }, 333_333_333); // mes chiffres porte-bonheur, à la discrétion du développeur, mais c'est aussi un timeout :)
  test("Spec #2", async () => {
    const input = readPuzzle(specFile(21));
    expect(solver(input)).toEqual(8);

    if (hxc) {
      const data = readPuzzle();
      const candidate = solver(data);
      if (candidate < 9518) {
        console.log({ candidate });
      }
    }
  }, 333_333_333);
});
