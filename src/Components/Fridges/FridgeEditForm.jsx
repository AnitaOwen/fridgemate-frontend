import { useState, useEffect } from "react";
import { useNavigate, Link, useParams, useOutletContext } from "react-router-dom";
const URL = import.meta.env.VITE_BASE_URL;

const FridgeEditForm = () => {
    const navigate = useNavigate()
    const { user } = useOutletContext()
    let { fridge_id } = useParams();

    const [updatedFridge, setUpdatedFridge] = useState({
        location: "",
        notes: "",
        user_id: user.id
    })

    const handleTextChange = (event) => {
        setUpdatedFridge({ ...updatedFridge, [event.target.id]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        fetch(`${URL}/api/fridges/${user.id}/${fridge_id}`, {
            method: "PUT",
            body: JSON.stringify(updatedFridge),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
          })
            .then(() => navigate(`/dashboard`))
            .catch((error) => console.error("Failed to update fridge", error));
    }

    useEffect(() => {
        fetch(`${URL}/api/fridges/${user.id}/${fridge_id}`)
          .then((res) => res.json())
          .then((data) => setUpdatedFridge(data))
          .catch((error) => console.error(error))
      }, [fridge_id]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          value={updatedFridge.location}
          type="text"
          onChange={handleTextChange}
          placeholder="Name or location"
          required
        />
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          type="text"
          placeholder="Enter notes here"
          value={updatedFridge.notes}
          onChange={handleTextChange}
          rows={4}
          cols={50}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  )
}

export default FridgeEditForm