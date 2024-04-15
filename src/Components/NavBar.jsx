import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const URL = import.meta.env.VITE_BASE_URL;

const NavBar = ({ toggleLogin, handleLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!toggleLogin) setUser(null);

    if (toggleLogin) {
      const token = localStorage.getItem("token");
      if (token) {
        fetch(`${URL}/api/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data.user);
          })
          .catch((error) => console.error("Error fetching user:", error));
      }
    }
  }, [toggleLogin]);

  return (
    <nav className="navbar navbar-expand-lg bg-info">
      <div className="container-md">
      <a className="navbar-brand" href="/"><h1 className="logo">FridgeM8</h1></a>
        {!toggleLogin ? (
          <Link to={"/login"} className="navbar-text">
            <h4>Login</h4>
          </Link>
        ) : (
          <h4 className="navbar-text">
            {user && <span>Hello, {user.username.toUpperCase()} | </span>}
            <Link onClick={handleLogout}>
              <span>Logout</span>
            </Link>
          </h4>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
