import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/TermsCondition/TermsCondition.module.css"; // Import CSS module

const TermsModal = ({ onClose }) => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  // Toggle the checkbox and enable/disable the button
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleNextButtonClick = () => {
    if (isChecked) {
      onClose();
      navigate("/register");
    }
  };

  return (
    <div className={styles["modal-overlay"]}>
      <section className={styles["modal-content"]}>
        <button className={styles["close-button"]} onClick={onClose}>
          X
        </button>
        <header>
          <h2>Petpals Registration Terms and Agreements</h2>
        </header>
        <article>
          <section>
            <h3>1. Introduction</h3>
            <p>
              Welcome to Petpals, a mobile application designed to help track lost
              and found pet dogs using an image recognition algorithm. By signing
              up, you agree to the following terms and agreements...
            </p>
          </section>

          <section>
            <h3>2. Acceptance of Terms</h3>
            <p>
              By creating an account, you confirm that you have read, understood, and accepted
              these terms. If you do not agree to any part of these terms, please
              refrain from using Petpals.
            </p>
          </section>

          <section>
            <h3>3. Eligibility</h3>
            <p>
              You must be at least 13 years old to create an account. By
              registering, you affirm that you meet this minimum age requirement.
            </p>
          </section>

          <section>
            <h3>4. Account Responsibilities</h3>
            <ul>
              <li>
                You are responsible for keeping your login credentials confidential.
              </li>
              <li>
                Notify us immediately if you suspect unauthorized access to your
                account.
              </li>
              <li>
                Petpals is not liable for any losses resulting from failure to
                secure your account.
              </li>
            </ul>
          </section>
        </article>

        <div className={styles["agreement-checkbox"]}>
          <input
            type="checkbox"
            id="agree-checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="agree-checkbox">
            I accept and understand the agreement.
          </label>
        </div>
        <button
          className={styles["next-button"]}
          onClick={handleNextButtonClick}
          disabled={!isChecked} // Disable the button if not checked
        >
          Next
        </button>
      </section>
    </div>
  );
};

export default TermsModal;
