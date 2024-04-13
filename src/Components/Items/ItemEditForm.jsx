import { useState, useEffect } from "react";
import { useNavigate, Link, useParams, useOutletContext } from "react-router-dom";
const URL = import.meta.env.VITE_BASE_URL;

const ItemEditForm = () => {
    const navigate = useNavigate()
    const { user } = useOutletContext()
    const { fridge_id, item_id } = useParams()
    const [categories, setCategories] = useState([])
    const [updatedItem, setUpdatedItem] = useState({
        name: "",
        expiration_date: "",
        amount_paid: "",
        category: ""
    })

    const formatDate = (dateString) => {
        const dateStringParts = dateString.split("T")
        return dateStringParts[0]
    }
    
    const handleTextChange = (event) => {
        setUpdatedItem({ ...updatedItem, [event.target.id]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token")
        // http://localhost:3003/api/fridges/1/2/items/13
        fetch(`${URL}/api/fridges/${user.id}/${fridge_id}/items/${item_id}`, {
            method: "PUT",
            body: JSON.stringify(updatedItem),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
          })
            .then(() => navigate(`/fridges/${fridge_id}`))
            .catch((error) => console.error("Failed to update item.", error));
    }

    // fetch single item details.
    useEffect(() => {
        const token = localStorage.getItem("token")
        // http://localhost:3003/api/fridges/1/2/items/13
        fetch(`${URL}/api/fridges/${user.id}/${fridge_id}/items/${item_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
          .then((res) => res.json())
          .then((data) => setUpdatedItem(data.item))
          .catch((error) => console.error(error))
    }, [item_id, fridge_id]);

    // fetch categories
    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${URL}/api/fridges/${user.id}/${fridge_id}/items/categories/all`,{
            headers: {
                Authorization: `Bearer ${token}`,
              }
        })
          .then((res) => res.json())
          .then((data) => setCategories(data))
    }, [user.id, fridge_id]);

  return (
    <div className="mt-5 text-center container-sm">
        <h4 className="mb-5">Update item details</h4>
        <form onSubmit={handleSubmit} className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Item name</label>
                <input
                className="form-control"
                    id="name"
                    value={updatedItem.name}
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
                    value={formatDate(updatedItem.expiration_date)}
                    onChange={handleTextChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="amount_paid" className="form-label">Amount paid (in dollars)</label>
                <input
                className="form-control"
                    id="amount_paid"
                    type="number"
                    value={updatedItem.amount_paid}
                    onChange={handleTextChange}
                    required
                />
            </div>
            <div className="mb-5">
                <label htmlFor="category" className="form-label">Category</label>
                <select id="category" value={updatedItem.category} onChange={handleTextChange} className="form-control" required>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
        </div>
        <div>
            <button type="submit" className="btn btn-info btn-sm mb-3">Submit</button>
        </div>
        <div>
            <Link to={`/fridges/${fridge_id}`} className="btn btn-secondary btn-sm">Cancel</Link>
        </div>
        </form>  
    </div>
  )
}

export default ItemEditForm