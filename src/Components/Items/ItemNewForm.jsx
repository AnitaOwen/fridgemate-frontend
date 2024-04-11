import { useState } from "react";
import { useNavigate, Link, useParams, useOutletContext } from "react-router-dom";
const URL = import.meta.env.VITE_BASE_URL;

const ItemNewForm = () => {
    const navigate = useNavigate()
    const { user } = useOutletContext()

    const [newItem, setNewItem] = useState({
        name: "",
        expiration_date: "",
        amount_paid: "",
        category: ""
      })

      
  return (
    <div>
        
    </div>
  )
}

export default ItemNewForm