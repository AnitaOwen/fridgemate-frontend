
const Item = ({ item }) => {
  return (
    <>
    <div>
        <h5>{item.name} <span>[{item.category}]</span></h5>
        <p><span>expiration:</span> {item.expiration_date}</p>
        <p><span>amount paid:</span> ${(item.amount_paid/100).toFixed(2)}</p>
    </div>
    <div>
        <button>EDIT</button>
        <button>DELETE</button>
    </div>
    </>
  )
}

export default Item