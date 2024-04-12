import { useNavigate, Link, } from "react-router-dom"
const URL = import.meta.env.VITE_BASE_URL;

const Fridge = ({ fridge, handleDeleteFridge }) => {
  const navigate = useNavigate()

  const handleEditFridge = () => {
    navigate(`/fridges/${fridge.id}/edit`)
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <Link to={`/fridges/${fridge.id}`}><h3>{fridge.location}</h3></Link>
        <p className="card-text">{fridge.notes}</p>
        <div className="row">
          <div className="col-sm-6 mb-2">
            <button 
            className="btn btn-outline-info btn-sm btn-block mb-2" 
            onClick={handleEditFridge}>
              Edit 
            </button>
          </div>
          <div className="col-sm-6">
            <button 
            className="btn btn-outline-info btn-sm btn-block" 
            onClick={() => handleDeleteFridge(fridge.id)}>
              Delete 
            </button>
          </div>
        </div>
      </div>
        {/* <button onClick={handleEditFridge}>EDIT</button>
        <button onClick={()=>handleDeleteFridge(fridge.id)}>DELETE</button> */}
    </div>
  )
}

export default Fridge