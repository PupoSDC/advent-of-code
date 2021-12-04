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

  winningMove: number | undefined;
  winningNumber: number | undefined;
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
        winningMove: undefined,
        winningNumber: undefined,
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
      winningMove: undefined,
      winningNumber: undefined,
    },
  ]
);

(function findWinningMoveForEachBorad() {
  for (let j = 0; j < bingoInputs.length; j++) {
    const entry = bingoInputs[j];
    for (const board of boards) {
      const { combos, status, winningMove } = board;
      if (winningMove) continue;

      for (let i = 0; i < combos.length; i++) {
        const combo = combos[i];
        const stat = status[i];
        if (combo.includes(entry)) {
          stat.push(entry);
        }
        if (stat.length === combo.length) {
          board.winningMove = j;
          board.winningNumber = entry;
        }
      }
    }
  }
})();

const looserBoard = boards
  .filter((b) => b.winningMove)
  .sort((a, b) => Number(a.winningMove) - Number(b.winningMove))
  .pop();

if (!looserBoard) {
  throw new Error("no looser board found ???");
}

const uniqueBoardNumbers = [...new Set(looserBoard.combos.flatMap((i) => i))];
const uniqueSeenNumbers = [...new Set(looserBoard.status.flatMap((i) => i))];
const winningNumber = Number(looserBoard.winningNumber);
const sumOfunseenNumbers = uniqueBoardNumbers
  .filter((n) => !uniqueSeenNumbers.includes(n))
  .reduce((s, i) => s + i);

console.log(winningNumber * sumOfunseenNumbers);
