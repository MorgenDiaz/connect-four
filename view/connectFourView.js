import BoardElement from "./board.js";
import ChipElement from "./chip.js";
class ConnectFourView {
  #controller = null;
  #main = null;
  #chipHint = null;
  constructor() {
    this.#main = document.querySelector("main");
    this.boardElement = new BoardElement();

    this.boardElement.generateBoard(
      6,
      7,
      this.onBoardColumnHovered.bind(this),
      this.onBoardColumnClicked.bind(this)
    );
  }

  registerController(controller) {
    this.controller = controller;
  }

  calculateChipHintPosition(rect) {
    //split the dif between cell size and chip size to center
    return {
      top: rect.top - 100 + "px",
      left: rect.x + 10 + "px",
    };
  }

  showChipHintAboveColumn(col, color) {
    const rect = this.boardElement.getColumnPosition(col);

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

  onBoardColumnHovered(event) {
    let hoveredColumn = event.currentTarget;
    this.controller.onUserFocusColumn(hoveredColumn.id);
  }

  onBoardColumnClicked(event) {
    let clickedColumn = event.currentTarget;
    this.controller.onUserAddChipToColumn(clickedColumn.id);
  }

  addChipToCell(row, col, color) {
    this.boardElement.addChipToCell(row, col, new ChipElement(color).node());
  }
}

export default ConnectFourView;
