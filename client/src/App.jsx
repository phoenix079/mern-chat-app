import "./App.css";
import React,{useEffect,useState}from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MainContainer from "./Components/MainContainer";
import LoginPage from "./Components/Login/LoginPage";
import Welcome from "./Components/ChatArea/Welcome";
import ChatArea from "./Components/ChatArea/ChatArea";

function App() {
  // If needed to redirect programmatically, use useNavigate hook
  // const navigate = useNavigate();



  
  // --- DEVELOPMENT MODE FLAG ---
  // Set to `true` to bypass login and access /app routes directly for development.
  // Set to `false` (or remove) for production/actual authentication flow.
  const isDevMode = true; // <--- Set this to false for production!
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();
  // --- END DEVELOPMENT MODE FLAG ---

  useEffect(() => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        setUser(userInfo);
      } else if (isDevMode) {
        // If no user in localStorage and in development mode,
        // create a mock user for easy access to /app routes.
        console.log("DEV MODE: No user found, creating mock user.");
        setUser({ name: "Dev User", email: "dev@example.com", _id: "dev123" });
      }
    } catch (error) {
      console.error("Failed to parse user info from localStorage:", error);
      localStorage.removeItem("userInfo"); // Clear corrupted data
    } finally {
      setLoadingAuth(false);
    }
  }, []); // Runs once on mount

  useEffect(() => {
    if (!loadingAuth) {
      if (user) {
        // User is logged in (real or mock)
        if (window.location.pathname === "/") {
          navigate("/app/welcome"); // Redirect from login page to app
        }
      } else {
        // User is NOT logged in (and not in dev mode, or dev mode didn't create a mock user)
        if (window.location.pathname.startsWith("/app")) {
          navigate("/"); // Redirect from protected app route to login
        }
      }
    }
  }, [user, loadingAuth, navigate]);

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
        <Route path="/" element={user ? <MainContainer /> : <LoginPage />} />
        <Route path="app" element={<MainContainer />}>
          <Route index element={<Welcome />} /> {/*might be redundant*/}
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
