import React, { useEffect, useRef }from 'react';
import Board from "../components/Board";
import MoveTracker from '../components/MoveTracker';
import { toGame, getGameLength, getFenAtIndex, getLastMove, getCopy } from '../logic/chessLogic';
import { chessStateConst } from '../logic/chessState';
import Chess from "chess.js";
import PgnLoading from '../components/PgnLoading';

const Analysis = () => {

    const chessState = useRef(chessStateConst);

    useEffect(() => {
        // run on page init
        window.onkeydown = handleKeyPress;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const handleMove = (from, to, piece_taken) => {
        var game = getCopy(chessState.current.game);
        var variation = null;
        var lastMove = [from, to];

        // TODO:check for PROMOTION here
        var promotion = "q";
        
        if (chessState.current.inVariation) {
            // just make the next move, ignore making another variation once already in a variation
            variation = getCopy(chessState.current.variation);
            variation.move({ from: from, to: to, promotion: promotion });
            chessState.current.set(chessState.current.variables.variation, variation);
            chessState.current.set(chessState.current.variables.board, {
                fen: variation.fen(),
                lastMove: lastMove,
            });
        } else if (chessState.current.currentMove < getGameLength(game) - 1) {
            // compare the fen at current move + 1 with what will be the new move
            // if they are the same just do currentMove ++
            // otherwise start a variation
            var currentNextFen = getFenAtIndex(chessState.current.currentMove + 1, game);
            variation = new Chess(chessState.current.board.fen);
            variation.move({ from: from, to: to, promotion: promotion });
            if (variation.fen() === currentNextFen) {
                // update currentmove and fen since no new variation needs to be made
                chessState.current.set(chessState.current.variables.currentMove, chessState.current.currentMove + 1);
                chessState.current.set(chessState.current.variables.board, {
                    fen: currentNextFen,
                    lastMove: lastMove,
                });
            } else {
                // start a variation
                chessState.current.set(chessState.current.variables.inVariation, true);
                chessState.current.set(chessState.current.variables.variation, variation);
                chessState.current.set(chessState.current.variables.board, {
                    fen: variation.fen(),
                    lastMove: lastMove,
                });
            }
        } else {
            // just a regular move where current move is most recent move
            game.move({from: from, to: to, promotion: promotion});
            chessState.current.set(chessState.current.variables.game, game)
            chessState.current.set(chessState.current.variables.currentMove, chessState.current.currentMove + 1)
            chessState.current.set(chessState.current.variables.board, {
                fen: game.fen(),
                lastMove: lastMove,
            });
        }
    }

    const handleMoveClick = (index) => {
        // set current move, update fen, update last move
        updateCurrentMove(index);

        // reset the variation
        resetVariation();
    }

    const handleKeyPress = (e) => {
        console.log(e.key)
        
        switch (e.key) {
            case "ArrowRight":
                console.log(chessState.current.currentMove)
                goForwardAMove();
                console.log(chessState.current.currentMove)
                break;
            case "ArrowLeft":
                console.log(chessState.current.currentMove)
                goBackAMove();
                console.log(chessState.current.currentMove)
                break;
            default:
                break;
        }
    }

    const goForwardAMove = () => {
        // might want to change this functionality later
        if (!chessState.current.inVariation) {
            updateCurrentMove(chessState.current.currentMove + 1);
        }
    }

    const goBackAMove = () => {
        if (chessState.current.inVariation) {
            // remove last move from variation
            // if we are on the move after current move, leave the variation
            var variation = getCopy(chessState.current.variation);
            var variationLength = getGameLength(variation);
            if (variationLength < 2) {
                resetVariation();
                updateCurrentMove(chessState.current.currentMove);
            } else {
                // go back a move and update variation, fen, and lastmove
                variation.undo()
                chessState.current.set(chessState.current.variables.variation, variation)
                chessState.current.set(chessState.current.variables.board, {
                    fen: getFenAtIndex(getGameLength(variation), variation),
                    lastMove: getLastMove(variation),
                });
            }
        } else {
            // set current move to - 1, update fen and lastmove
            updateCurrentMove(chessState.current.currentMove - 1);
        }
    }

    const updateCurrentMove = (newCurrent) => {
        if (newCurrent >= getGameLength(getCopy(chessState.current.game)) || newCurrent < 0) {
            return // since we would be setting current move to an invalid index
        }
        chessState.current.set(chessState.current.variables.currentMove, newCurrent);
        chessState.current.set(chessState.current.variables.board, {
            fen: getFenAtIndex(newCurrent, getCopy(chessState.current.game)),
            lastMove: getLastMove(getCopy(chessState.current.game), newCurrent),
        });
    }

    const resetVariation = () => {
        chessState.current.set(chessState.current.variables.variation, chessState.current.defaults.variation);
        chessState.current.set(chessState.current.variables.inVariation, chessState.current.defaults.inVariation);
    }

    return (
        <>
            <PgnLoading chessState={chessState.current}/>
            <Board handleMove={handleMove} chessState={chessState.current}/>
            <MoveTracker onMoveClick={handleMoveClick} chessState={chessState.current}/>
        </>
    )
}

export default Analysis
