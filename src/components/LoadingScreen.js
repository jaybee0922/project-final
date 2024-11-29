import React, { useEffect } from "react";
import styles from "./css/LoadingScreen.module.css";

const LoadingScreen = ({ onFinishLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinishLoading();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onFinishLoading]);

  return (
    <main className={styles.loadingScreen}>
      <section className={styles.loadingScreenForm}>
        <figure className={styles.loadingScreenLogo}>
          <img
            src={require("./images/Global-images/Logo.png")}
            alt="Pet Pals Logo"
            width="200" // Optional, for better image handling
            height="auto" // Maintain aspect ratio
          />
        </figure>
        <div className={styles.loadingText}>
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </section>
    </main>
  );
};

export default LoadingScreen;
