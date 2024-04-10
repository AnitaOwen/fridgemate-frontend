import { Link } from "react-router-dom";

const Fridge = ({ fridge }) => {
  return (
    <div>
        <Link to={`/fridges/${fridge.id}`}>{fridge.location}</Link>
        <p>{fridge.notes}</p>
        <Link to={`/fridges/${fridge.id}/edit`}>
            <button>EDIT</button>
        </Link>
        <button>DELETE</button>
    </div>
  )
}

export default Fridge