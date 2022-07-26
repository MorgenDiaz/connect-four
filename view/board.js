class BoardElement {
  #board = null;
  #columns = [];
  constructor() {
    this.#board = document.querySelector("#board");
  }

  generateBoard(rows, cols, onColumnHovered, onColumnClicked) {
    for (let c = 0; c < cols; c++) {
      const columnElement = document.createElement("div");
      columnElement.id = c;
      columnElement.className = "col";

      for (let r = 0; r < rows; r++) {
        const cellElement = document.createElement("div");
        cellElement.className = "cell";
        columnElement.appendChild(cellElement);
      }

      columnElement.addEventListener("click", onColumnClicked);
      columnElement.addEventListener("mouseover", onColumnHovered);

      this.#columns.push(columnElement);
      this.#board.appendChild(columnElement);
    }
  }

  getColumnPosition(col) {
    return document.querySelectorAll(".col")[col].getBoundingClientRect();
  }

  addChipToCell(row, col, chip) {
    let cellsInColumn = this.#columns[col].querySelectorAll(".cell");
    cellsInColumn[row].appendChild(chip);
  }
}

export default BoardElement;
