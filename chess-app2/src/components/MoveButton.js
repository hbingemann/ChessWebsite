// this is part of the movetracker
import React from 'react'
import { handleMoveClick } from '../view-model/chessLogic';

const MoveButton = (props) => {

    return (
        <td onClick={() => handleMoveClick(props.move, props.fen)}>
            {props.move}
        </td>
    )
}

export default MoveButton
