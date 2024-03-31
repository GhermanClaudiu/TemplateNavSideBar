import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="sidebar">
      {/* Conținutul Sidebar-ului */}
      <>
        <div className="side-nav-items">
          <ul>
            <li
              className={location.pathname === "/user" ? "active" : ""}
              onClick={() => navigate("/user")}
            >
              User
            </li>
            <li
              className={location.pathname === "/fabrica" ? "active" : ""}
              onClick={() => navigate("/fabrica")}
            >
              Fabrica
            </li>
            <li
              className={location.pathname === "/echipe" ? "active" : ""}
              onClick={() => navigate("/echipe")}
            >
              Echipe
            </li>
            <li
              className={location.pathname === "/supervisor" ? "active" : ""}
              onClick={() => navigate("/supervisor")}
            >
              Supervisor
            </li>
            <li
              className={location.pathname === "/angajati" ? "active" : ""}
              onClick={() => navigate("/angajati")}
            >
              Angajati
            </li>
          </ul>
        </div>
      </>
    </div>
  );
}
export default Sidebar;
