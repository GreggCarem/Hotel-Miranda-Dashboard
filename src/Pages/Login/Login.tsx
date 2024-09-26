import React, { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HotelLogo from "./../../assets/Logos/Hotel-Logo.jpeg";
import { useAuth } from "../../Components/Redux/authContext";

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #135846;
`;

const Header = styled.header`
  background-color: white;
  padding: 3rem 2rem;
  border-radius: 40px;
  width: 100%;
  max-width: 25rem;
  text-align: center;
`;

const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  color: black;
  margin-bottom: 3rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  width: 90%;
`;

const Label = styled.label`
  color: black;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  margin-bottom: 0.8rem;
`;

const Input = styled.input`
  font-size: 1rem;
  border-radius: 10px;
  border: 2px solid #023a2b;
  padding: 0.5rem;
  width: 100%;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #0aebaf;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 1rem;
`;

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3018/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);

      dispatch({
        type: "LOGIN",
        payload: {
          user: data.user,
          token: data.token,
        },
      });
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Login failed. Please check your username and password.");
    }
  };

  return (
    <LoginPageContainer>
      <Header>
        <Title>
          <img
            src={HotelLogo}
            alt="Login Illustration"
            style={{ width: "5rem", height: "auto", marginBottom: "-1.5rem" }}
          />
          Login
        </Title>
        <Form onSubmit={handleLogin}>
          <FormGroup>
            <Label>Username:</Label>
            <Input
              type="text"
              value={username}
              placeholder="admin"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Password:</Label>
            <Input
              type="password"
              value={password}
              placeholder="admin"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit">Login</Button>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Form>
      </Header>
    </LoginPageContainer>
  );
}
