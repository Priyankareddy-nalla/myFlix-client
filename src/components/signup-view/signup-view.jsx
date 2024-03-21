import { useState } from "react";
import { FormGroup, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card, CardBody, CardGroup, Col, Container, Row } from "react-bootstrap";


export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://myflix-app-deh4.onrender.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <CardBody>
                                <Card.Title>Create Account</Card.Title>

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="signupUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            minLength="3"
                                            placeholder="Enter min 3 characters"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="signupPassword">
                                        <Form.Label>Password:</Form.Label>

                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder="Enter password"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="SigupEmail">
                                        <Form.Label> Email:</Form.Label>

                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="Enter valid email address"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="SigupBirthday">
                                        <Form.Label> Birthday:</Form.Label>

                                        <Form.Control
                                            type="date" style={{ backgroundColor: '#d3bad32e', color: 'white' }}
                                            value={birthday}
                                            onChange={(e) => setBirthday(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <br></br>
                                    <Button variant="secondary" style={{ color: "white"}} type="submit">Signup</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
};
