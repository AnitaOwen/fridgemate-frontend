import FridgeDetails from "../Components/Fridges/FridgeDetails"
const Show = ({ items, setItems}) => {
  return (
    <div>
        <FridgeDetails items={items} setItems={setItems} />
    </div>
  )
}

export default Show