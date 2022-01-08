import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { isValidPgn } from "../logic/chessLogic";

function PgnLoading(props) {

    const loadPgn = (pgn) => {
        if (isValidPgn(pgn)) {
            props.chessState.resetDefaults();
            props.chessState.set(props.chessState.variables.pgn, pgn);
        }
    }

    return (  // add some bootstrap invalid functionality
        <div className="pgn-loading">
            <Form>
                <Form.Group>
                    <Form.Label style={{padding: ".3em", margin: ".2em"}}>Pgn</Form.Label>
                    <Button onClick={() => {
                        var textarea = document.getElementById("pgn-textarea");
                        var text = textarea.value;
                        textarea.value = ""; // clear the text area
                        loadPgn(text);
                    }} variant="success" style={{float: "right", margin: ".2em", padding: ".1em .3em"}}>Load</Button>
                    <Form.Control id="pgn-textarea" as="textarea" rows={4} style={{background: "var(--darkishcolor)", color: "inherit"}}></Form.Control>
                </Form.Group>
            </Form>
        </div>
    )
}

export default PgnLoading
