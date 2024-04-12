import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const Login = ({ setToggleLogin }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }
  // This function is being used in two places. It can be extracted to a helpers.js file

  async function postFetch(user) {
    console.log("URL:", URL);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(`${URL}/api/auth/login`, options);
      const data = await res.json();

      if (!res.ok) {
        alert("Login failed");
        setUser({ username: "", password: "" });
        throw new Error("Registration failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        await setToggleLogin(true);
        navigate("/dashboard");
      } else {
        console.log("JWT Login Failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  // Login Function
  async function handleSubmit(e) {
    e.preventDefault();
    if (!user.username || !user.password) {
      alert("You must enter a username and password");
      return;
    }
    postFetch(user);
  }

  //Demo User Login Function
  async function handleDemoSignIn(e) {
    e.preventDefault();
    const user = { username: "demo", password: "password" };
    postFetch(user);
  }

  return (
    <div className="mt-5 container-sm text-center">
      <h2 className="mt-4 mb-4">Welcome!</h2>
      <button onClick={handleDemoSignIn} className="btn btn-dark btn-sm mb-4">Demo User</button>
      <h4 className="mt-4">Login</h4>
      <form onSubmit={handleSubmit} className="row justify-content-center">
        <div className="col-md-6">
          <div>
            {/* <label htmlFor="username" className="form-label">
            </label> */}
            <input
              className="form-control text-center"
              id="username"
              value={user.username}
              type="text"
              placeholder="username"
              autoComplete="username"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 mt-3">
            {/* <label htmlFor="password" className="form-label" >
            </label> */}
            <input
            className="form-control text-center"
              id="password"
              type="password"
              placeholder="password"
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>
        </div>
        <div>
          <button className="btn btn-info btn-sm mb-4">Submit</button>

        </div>
        
      </form>
      <h5>
        No Account? <Link to="/register">Register</Link>
      </h5>
    </div>
  );
};

export default Login;
