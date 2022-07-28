class GameStatusElement {
  #gameStatus = null;
  #currentPlayerText = null;
  #playAgainButton = null;

  constructor() {
    this.#gameStatus = document.querySelector("#game_status");
    this.#currentPlayerText = document.querySelector("#game_status h2");
    this.#playAgainButton = document.querySelector("#play_again_button");
  }

  show() {
    this.#gameStatus.style.display = "flex";
  }

  showPlayAgainButton() {
    this.#playAgainButton.style.visibility = "visible";
  }

  updateStatusCurrentPlayer(playerName) {
    this.#currentPlayerText.innerText = `${playerName}'s turn!`;
  }

  updateStatusPlayerWon(playerName) {
    this.#currentPlayerText.innerText = `${playerName} Won!`;
    this.showPlayAgainButton();
  }

  updateStatusTie() {
    this.#currentPlayerText.innerText = `Draw! you have ran out of available space in the board.`;
    this.showPlayAgainButton();
  }
}

export default GameStatusElement;
