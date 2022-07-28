class ConnectFourController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.model.registerEventListener(this);
    this.view.registerController(this);
    this.connectToWin = 4;
  }

  onStartGameButtonClicked(player1, player2) {
    this.model.startGame(this.connectToWin, player1, player2);
    this.view.startGame(this.model.currentPlayer);
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

  onPlayerTurnEnded() {
    this.view.updateCurrentPlayer(this.model.currentPlayer);
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
