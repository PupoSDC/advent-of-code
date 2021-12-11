import * as fs from "fs";

const octopuses = fs
  .readFileSync("./data/1100.txt", "utf8")
  .split("\n")
  .map((l) => l.split("").flatMap(Number));

const gridSize = octopuses.flat().length;

let flashes = 0;
let time = 0;

while (true) {
  time++;

  // step 1: increase power level of each octopus by 1
  for (let i = 0; i < octopuses.length; i++) {
    for (let j = 0; j < octopuses.length; j++) {
      octopuses[i][j]++;
    }
  }

  // step 2: flash! And kee flashing until no more flashes are possible
  while (true) {
    let flashed = false;
    for (let i = 0; i < octopuses.length; i++) {
      for (let j = 0; j < octopuses.length; j++) {
        if (octopuses[i][j] > 9) {
          flashes++;
          flashed = true;
          (octopuses[i - 1] ?? [])[j + 1]++;
          (octopuses[i + 0] ?? [])[j + 1]++;
          (octopuses[i + 1] ?? [])[j + 1]++;
          (octopuses[i - 1] ?? [])[j + 0]++;
          (octopuses[i + 0] ?? [])[j + 0] = NaN;
          (octopuses[i + 1] ?? [])[j + 0]++;
          (octopuses[i - 1] ?? [])[j - 1]++;
          (octopuses[i + 0] ?? [])[j - 1]++;
          (octopuses[i + 1] ?? [])[j - 1]++;
        }
      }
    }
    if (!flashed) break;
  }

  // step 3: Reset all flashed octopus to 0
  for (let i = 0; i < octopuses.length; i++) {
    for (let j = 0; j < octopuses.length; j++) {
      if (isNaN(octopuses[i][j])) {
        octopuses[i][j] = 0;
      }
    }
  }

  if (flashes === gridSize) {
    break;
  } else {
    flashes = 0;
  }
}

console.log(time);
