import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { redirectLogin, basicLogin } from "../services/api.js";
import { useState, useEffect } from "react";

function NavBar() {
  const [userData, setUserData] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        let user_id = urlParams.get("user_id");

        // Si viene en la URL, guárdalo en cookie
        if (user_id) {
          document.cookie = `user_id=${user_id}; path=/; max-age=3600; SameSite=Lax`;
          setUserId(user_id);

          // Limpiar la URL sin recargar la página
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
        } else {
          // Si no está en la URL, busca en cookies
          user_id = document.cookie
            .split("; ")
            .find((row) => row.startsWith("user_id="))
            ?.split("=")[1];

          setUserId(user_id);
        }

        if (user_id) {
          const user = await basicLogin(user_id);
          setUserData(user);
        } else {
          console.log("No hay user_id disponible");
        }
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
          <Link to="/profile" className="nav-link">
            <img className="user-icon" src={userData.images[1].url} alt="" />
            <p className="user-name">{userData.display_name}</p>
          </Link>
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
