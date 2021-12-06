import * as fs from "fs";

const fish = fs.readFileSync("./data/0600.txt", "utf8").split(",").map(Number);
const endTime = 80;
let day = 0;

while (day < endTime) {
  day++;
  const numberOfFishForTheDay = fish.length;
  for (let i = 0; i < numberOfFishForTheDay; i++) {
    if (fish[i] === 0) {
      fish[i] = 6;
      fish.push(8);
    } else {
      fish[i]--;
    }
  }
}

console.log(fish.length);
