import { hxc, specFile } from "./constants";
import { gameSorter, cardsSorter, getHand, parseCard, solver } from "./index";
import { postAnswer, readPuzzle } from "./libs";
import { describe, expect, test } from "vitest";

describe("AoC", () => {
  test("Spec #1", async () => {
    const input = readPuzzle(specFile(29)); // vérifier l'id de la spec à tester ! (inputs/year)
    expect(solver(input)).toEqual(6440);

    if (!hxc) {
      return;
    }
    const data = readPuzzle();
    const candidate = solver(data);
    if (candidate < 247_931_671) {
      console.log("candidate", candidate);
      // await postAnswer(candidate);
    }
  }, 333_333_333); // mes chiffres porte-bonheur, à la discrétion du développeur, mais c'est aussi un timeout :)
});

describe("getHand", () => {
  const testCases = [
    {
      input: "JJJJJ",
      expected: {
        score: 7,
        remaining: "",
        major: "J",
      },
    },
    {
      input: "AAQAA",
      expected: {
        score: 6,
        remaining: "Q",
        major: "A",
      },
    },
    {
      input: "AQQAA",
      expected: {
        score: 5,
        remaining: "QQ",
        major: "A",
      },
    },
    {
      input: "AKA2A",
      expected: {
        score: 4,
        remaining: "K2",
        major: "A",
      },
    },
    {
      input: "AKAK2",
      expected: {
        score: 3,
        remaining: "2",
        major: "AKAK",
      },
    },
    {
      input: "AK767",
      expected: {
        score: 2,
        remaining: "AK6",
        major: "7",
      },
    },
    {
      input: "T9876",
      expected: {
        score: 1,
        remaining: "T9876",
        major: "0",
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
    { input: "TJJT", expected: 11_111_010 },
    { input: "KK77", expected: 13_130_707 },
    { input: "A", expected: 14 },
    { input: "9", expected: 9 },
    { input: "2", expected: 2 },
    { input: "K2", expected: 1302 },
    { input: "JA", expected: 1411 },
    { input: "QQ", expected: 1212 },
    { input: "TJ", expected: 1110 },
    { input: "AK6", expected: 141306 },
    { input: "TJK95", expected: 1_311_100_905 },
    { input: "A222A", expected: 1_414_020_202 },
    { input: "JJJJJ", expected: 1_111_111_111 },
    { input: "98765", expected: 908_070_605 },
    { input: "54321", expected: 504_030_201 },
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
    { input: ["3Q25T", "22AK3"], expected: ["3Q25T", "22AK3"] },
    { input: ["22AK3", "22AK4"], expected: ["22AK3", "22AK4"] },
    { input: ["22AK3", "3Q25T"], expected: ["3Q25T", "22AK3"] },
    { input: ["22AK3", "33Q7K"], expected: ["22AK3", "33Q7K"] },
    { input: ["33Q7K", "22AK3"], expected: ["22AK3", "33Q7K"] },
    { input: ["22AK3", "44T55"], expected: ["22AK3", "44T55"] },
    { input: ["77782", "77783"], expected: ["77782", "77783"] },
    { input: ["777A2", "77A22"], expected: ["77A22", "777A2"] },
    { input: ["TTTTT", "777KA"], expected: ["777KA", "TTTTT"] },
    { input: ["AAQAA", "22Q22"], expected: ["22Q22", "AAQAA"] },
    { input: ["3TQ79", "29629"], expected: ["3TQ79", "29629"] },
    { input: ["898QA", "92479"], expected: ["898QA", "92479"] },
    { input: ["KKK9K", "AJKK6"], expected: ["AJKK6", "KKK9K"] },
    { input: ["JJJJJ", "AQ5AQ"], expected: ["AQ5AQ", "JJJJJ"] },
    { input: ["2J553", "23455"], expected: ["23455", "2J553"] },
    { input: ["2T44A", "23455"], expected: ["2T44A", "23455"] },
    { input: ["2T44A", "44K7Q"], expected: ["44K7Q", "2T44A"] },
    { input: ["45A48", "44K7Q"], expected: ["44K7Q", "45A48"] },
    { input: ["45JK4", "44K7Q"], expected: ["45JK4", "44K7Q"] },
    { input: ["45JK4", "J34K4"], expected: ["J34K4", "45JK4"] },
    { input: ["4K3T4", "J34K4"], expected: ["4K3T4", "J34K4"] },
  ];

  test.each(testCases)("%s to %d", ({ input, expected }) => {
    const given = gameSorter(input);
    expect(given).toEqual(expected);
  });
});
