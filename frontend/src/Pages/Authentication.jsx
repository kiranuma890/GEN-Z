import React, { useState ,useContext } from "react";
import "./CSS/Authentication.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";

const Authentication = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const { setIsLoggedIn, setUser } = useContext(ShopContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, { email, password })
      .then((result) => {
        console.log(result);
        if (result.data.user) {
          setUser(result.data.user);
          setIsLoggedIn(true);
          navigate("/");
        } else {
          setError(result.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("something went wrong please try again later");
      });
  };
  return (
    <>
      <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="loginsignup-fields">
              <input
                type="email"
                placeholder="Your Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Your Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button>Continue</button>
          </form>
          <Link
            to="/login"
            style={{ textDecoration: "none" }}
            className="loginsignup-login"
          >
            Don't have an account? <span>Register here</span>
          </Link>
          <center>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </center>
        </div>
      </div>
    </>
  );
};

export default Authentication;
