import * as fs from "fs";

const [rawCoordinates, rawFolds] = fs
  .readFileSync("./data/1300.txt", "utf8")
  .split("\n\n");

const folds = rawFolds
  .split("\n")
  .reduce<["y" | "x", number][]>((sum, fold) => {
    const [axis, coordinate] = fold.split("fold along ")[1].split("=");
    sum.push([axis as "x" | "y", Number(coordinate)]);
    return sum;
  }, []);

const gridHorizontalSize =
  (folds.find((fold) => fold[0] === "x")?.[1] ?? 0) * 2 + 1;
const gridVerticalSize =
  (folds.find((fold) => fold[0] === "y")?.[1] ?? 0) * 2 + 1;
const emptyGrid: number[][] = new Array(gridVerticalSize)
  .fill(0)
  .map(() => new Array(gridHorizontalSize).fill(0));

const initialGrid = rawCoordinates
  .split("\n")
  .reduce<number[][]>((sum, coordinate) => {
    const [x, y] = coordinate.split(",").map(Number);
    sum[y][x] = 1;
    return sum;
  }, emptyGrid);

//console.log(initialGrid.map(l => l.map(n => n ? "#" : ".").join("")).join("\n"));

const finalGrid = folds.reduce<number[][]>((oldGrid, [foldDiretion, axis]) => {
  const newGrid: number[][] = [];
  if (foldDiretion === "y") {
    for (let i = 0; i < axis; i++) {
      for (let j = 0; j < oldGrid[i].length; j++) {
        newGrid[i] ??= [];
        newGrid[i][j] = oldGrid[i]?.[j] || oldGrid[axis * 2 - i]?.[j] || 0;
      }
    }
  } else {
    for (let i = 0; i < oldGrid.length; i++) {
      for (let j = 0; j < axis; j++) {
        newGrid[i] ??= [];
        newGrid[i][j] = oldGrid[i]?.[j] || oldGrid[i]?.[axis * 2 - j] || 0;
      }
    }
  }

  return newGrid;
}, initialGrid);

console.log(
  finalGrid.map((l) => l.map((n) => (n ? "#" : ".")).join("")).join("\n")
);
const visibleDots = finalGrid.flat().reduce((s, i) => s + (i ?? 0), 0);

console.log(visibleDots);
