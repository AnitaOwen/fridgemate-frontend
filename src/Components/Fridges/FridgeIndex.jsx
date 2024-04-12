import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import Fridge from "./Fridge";
const URL = import.meta.env.VITE_BASE_URL;

const FridgeIndex = () => {
  const { user } = useOutletContext()
  const [fridges, setFridges] = useState([])

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
    fetch(`${URL}/api/fridges/${user.id}`)
      .then((res) => res.json())
      .then((data) => setFridges(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="mt-5 container">
        <h2 className="text-center mb-2">All Fridges</h2>
        <div className="mb-5 text-center">
            <Link to={`/fridges/new`}>
              <button 
              className="btn btn-info" 
              type="button">
                Add a new fridge
              </button>
            </Link>
        </div>        
        <div className="row justify-content-center text-center">
          {fridges.map((fridge) => (
            <div key={fridge.id} className="col-md-6 mb-4">
              <Fridge
              fridge={fridge} 
              handleDeleteFridge={handleDeleteFridge}/>
            </div>
          ))}
        </div>
    </div>
  )
}

export default FridgeIndex