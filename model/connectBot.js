import { Slot } from "./connectFourBoard.js";

class ConnectBot {
  constructor(botName, opponentName) {
    this.botName = botName;
    this.opponentName = opponentName;
  }

  generateMove(board) {
    //first move? play the center
    let centerCol = Math.floor(board.getNumCols() / 2);
    let potentialMoves = {};

    for (let c = 0; c < board.getNumCols(); c++) {
      let row = board.nextAvailableRowForColumn(c);

      if (row === -1) {
        continue;
      }

      let slot = new Slot(row, c);
      let moveData = this.getMoveData(board, slot, this.botName);

      potentialMoves[c] = moveData.connections;

      potentialMoves[c] -= Math.abs(centerCol - c);

      if (moveData.winningMove) {
        potentialMoves[c] += 50;
      }
    }
    console.log("first", potentialMoves);
    let positionBiggestOpponentChain = { col: -1, chain: -1 };

    for (let c = 0; c < board.getNumCols(); c++) {
      let row = board.nextAvailableRowForColumn(c);

      if (row === -1) {
        continue;
      }
      let slot = new Slot(row, c);
      let chain = this.slotCompletesChainOf(board, slot, this.opponentName);

      if (chain === board.winningChainCount - 1) {
        potentialMoves[c] += chain + 20;
      } else {
        potentialMoves[c] += chain + 6;
      }
    }

    console.log(potentialMoves);

    let bestMove = null;

    for (let col of Object.getOwnPropertyNames(potentialMoves)) {
      let slotAbove = new Slot(board.nextAvailableRowForColumn(col) - 1, col);

      if (
        slotAbove.row > -1 &&
        board.chipCompletesChain(slotAbove, this.opponentName)
      ) {
        potentialMoves[col] -= 20;
      }

      if (bestMove === null) {
        bestMove = {
          column: col,
          value: potentialMoves[col],
        };

        continue;
      }

      if (potentialMoves[col] > bestMove.value) {
        bestMove = {
          column: col,
          value: potentialMoves[col],
        };
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

  countChainSlotCreatesHorizontally(board, slot, chip) {
    return (
      board.countMatchingChipsToLeft(slot, chip) +
      board.countMatchingChipsToRight(slot, chip)
    );
  }

  countChainSlotMakesDiagonallyRight(board, slot, chip) {
    return (
      board.countMatchingChipsAboveRight(slot, chip) +
      board.countMatchingChipsBelowLeft(slot, chip)
    );
  }

  countChainSlotMakesDiagonallyLeft(board, slot, chip) {
    return (
      board.countMatchingChipsAboveLeft(slot, chip) +
      board.countMatchingChipsBelowRight(slot, chip)
    );
  }

  getMoveData(board, slot, chip) {
    let matching = 0;

    let horizontalChain = this.countChainSlotCreatesHorizontally(
      board,
      slot,
      chip
    );

    let verticalChain = board.countMatchingChipsBelow(slot, chip);

    let diagonalRightChain = this.countChainSlotMakesDiagonallyRight(
      board,
      slot,
      chip
    );

    let diagonalLeftChain = this.countChainSlotMakesDiagonallyLeft(
      board,
      slot,
      chip
    );

    let winningMove =
      Math.max(
        horizontalChain,
        verticalChain,
        diagonalRightChain,
        diagonalLeftChain
      ) ===
      board.winningChainCount - 1;

    matching += horizontalChain;
    matching += verticalChain;
    matching += diagonalLeftChain;
    matching += diagonalRightChain;

    return { connections: matching, winningMove: winningMove };
  }

  slotCompletesChainOf(board, slot, chip) {
    let horizontalChain = this.countChainSlotCreatesHorizontally(
      board,
      slot,
      chip
    );

    let verticalChain = board.countMatchingChipsBelow(slot, chip);

    let diagonalRightChain = this.countChainSlotMakesDiagonallyRight(
      board,
      slot,
      chip
    );

    let diagonalLeftChain = this.countChainSlotMakesDiagonallyLeft(
      board,
      slot,
      chip
    );

    return Math.max(
      horizontalChain,
      verticalChain,
      diagonalRightChain,
      diagonalLeftChain
    );
  }

  calculatePotentialMoveValue() {
    let potentialMove = { col: -1, connections: -1 };
  }
}

export default ConnectBot;
