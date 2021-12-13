import * as fs from "fs";

const [rawCoordinates, rawFolds] = fs
  .readFileSync("./data/1300.txt", "utf8")
  .split("\n\n");

const coordinates = rawCoordinates
  .split("\n")
  .reduce<number[][]>((sum, coordinate) => {
    const [x, y] = coordinate.split(",").map(Number);
    sum[y] ??= [];
    sum[y][x] = 1;
    return sum;
  }, []);

const folds = rawFolds
  .split("\n")
  .reduce<["y" | "x", number][]>((sum, fold) => {
    const [axis, coordinate] = fold.split("fold along ")[1].split("=");
    sum.push([axis as "x" | "y", Number(coordinate)]);
    return sum;
  }, []);

const finalCoordinates = folds
  .slice(0, 1)
  .reduce<number[][]>((oldCoordinates, [foldDiretion, axis]) => {
    const newCoordinates: number[][] = [];
    if (foldDiretion === "y") {
      for (let i = 0; i < axis; i++) {
        newCoordinates[i] = Object.assign(
          new Array(axis - 1),
          oldCoordinates[i],
          oldCoordinates[oldCoordinates.length - 1 - i]
        );
      }
    } else {
      for (let i = 0; i < oldCoordinates.length; i++) {
        for (let j = 0; j < axis; j++) {
          newCoordinates[i] ??= [];
          newCoordinates[i][j] =
            oldCoordinates[i]?.[j] ??
            oldCoordinates[i]?.[axis * 2 - j] ??
            undefined;
        }
      }
    }
    return newCoordinates;
  }, coordinates);

const visibleDots = finalCoordinates.flat().reduce((s, i) => s + (i ?? 0), 0);

console.log(visibleDots);
