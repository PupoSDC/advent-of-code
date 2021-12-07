import * as fs from "fs";

const crabs = fs.readFileSync("./data/0700.txt", "utf8").split(",").map(Number);
const average = Math.floor(crabs.reduce((s, n) => s + n) / crabs.length);

const calculateFuelNeeded = (target: number) =>
  crabs.reduce((fuel, pos) => {
    const distance = Math.abs(pos - target);
    const crabFuel = (distance * (distance + 1)) / 2;
    return fuel + crabFuel;
  }, 0);

console.log(calculateFuelNeeded(average));
