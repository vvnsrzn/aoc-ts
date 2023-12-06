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
main();

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
type Category = { label: string; numbers: Element[] };
type Element = { offset: number; from: number; end: number; to: number };
function getEmptyCategory(): Category {
  return {
    label: "",
    numbers: [],
  };
}
export function solver(data: string[]) {
  console.time("solver");
  /**
   * Parse the categories
   */
  const categories: Category[] = [];
  let category = getEmptyCategory();
  for (const [index, line] of data.slice(2).entries()) {
    const str = line.split(" ").filter((v) => v);
    if (str[1] === "map:") {
      category.label = str[0];
    } else if (str.length === 0) {
      categories.push(category);
      category = getEmptyCategory();
    } else {
      const [offset, from, end] = str.map(Number);
      category.numbers.push({ offset, from, end, to: from + end });
    }
    if (index === data.slice(2).length - 1) {
      categories.push(category);
    }
  }

  /**
   * Parse the seeds
   */
  const seedsRaw = data[0]!
    .split("seeds:")[1]
    .trimStart()
    .split(" ")
    .map(Number);
  const pairedSeeds: number[][] = [];
  for (let i = 0; i < seedsRaw.length; i += 2) {
    const chunk = seedsRaw.slice(i, i + 2);
    pairedSeeds.push(chunk);
  }

  /**
   * Get the result
   */
  // const starterKit = 54_072_971; // 72682795
  // const starterKit = 0; // 23531401
  for (let lowestLocation = 0; lowestLocation < 3857582618; lowestLocation++) {
    const candidate = bottomToTop(lowestLocation);
    if (candidate) {
      const tutu = getIntervalSeed(candidate);
      if (tutu) {
        console.log({ lowestLocation, candidate });
        console.timeEnd("solver");
        return lowestLocation;
      }
    }
  }

  function getIntervalSeed(candidate: number) {
    for (const pairedSeed of pairedSeeds) {
      const [left, right] = pairedSeed;
      if (candidate >= left && candidate <= left + right) {
        console.log({ left, right });
        return true;
      }
    }
    return false;
  }

  function categoryMapper(
    candidate: number,
    currentCategory: Category,
    upperCategory?: Category
  ) {
    // tester si la valeur est possible
    if (upperCategory) {
      for (const upperNumberElement of upperCategory.numbers) {
        const { offset, from, end } = upperNumberElement;
        const isInterval = candidate >= from && candidate <= from + end;
        if (isInterval) {
          const isMapInterVal =
            candidate >= offset + from && candidate <= from + end;
          if (!isMapInterVal) {
            break;
          }
        } else {
          return getCurrentCandidate(candidate, currentCategory);
        }
      }
    } else {
      return getCurrentCandidate(candidate, currentCategory);
    }
  }

  function bottomToTop(candidate: number): number | undefined {
    let res = candidate;
    for (let i = categories.length - 2; i >= 0; i--) {
      const temp = categoryMapper(res, categories[i]!, categories[i - 1]);
      if (temp) {
        res = temp;
      } else {
        return undefined;
      }
    }
    return res;
  }

  function getCurrentCandidate(candidate: number, category: Category) {
    for (const numberElement of category.numbers) {
      const { offset, from, end } = numberElement;
      if (candidate >= offset && candidate <= offset + end) {
        return candidate - offset + from;
      }
    }
    return candidate;
  }
}
