import React, { useEffect, useState } from 'react'
import MoveButton from './MoveButton';
import { getCopy } from "../logic/chessLogic";
import Button from "react-bootstrap/Button"
import { getEvaluation } from '../logic/stockfish';
import Chess from "chess.js";
// import ToggleButton from "react-toggle-button"

const MoveTracker = (props) => {

    const [game, setGame] = useState(new Chess());
    const [evaluation, setEvaluation] = useState([]);
    const [loadingEval, setLoadingEval] = useState(false);

    useEffect(() => {
        props.chessState.addCallback(props.chessState.variables.game, (newGame) => {setGame(getCopy(newGame))});
        props.chessState.addCallback(props.chessState.variables.board, () => {
            setEvaluation([]);
            setLoadingEval(false);
        })
        window.onkeyup = handleKeyPress;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.chessState])

    const handleKeyPress = (e) => {
        switch (e.key) {
            case "a":
                updateEvaluation();
                break;
            default:
                break;
        }
    }

    const updateEvaluation = () => {
        setLoadingEval(true);
        getEvaluation(props.chessState.board.fen, (newEval) => {
            // if (loadingEval === false) {
            //     // we turned off loading eval while evaluation was loading
            //     return;
            // }
            // code run when evaluation finishes
            setLoadingEval(false);
            setEvaluation(newEval);
            // update stockfish move on board with a move arrow
            var shapes = [];
            if (newEval.length === 0) {
                // no evaluations
                return;
            }
            var move = newEval[0].Move;
            var from = move.slice(0, 2);
            var to = move.slice(2, 4);
            shapes.push({
                orig: from, dest: to, brush: "paleBlue"
            })
            props.chessState.set(props.chessState.variables.shapes, shapes)
        });
    }

    const getFormattedEval = () => {
        if (evaluation.length > 0) {
            var topMoveEval = evaluation[0];
            var formatted = "";
            if (topMoveEval.Centipawn !== null) {
                var pawnEval = topMoveEval.Centipawn / 100;
                formatted += (pawnEval > 0 ? "+" : "") + pawnEval;
            } else {
                formatted += "#" + topMoveEval.Mate;
            }
            return formatted;
        }
        // when there is no evaluation
        return "--";
    }
    
    // recursively go through moves in the game tree
    // want to always create 15 moves
    const getRows = (moves, index) => {
        var moveCount = moves.length;
        var currentRow = index / 2 + 1;

        if (moveCount === 0) {
            // no moves left
            return
        }
        if (moveCount === 1) {
            // only a white move
            return [
                <tr>
                    <td className="move-number">{currentRow}</td>
                    <MoveButton onClick={props.onMoveClick} san={moves[0].san} 
                    index={index} color={moves[0].color} chessState={props.chessState}/>
                    <td className="move-block"></td>
                </tr>,
                getRows(moves.slice(2), index + 2)
            ]
        }
        return [
            <tr>
                <td className="move-number">{currentRow}</td>
                <MoveButton onClick={props.onMoveClick} san={moves[0].san} 
                index={index} color={moves[0].color} chessState={props.chessState}/>
                <MoveButton onClick={props.onMoveClick} san={moves[1].san} 
                index={index + 1} color={moves[1].color} chessState={props.chessState}/>
            </tr>,
            getRows(moves.slice(2), index + 2)  // plus two for white and black move
        ]
    }

    // one table row for a white move + black move
    return (
        <div className="move-table-container">
            <div style={{
                padding: ".3em",
                background: "var(--darkishcolor)",
                borderBottom: "solid",
                borderColor: "var(--lightishcolor)",
                position: "sticky",
                top: 0,
            }}>
                <span style={{
                    padding: "1em"
                }}>Stockfish<b>:</b> {getFormattedEval()}</span>
                <Button
                    size="sm"
                    variant="success"
                    onClick={updateEvaluation}
                    disabled={loadingEval}
                    style={{float: "right", padding: ".15em .5em", fontSize: "85%"}}
                >{loadingEval ? "Loading..." : "Analyze"}</Button>
            </div>
            <table className="move-table">
                <tbody>
                    {getRows(game.history({verbose: true}), 0)}
                </tbody>
            </table>
        </div>
    )
}

export default MoveTracker
