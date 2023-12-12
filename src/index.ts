import { fetchAndWriteChallenge, readPuzzle } from "./libs";
import { debugSolver } from "./debug";

export function solver(data: string[]) {
  console.time("solver");
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

  let result = Infinity;
  for (const pairedSeed of pairedSeeds) {
    const [left, right] = pairedSeed;
    let iter = 0;
    do {
      const temp = debugSolver(left + iter);
      if (result > temp) result = temp;
      iter++;
    } while (iter <= left + right);
  }
  console.log("GRAND RÉSULTAT:", result);
  return result;
}

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

// export function solver(data: string[]) {
//   console.time("solver");
//   /**
//    * Parse the categories
//    */
//   const categories: Category[] = getCategories(data);

//   /**
//    * Parse the seeds
//    */
//   const seedsRaw = data[0]!
//     .split("seeds:")[1]
//     .trimStart()
//     .split(" ")
//     .map(Number);
//   const pairedSeeds: number[][] = [];
//   for (let i = 0; i < seedsRaw.length; i += 2) {
//     const chunk = seedsRaw.slice(i, i + 2);
//     pairedSeeds.push(chunk);
//   }

//   /**
//    * Get the result
//    */
//   // 10_834_441
//   for (let lowestLocation = 0; lowestLocation < Infinity; lowestLocation++) {
//     const candidate = bottomToTop(lowestLocation, categories);
//     if (candidate) {
//       const tutu = getIntervalSeed(candidate);
//       if (tutu) {
//         console.log({ lowestLocation, candidate });

//         return lowestLocation;
//         // const lowestLocationViaDebug = debugSolver(candidate);
//         // console.log({ lowestLocation, lowestLocationViaDebug });

//         // if (lowestLocation === lowestLocationViaDebug) {
//         //   console.timeEnd("solver");
//         // }
//       }
//     }
//   }

//   function getIntervalSeed(candidate: number) {
//     for (const pairedSeed of pairedSeeds) {
//       const [left, right] = pairedSeed;
//       if (candidate >= left && candidate <= left + right) {
//         return true;
//       }
//     }
//     return false;
//   }
// }

export function getCategories(data: string[]) {
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
  return categories;
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

function categoryMapper(
  candidate: number,
  currentCategory: Category,
  upperCategory?: Category
) {
  // tester si la valeur est possible
  if (upperCategory) {
    for (const upperNumberElement of upperCategory.numbers) {
      const { offset, from, end } = upperNumberElement;
      const isInterval =
        candidate >= offset - from + end && candidate <= offset - from + end;
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

export function bottomToTop(
  candidate: number,
  categories: Category[]
): number | undefined {
  let res = candidate;
  for (let i = categories.length - 1; i >= 0; i--) {
    const temp = categoryMapper(res, categories[i]!, categories[i - 1]);
    if (temp) {
      res = temp;
    } else {
      return undefined;
    }
  }
  return res;
}
