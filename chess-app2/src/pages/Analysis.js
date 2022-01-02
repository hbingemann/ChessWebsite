import React, { useEffect }from 'react';
import Board from "../components/Board";
import MoveTracker from '../components/MoveTracker';
import { toGame, getGameLength, getFenAtIndex, getLastMove } from '../logic/chessLogic';
import { chessStateConst } from '../logic/chessState';
import Chess from "chess.js";

const Analysis = () => {

    const chessState = chessStateConst;

    useEffect(() => {
        // run on page init
        window.addEventListener("keyup", handleKeyPress);  // also try keydown
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const handleMove = (from, to, piece_taken) => {
        var game = toGame(chessState.pgn);
        var variation = null;

        // TODO:check for PROMOTION here
        var promotion = "q";
        
        if (chessState.inVariation) {
            // just make the next move, ignore making another variation once already in a variation
            variation = toGame(chessState.variationPgn);
            variation.move({ from: from, to: to, promotion: promotion });
            chessState.set(chessState.variables.variationPgn, variation.pgn());
            chessState.set(chessState.variables.fen, variation.fen());
        } else if (chessState.currentMove < getGameLength(game) - 1) {
            // compare the fen at current move + 1 with what will be the new move
            // if they are the same just do currentMove ++
            // otherwise start a variation
            var currentNextFen = getFenAtIndex(chessState.currentMove + 1, game);
            variation = new Chess(chessState.fen);
            variation.move({ from: from, to: to, promotion: promotion });
            if (variation.fen() === currentNextFen) {
                // update currentmove and fen since no new variation needs to be made
                chessState.set(chessState.variables.currentMove, chessState.currentMove + 1);
                chessState.set(chessState.variables.fen, currentNextFen);
            } else {
                // start a variation
                chessState.set(chessState.variables.inVariation, true);
                chessState.set(chessState.variables.variationPgn, variation.pgn());
                chessState.set(chessState.variables.fen, variation.fen());
            }
        } else {
            // just a regular move where current move is most recent move
            game.move({from: from, to: to, promotion: promotion});
            chessState.set(chessState.variables.pgn, game.pgn())
            chessState.set(chessState.variables.currentMove, chessState.currentMove + 1)
            chessState.set(chessState.variables.fen, game.fen())
        }
        chessState.set(chessState.variables.lastMove, [from, to])
    }

    const handleMoveClick = (index) => {
        // set current move, update fen, update last move
        updateCurrentMove(index);

        // reset the variation
        resetVariation();
    }

    const handleKeyPress = (e) => {
        switch (e.key) {
            case "ArrowRight":
                // goForwardAMove();
                break;
            case "ArrowLeft":
                goBackAMove();
                break;
            default:
                break;
        }
    }

    const goBackAMove = () => {
        console.log("back function called")
        if (chessState.inVariation) {
            // remove last move from variation
            // if we are on the move after current move, leave the variation
            var variation = toGame(chessState.variationPgn);
            console.log(chessState.variationPgn)
            var variationLength = getGameLength(variation);
            console.log(variationLength)
            if (variationLength < 2) {
                resetVariation();
                updateCurrentMove(chessState.currentMove);
                console.log("reset variation")
            } else {
                // go back a move and update variation, fen, and lastmove
                variation.undo()
                chessState.set(chessState.variables.variationPgn, variation.pgn())
                chessState.set(chessState.variables.fen, getFenAtIndex(getGameLength(variation), variation));
                chessState.set(chessState.variables.lastMove, getLastMove(variation));
                console.log("updated variation")
            }
        } else {
            // set current move to - 1, update fen and lastmove
            if (chessState.currentMove >= 0) {  
                console.log("updated current move")
                updateCurrentMove(chessState.currentMove - 1);
            }
        }
    }

    const updateCurrentMove = (newCurrent) => {
        chessState.set(chessState.variables.currentMove, newCurrent);
        chessState.set(chessState.variables.fen, getFenAtIndex(newCurrent, toGame(chessState.pgn)));
        chessState.set(chessState.variables.lastMove, getLastMove(toGame(chessState.pgn), newCurrent));
    }

    const resetVariation = () => {
        chessState.set(chessState.variables.variationPgn, chessState.defaults.variationPgn);
        chessState.set(chessState.variables.inVariation, chessState.defaults.inVariation);
    }

    return (
        <>
            <Board handleMove={handleMove} chessState={chessState}/>
            <MoveTracker onMoveClick={handleMoveClick} chessState={chessState}/>
        </>
    )
}

export default Analysis
