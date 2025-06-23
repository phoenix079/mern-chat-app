import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import MainContainer from "./Components/MainContainer";
import LoginPage from "./Components/Login/LoginPage";
import Welcome from "./Components/ChatArea/Welcome";
import ChatArea from "./Components/ChatArea/ChatArea";

function App() {
  // If needed to redirect programmatically, use useNavigate hook
  // const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
