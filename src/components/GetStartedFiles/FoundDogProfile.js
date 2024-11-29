import React, { useEffect, useState } from "react";
import styles from "../css/GetStartedFiles/FoundDogProfile.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns"; // Import the function to calculate time ago

const FoundDogProfile = () => {
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
          `${process.env.REACT_APP_BASE_URL}/api/auth/user/profile`, // Use dynamic URL here
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
    navigate("/found-dog");
  };

  const editProfile = () => {
    navigate("/profile-user-edit");
  };

  const homePageOfFoundDog = () => {
    navigate("/home-page-of-found-dog", { state: { dogData } }); // Pass the dogData as state
  };

  // Format the time ago
  const timeAgo = formatDistanceToNow(new Date(dogData.createdAt), { addSuffix: true });

  return (
    <div className={styles.FoundDogProfileMainWrapper}>
      <header className={styles.FoundDogProfileMainHeader}>
        <img
          src={require("../images/Global-images/Logo.png")}
          alt="Pet Pals Logo"
          className={styles.FoundDogProfileMainLogo}
        />
        <button
          className={styles.FoundDogProfileMainHambuger}
          aria-label="Open navigation menu"
        >
          <div className={styles.FoundDogProfileHamburgerBarSub}></div>
          <div className={styles.FoundDogProfileHamburgerBarSub}></div>
          <div className={styles.FoundDogProfileHamburgerBarSub}></div>
        </button>
      </header>

      <nav className={styles.FoundDogProfileMainNavbar} role="navigation">
        <span className={styles.FoundDogProfileNavItemText}>Missing</span>
        <span className={styles.FoundDogProfileNavItemText}>Found</span>
      </nav>

      <main className={styles.FoundDogProfileMainContent}>
        <div className={styles.FoundDogProfileArrowBtn}>
          <img
            src={require("../images/Global-images/back-arrow.png")}
            alt="Back"
            className={styles.FoundDogProfileArrowIcon}
            aria-label="Go back"
            onClick={handleClick}
          />
        </div>

        <section className={styles.FoundDogProfileMainContainerCards}>
          <article className={styles.FoundDogProfileMainCards}>
            {/* Use dogData.imagePath directly for image source */}
            <img
              src={
                dogData.imagePath
                  ? `${process.env.REACT_APP_BASE_URL}${dogData.imagePath}` // Use dynamic BASE_URL here
                  : require("../images/Global-images/dog-icon.png")
              }
              alt={dogData.name}
              className={styles.FoundDogProfileMissingDog}
            />

            <section className={styles.FoundDogProfileInfo}>
              <p className={styles.FoundDogProfilePetId}>
                Pet ID #: {dogData.petId}
              </p>
              <h2 className={styles.FoundDogProfileName}>{dogData.name}</h2>
              <p className={styles.FoundDogProfileBreed}>{dogData.breed}</p>
              <div className={styles.FoundDogProfileDetails}>
                <span className={styles.FoundDogProfileGender}>
                  {dogData.gender}
                </span>
                <span className={styles.FoundDogProfileAge}>2 years</span>{" "}
                {/* Can be dynamic if you store age */}
              </div>
              <button className={styles.FoundDogProfileEditButton}>Edit</button>
              <hr />
              <div className={styles.FoundDogProfileLastSeen}>
                <img
                  src={require("../images/Global-images/location-icon.png")}
                  alt="Location"
                  className={styles.FoundDogProfileLocationIcon}
                />
                <span>Last seen: {dogData.location}</span>
              </div>
              <p className={styles.FoundDogProfileColor}>
                Color: {dogData.color}
              </p>
              <p className={styles.FoundDogProfileSize}>Size: {dogData.size}</p>
              <p className={styles.FoundDogProfileUniqueMarkings}>
                Unique markings/features: {dogData.details}
              </p>
              <p className={styles.FoundDogProfileTimestamp}>{timeAgo}</p>
              <div className={styles.FoundDogProfilePostedBy}>
                {userData && (
                  <>
                    <img
                      src={
                        userData.profilePic
                          ? `${process.env.REACT_APP_BASE_URL}${userData.profilePic}` // Use dynamic BASE_URL here
                          : require("../images/Global-images/default-user.png")
                      }
                      alt={userData.fullName || "Juan Dela Cruz"}
                      className={styles.FoundDogProfileUserIcon}
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
          className={styles.FoundDogProfileMessageButton}
          onClick={homePageOfFoundDog}
        >
          <img
            src={require("../images/Global-images/message-icon.png")}
            alt="Message"
            className={styles.FoundDogProfileMessageIcon}
          />
          REPORT AS FOUND DOG
        </button>
      </main>
    </div>
  );
};

export default FoundDogProfile;
