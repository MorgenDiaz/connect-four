import GameSetupControlsElement from "./gameSetupControls.js";
import BoardElement from "./board.js";
import ChipElement from "./chip.js";
class ConnectFourView {
  #controller = null;
  #setupControls = null;
  #main = null;
  #board = null;
  #chipHint = null;

  constructor() {
    this.#setupControls = new GameSetupControlsElement(
      this.onStartGameButtonClicked.bind(this)
    );
    this.#main = document.querySelector("main");
    this.#board = new BoardElement();
  }

  registerController(controller) {
    this.#controller = controller;
  }

  startGame() {
    this.#board.generateBoard(
      6,
      7,
      this.onBoardColumnHovered.bind(this),
      this.onBoardColumnClicked.bind(this)
    );
  }

  calculateChipHintPosition(rect) {
    //split the dif between cell size and chip size to center
    return {
      top: rect.top - 100 + "px",
      left: rect.x + 10 + "px",
    };
  }

  showChipHintAboveColumn(col, color) {
    const rect = this.#board.getColumnPosition(col);

    if (!this.#chipHint) {
      this.#chipHint = new ChipElement(color);
      this.#main.appendChild(this.#chipHint.node());
    }

    const newPosition = this.calculateChipHintPosition(rect);
    this.#chipHint.updatePosition(newPosition.top, newPosition.left);
  }

  deleteChipHint() {
    this.#main.removeChild(this.#chipHint.node());
    this.#chipHint = null;
  }

  onStartGameButtonClicked(player1, player2) {
    this.#controller.onStartGameButtonClicked(player1, player2);
  }

  onBoardColumnHovered(col) {
    this.#controller.onUserFocusColumn(col);
  }

  onBoardColumnClicked(col) {
    this.#controller.onUserAddChipToColumn(col);
  }

  addChipToCell(row, col, color) {
    this.#board.addChipToCell(row, col, new ChipElement(color).node());
  }
}

export default ConnectFourView;
