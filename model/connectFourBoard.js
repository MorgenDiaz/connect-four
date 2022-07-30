class Slot {
  constructor(row = 0, col = 0) {
    this.row = row;
    this.col = col;
  }

  copy() {
    return new Slot(this.row, this.col);
  }

  moveUp() {
    this.row--;
  }

  moveDown() {
    this.row++;
  }

  moveRight() {
    this.col++;
  }

  moveLeft() {
    this.col--;
  }

  moveUpRight() {
    this.moveUp();
    this.moveRight();
  }

  moveDownRight() {
    this.moveDown();
    this.moveRight();
  }

  moveUpLeft() {
    this.moveUp();
    this.moveLeft();
  }

  moveDownLeft() {
    this.moveDown();
    this.moveLeft();
  }
}

class Board {
  #boardRows = 6;
  #boardCols = 7;
  #totalCells = this.#boardRows * this.#boardCols;
  #usedCells = 0;

  constructor(winningChainCount = 4) {
    this.nextAvailableSlotCache = {};
    this.board = this.createBoard();
    this.winningChainCount = winningChainCount;
  }

  createBoard() {
    let board = [];

    for (let i = 0; i < this.#boardRows; i++) {
      let row = [];

      for (let i = 0; i < this.#boardCols; i++) {
        row.push("empty");
      }

      board.push(row);
    }

    this.createNextAvailableSlotCache();
    return board;
  }

  createNextAvailableSlotCache() {
    this.nextAvailableSlotCache = {};

    for (let i = 0; i < this.#boardCols; i++) {
      this.nextAvailableSlotCache[i] = this.#boardRows - 1;
    }
  }

  getNumRows() {
    return this.#boardRows;
  }

  getNumCols() {
    return this.#boardCols;
  }

  isBoardFull() {
    return this.#totalCells - this.#usedCells == 0;
  }

  slotExistsInBoard(slot) {
    let validRow = slot.row >= 0 && slot.row < this.board.length;

    return validRow
      ? slot.col >= 0 && slot.col < this.board[slot.row].length
      : false;
  }

  chipAtSlot(slot) {
    return this.board[slot.row][slot.col];
  }

  chipAtSlotMatches(slot, chip) {
    return this.slotExistsInBoard(slot) && chip === this.chipAtSlot(slot);
  }

  countMatchingChipsToRight(startingSlot, chip) {
    let chips = 0;
    let slot = startingSlot.copy();

    slot.moveRight();

    while (this.chipAtSlotMatches(slot, chip)) {
      chips++;
      slot.moveRight();
    }

    return chips;
  }

  countMatchingChipsToLeft(startingSlot, chip) {
    let chips = 0;
    let slot = startingSlot.copy();

    slot.moveLeft();

    while (this.chipAtSlotMatches(slot, chip)) {
      chips++;
      slot.moveLeft();
    }

    return chips;
  }

  chipCompletesWinningChainHorizontally(slot, chip) {
    let chain = 1;
    chain += this.countMatchingChipsToLeft(slot, chip);
    chain += this.countMatchingChipsToRight(slot, chip);
    return chain >= this.winningChainCount;
  }

  countMatchingChipsAbove(startingSlot, chip) {
    let chips = 0;
    let slot = startingSlot.copy();

    slot.moveUp();

    while (this.chipAtSlotMatches(slot, chip)) {
      chips++;
      slot.moveUp();
    }

    return chips;
  }

  countMatchingChipsBelow(startingSlot, chip) {
    let chips = 0;
    let slot = startingSlot.copy();
    slot.moveDown();

    while (this.chipAtSlotMatches(slot, chip)) {
      chips++;
      slot.moveDown();
    }

    return chips;
  }

  chipCompletesWinningChainVertically(slot, chip) {
    let chain = 1;
    chain += this.countMatchingChipsAbove(slot, chip);
    chain += this.countMatchingChipsBelow(slot, chip);

    return chain >= this.winningChainCount;
  }

  countMatchingChipsAboveRight(startingSlot, chip) {
    let chips = 0;
    let slot = startingSlot.copy();

    slot.moveUpRight();

    while (this.chipAtSlotMatches(slot, chip)) {
      chips++;
      slot.moveUpRight();
    }

    return chips;
  }

  countMatchingChipsBelowLeft(startingSlot, chip) {
    let chips = 0;
    let slot = startingSlot.copy();

    slot.moveDownLeft();

    while (this.chipAtSlotMatches(slot, chip)) {
      chips++;
      slot.moveDownLeft();
    }

    return chips;
  }

  chipCompletesWinningChainDiagonallyRight(slot, chip) {
    let chain = 1;
    chain += this.countMatchingChipsAboveRight(slot, chip);
    chain += this.countMatchingChipsBelowLeft(slot, chip);

    return chain >= this.winningChainCount;
  }

  countMatchingChipsAboveLeft(startingSlot, chip) {
    let chips = 0;
    let slot = startingSlot.copy();

    slot.moveUpLeft();

    while (this.chipAtSlotMatches(slot, chip)) {
      chips++;
      slot.moveUpLeft();
    }

    return chips;
  }

  countMatchingChipsBelowRight(startingSlot, chip) {
    let chips = 0;
    let slot = startingSlot.copy();

    slot.moveDownRight();

    while (this.chipAtSlotMatches(slot, chip)) {
      chips++;
      slot.moveDownRight();
    }

    return chips;
  }

  chipCompletesWinningChainDiagonallyLeft(slot, chip) {
    let chain = 1;

    chain += this.countMatchingChipsAboveLeft(slot, chip);
    chain += this.countMatchingChipsBelowRight(slot, chip);

    return chain >= this.winningChainCount;
  }

  chipCompletesChain(slot, chip) {
    if (!this.board || !Array.isArray(this.board)) {
      return false;
    }

    return (
      this.chipCompletesWinningChainHorizontally(slot, chip) ||
      this.chipCompletesWinningChainVertically(slot, chip) ||
      this.chipCompletesWinningChainDiagonallyRight(slot, chip) ||
      this.chipCompletesWinningChainDiagonallyLeft(slot, chip)
    );
  }

  nextAvailableRowForColumn(col) {
    return this.nextAvailableSlotCache[col];
  }

  canAddChipToColumn(col) {
    return this.nextAvailableRowForColumn(col) !== -1;
  }

  addChipToColumn(col, chip) {
    if (this.canAddChipToColumn(col)) {
      this.board[this.nextAvailableRowForColumn(col)][col] = chip;
      this.nextAvailableSlotCache[col]--;
      this.#usedCells++;
    }
  }
}

export { Board, Slot };
