import BoardElement from "./board.js";
class ConnectFourView {
  constructor() {
    this.controller = null;
    this.MAIN = document.querySelector("main");
    this.boardElement = new BoardElement();

    this.boardElement.generateBoard(
      6,
      7,
      this.onBoardColumnHovered.bind(this),
      this.onBoardColumnClicked.bind(this)
    );

    this.CHIP_HINT = null;
  }

  registerController(controller) {
    this.controller = controller;
  }

  updateChipHintPosition(rect) {
    this.CHIP_HINT.style.position = "absolute";
    //split the dif between cell size and chip size to center
    this.CHIP_HINT.style.left = rect.x + 10 + "px";
    this.CHIP_HINT.style.top = rect.top - 100 + "px";
  }

  showChipHintAboveColumn(col, color) {
    let rect = this.boardElement.getColumnPosition(col);

    if (!this.CHIP_HINT) {
      this.CHIP_HINT = this.createChip(color);
      this.MAIN.appendChild(this.CHIP_HINT);
    }

    this.updateChipHintPosition(rect);
  }

  deleteChipHint() {
    this.MAIN.removeChild(this.CHIP_HINT);
    this.CHIP_HINT = null;
  }

  onBoardColumnHovered(event) {
    let hoveredColumn = event.currentTarget;

    this.controller.onUserFocusColumn(hoveredColumn.id);
  }

  onBoardColumnClicked(event) {
    let clickedColumn = event.currentTarget;

    this.controller.onUserAddChipToColumn(clickedColumn.id);
  }

  createChip(color) {
    let chip = document.createElement("div");
    chip.classList.add("chip", color);
    return chip;
  }

  addChipToCell(row, col, color) {
    let chip = this.createChip(color);
    this.boardElement.addChipToCell(row, col, chip);
  }
}

export default ConnectFourView;
