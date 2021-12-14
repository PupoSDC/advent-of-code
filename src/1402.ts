import * as fs from "fs";

const [rawMolecule, rawInstructions] = fs
  .readFileSync("./data/1400.txt", "utf8")
  .split("\n\n");

const instructions = rawInstructions
  .split("\n")
  .reduce<Record<string, string>>((sum, entry) => {
    const [key, value] = entry.split(" -> ");
    sum[key] = key[0] + value + key[1];
    return sum;
  }, {});

const letterCount = rawMolecule.split("").reduce((sum, a) => {
  sum[a.charCodeAt(0) - 65]++;
  return sum;
}, new Array(26).fill(0));

let molecule = rawMolecule
  .split("")
  .reduce<Record<string, number>>((sum, letter, index, arr) => {
    const nextLetter = arr[index + 1];
    if (!nextLetter) return sum;
    sum[letter + nextLetter] ??= 0;
    sum[letter + nextLetter]++;
    return sum;
  }, {});

for (let i = 0; i < 40; i++) {
  const newMolecule: Record<string, number> = {};
  for (const [origin, result] of Object.entries(instructions)) {
    const incidences = molecule[origin];
    if (incidences) {
      newMolecule[result.slice(0, 2)] ??= 0;
      newMolecule[result.slice(1, 3)] ??= 0;
      newMolecule[result.slice(0, 2)] += incidences;
      newMolecule[result.slice(1, 3)] += incidences;
      letterCount[result.charCodeAt(1) - 65] += incidences;
    }
  }
  molecule = newMolecule;
}

const max = Math.max(...letterCount);
const min = Math.min(...letterCount.filter((i) => i));
console.log(max - min);
