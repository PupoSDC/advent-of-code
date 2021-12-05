import * as fs from "fs";

type Coordinates = {
  x1: number;
  y1: number;
  n: number;
  dy: number;
  dx: number;
};

type Map = number[][];

const pointsThatAreHigherThan2 = fs
  .readFileSync("./data/0500.txt", "utf8")
  .split("\n")
  .map((s) => s.replace(" -> ", ",").split(",").map(Number))
  .map<Coordinates>(([x1, y1, x2, y2]) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const n = Math.max(Math.abs(dy), Math.abs(dx));
    return { x1, y1, dx, dy, n };
  })
  .reduce<Map>((map, { x1, y1, dx, dy, n }) => {
    for (let i = 0; i <= n; i++) {
      const x = x1 + (dx / n) * i;
      const y = y1 + (dy / n) * i;
      map[x] ??= [];
      map[x][y] ??= 0;
      map[x][y] += 1;
    }
    return map;
  }, [])
  .flat()
  .filter((n) => n >= 2).length;

console.log(pointsThatAreHigherThan2);
