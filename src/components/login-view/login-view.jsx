import { useState } from "react";
import { Card, CardBody, CardGroup, Col, Container, Row } from "react-bootstrap";
import { Button }from "react-bootstrap";
import { Form } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch("https://myflix-app-deh4.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }

            })
            .catch((e) => {
                alert("Something went wrong");
            });
    }
    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <CardBody>
                                <Card.Title>Welcome to MyFlix</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                                            required
                                        /> </Form.Group>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                            required
                                        /></Form.Group>
                                    <br></br>
                                    <Button type="submit" variant="secondary" style={{ color: "white"}}>Login</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
};
