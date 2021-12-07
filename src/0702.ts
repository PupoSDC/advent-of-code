import * as fs from "fs";

const crabs = fs.readFileSync("./data/0700.txt", "utf8").split(",").map(Number);

const calculateFuelNeeded = (target: number) =>
  crabs.reduce((fuel, pos) => {
    const distance = Math.abs(pos - target);
    const crabFuel = (distance * (distance + 1)) / 2;
    return fuel + crabFuel;
  }, 0);

const max = [...crabs].sort()[crabs.length - 1];

const fuels = new Array(max)
  .fill(0)
  .map((_, i) => calculateFuelNeeded(i))
  .sort();

console.log(fuels[0]);
