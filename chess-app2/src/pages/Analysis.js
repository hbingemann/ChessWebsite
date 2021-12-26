import React, { useState }from 'react';
import Board from "../components/Board";
import MoveTracker from '../components/MoveTracker';
import { toGame, getGameLength, getFenAtIndex, startFen } from '../logic/chessLogic';
import { chessStateConst } from '../logic/chessState';
import Chess from "chess.js";

const Analysis = () => {

    const chessState = chessStateConst;
    
    const handleMove = (from, to, piece_taken) => {
        var game = toGame(chessState.pgn);
        var variation = null;

        // TODO:check for PROMOTION here
        var promotion = "q";
        
        if (chessState.inVariation) {
            // just make the next move, ignore making another variation once already in a variation
            variation = toGame(chessState.variationPgn);
            variation.move({from: from, to: to, promotion: promotion});
            chessState.set(chessState.variables.variationPgn, variation.pgn());
            chessState.set(chessState.variables.fen, variation.fen());

        } else if (chessState.currentMove < getGameLength(game)) {
            // compare the fen at current move + 1 with what will be the new move
            // if they are the same just do currentMove ++
            // otherwise start a variation
            var currentNextFen = getFenAtIndex(chessState.currentMove + 1, game);
            var temp = new Chess(chessState.fen);
            temp.move({ from: from, to: to, promotion: promotion });
            if (temp.fen() === currentNextFen) {
                chessState.set(chessState.variables.currentMove, chessState.currentMove + 1);
            } else {
                chessState.set(chessState.variables.inVariation, true);
                variation = new Chess(temp.fen());
                chessState.set(chessState.variables.variationPgn, variation.pgn());
                chessState.set(chessState.variables.fen, variation.fen());
            }
        } else {
            // just a regular move where current move is most recent move
            game.move({from: from, to: to, promotion: promotion});
            // setPgn(game.pgn());
            chessState.set(chessState.variables.pgn, game.pgn())
            // setCurrentMove(currentMove + 1)
            chessState.set(chessState.variables.currentMove, )
            chessState.set(chessState.variables.fen, game.fen())
        }
        chessState.set(chessState.variables.lastMove, [from, to])
    }

    const handleMoveClick = (index) => {
        chessState.set(chessState.variables.currentMove, index);
        // reset the variation, also reset when go back a move
        chessState.set(chessState.variables.variationPgn, chessState.defaults.variationPgn);
        chessState.set(chessState.variables.inVariation, chessState.defaults.inVariation);
        console.log("move clic1!");
    }

    return (
        <>
            <Board handleMove={handleMove} chessState={chessState}/>
            <MoveTracker onMoveClick={handleMoveClick} chessState={chessState}/>
        </>
    )
}

export default Analysis
