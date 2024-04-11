import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Fridge from "./Fridge";
const URL = import.meta.env.VITE_BASE_URL;

const FridgeIndex = ({userId}) => {
    const [fridges, setFridges] = useState([])
    const navigate = useNavigate()

    const handleDeleteFridge = (fridgeId) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this fridge and all items in it?")
      if(confirmDelete){
        const token = localStorage.getItem("token")
        fetch(`${URL}/api/fridges/${fridgeId}`, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => { 
          const copyFridgeArray = [...fridges]
          const filteredFridges = copyFridgeArray.filter((fridge) => fridge.id !== fridgeId)
          setFridges(filteredFridges)
        })
        .catch((error) => console.error(error))
      }
    }

    useEffect(() => {
        fetch(`${URL}/api/fridges/${userId}`)
          .then((res) => res.json())
          .then((data) => setFridges(data))
          .catch((error) => console.error(error));
      }, []);

  return (
    <div>
        <h2>My Fridges</h2>
        <Link to={`/fridges/new`}>Add new fridge</Link>
        {fridges.map((fridge) => (
            <Fridge key={fridge.id} fridge={fridge} handleDeleteFridge={handleDeleteFridge}/>
        ))}
    </div>
  )
}

export default FridgeIndex