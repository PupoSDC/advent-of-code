import * as fs from "fs";

type OnesCounter = number[];

const lines = fs.readFileSync("./data/0300.txt", "utf8").split("\n");

const onesCounter = lines.reduce<OnesCounter>((sum, entry) => {
  const digits = entry.split("");
  digits.forEach((d, i) => {
    sum[i] = (sum[i] ?? 0) + Number(d === "1");
  });
  return sum;
}, []);

const gammaAsArray = onesCounter.map((n) => Number(n > lines.length / 2));
const gamma = parseInt(gammaAsArray.join(""), 2);

const epsilonAsArray = onesCounter.map((n) => Number(n < lines.length / 2));
const epsilon = parseInt(epsilonAsArray.join(""), 2);

console.log(gamma * epsilon);
