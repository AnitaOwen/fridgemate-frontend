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
    <td>{item.category}</td>
    <td>{item.name}</td>
    <td>${item.amount_paid}</td>
    <td>{formatDate(item.expiration_date)}</td>
    <td><button onClick={handleEditItem}>EDIT</button></td>
    <td><button onClick={()=>handleDeleteItem(item.id)}>DELETE</button></td>
    </>
  )
}

export default Item