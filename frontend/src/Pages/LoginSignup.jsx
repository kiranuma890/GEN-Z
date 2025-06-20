import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginSignup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post("http://localhost:3001/register", { name, email, password })
      .then((result) => {
        console.log(result);
        navigate("/Auth");
      })

      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 400) {
          setError(err.response.data.error);
        } else {
          setError("something went wrong please try again later..");
        }
      });
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <center>{error && <p style={{ color: "red" }}>{error}</p>}</center>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input
              type="text"
              placeholder="Your Name"
              required
              onChange={(e) => setName(e.target.value)}
              autoComplete="username"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Your Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button>Continue</button>
        </form>
        <Link
          to="/Auth"
          style={{ textDecoration: "none" }}
          className="loginsignup-login"
        >
          Already have an account? <span>Login here</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginSignup;
