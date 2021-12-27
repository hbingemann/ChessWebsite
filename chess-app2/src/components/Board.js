import React from 'react'
import { useRef, useEffect, useState } from "react"
import Chessground from "react-chessground"
import "react-chessground/dist/styles/chessground.css"
import { getMoves, getCurrentTurn, getLastMove, startFen, toGame } from "../logic/chessLogic";
import Chess from "chess.js";

const Board = (props) => {

    const [fen, setFen] = useState(startFen);
    const [lastMove, setLastMove] = useState([])

    useEffect(() => {
        props.chessState.addCallback(props.chessState.variables.fen, setFen);
        props.chessState.addCallback(props.chessState.variables.lastMove, setLastMove)
    }, [props.chessState])

    // options:
    // - make apiCommunicator setFen and setLastMove
    // - have the function in apiCommunicator return something
    // - bind setFen/setLastMove to a function in apicommunicator
    // - DO THIS I THINK: wrap board and movetracker in a component that makes api calls
    
    // GET RID OF API STEPS:
    // 1. figure out a way to track the pgn of the with variations (pgn in a comment)
    // 2. use that method in an outer scope, probably a context
    // 3. figure out how to keep track of the current move
    // 4. then implement all of the above steps

    return (
        <div className="board-container">
            <Chessground
                width="70vmin"
                height="70vmin"
                turnColor={getCurrentTurn(new Chess(fen))}
                movable={getMoves(new Chess(fen))}
                fen={fen}
                lastMove={lastMove}
                onMove={props.handleMove}
            />
        </div>
    )
}

export default Board
