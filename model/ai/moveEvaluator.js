import { Slot } from "../connectFourBoard.js";
class MoveEvaluator {
  #priorityConfig = null;

  constructor(priorityConfig) {
    this.#priorityConfig = priorityConfig;
  }

  evaluateMoveAtSlot(board, originalSlot, botChip, opponentChip) {
    let slot = originalSlot.copy();
    const move = { column: slot.col, score: 0 };

    let connections = this.getConnectionsForAllDirections(board, slot, botChip);

    let opponentConnections = this.getConnectionsForAllDirections(
      board,
      slot,
      opponentChip
    );

    this.factorTotalConnections(move, connections);
    this.factorWinningMove(move, connections);
    this.factorDistanceFromCenter(move, board);
    this.factorOpponentWinningMove(move, opponentConnections, board);
    this.factorOpponentChain(move, opponentConnections);
    this.factorMoveWouldCreateWinningOpportunityForOpponent(
      move,
      slot,
      board,
      opponentChip
    );

    return move;
  }

  getConnectionsForAllDirections(board, slot, chip) {
    return {
      horizontalChain: board.countConnectedMatchingChipsHorizontally(
        slot,
        chip
      ),

      verticalChain: board.countMatchingChipsBelow(slot, chip),

      diagonalRightChain: board.countConnectedMatchingChipsDiagonallyRight(
        slot,
        chip
      ),

      diagonalLeftChain: board.countConnectedMatchingChipsDiagonallyLeft(
        slot,
        chip
      ),

      get largestChain() {
        return Math.max(
          this.horizontalChain,
          this.verticalChain,
          this.diagonalRightChain,
          this.diagonalLeftChain
        );
      },
    };
  }

  factorDistanceFromCenter(move, board) {
    if (this.#priorityConfig.considerDistanceFromCenter) {
      let centerCol = Math.floor(board.getNumCols() / 2);
      move.score -= Math.abs(centerCol - move.column);
    }
  }

  factorTotalConnections(move, connections) {
    if (this.#priorityConfig.considerTotalConnectionsToSlot) {
      move.score += connections.horizontalChain;
      move.score += connections.verticalChain;
      move.score += connections.diagonalLeftChain;
      move.score += connections.diagonalRightChain;
    }
  }

  factorWinningMove(move, connections) {
    let winningMove = connections.largestChain === board.winningChainCount - 1;
    if (winningMove) {
      move.score += this.#priorityConfig.winningMoveFactor;
    }
  }

  factorOpponentWinningMove(move, connections, board) {
    if (connections.largestChain === board.winningChainCount - 1) {
      move.score +=
        connections.largestChain +
        this.#priorityConfig.blockOpponentWinningMoveFactor;
    }
  }

  factorOpponentChain(move, connections) {
    move.score +=
      connections.largestChain + this.#priorityConfig.blockOpponentChainFactor;
  }

  factorMoveWouldCreateWinningOpportunityForOpponent(
    move,
    slot,
    board,
    opponentChip
  ) {
    slot.moveUp();

    if (slot.row > -1 && board.chipCompletesChain(slot, opponentChip)) {
      move.score -=
        this.#priorityConfig.avoidCreatingWinningMoveForOpponentFactor;
    }
  }
}

export default MoveEvaluator;
