import React from 'react'
import { useEffect, useState } from "react"
import Chessground from "react-chessground"
import "react-chessground/dist/styles/chessground.css"
import { getMoves, getCurrentTurn, startFen } from "../logic/chessLogic";
import Chess from "chess.js";

const Board = (props) => {

    const [fen, setFen] = useState(startFen);
    const [lastMove, setLastMove] = useState([])

    useEffect(() => {
        props.chessState.addCallback(props.chessState.variables.fen, setFen);
        props.chessState.addCallback(props.chessState.variables.lastMove, setLastMove)
    }, [props.chessState])

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
