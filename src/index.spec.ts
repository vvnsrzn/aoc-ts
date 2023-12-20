import { hxc, specFile } from "./constants";
import { solver, hash } from "./index";
import { postAnswer, readPuzzle } from "./libs";
import { describe, expect, test } from "vitest";

describe("hash function", () => {
  test("HASH is 52", () => {
    const res = hash("HASH");
    expect(res).toBe(52);
  });
  test("rn=1 is 52", () => {
    const res = hash("rn=1");
    expect(res).toBe(30);
  });
  test("cm- is 253", async () => {
    const res = hash("cm-");
    expect(res).toBe(253);

    if (hxc) {
      const data = readPuzzle();
      const candidate = solver(data);
      await postAnswer(candidate);
    }
  });
});
