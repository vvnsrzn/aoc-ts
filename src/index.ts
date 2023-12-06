/**
 * Fonction pour résoudre le puzzle
 * Testable dans index.spec.ts
 */
export function solver() {
  const input = [
    {
      time: 42_899_189,
      distance: 308_117_012_911_467,
    },
  ];
  const res = [];
  for (const race of input) {
    let temp = 0;
    for (let h = 0; h <= race.time; h++) {
      const x = race.time - h;
      x * h > race.distance && temp++;
    }
    res.push(temp);
  }
  console.log(res.reduce((prev, curr) => prev * curr));
}
