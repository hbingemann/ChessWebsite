import React, { useEffect, useState } from 'react'
import MoveButton from './MoveButton';
import { toGame } from "../logic/chessLogic";
import ToggleButton from 'react-toggle-button';
var stockfish = new Worker("stockfish.js")

const MoveTracker = (props) => {

    const [pgn, setPgn] = useState("");
    const [analyzing, setAnalyzing] = useState(false);
    // const [inVariation, setInVariation] = useState(false);
    // const [variationPgn, setVariationPgn] = useState(""); // also a pgn
    // const [currentMove, setCurrentMove] = useState(0);  // index of current move in the pgn

    useEffect(() => {
        props.chessState.addCallback(props.chessState.variables.pgn, setPgn);
        stockfish.onmessage = handleStockfishMessage;
    }, [props.chessState])

    useEffect(() => {
        console.log("Analyzing: " + analyzing)
        if (analyzing) {
            stockfish.postMessage("go depth 10")
        } else {
            stockfish.postMessage("stop")
        }
    }, [analyzing])

    const handleStockfishMessage = (e) => {
        console.log(e.data)
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
            }}>
                <span style={{
                    padding: "1em"
                }}>Stockfish</span>
                <ToggleButton
                    onClick={() => setAnalyzing(!analyzing)} 
                    value={analyzing}
                    containerStyle={{display: "inline-block", float: "right", padding: ".1em"}}
                />
            </div>
            <table className="move-table">
                <tbody>
                    {getRows(toGame(pgn).history({verbose: true}), 0)}
                </tbody>
            </table>
        </div>
    )
}

export default MoveTracker
