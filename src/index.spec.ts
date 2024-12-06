import { describe, expect, test } from "vitest";
import { hxc, specFile } from "./constants.ts";
import { solver, getObstacle, type Tile } from "./index.ts";
import { postAnswer, readPuzzle } from "./libs/puzzle/index.ts";

describe('getObstacle', () => {
  test('> - with 0,0', () => {
    const obstacle = getObstacle(fixtureOne, ">", 0, 0)
    expect(obstacle).toMatchInlineSnapshot(`
      {
        "x": 9,
        "y": 0,
      }
    `)
  })
  test('> - with 13,0', () => {
    const obstacle = getObstacle(fixtureOne, ">", 13, 0)
    expect(obstacle).toMatchInlineSnapshot(`
      {
        "x": 85,
        "y": 0,
      }
    `)
  })
  test('> - with 92,0', () => {
    const obstacle = getObstacle(fixtureOne, ">", 92, 0)
    expect(obstacle).toMatchInlineSnapshot(`
      {
        "x": 113,
        "y": 0,
      }
    `)
  })
  test('> - with 105,0', () => {
    const obstacle = getObstacle(fixtureOne, ">", 105, 0)
    expect(obstacle).toMatchInlineSnapshot(`
      {
        "x": 113,
        "y": 0,
      }
    `)
  })
  test('< - with 23,0', () => {
    const obstacle = getObstacle(fixtureTwo, "<", 23, 0)
    expect(obstacle).toMatchInlineSnapshot(`
      {
        "x": 9,
        "y": 0,
      }
    `)
  })
  test('< - with 130,0', () => {
    const obstacle = getObstacle(fixtureTwo, "<", 130, 0)
    expect(obstacle).toMatchInlineSnapshot(`
      {
        "x": 113,
        "y": 0,
      }
    `)
  })
  test('^ - with 130,0', () => {
    const obstacle = getObstacle(fixtureOne, "^", 0, 130)
    expect(obstacle).toMatchInlineSnapshot(`
      {
        "x": 0,
        "y": 113,
      }
    `)
  })
})

describe("AoC", () => {
  test("Spec #1", async () => {
    const input = readPuzzle(specFile(1)); // vérifier l'id de la spec à tester ! (inputs/year)
    expect(solver(input)).toEqual(41);

    if (!hxc) {
      return;
    }
    // const data = readPuzzle();
    // const candidate = solver(data);
    // console.log({ candidate })
    // if (candidate && candidate > 185) {
    // await postAnswer(candidate);
    // }
  }, 333_333_333); // mes chiffres porte-bonheur, à la discrétion du développeur, mais c'est aussi un timeout :)
});


const fixtureOne: Tile[] = ".........#...........................................................................#.....>.....................#................".split('')
const fixtureTwo: Tile[] = ".........#...........................................................................#.....<.....................#................".split('')