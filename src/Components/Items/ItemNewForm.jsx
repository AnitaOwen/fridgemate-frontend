import { useState } from "react";
import { useNavigate, Link, useParams, useOutletContext } from "react-router-dom";
const URL = import.meta.env.VITE_BASE_URL;

const ItemNewForm = () => {
    const navigate = useNavigate()
    const { user } = useOutletContext()
    const { fridge_id } = useParams()

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


  return (
    <div>
        
    </div>
  )
}

export default ItemNewForm