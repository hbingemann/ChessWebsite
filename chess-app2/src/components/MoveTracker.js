import React, { useRef, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import MoveButton from './MoveButton';
import { lastMove, fen } from "../view-model/chessLogic";

const MoveTracker = () => {

    const [moveList, setMoveList] = useState([]);

    // code run on component init
    useEffect(() => {
        lastMove.bindFunction((newMove) => {
            setMoveList((prev) => {
                return [...prev, {move: newMove, fen: fen.value}]
            })
        });
    }, [])

    return (
        <Table bordered variant="dark" className="move-table">
            <tbody>
                <tr>
                    {/* {moveList.map((info, index) => {
                        return <MoveButton move={info.move.san} fen={info.fen}/>
                    })} */}
                </tr>
            </tbody>
        </Table>
    )
}

export default MoveTracker
