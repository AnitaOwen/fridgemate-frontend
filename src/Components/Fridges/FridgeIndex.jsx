import { useState, useEffect } from "react";
import Fridge from "./Fridge";
const URL = import.meta.env.VITE_BASE_URL;

const FridgeIndex = ({userId}) => {
    const [fridges, setFridges] = useState([]);

    useEffect(() => {
        fetch(`${URL}/api/fridges/${userId}`)
          .then((res) => res.json())
          .then((data) => setFridges(data))
          .catch((error) => console.error(error));
      }, []);
    

  return (
    <div>
        <h2>My Fridges</h2>
        {fridges.map((fridge) => (
            <Fridge key={fridge.id} fridge={fridge} />
        ))}
    </div>
  )
}

export default FridgeIndex