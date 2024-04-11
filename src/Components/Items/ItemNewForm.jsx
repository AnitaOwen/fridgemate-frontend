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
        amount_paid: 0,
        category: ""
      })

    const amountPaidInCents = newItem.amount_paid * 100

    const handleTextChange = (event) => {
        setNewItem({ ...newItem, [event.target.id]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(newItem.expiration_date)
        // 2024-04-11
        // console.log(categories)
        // ['Beverage', 'Condiment', 'Dairy', 'Fruit', 'Meat', 'Other', 'Seafood']
        const token = localStorage.getItem("token");
        // http://localhost:3003/api/fridges/1/2/items
        fetch(`${URL}/api/fridges/${user.id}/${fridge_id}/items`, {
            method: "POST",
            body: JSON.stringify({...newItem, amount_paid: amountPaidInCents}),
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
                value={newItem.name}
                type="text"
                onChange={handleTextChange}
                placeholder="Name of the item"
                required
            />
            <label htmlFor="expiration_date">Expiration date:</label>
            <input
                id="expiration_date"
                type="date"
                value={newItem.expiration_date}
                onChange={handleTextChange}
            />
            <label htmlFor="amount_paid">Amount paid: $</label>
            <input
                id="amount_paid"
                type="number"
                value={newItem.amount_paid}
                onChange={handleTextChange}
                step="0.01" // Allow decimal values
            />
            <label htmlFor="category">Category:</label>
            <select id="category" value={newItem.category} onChange={handleTextChange}>
                <option value="">Select a category</option>
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

export default ItemNewForm