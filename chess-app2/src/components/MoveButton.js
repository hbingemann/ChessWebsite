// this is part of the movetracker
import React, { useState, useEffect } from 'react'

const MoveButton = (props) => {

    const [current, setCurrent] = useState(props.chessState.currentMove);

    // must know index of move, name of move, color of move
    const onClick = () => {
        props.onClick(props.index)
    }

    useEffect(() => {
        props.chessState.addCallback(props.chessState.variables.currentMove, setCurrent);
        setCurrent(props.chessState.currentMove)
    }, [props.chessState])

    return (
        <td className={"move-block " + (props.index === current ? "current-move" : "move-name")} onClick={onClick}>
            {props.san}
        </td>
    )
}

export default MoveButton
