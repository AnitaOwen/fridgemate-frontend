import { Link } from "react-router-dom";

function LandingPage({ toggleLogin }) {
  return (
    <div className="mt-4 text-center">
      <h1 className="mb-4">Welcome!</h1>
      <h5>Manage fridge freshness, track expiration dates, and minimize food waste.</h5>
      <h5 className="mb-4">Simplify your kitchen routine today!</h5>
      <img src="https://res.cloudinary.com/dveesfude/image/upload/c_scale,w_154/v1712932028/giphy.webp_aujbo2.webp" alt="dancing fridge gif"/>
      {toggleLogin ? (
        <>
        <h4 className="mt-4">You are already logged in!</h4>
        <Link to="/fridges">Go to My Fridges</Link>
        </>
      ) : (
        <h3 className="mt-4">Please  <Link to="/login">login</Link> or <Link to="/register">register</Link> to continue.</h3>
      )}
    </div>
  );
}

export default LandingPage;
