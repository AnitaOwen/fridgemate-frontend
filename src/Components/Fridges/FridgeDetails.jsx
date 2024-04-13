import { useState, useEffect } from "react";
import { useParams, Link} from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import ItemIndex from "../Items/ItemIndex";
const URL = import.meta.env.VITE_BASE_URL;

const FridgeDetails = ({ items, setItems }) => {
    const { user } = useOutletContext()
    const [fridge, setFridge] = useState({})
    const { fridge_id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${URL}/api/fridges/${user.id}/${fridge_id}`,{
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
        <div className="mt-3">
            <Link to={"/fridges"}> ⬅ Back to All Fridges</Link>
        </div>
        <div className="mt- card mb-3">
            <div className="card-body">
                {fridge && (
                    <section className="text-center">
                        <h2 className="card-title">{fridge.location}</h2>
                        <p className="card-text">{fridge.notes}</p>
                        <h5>{items.length} {items.length === 1 ? " total item" : "total items"}</h5>
                        <Link to={`/fridges/${fridge_id}/items/new`}>
                            <button className="btn btn-info btn-sm">Add an item</button>
                        </Link>
                    </section>
                )}
            </div>
        </div>
        <ItemIndex fridge_id={fridge_id} items={items} setItems={setItems} />
    </div>
  )
}

export default FridgeDetails