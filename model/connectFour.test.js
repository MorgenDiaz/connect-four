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

const boardWithThreeMatchingChipsHorizontally = [
  emptyRow,
  emptyRow,
  emptyRow,
  emptyRow,
  emptyRow,
  [redChip, redChip, redChip, emptyChip, emptyChip, emptyChip, emptyChip],
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

const boardWithFullColumn = [
  [emptyChip, emptyChip, redChip, emptyChip, emptyChip, emptyChip, emptyChip],
  [redChip, emptyChip, redChip, emptyChip, emptyChip, emptyChip, emptyChip],
  [emptyChip, redChip, redChip, emptyChip, emptyChip, redChip, emptyChip],
  [emptyChip, emptyChip, redChip, emptyChip, emptyChip, emptyChip, emptyChip],
  [emptyChip, emptyChip, redChip, redChip, emptyChip, emptyChip, emptyChip],
  [emptyChip, emptyChip, redChip, emptyChip, emptyChip, emptyChip, emptyChip],
];

function copyArray(a) {
  return JSON.parse(JSON.stringify(a));
}

function arraysAreSame(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function fillColumn(board, col) {
  for (let i = 0; i < 6; i++) {
    board.addChipToColumn(col, redChip);
  }
}

let connectFourBoard = null;

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
  const slot = new Slot(0, 0);
  expect(connectFourBoard.chipCompletesChain(slot, redChip)).toBe(false);
});

test("chipCompletesChain should return false if the board is not an array", () => {
  connectFourBoard.board = 88;
  const slot = new Slot(5, 2);
  expect(connectFourBoard.chipCompletesChain(slot, redChip)).toBe(false);
});

test("chipCompletesChain should return false if the board has no chips", () => {
  expect(connectFourBoard.chipCompletesChain(new Slot(), redChip)).toBe(false);
});

test("chipCompletesChain should not augment board", () => {
  connectFourBoard.board = copyArray(boardWithFourMatchingChipsHorizontally);

  const slot = new Slot(5, 2);
  connectFourBoard.chipCompletesChain(slot, redChip);

  expect(
    arraysAreSame(
      connectFourBoard.board,
      boardWithFourMatchingChipsHorizontally
    )
  ).toBe(true);
});

test("chipCompletesChain should return false if the chain of matching chips is less than winning chain", () => {
  connectFourBoard.board = boardWithThreeMatchingChipsHorizontally;
  const slot = new Slot(5, 2);
  expect(connectFourBoard.chipCompletesChain(slot, redChip)).toBe(false);
});

test("chipCompletesChain should return true if the board has a completed chain horizontally", () => {
  connectFourBoard.board = boardWithFourMatchingChipsHorizontally;
  const slot = new Slot(5, 2);
  expect(connectFourBoard.chipCompletesChain(slot, redChip)).toBe(true);
});

test("chipCompletesChain should return true if the board has a completed chain vertically", () => {
  connectFourBoard.board = boardWithFourMatchingChipsVertically;
  const slot = new Slot(2, 2);
  expect(connectFourBoard.chipCompletesChain(slot, redChip)).toBe(true);
});

test("chipCompletesChain should return true if the board has a completed chain diagonally right", () => {
  connectFourBoard.board = boardWithFourMatchingChipsDiagonallyRight;
  const slot = new Slot(2, 5);
  expect(connectFourBoard.chipCompletesChain(slot, redChip)).toBe(true);
});

test("chipCompletesChain should return true if the board has a completed chain diagonally left", () => {
  connectFourBoard.board = boardWithFourMatchingChipsDiagonallyLeft;
  const slot = new Slot(2, 1);
  expect(connectFourBoard.chipCompletesChain(slot, redChip)).toBe(true);
});

test("canAddChipToColumn returns true if column is not full", () => {
  expect(connectFourBoard.canAddChipToColumn(0)).toBe(true);
});

test("canAddChipToColumn returns false if column is full", () => {
  fillColumn(connectFourBoard, 0);
  expect(connectFourBoard.canAddChipToColumn(0)).toBe(false);
});

test("addChipToColumn does not change next available slot if column is full", () => {
  fillColumn(connectFourBoard, 2);
  let nextAvailableRowForColumn = connectFourBoard.nextAvailableRowForColumn(2);
  connectFourBoard.addChipToColumn(2);

  expect(connectFourBoard.nextAvailableRowForColumn(2)).toBe(
    nextAvailableRowForColumn
  );
});

test("addChipToColumn changes next available slot to next row up if column is not full", () => {
  let nextAvailableRowForColumn = connectFourBoard.nextAvailableRowForColumn(2);
  connectFourBoard.addChipToColumn(2, redChip);

  expect(connectFourBoard.nextAvailableRowForColumn(2)).toBe(
    nextAvailableRowForColumn - 1
  );
});

test("addChipToColumn only adds changes one cell", () => {
  connectFourBoard.addChipToColumn(2, redChip);
  let filtered = connectFourBoard.board.filter((row) => row.includes(redChip));

  expect(filtered.length).toBe(1);
});

test("addChipToColumn changes slot to correct chip if column is not full", () => {
  let nextAvailableRowForColumn = connectFourBoard.nextAvailableRowForColumn(2);
  connectFourBoard.addChipToColumn(2, redChip);
  let slot = new Slot(nextAvailableRowForColumn, 2);

  expect(connectFourBoard.chipAtSlotMatches(slot, redChip)).toBe(true);
});
