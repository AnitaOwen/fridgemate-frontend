import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import ItemIndex from "../Items/ItemIndex";
const URL = import.meta.env.VITE_BASE_URL;

const FridgeDetails = ({ items, setItems }) => {
    const { user } = useOutletContext()
    const [fridge, setFridge] = useState({})
    const { fridge_id } = useParams();
    // console.log(user.id)

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${URL}/api/fridges/${user.id}/${fridge_id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              }
        })
          .then((res) => res.json())
          .then((data) => setFridge(data));
      }, [fridge_id]);

  return (
    <div>
        {fridge && (
            <section>
                <h3>{fridge.location}</h3>
                <p>{fridge.notes}</p>
            </section>
        )}

        <ItemIndex items={items} setItems={setItems} />
    </div>
  )
}

export default FridgeDetails