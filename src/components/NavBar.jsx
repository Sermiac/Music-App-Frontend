import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { redirectLogin, basicLogin } from "../services/api.js";
import { useState, useEffect } from "react";

function NavBar() {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        const user = await basicLogin();
        setUserData(user);
      } catch (err) {
        console.log("ERROR: ", err);
      }
    }
    getUser();
  }, []);

  async function Login() {
    redirectLogin();
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Music App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
        {userData ? (
          <img className="user-icon" src={userData} alt="" />
        ) : (
          <button onClick={Login} className="nav-link">
            login
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
