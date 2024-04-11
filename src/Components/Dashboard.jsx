import { useOutletContext } from "react-router-dom";
import FridgeIndex from "./Fridges/FridgeIndex";

const Dashboard = ({ handleLogout }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context

  return (
    <div>
      {/* {user && (
        <h1>
          Welcome, {user.username[0].toUpperCase()}
          {user.username.slice(1).toLowerCase()}
        </h1>
      )}
      <button onClick={handleLogout}>Logout</button> */}
      <FridgeIndex userId={user.id}/>
    </div>
  );
};

export default Dashboard;
