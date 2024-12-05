import { fetchAndWriteChallenge, readPuzzle } from "./libs/puzzle/index.ts";

/**
 * Fonction principale
 * Vérifie si le puzzle est bien chargé
 * Dans le cas contraire, téléchargement et écriture du puzzle
 */
async function main() {
  await fetchAndWriteChallenge();
  const data = readPuzzle();
  // solver(data);
}

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]) {
  const orderInstructions = []
  const numberSequences = []
  for (const line of data) {
    if (line.includes('|')) orderInstructions.push(line.split('|').map(Number));
    if (line.includes(',')) numberSequences.push(line.split(',').map(Number));
  }
  /**
   * 75,97,47,61,53 becomes 97,75,47,61,53. it would print 75 before 97, which violates the rule 97|75.
   * 61,13,29 becomes 61,29,13. 29|13
   * 97,13,75,29,47 becomes 97,75,47,29,13.
   */
  const sequenceAndRules = new Map<number[], number[][]>()
  for (let i = 0; i < numberSequences.length; i++) {
    const sequence = numberSequences[i];
    for (let j = 0; j < orderInstructions.length; j++) {
      const rule = orderInstructions[j];
      const isSequenceValid = isValid(rule, sequence)
      if (!isSequenceValid) {
        if (sequenceAndRules.has(sequence)) {
          sequenceAndRules.get(sequence)?.push(rule)
        } else {
          sequenceAndRules.set(sequence, [rule])
        }
      }
    }
  }

  for (const [sequence, rules] of sequenceAndRules) {
    for (let z = 0; z < rules.length; z++) {
      const ruleToFix = rules[z];
      console.log(sequence, ruleToFix)
      const toto = sortedSequence(ruleToFix, sequence)
      console.log(toto)
      console.log('---')
    }
  }
}

main();

function sortedSequence(rule: number[], sequence: number[]): number[] {
  if (isValid(rule, sequence)) return sequence
  const [left, right] = rule
  const leftIndexOf = sequence.indexOf(left)
  const rightIndexOf = sequence.indexOf(right)
  console.log({ left, leftIndexOf })
  console.log({ right, rightIndexOf })

  return sequence
}

function isValid(rule: number[], sequence: number[]): boolean {
  const [left, right] = rule
  for (let i = 0; i < sequence.length; i++) {
    const element = sequence[i];
    if (left === element && sequence.includes(right)) {
      const leftIndexOf = sequence.indexOf(left)
      const rightIndexOf = sequence.indexOf(right)
      if (rightIndexOf < leftIndexOf) {
        return false
      }
    }
  }
  return true
}


