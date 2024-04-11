import { useNavigate, Link, } from "react-router-dom"
const URL = import.meta.env.VITE_BASE_URL;

const Fridge = ({ fridge, handleDeleteFridge }) => {
  const navigate = useNavigate()

  const handleEditFridge = () => {
    navigate(`/fridges/${fridge.id}/edit`)
  }

  // const handleDeleteFridge = (fridgeId) => {
  //   const confirmDelete = window.confirm("Are you sure you want to delete this fridge?")
  //   if(confirmDelete){
  //     const token = localStorage.getItem("token")
  //     fetch(`${URL}/api/fridges/${fridge.id}`, {
  //       method: "DELETE",
  //       headers: {
  //           Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       if(res.ok) {
  //           navigate("/dashboard")
  //       } else {
  //           console.log("Failed to delete fridge");
  //       }
  //     })
  //     .catch((error) => console.error(error))
  //   }
  // }


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