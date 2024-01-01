import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/Auth";
import connexion from "../../services/connexion";

const user = {
  mail: "",
  password: "",
};

function Login() {
  const [credentials, setCredentials] = useState(user);
  const { setConnected } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCredentials = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      const valid = await connexion.post("/login", credentials);
      setConnected(valid.data.msg);
      setTimeout(() => {
        navigate("/administration");
      }, 1000);
    } catch (error) {
      console.error(error);
      setCredentials(user);
    }
  };

  return (
    <div>
      <div className="submit">
        <form className="form" onSubmit={handleRequest}>
          <p className="submit-text">Log in to your account</p>
          <label>
            <p className="label-text">Mail </p>
            <input
              type="text"
              name="mail"
              required
              onChange={handleCredentials}
              value={credentials.mail}
            />
          </label>
          <label>
            <p className="label-text">Password </p>
            <input
              type="password"
              name="password"
              required
              onChange={handleCredentials}
              value={credentials.password}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
