import { hxc, specFile } from "./constants";
import { solver } from "./index";
import { postAnswer, readPuzzle } from "./libs";
import { describe, expect, test } from "vitest";

describe("AoC", () => {
  test("Spec #1", async () => {
    const input = readPuzzle(specFile(1)); // vérifier l'id de la spec à tester ! (inputs/year)
    expect(solver(input)).toEqual(62);
    console.log("--------");
  }, 333_333_333);
  // test("Spec #2", async () => {
  //   const input = readPuzzle(specFile(2));
  //   expect(solver(input)).toEqual(62);
  //   console.log("--------");

  //   if (hxc) {
  //     const data = readPuzzle();
  //     const candidate = solver(data);
  //     console.log({ candidate });
  //     // 44_307 too high.
  //     // 44_033 too high.
  //     // await postAnswer(candidate);
  //   }
  // }, 333_333_333);
});
