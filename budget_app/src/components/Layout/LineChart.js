import React from 'react'
import { Line } from 'react-chartjs-2';

const LineChart = ({ lineChartData }) => {
  return (
    <Line data={lineChartData}/>
  )
}

export default LineChart