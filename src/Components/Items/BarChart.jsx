import { Bar } from 'react-chartjs-2';

const BarChart = ({data}) => {
  return (
    data ? (
        <div className='chart'>
          <Bar data={data}/>
        </div>
      ) : null
  )
}

export default BarChart