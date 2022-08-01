import ConnectBot from "./ai/connectBot.js";
import { Board, Slot } from "./connectFourBoard.js";
class ConnectFour {
  constructor() {
    this.eventListener = null;
    this.board = null;
    this.player1 = null;
    this.player2 = null;
    this.connectBot = null;
    this.currentPlayer = null;
  }

  registerEventListener(listener) {
    this.eventListener = listener;
  }

  startGame(connectToWin, player1, player2, playComputer) {
    this.board = new Board(connectToWin);
    this.player1 = player1;
    this.player2 = player2;

    if (playComputer) {
      const computerDifficulty = this.getComputerDifficulty(
        player2.computerDifficulty
      );

      this.connectBot = new ConnectBot(
        player2.name,
        player1.name,
        computerDifficulty
      );
    }

    this.currentPlayer = this.selectRandomPlayer();
    this.eventListener.onGameStarted();
  }

  getComputerDifficulty(selection) {
    switch (selection) {
      case "easy":
        return ConnectBot.easy_difficulty;
      case "medium":
        return ConnectBot.medium_difficulty;
    }
  }

  selectRandomPlayer() {
    let random = Math.random();

    if (random < 0.5) {
      return this.player1;
    }

    return this.player2;
  }

  switchCurrentPlayer() {
    switch (this.currentPlayer) {
      case this.player1:
        this.currentPlayer = this.player2;
        break;
      case this.player2:
        this.currentPlayer = this.player1;
        break;
    }
  }

  canAddChipToColumn(col) {
    return this.board.canAddChipToColumn(col, this.currentPlayer.name);
  }

  nextAvailableRowForColumn(col) {
    return this.board.nextAvailableRowForColumn(col);
  }

  addChipToColumn(col) {
    const row = this.nextAvailableRowForColumn(col);
    const targetSlot = new Slot(row, col);

    if (this.board.chipCompletesChain(targetSlot, this.currentPlayer.name)) {
      this.eventListener.onPlayerWon();
      return;
    }

    this.board.addChipToColumn(col, this.currentPlayer.name);

    if (this.board.isBoardFull()) {
      this.eventListener.onPlayerStalemate();
      return;
    }

    this.switchCurrentPlayer();
    this.eventListener.onPlayerTurnEnded();
  }

  getBotMove() {
    return this.connectBot.generateMove(this.board);
  }
}

export default ConnectFour;
