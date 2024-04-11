import { useNavigate, Link, } from "react-router-dom"
const URL = import.meta.env.VITE_BASE_URL;

const Fridge = ({ fridge, handleDeleteFridge }) => {
  const navigate = useNavigate()

  const handleEditFridge = () => {
    navigate(`/fridges/${fridge.id}/edit`)
  }

  return (
    <div>
        <Link to={`/fridges/${fridge.id}`}>{fridge.location}</Link>
        <p>{fridge.notes}</p>
        <button onClick={handleEditFridge}>EDIT</button>
        <button onClick={()=>handleDeleteFridge(fridge.id)}>DELETE</button>
    </div>
  )
}

export default Fridge