import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.css";
import axios from "axios";
import logo from "./Official_logo_tanla.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  const handleInputChane = (e) => {
    const updatedForm = { ...formData };
    updatedForm[e.target.name] = e.target.value;
    setFormData(updatedForm);
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    console.log("submit clicked");
    e.preventDefault();

    axios
      .post(`http://localhost:8080/login/`, formData)
      .then((res) => {
        navigate(formData.category === "agency" ? "/reports" : "/products");
      })
      .catch((err) => {
        alert(err);
        navigate("/signup");
      });
  };

  return (
    <div className="parentWrapper">
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Login with your account</h1>
          <div className="inputsWrapper">
            <div className="usersSelect">
              <label htmlFor="users">Email Id</label>
              <input
                className="customInput"
                type="email"
                name="emailId"
                placeholder="Please Enter Email Id"
                required
                onChange={handleInputChane}
              />
            </div>
            <div className="usersSelect">
              <label htmlFor="users">Password</label>
              <input
                className="customInput"
                type="password"
                name="password"
                placeholder="Enter Password"
                required
                minLength={8}
                maxLength={12}
                onChange={handleInputChane}
              />
            </div>
          </div>
          <button className="loginBtn" type="submit">
            Sign In
          </button>
          <img
            className="logoImg"
            src="https://s3-symbol-logo.tradingview.com/tanla--600.png"
            alt="logo"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
