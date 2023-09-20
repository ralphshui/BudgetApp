import React from 'react'
import SideBar from '../Layout/SideBar.js'
import TransactionsNav from './TransactionsNav.js'

const Transactions = () => {
   
  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <TransactionsNav />   
    </div>
  )
}

export default Transactions