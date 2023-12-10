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

type Tile = "|" | "-" | "L" | "J" | "7" | "F" | "." | "S";
type Coordinate = {
  x: number;
  y: number;
  tile: Tile;
};
type Direction = "north" | "south" | "east" | "west";
type Pipe = {
  [key in Direction]: boolean;
} & {
  label: Tile;
};
type Matrix = Map<number, Coordinate[]>;
type AdjacentFunction = {
  (target: Coordinate, coordinate: Coordinate): boolean;
};

const PIPES = [
  { label: "|", north: true, south: true, east: false, west: false },
  { label: "-", north: false, south: false, east: true, west: true },
  { label: "L", north: true, south: false, east: true, west: false },
  { label: "J", north: true, south: false, east: false, west: true },
  { label: "7", north: false, south: true, east: false, west: true },
  { label: "F", north: false, south: true, east: true, west: false },
] satisfies Pipe[];

function pipesMapper(start: Tile, destination: Tile, to: Direction): boolean {
  const startPipe = PIPES.find((el) => el.label === start)!;
  const destPipe = PIPES.find((el) => el.label === destination)!;
  if (start === "S" || destination === "S") return true;
  if (destPipe[to] && startPipe[to]) return true;
  if (startPipe[to] && !destPipe[to]) return true;
  return false;
}

function verticalAdjacents(coordinate: Coordinate, target: Coordinate) {
  const to = coordinate.y - target.y > 0 ? "north" : "south";
  if (coordinate.x - target.x === 0) {
    return pipesMapper(coordinate.tile, target.tile, to);
  }
  return false;
}

function horizontalAdjacents(coordinate: Coordinate, target: Coordinate) {
  if (coordinate.x - target.x === -1) {
    return pipesMapper(coordinate.tile, target.tile, "east");
  }
  if (coordinate.x - target.x === 1) {
    return pipesMapper(coordinate.tile, target.tile, "west");
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
    return coord.tile !== "." && (coord.x - 1 >= 0 || coord.x + 1 < maxLength);
  }
}

function createAdjencyList(matrix: Matrix): Map<Coordinate, Coordinate[]> {
  const adjencyList = new Map();
  for (const [, coordinates] of matrix.entries()) {
    for (const coordinate of coordinates) {
      if (coordinate.tile !== ".") {
        const possibleTiles = getAdjacentTiles(coordinate, matrix);
        adjencyList.set(coordinate, possibleTiles);
      }
    }
  }
  return adjencyList;
}

function bfs(
  start: [Coordinate, Coordinate[]],
  map: Map<Coordinate, Coordinate[]>
) {
  const queue = [start];
  const visited: Set<Coordinate> = new Set();
  visited.add(start[0]);
  while (queue.length > 0) {
    const next = queue.shift();
    if (next) {
      const destinations = map.get(next[0]);
      if (destinations) {
        for (const destination of destinations) {
          if (!visited.has(destination)) {
            visited.add(destination);
            queue.push([destination, map.get(destination)!]);
          }
        }
      }
    }
  }
  return visited;
}

/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver(data: string[]) {
  const matrix: Map<number, Coordinate[]> = new Map();
  for (let y = 0; y < data.length; y++) {
    const line = data[y].split("") as unknown as Tile[];
    const temp = [];
    for (let x = 0; x < line.length; x++) {
      const tile = line[x];
      temp.push({ x, y, tile });
    }
    matrix.set(y, temp);
  }
  const adjencyList = createAdjencyList(matrix);
  const start = [...adjencyList.entries()].find((el) => {
    const [key] = el;
    return key.tile === "S";
  });
  if (start) return bfs(start, adjencyList).size / 2;
}
