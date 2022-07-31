class GameSetupControlsElement {
  #container = null;
  #player1InputText = null;
  #player2InputText = null;
  #playComputerCheckbox = null;
  #startButton = null;
  #onStartGameButtonClicked = null;

  constructor(onStartGameButtonClicked) {
    this.#container = document.querySelector("#setup_controls");
    this.#player1InputText = document.querySelector("#player_1_input");
    this.#player2InputText = document.querySelector("#player_2_input");
    this.#playComputerCheckbox = document.querySelector("#connect_bot");
    this.#startButton = document.querySelector("#start_button");
    this.#onStartGameButtonClicked = onStartGameButtonClicked;
    this.#startButton.addEventListener(
      "click",
      this.startGameButtonClicked.bind(this)
    );
    this.#playComputerCheckbox.addEventListener(
      "change",
      this.playComputerToggled.bind(this)
    );
  }

  hide() {
    this.#container.style.display = "none";
  }

  reset() {
    this.#player1InputText.value = "";
    this.#player2InputText.value = "";
    this.#container.style.display = "flex";
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

  playComputerToggled(event) {
    const checked = event.currentTarget.checked;

    if (checked) {
      this.#player2InputText.value = this.#playComputerCheckbox.value;
      this.#player2InputText.disabled = true;
    } else {
      this.#player2InputText.value = "";
      this.#player2InputText.disabled = false;
    }
  }
}

export default GameSetupControlsElement;
