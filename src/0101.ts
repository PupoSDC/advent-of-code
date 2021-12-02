import * as fs from "fs";

const measurements = fs
  .readFileSync("./data/0100.txt", "utf8")
  .split("\n")
  .map(Number);

let numberOfSinks = 0;
for (let i = 1; i < measurements.length; i++) {
  numberOfSinks += Number(measurements[i] - measurements[i - 1] > 0);
}

console.log(numberOfSinks);
