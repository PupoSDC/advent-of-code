import * as fs from "fs";

const outputs = fs
  .readFileSync("./data/0801.txt", "utf8")
  .split("\n")
  .flatMap((line) => line.split(" | ")[1])
  .flatMap((line) => line.split(" "))
  .map((a) => a.length)
  .reduce<Record<string, number>>((s, a) => {
    s[a] = (s[a] ?? 0) + 1;
    return s;
  }, {});

console.log(outputs[2] + outputs[3] + outputs[4] + outputs[7]);
