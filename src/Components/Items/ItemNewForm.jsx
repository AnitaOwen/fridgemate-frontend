import { useState, useEffect } from "react";
import { useNavigate, Link, useParams, useOutletContext } from "react-router-dom";
const URL = import.meta.env.VITE_BASE_URL;

const ItemNewForm = () => {
    const navigate = useNavigate()
    const { user } = useOutletContext()
    const { fridge_id } = useParams()
    const [categories, setCategories] = useState([])
    const [newItem, setNewItem] = useState({
        name: "",
        expiration_date: "",
        amount_paid: "",
        category: ""
      })

    

    const handleTextChange = (event) => {
        setNewItem({ ...newItem, [event.target.id]: event.target.value });
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        // http://localhost:3003/api/fridges/1/2/items
        fetch(`${URL}/api/fridges/${user.id}/${fridge_id}/items`, {
            method: "POST",
            body: JSON.stringify(newItem),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
          })
            .then(() => navigate(`/fridges/${fridge_id}`))
            .catch((error) => console.error("Failed to create new item.", error));
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${URL}/api/fridges/${user.id}/${fridge_id}/items/categories/all`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              }
        })
          .then((res) => res.json())
          .then((data) => setCategories(data))
          .catch((error) => console.error("Failed to set categories.", error))
    }, [user.id, fridge_id]);

  return (
    <div className="mt-5 center container-sm">
        <h4 className="mb-5">Add a new item</h4>
        <form onSubmit={handleSubmit} className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Item name</label>
                    <input
                    className="form-control"
                        id="name"
                        value={newItem.name}
                        type="text"
                        onChange={handleTextChange}
                        placeholder="Name of the item"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="expiration_date" className="form-label">Expiration date</label>
                    <input
                    className="form-control"
                        id="expiration_date"
                        type="date"
                        value={newItem.expiration_date}
                        onChange={handleTextChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount_paid" className="form-label">Amount paid (in dollars) </label>
                    <input
                    className="form-control"
                        id="amount_paid"
                        type="number"
                        value={newItem.amount_paid}
                        onChange={handleTextChange}
                        placeholder="0.00"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select id="category" value={newItem.category} onChange={handleTextChange} className="form-control">
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <button 
                type="submit" 
                className="btn btn-info btn-sm mb-3">Submit</button>
            </div>
            <div>
                <Link to={`/dashboard`} className="btn btn-secondary btn-sm">Cancel</Link>
            </div>
        </form>
    </div>
  )
}

export default ItemNewForm