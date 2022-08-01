import { Slot, Board } from "./connectFourBoard";
import * as TestData from "./testData.js";

function copyArray(a) {
  return JSON.parse(JSON.stringify(a));
}

function arraysAreSame(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function fillColumn(board, col) {
  for (let i = 0; i < 6; i++) {
    board.addChipToColumn(col, TestData.redChip);
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
  expect(connectFourBoard.chipCompletesChain(slot, TestData.redChip)).toBe(
    false
  );
});

test("chipCompletesChain should return false if the board is not an array", () => {
  connectFourBoard.board = 88;
  const slot = new Slot(5, 2);
  expect(connectFourBoard.chipCompletesChain(slot, TestData.redChip)).toBe(
    false
  );
});

test("chipCompletesChain should return false if the board has no chips", () => {
  expect(
    connectFourBoard.chipCompletesChain(new Slot(), TestData.redChip)
  ).toBe(false);
});

test("chipCompletesChain should not augment board", () => {
  connectFourBoard.board = copyArray(
    TestData.boardWithFourMatchingChipsHorizontally
  );

  const slot = new Slot(5, 2);
  connectFourBoard.chipCompletesChain(slot, TestData.redChip);

  expect(
    arraysAreSame(
      connectFourBoard.board,
      TestData.boardWithFourMatchingChipsHorizontally
    )
  ).toBe(true);
});

test("chipCompletesChain should return false if the chain of matching chips is less than winning chain", () => {
  connectFourBoard.board = TestData.boardWithThreeMatchingChipsHorizontally;
  const slot = new Slot(5, 2);
  expect(connectFourBoard.chipCompletesChain(slot, TestData.redChip)).toBe(
    false
  );
});

test("chipCompletesChain should return true if the board has a completed chain horizontally", () => {
  connectFourBoard.board = TestData.boardWithFourMatchingChipsHorizontally;
  const slot = new Slot(5, 2);
  expect(connectFourBoard.chipCompletesChain(slot, TestData.redChip)).toBe(
    true
  );
});

test("chipCompletesChain should return true if the board has a completed chain vertically", () => {
  connectFourBoard.board = TestData.boardWithFourMatchingChipsVertically;
  const slot = new Slot(2, 2);
  expect(connectFourBoard.chipCompletesChain(slot, TestData.redChip)).toBe(
    true
  );
});

test("chipCompletesChain should return true if the board has a completed chain diagonally right", () => {
  connectFourBoard.board = TestData.boardWithFourMatchingChipsDiagonallyRight;
  const slot = new Slot(2, 5);
  expect(connectFourBoard.chipCompletesChain(slot, TestData.redChip)).toBe(
    true
  );
});

test("chipCompletesChain should return true if the board has a completed chain diagonally left", () => {
  connectFourBoard.board = TestData.boardWithFourMatchingChipsDiagonallyLeft;
  const slot = new Slot(2, 1);
  expect(connectFourBoard.chipCompletesChain(slot, TestData.redChip)).toBe(
    true
  );
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
  connectFourBoard.addChipToColumn(2, TestData.redChip);

  expect(connectFourBoard.nextAvailableRowForColumn(2)).toBe(
    nextAvailableRowForColumn - 1
  );
});

test("addChipToColumn only adds changes one cell", () => {
  connectFourBoard.addChipToColumn(2, TestData.redChip);
  let filtered = connectFourBoard.board.filter((row) =>
    row.includes(TestData.redChip)
  );

  expect(filtered.length).toBe(1);
});

test("addChipToColumn changes slot to correct chip if column is not full", () => {
  let nextAvailableRowForColumn = connectFourBoard.nextAvailableRowForColumn(2);
  connectFourBoard.addChipToColumn(2, TestData.redChip);
  let slot = new Slot(nextAvailableRowForColumn, 2);

  expect(connectFourBoard.chipAtSlotMatches(slot, TestData.redChip)).toBe(true);
});
