import { expect, test } from "vitest";
import { solver } from "./index";

test("Is my setup OK?", () => {
  const given = ["A Y", "B X", "C Z"];
  const res = solver(given);
  expect(res).toEqual(12);
});
