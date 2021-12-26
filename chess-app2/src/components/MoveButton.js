// this is part of the movetracker
import React from 'react'

const MoveButton = (props) => {

    // must know index of move, name of move, maybe something else
    const onClick = () => {
        props.onClick(props.index)
        console.log(`move click: ${props.index + 1}, ${props.san}`)
    }

    return (
        <td onClick={onClick}>
            {props.index + 1}: {props.san}
        </td>
    )
}

export default MoveButton
