import { useState } from 'react'
import { Bar } from 'react-chartjs-2';

const BarChart = ({data, totalCostOfAllItems, categories}) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleChart = () => {
      setIsVisible(!isVisible)
  }

  const options = {
    scales: {
        x: {
            type: 'category',
            labels: categories,
        },
        y: {
            beginAtZero: true,
        },
    },
  };


  return (
    <>
    <button className="btn btn-outline-info btn-sm mb-3" onClick={toggleChart}>{isVisible ? 'Hide Chart' : 'Show Chart'}</button>
    {isVisible && data ? (
        <div className='card mb-2'>
            <div className="card-body">
                <Bar data={data}/>
                <p className="mt-3">Total spent for all items in this fridge: <span className="bold">${totalCostOfAllItems.toFixed(2)}</span> </p>
            </div>
        </div>
      ) : null
    }
    </>
  )
}

export default BarChart