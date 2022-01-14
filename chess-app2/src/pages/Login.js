import React from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"

function Login() {
    return [
        <Form style={{margin: "3em"}}>
            <Form.Group className="mb-3" controlId="username-form">
                <Form.Label>Enter Chess.com Username</Form.Label>
                <Form.Control id="username-input" type="text" style={{background: "var(--darkishcolor)", color: "inherit"}}></Form.Control>
            </Form.Group>
            <Button onClick={() => {
                var textbox = document.getElementById("username-input");
                var text = textbox.value;
                textbox.value = "";
                localStorage.setItem("username", text)
            }} variant="success">Load</Button>
        </Form>
    ]
}

export default Login
