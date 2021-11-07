import Chess from "chess.js";
import { AlertVariable } from "./alertVariable";

export const startFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

// alert variables
export const fen = new AlertVariable(startFen);
export const lastMove = new AlertVariable(null);
export const moves = new AlertVariable([]);

export function handleMoveClick(move, newFen) {
    fen.value = newFen;
    lastMove.value = move;
    console.log("move: " + move);
    console.log("fen: " + newFen)
}

export function handleMove(fromSquare, toSquare) {
    // promote to queen by default for now
    const chess = new Chess(fen.value);
    var move = chess.move({ from: fromSquare, to: toSquare, promotion: "q" });

    // send move to backend
    // fetch("/move", {
    //     method: "POST",
    //     cache: "no-cache",
    //     headers: { 
    //         "content_type":"application/json",
    //     },
    //     body: JSON.stringify({
    //         move: move.san
    //     })
    // })
    // .then(response => {
    //     return response.json();
    // })
    // .then(json => {
    //     // do some updates
    // })

    // update fen and lastmove
    fen.value = chess.fen();
    lastMove.value = move;
    moves.value = [...moves.value, move]
}

export function getMoves() {
    const chess = new Chess(fen.value);
    const dests = new Map();
    chess.SQUARES.forEach(square => {
        const moves = chess.moves({ square: square, verbose: true })
        if (moves.length) dests.set(square, moves.map(move => move.to))
    });
    return {
        free: false,
        dests,
        color: getCurrentTurn()
    }
}

export function getCurrentTurn() {
    const chess = new Chess(fen.value);
    return chess.turn() === chess.WHITE ? "white" : "black";
}