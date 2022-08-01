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

export {
  emptyChip,
  redChip,
  emptyRow,
  boardWithThreeMatchingChipsHorizontally,
  boardWithFourMatchingChipsHorizontally,
  boardWithFourMatchingChipsVertically,
  boardWithFourMatchingChipsDiagonallyRight,
  boardWithFourMatchingChipsDiagonallyLeft,
  boardWithFullColumn,
};
