import * as fs from "fs";

const measurements = fs
  .readFileSync("./data/0100.txt", "utf8")
  .split("\n")
  .map(Number);

let numberOfSinks = 0;
for (let i = 2; i < measurements.length - 1; i++) {
  const firstAverage =
    measurements[i - 2] + measurements[i - 1] + measurements[i];
  const secondAverage =
    measurements[i - 1] + measurements[i] + measurements[i + 1];
  numberOfSinks += Number(secondAverage - firstAverage > 0);
}

console.log(numberOfSinks);
