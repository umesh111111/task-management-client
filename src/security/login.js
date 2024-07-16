// RegistrationForm.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { login, register } from './../services/dataService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username:email, password };
    const response = await login(userData);
    if(response) {
        localStorage.setItem('token', response.token); // Replace 'token' with your actual token variable
        toast.success('User Login Successfully.');
        navigate('/dashboard');
    }
    // Clear form fields
    setEmail('');
    setPassword('');
  };

  function navigateToRegister(eve) {
    navigate('/register');
  }

  return (
    <Container>
      <Row className="justify-content-md-center login-form">
        <Col md={6}>
          <h2>Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="register-btn" variant="primary" type="submit">
              Login
            </Button>
            <Button  onClick={navigateToRegister} className="register-btn register-btn-nav" variant="primary">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
