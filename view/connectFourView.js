class ConnectFourView {
  constructor() {
    this.controller = null;
    this.MAIN = document.querySelector("main");
    this.BOARD = document.querySelector("#board");
    this.generateBoard(6, 7);
    this.BOARD_COLUMNS = document.querySelectorAll(".col");
    this.CHIP_HINT = null;
    this.registerEventListeners();
  }

  generateBoard(rows, cols) {
    for (let c = 0; c < cols; c++) {
      const columnElement = document.createElement("div");
      columnElement.id = c;
      columnElement.className = "col";

      for (let r = 0; r < rows; r++) {
        const cellElement = document.createElement("div");
        cellElement.className = "cell";
        columnElement.appendChild(cellElement);
      }

      this.BOARD.appendChild(columnElement);
    }
  }

  registerController(controller) {
    this.controller = controller;
  }

  filterForColumnElement(element) {
    if (element.classList.contains("col")) {
      return element;
    } else if (element.classList.contains("cell")) {
      return element.parentElement;
    }
  }

  updateChipHintPosition(rect) {
    this.CHIP_HINT.style.position = "absolute";
    //split the dif between cell size and chip size to center
    this.CHIP_HINT.style.left = rect.x + 10 + "px";
    this.CHIP_HINT.style.top = rect.top - 100 + "px";
  }

  showChipHintAboveColumn(col, color) {
    let rect = this.BOARD_COLUMNS[col].getBoundingClientRect();

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

  onBoardHovered(event) {
    let hoveredColumn = this.filterForColumnElement(event.target);

    if (hoveredColumn) {
      this.controller.onUserFocusColumn(hoveredColumn.id);
    }
  }

  onBoardClicked(event) {
    let clickedColumn = this.filterForColumnElement(event.target);

    if (clickedColumn) {
      this.controller.onUserAddChipToColumn(clickedColumn.id);
    }
  }

  createChip(color) {
    let chip = document.createElement("div");
    chip.classList.add("chip", color);
    return chip;
  }

  addChipToCell(row, col, color) {
    let chip = this.createChip(color);
    let cellsInColumn = this.BOARD_COLUMNS[col].querySelectorAll(".cell");

    cellsInColumn[row].appendChild(chip);
  }

  registerEventListeners() {
    this.BOARD.addEventListener("click", this.onBoardClicked.bind(this));
    this.BOARD.addEventListener("mouseover", this.onBoardHovered.bind(this));
  }
}

export default ConnectFourView;
