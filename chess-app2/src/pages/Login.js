import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

function Login() {

    const [showLoginSucess, setShowLoginSuccess] = useState(false);

    return [
        <div style={{width: "50%"}}>
        <Alert
                show={showLoginSucess} 
                variant="success"
                closeVariant="red"
                closeLabel="close me"
                style={{margin: "2em", padding: "1.5em", fontSize: "120%"}}
        >
            Logged in as <b>{localStorage.getItem("username")}</b>
            <Button 
                className="d-flex justify-content-end"
                onClick={() => setShowLoginSuccess(false)}
                style={{float: "right", padding: ".2em", top: 0}}
                variant="success"
            >
                Close
            </Button>
        </Alert>
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
                setShowLoginSuccess(true);
            }} variant="success">Load</Button>
        </Form>
        </div>
    ]
}

export default Login
