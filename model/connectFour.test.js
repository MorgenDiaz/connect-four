import ConnectFour from "./connectFour";

const emptyChip = "empty";
const redChip = "red";
const emptyRow = [
  emptyChip,
  emptyChip,
  emptyChip,
  emptyChip,
  emptyChip,
  emptyChip,
];

const boardWithFourMatchingChipsHorizontally = [
  emptyRow,
  emptyRow,
  emptyRow,
  emptyRow,
  emptyRow,
  [redChip, redChip, redChip, redChip, emptyChip, emptyChip, emptyChip],
];

const boardWithFourMatchingChipsVertically = [
  [emptyChip, emptyChip, emptyChip, emptyChip, emptyChip, emptyChip, emptyChip],
  [emptyChip, emptyChip, emptyChip, emptyChip, emptyChip, emptyChip, emptyChip],
  [emptyChip, emptyChip, redChip, emptyChip, emptyChip, emptyChip, emptyChip],
  [emptyChip, emptyChip, redChip, emptyChip, emptyChip, emptyChip, emptyChip],
  [emptyChip, emptyChip, redChip, emptyChip, emptyChip, emptyChip, emptyChip],
  [emptyChip, emptyChip, redChip, emptyChip, emptyChip, emptyChip, emptyChip],
];

let connectFour = new ConnectFour();

beforeEach(() => {
  connectFour = new ConnectFour(4);
});

test("createBoard returns an array", () => {
  expect(Array.isArray(connectFour.createBoard())).toBe(true);
});

test("createBoard creates array with 6 rows", () => {
  let board = connectFour.createBoard();

  expect(board.length).toBe(6);

  for (let row of board) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("createBoard rows have 7 columns", () => {
  let board = connectFour.createBoard();
  for (let row of board) {
    expect(row.length).toBe(7);
  }
});

test("createBoard initializes all cells to empty", () => {
  let board = connectFour.createBoard();
  for (let row of board) {
    for (let column of row) {
      expect(column).toBe("empty");
    }
  }
});

test("chipCompletesChain should return false if the board is undefined", () => {
  connectFour.board = undefined;
  const chip = { row: 0, col: 0, name: "test" };
  expect(connectFour.chipCompletesChain(chip)).toBe(false);
});

test("chipCompletesChain should return false if the board is not an array", () => {
  connectFour.board = 88;
  const chip = { row: 0, col: 0, name: "test" };
  expect(connectFour.chipCompletesChain(chip)).toBe(false);
});

test("chipCompletesChain should return false if the board has no chips", () => {
  const chip = { row: 0, col: 0, name: "test" };
  expect(connectFour.chipCompletesChain(chip)).toBe(false);
});

test("chipCompletesChain should return true if the board has a completed chain horizontally", () => {
  connectFour.board = boardWithFourMatchingChipsHorizontally;
  const chip = { row: 5, col: 2, name: redChip };
  expect(connectFour.chipCompletesChain(chip)).toBe(true);
});

test("chipCompletesChain should return true if the board has a completed chain vertically", () => {
  connectFour.board = boardWithFourMatchingChipsVertically;
  const chip = { row: 2, col: 2, name: redChip };
  expect(connectFour.chipCompletesChain(chip)).toBe(true);
});
