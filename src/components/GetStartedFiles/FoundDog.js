import React, { useState } from "react";
import styles from "../css/GetStartedFiles/FoundDog.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FoundDog = () => {
  const navigate = useNavigate();

  const [dogImage, setDogImage] = useState(null); // Store the actual image file
  const [dogInfo, setDogInfo] = useState({
    name: "",
    breed: "",
    color: "",
    size: "",
    details: "",
    gender: "",
    location: "",
  });

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDogImage(file); // Store the actual file (not URL) in the state
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDogInfo({
      ...dogInfo,
      [name]: value,
    });
  };

  const handleGenderChange = (e) => {
    setDogInfo({
      ...dogInfo,
      gender: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append("name", dogInfo.name);
    formData.append("breed", dogInfo.breed);
    formData.append("color", dogInfo.color);
    formData.append("size", dogInfo.size);
    formData.append("gender", dogInfo.gender);
    formData.append("location", dogInfo.location);
    formData.append("details", dogInfo.details);

    // Append the actual image file
    if (dogImage) {
      formData.append("dogImage", dogImage);
    }

    try {
      // Send POST request to the backend with dynamic URL
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/founddog`,  // Use dynamic URL here
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const foundDogData = {
        ...response.data.foundDog,
        image: response.data.image,
      };

      console.log("Response from server:", response.data);
      navigate("/found-dog-profile", { state: foundDogData });
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Error uploading found dog profile.");
    }
  };

  const handleClick = () => {
    navigate("/choose-destination");
  };

  return (
    <div className={styles.FoundDogMainWrapper}>
      {/* Header Section */}
      <header className={styles.FoundDogMainHeader}>
        <img
          src={require("../images/Global-images/Logo.png")}
          alt="Pet Pals Logo"
          className={styles.FoundDogMainLogo}
        />
        <button
          className={styles.FoundDogMainHambuger}
          aria-label="Open navigation menu"
        >
          <div className={styles.FoundDogHamburgerBarSub}></div>
          <div className={styles.FoundDogHamburgerBarSub}></div>
          <div className={styles.FoundDogHamburgerBarSub}></div>
        </button>
      </header>

      {/* Navigation Section */}
      <nav className={styles.FoundDogMainNavbar} role="navigation">
        <span className={styles.FoundDogNavItemText}>Missing</span>
        <span className={styles.FoundDogNavItemText}>Found</span>
      </nav>

      {/* Main Content Section */}
      <main className={styles.FoundDogMainContent}>
        {/* Back Button and Title */}
        <div className={styles.FoundDogArrowBtn}>
          <img
            src={require("../images/Global-images/back-arrow.png")}
            alt="Back"
            className={styles.FoundDogArrowIcon}
            aria-label="Go back"
            onClick={handleClick}
          />
          {/* <h2 className={styles.FoundDogMainTitle}>Report As Found Dog</h2> */}
        </div>

        <div className={styles.FoundDogMainImageUploadContainer}>
          {/* File Upload Section */}
          <label htmlFor="imageUpload" className={styles.FoundDogMainFileLabel}>
            <img
              src={require("../images/Global-images/default-image-upload.png")}
              alt="Upload Icon"
              className={styles.FoundDogMainUploadIcon}
            />
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.FoundDogImageUpload}>
            <input
              type="file"
              id="imageUpload"
              accept=".png, .jpeg, .jpg"
              className={styles.HiddenFileInput}
              onChange={handleImageChange}
            />
            {dogImage && (
              <img
                // Create a temporary URL for the image preview
                src={URL.createObjectURL(dogImage)} // This will generate a URL for the image file
                alt="Selected Dog"
                className={styles.FoundDogSelectedImage}
              />
            )}
          </div>

          <h1 className={styles.FoundDogTextInformation}>
            Found Dog Information.
          </h1>

          {/* Dog Name Input */}
          <div className={styles.FoundDogMainInfo}>
            <input
              type="text"
              id="name"
              name="name"
              value={dogInfo.name}
              onChange={handleChange}
              placeholder="Name of dog..."
              aria-label="Name of the dog"
            />

            {/* Breed Input */}
            <input
              type="text"
              id="breed"
              name="breed"
              value={dogInfo.breed}
              onChange={handleChange}
              placeholder="Optional / breed of dog..."
              aria-label="Breed of the dog"
            />

            {/* Color Input */}
            <input
              type="text"
              id="color"
              name="color"
              value={dogInfo.color}
              onChange={handleChange}
              placeholder="Color of dog..."
              aria-label="Color of the dog"
            />

            {/* Size Input */}
            <input
              type="text"
              id="size"
              name="size"
              value={dogInfo.size}
              onChange={handleChange}
              placeholder="Optional/Size of dog..."
              aria-label="Size of the dog"
            />

            {/* Other Details */}
            <textarea
              id="details"
              name="details"
              value={dogInfo.details}
              onChange={handleChange}
              placeholder="Optional/Other details..."
              aria-label="Other details about the found dog"
            ></textarea>
          </div>

          {/* Gender Input */}
          <div className={styles.FoundDogRadioButtons}>
            <label className={styles.FoundDogGenderOption}>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={dogInfo.gender === "Male"}
                onChange={handleGenderChange}
                className={styles.FoundDogGenderIcon}
                aria-label="Male"
              />
              <img
                src={require("../images/Global-images/male-icon.png")}
                alt="Male"
                className={styles.FoundDogGenderIcon}
              />
              <span>Male</span>
            </label>

            <label className={styles.FoundDogGenderOption}>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={dogInfo.gender === "Female"}
                onChange={handleGenderChange}
                className={styles.FoundDogGenderIcon}
                aria-label="Female"
              />
              <img
                src={require("../images/Global-images/female-icon.png")}
                alt="Female"
                className={styles.FoundDogGenderIcon}
              />
              <span>Female</span>
            </label>
          </div>

          {/* Location Input */}
          <div className={styles.FoundDogLocationInput}>
            <input
              type="text"
              id="location"
              name="location"
              value={dogInfo.location}
              onChange={handleChange}
              placeholder="Location..."
              aria-label="Location where the dog was found"
            />
            <img
              src={require("../images/Global-images/location-icon.png")}
              alt="Location Icon"
              className={styles.FoundDogLocationIcon}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.FoundDogSubmitButton}>
            SUBMIT
          </button>
        </form>
      </main>

      <hr />

      {/* Footer Section */}
      <footer className={styles.FoundDogFooter}>
        <img
          src={require("../images/Global-images/home-icon.png")}
          alt="Home"
          className={styles.FoundDogFooterIcon}
        />
        <img
          src={require("../images/Global-images/message-icon.png")}
          alt="Messages"
          className={styles.FoundDogFooterIcon}
        />
        <img
          src={require("../images/Global-images/magnifying-icon.png")}
          alt="Search"
          className={styles.FoundDogFooterIcon}
        />
        <img
          src={require("../images/Global-images/notification-icon.png")}
          alt="Notifications"
          className={styles.FoundDogFooterIcon}
        />
      </footer>
    </div>
  );
};

export default FoundDog;
