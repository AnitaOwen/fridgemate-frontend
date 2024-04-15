import { useState } from 'react'
import { Bar } from 'react-chartjs-2';

const BarChart = ({data}) => {
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
                <Bar data={data}/>
            </div>
        </div>
      ) : null
    }
    </>
  )
}

export default BarChart