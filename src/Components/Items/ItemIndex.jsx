import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Item from "./Item";
import BarChart from "./BarChart";
const URL = import.meta.env.VITE_BASE_URL;

const ItemIndex = ({ fridge_id, items, setItems }) => {
  const [chartData, setChartData] = useState(null)
  const [itemCategories, setItemCategories] = useState([])
  const { user } = useOutletContext()
  const chartColors = [
    '#BA55D3', // Medium Orchid
    '#4682B4', // Steel Blue
    '#FFA500', // Orange
    '#20B2AA', // Light Sea Green
    '#DC143C', // Crimson
    '#FF6347', // Tomato
    '#FFD700', // Gold
  ]
  const totalCostOfAllItems = items.reduce((acc, current) => acc += +current.amount_paid, 0)

  const formatDate = (item) => {
      const date = new Date(item.expiration_date)
      // 4/20/2024 => [4, 20, 2025]
      return date.toLocaleDateString().split(`/`).map((elem) => +elem)
  }
    
  const sortByDate = (items) => {
    return items.sort((itemA, itemB) => {
      const dateA = formatDate(itemA);
      const dateB = formatDate(itemB);
      if (dateA[2] !== dateB[2]) return dateA[2] - dateB[2]
      if (dateA[0] !== dateB[0]) return dateA[0] - dateB[0]
      if (dateA[1] !== dateB[1]) return dateA[1] - dateB[1]
      return +itemB.id - +itemA.id;
    })
  }

  const handleDeleteItem = (itemId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?")
    if(confirmDelete){
      const token = localStorage.getItem("token")
      //   http://localhost:3003/api/fridges/1/2/items/13
      fetch(`${URL}/api/fridges/${user.id}/${fridge_id}/items/${itemId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => { 
        const copyItemArray = [...items]
        const filteredItems = copyItemArray.filter((item) => item.id !== itemId)
        setItems(filteredItems)
      })
      .catch((error) => console.error(error))
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch(`${URL}/api/fridges/${user.id}/${fridge_id}/items`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => res.json())
    .then((data) => setItems(data.items));
  }, [fridge_id])

  useEffect(() => {
    if (items.length > 0) {
      const categoryTotals = items.reduce((acc, current) => {
        if (!acc[current.category]) {
          acc[current.category] = +current.amount_paid;
        } else {
          acc[current.category] += +current.amount_paid;
        }
        return acc;
      }, {})

      const categories = Object.keys(categoryTotals)
      setItemCategories(categories)
      const totals = Object.values(categoryTotals)
      const formattedTotals = totals.map((total) => +total.toFixed(2))

      const newChartData = {
        labels: categories,
        datasets: [
          {
            label: "Amount Spent For Each Item Category In Dollars",
            data: formattedTotals,
            backgroundColor: chartColors,
            hoverBackgroundColor: chartColors,
            maxBarThickness: 80,
          },
        ],
      }
      setChartData(newChartData)
    }
  }, [items])

  return (
    <div className="mt-4">
      <div className="text-center">
        {chartData && 
          <BarChart data={chartData} totalCostOfAllItems={totalCostOfAllItems} categories={itemCategories}/>}
      </div>
        {items.length > 0 && (
          <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Expiration Date</th>
                        <th>Amount Paid</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {sortByDate(items).map((item) => (
                        <tr key={item.id}>
                            <Item 
                            item={item} 
                            fridge_id={fridge_id} 
                            handleDeleteItem={handleDeleteItem}/>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
  )
}

export default ItemIndex