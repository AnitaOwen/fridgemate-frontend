import { Link } from "react-router-dom";
import Login from "./Login";
function LandingPage({ toggleLogin }) {
  return (
    <div style={{ textAlign: "center", marginTop: 75 }}>
      <h1>Welcome!</h1>
      <img src="https://res.cloudinary.com/dveesfude/image/upload/v1712932028/giphy.webp_aujbo2.webp" alt="dancing fridge gif" />

      {toggleLogin ? (
        <>
        <h4>You are already logged in!</h4>
        <Link to="/dashboard">Go to My Fridges</Link>
        </>
      ) : (
        <>
        <h4>Please  <Link to="/login">login</Link> or <Link to="/login">register</Link> to continue.</h4>
        </>
      )}
    </div>
  );
}

export default LandingPage;
