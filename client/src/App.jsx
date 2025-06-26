// App.jsx
import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MainContainer from "./Components/MainContainer";
import LoginPage from "./Components/Login/LoginPage";
import Welcome from "./Components/ChatArea/Welcome";
import ChatArea from "./Components/ChatArea/ChatArea";

function App() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();

  // Effect to initialize user state from localStorage on component mount
  useEffect(() => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        setUser(userInfo); // Set user state if user info is found
      }
    } catch (error) {
      console.error("Failed to parse user info from localStorage:", error);
      localStorage.removeItem("userInfo"); // Clear corrupted data
      setUser(null); // Ensure user state is null
    } finally {
      setLoadingAuth(false); // Authentication check is complete
    }
  }, []); // Runs once on mount

  // Effect to handle redirection based on authentication state
  useEffect(() => {
    if (!loadingAuth) {
      // Only run navigation logic after initial auth check
      if (user) {
        // User is logged in
        // If current path is '/', redirect to '/app/welcome'
        if (window.location.pathname === "/") {
          navigate("/app/welcome");
        }
      } else {
        // User is NOT logged in
        // If current path starts with '/app', redirect to '/' (login page)
        if (window.location.pathname.startsWith("/app")) {
          navigate("/");
        }
      }
    }
  }, [user, loadingAuth, navigate]); // Reruns when user, loadingAuth, or navigate changes

  if (loadingAuth) {
    return (
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.5em",
        }}
      >
        Loading Application...
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        {/*
          IMPORTANT: Pass setUser to both LoginPage and MainContainer.
          If user is truthy, render MainContainer. Otherwise, LoginPage.
          setUser must be available to update the top-level user state.
        */}
        <Route
          path="/"
          element={
            user ? (
              <MainContainer setUser={setUser} />
            ) : (
              <LoginPage setUser={setUser} />
            )
          }
        />
        {/*
          For nested routes under /app, MainContainer is always rendered.
          It *must* also receive setUser so it can pass it further down to Sidebar.
        */}
        <Route path="app" element={<MainContainer setUser={setUser} />}>
          <Route index element={<Welcome />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="chat" element={<ChatArea />} />
          <Route path="*" element={<div>404 - Not Found (inside app)</div>} />
        </Route>
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
