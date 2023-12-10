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
type Matrix = Map<number, Coordinate[]>;
function verticalAdjacents(coordinate: Coordinate, coord: Coordinate) {
  return coordinate.x - coord.x === 0;
}

function horizontalAdjacents(coordinate: Coordinate, coord: Coordinate) {
  return coordinate.x - coord.x === -1 || coordinate.x - coord.x === 1;
}

function allowedTile(coord: Coordinate, maxLength: number) {
  return coord.tile !== "." && (coord.x - 1 >= 0 || coord.x + 1 < maxLength);
}

export function getAdjacentTiles(coordinate: Coordinate, matrix: Matrix) {
  const possibleTiles = [];
  const maxLength = matrix.size;
  if (matrix.get(coordinate.y - 1)) {
    // UP
    const row = matrix.get(coordinate.y - 1)?.values();
    for (const target of row!) {
      if (
        allowedTile(target, maxLength) &&
        verticalAdjacents(coordinate, target)
      ) {
        possibleTiles.push(target);
      }
    }
  }
  // CURRENT
  if (matrix.get(coordinate.y)) {
    const row = matrix.get(coordinate.y)?.values();
    for (const target of row!) {
      if (
        allowedTile(target, maxLength) &&
        horizontalAdjacents(coordinate, target)
      ) {
        possibleTiles.push(target);
      }
    }
  }
  // DOWN
  if (matrix.get(coordinate.y + 1)) {
    const row = matrix.get(coordinate.y + 1)?.values();
    for (const target of row!) {
      if (
        allowedTile(target, maxLength) &&
        verticalAdjacents(coordinate, target)
      ) {
        possibleTiles.push(target);
      }
    }
  }
  return possibleTiles;
}

export function createAdjencyList(
  matrix: Matrix
): Map<Coordinate, Coordinate[]> {
  const adjencyList = new Map();
  for (const [, coordinates] of matrix.entries()) {
    for (const coordinate of coordinates) {
      const possibleTiles = getAdjacentTiles(coordinate, matrix);
      if (coordinate.tile === ".") continue;
      adjencyList.set(coordinate, possibleTiles);
    }
  }
  return adjencyList;
}
// export function getNextPoint(coords: Coordinates, tile: Tile) {}

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
  if (start) {
    const farthestPointFromStart = bfs(start, adjencyList);
    const yolo = bfs(
      [...farthestPointFromStart.values()].slice(-1),
      adjencyList
    );
    return yolo.size / 2; // :shrug:
  }
  return 1;
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
