import { Link } from "react-router-dom";
import Login from "./Login";
function LandingPage({ toggleLogin }) {
  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>Welcome!</h1>

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
