import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import NavBar from "./Components/NavBar";
import LandingPage from "./Components/LandingPage";
import Show from "./Pages/Show";
import AddFridge from "./Pages/AddFridge";
import UpdateFridge from "./Pages/UpdateFridge";
import Index from "./Pages/Index";

function App() {
  const navigate = useNavigate();
  const [toggleLogin, setToggleLogin] = useState(false);
  const [items, setItems] = useState([]);

  async function handleLogout() {
    localStorage.removeItem("token");

    await setToggleLogin(false);

    navigate("/login");
  }

  return (
    <>
      <NavBar
        handleLogout={handleLogout}
        toggleLogin={toggleLogin}
        setToggleLogin={setToggleLogin}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={<Login setToggleLogin={setToggleLogin} />}
        />
        <Route
          path="/register"
          element={<Register setToggleLogin={setToggleLogin} />}
        />

        <Route element={<ProtectedRoute />}>
          {/* Place protected routes here */}
          <Route
            path="/dashboard"
            element={<Index handleLogout={handleLogout} />}
          />
          <Route
            path="/fridges/:fridge_id"
            element={<Show items={items} setItems={setItems}/>}
          />
          <Route
            path="/fridges/new"
            element={<AddFridge />}
          />
          <Route
            path="/fridges/:fridge_id/edit"
            element={<UpdateFridge />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
