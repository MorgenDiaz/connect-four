class ConnectFourController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.model.registerEventListener(this);
    this.view.registerController(this);
    this.connectToWin = 4;
    this.model.startGame(
      this.connectToWin,
      { name: "morgen", color: "blue" },
      { name: "goku", color: "black" }
    );
  }

  onUserFocusColumn(col) {
    this.view.showChipHintAboveColumn(col, this.model.currentPlayer.color);
  }

  onUserAddChipToColumn(col) {
    col = Number(col);
    if (this.model.canAddChipToColumn(col)) {
      let row = this.model.nextAvailableRowForColumn(col);
      this.view.addChipToCell(row, col, this.model.currentPlayer.color);
      this.model.addChipToColumn(col);
      this.view.deleteChipHint();
    }
  }

  onPlayerWon() {
    alert("Victory!!!");
  }
}

export default ConnectFourController;
