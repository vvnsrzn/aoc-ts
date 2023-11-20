import { expect, test } from "vitest";
import { solver } from "./index";

test("Is my setup OK?", () => {
  expect(solver(["1"])).toEqual(["1", "2"]);
});
