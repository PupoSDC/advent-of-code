import * as fs from "fs";

const crabs = fs.readFileSync("./data/0700.txt", "utf8").split(",").map(Number);

const fuels = [];
const max = crabs.sort()[crabs.length - 1];
const calculateFuelNeeded = (target: number) =>
  crabs.reduce((fuel, pos) => fuel + Math.abs(pos - target), 0);

for (let i = 0; i < max; i++) {
  fuels[i] = calculateFuelNeeded(i);
}

console.log(fuels.sort()[0]);
