import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import Login from "./Components/Login";
import NavBar from "./Components/NavBar";
import Show from "./Pages/Show";
import AddFridge from "./Pages/AddFridge";
import UpdateFridge from "./Pages/UpdateFridge";
import Index from "./Pages/Index";
import AddItem from "./Pages/AddItem";
import UpdateItem from "./Pages/UpdateItem";
import Home from "./Pages/Home";

function App() {
  const navigate = useNavigate();
  const [toggleLogin, setToggleLogin] = useState(false);
  const [items, setItems] = useState([]);

  async function handleLogout() {
    localStorage.removeItem("token");

    await setToggleLogin(false);

    navigate("/");
  }

  return (
    <>
      <NavBar
        handleLogout={handleLogout}
        toggleLogin={toggleLogin}
        setToggleLogin={setToggleLogin}
      />

      <Routes>
        <Route path="/" element={<Home toggleLogin={toggleLogin}/>} />
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
            path="/fridges"
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
          <Route
            path="/fridges/:fridge_id/items/new"
            element={<AddItem />}
          />
          <Route
            path="/fridges/:fridge_id/items/:item_id/edit"
            element={<UpdateItem />}
          />
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
