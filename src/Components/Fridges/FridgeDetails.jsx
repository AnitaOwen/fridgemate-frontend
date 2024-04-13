import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import ItemIndex from "../Items/ItemIndex";
const URL = import.meta.env.VITE_BASE_URL;

const FridgeDetails = ({ items, setItems }) => {
    const { user } = useOutletContext()
    const [fridge, setFridge] = useState({})
    const { fridge_id } = useParams();

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
    <div className="container">
        <Link to={"/fridges"}>Back to All Fridges</Link>
        <div className="row mt-4">
            <div className="col">
                {fridge && (
                    <section className="text-center">
                        <h2>{fridge.location}</h2>
                        <p>{fridge.notes}</p>
                        <h5>{items.length} total items</h5>
                        <Link to={`/fridges/${fridge_id}/items/new`}>
                            <button>Add an item to this fridge</button>
                        </Link>
                    </section>
                )}
            </div>
        </div>
        <div className="mt-4">
            <ItemIndex fridge_id={fridge_id} items={items} setItems={setItems} />
        </div>
    </div>
  )
}

export default FridgeDetails