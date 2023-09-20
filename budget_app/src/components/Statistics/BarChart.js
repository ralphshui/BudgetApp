import React from 'react'
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

const BarChart = ({ barChartData }) => {

  return (
    <Bar data={barChartData}/>
  )
}

export default BarChart