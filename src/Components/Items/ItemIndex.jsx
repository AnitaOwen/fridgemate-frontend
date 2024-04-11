import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Item from "./Item";
const URL = import.meta.env.VITE_BASE_URL;
const ItemIndex = ({ fridge_id, items, setItems }) => {
    const { user } = useOutletContext()
    // console.log(user.id)

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${URL}/api/fridges/${user.id}/${fridge_id}/items`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              }
        })
        .then((res) => res.json())
          .then((data) => setItems(data.items));
    }, [fridge_id])
  return (
    <div>
        {items.length === 0 ? (
            <>
                <p>This fridge is empty! </p>
                <Link to={`/fridges/${fridge_id}/new`}>
                    <p>Add an item to this fridge.</p>
                </Link> 
            </>      
        ) : (
            <>
            {items.map((item) => (
                <Item key={item.id} item={item} />
            ))}
            </>
        )}
    </div>
  )
}

export default ItemIndex