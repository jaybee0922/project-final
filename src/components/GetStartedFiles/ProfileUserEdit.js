import React from "react";
import styles from "../css/GetStartedFiles/ProfileUserEdit.module.css";
import { useNavigate } from "react-router-dom";

const ProfileUserEdit = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/choose-destination");
  };

  const toLostDog = () => {
    navigate("/home-page-of-lost-dog");
  };

  const toFoundDog = () => {
    navigate("/home-page-of-found-dog");
  };

  return (
    <div className={styles.ProfileUserEditMainWrapper}>
      <header className={styles.ProfileUserEditMainHeader}>
        <img
          src={`${process.env.REACT_APP_BASE_URL}/images/Global-images/Logo.png`} // Dynamically set image URL
          alt="Pet Pals Logo"
          className={styles.ProfileUserEditMainLogo}
        />
        <button
          className={styles.ProfileUserEditMainHambuger}
          aria-label="Open navigation menu"
        >
          <div className={styles.ProfileUserEditHamburgerBarSub}></div>
          <div className={styles.ProfileUserEditHamburgerBarSub}></div>
          <div className={styles.ProfileUserEditHamburgerBarSub}></div>
        </button>
      </header>

      {/* Navigation Section */}
      <nav className={styles.ProfileUserEditMainNavbar} role="navigation">
        <span className={styles.ProfileUserEditNavItemText} onClick={toLostDog}>
          Missing
        </span>
        <span className={styles.ProfileUserEditNavItemText} onClick={toFoundDog}>
          Found
        </span>
      </nav>

      {/* Main Content Section */}
      <main className={styles.ProfileUserEditMainContent}>
        <div className={styles.ProfileUserEditArrowBtn}>
          <img
            src={`${process.env.REACT_APP_BASE_URL}/images/Global-images/back-arrow.png`} // Dynamically set image URL
            alt="Back"
            className={styles.ProfileUserEditArrowIcon}
            aria-label="Go back"
            onClick={handleClick}
          />
          <h2 className={styles.ProfileUserEditMainTitle}>User Profile</h2>
        </div>

        <form className={styles.ProfileUserEditForm}>
          <div className={styles.ProfileUserEditCard}>
            <img
              src={`${process.env.REACT_APP_BASE_URL}/images/Global-images/default-user.png`} // Dynamically set image URL
              alt="User Avatar"
              className={styles.ProfileUserEditAvatar}
            />
            <div className={styles.ProfileUserEditInfo}>
              <h2 className={styles.ProfileUserEditDisplayName}>
                Juan Dela Cruz
              </h2>
              <button className={styles.ProfileUserEditBtnEdit}>Edit</button>
              <p className={styles.ProfileUserEditFullName}>
                Full name: Jose John Dela Cruz
              </p>
              <p className={styles.ProfileUserEditContact}>
                Contact #: 0912345678910
              </p>
              <p className={styles.ProfileUserEditAddress}>
                Address: Toril, Davao City
              </p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProfileUserEdit;
