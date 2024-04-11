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
        const token = localStorage.getItem("token");
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
        // http://localhost:3003/api/fridges/1/2/items/13
        fetch(`${URL}/api/fridges/${user.id}/${fridge_id}/items/${item_id}`)
          .then((res) => res.json())
          .then((data) => setUpdatedItem(data.item))
          .catch((error) => console.error(error))
    }, [item_id, fridge_id]);

    // fetch categories
    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${URL}/api/fridges/${user.id}/${fridge_id}/items/categories`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              }
        })
          .then((res) => res.json())
          .then((data) => setCategories(data))
    }, [user.id, fridge_id]);

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
                id="name"
                value={updatedItem.name}
                type="text"
                onChange={handleTextChange}
                placeholder="Name of the item"
                required
            />
            <label htmlFor="expiration_date">Expiration date:</label>
            <input
                id="expiration_date"
                type="date"
                value={formatDate(updatedItem.expiration_date)}
                onChange={handleTextChange}
            />
            <label htmlFor="amount_paid">Amount paid: $</label>
            <input
                id="amount_paid"
                type="number"
                value={updatedItem.amount_paid}
                onChange={handleTextChange}
            />
            <label htmlFor="category">Category:</label>
            <select id="category" value={updatedItem.category} onChange={handleTextChange}>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <br />
            <input type="submit" />
        </form>  
    </div>
  )
}

export default ItemEditForm