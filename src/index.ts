// import { fetchAndWriteChallenge, readPuzzle } from "./libs";

/**
 * Fonction principale
 * Vérifie si le puzzle est bien chargé
 * Dans le cas contraire, téléchargement et écriture du puzzle
 */
// async function main() {
//   await fetchAndWriteChallenge();
//   const data = readPuzzle();
//   solver(data);
// }
// main();

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]) {
  let res = 0;
  for (const line of data) {
    res += getPossibleArangements(line);
  }
  return res;
}

export function getPossibleArangements(line: string): number {
  const [left, right] = line.split(" ");
  const pattern = right.split(",").map(Number);

  const seq: Character[] = left
    .split("")
    .filter((el): el is Character => characters.includes(el));

  const result = dfs(seq, pattern);

  if (result) return result?.size;
  return 0;
}

function dfs(
  seq: Character[],
  pattern: number[],
  start: number = 0,
  graph: Map<string, Character[]> = new Map(),
  winners: Set<string> = new Set()
) {
  const next = seq[start];
  if (!next) return;
  const possibleNextCharacters = getPossibleNextCharacters(next);
  const candidates = [];

  for (const possibleNextCharacter of possibleNextCharacters) {
    const candidate = [
      ...seq.slice(0, start),
      possibleNextCharacter,
      ...seq.slice(start + 1),
    ];
    candidates.push(candidate);
  }

  for (const candidate of candidates) {
    const key = candidate.join("");

    if (isMatchingPattern(candidate, pattern)) {
      winners.add(candidate.join(""));
    }

    if (!graph.has(key)) {
      graph.set(key, seq);
    }

    dfs(candidate, pattern, start + 1, graph, winners);
  }

  return winners;
}

type Character = "." | "#" | "?";
const characters = [".", "#", "?"];

function getPossibleNextCharacters(character: Character): Character[] {
  if (character === "?") {
    return ["#", "."];
  } else {
    return [character];
  }
}

function isMatchingPattern(seq: Character[], pattern: number[]): boolean {
  const challenge = seq
    .join("")
    .split(".")
    .filter((v) => v);
  if (challenge.length === pattern.length) {
    for (let i = 0; i < pattern.length; i++) {
      const p = pattern[i];
      if (challenge[i] !== "#".repeat(p)) {
        return false;
      }
    }
    return true;
  }
  return false;
}
