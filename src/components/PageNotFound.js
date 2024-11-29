import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = ({ lastValidPath }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(lastValidPath); // Redirect back to the last valid route
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer
  }, [lastValidPath, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Page Not Found</h1>
      <p>Redirecting you back to the last valid page...</p>
    </div>
  );
};

export default PageNotFound;
