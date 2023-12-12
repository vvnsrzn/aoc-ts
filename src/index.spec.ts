import { hxc, specFile } from "./constants";
import { solver, getPossibleArangements } from "./index";
import { postAnswer, readPuzzle } from "./libs";
import { describe, expect, test } from "vitest";

describe("Solver", () => {
  test("???.### -> 1,1,3 equal 1", () => {
    const given =
      "???.###????.###????.###????.###????.### 1,1,3,1,1,3,1,1,3,1,1,3,1,1,3";
    expect(getPossibleArangements(given)).toEqual(1);
  });
  test(".??..??...?##. -> 1,1,3 equal 4", () => {
    const given = ".??..??...?##. 1,1,3";
    expect(getPossibleArangements(given)).toEqual(4);
  });
  test("?#?#?#?#?#?#?#? -> 1,3,1,6 equal 1", () => {
    const given = "?#?#?#?#?#?#?#? 1,3,1,6";
    expect(getPossibleArangements(given)).toEqual(1);
  });
  test("????.#...#... -> 4,1,1 equal 1", () => {
    const given = "????.#...#... 4,1,1";
    expect(getPossibleArangements(given)).toEqual(1);
  });
  test("????.######..#####. -> 1,6,5 equal 4", () => {
    const given = "????.######..#####. 1,6,5";
    expect(getPossibleArangements(given)).toEqual(4);
  });
  test("?###???????? -> 3,2,1 equal 10", () => {
    const given = "?###???????? 3,2,1";
    expect(getPossibleArangements(given)).toEqual(10);
  });
  test("Spec #1", async () => {
    const input = readPuzzle(specFile(1)); // vérifier l'id de la spec à tester ! (inputs/year)
    expect(solver(input)).toEqual(21);
  }, 333_333_333); // mes chiffres porte-bonheur, à la discrétion du développeur, mais c'est aussi un timeout :)
});
