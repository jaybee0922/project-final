import React, { useState, useEffect } from "react";
import styles from "../css/GetStartedFiles/HomePageOfLostDogs.module.css";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const HomePageOfLostDogs = () => {
  const [lostDogs, setLostDogs] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the lost dogs from the dynamic base URL
    fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/lostdog`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.lostDogs) {
          setLostDogs(data.lostDogs);
        }
      })
      .catch((error) => {
        console.error("Error fetching lost dogs:", error);
      });
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const viewFoundDogs = () => {
    navigate("/home-page-of-found-dog");
  };

  const lostDogForm = () => {
    navigate("/lost-dog");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const profileAccount = () => {
    navigate("/profile-user-edit");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleSearchBar = () => {
    setIsSearchActive(!isSearchActive);
  };

  // Function to clear the search input and close the search bar
  const closeSearch = () => {
    setSearchQuery("");
    setIsSearchActive(false);
  };

  const filteredDogs = lostDogs.filter((dog) =>
    dog.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className={styles.homePageOfLostDogWrapper}>
      <section className={styles.homePageOfLostDogContainer}>
        <header className={styles.homePageOfLostDogHeader}>
          <img
            src={require("../images/Global-images/Logo.png")}
            alt="Pet Pals logo"
            className={styles.homePageOfLostDogLogo}
          />
          <button
            className={styles.homePageOfLostDogMenuButton}
            onClick={toggleMenu}
          >
            <div className={styles.homePageOfLostDogMenuLine}></div>
            <div className={styles.homePageOfLostDogMenuLine}></div>
            <div className={styles.homePageOfLostDogMenuLine}></div>
          </button>
        </header>

        {/* -------------------------Hamburger Menu */}
        {menuOpen && (
          <div className={styles.homePageOfLostDogMenuHamburgerBtn}>
            <ul>
              <li onClick={() => navigate("/choose-destination")}>Home</li>
              <li onClick={profileAccount}>Profile</li>
              <li onClick={logout}>Logout</li>
            </ul>
          </div>
        )}

        {/* -------------------------Tabs */}
        <nav className={styles.homePageOfLostDogTabs}>
          <span className={`${styles.homePageOfLostDogTab} ${styles.active}`}>
            Missing
          </span>
          <span
            className={styles.homePageOfLostDogTab}
            onClick={viewFoundDogs}
          >
            Found
          </span>
        </nav>

        {/* -------------------------Search Bar */}
        {isSearchActive && (
          <div className={styles.homePageOfLostDogSearchBar}>
            <input
              type="text"
              placeholder="Search by dog name..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.homePageOfLostDogSearchInput}
            />
          </div>
        )}

        {/* -------------------------Dog Profiles */}
        <section className={styles.homePageOfLostDogDogProfiles}>
          {filteredDogs.length === 0 ? (
            <p>No lost dogs found.</p>
          ) : (
            filteredDogs.map((dog) => (
              <article key={dog.petId} className={styles.homePageOfLostDogDogCard}>
                <div className={styles.homePageOfLostDogSuccessBanner}></div>
                <img
                  // Dynamically use the image URL with the base URL
                  src={`${process.env.REACT_APP_BASE_URL}${dog.imagePath}`}
                  alt={dog.name}
                  className={styles.homePageOfLostDogDogImage}
                />
                <h3 className={styles.homePageOfLostDogDogName}>{dog.name}</h3>
                <p className={styles.homePageOfLostDogDogInfo}>
                  {dog.breed} {dog.gender}
                </p>
                <div className={styles.homePageOfLostDogLastLocation}>
                  <span className={styles.homePageOfLostDogLastSeenText}>
                    Last Seen:{" "}
                  </span>
                  <span className={styles.homePageOfLostDogLastSeenRow}>
                    <img
                      src={require("../images/Global-images/location-icon.png")}
                      alt="Location"
                      className={styles.homePageOfLostDogLocationIcon}
                    />
                    <span className={styles.homePageOfLostDogLastSeen}>
                      {dog.location}
                    </span>
                  </span>
                </div>
                <p className={styles.homePageOfLostDogTime}>
                  Posted:{" "}
                  {formatDistanceToNow(new Date(dog.createdAt), {
                    addSuffix: true,
                  })}
                </p>
                <button className={styles.homePageOfLostDogMoreButton}>
                  More Info
                </button>
              </article>
            ))
          )}
        </section>

        {/* -------------------------Footer */}
        <footer className={styles.homePageOfLostDogFooter}>
          <img
            src={require("../images/Global-images/home-icon.png")}
            alt="Home"
            className={styles.homePageOfLostDogFooterIcon}
          />
          <img
            src={require("../images/Global-images/message-icon.png")}
            alt="Message"
            className={styles.homePageOfLostDogFooterIcon}
          />
          <div
            className={`${styles.homePageOfLostDogFooterIcon} ${isSearchActive ? styles.expandedSearchIcon : ""
              }`}
            onClick={toggleSearchBar}
            style={{
              width: isSearchActive ? "50px" : "24px", // Change width when active
            }}
          >
            {isSearchActive ? (
              <span onClick={closeSearch} style={{ fontSize: "20px" }}>
                X
              </span>
            ) : (
              <img
                src={require("../images/Global-images/magnifying-icon.png")}
                alt="Search"
                className={styles.homePageOfLostDogFooterIcon}
              />
            )}
          </div>
          <img
            src={require("../images/Global-images/notification-icon.png")}
            alt="Message"
            className={styles.homePageOfLostDogFooterIcon}
          />
        </footer>

        {/* -------------------------Floating Add Button */}
        <button
          className={styles.homePageOfLostDogAddButton}
          onClick={lostDogForm}
        >
          <img
            src={require("../images/Global-images/add-icon.png")}
            alt="Add Dog"
          />
        </button>
      </section>
    </main>
  );
};

export default HomePageOfLostDogs;
