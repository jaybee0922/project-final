import React, { useEffect, useState } from "react";
import styles from "../css/GetStartedFiles/LostDogProfile.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const LostDogProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dogData = location.state;
  const [userData, setUserData] = useState(null);

  // Fetch user information based on dogData.postedById
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/auth/user/profile`, // Dynamic base URL
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setUserData({
            fullName: data.fullName || "Default Name",
            profilePic: data.profilePic || "/default-avatar.png",
          });
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleClick = () => {
    navigate("/lost-dog");
  };

  const editProfile = () => {
    navigate("/profile-user-edit");
  };

  const homePageOfLostDog = () => {
    navigate("/home-page-of-lost-dog", { state: { dogData } }); // Pass the dogData as state
  };

  // Format the time ago
  const timeAgo = formatDistanceToNow(new Date(dogData.createdAt), { addSuffix: true });

  return (
    <div className={styles.LostDogProfileMainWrapper}>
      <header className={styles.LostDogProfileMainHeader}>
        <img
          src={require("../images/Global-images/Logo.png")}
          alt="Pet Pals Logo"
          className={styles.LostDogProfileMainLogo}
        />
        <button
          className={styles.LostDogProfileMainHambuger}
          aria-label="Open navigation menu"
        >
          <div className={styles.LostDogProfileHamburgerBarSub}></div>
          <div className={styles.LostDogProfileHamburgerBarSub}></div>
          <div className={styles.LostDogProfileHamburgerBarSub}></div>
        </button>
      </header>

      <nav className={styles.LostDogProfileMainNavbar} role="navigation">
        <span className={styles.LostDogProfileNavItemText}>Missing</span>
        <span className={styles.LostDogProfileNavItemText}>Found</span>
      </nav>

      <main className={styles.LostDogProfileMainContent}>
        <div className={styles.LostDogProfileArrowBtn}>
          <img
            src={require("../images/Global-images/back-arrow.png")}
            alt="Back"
            className={styles.LostDogProfileArrowIcon}
            aria-label="Go back"
            onClick={handleClick}
          />
        </div>

        <section className={styles.LostDogProfileMainContainerCards}>
          <article className={styles.LostDogProfileMainCards}>
            {/* Use dogData.imagePath directly for image source */}
            <img
              src={dogData.imagePath
                ? `${process.env.REACT_APP_BASE_URL}${dogData.imagePath}` // Use dynamic URL
                : require("../images/Global-images/dog-icon.png")} // Default image if none
              alt={dogData.name}
              className={styles.LostDogProfileMissingDog}
            />

            <section className={styles.LostDogProfileInfo}>
              <p className={styles.LostDogProfilePetId}>
                Pet ID #: {dogData.petId}
              </p>
              <h2 className={styles.LostDogProfileName}>{dogData.name}</h2>
              <p className={styles.LostDogProfileBreed}>{dogData.breed}</p>
              <div className={styles.LostDogProfileDetails}>
                <span className={styles.LostDogProfileGender}>
                  {dogData.gender}
                </span>
                <span className={styles.LostDogProfileAge}>2 years</span>{" "}
                {/* Can be dynamic if you store age */}
              </div>
              <button className={styles.LostDogProfileEditButton}>Edit</button>
              <hr />
              <div className={styles.LostDogProfileLastSeen}>
                <img
                  src={require("../images/Global-images/location-icon.png")}
                  alt="Location"
                  className={styles.LostDogProfileLocationIcon}
                />
                <span>Last seen: {dogData.location}</span>
              </div>
              <p className={styles.LostDogProfileColor}>
                Color: {dogData.color}
              </p>
              <p className={styles.LostDogProfileSize}>Size: {dogData.size}</p>
              <p className={styles.LostDogProfileUniqueMarkings}>
                Unique markings/features: {dogData.details}
              </p>
              <p className={styles.LostDogProfileTimestamp}>{timeAgo}</p>
              <div className={styles.LostDogProfilePostedBy}>
                {userData && (
                  <>
                    <img
                      src={userData.profilePic
                        ? `${process.env.REACT_APP_BASE_URL}${userData.profilePic}` // Use dynamic URL for profile pic
                        : require("../images/Global-images/default-user.png")}
                      alt={userData.fullName || "Juan Dela Cruz"}
                      className={styles.LostDogProfileUserIcon}
                      onClick={editProfile}
                    />
                    <span>Posted by {userData.fullName || "Juan Dela Cruz"}</span>
                  </>
                )}
              </div>
            </section>
          </article>
        </section>

        <button
          className={styles.LostDogProfileMessageButton}
          onClick={homePageOfLostDog}
        >
          <img
            src={require("../images/Global-images/message-icon.png")}
            alt="Message"
            className={styles.LostDogProfileMessageIcon}
          />
          REPORT AS LOST DOG
        </button>
      </main>
    </div>
  );
};

export default LostDogProfile;
