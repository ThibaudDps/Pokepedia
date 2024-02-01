import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { AuthContext } from "../../contexts/Auth";
import connexion from "../../services/connexion";

import "react-toastify/dist/ReactToastify.css";

const user = {
  mail: "",
  password: "",
};

const showToastMessage = () => {
  toast.success(
    "Your connection information is correct, you will be redirected !",
    {
      position: toast.POSITION.TOP_CENTER,
    }
  );
};

const showToastErrorMessage = () => {
  toast.error("Your login information is not correct !", {
    position: toast.POSITION.TOP_RIGHT,
  });
};

function Login() {
  const [credentials, setCredentials] = useState(user);
  const { setInfosUser } = useContext(AuthContext);
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
      setInfosUser(valid.data);
      showToastMessage();
      if (valid.data.id) {
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setTimeout(() => {
          navigate("/signup");
        }, 3000);
      }
    } catch (error) {
      showToastErrorMessage(error);
      setCredentials(user);
    }
  };

  return (
    <div>
      <div className="login">
        <form className="submit-form" onSubmit={handleRequest}>
          <p className="submit-text">Log in to your account</p>
          <label>
            <p className="label-text">Mail</p>
            <input
              type="email"
              name="mail"
              required
              onChange={handleCredentials}
              value={credentials.mail}
            />
          </label>
          <label>
            <p className="label-text">Password</p>
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
      <ToastContainer />

      <p className="p-login">Not registered yet? </p>
      <Link to="/signup" className="p-link">
        <p className="p-login-link">Create your account</p>
      </Link>
    </div>
  );
}

export default Login;
