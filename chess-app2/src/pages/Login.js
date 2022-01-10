import React from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Login() {
    return (
        <Form>
            <Form.Group>
                <Form.Label style={{padding: ".3em", margin: ".2em"}}>Chess.com Username</Form.Label>
                <Form.Control id="username-input" type="text" style={{background: "var(--darkishcolor)", color: "inherit"}}></Form.Control>
                <Button onClick={() => {
                    var textbox = document.getElementById("username-input");
                    var text = textbox.value;
                    textbox.value = "";
                    localStorage.setItem("username", text)
                }} variant="success">Load</Button>
            </Form.Group>
        </Form>
    )
}

export default Login
