import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const Register = ({ setToggleLogin }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "", email: "" });

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(`${URL}/api/auth/register`, options);

      if (!res.ok) throw new Error("Registration failed");
      const data = await res.json();

      if (data.token) {
        // in case there is an old token in the browser, remove it
        localStorage.removeItem("token");
        // set the new user's JWT token in the browser
        localStorage.setItem("token", data.token);
        await setToggleLogin(true);
        navigate("/fridges");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  return (
    <div className="mt-5 text-center container-sm">
      <p className="mb-4">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <h4 className="mb-2 mt-5">Register</h4>
      <form onSubmit={handleSubmit} className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-3">
            {/* <label htmlFor="username" className="form-label">
            </label> */}
            <input
            className="form-control text-center"
              id="username"
              value={user.username}
              type="text"
              placeholder="username"
              onChange={handleChange}
              autoComplete="username"
            />
          </div>
          <div className="mb-3">
            {/* <label htmlFor="email" className="form-label">
            </label> */}
            <input
            className="form-control text-center"
              id="email"
              value={user.email}
              type="email"
              placeholder="email"
              onChange={handleChange}
              autoComplete="email"
            />
          </div>
          <div className="mb-3">
            {/* <label htmlFor="password" className="form-label">
            </label> */}
            <input
            className="form-control text-center"
              id="password"
              value={user.password}
              type="password"
              placeholder="password"
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>
        </div>
        <div>
          <button className="btn btn-info btn-sm">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
