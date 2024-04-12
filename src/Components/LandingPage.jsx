import { Link } from "react-router-dom";
import Login from "./Login";
function LandingPage({ toggleLogin }) {
  return (
    <div style={{ textAlign: "center", marginTop: 75 }}>
      <h1>Welcome!</h1>
      <img src="https://media4.giphy.com/media/XGj4Pywe7dkPpXE9SI/giphy.webp?cid=ecf05e47owjf47kjwol2ee7a4z55sbvqg04gj9dc9oki5ndh&ep=v1_gifs_related&rid=giphy.webp&ct=s" alt="" />

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
