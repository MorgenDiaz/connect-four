class GameStatusElement {
  #gameStatus = null;
  #currentPlayerText = null;

  constructor() {
    this.#gameStatus = document.querySelector("#game_status");
    this.#currentPlayerText = document.querySelector("#game_status h2");
  }

  show() {
    this.#gameStatus.style.display = "flex";
  }

  updateStatusCurrentPlayer(playerName) {
    this.#currentPlayerText.innerText = `${playerName}'s turn!`;
  }

  updateStatusPlayerWon(playerName) {
    this.#currentPlayerText.innerText = `${playerName} Won!`;
  }

  updateStatusTie() {
    this.#currentPlayerText.innerText = `Draw! you have ran out of available space in the board.`;
  }
}

export default GameStatusElement;
