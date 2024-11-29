import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import ChooseDestination from "./components/GetStartedFiles/ChooseDestination";


// Lost and Found Dog form
import LostDog from "./components/GetStartedFiles/LostDog";
import FoundDog from "./components/GetStartedFiles/FoundDog";
import LostDogProfile from "./components/GetStartedFiles/LostDogProfile";
import FoundDogProfile from "./components/GetStartedFiles/FoundDogProfile";
import ProfileUserEdit from "./components/GetStartedFiles/ProfileUserEdit";

// Home page of lost and found dogs
import HomePageOfLostDogs from "./components/GetStartedFiles/HomePageOfLostDogs";
import HomePageOfFoundDogs from "./components/GetStartedFiles/HomePageOfFoundDogs";

// Import the ProtectedRoute component
import ProtectedRoute from "./components/ProtectedRoute";
import Notifications from "./components/GetStartedFiles/Notifications";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleFinishLoading = () => {
    setIsLoading(false);
  };

  return (
    <Router>
      <div>
        {isLoading ? (
          <LoadingScreen onFinishLoading={handleFinishLoading} />
        ) : (
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />

            {/* Protected Routes */}
            <Route
              path="/choose-destination"
              element={<ProtectedRoute element={<ChooseDestination />} />}
            />
            <Route
              path="/notifications"
              element={<ProtectedRoute element={<Notifications />} />}
            />
            <Route
              path="/lost-dog"
              element={<ProtectedRoute element={<LostDog />} />}
            />
            <Route
              path="/lost-dog-profile"
              element={<ProtectedRoute element={<LostDogProfile />} />}
            />
            <Route
              path="/found-dog"
              element={<ProtectedRoute element={<FoundDog />} />}
            />
            <Route
              path="/found-dog-profile"
              element={<ProtectedRoute element={<FoundDogProfile />} />}
            />
            <Route
              path="/profile-user-edit"
              element={<ProtectedRoute element={<ProfileUserEdit />} />}
            />

            {/* Home page of lost and found dogs */}
            <Route
              path="/home-page-of-lost-dog"
              element={<ProtectedRoute element={<HomePageOfLostDogs />} />}
            />
            <Route
              path="/home-page-of-found-dog"
              element={<ProtectedRoute element={<HomePageOfFoundDogs />} />}
            />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
