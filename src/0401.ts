import * as fs from "fs";

type GameBoard = {
  /**
   * Each combo represents a line or a column
   */
  combos: Array<number[]>;
  /**
   * Each status represents the progress for combo. When a status length is the
   * same as the respective combos entry we have a winner!
   */
  status: Array<number[]>;
};

const lines = fs.readFileSync("./data/0400.txt", "utf8").split("\n");

const bingoInputs = lines.shift()?.split(",").map(Number) ?? [];

const boards = [...lines.slice(1), ""].reduce<GameBoard[]>(
  (boards, line) => {
    const currentBoard = boards.length - 1;
    const endOfBoard = line === "";
    if (endOfBoard) {
      const rows = boards[currentBoard].combos;

      const columns = rows.reduce<GameBoard["combos"]>(
        (sum, row, i) => {
          row.forEach((v, j) => (sum[j][i] = v));
          return sum;
        },
        new Array(rows[0].length).fill(0).map(() => [])
      );

      const finalCombosWithRowsAndColumns = [...rows, ...columns];
      boards[currentBoard].combos = finalCombosWithRowsAndColumns;
      boards[currentBoard].status = finalCombosWithRowsAndColumns.map(() => []);

      boards.push({
        combos: [],
        status: [],
      });
      return boards;
    }

    const row = line
      .split(" ")
      .filter((n) => n)
      .map(Number)
      .filter((n) => !isNaN(n));

    boards[currentBoard].combos.push(row);
    return boards;
  },
  [
    {
      combos: [],
      status: [],
    },
  ]
);

const { winningBoard, lastNumber } = (function findWinningBoard() {
  for (const entry of bingoInputs) {
    for (const board of boards) {
      const { combos, status } = board;
      for (let i = 0; i < combos.length; i++) {
        const combo = combos[i];
        const stat = status[i];
        if (combo.includes(entry)) {
          stat.push(entry);
        }
        if (stat.length === combo.length) {
          return {
            winningBoard: board,
            lastNumber: entry,
          };
        }
      }
    }
  }
  throw new Error("no winnger found !?");
})();

const uniqueBoardNumbers = [...new Set(winningBoard.combos.flatMap((i) => i))];
const uniqueSeenNumbers = [...new Set(winningBoard.status.flatMap((i) => i))];
const sumOfunseenNumbers = uniqueBoardNumbers
  .filter((n) => !uniqueSeenNumbers.includes(n))
  .reduce((s, i) => s + i);

console.log(sumOfunseenNumbers * lastNumber);
