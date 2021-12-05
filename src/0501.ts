import * as fs from "fs";

type Coordinates = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

const map: number[][] = [];

const lines: Array<Coordinates> = fs
  .readFileSync("./data/0500.txt", "utf8")
  .split("\n")
  .map((s) => s.split(" -> ").join(",").split(",").map(Number))
  .map(([x1, y1, x2, y2]) => ({
    x1: x1 > x2 ? x2 : x1,
    x2: x1 > x2 ? x1 : x2,
    y1: y1 > y2 ? y2 : y1,
    y2: y1 > y2 ? y1 : y2,
  }))
  .filter(({ x1, x2, y1, y2 }) => x1 === x2 || y1 === y2);

lines.forEach(({ x1, x2, y1, y2 }) => {
  for (let i = x1; i <= x2; i++) {
    map[i] ??= [];
    for (let j = y1; j <= y2; j++) {
      map[i][j] ??= 0;
      map[i][j] += 1;
    }
  }
});

const pointsThatAreHigherThan2 = map
  .flatMap((i) => i)
  .filter((n) => n >= 2).length;

console.log(pointsThatAreHigherThan2);
