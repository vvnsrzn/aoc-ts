import { readPuzzle } from "./libs";

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
const data = readPuzzle();

const converter = [];
for (const line of data.slice(1)) {
  const str = line.split(" ").filter((v) => v);
  if (str[1] !== "map:") {
    converter.push(str);
  }
}

const converted = converter.map((el) => (el.length === 0 ? "*" : el));

export function debugSolver(seed: number) {
  let res = seed;
  let categoryTemp = 0;
  for (const [index, step] of converted.entries()) {
    let stepTemp = 0;
    if (step === "*") {
      res += categoryTemp;
      categoryTemp = 0;
    } else {
      const [start, from, values] = step.map(Number);
      const to = from + values;
      if (res > from && res < to) {
        stepTemp += start - from;
      }
    }
    categoryTemp += stepTemp;
    if (index === converted.length - 1) {
      res += categoryTemp;
      categoryTemp = 0;
    }
  }
  return res;
}
