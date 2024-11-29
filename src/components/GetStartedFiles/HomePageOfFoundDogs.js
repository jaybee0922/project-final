import React, { useState, useEffect } from "react";
import styles from "../css/GetStartedFiles/HomePageOfFoundDogs.module.css";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const HomePageOfFoundDogs = () => {
  const [foundDogs, setFoundDogs] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the found dogs from the dynamic base URL
    fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/founddog`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.foundDogs) {
          setFoundDogs(data.foundDogs);
        }
      })
      .catch((error) => {
        console.error("Error fetching found dogs:", error);
      });
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

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

  // Filter the found dogs based on the search query
  const filteredDogs = foundDogs.filter((dog) =>
    dog.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className={styles.homePageOfFoundDogWrapper}>
      <section className={styles.homePageOfFoundDogContainer}>
        <header className={styles.homePageOfFoundDogHeader}>
          <img
            src={require("../images/Global-images/Logo.png")}
            alt="Pet Pals logo"
            className={styles.homePageOfFoundDogLogo}
          />
          <button
            className={styles.homePageOfFoundDogMenuButton}
            onClick={toggleMenu}
          >
            <div className={styles.homePageOfFoundDogMenuLine}></div>
            <div className={styles.homePageOfFoundDogMenuLine}></div>
            <div className={styles.homePageOfFoundDogMenuLine}></div>
          </button>
        </header>

        {/* -------------------------Hamburger Menu */}
        {menuOpen && (
          <div className={styles.homePageOfFoundDogMenuHamburgerBtn}>
            <ul>
              <li onClick={() => navigate("/choose-destination")}>Home</li>
              <li onClick={profileAccount}>Profile</li>
              <li onClick={logout}>Logout</li>
            </ul>
          </div>
        )}

        {/* -------------------------Tabs */}
        <nav className={styles.homePageOfFoundDogTabs}>
          <span
            className={`${styles.homePageOfFoundDogTab} `}
            onClick={viewLostDogs}
          >
            Missing
          </span>
          <span
            className={`${styles.homePageOfFoundDogTab} ${styles.active}`}
          >
            Found
          </span>
        </nav>

        {/* -------------------------Search Bar */}
        {isSearchActive && (
          <div className={styles.homePageOfFoundDogSearchBar}>
            <input
              type="text"
              placeholder="Search by dog name..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.homePageOfFoundDogSearchInput}
            />
          </div>
        )}

        {/* -------------------------Dog Profiles */}
        <section className={styles.homePageOfFoundDogDogProfiles}>
          {filteredDogs.length === 0 ? (
            <p>No found dogs found.</p>
          ) : (
            filteredDogs.map((dog) => (
              <article key={dog.petId} className={styles.homePageOfFoundDogDogCard}>
                <div className={styles.homePageOfFoundDogSuccessBanner}></div>
                <img
                  // Dynamically use the image URL with the base URL
                  src={`${process.env.REACT_APP_BASE_URL}${dog.imagePath}`}
                  alt={dog.name}
                  className={styles.homePageOfFoundDogDogImage}
                />
                <h3 className={styles.homePageOfFoundDogDogName}>{dog.name}</h3>
                <p className={styles.homePageOfFoundDogDogInfo}>
                  {dog.breed} {dog.gender}
                </p>

                <div className={styles.homePageOfFoundDogLastLocation}>
                  <span className={styles.homePageOfFoundDogLastSeenText}>
                    Last Seen:{" "}
                  </span>
                  <span className={styles.homePageOfFoundDogLastSeenRow}>
                    <img
                      src={require("../images/Global-images/location-icon.png")}
                      alt="Location"
                      className={styles.homePageOfFoundDogLocationIcon}
                    />
                    <span className={styles.homePageOfFoundDogLastSeen}>
                      {dog.location}
                    </span>
                  </span>
                </div>
                <p className={styles.homePageOfFoundDogTime}>
                  Posted: {formatDistanceToNow(new Date(dog.createdAt), { addSuffix: true })}
                </p>
                <button className={styles.homePageOfFoundDogMoreButton}>
                  More Info
                </button>
              </article>
            ))
          )}
        </section>

        {/* -------------------------Footer */}
        <footer className={styles.homePageOfFoundDogFooter}>
          <img
            src={require("../images/Global-images/home-icon.png")}
            alt="Home"
            className={styles.homePageOfFoundDogFooterIcon}
          />
          <img
            src={require("../images/Global-images/message-icon.png")}
            alt="Message"
            className={styles.homePageOfFoundDogFooterIcon}
          />
          <div
            className={`${styles.homePageOfFoundDogFooterIcon} ${isSearchActive ? styles.expandedSearchIcon : ""
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
                className={styles.homePageOfFoundDogFooterIcon}
              />
            )}
          </div>
          <img
            src={require("../images/Global-images/notification-icon.png")}
            alt="Notification"
            className={styles.homePageOfFoundDogFooterIcon}
          />
        </footer>

        {/* -------------------------Floating Add Button */}
        <button
          className={styles.homePageOfFoundDogAddButton}
          onClick={foundDogForm}
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

export default HomePageOfFoundDogs;
