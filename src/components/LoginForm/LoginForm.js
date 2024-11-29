import React, { useState } from "react";
import styles from "../css/LoginForm/LoginForm.module.css"; // Import the CSS module
import TermsModal from "../TermsCondition/TermsCondition";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUpClick = () => {
    setIsTermsModalOpen(true);
  };

  const closeModal = () => {
    setIsTermsModalOpen(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // Reset previous error messages
    setErrorMessage("");

    try {
      console.log('Sending login request with:', { username, password });

      // Use environment variable for API URL
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`, // Dynamically use the API URL from the .env file
        { username, password },
        { headers: { "Content-Type": "application/json" } } // Ensure correct content type
      );

      console.log('Login successful:', response);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Assuming your server sends a token

        // Simulate loading bar animation
        setIsLoading(true);
        setTimeout(() => {
          navigate("/choose-destination"); // Navigate after loading
        }, 2000); // 2 seconds loading
      }
    } catch (error) {
      if (error.response) {
        console.log('Login error response:', error.response);
        setErrorMessage(error.response.data.message || "Incorrect username or password.");
      } else {
        console.log('General error:', error);
        setErrorMessage("Something went wrong. Please try again later.");
      }
    }
  };


  return (
    <section className={styles["login-form-container"]}>
      <figure className={styles["login-logo"]}>
        <img
          src={require("../images/Global-images/Logo.png")}
          alt="Pet Pals Logo"
        />
      </figure>

      {errorMessage && (
        <p className={styles["error-message"]}>{errorMessage}</p>
      )}

      <form className={styles["login-form"]} onSubmit={handleLoginSubmit}>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          className={styles["input"]}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className={styles["password-container"]}>
          <input
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            placeholder="Password"
            className={styles["input-with-icon"]}
          />
          <img
            src={require(passwordVisible
              ? "../images/Global-images/hide-eyes.png"
              : "../images/Global-images/open-eyes.png")}
            alt="Toggle Password Visibility"
            className={styles["password-icon"]}
            onClick={() => setPasswordVisible(!passwordVisible)}
          />
        </div>

        <button type="submit" className={styles["login-button"]}>
          Login
        </button>
      </form>

      {isLoading && (
        <div className={styles["loading-bar-container"]}>
          <div className={styles["loading-bar"]}></div>
        </div>
      )}

      <p className={styles["login-text"]}>
        Don't have an account?{" "}
        <button
          type="button"
          className={styles["sign-up-link-button"]}
          onClick={handleSignUpClick}
        >
          Sign Up
        </button>
      </p>
      {/* Render Terms Modal when isTermsModalOpen is true */}
      {isTermsModalOpen && <TermsModal onClose={closeModal} />}
    </section>
  );
};

export default LoginForm;
