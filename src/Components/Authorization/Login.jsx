
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
const URL = import.meta.env.VITE_BASE_URL;

console.log(`URL`, URL)
const Login = ({setUserInfo}) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();


  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }
  // This function is being used in two places. It can be extracted to a helpers.js file

  async function postFetch(user) {
    console.log(`cookie: `,document.cookie)
    const csrfToken = document.cookie.split("; ").find((row) => row.startsWith("XSRF-TOKEN=")).split("=")[1]; // Extract CSRF token from cookies
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": csrfToken, // Include CSRF token in request headers
      },
      credentials: "include", // Important: Include cookies in the request
      body: JSON.stringify(user),
    };
    
    
    try {
      const res = await fetch(`${URL}/api/auth/login`, options);
      const data = await res.json()
      setUserInfo(data)
      // console.log(data)
      
      if (!res.ok) {
        alert("Login failed");
        setUser({ username: "", password: "" });
        throw new Error("Registration failed");
      } 

      navigate("/dashboard");
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

  // useEffect(() => {
  //   fetch(`${URL}/api/users/${user.username}`)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data))
  //   // const userId = data.id
  //   .catch((error) => 'Error fetching user id')
  // }, [user])

  // BUILD OUT YOUR FORM PROPERLY WITH LABELS AND WHATEVER CSS FRAMEWORK YOU MAY USE OR VANILLA CSS. THIS IS JUST A BOILERPLATE

  return (
    <div>
      <h2>Use the DemoUser button to login and save time during demo</h2>
      <h3> Remove the 'br' tags and these instructions if you use this code</h3>
      <button onClick={handleDemoSignIn}>Demo User</button>
      <br />
      <br />
      <br />
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <input
            id="username"
            value={user.username}
            type="text"
            placeholder="username"
            autoComplete="username"
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="password">
          <input
            id="password"
            value={user.password}
            type="password"
            placeholder="password"
            onChange={handleChange}
            autoComplete="current-password"
          />
        </label>
        <br />
        <button>Submit</button>
      </form>
      <p>
        No Account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
