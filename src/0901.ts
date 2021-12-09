import * as fs from "fs";

const map = fs
  .readFileSync("./data/0900.txt", "utf8")
  .split("\n")
  .reduce<number[][]>((s, l) => {
    s.push(l.split("").map(Number));
    return s;
  }, []);

let answer = 0;
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (
      map[i][j] < (map[i - 1]?.[j + 0] ?? 11) &&
      map[i][j] < (map[i + 1]?.[j + 0] ?? 11) &&
      map[i][j] < (map[i + 0]?.[j - 1] ?? 11) &&
      map[i][j] < (map[i + 0]?.[j + 1] ?? 11)
    ) {
      answer += map[i][j] + 1;
    }
  }
}

console.log(answer);
