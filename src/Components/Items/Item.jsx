import { useNavigate } from "react-router-dom"

const Item = ({ item, fridge_id, handleDeleteItem }) => { 
    const navigate = useNavigate()

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }
    const handleEditItem = () => {
        navigate(`/fridges/${fridge_id}/items/${item.id}/edit`)
    }
  return (
    <>
    <div>
        <h5>{item.name} <span>[{item.category}]</span></h5>
        <p><span>expiration:</span> {formatDate(item.expiration_date)}</p>
        <p><span>amount paid:</span> ${item.amount_paid}</p>
    </div>
    <div>
        <button onClick={handleEditItem}>EDIT</button>
        <button onClick={()=>handleDeleteItem(item.id)}>DELETE</button>
    </div>
    </>
  )
}

export default Item