import React from 'react'
import { Doughnut } from 'react-chartjs-2';

const PieChart = ({ pieChartData }) => {
  return (
    <Doughnut data={pieChartData}/>
  )
}

export default PieChart