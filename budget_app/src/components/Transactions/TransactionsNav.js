import React from 'react'
import { format } from 'date-fns';

import coolmonkey from '../../images/cool-monkey.jpg'
import TransactionsDetails from './TransactionsDetails.js'

import { useCurrentUser } from "../../CurrentUserContext"

const TransactionsNav = () => {

  const { user } = useCurrentUser()
  const today = format(new Date(),'MMMM dd, yyyy');

  return (
      <div className='main--content' >
        <div className='header--wrapper'>
          <div className='header--title'>
            <span>{today}</span>
            <h2> Welcome, <span style={{ color: '#9ff07a' }}>{user?.username}</span></h2>
          </div>
          <div className='user--info'>
            <img src={coolmonkey} alt ='profile-pic' />
          </div>
        </div>
        <TransactionsDetails />
      </div>
  )
}

export default TransactionsNav