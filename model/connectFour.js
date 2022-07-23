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
  constructor(winningChainCount = 4) {
    this.board = this.createBoard();
    this.winningChainCount;
    this.winningChainCount = winningChainCount;
  }

  createBoard() {
    let board = [];
    let row = [];

    for (let i = 0; i < 7; i++) {
      row.push("empty");
    }

    for (let i = 0; i < 6; i++) {
      board.push(row);
    }

    return board;
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
    return this.slotExistsInBoard(slot) && chip == this.chipAtSlot(slot);
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
    chain += this.countMatchingChipsToLeft(slot, chip.name);
    chain += this.countMatchingChipsToRight(slot, chip.name);

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
    chain += this.countMatchingChipsAbove(slot, chip.name);
    chain += this.countMatchingChipsBelow(slot, chip.name);

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
      this.chipCompletesWinningChainDiagonallyRight(slot, chip.name) ||
      this.chipCompletesWinningChainDiagonallyLeft(slot, chip.name)
    );
  }
}

export { Board, Slot };
