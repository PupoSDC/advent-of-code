import * as fs from "fs";

const [rawMolecule, rawInstructions] = fs
  .readFileSync("./data/1400.txt", "utf8")
  .split("\n\n");

const instructions = rawInstructions
  .split("\n")
  .reduce<Record<string, string>>((sum, entry) => {
    const [key, value] = entry.split(" -> ");
    sum[key] = value;
    return sum;
  }, {});

let molecule = rawMolecule;

for (let i = 0; i < 10; i++) {
  molecule = molecule.split("").reduce<string>((sum, letter, index, arr) => {
    const nextLetter = arr[index + 1] ?? "-----";
    const newLetter = instructions[letter + nextLetter] ?? "";
    return sum + letter + newLetter;
  }, "");
}

const heatMap = molecule
  .split("")
  .reduce<Record<string, number>>((sum, item) => {
    sum[item] ??= 0;
    sum[item]++;
    return sum;
  }, {});

const result = Object.values(heatMap).sort((a, b) => b - a);

console.log(result[0] - result[result.length - 1]);
