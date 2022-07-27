class ChipElement {
  #chip = null;

  constructor(color) {
    this.#chip = document.createElement("div");
    this.#chip.classList.add("chip", color);
  }

  node() {
    return this.#chip;
  }

  updatePosition(top, left) {
    this.#chip.style.position = "absolute";
    this.#chip.style.top = top;
    this.#chip.style.left = left;
  }
}

export default ChipElement;
