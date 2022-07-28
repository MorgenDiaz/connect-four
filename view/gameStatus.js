class GameStatusElement {
  #gameStatus = null;
  #currentPlayerText = null;
  #playAgainButton = null;

  constructor(onResetButtonClicked) {
    this.#gameStatus = document.querySelector("#game_status");
    this.#currentPlayerText = document.querySelector("#game_status h2");
    this.#playAgainButton = document.querySelector("#play_again_button");
    this.#playAgainButton.addEventListener("click", onResetButtonClicked);
  }

  show() {
    this.#gameStatus.style.display = "flex";
  }

  hide() {
    this.#gameStatus.style.display = "none";
  }

  setStatusText(text) {
    this.#currentPlayerText.innerText = text;
  }

  showPlayAgainButton() {
    this.#playAgainButton.style.visibility = "visible";
  }

  updateStatusCurrentPlayer(playerName) {
    this.setStatusText(`${playerName}'s turn!`);
  }

  updateStatusPlayerWon(playerName) {
    this.setStatusText(`${playerName} Won!`);
    this.showPlayAgainButton();
  }

  updateStatusTie() {
    this.setStatusText(
      `Draw! you have ran out of available space in the board.`
    );
    this.showPlayAgainButton();
  }

  reset() {
    this.setStatusText("");
    this.#playAgainButton.style.visibility = "hidden";
    this.hide();
  }
}

export default GameStatusElement;
