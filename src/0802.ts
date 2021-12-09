import * as fs from "fs";

type Cypher = {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
};

// prettier-ignore
const getCypher = (combos: string[]): Cypher => {
  const sortedCombos = combos.map((c) => c.split("").sort().join(""));

  const cypher: Cypher = {
    0: "",
    1: sortedCombos.find((c) => c.length === 2)!,
    2: "",
    3: "",
    4: sortedCombos.find((c) => c.length === 4)!,
    5: "",
    6: "",
    7: sortedCombos.find((c) => c.length === 3)!,
    8: sortedCombos.find((c) => c.length === 7)!,
    9: "",
  };

  const sortedSizeSix = sortedCombos.filter((c) => c.length === 6);

  cypher[9] = sortedSizeSix.find((c) => cypher[4].split("").reduce<boolean>((s, t) => s && c.includes(t), true))!;
  cypher[6] = sortedSizeSix.find((c) => !cypher[1].split("").reduce<boolean>((s, t) => s && c.includes(t), true))!;
  cypher[0] = sortedSizeSix.find((c) => c !== cypher[9] && c !== cypher[6])!;

  const sortedSizeFive = sortedCombos.filter((c) => c.length === 5);

  cypher[3] = sortedSizeFive.find((c) => cypher[1]!.split("").reduce<boolean>((s, t) => s && c.includes(t), true))!;
  cypher[5] = sortedSizeFive.find((c) => c.split("").reduce<boolean>((s, t) => s && cypher[6].includes(t), true))!;
  cypher[2] = sortedSizeFive.find((c) => c !== cypher[3] && c !== cypher[5])!;

  return cypher;
};

const decypherCode = (combos: string[], cypher: Cypher): number => {
  const sortedCombos = combos.map((c) => c.split("").sort().join(""));
  return Number(
    sortedCombos
      .map((c) => Object.values(cypher).findIndex((v) => c === v))
      .join("")
  );
};

const result = fs
  .readFileSync("./data/0800.txt", "utf8")
  .split("\n")
  .map((line) => line.split(" | "))
  .map((line) => line.map((l) => l.split(" ")))
  .map(([input, output]) => decypherCode(output, getCypher(input)))
  .reduce((s, n) => s + n);

console.log(result);
