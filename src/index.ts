import { fetchAndWriteChallenge, readPuzzle } from "./libs";

/**
 * Fonction principale
 * Vérifie si le puzzle est bien chargé
 * Dans le cas contraire, téléchargement et écriture du puzzle
 */
async function main() {
  await fetchAndWriteChallenge();
  const data = readPuzzle();
  solver(data);
}

function splitter(data: string) {
  const [key, value] = data.split(" = ");
  console.log(value);
  const cleanedValue = value.replace(/[^A-Z1-9]+/g, "");
  return {
    key,
    value: [cleanedValue.slice(0, 3), cleanedValue.slice(3)],
  };
}

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]) {
  const instructions = data[0].split("").map((el) => (el === "R" ? 1 : 0));
  const plan: Map<string, string[]> = new Map();
  for (const line of data.slice(2)) {
    const data = splitter(line);
    plan.set(data.key, data.value);
  }
  function recursive(stepCount: number, next: string = "AAA") {
    if (next === "ZZZ") {
      return stepCount;
    }
    const nextPoint = plan.get(next)![instructions[stepCount]];
    stepCount++;
    return recursive(stepCount, nextPoint);
  }
  const res = recursive(0);
  return res;
}

// main();
