import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Item from "./Item";
const URL = import.meta.env.VITE_BASE_URL;
const ItemIndex = ({ fridge_id, items, setItems }) => {
    const { user } = useOutletContext()

    const formatDate = (item) => {
        const date = new Date(item.expiration_date)
        // 4/20/2024 => [4, 20, 2025]
        return date.toLocaleDateString().split(`/`).map((elem) => +elem)
    }
    
    const sortByDate = (items) => {
        return items.sort((itemA, itemB) => {
          const dateA = formatDate(itemA);
          const dateB = formatDate(itemB);
          console.log("dateA", dateA)
          if (dateA[2] !== dateB[2]) return dateA[2] - dateB[2];
          if (dateA[0] !== dateB[0]) return dateA[0] - dateB[0];
          if (dateA[1] !== dateB[1]) return dateA[1] - dateB[1];
          return +itemB.id - +itemA.id;
        })
    }

    const handleDeleteItem = (itemId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?")
        if(confirmDelete){
          const token = localStorage.getItem("token")
        //   http://localhost:3003/api/fridges/1/2/items/13
          fetch(`${URL}/api/fridges/${user.id}/${fridge_id}/items/${itemId}`, 
          {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => { 
            const copyItemArray = [...items]
            const filteredItems = copyItemArray.filter((item) => item.id !== itemId)
            setItems(filteredItems)
          })
          .catch((error) => console.error(error))
        }
      }

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
                <Link to={`/fridges/${fridge_id}/items/new`}>
                    <p>Add an item to this fridge.</p>
                </Link> 
            </>      
        ) : (
            <>
            {sortByDate(items).map((item) => (
                <Item key={item.id} item={item} fridge_id={fridge_id} handleDeleteItem={handleDeleteItem}/>
            ))}
            </>
        )}
    </div>
  )
}

export default ItemIndex