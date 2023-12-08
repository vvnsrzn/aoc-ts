import { hxc, specFile } from "./constants";
import { gameSorter, cardsSorter, getHand, parseCard, solver } from "./index";
import { postAnswer, readPuzzle } from "./libs";
import { describe, expect, test } from "vitest";

describe("AoC", () => {
  test("Spec #1", async () => {
    const input = readPuzzle(specFile(29)); // vérifier l'id de la spec à tester ! (inputs/year)
    expect(solver(input)).toEqual(5905);

    if (!hxc) {
      return;
    }
    const data = readPuzzle();
    const candidate = solver(data);
    // await postAnswer(candidate);
  }, 333_333_333); // mes chiffres porte-bonheur, à la discrétion du développeur, mais c'est aussi un timeout :)
});

describe("getHand", () => {
  const testCases = [
    {
      input: "JJJJJ",
      expected: {
        score: 7,
        remaining: "JJJJJ",
      },
    },
    {
      input: "AAQAA",
      expected: {
        score: 6,
        remaining: "AAQAA",
      },
    },
    {
      input: "AQQAA",
      expected: {
        score: 5,
        remaining: "AQQAA",
      },
    },
    {
      input: "AKA2A",
      expected: {
        score: 4,
        remaining: "AKA2A",
      },
    },
    {
      input: "AKAK2",
      expected: {
        score: 3,
        remaining: "AKAK2",
      },
    },
    {
      input: "AK767",
      expected: {
        score: 2,
        remaining: "AK767",
      },
    },
    {
      input: "T9876",
      expected: {
        score: 1,
        remaining: "T9876",
      },
    },
  ];

  test.each(testCases)("%s to %d", ({ input, expected }) => {
    const given = getHand(input);
    expect(given).toEqual(expected);
  });
});

describe("cardsSorter", () => {
  const testCases = [
    { input: "TJJT", expected: 10010110 },
    { input: "KK77", expected: 13130707 },
    { input: "A", expected: 14 },
    { input: "9", expected: 9 },
    { input: "2", expected: 2 },
    { input: "J", expected: 1 },
    { input: "K2", expected: 1302 },
    { input: "JA", expected: 114 },
    { input: "QQ", expected: 1212 },
  ];

  test.each(testCases)("%s to %d", ({ input, expected }) => {
    const given = cardsSorter(input);
    expect(given).toEqual(expected);
  });
});

describe("parseCard", () => {
  const testCases = [
    { input: "A", expected: "14" },
    { input: "K", expected: "13" },
    { input: "Q", expected: "12" },
    { input: "9", expected: "09" },
    { input: "2", expected: "02" },
    { input: "4", expected: "04" },
  ];

  test.each(testCases)("%s to %d", ({ input, expected }) => {
    const given = parseCard(input);
    expect(given).toEqual(expected);
  });
});

describe("gameSorter", () => {
  const testCases = [
    { input: ["33332", "2AAAA"], expected: ["2AAAA", "33332"] },
    { input: ["77888", "77788"], expected: ["77788", "77888"] },
  ];

  test.each(testCases)("%s to %d", ({ input, expected }) => {
    const given = gameSorter(input);
    expect(given).toEqual(expected);
  });
});
