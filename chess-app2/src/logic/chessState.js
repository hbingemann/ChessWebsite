const startFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const defaults = {
    pgn: "",
    currentMove: -1,
    inVariation: false,
    variationPgn: "",
    shapes: [],
    board: { 
        lastMove: [],
        fen: startFen,
    }
}

export const chessStateConst = {
    board: defaults.board,
    pgn: defaults.pgn,
    currentMove: defaults.currentMove, // won't be zero until the first move has been made
    inVariation: defaults.inVariation,
    variationPgn: defaults.variationPgn, // includes the move where the variation starts
    shapes: defaults.shapes,

    callbacks: {
    },
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
        pgn: "pgn",
        currentMove: "currentMove",
        inVariation: "inVariation",
        variationPgn: "variationPgn",
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


