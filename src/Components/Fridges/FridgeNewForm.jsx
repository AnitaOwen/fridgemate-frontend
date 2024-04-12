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
    <div className="mt-5 center container-sm">
      <h4 className="mb-5">Add a new fridge</h4>
      <form onSubmit={handleSubmit} className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="location" className="form-label">Name / Location:</label>
            <input
            className="form-control"
              id="location"
              value={newFridge.location}
              type="text"
              onChange={handleTextChange}
              placeholder="Enter fridge name or location here"
              required
            />
          </div>
          <div>
            <label htmlFor="notes" className="form-label">Notes / Comments:</label>
            <textarea 
            className="form-control"
            rows="3" cols="20"
              id="notes"
              type="text"
              value={newFridge.notes}
              onChange={handleTextChange}
              placeholder="Enter notes or comments about the fridge here"
            />
          </div>
        </div>
        <div>
          <button 
          type="submit" 
          className="btn btn-info btn-sm mb-3 mt-4">
            Submit</button>
        </div>
        <div>
          <Link to={`/dashboard`} 
          className="btn btn-secondary btn-sm"
          >Cancel</Link>

        </div>
      </form>
    </div>
  )
}

export default FridgeNewForm