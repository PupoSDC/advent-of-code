import * as fs from "fs";

const result = fs
  .readFileSync("./data/1000.txt", "utf8")
  .split("\n")
  .map((line) => line.split(""))
  .map((line) => {
    const symbols = [];
    for (const c of line) {
      switch (c) {
        case "(":
        case "[":
        case "{":
        case "<":
          symbols.push(c);
          break;
        case ")":
          if (symbols.pop() !== "(") return 3;
          break;
        case "]":
          if (symbols.pop() !== "[") return 57;
          break;
        case "}":
          if (symbols.pop() !== "{") return 1197;
          break;
        case ">":
          if (symbols.pop() !== "<") return 25137;
          break;
      }
    }
  })
  .reduce((s, v) => s + (v ?? 0), 0);

console.log(result);
