import { hxc, specFile } from "./constants";
import { solver } from "./index";
import { postAnswer, readPuzzle } from "./libs";
import { describe, expect, test } from "vitest";

describe("AoC", () => {
  test("Spec #1", async () => {
    const input = readPuzzle(specFile(3)); // vérifier l'id de la spec à tester ! (inputs/year)
    expect(solver(input)).toEqual(405);
  });
  test("Real", async () => {
    const data = readPuzzle();
    const candidate = solver(data);
    expect(candidate).toBe(29130);
    // await postAnswer(candidate);
  });
});
