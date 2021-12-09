import * as fs from "fs";

type Coordinate = [number, number];

const map = fs
  .readFileSync("./data/0900.txt", "utf8")
  .split("\n")
  .reduce<number[][]>((s, l) => {
    s.push(l.split("").map(Number));
    return s;
  }, []);

const lowPoints = map.reduce<Coordinate[]>((sum, _, i, arr) => {
  for (let j = 0; j < arr[i].length; j++) {
    if (
      arr[i][j] < (arr[i - 1]?.[j + 0] ?? 11) &&
      arr[i][j] < (arr[i + 1]?.[j + 0] ?? 11) &&
      arr[i][j] < (arr[i + 0]?.[j - 1] ?? 11) &&
      arr[i][j] < (arr[i + 0]?.[j + 1] ?? 11)
    ) {
      sum.push([i, j]);
    }
  }
  return sum;
}, []);

const basinSizes = lowPoints.reduce<number[]>((sum, pos) => {
  const basinPoints: boolean[][] = [];
  const unexploredPoints = [pos];
  while (unexploredPoints.length) {
    const [i, j] = unexploredPoints.pop() ?? [0, 0];
    [
      [i + 1, j + 0],
      [i - 1, j + 0],
      [i + 0, j + 1],
      [i + 0, j - 1],
    ].forEach(([k, l]) => {
      if ((map[k]?.[l] ?? 9) !== 9 && !basinPoints[k]?.[l]) {
        unexploredPoints.push([k, l]);
        basinPoints[k] ??= [];
        basinPoints[k][l] = true;
      }
    });
  }

  sum.push(basinPoints.flat().filter((n) => n).length);
  return sum;
}, []);

const result = [...basinSizes]
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((s, n) => s * n);

console.log(result);
