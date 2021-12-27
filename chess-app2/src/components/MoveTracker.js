import React, { useRef, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import MoveButton from './MoveButton';
import { toGame } from "../logic/chessLogic";

const MoveTracker = (props) => {

    const [pgn, setPgn] = useState("");
    // const [inVariation, setInVariation] = useState(false);
    // const [variationPgn, setVariationPgn] = useState(""); // also a pgn
    // const [currentMove, setCurrentMove] = useState(0);  // index of current move in the pgn

    useEffect(() => {
        props.chessState.addCallback(props.chessState.variables.pgn, setPgn);
        // props.chessState.addCallback(props.chessState.variables.currentMove, setCurrentMove);
    }, [props.chessState])

    // recursively go through moves in the game tree
    const getRows = (moves, index) => {
        var moveCount = moves.length;

        if (moveCount === 0) {
            // no moves left
            return
        }
        if (moveCount === 1) {
            // only a white move
            return (
                <tr>
                    <MoveButton onClick={props.onMoveClick} san={moves[0].san} 
                    index={index} color={moves[0].color} chessState={props.chessState}/>
                </tr>
            )
        }
        return [
            <tr>
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
        <Table bordered variant="dark" className="move-table">
            <tbody>
                {getRows(toGame(pgn).history({verbose: true}), 0)}
            </tbody>
        </Table>
    )
}

export default MoveTracker
