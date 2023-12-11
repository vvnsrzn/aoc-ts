import { fetchAndWriteChallenge, readPuzzle, selectMatrixColumn } from "./libs";

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
// main();

type Coordinate = {
  x: number;
  y: number;
  galaxy: string;
};
type Matrix = Map<number, Coordinate[]>;
type AdjacentFunction = {
  (target: Coordinate, coordinate: Coordinate): boolean;
};

function createAdjencyList(matrix: Matrix): Map<Coordinate, Coordinate[]> {
  const adjencyList = new Map();
  for (const [, coordinates] of matrix.entries()) {
    for (const coordinate of coordinates) {
      const possibleTiles = getAdjacentTiles(coordinate, matrix);
      adjencyList.set(coordinate, possibleTiles);
    }
  }
  return adjencyList;
}

function verticalAdjacents(coordinate: Coordinate, target: Coordinate) {
  if (coordinate.x - target.x === 0) {
    return true;
  }
  return false;
}

function horizontalAdjacents(coordinate: Coordinate, target: Coordinate) {
  if (coordinate.x - target.x === -1) {
    return true;
  }
  if (coordinate.x - target.x === 1) {
    return true;
  }
  return false;
}

function getAdjacentTiles(coordinate: Coordinate, matrix: Matrix) {
  const possibleTiles: Coordinate[] = [];
  const maxLength = matrix.size;
  getPossibleTiles(-1, verticalAdjacents);
  getPossibleTiles(0, horizontalAdjacents);
  getPossibleTiles(1, verticalAdjacents);
  return possibleTiles;

  function getPossibleTiles(targetRow: number, adjacentFn: AdjacentFunction) {
    if (matrix.get(coordinate.y + targetRow)) {
      const row = matrix.get(coordinate.y + targetRow)?.values();
      for (const target of row!) {
        if (allowedTile(target, maxLength) && adjacentFn(coordinate, target)) {
          possibleTiles.push(target);
        }
      }
    }
  }

  function allowedTile(coord: Coordinate, maxLength: number) {
    return coord.x - 1 >= 0 || coord.x + 1 < maxLength;
  }
}

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(universe: string[]) {
  const { matrix, galaxyMax } = expandUniverse(universe);

  console.time("adjencyList");
  const adjencyList = createAdjencyList(matrix);
  console.timeEnd("adjencyList");

  function getDistance(startGalaxy: string, endGalaxy: string) {
    const galaxies = adjencyList.keys();

    const start = findGalaxy(startGalaxy);
    const end = findGalaxy(endGalaxy);

    if (end && start) {
      return Math.abs(end.x - start.x) + Math.abs(end.y - start.y);
    } else {
      console.error({ end, endGalaxy });
      return 0;
    }

    function findGalaxy(galaxy: string) {
      for (const gal of galaxies) {
        if (gal.galaxy === galaxy) return gal;
      }
    }
  }

  const num1 = 1;
  const num2 = galaxyMax;
  let res = 0;
  for (let i = num1; i <= num2; i++) {
    for (let j = i; j <= num2; j++) {
      if (i !== j) {
        const temp = getDistance(String(i), String(j));
        res += Math.abs(temp);
      }
    }
  }
  return res;
}

function expandUniverse(data: string[]): { matrix: Matrix; galaxyMax: number } {
  console.time("expandUniverse");
  const matrix: Coordinate[][] = [];
  let galaxyCounter = 0;
  let galaxyNumber = 1;
  for (const dataElement of data) {
    const line = dataElement.split("");
    const temp: Coordinate[] = [];
    for (let x = 0; x < line.length; x++) {
      const galaxy = line[x];
      if (galaxy === "#") {
        temp.push({ x, y: galaxyCounter, galaxy: String(galaxyNumber) });
        galaxyNumber++;
      } else {
        temp.push({ x, y: galaxyCounter, galaxy });
      }
    }
    matrix.push(temp);
    if (temp.every((el) => el.galaxy === ".")) {
      galaxyCounter++;
      matrix.push(
        temp.map((el) => {
          return { ...el, y: galaxyCounter };
        })
      );
    }
    galaxyCounter++;
  }

  const expandedUniverse: Coordinate[][] = [];
  galaxyCounter = 0;
  const maxColumns = Math.max(...matrix[0].map((el) => el.x));
  for (let i = 0; i <= maxColumns; i++) {
    const col = selectMatrixColumn(matrix, i);
    galaxyCounter++;
    expandedUniverse.push(
      col.map((el) => {
        return {
          ...el,
          x: galaxyCounter,
        };
      })
    );
    if (col.every((el) => el.galaxy === ".")) {
      galaxyCounter++;
      expandedUniverse.push(
        col.map((el) => {
          return {
            ...el,
            x: galaxyCounter,
          };
        })
      );
    }
  }

  const dataMap: Map<number, Coordinate[]> = new Map();
  for (let index = 0; index <= expandedUniverse.length + 1; index++) {
    dataMap.set(
      index,
      expandedUniverse.flatMap((el) => el.filter((el) => el.y === index))
    );
  }
  console.timeEnd("expandUniverse");
  return { matrix: dataMap, galaxyMax: galaxyNumber - 1 };
}
