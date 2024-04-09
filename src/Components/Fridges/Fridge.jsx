import { Link } from "react-router-dom";

const Fridge = ({ fridge }) => {
  return (
    <div>
        <Link to={`/fridges/${fridge.id}`}>
            <h3>{fridge.location}</h3>
        </Link>
        <p>{fridge.notes}</p>
    </div>
  )
}

export default Fridge