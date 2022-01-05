import Chess from "chess.js";

export const startFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

// returns available moves to the user
export function getMoves(game) {
    const dests = new Map();
    game.SQUARES.forEach(square => {
        const availableMoves = game.moves({ square: square, verbose: true })
        if (availableMoves.length) dests.set(square, availableMoves.map(move => move.to))
    });
    return {
        free: false,
        dests,
        color: getCurrentTurn(game)
    }
}

// returns the current turn in the game
export function getCurrentTurn(game) {
    return game.turn() === game.WHITE ? "white" : "black";
}

// get the last move in a way that board will understand
export function getLastMove(game, index) {
    var length = getGameLength(game);
    if (length === 0) {
        return null; // no moves have been made yet
    }
    if (index === undefined) {
        index = length - 1;  // default to most recent move
    }
    var lastMove = game.history({verbose: true})[index];
    if (lastMove) {  
        return [lastMove.from, lastMove.to]
    }
    return null;
}

export function fenToGame(fen) {
    return new Chess(fen);
}

// return the game given a pgn
export function toGame(pgn) {

    // in case of an empty pgn
    if (pgn === "") {
        return new Chess();
    }

    var game = new Chess();
    game.load_pgn(pgn);
    return game;
}

// return the length of the pgn
export function getGameLength(game) {
    return game.history().length;
}

// return the fen given a current move and game
export function getFenAtIndex(index, game) {
    var chess = new Chess(game.header().FEN);
    var history = game.history();
    for (var i = 0; i < index + 1; i++) {
        chess.move(history[i]);
    }
    return chess.fen();
}

// return the move object given an index and a game
export function getMoveAtIndex(index, game) {
    return game.history({ verbose: true })[index];
}