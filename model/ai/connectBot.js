import MoveEvaluator from "./moveEvaluator.js";
import { Slot } from "../connectFourBoard.js";

class ConnectBot {
  static easy_difficulty = 0;
  static medium_difficulty = 1;

  #easyConfig = {
    considerTotalConnectionsToSlot: true,
    winningMoveFactor: 50,
    considerDistanceFromCenter: true,
    blockOpponentWinningMoveFactor: 20,
    blockOpponentChainFactor: 1,
    avoidCreatingWinningMoveForOpponentFactor: 2,
  };

  #mediumConfig = {
    considerTotalConnectionsToSlot: true,
    winningMoveFactor: 50,
    considerDistanceFromCenter: true,
    blockOpponentWinningMoveFactor: 20,
    blockOpponentChainFactor: 6,
    avoidCreatingWinningMoveForOpponentFactor: 20,
  };

  #moveEvaluator = null;

  constructor(botName, opponentName, difficulty) {
    this.botName = botName;
    this.opponentName = opponentName;
    this.#moveEvaluator = new MoveEvaluator(
      this.getConfigurationForDifficulty(difficulty)
    );
  }

  getConfigurationForDifficulty(difficulty) {
    switch (difficulty) {
      case ConnectBot.easy_difficulty:
        return this.#easyConfig;
      case ConnectBot.medium_difficulty:
        return this.#mediumConfig;
    }
  }

  generateMove(board) {
    let potentialMoves = this.getPotentialMoves(board);
    let bestMove = null;

    for (let move of potentialMoves) {
      if (bestMove === null) {
        bestMove = move;
        continue;
      }

      if (move.score > bestMove.score) {
        bestMove = move;
      }
    }

    return bestMove.column;
  }

  getPotentialMoves(board) {
    let potentialMoves = [];

    for (let c = 0; c < board.getNumCols(); c++) {
      let row = board.nextAvailableRowForColumn(c);

      if (row === -1) {
        continue;
      }

      let slot = new Slot(row, c);

      potentialMoves.push(
        this.#moveEvaluator.evaluateMoveAtSlot(
          board,
          slot,
          this.botName,
          this.opponentName
        )
      );
    }

    return potentialMoves;
  }
}

export default ConnectBot;
