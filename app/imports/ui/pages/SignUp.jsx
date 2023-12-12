import React, { useState } from "react";
import { Accounts } from "meteor/accounts-base";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { EnvelopeFill, LockFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Function to reset form fields and errors
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  // Function to create a user account
  const createUser = (email, password) => {
    Accounts.createUser({
      username: email,
      email: email,
      password: password,
    }, (err) => {
      if (err) {
        resetForm();
        setError("Failed to create an account. Please try again.");
        toast.error("Failed to create an account.");
      } else {
        resetForm();
        navigate("/");
        toast.success("Account created successfully. You're now signed in.");
      }
    });
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (password === "" || email === "") {
      setError("Please Enter an Email and Password");
      return;
    }

    createUser(email, password);
  };

  // Render the signup form
  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center">
        <Col lg={8}>
          <Form
            id="signup"
            className="p-3 m-5 rounded-3 bg-white border border-2 shadow-lg"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Col className="text-center">
              <Image src="/images/hoku-pfp.png" className={"mb-3"} width={90} alt={"Hoku Picture"} />
              <h2>Sign Up</h2>
            </Col>
            <Form.Group className="pb-3">
              <div style={{ display: "flex", alignItems: "center" }}>
                <EnvelopeFill className="d-none d-sm-inline me-2" size="25" id="envelope" />
                <Form.Control
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  className={"p-2 rounded-pill bg-info-subtle"}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </Form.Group>

            <Form.Group className="pb-3">
              <div style={{ display: "flex", alignItems: "center" }}>
                <LockFill className="d-none d-sm-inline me-2" size="25" id="lock" />
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="Password"
                  className={"p-2 rounded-pill bg-info-subtle"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </Form.Group>
            {error !== "" && <div className={"text-danger text-center"}>{error}</div>}
            <Button className={"btn-vibrant-primary rounded-pill"} type="submit">
              Sign Up
            </Button>
          </Form>
          <Link to="/signin">Have an account already? Click here to sign in.</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
