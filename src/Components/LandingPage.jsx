import { Link } from "react-router-dom";
import Login from "./Login";
function LandingPage({ toggleLogin }) {
  return (
    <div className="mt-5" style={{ textAlign: "center"}}>
      <h1 className="mb-4">Welcome!</h1>
      <img src="https://res.cloudinary.com/dveesfude/image/upload/v1712932028/giphy.webp_aujbo2.webp" alt="dancing fridge gif" />

      {toggleLogin ? (
        <>
        <h4>You are already logged in!</h4>
        <Link to="/fridges">Go to My Fridges</Link>
        </>
      ) : (
        <h3 className="mt-4">Please  <Link to="/login">login</Link> or <Link to="/register">register</Link> to continue.</h3>
      )}
    </div>
  );
}

export default LandingPage;
