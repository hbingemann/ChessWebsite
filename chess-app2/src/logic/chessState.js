import Chess from "chess.js";
import { getCopy } from "./chessLogic"


const startFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";


const defaults = {
    game: new Chess(),
    currentMove: -1,
    inVariation: false,
    variation: new Chess(),
    shapes: [],
    board: { 
        lastMove: [],
        fen: startFen,
    }
}

export const chessStateConst = {
    board: defaults.board,
    game: defaults.game,
    currentMove: defaults.currentMove, // won't be zero until the first move has been made
    inVariation: defaults.inVariation,
    variation: defaults.variation, // includes the move where the variation starts
    shapes: defaults.shapes,

    callbacks: {},
    set: (varName, value) => {
        chessStateConst[varName] = value;
        var funcs = chessStateConst.callbacks[varName];
        if (funcs) {
            funcs.forEach((func) => {
                func(value);
            })
        }
    },
    addCallback: (varName, func) => {
        var funcs = chessStateConst.callbacks[varName];
        if (funcs) {
            funcs.push(func);
        } else {
            // initialize the functions array
            chessStateConst.callbacks[varName] = [func];
        }
    },

    variables: {  // these can be used in set func and add callback
        game: "game",
        currentMove: "currentMove",
        inVariation: "inVariation",
        variation: "variation",
        board: "board",
        shapes: "shapes",
    },
    defaults: defaults,

    resetDefaults: () => {
        for (var item in chessStateConst.variables) {
            chessStateConst[item] = defaults[item];
        }
    }
}


