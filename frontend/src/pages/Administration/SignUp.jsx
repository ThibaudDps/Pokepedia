import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import connexion from "../../services/connexion";

import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [userAuth, setUserAuth] = useState({
    mail: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const showToastMessage = () => {
    toast.success("The data has been recorded successfully !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showToastErrorMessage = () => {
    toast.error("There was an error the data was not saved !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleChange = (event) => {
    setUserAuth((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (confirmPassword === userAuth.password) {
        const response = await connexion.post(`/auth`, userAuth);
        if (response.status === 201) {
          showToastMessage();
          setTimeout(() => {
            navigate("/LogIn");
          }, "3000");
        }
      } else {
        throw new Error("Password don't match!");
      }
    } catch (error) {
      showToastErrorMessage(error);
    }
  };

  return (
    <div>
      <div className="signup">
        <form className="submit-form" onSubmit={handleSubmit}>
          <p className="submit-text">Create your account</p>
          <label>
            <p className="label-text">Mail</p>
            <input
              type="text"
              name="mail"
              required
              value={userAuth.mail}
              onChange={handleChange}
              placeholder="Enter you mail"
            />
          </label>
          <label>
            <p className="label-text">Password </p>
            <input
              type="password"
              name="password"
              required
              value={userAuth.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </label>
          <label>
            <p className="label-text">Confirm Password</p>
            <input
              type="password"
              name="confirmPassword"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder="Confirm your password"
            />
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <ToastContainer />
      <p className="p-login">Already registered? </p>
      <Link to="/login" className="p-link">
        <p className="p-login-link">Log into your account</p>
      </Link>
    </div>
  );
}

export default SignUp;
