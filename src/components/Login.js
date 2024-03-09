import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { IonIcon } from '@ionic/react';
import { arrowBack, bookmark, settings } from 'ionicons/icons';

const Login = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({  email: "", password: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
        email: credentials.email,
        password: credentials.password
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
    
      localStorage.setItem("email", credentials.email);
      navigate("/");
      props.showAlert("Login successfull!!", "success");
    } else {
      props.showAlert("Please enter with correct details", "danger");
    }
  };

  return (
    <div>
      <div className="segment">
        <h1>Login up</h1>
      </div>

      <form onSubmit={handleClick}>
        <label>
          <input
            type="email"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            required
            onChange={onChange}
            className="form-control form-control-lg "
            placeholder="Enter a valid email address"
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={credentials.password}
            required
            onChange={onChange}
            className="form-control form-control-lg"
          />
        </label>

        <div className="segment">
          <button className="unit" type="button"><IonIcon icon={arrowBack} /></button>
          <button className="unit" type="button"><IonIcon icon={bookmark} /></button>
          <button className="unit" type="button"><IonIcon icon={settings} /></button>
        </div>

        <div className="text-center text-lg-start mt-3 pt-2">
          <button
            type="submit"
            className="btn"
            style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
          >
            Login
          </button>
          <p className="small fw-bold mt-2 pt-1 mb-0">
            Don't have an account?{" "}
            <a href="/signup" className="link-danger my-2">
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
