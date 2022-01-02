import Chess from "chess.js";

export const startFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

// GET RID OF API STEPS:
    // 1. Create an outer scope context
    // 2. figure out a way to track the pgn of the game with variations (pgn in a comment)
    // 3. Use that in the context
    // 4. figure out how to keep track of the current move
    // 5. then implement all of the above steps properly

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


// DON'T WANT TO END UP IMPLEMENTING THE BELOW

// // get the fen before the move given by move id was played, 
// export function getMoveData(moveID, game) {
//     // traverse game tree and keep track of the moves that have been played
//     var fen = getFen(moveID, game, new Chess());
//     var move = getMove(moveID, game);
//     return {move: move, fen: fen};
// }

// // recursively get the fen given before the move with move id
// function getFen(moveID, parent, chess) {
//     // the default start is null
//     if (parent.move !== null) {
//         chess.move({from: parent.move.from, to: parent.move.to, promotion: parent.move.promotion})
//     }

//     // loop through variations
//     for (var move of parent.variations) {
//         // if the ids match
//         if (getID(move) === moveID) {
//             // we found the move!!
//             return chess.fen();
//         } else {
//             // search children
//             if (move.variations.length > 0) {
//                 var res = getFen(moveID, move, new Chess(chess.fen()));
//                 if (res !== null) {
//                     return res;
//                 }
//             } else {
//                 console.warn("NO MOVE FOUND WITH ID: " + moveID);
//                 return null; // found nothing so return null since that move id doesn't exist
//             }
//         }
//     }
// }

// // get python move object from id, this is a recursive function
// function getMove(moveID, parent) {
//     for (var move of parent.variations) {
//         // if the ids match
//         if (getID(move) === moveID) {
//             // we found the move!!
//             return move;
//         } else {
//             // search children
//             if (move.variations.length > 0) {
//                var res = getMove(moveID, move);
//                if (res != null) {
//                    return res;
//                } else {
//                    console.warn("NO MOVE FOUND WITH ID: " + moveID)
//                    return parent;  // nothing found, return default value
//                }
//             }
//         }
//     }
// }

// // ids consist of -'s and numbers and letters and are found in the comment of the move in the game tree
// export function getID(move) {

//     var comment = move.comment;
//     var start = comment.indexOf(NODE_ID_START);
//     var end = comment.indexOf(NODE_ID_END);

//     // if move comment has no id
//     if (start === -1 || end === -1) {
//         console.log(comment);
//         console.log(move);
//         throw new Error("Move has no ID!");
//     } else {
//         // found id, return it without the start and end indicators
//         var id = comment.substr(start, end)
//         id = id.replace(NODE_ID_START, "").replace(":", "");
//         return id;
//     }
// }

// // returns the san given the moveID
// export function getSan(moveID, game) {

//     // get needed information
//     var moveData = getMoveData(moveID, game);
//     var fen = moveData.fen;
//     var move = moveData.move.move; // I know, it's a little confusing

//     // return the san given moveID
//     var chess = new Chess(fen);
//     var newMove = chess.move({from: move.from, to: move.to, promotion: move.promotion});

//     console.log("movedata: ")
//     console.log(moveData)

//     return newMove.san;
// }
