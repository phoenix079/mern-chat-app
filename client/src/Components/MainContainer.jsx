// client/src/Components/MainContainer.jsx
import "./MainContainer.css";
import Sidebar from "./Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";

// MainContainer MUST accept setUser as a prop to pass it down
function MainContainer({ setUser }) {
  return (
    <div className="main-container">
      {/* Sidebar MUST receive setUser */}
      <Sidebar setUser={setUser} />
      <Outlet />
    </div>
  );
}

export default MainContainer;
