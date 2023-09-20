import React from 'react'
import SideBar from '../Layout/SideBar.js'
import AccountNav from './AccountNav.js'

const Accounts = () => {

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <AccountNav />   
    </div>
  )
}

export default Accounts