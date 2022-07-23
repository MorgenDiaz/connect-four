import { Slot, Board } from "./connectFour";

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

const boardWithFourMatchingChipsDiagonallyRight = [
  [emptyChip, emptyChip, emptyChip, emptyChip, emptyChip, emptyChip, emptyChip],
  [emptyChip, emptyChip, emptyChip, emptyChip, emptyChip, emptyChip, emptyChip],
  [emptyChip, emptyChip, emptyChip, emptyChip, emptyChip, redChip, emptyChip],
  [emptyChip, emptyChip, emptyChip, emptyChip, redChip, emptyChip, emptyChip],
  [emptyChip, emptyChip, emptyChip, redChip, emptyChip, emptyChip, emptyChip],
  [emptyChip, emptyChip, redChip, emptyChip, emptyChip, emptyChip, emptyChip],
];

const boardWithFourMatchingChipsDiagonallyLeft = [
  [emptyChip, emptyChip, emptyChip, emptyChip, emptyChip, emptyChip, emptyChip],
  [redChip, emptyChip, emptyChip, emptyChip, emptyChip, emptyChip, emptyChip],
  [emptyChip, redChip, emptyChip, emptyChip, emptyChip, redChip, emptyChip],
  [emptyChip, emptyChip, redChip, emptyChip, emptyChip, emptyChip, emptyChip],
  [emptyChip, emptyChip, emptyChip, redChip, emptyChip, emptyChip, emptyChip],
  [emptyChip, emptyChip, redChip, emptyChip, emptyChip, emptyChip, emptyChip],
];

let connectFourBoard = new Board();

beforeEach(() => {
  connectFourBoard = new Board(4);
});

test("createBoard returns an array", () => {
  expect(Array.isArray(connectFourBoard.createBoard())).toBe(true);
});

test("createBoard creates array with 6 rows", () => {
  let board = connectFourBoard.createBoard();

  expect(board.length).toBe(6);

  for (let row of board) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("createBoard rows have 7 columns", () => {
  let board = connectFourBoard.createBoard();
  for (let row of board) {
    expect(row.length).toBe(7);
  }
});

test("createBoard initializes all cells to empty", () => {
  let board = connectFourBoard.createBoard();
  for (let row of board) {
    for (let column of row) {
      expect(column).toBe("empty");
    }
  }
});

test("chipCompletesChain should return false if the board is undefined", () => {
  connectFourBoard.board = undefined;
  const chip = { row: 0, col: 0, name: "test" };
  expect(connectFourBoard.chipCompletesChain(chip)).toBe(false);
});

test("chipCompletesChain should return false if the board is not an array", () => {
  connectFourBoard.board = 88;
  const chip = { row: 0, col: 0, name: "test" };
  expect(connectFourBoard.chipCompletesChain(chip)).toBe(false);
});

test("chipCompletesChain should return false if the board has no chips", () => {
  const chip = { row: 0, col: 0, name: "test" };
  expect(connectFourBoard.chipCompletesChain(new Slot(), chip)).toBe(false);
});

test("chipCompletesChain should return true if the board has a completed chain horizontally", () => {
  connectFourBoard.board = boardWithFourMatchingChipsHorizontally;
  const slot = new Slot(5, 2);
  const chip = { name: redChip };
  expect(connectFourBoard.chipCompletesChain(slot, chip)).toBe(true);
});

test("chipCompletesChain should return true if the board has a completed chain vertically", () => {
  connectFourBoard.board = boardWithFourMatchingChipsVertically;
  const slot = new Slot(2, 2);
  const chip = { name: redChip };
  expect(connectFourBoard.chipCompletesChain(slot, chip)).toBe(true);
});

test("chipCompletesChain should return true if the board has a completed chain diagonally right", () => {
  connectFourBoard.board = boardWithFourMatchingChipsDiagonallyRight;
  const slot = new Slot(2, 5);
  const chip = { name: redChip };
  expect(connectFourBoard.chipCompletesChain(slot, chip)).toBe(true);
});

test("chipCompletesChain should return true if the board has a completed chain diagonally left", () => {
  connectFourBoard.board = boardWithFourMatchingChipsDiagonallyLeft;
  const slot = new Slot(2, 1);
  const chip = { name: redChip };
  expect(connectFourBoard.chipCompletesChain(slot, chip)).toBe(true);
});
