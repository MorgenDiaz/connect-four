import ConnectFour from "./model/connectFour.js";
import ConnectFourController from "./controller/connectFourController.js";
import ConnectFourView from "../view/connectFourView.js";

function main() {
  const connectFourModel = new ConnectFour();
  const connectFourView = new ConnectFourView();
  const connectFourController = new ConnectFourController(
    connectFourModel,
    connectFourView
  );
}

main();
