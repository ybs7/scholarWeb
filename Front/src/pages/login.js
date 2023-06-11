import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, FormGroup, FormLabel, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [userId,setUserId] = useState();
    const [userPassword,setUserPassword] = useState();
    // const [userId,setUserId] = useState();

    const submitLoginForm = (event) => {
        event.preventDefault();
        const formElement = document.querySelector('#loginForm');
        const formData = new FormData(formElement);
        const formDataJSON = Object.fromEntries(formData);
        const btnPointer = document.querySelector('#login-btn');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disabled', true);
        axios.post("http://localhost:9999/login",{
            user_id: userId,
            user_password: userPassword
        }).then((response) => {
            btnPointer.innerHTML = 'Login';
            btnPointer.removeAttribute('disabled');
            const data = response.data;
            const token = data.token[0].user_token;
            if (!token) {
                alert('Unable to login. Please try after some time.');
                return;
            }
            alert('Login Succesfull!');
            localStorage.clear();
            console.log(token)
            localStorage.setItem('user-token', token);
            console.log(localStorage.getItem('user-token'))
            setTimeout(() => {
                navigate('/home');
            }, 500);

        }).catch((error) => {
            btnPointer.innerHTML = 'Login';
            btnPointer.removeAttribute('disabled');
            alert("Oops! Some error occured.");
        });
    }

    return (
        <React.Fragment>
            <Container className="my-5 grid h-screen place-items-center ">
                <Card className="w-2/5 flex justify-center mb-72">
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <h2 className="fw-normal mb-5">Login To React Auth Demo</h2>
                <Row>
                    <Col md={{span: 6}}>
                        <Form id="loginForm" onSubmit={submitLoginForm}>
                            <FormGroup className="mb-3">
                                <FormLabel htmlFor={'login-username'}>Username</FormLabel>
                                <input type={'text'} className="form-control" id={'login-username'} name="username" required 
                                onChange={(e) => {
                                    setUserId(e.target.value);
                                }}
                            />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormLabel htmlFor={'login-password'}>Password</FormLabel>
                                <input type={'password'} className="form-control" id={'login-password'} name="password" required 
                                onChange={(e) => {
                                    setUserPassword(e.target.value);
                                }}
                                />
                            </FormGroup>
                            <Button type="submit" className="btn-success mt-2" id="login-btn">Login</Button>
                        </Form>
                    </Col>
                </Row>
        
                </Card.Body>
                </Card>
                
            </Container>
        </React.Fragment>
    );
}

export default Login;