import "./MainContainer.css";
import Sidebar from "./Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";

function MainContainer() {
  return (
    <div className="main-container">
      <Sidebar />
      <Outlet />{" "}
      {/*the Outlet component is used in a parent route component to render the matched child route's element */}
    </div>
  );
}

export default MainContainer;
