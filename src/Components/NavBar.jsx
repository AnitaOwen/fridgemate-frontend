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
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
      <a className="navbar-brand" href="/">FridgeM8</a>
        {!toggleLogin ? (
          <Link to={"/login"}>
            <span>Login</span>
          </Link>
        ) : (
          <div>
            {user && <span>Hello, {user.username.toUpperCase()} | </span>}
            <Link onClick={handleLogout}>
              <span>Logout</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
