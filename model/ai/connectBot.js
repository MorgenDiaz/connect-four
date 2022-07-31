import MoveEvaluator from "./moveEvaluator.js";
import { Slot } from "../connectFourBoard.js";

class ConnectBot {
  #moveEvaluator = new MoveEvaluator();

  constructor(botName, opponentName) {
    this.botName = botName;
    this.opponentName = opponentName;
  }

  generateMove(board) {
    //first move? play the center

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

    console.log(potentialMoves);

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
    console.log("final", potentialMoves);

    return bestMove.column;

    //Look ahead
    //prioritize win if possible
    //are there spaces that will cause the opponent to win on the next turn?
    //yes then take the space
    //does the player have a chain of 2 in a row with open spaces to either side?
    // block a side
  }

  calculatePotentialMoveScore(board, slot, botChip, opponentChip) {
    const move = { column: slot.col };

    let centerCol = Math.floor(board.getNumCols() / 2);
    let moveData = this.getMoveData(board, slot, botChip);

    move.score = moveData.connections;

    move.score -= Math.abs(centerCol - slot.col);

    if (moveData.winningMove) {
      move.score += 50;
    }

    let chain = this.slotCompletesChainOf(board, slot, opponentChip);

    if (chain === board.winningChainCount - 1) {
      move.score += chain + 20;
    } else {
      move.score += chain + 6;
    }

    let slotAbove = new Slot(
      board.nextAvailableRowForColumn(slot.col) - 1,
      slot.column
    );

    if (
      slotAbove.row > -1 &&
      board.chipCompletesChain(slotAbove, this.opponentName)
    ) {
      move.score -= 20;
    }

    return move;
  }
}

export default ConnectBot;
