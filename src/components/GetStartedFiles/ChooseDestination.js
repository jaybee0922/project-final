import React, { useEffect, useState } from "react";
import styles from "../css/GetStartedFiles/ChooseDestination.module.css";
import { useNavigate } from "react-router-dom";

const ChooseDestination = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [newPostsCount, setNewPostsCount] = useState(0);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/user/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setUserData({
            fullName: data.fullName || "Juan Dela Cruz",
            profilePic: data.profilePic || "/default-avatar.png",
          });
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchNewPostsCount = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/posts/new-posts-count`, {
          method: "GET",
        });
        const data = await response.json();

        if (response.ok) {
          setNewPostsCount(data.newPostsCount);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching new posts count:", error);
      }
    };

    fetchUserData();
    fetchNewPostsCount();
  }, []);

  const viewLostDogs = () => {
    navigate("/home-page-of-lost-dog");
  };

  const foundDogForm = () => {
    navigate("/found-dog");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const profileAccount = () => {
    navigate("/profile-user-edit");
  };

  const viewNotifications = () => {
    navigate("/notifications");
  };

  return (
    <main className={styles.ChooseDestinationDogWrapper}>
      <section className={styles.ChooseDestinationDogContainer}>
        <header className={styles.ChooseDestinationDogHeader}>
          <img
            src={require("../images/Global-images/Logo.png")}
            alt="Pet Pals logo"
            className={styles.ChooseDestinationDogLogo}
          />
          <button
            className={styles.ChooseDestinationDogMenuButton}
            onClick={toggleMenu}
          >
            <div className={styles.ChooseDestinationDogMenuLine}></div>
            <div className={styles.ChooseDestinationDogMenuLine}></div>
            <div className={styles.ChooseDestinationDogMenuLine}></div>
          </button>
        </header>

        {menuOpen && (
          <div className={styles.ChooseDestinationDogMenuHamburgerBtn}>
            <ul>
              <li onClick={() => navigate("/choose-destination")}>Home</li>
              <li onClick={profileAccount}>Profile</li>
              <li onClick={logout}>Logout</li>
            </ul>
          </div>
        )}

        <nav className={styles.ChooseDestinationDogTabs}>
          <span className={`${styles.ChooseDestinationDogTab}`} onClick={viewLostDogs}>
            View Lost Dog
          </span>
          <span className={`${styles.ChooseDestinationDogTab}`} onClick={foundDogForm}>
            View Found Dog
          </span>
        </nav>

        <form className={styles.ChooseDestinationUserForm}>
          <div className={styles.ChooseDestinationUserCard}>
            <img
              src={
                userData?.profilePic
                  ? `${process.env.REACT_APP_BASE_URL}${userData.profilePic}`
                  : require("../images/Global-images/default-user.png")
              }
              alt={userData?.fullName || "Juan Dela Cruz"}
              className={styles.ChooseDestinationUserAvatar}
            />
            <div className={styles.ChooseDestinationUserInfo}>
              <h2 className={styles.ChooseDestinationUserDisplayName}>
                {userData?.fullName || "Juan Dela Cruz"}
              </h2>

              <div className={styles.ChooseDestinationUserButtons}>
                <button className={styles.ChooseDestinationUserBtnLost} onClick={foundDogForm}>
                  I LOST A DOG
                </button>
                <button className={styles.ChooseDestinationUserBtnFound} onClick={foundDogForm}>
                  I FOUND A DOG
                </button>
              </div>
            </div>
          </div>
        </form>

        <footer className={styles.ChooseDestinationDogFooter}>
          <img
            src={require("../images/Global-images/home-icon.png")}
            alt="Home"
            className={styles.ChooseDestinationDogFooterIcon}
          />
          <img
            src={require("../images/Global-images/message-icon.png")}
            alt="Message"
            className={styles.ChooseDestinationDogFooterIcon}
          />
          <div className={styles.ChooseDestinationDogFooterNotification}>
            <img
              src={require("../images/Global-images/notification-icon.png")}
              alt="Notification"
              className={styles.ChooseDestinationDogFooterIcon}
              onClick={viewNotifications}
            />
            {newPostsCount > 0 && (
              <span className={styles.ChooseDestinationDogNotificationCount}>
                {newPostsCount}
              </span>
            )}
          </div>
        </footer>
      </section>
    </main>
  );
};

export default ChooseDestination;
