import * as fs from "fs";

enum Command {
  FORWARD = "forward",
  DOWN = "down",
  UP = "up",
}

type Position = {
  aim: number;
  depth: number;
  horizontal: number;
};

const position = fs
  .readFileSync("./data/0200.txt", "utf8")
  .split("\n")
  .reduce<Position>(
    (position, entry) => {
      const split = entry.split(" ");
      const command = split[0] as Command;
      const value = Number(split[1]);
      switch (command) {
        case Command.DOWN:
          position.aim += value;
          break;
        case Command.UP:
          position.aim -= value;
          break;
        case Command.FORWARD:
          position.horizontal += value;
          position.depth += value * position.aim;
          break;
      }
      return position;
    },
    { depth: 0, horizontal: 0, aim: 0 }
  );

console.log(position.depth * position.horizontal);
