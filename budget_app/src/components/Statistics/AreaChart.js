import React from 'react'
import {Line} from 'react-chartjs-2';

const AreaChart = ({ areaChartData }) => {
  return (
    <Line data={areaChartData} options={{ fill: true }} />
  )
}

export default AreaChart