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
    <div className="mt-5 text-center container-sm">
      <h4 className="mb-5">Update fridge details</h4>
      <form onSubmit={handleSubmit} className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="mb-3">
            <label htmlFor="location" className="form-label">Name / Location:</label>
            <input
            className="form-control"
              id="location"
              value={updatedFridge.location}
              type="text"
              onChange={handleTextChange}
              placeholder="Name or location"
              required
            />
          </div>
          <div>
            <label htmlFor="notes" className="form-label">Notes / Comments:</label>
            <textarea
            className="form-control"
              id="notes"
              type="text"
              placeholder="Enter notes here"
              value={updatedFridge.notes}
              onChange={handleTextChange}
              rows="3" cols="20"
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

export default FridgeEditForm