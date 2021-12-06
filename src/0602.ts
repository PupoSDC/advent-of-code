import * as fs from "fs";

const fish = fs.readFileSync("./data/0600.txt", "utf8").split(",").map(Number);
const endTime = 256;

let day = 0;
let fishPerDay = fish.reduce((m, f) => {
  m[f]++;
  return m;
}, new Array(9).fill(0));

console.log("day ", 0, " ", fishPerDay.join(","));

while (day < endTime) {
  day++;
  fishPerDay = [...fishPerDay].reduce((m, n, i) => {
    if (i === 0) {
      m[8] += n;
      m[6] += n;
    } else {
      m[i - 1] += n;
    }
    return m;
  }, new Array(9).fill(0));
  console.log("day ", day, " ", fishPerDay.join(","));
}

console.log(fishPerDay.reduce((s, i) => s + i));
