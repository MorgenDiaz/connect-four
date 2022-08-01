class ConnectFourController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.model.registerEventListener(this);
    this.view.registerController(this);
    this.connectToWin = 4;
    this.isPlayingComputer = false;
  }

  onStartGameButtonClicked(player1, player2) {
    if (player2.computer) {
      this.isPlayingComputer = true;
    }
    this.model.startGame(
      this.connectToWin,
      player1,
      player2,
      this.isPlayingComputer
    );
  }

  onUserFocusColumn(col) {
    this.view.showChipHintAboveColumn(col, this.model.currentPlayer.color);
  }

  onUserAddChipToColumn(col) {
    col = Number(col);

    if (this.model.canAddChipToColumn(col)) {
      let row = this.model.nextAvailableRowForColumn(col);
      this.view.deleteChipHint();
      this.view.addChipToCell(row, col, this.model.currentPlayer.color);
      this.model.addChipToColumn(col);
    }
  }

  onGameStarted() {
    this.view.startGame(this.model.currentPlayer);
    if (
      this.isPlayingComputer &&
      this.model.currentPlayer === this.model.player2
    ) {
      this.onUserAddChipToColumn(this.model.getBotMove());
    }
  }

  onPlayerTurnEnded() {
    this.view.updateCurrentPlayer(this.model.currentPlayer);
    if (
      this.isPlayingComputer &&
      this.model.currentPlayer === this.model.player2
    ) {
      this.onUserAddChipToColumn(this.model.getBotMove());
    }
  }

  onPlayerStalemate() {
    this.view.updateStatusTie();
  }

  onPlayerWon() {
    this.view.updateStatusPlayerWon(this.model.currentPlayer);
  }

  onResetGameButtonClicked() {
    this.view.reset();
  }
}

export default ConnectFourController;
