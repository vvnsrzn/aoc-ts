import {
  fetchAndWriteChallenge,
  readPuzzle,
  selectMatrixColumn,
  selectMatrixRow,
} from "./libs";

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
export function solver(data: string[]) {
  const expandedUniverse = expandUniverse(data);

  const adjencyList = createAdjencyList(expandedUniverse);
  const start = [...adjencyList.entries()].find((el) => {
    // const [key] = el;
    // return key.label === "1";
  });
  if (start) {
    // dfs(start, "2")
  }
  return 1;
}
function expandUniverse(data: string[]): Matrix {
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
    galaxyCounter++;
  }
  const dataMap: Map<number, Coordinate[]> = new Map();
  for (let index = 0; index < expandedUniverse.length - 1; index++) {
    dataMap.set(
      index,
      expandedUniverse.flatMap((el) => el.filter((el) => el.y === index))
    );
  }
  console.timeEnd("expandUniverse");
  return dataMap;
}
