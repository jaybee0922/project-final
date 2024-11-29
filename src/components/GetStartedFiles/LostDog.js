import React, { useState } from "react";
import styles from "../css/GetStartedFiles/LostDog.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LostDog = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const [dogImage, setDogImage] = useState(null);
  const [dogInfo, setDogInfo] = useState({
    name: "",
    breed: "",
    color: "",
    size: "",
    details: "",
    gender: "",
    location: "",
  });

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const profileAccount = () => {
    navigate("/profile-user-edit");
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDogImage(file);
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

    const formData = new FormData();
    formData.append("name", dogInfo.name);
    formData.append("breed", dogInfo.breed);
    formData.append("color", dogInfo.color);
    formData.append("size", dogInfo.size);
    formData.append("gender", dogInfo.gender);
    formData.append("location", dogInfo.location);
    formData.append("details", dogInfo.details);
    formData.append("isNew", true); // Add isNew field

    // Append the actual image file
    if (dogImage) {
      formData.append("dogImage", dogImage);
    }

    try {
      // Send POST request to the backend using the dynamic base URL
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/lostdog`, // Use dynamic base URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const lostDogData = {
        ...response.data.lostDog,
        image: response.data.image,
      };

      console.log("Response from server:", response.data);
      navigate("/lost-dog-profile", { state: lostDogData });
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Error uploading lost dog profile.");
    }
  };

  const handleClick = () => {
    navigate("/choose-destination");
  };

  return (
    <div className={styles.LostDogMainWrapper}>
      <header className={styles.LostDogMainHeader}>
        <img
          src={require("../images/Global-images/Logo.png")}
          alt="Pet Pals Logo"
          className={styles.LostDogMainLogo}
        />
        <button
          className={styles.LostDogMainHambuger}
          aria-label="Open navigation menu"
          onClick={toggleMenu}
        >
          <div className={styles.LostDogHamburgerBarSub}></div>
          <div className={styles.LostDogHamburgerBarSub}></div>
          <div className={styles.LostDogHamburgerBarSub}></div>
        </button>
      </header>

      {/* -------------------------Hamburger Menu */}
      {menuOpen && (
        <div className={styles.LostDogMenuHamburgerBtn}>
          <ul>
            <li onClick={() => navigate("/choose-destination")}>Home</li>
            <li onClick={profileAccount}>Profile</li>
            <li onClick={logout}>Logout</li>
          </ul>
        </div>
      )}

      <nav className={styles.LostDogMainNavbar} role="navigation">
        <span className={styles.LostDogNavItemText}>Missing</span>
        <span className={styles.LostDogNavItemText}>Found</span>
      </nav>

      <main className={styles.LostDogMainContent}>
        <div className={styles.LostDogArrowBtn}>
          <img
            src={require("../images/Global-images/back-arrow.png")}
            alt="Back"
            className={styles.LostDogArrowIcon}
            aria-label="Go back"
            onClick={handleClick}
          />
          <h2 className={styles.LostDogMainTitle}>Report As Lost Dog</h2>
        </div>

        <div className={styles.LostDogMainImageUploadContainer}>
          <label htmlFor="imageUpload" className={styles.LostDogMainFileLabel}>
            <img
              src={require("../images/Global-images/default-image-upload.png")}
              alt="Upload Icon"
              className={styles.LostDogMainUploadIcon}
            />
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.LostDogImageUpload}>
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
                className={styles.LostDogSelectedImage}
              />
            )}
          </div>

          <h1 className={styles.LostDogTextInformation}>
            Lost Dog Information.
          </h1>

          <div className={styles.LostDogMainInfo}>
            <input
              type="text"
              id="name"
              name="name"
              value={dogInfo.name}
              onChange={handleChange}
              placeholder="Name of dog..."
              aria-label="Name of the dog"
            />
            <input
              type="text"
              id="breed"
              name="breed"
              value={dogInfo.breed}
              onChange={handleChange}
              placeholder="Optional / breed of dog..."
              aria-label="Breed of the dog"
            />
            <input
              type="text"
              id="color"
              name="color"
              value={dogInfo.color}
              onChange={handleChange}
              placeholder="Color of dog..."
              aria-label="Color of the dog"
            />
            <input
              type="text"
              id="size"
              name="size"
              value={dogInfo.size}
              onChange={handleChange}
              placeholder="Optional/Size of dog..."
              aria-label="Size of the dog"
            />
            <textarea
              id="details"
              name="details"
              value={dogInfo.details}
              onChange={handleChange}
              placeholder="Optional/Other details..."
              aria-label="Other details about the lost dog"
            ></textarea>
          </div>

          <div className={styles.LostDogRadioButtons}>
            <label className={styles.LostDogGenderOption}>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={dogInfo.gender === "Male"}
                onChange={handleGenderChange}
                className={styles.LostDogGenderIcon}
                aria-label="Male"
              />
              <img
                src={require("../images/Global-images/male-icon.png")}
                alt="Male"
                className={styles.LostDogGenderIcon}
              />
              <span>Male</span>
            </label>

            <label className={styles.LostDogGenderOption}>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={dogInfo.gender === "Female"}
                onChange={handleGenderChange}
                className={styles.LostDogGenderIcon}
                aria-label="Female"
              />
              <img
                src={require("../images/Global-images/female-icon.png")}
                alt="Female"
                className={styles.LostDogGenderIcon}
              />
              <span>Female</span>
            </label>
          </div>

          <div className={styles.LostDogLocationInput}>
            <input
              type="text"
              id="location"
              name="location"
              value={dogInfo.location}
              onChange={handleChange}
              placeholder="Location..."
              aria-label="Location where the dog was lost"
            />
            <img
              src={require("../images/Global-images/location-icon.png")}
              alt="Location Icon"
              className={styles.LostDogLocationIcon}
            />
          </div>

          <button type="submit" className={styles.LostDogSubmitButton}>
            SUBMIT
          </button>
        </form>
      </main>

      <hr />

      <footer className={styles.LostDogFooter}>
        <img
          src={require("../images/Global-images/home-icon.png")}
          alt="Home"
          className={styles.LostDogFooterIcon}
        />
        <img
          src={require("../images/Global-images/message-icon.png")}
          alt="Messages"
          className={styles.LostDogFooterIcon}
        />
        <img
          src={require("../images/Global-images/magnifying-icon.png")}
          alt="Search"
          className={styles.LostDogFooterIcon}
        />
        <img
          src={require("../images/Global-images/notification-icon.png")}
          alt="Notifications"
          className={styles.LostDogFooterIcon}
        />
      </footer>
    </div>
  );
};

export default LostDog;
