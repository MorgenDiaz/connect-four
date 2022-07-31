import { Slot } from "../connectFourBoard.js";

class MoveEvaluator {
  evaluateMoveAtSlot(board, slot, botChip, opponentChip) {
    const move = { column: slot.col };

    let centerCol = Math.floor(board.getNumCols() / 2);

    connections = this.getConnectionsForAllDirections(board, slot, botChip);
    move.score = moveData.connections;

    move.score -= Math.abs(centerCol - slot.col);

    if (moveData.winningMove) {
      move.score += 50;
    }

    let opponentConnections = this.getConnectionsForAllDirections(
      board,
      slot,
      opponentChip
    );

    if (opponentConnections.largestChain === board.winningChainCount - 1) {
      move.score += opponentConnections.largestChain + 20;
    } else {
      move.score += opponentConnections.largestChain + 6;
    }

    slot.moveUp();

    if (slot.row > -1 && board.chipCompletesChain(slot, this.opponentName)) {
      move.score -= 20;
    }

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

  getMoveData(board, slot, chip) {
    let matching = 0;

    let connections = this.getConnectionsForAllDirections(board, slot, chip);

    let winningMove = connections.largestChain === board.winningChainCount - 1;

    matching += connections.horizontalChain;
    matching += connections.verticalChain;
    matching += connections.diagonalLeftChain;
    matching += connections.diagonalRightChain;

    return { connections: matching, winningMove: winningMove };
  }

  slotCompletesChainOf(board, slot, chip) {
    let connections = this.getConnectionsForAllDirections(board, slot, chip);

    return connections.largestChain;
  }
}

export default MoveEvaluator;
