// RegistrationForm.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { register } from '../services/dataService';
const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Registration data:', { email, password });
    try {
      const userData = { username:email, password };
      const response = await register(userData);
      if(response) {
        toast.success('User Registered Successfully.');
        navigate('/login');
      }
    } catch (error) {
      toast.error('Registered Failed.');
    } finally {

    }

    // Clear form fields
    setEmail('');
    setPassword('');
  };

  return (
    <Container>
      <Row className="justify-content-md-center login-form">
        <Col md={6}>
          <h2>Register</h2>
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
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
