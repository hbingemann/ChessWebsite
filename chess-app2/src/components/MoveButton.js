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

    return [
        props.color === "w" && <td className="move-number">{props.index / 2 + 1}</td>,
        <td className={"move-name" + (props.index === current ? " current-move" : "")} onClick={onClick}>
            {props.san}
        </td>
    ]
}

export default MoveButton
