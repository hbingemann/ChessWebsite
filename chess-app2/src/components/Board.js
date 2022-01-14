import React from 'react'
import { useEffect, useState } from "react"
import Chessground from "react-chessground"
import "react-chessground/dist/styles/chessground.css"
import { getMoves, getCurrentTurn, startFen, fenToGame } from "../logic/chessLogic";

const Board = (props) => {

    // const [fen, setFen] = useState(startFen);
    // const [lastMove, setLastMove] = useState([]);
    // const [shapes, setShapes] = useState([]);
    const [boardState, setBoardState] = useState({
        fen: startFen,
        lastMove: [],
    })
    const [shapes, setShapes] = useState([]);

    useEffect(() => {
        props.chessState.addCallback(props.chessState.variables.board, (board) => {
            // update entire board state
            setBoardState({
                fen: board.fen,
                lastMove: board.lastMove,
            })
            // reset shapes when board is updated
            setShapes([]);
        })
        props.chessState.addCallback(props.chessState.variables.shapes, setShapes)
    }, [props.chessState])

    return (
        <div className="board-container">
            <Chessground
                width="70vmin"
                height="70vmin"
                turnColor={getCurrentTurn(fenToGame(boardState.fen))}
                movable={getMoves(fenToGame(boardState.fen))}
                fen={boardState.fen}
                lastMove={boardState.lastMove}
                onMove={props.handleMove}
                drawable={{autoShapes: shapes}}
            />
        </div>
    )
}

// const shapeSet1 = [
//     { orig: 'a3', brush: 'green' },
//     { orig: 'a4', brush: 'blue' },
//     { orig: 'a5', brush: 'yellow' },
//     { orig: 'a6', brush: 'red' },
//     { orig: 'e2', dest: 'e4', brush: 'green' },
//     { orig: 'a6', dest: 'c8', brush: 'blue' },
//     { orig: 'f8', dest: 'f4', brush: 'yellow' },
//     { orig: 'h5', brush: 'green', piece: {
//       color: 'white',
//       role: 'knight'
//     }},
//     { orig: 'h6', brush: 'red', piece: {
//       color: 'black',
//       role: 'queen',
//       scale: 0.6
//     }}
//   ];

export default Board
