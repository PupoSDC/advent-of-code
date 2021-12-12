import * as fs from "fs";

type Caves = Record<string, string[]>;
type Path = string;

const caveSystem = fs
  .readFileSync("./data/1200.txt", "utf8")
  .split("\n")
  .reduce<Caves>((caves, line) => {
    const [a, b] = line.split("-");
    const caveA = caves[a] ?? [];
    const caveB = caves[b] ?? [];
    const newCaves = {
      ...caves,
      [a]: [...caveA, b],
      [b]: [...caveB, a],
    };
    delete newCaves["end"];
    return newCaves;
  }, {});

const paths: Path[] = (() => {
  const queue: Path[] = [];
  const paths: Path[] = [];
  queue.push("start");
  while (queue.length > 0) {
    const path = queue.shift() ?? "";
    const pos = path.split(",").pop() ?? "";

    if (pos === "end") {
      paths.push(path);
      console.log(`${paths.length} foundPath! ${path}`);
      continue;
    }

    caveSystem[pos].forEach((newPosition) => {
      const isSmallCave = newPosition === newPosition.toLowerCase();
      const newPath = `${path},${newPosition}`;
      const smallCavesVisited = path
        .split(",")
        .filter((pos) => pos === pos.toLowerCase())
        .reduce<Record<string, number>>((map, entry) => {
          map[entry] = (map[entry] ?? 0) + 1;
          return map;
        }, {});

      const hasVisitedSmallCaveTwice =
        Object.values(smallCavesVisited).includes(2);

      if (
        isSmallCave &&
        hasVisitedSmallCaveTwice &&
        path.includes(newPosition)
      ) {
        return;
      }

      if (newPosition === "start") {
        return;
      }

      if (queue.includes(newPath)) {
        return;
      }
      queue.push(newPath);
    });
  }

  return paths;
})();

console.log(paths.length);
