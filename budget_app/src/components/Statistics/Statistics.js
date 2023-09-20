import React from 'react'
import SideBar from '../Layout/SideBar.js'
import StatisticsNav from './StatisticsNav.js'

const Statistics = () => {

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <StatisticsNav />   
    </div>
  )
}

export default Statistics