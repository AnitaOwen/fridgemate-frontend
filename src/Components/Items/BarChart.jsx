import { useState } from 'react'
import { Bar } from 'react-chartjs-2';

const BarChart = ({data, totalCostOfAllItems}) => {
    const [isVisible, setIsVisible] = useState(false)

    const toggleChart = () => {
        setIsVisible(!isVisible)
    }

  return (
    <>
    <button className="btn btn-outline-info btn-sm mb-3" onClick={toggleChart}>{isVisible ? 'Hide Chart' : 'Show Chart'}</button>
    {isVisible && data ? (
        <div className='card'>
            <div className="card-body">
                <p>Total expense for each item category in Dollars</p>
                <Bar data={data}/>
                <p>Total expense for all items in this fridge: ${totalCostOfAllItems.toFixed(2)} </p>
            </div>
        </div>
      ) : null
    }
    </>
  )
}

export default BarChart