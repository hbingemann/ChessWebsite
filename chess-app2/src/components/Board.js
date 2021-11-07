import React from 'react'
import { useRef, useEffect, useState } from "react"
import Chessground from "react-chessground"
import "react-chessground/dist/styles/chessground.css"
import { handleMove, getMoves, getCurrentTurn, startFen, fen, lastMove } from "../view-model/chessLogic";

const Board = () => {
    
    const [boardFen, setBoardFen] = useState(startFen);
    const [boardLastMove, setBoardLastMove] = useState();

    // code run on component init
    useEffect(() => {
        fen.bindFunction(setBoardFen);
        lastMove.bindFunction((move) => {
            setBoardLastMove([move.from, move.to]);
        });
    }, [])

    return (
        <div className="board-container">
            <Chessground
                width="70vmin"
                height="70vmin"
                turnColor={getCurrentTurn()}
                movable={getMoves()}
                fen={boardFen}
                lastMove={boardLastMove}
                onMove={handleMove}
            />
        </div>
    )
}

export default Board
