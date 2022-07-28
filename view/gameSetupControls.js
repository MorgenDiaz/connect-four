class GameSetupControlsElement {
  #container = null;
  #player1InputText = null;
  #player2InputText = null;
  #startButton = null;
  #onStartGameButtonClicked = null;

  constructor(onStartGameButtonClicked) {
    this.#container = document.querySelector("#setup_controls");
    this.#player1InputText = document.querySelector("#player_1_input");
    this.#player2InputText = document.querySelector("#player_2_input");
    this.#startButton = document.querySelector("#start_button");
    this.#onStartGameButtonClicked = onStartGameButtonClicked;
    this.#startButton.addEventListener(
      "click",
      this.startGameButtonClicked.bind(this)
    );
  }

  startGameButtonClicked() {
    let player1Name = this.#player1InputText.value;

    if (player1Name.trim() === "") {
      player1Name = "Player 1";
    }

    let player2Name = this.#player2InputText.value;
    if (player2Name.trim() === "") {
      player2Name = "Player 2";
    }

    const player1 = {
      name: player1Name,
      color: "blue",
    };

    const player2 = {
      name: player2Name,
      color: "black",
    };

    this.#onStartGameButtonClicked(player1, player2);
  }

  hide() {
    this.#container.style.display = "none";
  }
}

export default GameSetupControlsElement;
