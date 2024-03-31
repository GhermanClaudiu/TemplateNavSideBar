import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar">
        <div className="logo" onClick={() => navigate("/home")}>
          viziteMedicale
        </div>
        <div className="login" onClick={() => navigate("/login")}>
          LogIn
        </div>
      </div>
    </>
  );
}
export default Navbar;
