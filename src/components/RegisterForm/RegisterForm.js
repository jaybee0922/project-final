import React, { useState } from "react";
import styles from "../css/RegisterForm/RegisterForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // for database --------- new added
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const validImageTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (file && validImageTypes.includes(file.type)) {
      setProfilePic({
        file: file, // Store the file for uploading
        preview: URL.createObjectURL(file), // Create a preview URL for displaying the image
      });
    } else {
      alert("Please upload a valid image file (.png, .jpeg, .jpg)");
    }
  };

  const loginForm = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (!profilePic?.file) {
      setError("Please upload a profile picture.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", profilePic?.file);
    formData.append("username", username);
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`, // Use environment variable for the API URL
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(res.data.message);
      setTimeout(() => (window.location.href = "/login"), 3000);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <section className={styles["register-form-container"]}>
      <figure className={styles["register-logo"]}>
        <img
          src={require("../images/Global-images/Logo.png")}
          alt="Pet Pals Logo"
        />
      </figure>

      {/* Profile Picture Upload and view it */}
      <div className={styles["profile-pic-container"]}>
        <label htmlFor="profile-pic">
          <img
            src={
              profilePic?.preview ||
              require("../images/Global-images/default-user.png")
            }
            alt="User Icon"
            className={styles["profile-pic"]}
          />
          <img
            src={require("../images/Global-images/default-image-upload.png")}
            alt="Upload Icon"
            className={styles["upload-icon"]}
          />
        </label>
        <input
          type="file"
          id="profile-pic"
          name="profile-pic"
          accept=".png, .jpeg, .jpg"
          onChange={handleImageChange}
          className={styles["file-input"]}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className={styles["register-form"]}
        aria-labelledby="register-form"
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          name="username"
          placeholder="Username"
          className={styles["input"]}
        />
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullname"
          name="fullname"
          placeholder="Full name"
          className={styles["input"]}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
          placeholder="Email"
          className={styles["input"]}
        />
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          id="contact"
          name="contact"
          placeholder="Contact Number"
          className={styles["input"]}
        />

        {/* Password input with show/hide icon */}
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

        {/* Confirm Password input with show/hide icon */}
        <div className={styles["password-container"]}>
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            className={styles["input-with-icon"]}
          />
          <img
            src={require(confirmPasswordVisible
              ? "../images/Global-images/hide-eyes.png"
              : "../images/Global-images/open-eyes.png")}
            alt="Toggle Confirm Password Visibility"
            className={styles["password-icon"]}
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          />
        </div>

        <button type="submit" className={styles["register-button"]}>
          Register now
        </button>
        {/* Error message */}
        {error && <div className="error">{error}</div>}
      </form>

      <p className={styles["register-text"]}>
        Already part of our community?{" "}
        <button
          type="button"
          className={styles["register-sign-up-link-button"]}
          onClick={loginForm}
        >
          Log in
        </button>
      </p>
    </section>
  );
};

export default RegisterForm;
