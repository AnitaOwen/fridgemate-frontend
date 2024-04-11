import { useState, useEffect } from "react";
import { useNavigate, Link, useParams, useOutletContext } from "react-router-dom";
const URL = import.meta.env.VITE_BASE_URL;

const ItemEditForm = () => {
    const navigate = useNavigate()
    const { user } = useOutletContext()
    const { fridge_id, item_id } = useParams()
    const [updatedItem, setUpdatedItem] = useState({
        name: "",
        expiration_date: "",
        amount_paid: 0,
        category: ""
    })
    
 
    useEffect(() => {
        // http://localhost:3003/api/fridges/1/2/items/13
        fetch(`${URL}/api/fridges/${user.id}/${fridge_id}/items/${item_id}`)
          .then((res) => res.json())
          .then((data) => setUpdatedItem(data.item))
          .catch((error) => console.error(error))
    }, [item_id, fridge_id]);

  return (
    <div>
        
    </div>
  )
}

export default ItemEditForm