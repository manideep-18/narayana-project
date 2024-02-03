import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./Login.css"; // Import your custom CSS file for styling
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loginSuccess, setLoginSuccess] = useState(true);
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://20.235.244.160:9781/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    });

    if (response.status === 200) {
      // Assuming your API returns a token upon successful login
      const data = await response.json();
      const token = data.access_token;
      // Save the token to localStorage
      localStorage.setItem("access_token", token);
      // Update the isLoggedIn state
      setLoginSuccess(true);
      navigate("/vmpage")
    } else {
      setLoginSuccess(false);
    }
  };

  return (
    <div className="login-container">
      <Form className="login-form" onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <Form.Group controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPingCheck">
          <div style={{textAlign:"center",padding:"20px"}}>
          <Button variant="primary" type="submit" >
            Login
          </Button>
          </div>
          {loginSuccess === false && (
            <Alert variant="danger" className="mt-3">
              Incorrect email or password. Please try again.
            </Alert>
          )}
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;