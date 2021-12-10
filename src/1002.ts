import * as fs from "fs";

type ValidChar = "(" | "[" | "{" | "<";

const scores: Record<ValidChar, number> = {
  "(": 1,
  "[": 2,
  "{": 3,
  "<": 4,
};

const results = fs
  .readFileSync("./data/1000.txt", "utf8")
  .split("\n")
  .map((line) => line.split(""))
  .map((line) => {
    const symbols: ValidChar[] = [];
    for (const c of line) {
      switch (c) {
        case "(":
        case "[":
        case "{":
        case "<":
          symbols.push(c);
          break;
        case ")":
          if (symbols.pop() !== "(") return undefined;
          break;
        case "]":
          if (symbols.pop() !== "[") return undefined;
          break;
        case "}":
          if (symbols.pop() !== "{") return undefined;
          break;
        case ">":
          if (symbols.pop() !== "<") return undefined;
          break;
      }
    }
    return symbols;
  })
  .filter((t): t is ValidChar[] => !!t)
  .map((line) => line.reverse().reduce((s, v) => s * 5 + scores[v], 0))
  .sort((a, b) => a - b);

console.log(results[Math.floor(results.length / 2)]);
