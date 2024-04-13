import { useNavigate, Link } from "react-router-dom"

const Item = ({ item, fridge_id, handleDeleteItem }) => { 
    const navigate = useNavigate()

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    const isExpired = (expirationDate) => {
        return expirationDate && new Date(expirationDate) < new Date()
      }

    const handleEditItem = () => {
        navigate(`/fridges/${fridge_id}/items/${item.id}/edit`)
    }
  return (
    <>
    {/* <td>{item.category}</td> */}
    <td>{item.name}</td>
    <td>${item.amount_paid}</td>
    <td>
        <p 
        className={isExpired(item.expiration_date) ? "expired" : ""}>
            {formatDate(item.expiration_date)}
        </p>
    </td>
    <td>
        <button 
        onClick={handleEditItem} 
        className="btn btn-outline-info btn-sm edit">
            Edit
        </button>
    </td>
    <td>
        <button 
        onClick={()=>handleDeleteItem(item.id)}
        className="btn btn-outline-info btn-sm delete">
            Delete
        </button>
    </td>
    </>
  )
}

export default Item