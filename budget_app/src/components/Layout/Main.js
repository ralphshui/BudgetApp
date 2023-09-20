import React, { useState, useContext, useEffect } from 'react'
import SideBar from './SideBar.js'
import NavBar from './NavBar.js'

import AddIncomeToAcc from '../HOC/AddIncomeToAcc'

const Main = () => {
  
    return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <NavBar />   
    </div>
  )
}
export default Main