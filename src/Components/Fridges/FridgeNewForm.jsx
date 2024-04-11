import { useState } from "react";
import { useNavigate, Link, useParams, useOutletContext } from "react-router-dom";
const URL = import.meta.env.VITE_BASE_URL;

const FridgeNewForm = () => {
    const navigate = useNavigate()
    const { user } = useOutletContext()

    const [newFridge, setNewFridge] = useState({
        location: "",
        notes: "",
        user_id: user.id
      })

    const handleTextChange = (event) => {
        setNewFridge({ ...newFridge, [event.target.id]: event.target.value });
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        fetch(`${URL}/api/fridges/${user.id}`, {
            method: "POST",
            body: JSON.stringify(newFridge),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
          })
            .then(() => navigate(`/dashboard`))
            .catch((error) => console.error("Failed to create new fridge.", error));
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          value={newFridge.location}
          type="text"
          onChange={handleTextChange}
          placeholder="Name or location"
          required
        />
        <label htmlFor="notes">Notes:</label>
        <textarea rows="3" cols="30"
          id="notes"
          type="text"
          placeholder="Enter notes here"
          value={newFridge.notes}
          onChange={handleTextChange}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  )
}

export default FridgeNewForm