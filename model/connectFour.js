class ConnectFour {
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

  countMatchingChipsToRight(chip) {
    let chips = 0;

    let c = chip.col + 1;

    while (
      c < this.board[chip.row].length &&
      this.board[chip.row][c] === chip.name
    ) {
      chips++;
      c++;
    }

    return chips;
  }

  countMatchingChipsToLeft(chip) {
    let chips = 0;

    let c = chip.col - 1;

    while (c >= 0 && this.board[chip.row][c] === chip.name) {
      chips++;
      c--;
    }

    return chips;
  }

  chipCompletesWinningChainHorizontally(chip) {
    let chain = 1;
    chain += this.countMatchingChipsToLeft(chip);
    chain += this.countMatchingChipsToRight(chip);

    return chain >= this.winningChainCount;
  }

  countMatchingChipsAbove(chip) {
    let chips = 0;
    let r = chip.row - 1;

    while (r >= 0 && this.board[r][chip.col] === chip.name) {
      chips++;
      r--;
    }

    return chips;
  }

  countMatchingChipsBelow(chip) {
    let chips = 0;
    let r = chip.row + 1;

    while (r < this.board.length && this.board[r][chip.col] === chip.name) {
      chips++;
      r++;
    }

    return chips;
  }

  chipCompletesWinningChainVertically(chip) {
    let chain = 1;
    chain += this.countMatchingChipsAbove(chip);
    chain += this.countMatchingChipsBelow(chip);

    return chain >= this.winningChainCount;
  }

  chipCompletesChain(chip) {
    if (!this.board || !Array.isArray(this.board)) {
      return false;
    }

    return (
      this.chipCompletesWinningChainHorizontally(chip) ||
      this.chipCompletesWinningChainVertically(chip)
    );
  }
}

export default ConnectFour;
