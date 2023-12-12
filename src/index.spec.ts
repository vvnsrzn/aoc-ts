import { hxc, specFile } from "./constants";
import { solver, bottomToTop, getCategories } from "./index";
import { postAnswer, readPuzzle } from "./libs";
import { describe, expect, test } from "vitest";

describe("AoC", () => {
  describe("bottomToTop", async () => {
    const input = readPuzzle(specFile(3));
    const categories = getCategories(input);
    test("Seed 79 --> Location 82", () => {
      const given = bottomToTop(82, categories);
      expect(given).toEqual(79);
    });
    test("Seed 14 --> Location 43", () => {
      const given = bottomToTop(43, categories);
      expect(given).toEqual(14);
    });
    test("Seed 55 --> Location 86", () => {
      const given = bottomToTop(86, categories);
      expect(given).toEqual(55);
    });
    test("Seed 13 --> Location 35", () => {
      const given = bottomToTop(35, categories);
      expect(given).toEqual(13);
    });
    test("Seed 82 --> Location 46", () => {
      const given = bottomToTop(46, categories);
      expect(given).toEqual(82);
    });
  });
  test("Spec#1", () => {
    const input = readPuzzle(specFile(3)); // vérifier l'id de la spec à tester ! (inputs/year)
    expect(solver(input)).toEqual(46);
  }, 333_333_333); // mes chiffres porte-bonheur, à la discrétion du développeur, mais c'est aussi un timeout :)
  test.only("All", () => {
    if (hxc) {
      const data = readPuzzle();
      const candidate = solver(data);
      // await postAnswer(candidate);
    }
  });
});

// 72682795
// 23531401
